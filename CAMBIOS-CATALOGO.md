# Cambios en el catálogo y librerías añadidas

Resumen de la ampliación del catálogo de productos (`configs/catalog.yaml`) y del
código nuevo que la hace posible. Todo lo de aquí está sin commitear todavía sobre
`4a24880 change ui/catalog`.

## 0. Para la landing page: qué se puede anunciar

El catálogo pasa de **14 marcas / 22 modelos** a **15 marcas / 28 modelos**, en 6
categorías. Pero el titular no es el número de modelos, sino que **cuatro marcas que
solo figuraban en la lista ahora controlan de verdad**, y que un proyector genérico
cubre prácticamente cualquier marca del mercado.

### Compatibilidad nueva (esto sí es novedad)

| Marca | Qué entra | Cómo se controla |
|---|---|---|
| **Cualquier proyector** | PJLink Clase 1 genérico: Epson, NEC, Panasonic, Sony, Christie, Optoma, ViewSonic, Hitachi… | Solo hace falta la IP. 24 comandos: encendido, entradas, mutes, lámpara, errores |
| **Biamp** | Tesira: volumen, mute, presets, arranque de audio | Red (TTP) |
| **QSC** | Q-SYS Core: ganancia, mute, snapshots, estado | Red (QRC / JSON-RPC) |
| **Extron** | Matrices SIS genéricas: ties de vídeo/audio, consultas | Red o serie |
| **Kramer** | Protocol 3000 genérico: routing, encendido, mute de vídeo | Red o serie |
| **Samsung** | Displays profesionales MDC: QM55B y QB65R, más control por RS-232 | Red (MDC) |
| **LG** | Signage por control externo: encendido, entradas, volumen, mute | Serie (y por IP) |

**Matiz importante para no prometer de más:** Biamp, QSC, Extron y Kramer **ya
aparecían** en el catálogo, pero sin ningún comando: se podían seleccionar y no hacían
nada. La novedad no es que existan, es que **ya controlan el equipo**. Y **NEC no es
nuevo**: ya funcionaba antes por PJLink; lo que cambia es que ahora no hace falta que
el modelo concreto esté en la lista.

### Cómo contarlo (mensajes de producto)

- **«Tu proyector ya es compatible.»** Con PJLink Clase 1 basta la IP: no hay que
  esperar a que añadamos tu modelo.
- **«Audio profesional de sala, no solo pantallas.»** Biamp Tesira y QSC Q-SYS son los
  DSP que hay en las salas de reuniones y auditorios reales.
- **«La matriz también.»** Extron y Kramer cierran la cadena: fuente → matriz →
  pantalla, todo desde el mismo sitio.
- **«Sin cajas propietarias.»** Se habla el protocolo nativo de cada fabricante (PJLink,
  MDC, SICP, TTP, QRC, SIS, Protocol 3000) por IP o RS-232.

### Catálogo completo, por categoría

- **Proyector** — NEC, Barco, Epson y **genérico PJLink** (cualquier Clase 1).
- **Monitor / Display** — LG, Philips (5 modelos D-Line, Q-Line, P-Line, Himalaya,
  táctil), Samsung (QM y QB).
- **Pantalla LED** — Novastar, Absen.
- **Tela de proyección** — Screen International (pantalla motorizada).
- **Audio / DSP** — Biamp, QSC, Midas / Behringer (M32, M32R, M32C, X32, X32 Rack).
- **Controlador / Matriz** — Extron, Kramer.

**Aviso para quien redacte la landing:** en Biamp, QSC y las matrices, los comandos del
catálogo son **plantillas de ejemplo**. Las etiquetas (`Level1`, `MainGain`, `Sala1`)
las define el integrador en el proyecto de cada sala y hay que ajustarlas al dar de
alta el equipo. No se debe vender como «funciona sin configurar»; sí como «viene con
los comandos preparados».

La idea de fondo: **casi todo el catálogo nuevo se apoya en los drivers genéricos**
(`generic-tcp` y `generic-serial`), que hasta ahora enviaban la cadena del YAML tal
cual. Al darles escapes y parámetros, marcas enteras (LG, Extron, Kramer, QSC,
Biamp) entran en el catálogo sin escribir un driver por marca. Solo Samsung MDC
necesitó driver propio, porque su trama lleva checksum calculado.

## 1. Librerías / paquetes nuevos

No hay dependencias externas nuevas: `go.mod` no cambia (sigue con `go.bug.st/serial`,
`golang.org/x/crypto`, `golang.org/x/term` y `gopkg.in/yaml.v3`). Lo añadido es código
propio.

### `internal/drivers/payload.go` — escapes y parámetros de los genéricos

Dos funciones que comparten `generic-tcp` y `generic-serial`:

- **`Unescape(s)`** traduce `\r`, `\n`, `\t`, `\\` y `\xHH` a los bytes reales. Existe
  porque YAML no sabe expresar un byte ≥ 0x80: su `\xAA` es un escape *Unicode* y
  produce los dos bytes UTF-8 `C2 AA`, no el byte `AA`. Por eso las cadenas binarias
  del catálogo van entre comillas **simples** (YAML las deja intactas) y las traduce
  esta función. Un escape mal formado es un error explícito, en vez de una trama
  corrupta enviada al equipo.
- **`RenderPayload(raw, params)`** llama a `Unescape` y sustituye el hueco `%v` por el
  parámetro `value` de la petición (misma convención que el driver `midas-x32`).

Ambos drivers genéricos pasan ahora sus `params` por aquí en `Do`. Un comando sin
escapes ni huecos se envía exactamente igual que antes.

### `internal/drivers/samsungmdc/` — driver `samsung-mdc`

Displays profesionales Samsung por MDC sobre TCP 1515, siguiendo el patrón de
`philips-sicp`: valida los cuerpos hex en `Connect` (un comando mal escrito falla al
dar de alta el equipo, no en la sala), conexión efímera por comando y `Catalog()` para
que la UI ofrezca los comandos.

Monta la trama `[0xAA][CMD][ID][LEN][DATA][CHECKSUM]`, con checksum de **suma** módulo
256 (no el XOR de SICP), y distingue ACK (`'A'`) de NAK (`'N'`). El id de display sale
de `network.monitor_id` —el mismo campo que Philips— y por defecto es `0xFE`
(broadcast). El hueco `%v` toma `value` en **decimal** (volumen 0–100). Registrado en
`cmd/jaso-rc/main.go`. Detalle de protocolo en `documents/SAMSUNG-MDC.md`.

### `drainGreeting` en `internal/drivers/netconn.go`

Al abrir una sesión persistente se descarta lo que el equipo mande por iniciativa
propia (ventana de 300 ms). Biamp Tesira saluda con un banner al conectar; sin esto,
ese texto sería lo que devolviera la lectura del primer comando. Se paga una vez por
sesión, no por comando, y es seguro para los equipos que no saludan.

### `defaults.persistent` en `internal/catalog/catalog.go`

El catálogo puede declarar que un producto necesita sesión abierta entre comandos.
Es conocimiento del *producto*, no del despliegue, así que lo aporta el catálogo y
`DeviceDefaults()` lo propaga a `config.Network`.

## 2. Cambios en el catálogo (`configs/catalog.yaml`)

| Categoría | Marca | Novedad | Driver |
|---|---|---|---|
| Proyector | Genérico (nuevo) | `pjlink-clase1`: 24 comandos PJLink Clase 1 | `pjlink` |
| Monitor | LG | `lg-signage-rs232`: control externo LG | `generic-serial` |
| Monitor | Samsung | `qm55b` migrado a MDC; `qb65r` nuevo; `qm55b-serie` | `samsung-mdc` / `generic-serial` |
| Audio | Biamp | `tesira`: comandos TTP (antes `commands: {}`) | `generic-tcp` |
| Audio | QSC | `core110f`: comandos QRC (antes `commands: {}`) | `generic-tcp` |
| Controlador | Extron | `extron-sis`: matriz SIS genérica | `generic-tcp` |
| Controlador | Kramer | `kramer-p3000`: Protocol 3000 genérico | `generic-tcp` |

**Proyector genérico (PJLink).** Cualquier proyector Clase 1 (Epson, NEC, Panasonic,
Sony, Christie, Optoma…) con solo dar de alta la IP. Incluye entradas, mutes, consultas
de lámpara/error/identificación.

**LG Signage.** Formato `[c1][c2] [ID] [dato]<CR>` en hex ASCII; el dato `ff` consulta
en vez de fijar. El mismo juego vale por IP con `generic-tcp` al puerto 9761. Ojo: el
mute está invertido (`00` silencia).

**Samsung.** El `qm55b` anterior usaba `generic-tcp` con `"\xAA\x11\xFE\x01\x01\x11"`
entre comillas dobles: **enviaba una trama corrupta** (los bytes ≥ 0x80 salían como
UTF-8). Ahora va por `samsung-mdc` con anclas YAML compartidas con `qb65r`. Queda un
modelo `qm55b-serie` con `generic-serial` y trama cruda, con el id fijado a broadcast
y el checksum a mano, para el caso RS-232.

**Biamp Tesira.** TTP (ASCII por Telnet 23) con `persistent: true` por el banner de
bienvenida. Las etiquetas de instancia (`Level1`, `Mute1`…) son **plantillas**: las
define el integrador en el proyecto Tesira de cada sala y son sensibles a mayúsculas.

**QSC Q-SYS.** QRC (JSON-RPC 2.0 sobre TCP 1710) terminado en `\x00`, de ahí las
comillas simples. **Conexión efímera a propósito**: el Core cierra la sesión tras 60 s
sin tráfico, y conectando por comando ese límite nunca llega a aplicar. Los `Name`
(`MainGain`, `MainMute`, `Sala1`) son plantillas del diseño de cada sala.

**Extron SIS.** Los ties se ejecutan al instante y no llevan `\r`: `{entrada}*{salida}`
más el símbolo de plano (`!` audio+vídeo, `%` solo vídeo, `$` solo audio). Toman `value`
(`.../tie_all?value=1*2`).

**Kramer Protocol 3000.** `#COMANDO parám<CR>`; `#ROUTE` usa capa,salida,entrada
(`.../route_video?value=1,2`). No todos los modelos traen `#POWER`.

## 3. Cambios en la UI

- **Id de display:** `monitor_id` era un campo *unmanaged* (solo se podía poner
  editando `devices.yaml` a mano). Ahora el formulario lo ofrece, pero solo para los
  drivers que lo usan: `driverUsesMonitorID` (Philips SICP y Samsung MDC) es un eje
  aparte de `driverKind`, porque los tres drivers de red son `network` y solo dos usan
  id. De paso, **Philips SICP gana el campo que le faltaba**.
- **Sesión persistente:** viaja en un campo oculto que fija el catálogo al elegir modelo
  (`cat-apply`). No se edita a mano porque lo decide el protocolo del producto.
- `preserveUnmanaged` se ajusta en consecuencia: conserva `monitor_id` solo para los
  drivers que no lo gestionan, y `persistent` solo para los que no son de red.

## 4. Documentación y pruebas añadidas

Documentos: `documents/SAMSUNG-MDC.md` (protocolo MDC),
`documents/catalogo-comandos-av.md` (PJLink, LG, Extron, Kramer),
`documents/catalogo-comandos-qsc-biamp.md` (QRC y TTP).

Tests nuevos: `internal/drivers/payload_test.go`, `internal/drivers/samsungmdc/`,
`internal/drivers/generictcp/generictcp_test.go`, `internal/catalog/catalog_shipped_test.go`
(valida el catálogo que se envía) y `internal/web/commands_roundtrip_test.go`.
