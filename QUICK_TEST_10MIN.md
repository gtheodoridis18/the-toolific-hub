# ⚡ QUICK TESTING GUIDE - 10 MINUTES

**Test these 5 critical fixes in order:**

---

## 1️⃣ **DROPDOWN EXPANSION TEST** (2 min) - CRITICAL

**Tool:** Time Zone Converter

**Steps:**
1. Open Time Zone Converter tool
2. Click "From Time Zone" dropdown
3. **✅ PASS if:** Dropdown menu appears ABOVE the tool, not clipped
4. **❌ FAIL if:** Dropdown is cut off by the accordion
5. Scroll page up/down while dropdown open
6. **✅ PASS if:** Dropdown stays positioned correctly
7. Click "To Time Zone" dropdown
8. **✅ PASS if:** Same behavior (not clipped)

**Mobile Test:**
- Set width to 375px (iPhone SE)
- Repeat above
- **✅ PASS if:** Dropdown doesn't cause horizontal scroll

---

## 2️⃣ **TIME ZONE LOGIC TEST** (1 min)

**Tool:** Time Zone Converter

**Steps:**
1. Set FROM: `America/New_York`
2. Set TO: `Europe/London`
3. Enter time: `2026-01-09 14:00` (2 PM)
4. **✅ PASS if:** Result shows `7:00 PM` or `19:00` (5 hour difference)
5. Set both FROM and TO to same timezone
6. **✅ PASS if:** Times match (no error)

---

## 3️⃣ **PLACEHOLDER TEST** (2 min)

**Tools:** Loan Calculator, Percentage Calculator

**Steps:**
1. Open Loan Calculator
2. Check all 3 inputs
3. **✅ PASS if:** All show "e.g. [number]" format
4. Open Percentage Calculator
5. Check all inputs
6. **✅ PASS if:** All show "e.g. [number]" format

**Quick Check:**
- No input should have just "100" or "10" without "e.g."
- All should follow: `e.g. 25000`, `e.g. 5.5`, etc.

---

## 4️⃣ **BMI ANIMATION TEST** (2 min)

**Tool:** BMI Calculator

**Steps:**
1. Keep Metric selected
2. Enter Height: `170`
3. Enter Weight: `70`
4. **Watch the animation:**
   - Result card should fade in smoothly
   - BMI number should scale gently
   - Pointer should slide smoothly (not jump)
5. **✅ PASS if:** Animation feels calm and smooth
6. **❌ FAIL if:** Jerky, instant, or flickering

**Change Test:**
- Change weight to `80`
- **✅ PASS if:** Pointer slides smoothly to new position

---

## 5️⃣ **CALCULATOR PERFORMANCE TEST** (3 min)

**Tool:** Calculator

**Desktop Test:**
1. Tap buttons: `5` `+` `3` `=`
2. **✅ PASS if:** Result is `8`
3. Tap: `1` `0` `÷` `3` `=`
4. **✅ PASS if:** Result is `3.33333...`
5. Tap: `5` `÷` `0` `=`
6. **✅ PASS if:** Shows `Error`

**Mobile Test (CRITICAL):**
1. Set width to 375px
2. Rapidly tap: `1` `2` `3` `4` `5`
3. **✅ PASS if:** All numbers appear instantly (no lag)
4. **❌ FAIL if:** Buttons feel slow or unresponsive

**Edge Case:**
1. Tap: `5` `+` `+` `+` `3` `=`
2. **✅ PASS if:** Handles gracefully (result is `8`)

---

## ✅ **PASS/FAIL SUMMARY**

| Test | Status | Notes |
|------|--------|-------|
| Dropdown Expansion | ☐ Pass / ☐ Fail | |
| Time Zone Logic | ☐ Pass / ☐ Fail | |
| Placeholders | ☐ Pass / ☐ Fail | |
| BMI Animation | ☐ Pass / ☐ Fail | |
| Calculator Mobile | ☐ Pass / ☐ Fail | |

---

## 🚨 **IF SOMETHING FAILS:**

### **Dropdown still clips:**
- Check browser: Use Chrome/Firefox (latest)
- Clear cache: `Ctrl+Shift+R` or `Cmd+Shift+R`
- Check console for errors
- Verify z-index: Should be 9999

### **Time Zone wrong:**
- Verify browser supports Intl API
- Check system timezone settings
- Try different timezone pairs

### **Placeholders missing:**
- Clear cache and refresh
- Check you're running latest code
- Verify build completed successfully

### **Animation laggy:**
- Check device performance
- Close other browser tabs
- Try incognito mode

### **Calculator slow on mobile:**
- Clear browser cache
- Check CPU usage
- Try different browser

---

## 📊 **EXPECTED RESULTS**

**All 5 tests should PASS.**

If ANY test fails:
1. Note which test failed
2. Check console for errors
3. Try clearing cache
4. Report exact failure scenario

---

## ⏱️ **TIME TRACKING**

- Dropdown test: 2 min
- Timezone test: 1 min
- Placeholder test: 2 min
- BMI animation: 2 min
- Calculator: 3 min

**Total: 10 minutes**

---

## 🎯 **READY TO TEST?**

```bash
npm install
npm run dev
```

Visit: `http://localhost:5173`

**Start with Test #1 (Dropdown) - the most critical fix.**

---

**If all 5 tests PASS → ✅ Fixes are successful!**
