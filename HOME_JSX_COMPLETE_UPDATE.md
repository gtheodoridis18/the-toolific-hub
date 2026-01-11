# COMPLETE HOME.JSX UPDATE - READY TO USE

## Add These Imports (after existing imports):

```javascript
// NEW TOOL IMPORTS
import WorkHoursCalculator from '../Components/tools/WorkHoursCalculator';
import OnlineNotepad from '../Components/tools/OnlineNotepad';
import LoremIpsumGenerator from '../Components/tools/LoremIpsumGenerator';
import CreditCardValidator from '../Components/tools/CreditCardValidator';
import BINChecker from '../Components/tools/BINChecker';
import PasswordGenerator from '../Components/tools/PasswordGenerator';
import ColorPaletteGenerator from '../Components/tools/ColorPaletteGenerator';
import HabitTracker from '../Components/tools/HabitTracker';

// NEW ICONS
import { 
  Briefcase, FileText, FileCode, CreditCard as CreditCardIcon,
  Shield, Palette, Target, Lock, MapPin, Network, Terminal,
  TrendingUp, Link as LinkIcon, BarChart3, Image, FileImage,
  Languages, Sparkles as SparklesIcon, Heart, Layers
} from 'lucide-react';
```

## Add Categories Array (before tools array):

```javascript
const CATEGORIES = [
  { id: 'all', name: 'All Tools' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'finance', name: 'Finance' },
  { id: 'security', name: 'Security' },
  { id: 'seo', name: 'SEO & Marketing' },
  { id: 'design', name: 'Design & Media' },
  { id: 'ai', name: 'AI Tools' },
  { id: 'utilities', name: 'Utilities' },
  { id: 'lifestyle', name: 'Lifestyle' }
];
```

## Complete Tools Array with Keywords:

```javascript
const tools = [
  // EXISTING TOOLS - UPDATE WITH KEYWORDS AND CATEGORY
  {
    id: 'calculator',
    icon: CalcIcon,
    title: 'Calculator',
    description: 'Basic arithmetic operations',
    keywords: ['math', 'arithmetic', 'calculate', 'numbers'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-violet-500 to-purple-600',
    component: Calculator,
  },
  {
    id: 'unit-converter',
    icon: ArrowRightLeft,
    title: 'Unit Converter',
    description: 'Length, weight & temperature',
    keywords: ['convert', 'units', 'measurement', 'metric', 'imperial'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    component: UnitConverter,
  },
  {
    id: 'timer',
    icon: TimerIcon,
    title: 'Timer',
    description: 'Countdown timer with alerts',
    keywords: ['countdown', 'alarm', 'stopwatch', 'time'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-amber-500 to-orange-600',
    component: Timer,
  },
  {
    id: 'stopwatch',
    icon: Clock,
    title: 'Stopwatch',
    description: 'Precise time tracking with laps',
    keywords: ['timer', 'track', 'laps', 'chronometer'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-rose-500 to-pink-600',
    component: Stopwatch,
  },
  {
    id: 'currency',
    icon: DollarSign,
    title: 'Currency Converter',
    description: 'Convert between major currencies',
    keywords: ['money', 'exchange', 'forex', 'conversion'],
    category: 'finance',
    gradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    component: CurrencyConverter,
  },
  {
    id: 'age',
    icon: Cake,
    title: 'Age Calculator',
    description: 'Calculate exact age from birth date',
    keywords: ['birthday', 'years', 'months', 'date'],
    category: 'lifestyle',
    gradient: 'bg-gradient-to-br from-fuchsia-500 to-purple-600',
    component: AgeCalculator,
  },
  {
    id: 'bmi',
    icon: Scale,
    title: 'BMI Calculator',
    description: 'Body Mass Index calculator',
    keywords: ['health', 'weight', 'fitness', 'body mass'],
    category: 'lifestyle',
    gradient: 'bg-gradient-to-br from-lime-500 to-green-600',
    component: BMICalculator,
  },
  {
    id: 'word-counter',
    icon: Type,
    title: 'Word Counter',
    description: 'Count words, characters & more',
    keywords: ['text', 'count', 'characters', 'reading time'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-sky-500 to-indigo-600',
    component: WordCounter,
  },
  {
    id: 'percentage',
    icon: Percent,
    title: 'Percentage Calculator',
    description: 'Calculate percentages & changes',
    keywords: ['percent', 'ratio', 'proportion', 'math'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    component: PercentageCalculator,
  },
  {
    id: 'text-case',
    icon: Type,
    title: 'Text Case Converter',
    description: 'Convert text to different cases',
    keywords: ['uppercase', 'lowercase', 'capitalize', 'text transform'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-violet-500 to-fuchsia-600',
    component: TextCaseConverter,
  },
  {
    id: 'qr-code',
    icon: QrCode,
    title: 'QR Code Generator',
    description: 'Generate QR codes instantly',
    keywords: ['qr', 'barcode', 'scan', 'code'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-slate-600 to-slate-800',
    component: QRCodeGenerator,
  },
  {
    id: 'url-cleaner',
    icon: Link2,
    title: 'URL Cleaner',
    description: 'Remove tracking parameters',
    keywords: ['link', 'url', 'clean', 'tracking', 'utm'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    component: URLCleaner,
  },
  {
    id: 'loan',
    icon: Banknote,
    title: 'Loan Calculator',
    description: 'Calculate EMI & loan payments',
    keywords: ['mortgage', 'emi', 'interest', 'payment', 'finance'],
    category: 'finance',
    gradient: 'bg-gradient-to-br from-green-500 to-emerald-600',
    component: LoanCalculator,
  },
  {
    id: 'timezone',
    icon: Globe,
    title: 'Time Zone Converter',
    description: 'Convert time between zones',
    keywords: ['timezone', 'world clock', 'time conversion'],
    category: 'utilities',
    gradient: 'bg-gradient-to-br from-orange-500 to-red-600',
    component: TimeZoneConverter,
  },

  // NEW TOOLS
  {
    id: 'work-hours',
    icon: Briefcase,
    title: 'Work Hours Calculator',
    description: 'Track time and calculate overtime',
    keywords: ['timecard', 'timesheet', 'payroll', 'overtime', 'shift', 'hours', 'work time'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    component: WorkHoursCalculator,
  },
  {
    id: 'notepad',
    icon: FileText,
    title: 'Online Notepad',
    description: 'Quick text editor with auto-save',
    keywords: ['notes', 'text editor', 'memo', 'write', 'document', 'notepad'],
    category: 'productivity',
    gradient: 'bg-gradient-to-br from-amber-500 to-yellow-600',
    component: OnlineNotepad,
  },
  {
    id: 'lorem-ipsum',
    icon: FileCode,
    title: 'Lorem Ipsum Generator',
    description: 'Generate placeholder text',
    keywords: ['lorem', 'ipsum', 'placeholder', 'dummy text', 'filler'],
    category: 'design',
    gradient: 'bg-gradient-to-br from-slate-500 to-gray-600',
    component: LoremIpsumGenerator,
  },
  {
    id: 'credit-card-validator',
    icon: CreditCardIcon,
    title: 'Credit Card Validator',
    description: 'Validate card numbers with Luhn check',
    keywords: ['credit card', 'debit card', 'validation', 'luhn', 'card number'],
    category: 'finance',
    gradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    component: CreditCardValidator,
  },
  {
    id: 'bin-checker',
    icon: CreditCardIcon,
    title: 'BIN Checker',
    description: 'Bank Identification Number lookup',
    keywords: ['bin', 'iin', 'bank', 'card issuer', 'identification'],
    category: 'finance',
    gradient: 'bg-gradient-to-br from-teal-500 to-cyan-600',
    component: BINChecker,
  },
  {
    id: 'password-generator',
    icon: Lock,
    title: 'Password Generator',
    description: 'Create strong, secure passwords',
    keywords: ['password', 'security', 'generate', 'strong password', 'secure'],
    category: 'security',
    gradient: 'bg-gradient-to-br from-red-500 to-rose-600',
    component: PasswordGenerator,
  },
  {
    id: 'color-palette',
    icon: Palette,
    title: 'Color Palette Generator',
    description: 'Create beautiful color schemes',
    keywords: ['color', 'palette', 'scheme', 'design', 'hex', 'rgb'],
    category: 'design',
    gradient: 'bg-gradient-to-br from-pink-500 to-purple-600',
    component: ColorPaletteGenerator,
  },
  {
    id: 'habit-tracker',
    icon: Target,
    title: 'Habit Tracker',
    description: 'Track daily habits and goals',
    keywords: ['habit', 'goal', 'tracker', 'routine', 'productivity', 'streak'],
    category: 'lifestyle',
    gradient: 'bg-gradient-to-br from-green-500 to-teal-600',
    component: HabitTracker,
  },
];
```

## Update Component State (after existing state):

```javascript
const [selectedCategory, setSelectedCategory] = useState('all');
```

## Update Filter Logic (replace existing filteredTools):

```javascript
const filteredTools = tools.filter(tool => {
  const query = searchQuery.toLowerCase();
  
  // Enhanced search: title, description, AND keywords
  const matchesSearch = !searchQuery || 
    tool.title.toLowerCase().includes(query) || 
    tool.description.toLowerCase().includes(query) ||
    (tool.keywords && tool.keywords.some(k => k.includes(query)));
    
  // Category filter
  const matchesCategory = 
    selectedCategory === 'all' || tool.category === selectedCategory;
    
  return matchesSearch && matchesCategory;
});
```

## Add Category Filter UI (after Search Bar, before Top Ad):

```jsx
{/* Category Filter */}
<div className="max-w-7xl mx-auto px-4 mb-6">
  <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
    {CATEGORIES.map(cat => (
      <button
        key={cat.id}
        onClick={() => setSelectedCategory(cat.id)}
        className={`px-4 py-2 rounded-xl font-medium transition-all whitespace-nowrap text-sm ${
          selectedCategory === cat.id
            ? 'bg-teal-600 text-white shadow-md'
            : 'bg-white border border-slate-200 text-slate-700 hover:border-teal-300'
        }`}
      >
        {cat.name}
      </button>
    ))}
  </div>
</div>

{/* Results Count */}
{searchQuery && (
  <div className="max-w-7xl mx-auto px-4 mb-4">
    <p className="text-sm text-slate-500">
      Found {filteredTools.length} tool{filteredTools.length !== 1 ? 's' : ''} matching "{searchQuery}"
    </p>
  </div>
)}
```

## Add to index.css (for scrollbar hiding):

```css
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
```

## That's It!

With these changes:
✅ All tools searchable by keywords
✅ Category filtering works
✅ Search + category filtering work together
✅ Clean, professional UI
✅ Matches existing design system
✅ Mobile responsive

The remaining 12 tools can be added following the same pattern as the 8 completed tools.
