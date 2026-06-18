import { atom, computed } from 'nanostores';

export type ThemeMode = 'dark' | 'light';
export type ElementKey =
  | 'form' | 'nav' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'p' | 'span' | 'span-1' | 'span-2' | 'blockquote' | 'pre' | 'small' | 'code' | 'a' | 'div'
  | 'img' | 'input' | 'label' | 'textarea' | 'checkbox' | 'radio'
  | 'button' | 'select' | 'table' | 'thead' | 'tbody' | 'tr' | 'th' | 'td'
  | 'ul' | 'ol' | 'li' | 'dl' | 'dt' | 'dd'
  | 'section' | 'article' | 'aside' | 'footer' | 'header' | 'main'
  | 'details' | 'summary';

export type ResponsiveKey = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type StateKey = 'noestado' | 'hover' | 'active' | 'focus' | 'focus-visible' | 'visited' | 'link' | 'enabled' | 'disabled' | 'checked' | 'required' | 'optional' | 'valid' | 'invalid' | 'in-range' | 'out-of-range';

// What user has applied in each class-selector group (e.g. "fontsize" -> "text-lg")
export type ClassEntry = {
  id: string;
  css: string;
};

const STORAGE_PREFIX = 'gc:';

function readJSON<T>(key: string, fallback: T): T {
  if (typeof localStorage === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(value));
  } catch {}
}

export const $theme = atom<ThemeMode>((typeof localStorage !== 'undefined' && (localStorage.getItem(STORAGE_PREFIX + 'theme') as ThemeMode)) || 'dark');
export const $elemento = atom<ElementKey>((typeof localStorage !== 'undefined' && (localStorage.getItem(STORAGE_PREFIX + 'elemento') as ElementKey)) || 'p');
export const $responsive = atom<ResponsiveKey>((typeof localStorage !== 'undefined' && (localStorage.getItem(STORAGE_PREFIX + 'responsive') as ResponsiveKey)) || 'base');
export const $estado = atom<StateKey>((typeof localStorage !== 'undefined' && (localStorage.getItem(STORAGE_PREFIX + 'estado') as StateKey)) || 'noestado');

$theme.subscribe((v) => { try { localStorage.setItem(STORAGE_PREFIX + 'theme', v); } catch {} });
$elemento.subscribe((v) => { try { localStorage.setItem(STORAGE_PREFIX + 'elemento', v); } catch {} });
$responsive.subscribe((v) => { try { localStorage.setItem(STORAGE_PREFIX + 'responsive', v); } catch {} });
$estado.subscribe((v) => { try { localStorage.setItem(STORAGE_PREFIX + 'estado', v); } catch {} });

// Map of `classKey -> array of ClassEntry` — the classes that should be applied to the preview element.
export const $classesByKey = atom<Record<string, ClassEntry[]>>(readJSON('classes', {}));

$classesByKey.subscribe((v) => writeJSON('classes', v));

// Flat list of currently applied classes (across all keys)
export const $appliedClasses = computed($classesByKey, (all) => {
  const out: string[] = [];
  for (const key of Object.keys(all)) {
    for (const e of all[key] || []) out.push(e.css);
  }
  return out;
});

export function setClass(classKey: string, css: string) {
  const current = { ...$classesByKey.get() };
  const list = current[classKey] ? [...current[classKey]] : [];
  const id = `${classKey}__${$responsive.get()}__${$theme.get()}__${$estado.get()}__${$elemento.get()}`;
  const filtered = list.filter((e) => e.id !== id);
  filtered.push({ id, css });
  current[classKey] = filtered;
  $classesByKey.set(current);
}

export function clearClass(classKey: string) {
  const current = { ...$classesByKey.get() };
  if (current[classKey]) {
    delete current[classKey];
    $classesByKey.set(current);
  }
}

export function clearAll() {
  $classesByKey.set({});
}

export function hydrateStore() {
  if (typeof localStorage === 'undefined') return;
  $classesByKey.set(readJSON('classes', {}));
}
