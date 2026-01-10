# 🎨 TOOLIFIC HUB - DESIGN SYSTEM REFERENCE

Quick reference for maintaining consistency across all tools.

---

## 📐 LAYOUT PATTERNS

### **Tool Container**
```jsx
<div className="w-full max-w-xl mx-auto">
  {/* Tool content */}
</div>
```
- Max width: `max-w-xl` (640px) for most tools
- Max width: `max-w-md` (448px) for compact tools (BMI, Timer, Stopwatch)
- Max width: `max-w-2xl` (672px) for text-heavy tools (Word Counter, Percentage)
- Always centered: `mx-auto`

---

## 🎨 COLOR SYSTEM

### **Input Sections (FROM / Before)**
```jsx
className="bg-slate-50 rounded-2xl p-4 border border-slate-200"
```

### **Output Sections (TO / After)**
```jsx
className="bg-teal-50 rounded-2xl p-4 border border-teal-100"
```

### **Result Display**
```jsx
className="bg-teal-600 text-white rounded-xl px-4 py-3"
```

### **Labels**
```jsx
className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 block"
```

### **Output Labels**
```jsx
className="text-xs font-medium text-teal-700 uppercase tracking-wide mb-2 block"
```

---

## 🔘 INPUT COMPONENTS

### **Text Input**
```jsx
<input
  type="text"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="e.g. 100"
  className="w-full h-14 px-4 text-lg rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
/>
```

### **Number Input**
```jsx
<input
  type="number"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="e.g. 100"
  className="w-full h-14 px-4 text-lg font-medium rounded-xl border border-slate-200 focus:border-teal-500 focus:outline-none transition-colors"
/>
```

### **Custom Dropdown (With ChevronDown)**
```jsx
import { ChevronDown } from 'lucide-react';

<div className="relative">
  <select
    value={value}
    onChange={(e) => setValue(e.target.value)}
    className="w-full h-14 pl-4 pr-10 rounded-xl border border-slate-200 bg-white appearance-none focus:border-teal-500 focus:outline-none transition-colors"
  >
    <option value="">Select...</option>
    {/* options */}
  </select>
  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
</div>
```

### **Textarea**
```jsx
<textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder="Enter text here..."
  className="w-full min-h-[160px] rounded-xl border border-slate-200 p-4 text-base resize-y focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none"
/>
```

---

## 🔘 BUTTON COMPONENTS

### **Primary Button**
```jsx
<button className="h-12 px-6 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-medium transition-colors">
  Button Text
</button>
```

### **Secondary Button**
```jsx
<button className="h-12 px-6 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-900 font-medium transition-colors">
  Button Text
</button>
```

### **Icon Button**
```jsx
<button className="h-12 w-12 rounded-full border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-all">
  <Icon className="w-5 h-5 text-teal-600" />
</button>
```

### **Category Pills / Toggles**
```jsx
<button
  onClick={() => setCategory(cat)}
  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
    category === cat 
      ? 'bg-teal-500 text-white shadow-md' 
      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
  }`}
>
  {cat}
</button>
```

---

## 📊 OUTPUT DISPLAYS

### **Read-Only Result (with value)**
```jsx
<div className="w-full h-14 bg-white px-4 flex items-center text-lg font-medium border border-teal-200 rounded-xl">
  {value || '—'}
</div>
```

### **Large Result Card**
```jsx
<div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-6 text-white">
  <p className="text-teal-100 text-sm uppercase tracking-wide mb-2">
    Label
  </p>
  <p className="text-5xl font-light">
    {value}
  </p>
</div>
```

### **Small Stat Card**
```jsx
<div className="bg-white rounded-xl p-4 border border-slate-200">
  <p className="text-xs text-slate-500 uppercase mb-1">Label</p>
  <p className="text-2xl font-light text-slate-900">{value}</p>
</div>
```

---

## 🔄 SWAP BUTTON PATTERN

```jsx
import { ArrowRightLeft } from 'lucide-react';

<div className="flex justify-center mb-4">
  <button
    onClick={swap}
    className="h-12 w-12 rounded-full border-2 border-slate-200 hover:border-teal-500 hover:bg-teal-50 flex items-center justify-center transition-all"
    aria-label="Swap units"
  >
    <ArrowRightLeft className="w-5 h-5 text-teal-600" />
  </button>
</div>
```

---

## 📱 RESPONSIVE PATTERNS

### **Flexible Input Row**
```jsx
<div className="flex flex-col sm:flex-row gap-3">
  <input className="flex-1 ..." />
  <select className="sm:w-48 ..." />
</div>
```

### **Grid Responsive**
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {/* Cards */}
</div>
```

### **Wrap Pills/Buttons**
```jsx
<div className="flex flex-wrap gap-2">
  {categories.map(cat => (
    <button key={cat}>...</button>
  ))}
</div>
```

---

## ✨ ANIMATION PATTERNS

### **Fade In Result**
```jsx
import { motion, AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {result && (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Result content */}
    </motion.div>
  )}
</AnimatePresence>
```

### **Scale on Active**
```jsx
<motion.button
  whileTap={{ scale: 0.95 }}
  className="..."
>
  Click Me
</motion.button>
```

---

## 🎯 ICON USAGE

### **Always from lucide-react**
```jsx
import { 
  Calculator, 
  ArrowRightLeft, 
  Copy, 
  Check,
  ChevronDown,
  // ... etc
} from 'lucide-react';
```

### **Icon Sizes**
- Small inline: `w-4 h-4`
- Medium (labels): `w-5 h-5`
- Large (headers): `w-6 h-6`

### **Icon Colors**
- Primary actions: `text-teal-600`
- Inactive: `text-slate-400`
- Success: `text-green-600`
- Error: `text-red-600`

---

## 📝 TYPOGRAPHY SCALE

### **Headings (Tool Labels)**
```jsx
<h3 className="font-semibold text-slate-900 text-lg">
  Tool Name
</h3>
```

### **Section Labels**
```jsx
<label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
  Label Text
</label>
```

### **Results (Large Numbers)**
```jsx
<p className="text-5xl font-light text-slate-900">
  {value}
</p>
```

### **Body Text**
```jsx
<p className="text-base text-slate-600">
  Description text
</p>
```

### **Helper Text**
```jsx
<p className="text-xs text-slate-400 mt-2">
  Additional info
</p>
```

---

## 🎨 SPACING SYSTEM

### **Gaps**
- Between elements: `gap-2`, `gap-3`, `gap-4`
- Between sections: `gap-6`

### **Padding**
- Small cards: `p-4`
- Large sections: `p-6`
- Inputs: `px-4` (horizontal)

### **Margins**
- Between major sections: `mb-6`
- Between related items: `mb-4`
- Between labels and inputs: `mb-2`

---

## 🎯 PLACEHOLDER PATTERNS

### **DO ✅**
```jsx
placeholder="e.g. 100"
placeholder="https://example.com"
placeholder="Type or paste text..."
```

### **DON'T ❌**
```jsx
placeholder="100"  // No "e.g."
value="1"          // No default real values
```

**Exception:** Only set default values when it makes sense for immediate demo (like Timer with 5:00)

---

## 🔄 COPY-TO-CLIPBOARD PATTERN

```jsx
import { Copy, Check } from 'lucide-react';

const [copied, setCopied] = useState(false);

const copyToClipboard = () => {
  navigator.clipboard.writeText(value);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

<button
  onClick={copyToClipboard}
  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm transition"
>
  {copied ? (
    <>
      <Check className="w-4 h-4" />
      Copied
    </>
  ) : (
    <>
      <Copy className="w-4 h-4" />
      Copy
    </>
  )}
</button>
```

---

## 🚨 ERROR STATE PATTERN

```jsx
{error && (
  <div className="bg-red-50 rounded-xl p-4 border border-red-200">
    <p className="text-red-600 text-sm">{error}</p>
  </div>
)}
```

---

## 💡 EMPTY STATE PATTERN

```jsx
{!value && (
  <div className="text-center py-8">
    <p className="text-slate-400 text-sm">
      Your result will appear here
    </p>
  </div>
)}
```

---

## 🎨 GRADIENT BACKGROUNDS (For Tool Icons in Accordion)

Already defined in Home.jsx:
```jsx
gradient: 'bg-gradient-to-br from-violet-500 to-purple-600'
gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600'
gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600'
// etc...
```

---

## 📋 QUICK CHECKLIST FOR NEW TOOLS

- [ ] Max width container (`max-w-xl mx-auto`)
- [ ] Slate-50 for input sections
- [ ] Teal-50 for output sections
- [ ] Custom dropdown arrows (ChevronDown)
- [ ] Placeholders with "e.g." prefix
- [ ] Labels in UPPERCASE with tracking-wide
- [ ] Responsive (flex-col sm:flex-row)
- [ ] Icons from lucide-react
- [ ] Smooth transitions
- [ ] Empty state handling
- [ ] Error handling
- [ ] Copy button (if applicable)
- [ ] Mobile tested

---

## 🎯 CONSISTENCY IS KEY

**Every tool should feel like it belongs to the same family.**

When in doubt, reference:
- Currency Converter (conversion pattern)
- Age Calculator (dropdown pattern)
- BMI Calculator (toggle pattern)
- Unit Converter (category pattern)

---

**This is a living document. Update as patterns evolve!** 🚀
