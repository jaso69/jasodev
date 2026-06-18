import { atom } from 'nanostores';
import type { ElementKey } from './class';

export type DemoElement = 'html' | 'form' | 'navbar' | 'card' | 'table' | 'footer' | 'aside';

const KEY = 'gc:demoElement';

export const $demoElement = atom<DemoElement>(
  (typeof localStorage !== 'undefined' && (localStorage.getItem(KEY) as DemoElement)) || 'html'
);

$demoElement.subscribe((v) => {
  try { localStorage.setItem(KEY, v); } catch {}
});

export const demoElements: { id: DemoElement; label: string; description: string }[] = [
  { id: 'html', label: 'HTML', description: 'Bloque HTML básico' },
  { id: 'form', label: 'Form', description: 'Formulario con campos' },
  { id: 'navbar', label: 'Navbar', description: 'Barra de navegación' },
  { id: 'card', label: 'Card', description: 'Tarjeta de contenido' },
  { id: 'table', label: 'Table', description: 'Tabla con datos' },
  { id: 'footer', label: 'Footer', description: 'Pie de página' },
  { id: 'aside', label: 'Aside', description: 'Barra lateral' },
];

// Describes a sub-element inside a demo that can receive classes.
// `selector` is a CSS selector relative to the demo's root element.
// `baseClasses` are the classes the demo needs for the element to look right.
export type Target = {
  selector: string;
  baseClasses: string;
};

// Description of a demo: its root and the available targets inside it.
// The keys of `targets` are ElementKey values — i.e. which DOM element kinds
// the user can target for applying generated classes within this demo.
export type DemoContent = {
  label: string;
  root: { tag: string; baseClasses: string; extraAttrs?: string };
  // innerHTML for the demo, EXCLUDING the root tag attributes
  // (root is added programmatically so we can attach base classes to it cleanly).
  innerHTML: string;
  // Map of ElementKey -> Target (which sub-element to apply the class to)
  targets: Partial<Record<ElementKey, Target>>;
  // Fallback target if the user has selected an element that this demo doesn't support
  fallbackTarget: ElementKey;
};

export const demoBuilders: Record<DemoElement, DemoContent> = {
  html: {
    label: 'bloque HTML',
    root: { tag: 'div', baseClasses: '' },
    innerHTML: `<p>Texto de ejemplo. Cambia los selectores para ver la magia.</p>`,
    targets: {
      div: { selector: '', baseClasses: '' },
      p: { selector: 'p', baseClasses: '' },
      span: { selector: 'p', baseClasses: '' },
    },
    fallbackTarget: 'p',
  },
  form: {
    label: 'formulario',
    root: { tag: 'form', baseClasses: 'flex flex-col gap-3 w-full max-w-sm' },
    innerHTML: `
      <label class="flex flex-col gap-1 text-xs text-[color:var(--color-text-muted)]">
        <span>Email</span>
        <input type="email" placeholder="tu@email.com" class="rounded-md bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)]">
      </label>
      <label class="flex flex-col gap-1 text-xs text-[color:var(--color-text-muted)]">
        <span>Mensaje</span>
        <textarea rows="3" placeholder="Escribe aquí..." class="rounded-md bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)]"></textarea>
      </label>
      <button type="button" class="rounded-md bg-[color:var(--color-brand)] text-white text-sm font-medium py-2 hover:opacity-90">Enviar</button>`,
    targets: {
      form: { selector: '', baseClasses: 'flex flex-col gap-3 w-full max-w-sm' },
      label: { selector: 'label', baseClasses: 'flex flex-col gap-1 text-xs text-[color:var(--color-text-muted)]' },
      input: { selector: 'input', baseClasses: 'rounded-md bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)]' },
      textarea: { selector: 'textarea', baseClasses: 'rounded-md bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--color-brand)]' },
      button: { selector: 'button', baseClasses: 'rounded-md bg-[color:var(--color-brand)] text-white text-sm font-medium py-2 hover:opacity-90' },
      'span-1': { selector: 'label:first-of-type > span', baseClasses: '' },
      'span-2': { selector: 'label:nth-of-type(2) > span', baseClasses: '' },
    },
    fallbackTarget: 'button',
  },
  navbar: {
    label: 'navbar',
    root: { tag: 'nav', baseClasses: 'flex items-center justify-between w-full max-w-2xl rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-4 py-2.5' },
    innerHTML: `
      <span class="font-semibold text-white">Logo</span>
      <ul class="flex items-center gap-4 text-sm text-[color:var(--color-text-muted)]">
        <li>Inicio</li>
        <li>Docs</li>
        <li>Blog</li>
        <li class="text-[color:var(--color-brand-hover)]">Contacto</li>
      </ul>`,
    targets: {
      nav: { selector: '', baseClasses: 'flex items-center justify-between w-full max-w-2xl rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-4 py-2.5' },
      span: { selector: 'span', baseClasses: 'font-semibold text-white' },
      ul: { selector: 'ul', baseClasses: 'flex items-center gap-4 text-sm text-[color:var(--color-text-muted)]' },
      li: { selector: 'li', baseClasses: '' },
    },
    fallbackTarget: 'nav',
  },
  card: {
    label: 'card',
    root: { tag: 'article', baseClasses: 'w-full max-w-xs rounded-lg overflow-hidden bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)]' },
    innerHTML: `
      <div class="h-24 bg-gradient-to-br from-indigo-500/40 to-cyan-400/30"></div>
      <div class="p-4">
        <h3 class="font-semibold text-white">Tarjeta de ejemplo</h3>
        <p class="text-sm text-[color:var(--color-text-muted)] mt-1">Una descripción breve del contenido de esta tarjeta.</p>
        <button class="mt-3 text-xs text-[color:var(--color-brand-hover)] font-medium">Leer más →</button>
      </div>`,
    targets: {
      article: { selector: '', baseClasses: 'w-full max-w-xs rounded-lg overflow-hidden bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)]' },
      div: { selector: 'div', baseClasses: 'p-4' },
      h3: { selector: 'h3', baseClasses: 'font-semibold text-white' },
      p: { selector: 'p', baseClasses: 'text-sm text-[color:var(--color-text-muted)] mt-1' },
      button: { selector: 'button', baseClasses: 'mt-3 text-xs text-[color:var(--color-brand-hover)] font-medium' },
    },
    fallbackTarget: 'article',
  },
  table: {
    label: 'tabla',
    root: { tag: 'table', baseClasses: 'w-full max-w-lg text-sm' },
    innerHTML: `
      <thead>
        <tr class="text-left text-[color:var(--color-text-muted)]">
          <th class="pb-2 font-medium">Nombre</th>
          <th class="pb-2 font-medium">Rol</th>
          <th class="pb-2 font-medium">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr class="border-t border-[color:var(--color-border)]"><td class="py-2">Ana</td><td class="py-2">Diseñadora</td><td class="py-2"><span class="chip chip-success">Activo</span></td></tr>
        <tr class="border-t border-[color:var(--color-border)]"><td class="py-2">Luis</td><td class="py-2">Desarrollador</td><td class="py-2"><span class="chip chip-warning">Ausente</span></td></tr>
        <tr class="border-t border-[color:var(--color-border)]"><td class="py-2">Marta</td><td class="py-2">PM</td><td class="py-2"><span class="chip">En línea</span></td></tr>
      </tbody>`,
    targets: {
      table: { selector: '', baseClasses: 'w-full max-w-lg text-sm' },
      thead: { selector: 'thead', baseClasses: '' },
      tbody: { selector: 'tbody', baseClasses: '' },
      tr: { selector: 'tbody tr', baseClasses: 'border-t border-[color:var(--color-border)]' },
      th: { selector: 'th', baseClasses: 'pb-2 font-medium' },
      td: { selector: 'td', baseClasses: 'py-2' },
      span: { selector: 'span.chip', baseClasses: 'chip' },
    },
    fallbackTarget: 'tr',
  },
  footer: {
    label: 'footer',
    root: { tag: 'footer', baseClasses: 'w-full max-w-2xl rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-4 py-3 text-sm text-[color:var(--color-text-muted)] flex items-center justify-between' },
    innerHTML: `
      <span>© 2025 Jaweb</span>
      <ul class="flex gap-3">
        <li>Privacidad</li>
        <li>Términos</li>
        <li>Contacto</li>
      </ul>`,
    targets: {
      footer: { selector: '', baseClasses: 'w-full max-w-2xl rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] px-4 py-3 text-sm text-[color:var(--color-text-muted)] flex items-center justify-between' },
      span: { selector: 'span', baseClasses: '' },
      ul: { selector: 'ul', baseClasses: 'flex gap-3' },
      li: { selector: 'li', baseClasses: '' },
    },
    fallbackTarget: 'footer',
  },
  aside: {
    label: 'aside',
    root: { tag: 'aside', baseClasses: 'w-56 rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] p-3 text-sm' },
    innerHTML: `
      <h4 class="font-semibold text-white mb-2">Menú lateral</h4>
      <ul class="flex flex-col gap-1 text-[color:var(--color-text-muted)]">
        <li class="px-2 py-1.5 rounded hover:bg-[color:var(--color-bg-3)]">Dashboard</li>
        <li class="px-2 py-1.5 rounded hover:bg-[color:var(--color-bg-3)]">Proyectos</li>
        <li class="px-2 py-1.5 rounded hover:bg-[color:var(--color-bg-3)]">Equipo</li>
        <li class="px-2 py-1.5 rounded hover:bg-[color:var(--color-bg-3)]">Ajustes</li>
      </ul>`,
    targets: {
      aside: { selector: '', baseClasses: 'w-56 rounded-lg bg-[color:var(--color-bg-2)] border border-[color:var(--color-border)] p-3 text-sm' },
      h4: { selector: 'h4', baseClasses: 'font-semibold text-white mb-2' },
      ul: { selector: 'ul', baseClasses: 'flex flex-col gap-1 text-[color:var(--color-text-muted)]' },
      li: { selector: 'li', baseClasses: 'px-2 py-1.5 rounded hover:bg-[color:var(--color-bg-3)]' },
    },
    fallbackTarget: 'aside',
  },
};
