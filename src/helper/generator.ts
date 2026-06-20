import { $classesByKey, $theme, $elemento, $responsive, $estado, clearAll, clearClass, hydrateStore, setClass, type ElementKey, type StateKey, type ResponsiveKey, type ThemeMode } from '../stores/class';
import { $demoElement, demoBuilders, type DemoElement, type Target } from '../stores/demoElement';

// Build the inner HTML for a given demo: the root tag with its base classes + the inner content.
function buildDemoHtml(demoId: DemoElement): string {
  const demo = demoBuilders[demoId] || demoBuilders.html;
  const rootAttrs = demo.root.baseClasses ? ` class="${demo.root.baseClasses}"` : '';
  const inner = demo.innerHTML.trim();
  return `<${demo.root.tag}${rootAttrs}>${inner}</${demo.root.tag}>`;
}

// Returns the actual target that should be used (resolves unsupported element keys to the fallback).
function getActiveTarget(demoId: DemoElement): { key: ElementKey; target: Target } {
  const demo = demoBuilders[demoId] || demoBuilders.html;
  const wanted = $elemento.get();
  if (demo.targets[wanted]) return { key: wanted, target: demo.targets[wanted]! };
  return { key: demo.fallbackTarget, target: demo.targets[demo.fallbackTarget]! };
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] as string));
}

function highlightHtml(html: string): string {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/(&lt;\/?)([a-zA-Z][a-zA-Z0-9-]*)/g, '$1<span class="tk-tag">$2</span>')
    .replace(/\bclass(=)(&quot;)([^&]*)(&quot;)/g, '<span class="tk-attr">class</span><span class="tk-punct">=</span><span class="tk-quote">"</span><span class="tk-class">$3</span><span class="tk-quote">"</span>')
    .replace(/\b([a-zA-Z-]+)(=)(&quot;)([^&]*)(&quot;)/g, '<span class="tk-dim">$1</span><span class="tk-punct">=</span><span class="tk-quote">"</span><span class="tk-dim">$4</span><span class="tk-quote">"</span>');
}

function getContextId(classKey: string) {
  return `${classKey}__${$responsive.get()}__${$theme.get()}__${$estado.get()}__${$elemento.get()}`;
}

function getCurrentClass(classKey: string): string | null {
  const all = $classesByKey.get();
  const entries = all[classKey] || [];
  const wanted = getContextId(classKey);
  return entries.find((e) => e.id === wanted)?.css ?? null;
}

function getUserClassesForElement(elementKey: ElementKey): string[] {
  const all = $classesByKey.get();
  const theme = $theme.get();
  const responsive = $responsive.get();
  const estado = $estado.get();
  const out: string[] = [];
  for (const key of Object.keys(all)) {
    for (const entry of all[key] || []) {
      // entry.id format: `${classKey}__${responsive}__${theme}__${estado}__${elemento}`
      const parts = entry.id.split('__');
      if (parts.length < 5) continue;
      const [_, eResponsive, eTheme, eEstado, eElemento] = parts;
      if (eResponsive !== responsive) continue;
      if (eTheme !== theme) continue;
      if (eEstado !== estado) continue;
      if (eElemento !== elementKey) continue;
      out.push(entry.css);
    }
  }
  return out;
}

function getAllUserClassesForDemo(): string[] {
  const demoId = $demoElement.get();
  const demo = demoBuilders[demoId] || demoBuilders.html;
  const out: string[] = [];
  for (const key of Object.keys(demo.targets) as ElementKey[]) {
    out.push(...getUserClassesForElement(key));
  }
  return out;
}

function renderCode() {
  const out = document.getElementById('code-output');
  const count = document.getElementById('code-count');
  const preview = document.getElementById('preview-target');
  if (!out || !count) return;

  const demoId = $demoElement.get();
  const demo = demoBuilders[demoId] || demoBuilders.html;
  const { key: activeKey } = getActiveTarget(demoId);

  // Use the live preview DOM so every applied class (across all targets) is reflected.
  const rootEl = preview?.querySelector(demo.root.tag) || preview?.firstElementChild;
  const exampleCode = rootEl?.outerHTML ?? buildDemoHtml(demoId);

  let html = `<span class="tk-comment">&lt;!-- Ejemplo: ${escapeHtml(demo.label)} · editando: &lt;${escapeHtml(activeKey)}&gt; --&gt;</span>\n`;
  html += highlightHtml(exampleCode);

  // Build a summary of all user classes grouped by the target element they belong to.
  const allTargets = Object.keys(demo.targets) as ElementKey[];
  const classesByElement: { key: ElementKey; classes: string[] }[] = [];
  let totalClasses = 0;
  for (const key of allTargets) {
    const classes = getUserClassesForElement(key);
    if (classes.length > 0) {
      classesByElement.push({ key, classes });
      totalClasses += classes.length;
    }
  }

  if (classesByElement.length > 0) {
    html += `\n\n<span class="tk-comment">&lt;!-- Clases aplicadas en este demo --&gt;</span>\n`;
    for (const { key, classes } of classesByElement) {
      html += `<span class="tk-comment">&lt;!-- &lt;${escapeHtml(key)}&gt; --&gt;</span>\n`;
      html += `<span class="tk-class">${classes.map(escapeHtml).join('\n')}</span>\n`;
    }
  }

  out.innerHTML = html;
  count.textContent = `${totalClasses} clase${totalClasses === 1 ? '' : 's'}`;
}

function renderPreviewContent(target: HTMLElement) {
  const demoId = $demoElement.get();
  const demo = demoBuilders[demoId] || demoBuilders.html;
  target.innerHTML = demo.innerHTML.trim();
  const root = document.createElement(demo.root.tag);
  if (demo.root.baseClasses) root.className = demo.root.baseClasses;
  while (target.firstChild) root.appendChild(target.firstChild);
  target.innerHTML = '';
  target.appendChild(root);
  applyAllClasses(target);
}

function applyAllClasses(target: HTMLElement) {
  const demoId = $demoElement.get();
  const demo = demoBuilders[demoId] || demoBuilders.html;

  // Find the target key that represents the demo root (selector === '').
  const rootKey = (Object.keys(demo.targets) as ElementKey[]).find((k) => demo.targets[k]?.selector === '');

  // Apply base + user classes to the root element.
  const rootEl = target.querySelector(demo.root.tag) as HTMLElement | null;
  if (rootEl) {
    const rootUserClasses = rootKey ? getUserClassesForElement(rootKey) : [];
    rootEl.className = [demo.root.baseClasses, ...rootUserClasses].filter(Boolean).join(' ').trim();
  } else {
    target.className = demo.root.baseClasses;
  }

  // Apply base + user classes to every sub-target in the demo so the preview
  // reflects edits made to any element, not just the currently selected one.
  for (const [key, t] of Object.entries(demo.targets)) {
    if (!t.selector) continue; // root already handled above
    const userClasses = getUserClassesForElement(key as ElementKey);
    const els = target.querySelectorAll(t.selector);
    els.forEach((el) => {
      (el as HTMLElement).className = [t.baseClasses, ...userClasses].filter(Boolean).join(' ').trim();
    });
  }

  document.documentElement.classList.toggle('dark', $theme.get() === 'dark');
}

function syncPreview() {
  const target = document.getElementById('preview-target') as HTMLElement | null;
  if (!target) return;
  renderPreviewContent(target);
}

function syncStoreSelects() {
  const sel = (id: string, val: string) => {
    const el = document.getElementById(id) as HTMLSelectElement | null;
    if (el && el.value !== val) el.value = val;
  };
  sel('theme', $theme.get());
  sel('responsive', $responsive.get());
  sel('estado', $estado.get());
  sel('elemento', $elemento.get());
}

function syncClassSelects() {
  document.querySelectorAll<HTMLSelectElement>('[data-class-select]').forEach((sel) => {
    const key = sel.dataset.classKey || sel.id;
    const saved = getCurrentClass(key);
    const hasOption = Array.from(sel.options).some((o) => o.value === saved);
    sel.value = saved && hasOption ? saved : '';
  });
}

function syncElementoOptions() {
  const demoId = $demoElement.get();
  const demo = demoBuilders[demoId] || demoBuilders.html;
  const sel = document.getElementById('elemento') as HTMLSelectElement | null;
  if (!sel) return;
  const validKeys = Object.keys(demo.targets) as ElementKey[];
  if (!validKeys.includes($elemento.get())) {
    $elemento.set(demo.fallbackTarget);
  }
  const labels: Record<ElementKey, string> = {
    p: 'Párrafo (p)', h1: 'H1', h2: 'H2', h3: 'H3', h4: 'H4', h5: 'H5', h6: 'H6',
    div: 'Div', span: 'Span', 'span-1': 'Span 1', 'span-2': 'Span 2',
    a: 'Enlace (a)', button: 'Botón (button)', label: 'Label',
    input: 'Input', textarea: 'Textarea', select: 'Select', form: 'Form', nav: 'Nav',
    ul: 'Lista (ul)', ol: 'Lista ordenada (ol)', li: 'Item lista (li)', table: 'Tabla',
    thead: 'Thead', tbody: 'Tbody', tr: 'Fila (tr)', th: 'Celda cabecera (th)', td: 'Celda (td)',
    img: 'Imagen (img)', code: 'Code', pre: 'Pre', blockquote: 'Blockquote', small: 'Small',
    section: 'Sección', article: 'Artículo', aside: 'Aside', footer: 'Footer', header: 'Header',
    main: 'Main', dl: 'Lista descripción (dl)', dt: 'Término (dt)', dd: 'Definición (dd)',
    details: 'Details', summary: 'Summary', checkbox: 'Checkbox', radio: 'Radio',
  };
  const cur = $elemento.get();
  sel.innerHTML = '';
  for (const k of validKeys) {
    const opt = document.createElement('option');
    opt.value = k;
    opt.textContent = labels[k] || k;
    if (k === cur) opt.selected = true;
    sel.appendChild(opt);
  }
}

function syncDemoTabs() {
  const tabs = document.querySelectorAll<HTMLButtonElement>('[data-demo-tab]');
  const cur = $demoElement.get();
  tabs.forEach((t) => {
    const id = t.dataset.demoTab as DemoElement;
    t.setAttribute('aria-pressed', id === cur ? 'true' : 'false');
    if (id === cur) {
      t.classList.add('!bg-[rgba(99,102,241,0.12)]', '!border-[rgba(99,102,241,0.35)]', '!text-white');
    } else {
      t.classList.remove('!bg-[rgba(99,102,241,0.12)]', '!border-[rgba(99,102,241,0.35)]', '!text-white');
    }
  });
}

export function initGenerator() {
  hydrateStore();

  // 1) Bind navbar <select>s to the store
  const bindStoreSelect = (id: string, store: { set: (v: any) => void; subscribe: (cb: (v: any) => void) => void; get: () => any }, allowed?: () => ElementKey[]) => {
    const el = document.getElementById(id) as HTMLSelectElement | null;
    if (!el) return;
    el.value = String(store.get());
    el.addEventListener('change', () => {
      const v = el.value;
      if (id === 'theme') store.set(v as ThemeMode);
      else if (id === 'responsive') store.set(v as ResponsiveKey);
      else if (id === 'estado') store.set(v as StateKey);
      else if (id === 'elemento') {
        const allowedKeys = allowed ? allowed() : undefined;
        if (allowedKeys && !allowedKeys.includes(v as ElementKey)) {
          store.set(allowedKeys[0]);
        } else {
          store.set(v as ElementKey);
        }
      }
    });
    store.subscribe((v) => { if (el.value !== String(v)) el.value = String(v); });
  };

  bindStoreSelect('theme', $theme);
  bindStoreSelect('responsive', $responsive);
  bindStoreSelect('estado', $estado);
  bindStoreSelect('elemento', $elemento, () => {
    const demoId = $demoElement.get();
    const demo = demoBuilders[demoId] || demoBuilders.html;
    return Object.keys(demo.targets) as ElementKey[];
  });

  // 2) Demo tabs
  document.querySelectorAll<HTMLButtonElement>('[data-demo-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.demoTab as DemoElement;
      if (id) $demoElement.set(id);
    });
  });
  $demoElement.subscribe(() => {
    syncDemoTabs();
    syncElementoOptions();
    syncClassSelects();
    syncPreview();
    renderCode();
  });
  syncDemoTabs();
  syncElementoOptions();

  // 3) Class selects — pipe changes through `setClass`
  document.querySelectorAll<HTMLSelectElement>('[data-class-select]').forEach((sel) => {
    const key = sel.dataset.classKey || sel.id;
    sel.addEventListener('change', () => {
      const raw = sel.value;
      if (!raw) {
        clearClass(key);
      } else {
        setClass(key, raw);
      }
    });
  });

  // 4) Clear buttons per field
  document.querySelectorAll<HTMLButtonElement>('[data-clear-class]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.clearClass;
      if (!key) return;
      clearClass(key);
      const sel = document.querySelector<HTMLSelectElement>(`[data-class-select][data-class-key="${CSS.escape(key)}"]`);
      if (sel) sel.value = '';
    });
  });

  // 5) React to class / theme / responsive / estado / elemento changes
  $classesByKey.subscribe(() => { syncPreview(); renderCode(); });
  $theme.subscribe(() => { syncClassSelects(); syncPreview(); });
  $responsive.subscribe(() => { syncClassSelects(); syncPreview(); });
  $estado.subscribe(() => { syncClassSelects(); syncPreview(); });
  $elemento.subscribe(() => { syncClassSelects(); syncPreview(); renderCode(); });

  // 6) Reset button
  const reset = document.getElementById('resetButton');
  if (reset) {
    reset.addEventListener('click', () => {
      const ok = window.confirm('¿Borrar todas las clases generadas y reiniciar la sesión?');
      if (!ok) return;
      clearAll();
      document.querySelectorAll<HTMLSelectElement>('[data-class-select]').forEach((s) => { s.value = ''; });
    });
  }

  // 7) Copy code
  const copy = document.querySelector<HTMLButtonElement>('[data-copy-code]');
  if (copy) {
    copy.addEventListener('click', async () => {
      const userClasses = getAllUserClassesForDemo();
      try {
        await navigator.clipboard.writeText(userClasses.join(' '));
        const original = copy.innerHTML;
        copy.innerHTML = '✓ Copiado';
        setTimeout(() => { copy.innerHTML = original; }, 1200);
      } catch {}
    });
  }

  // 8) Initial render
  syncStoreSelects();
  syncClassSelects();
  syncPreview();
  renderCode();
}
