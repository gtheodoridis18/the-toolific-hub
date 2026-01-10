# 🎨 VISUAL CONSISTENCY VERIFICATION GUIDE

Quick visual checklist to ensure perfect consistency across all tools.

---

## 🔍 **DROPDOWN ARROWS - Visual Check**

### **What to Look For:**
All dropdowns should have **identical arrow icons**:
- ✅ ChevronDown icon from lucide-react
- ✅ Width: 20px (w-5)
- ✅ Height: 20px (h-5)
- ✅ Position: Right side, centered vertically
- ✅ Color: slate-400 (default) or teal-600 (output sections)
- ✅ Pointer-events: none (doesn't block clicks)

### **Tools to Check:**
1. **Currency Converter** - 2 dropdowns (FROM & TO)
2. **Unit Converter** - 2 dropdowns (FROM & TO)
3. **Age Calculator** - 3 dropdowns (Day, Month, Year)

### **Visual Test:**
Open each tool → Look at dropdown arrows → Should all look IDENTICAL

---

## 📏 **INPUT HEIGHTS - Visual Check**

### **What to Look For:**
All inputs and dropdowns should be **same height**:
- ✅ Height: 56px (h-14)
- ✅ Border radius: 12px (rounded-xl)
- ✅ Padding: 16px (p-4 or px-4)

### **Tools to Check:**
1. **Currency Converter** - Input + Dropdowns
2. **Unit Converter** - Input + Dropdowns
3. **Age Calculator** - All 3 dropdowns
4. **BMI Calculator** - All inputs

### **Visual Test:**
Line up two tools side-by-side → Inputs should align perfectly

---

## 🎯 **SWAP BUTTONS - Visual Check**

### **What to Look For:**
All swap buttons should be **identical**:
- ✅ Size: 48x48px (h-12 w-12)
- ✅ Shape: Perfect circle (rounded-full)
- ✅ Border: 2px solid (border-2)
- ✅ Border color: slate-200
- ✅ Icon: ArrowRightLeft
- ✅ Icon size: 20px (w-5 h-5)
- ✅ Icon color: teal-600
- ✅ Hover: border-teal-500 + bg-teal-50

### **Tools to Check:**
1. **Currency Converter** - Center swap button
2. **Unit Converter** - Center swap button

### **Visual Test:**
Hover over both → Should animate identically

---

## 📝 **PLACEHOLDER TEXT - Visual Check**

### **What to Look For:**
All placeholders should use **"e.g." format**:
- ✅ Format: "e.g. [number]"
- ✅ Examples: "e.g. 100", "e.g. 170"
- ✅ Color: text-slate-400
- ✅ NOT real default values

### **Tools to Check:**
1. **Currency Converter** - "e.g. 100"
2. **Unit Converter** - "e.g. 100"
3. **BMI Calculator** - "e.g. 170", "e.g. 70", "e.g. 5", "e.g. 10"

### **Visual Test:**
Clear all inputs → Placeholders should all show "e.g." prefix

---

## 🎨 **COLOR SCHEME - Visual Check**

### **Input Sections (FROM / Before):**
- ✅ Background: bg-slate-50 (#f8fafc)
- ✅ Border: border-slate-200 (#e2e8f0)
- ✅ Padding: p-4 (16px)
- ✅ Border radius: rounded-2xl (16px)

### **Output Sections (TO / After):**
- ✅ Background: bg-teal-50 (#f0fdfa)
- ✅ Border: border-teal-100 (#ccfbf1)
- ✅ Padding: p-4 (16px)
- ✅ Border radius: rounded-2xl (16px)

### **Visual Test:**
Input sections should be LIGHT GRAY, Output sections should be LIGHT TEAL

---

## 📱 **MOBILE RESPONSIVENESS - Visual Check**

### **Breakpoint: 640px (sm:)**
At smaller screens:
- ✅ flex-col → flex-row should switch at 640px
- ✅ No horizontal overflow
- ✅ All buttons remain 44px+ minimum
- ✅ Text remains readable
- ✅ Dropdowns fit within viewport

### **Tools to Check:**
1. **Currency Converter** - Layout stacks on mobile
2. **Unit Converter** - Layout stacks on mobile
3. **Age Calculator** - 3-column grid remains
4. **BMI Calculator** - Two-input layout works

### **Visual Test:**
Chrome DevTools → Responsive mode → Test at 375px, 640px, 768px widths

---

## ⚡ **INTERACTION STATES - Visual Check**

### **Focus States:**
When clicking inputs/dropdowns:
- ✅ Border color changes to teal-500
- ✅ No outline (outline-none)
- ✅ Smooth transition (transition-colors)

### **Hover States:**
Buttons should have:
- ✅ Background color change
- ✅ Smooth transition
- ✅ Cursor: pointer

### **Active States:**
- ✅ Scale down slightly (active:scale-95) - where applicable
- ✅ No flash of unstyled content

### **Visual Test:**
Tab through all inputs → Focus rings should be consistent teal

---

## 🎯 **TYPOGRAPHY - Visual Check**

### **Labels:**
- ✅ Size: text-xs (12px)
- ✅ Weight: font-medium
- ✅ Color: text-slate-500
- ✅ Transform: uppercase
- ✅ Tracking: tracking-wide
- ✅ Margin bottom: mb-2 or mb-3

### **Input Text:**
- ✅ Size: text-lg (18px) or text-2xl (24px for currency)
- ✅ Weight: font-medium or font-light
- ✅ Color: text-slate-900

### **Result Text:**
- ✅ Size: text-lg to text-5xl (varies by component)
- ✅ Weight: font-light
- ✅ Color: context-dependent

### **Visual Test:**
All labels should look the same size and style across tools

---

## 🧪 **FUNCTIONALITY - Quick Test**

### **Currency Converter:**
1. Enter "100" → Should show converted value or example
2. Click swap → Values should exchange
3. Change currency → Should recalculate
4. Clear input → Should show example value

### **Unit Converter:**
1. Enter "100" → Should show converted value
2. Click swap → Values should exchange
3. Change category → Should reset values
4. Clear input → Should show example value

### **Age Calculator:**
1. Select date → Should show age breakdown
2. Invalid date → Should show nothing (no error)
3. Future date → Should show nothing

### **BMI Calculator:**
1. Enter height & weight → Should show BMI
2. Toggle metric/imperial → Should recalculate
3. Clear values → Result should disappear

---

## 📋 **QUICK CHECKLIST**

Run through this in 5 minutes:

- [ ] All dropdown arrows look the same ✓
- [ ] All inputs are the same height ✓
- [ ] All swap buttons are identical ✓
- [ ] All placeholders use "e.g." format ✓
- [ ] Input sections are light gray ✓
- [ ] Output sections are light teal ✓
- [ ] No horizontal overflow on mobile ✓
- [ ] Focus states are teal ✓
- [ ] All buttons respond to hover ✓
- [ ] All tools function correctly ✓

---

## 🚨 **RED FLAGS - What to Report**

If you see ANY of these, something is wrong:

- ❌ Unicode arrow `▼` instead of ChevronDown icon
- ❌ Different input heights (some taller/shorter)
- ❌ Different border radiuses (some more rounded)
- ❌ Placeholder showing real values (like "1" or "100" without "e.g.")
- ❌ Dropdowns without arrows
- ❌ Inconsistent colors between sections
- ❌ Horizontal scroll on mobile
- ❌ Buttons too small to tap on mobile (< 44px)
- ❌ Console errors in DevTools
- ❌ Tools not functioning correctly

---

## ✅ **PASS CRITERIA**

**All checks must pass before proceeding to new features.**

If everything looks consistent and functions correctly:
- ✅ **STANDARDIZATION SUCCESSFUL**
- ✅ **READY FOR PASSWORD GENERATOR**

---

**Use this guide every time you add a new tool to maintain consistency!** 🎯
