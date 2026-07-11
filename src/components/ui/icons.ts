import {
  AlertCircle,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Eye,
  EyeOff,
  Globe,
  Info,
  LayoutGrid,
  Loader,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Minus,
  Moon,
  Search,
  Settings,
  Sparkles,
  Sun,
  User,
  X,
} from "lucide-react";

/**
 * APYX Icon Registry
 * 
 * This registry acts as the single source of truth for icons used in the APYX platform.
 * To use a new icon, import it from 'lucide-react' and export it here.
 * 
 * Why?
 * 1. Guarantees consistency (e.g., always using 'X' instead of mixing 'X' and 'Close')
 * 2. Makes it easy to swap the underlying library in the future if needed.
 */
export const Icons = {
  // Navigation & UI
  menu: Menu,
  close: X,
  search: Search,
  settings: Settings,
  eye: Eye,
  eyeOff: EyeOff,
  alertCircle: AlertCircle,
  alertTriangle: AlertTriangle,
  checkCircle: CheckCircle,
  check: Check,
  minus: Minus,
  info: Info,
  
  // Arrows & Chevrons
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,

  // Metadata & Content
  calendar: Calendar,
  clock: Clock,
  location: MapPin,
  user: User,
  mail: Mail,
  grid: LayoutGrid,

  // State & Indicators
  loader: Loader,
  spinner: Loader2,
  sparkles: Sparkles,
  
  // Theme
  sun: Sun,
  moon: Moon,

  // Social & Brands
  website: Globe,
} as const;

export type APYXIcon = keyof typeof Icons;
