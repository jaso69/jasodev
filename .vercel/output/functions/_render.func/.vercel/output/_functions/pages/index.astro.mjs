/* empty css                                 */
import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderComponent } from '../chunks/astro/server_2xeyPQ0Z.mjs';
import { $ as $$MenuCss, a as $$Layout } from '../chunks/Layout_Ceob2h_N.mjs';
export { renderers } from '../renderers.mjs';

const fontfamily = [
    'font-sans', 'font-serif', 'font-mono'
];

const fontsize = [
    'text-xs',
    'text-sm',
    'text-base',
    'text-lg',
    'text-xl',
    'text-2xl',
    'text-3xl',
    'text-4xl',
    'text-5xl',
    'text-6xl',
    'text-7xl',
    'text-8xl',
    'text-9xl',
];

const fontsmoothing = [
    'antialiased',
    'subpixel-antialiased',
];

const fontstyle = [
    'italic',
    'not-italic',
];

const fontweight = [
    'font-thin',
    'font-extralight',
    'font-light',
    'font-normal',
    'font-medium',
    'font-semibold',
    'font-bold',
    'font-extrabold',
    'font-black',
];

const fontnumeric = [
    'normal-nums',
    'ordinal',
    'slashed-zero',
    'lining-nums',
    'oldstyle-nums',
    'proportional-nums',
    'tabular-nums',
    'diagonal-fractions',
    'stacked-fractions',
];

const letterspacing = [
    'tracking-tighter',
    'tracking-tight',
    'tracking-normal',
    'tracking-wide',
    'tracking-wider',
    'tracking-widest',
];

const lineheight = [
    'leading-3',
    'leading-4',
    'leading-5',
    'leading-6',
    'leading-7',
    'leading-8',
    'leading-9',
    'leading-10',
    'leading-none',
    'leading-tight',
    'leading-snug',
    'leading-normal',
    'leading-relaxed',
    'leading-loose',
];

const linestyle = [
    'list-none',
    'list-disc',
    'list-decimal',
];

const liststyleposition = [
    'list-inside',
    'list-outside',
];

const textalign = [
    'text-left',
    'text-center',
    'text-right',
    'text-justify',
];

const textcolor = [
    'text-inherit',
    'text-current',
    'text-transparent',
    'text-black',
    'text-white',
    'text-slate-50',
    'text-slate-100',
    'text-slate-200',
    'text-slate-300',
    'text-slate-400',
    'text-slate-500',
    'text-slate-600',
    'text-slate-700',
    'text-slate-800',
    'text-slate-900',
    'text-gray-50',
    'text-gray-100',
    'text-gray-200',
    'text-gray-300',
    'text-gray-400',
    'text-gray-500',
    'text-gray-600',
    'text-gray-700',
    'text-gray-800',
    'text-gray-900',
    'text-zinc-50',
    'text-zinc-100',
    'text-zinc-200',
    'text-zinc-300',
    'text-zinc-400',
    'text-zinc-500',
    'text-zinc-600',
    'text-zinc-700',
    'text-zinc-800',
    'text-zinc-900',
    'text-neutral-50',
    'text-neutral-100',
    'text-neutral-200',
    'text-neutral-300',
    'text-neutral-400',
    'text-neutral-500',
    'text-neutral-600',
    'text-neutral-700',
    'text-neutral-800',
    'text-neutral-900',
    'text-stone-50',
    'text-stone-100',
    'text-stone-200',
    'text-stone-300',
    'text-stone-400',
    'text-stone-500',
    'text-stone-600',
    'text-stone-700',
    'text-stone-800',
    'text-stone-900',
    'text-red-50',
    'text-red-100',
    'text-red-200',
    'text-red-300',
    'text-red-400',
    'text-red-500',
    'text-red-600',
    'text-red-700',
    'text-red-800',
    'text-red-900',
    'text-orange-50',
    'text-orange-100',
    'text-orange-200',
    'text-orange-300',
    'text-orange-400',
    'text-orange-500',
    'text-orange-600',
    'text-orange-700',
    'text-orange-800',
    'text-orange-900',
    'text-amber-50',
    'text-amber-100',
    'text-amber-200',
    'text-amber-300',
    'text-amber-400',
    'text-amber-500',
    'text-amber-600',
    'text-amber-700',
    'text-amber-800',
    'text-amber-900',
    'text-yellow-50',
    'text-yellow-100',
    'text-yellow-200',
    'text-yellow-300',
    'text-yellow-400',
    'text-yellow-500',
    'text-yellow-600',
    'text-yellow-700',
    'text-yellow-800',
    'text-yellow-900',
    'text-lime-50',
    'text-lime-100',
    'text-lime-200',
    'text-lime-300',
    'text-lime-400',
    'text-lime-500',
    'text-lime-600',
    'text-lime-700',
    'text-lime-800',
    'text-lime-900',
    'text-green-50',
    'text-green-100',
    'text-green-200',
    'text-green-300',
    'text-green-400',
    'text-green-500',
    'text-green-600',
    'text-green-700',
    'text-green-800',
    'text-green-900',
    'text-emerald-50',
    'text-emerald-100',
    'text-emerald-200',
    'text-emerald-300',
    'text-emerald-400',
    'text-emerald-500',
    'text-emerald-600',
    'text-emerald-700',
    'text-emerald-800',
    'text-emerald-900',
    'text-teal-50',
    'text-teal-100',
    'text-teal-200',
    'text-teal-300',
    'text-teal-400',
    'text-teal-500',
    'text-teal-600',
    'text-teal-700',
    'text-teal-800',
    'text-teal-900',
    'text-cyan-50',
    'text-cyan-100',
    'text-cyan-200',
    'text-cyan-300',
    'text-cyan-400',
    'text-cyan-500',
    'text-cyan-600',
    'text-cyan-700',
    'text-cyan-800',
    'text-cyan-900',
    'text-sky-50',
    'text-sky-100',
    'text-sky-200',
    'text-sky-300',
    'text-sky-400',
    'text-sky-500',
    'text-sky-600',
    'text-sky-700',
    'text-sky-800',
    'text-sky-900',
    'text-blue-50',
    'text-blue-100',
    'text-blue-200',
    'text-blue-300',
    'text-blue-400',
    'text-blue-500',
    'text-blue-600',
    'text-blue-700',
    'text-blue-800',
    'text-blue-900',
    'text-indigo-50',
    'text-indigo-100',
    'text-indigo-200',
    'text-indigo-300',
    'text-indigo-400',
    'text-indigo-500',
    'text-indigo-600',
    'text-indigo-700',
    'text-indigo-800',
    'text-indigo-900',
    'text-violet-50',
    'text-violet-100',
    'text-violet-200',
    'text-violet-300',
    'text-violet-400',
    'text-violet-500',
    'text-violet-600',
    'text-violet-700',
    'text-violet-800',
    'text-violet-900',
    'text-purple-50',
    'text-purple-100',
    'text-purple-200',
    'text-purple-300',
    'text-purple-400',
    'text-purple-500',
    'text-purple-600',
    'text-purple-700',
    'text-purple-800',
    'text-purple-900',
    'text-fuchsia-50',
    'text-fuchsia-100',
    'text-fuchsia-200',
    'text-fuchsia-300',
    'text-fuchsia-400',
    'text-fuchsia-500',
    'text-fuchsia-600',
    'text-fuchsia-700',
    'text-fuchsia-800',
    'text-fuchsia-900',
    'text-pink-50',
    'text-pink-100',
    'text-pink-200',
    'text-pink-300',
    'text-pink-400',
    'text-pink-500',
    'text-pink-600',
    'text-pink-700',
    'text-pink-800',
    'text-pink-900',
    'text-rose-50',
    'text-rose-100',
    'text-rose-200',
    'text-rose-300',
    'text-rose-400',
    'text-rose-500',
    'text-rose-600',
    'text-rose-700',
    'text-rose-800',
    'text-rose-900',
];

const textdecoration = [
    'underline',
    'overline',
    'line-through',
    'no-underline',
];

const textdecorationstyle = [
    'decoration-solid',
    'decoration-double',
    'decoration-dotted',
    'decoration-dashed',
    'decoration-wavy',
];

const textdecorationthickness = [
    'decoration-auto',
    'decoration-from-font',
    'decoration-0',
    'decoration-1',
    'decoration-2',
    'decoration-4',
    'decoration-8',
];

const textunderlineoffset = [
    'underline-offset-auto',
    'underline-offset-from-font',
    'underline-offset-0',
    'underline-offset-1',
    'underline-offset-2',
    'underline-offset-4',
    'underline-offset-8',
];

const texttransform = [
    'uppercase',
    'lowercase',
    'capitalize',
    'normal-case',
];

const textoverflow = [
    'truncate',
    'overflow-ellipsis',
    'overflow-clip',
];

const textindent = [
    'indent-0',
    'indent-0.5',
    'indent-1',
    'indent-1.5',
    'indent-2',
    'indent-2.5',
    'indent-3',
    'indent-3.5',
    'indent-4',
    'indent-5',
    'indent-6',
    'indent-8',
    'indent-10',
    'indent-12',
    'indent-14',
    'indent-16',
    'indent-20',
    'indent-24',
    'indent-28',
    'indent-32',
    'indent-36',
    'indent-40',
    'indent-44',
    'indent-48',
    'indent-52',
    'indent-56',
    'indent-64',
    'indent-72',
    'indent-80',
    'indent-96',
    'indent-px',
];

const verticalalign = [
    'align-baseline',
    'align-top',
    'align-middle',
    'align-bottom',
    'align-text-top',
    'align-text-bottom',
    'align-sub',
    'align-super',
];

const whitespace = [
    'whitespace-normal',
    'whitespace-nowrap',
    'whitespace-pre',
    'whitespace-pre-line',
    'whitespace-pre-wrap',
];

const wordbreak = [
    'break-normal',
    'break-words',
    'break-all',
];

const content = [
    'content-none',
];

const $$Tipografia = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="p-4 sm:ml-64"> <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontsize" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Size</option> ${fontsize.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontweight" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Weight</option> ${fontweight.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textcolor" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Color</option> ${textcolor.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textalign" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Align</option> ${textalign.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontfamily" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Family</option> ${fontfamily.map((font) => {
    return renderTemplate`<option${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontnumeric" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Variant Numeric</option> ${fontnumeric.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="letterspacing" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Letter Spacing</option> ${letterspacing.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="lineheight" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Line Height</option> ${lineheight.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="linestyle" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">List Style</option> ${linestyle.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="liststyleposition" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">List Style Position</option> ${liststyleposition.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontstyle" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Style</option> ${fontstyle.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="fontsmoothing" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Font Smoothing</option> ${fontsmoothing.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textdecoration" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Decoration</option> ${textdecoration.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textdecorationstyle" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Decoration Style</option> ${textdecorationstyle.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textdecorationthickness" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Decoration Thickness</option> ${textdecorationthickness.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option id="textunderlineoffset" disabled selected value="">Text Underline Offset</option> ${textunderlineoffset.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="texttransform" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Transform</option> ${texttransform.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textoverflow" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Overflow</option> ${textoverflow.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="textindent" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Text Indent</option> ${textindent.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="verticalalign" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Vertical Align</option> ${verticalalign.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div class="grid grid-cols-4 gap-4 mb-4"> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="whitespace" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">White Space</option> ${whitespace.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="wordbreak" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Word Break</option> ${wordbreak.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800"> <select id="content" class="block px-4 py-2 dark:bg-blue-600 rounded-xl hover:bg-gray-100 dark:hover:bg-blue-950 dark:hover:text-white"> <option disabled selected value="">Content</option> ${content.map((font) => {
    return renderTemplate`<option${addAttribute(font, "class")}${addAttribute(font, "value")}>${font}</option>`;
  })} </select> </div> </div> <div id="boton" class="flex items-center h-72 justify-center mb-4 rounded"> <iframe id="iframe" class="w-full h-72 border border-green-800 dark:border-green-600 rounded-2xl m-4" src="/cssindex.html">
            </iframe> <p id="texto" hidden>
boton
</p> </div> <div class="flex items-center justify-center h-12 mb-4 rounded"> <p id="codigo"></p> </div> </div> </div> `;
}, "/home/jose/Escritorio/componentsAstro/generatorCss/src/components/Tipografia.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Generator CSS" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto"> ${renderComponent($$result2, "MenuCss", $$MenuCss, {}, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Tipografia", $$Tipografia, {})} ` })} </main> ` })} `;
}, "/home/jose/Escritorio/componentsAstro/generatorCss/src/pages/index.astro", void 0);

const $$file = "/home/jose/Escritorio/componentsAstro/generatorCss/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
