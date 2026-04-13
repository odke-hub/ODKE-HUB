/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Printer, 
  Layout, 
  PenTool, 
  Globe, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X,
  Layers,
  Cpu,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Zap,
  FileCode,
  RefreshCcw,
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

// --- Types & Data ---

type ServiceCategory = {
  id: string;
  name: string;
  basePrice: number;
  icon: ReactNode;
};

type Tier = {
  id: string;
  name: string;
  multiplier: number;
  description: string;
};

type Extra = {
  id: string;
  name: string;
  price: number;
  icon: ReactNode;
};

const SERVICE_CATEGORIES: ServiceCategory[] = [
  { id: "logo", name: "Logo Design", basePrice: 150, icon: <PenTool className="w-5 h-5" /> },
  { id: "branding", name: "Branding Kit", basePrice: 400, icon: <Layers className="w-5 h-5" /> },
  { id: "flyer", name: "Flyer / Poster", basePrice: 80, icon: <Layout className="w-5 h-5" /> },
  { id: "large", name: "Large Format", basePrice: 200, icon: <Printer className="w-5 h-5" /> },
  { id: "social", name: "Social Media Kit", basePrice: 120, icon: <Globe className="w-5 h-5" /> },
  { id: "arch", name: "Architectural Graphics", basePrice: 300, icon: <Cpu className="w-5 h-5" /> },
];

const TIERS: Tier[] = [
  { id: "basic", name: "Basic", multiplier: 1.0, description: "Essential features for startups." },
  { id: "standard", name: "Standard", multiplier: 1.8, description: "Professional grade for growing businesses." },
  { id: "premium", name: "Premium", multiplier: 3.0, description: "High-end solutions for global leaders." },
];

const EXTRAS: Extra[] = [
  { id: "fast", name: "Fast Delivery", price: 50, icon: <Zap className="w-4 h-4" /> },
  { id: "source", name: "Source Files", price: 30, icon: <FileCode className="w-4 h-4" /> },
  { id: "revisions", name: "Extra Revisions", price: 40, icon: <RefreshCcw className="w-4 h-4" /> },
  { id: "consult", name: "Print Consult", price: 60, icon: <MessageSquare className="w-4 h-4" /> },
];

// --- Types & Data ---

type CaseStudy = {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "skyline",
    title: "Skyline Residences",
    category: "Real Estate",
    image: "https://picsum.photos/seed/arch1/1200/800",
    description: "A comprehensive visual identity for a luxury residential complex in Nairobi.",
    challenge: "The client needed to convey both modern luxury and structural reliability to international investors.",
    solution: "We developed a minimalist brand system based on architectural blueprints, using high-contrast slate and silver palettes.",
    results: ["95% Pre-sale occupancy", "International design award nominee", "Brand consistency across 12 touchpoints"]
  },
  {
    id: "techflow",
    title: "TechFlow Labs",
    category: "SaaS Branding",
    image: "https://picsum.photos/seed/tech2/1200/800",
    description: "Global rebranding for a software development firm expanding into the European market.",
    challenge: "The existing brand felt too local and lacked the technical 'edge' required for high-stakes B2B contracts.",
    solution: "A mathematical logo system and a dark-mode first digital presence that emphasizes precision and speed.",
    results: ["40% Increase in lead quality", "Successful Series B funding round", "Unified global brand guidelines"]
  }
];

// --- Components ---

const CaseStudyModal = ({ 
  isOpen, 
  onClose, 
  caseStudy,
  onStartProject
}: { 
  isOpen: boolean; 
  onClose: () => void;
  caseStudy: CaseStudy | null;
  onStartProject: () => void;
}) => {
  if (!isOpen || !caseStudy) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/80 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="relative w-full max-w-5xl bg-white overflow-hidden rounded-lg shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-6 right-6 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors md:text-primary md:bg-muted md:hover:bg-border" aria-label="Close">
          <X className="w-5 h-5" />
        </button>

        <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
          <img src={caseStudy.image} alt={caseStudy.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
        </div>

        <div className="flex-1 p-8 md:p-12 overflow-y-auto">
          <Badge className="mb-4 bg-primary text-white px-3 py-1 rounded-md uppercase tracking-widest text-[10px] font-bold">
            {caseStudy.category}
          </Badge>
          <h2 className="text-4xl font-display font-bold mb-6">{caseStudy.title}</h2>
          
          <div className="space-y-8 mb-12">
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">The Challenge</h4>
              <p className="text-secondary leading-relaxed">{caseStudy.challenge}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Our Solution</h4>
              <p className="text-secondary leading-relaxed">{caseStudy.solution}</p>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-widest font-bold text-primary/40 mb-2">Key Results</h4>
              <ul className="space-y-2">
                {caseStudy.results.map((r, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-primary">
                    <CheckCircle2 className="text-primary w-4 h-4" /> {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => { onClose(); onStartProject(); }} 
              className="btn-cta flex-1"
            >
              Start Similar Project
            </button>
            <button onClick={onClose} className="btn-cta-outline flex-1">
              Back to Portfolio
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const QuoteBuilder = ({ 
  isOpen, 
  onClose, 
  initialCategory, 
  initialTier 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  initialCategory?: string | null;
  initialTier?: string | null;
}) => {
  const [step, setStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("standard");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "", description: "" });

  // Reset state when opened with initial values
  useEffect(() => {
    if (isOpen) {
      setSelectedCategory(initialCategory || null);
      setSelectedTier(initialTier || "standard");
      setStep(initialCategory ? 2 : 1);
      setSelectedExtras([]);
    }
  }, [isOpen, initialCategory, initialTier]);

  const totalPrice = useMemo(() => {
    const category = SERVICE_CATEGORIES.find(c => c.id === selectedCategory);
    if (!category) return 0;
    const tier = TIERS.find(t => t.id === selectedTier);
    const base = category.basePrice * (tier?.multiplier || 1);
    const extrasTotal = selectedExtras.reduce((acc, id) => {
      const extra = EXTRAS.find(e => e.id === id);
      return acc + (extra?.price || 0);
    }, 0);
    return Math.round(base + extrasTotal);
  }, [selectedCategory, selectedTier, selectedExtras]);

  const handleExtraToggle = (id: string) => {
    setSelectedExtras(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-primary/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-4xl bg-white overflow-hidden rounded-lg shadow-2xl flex flex-col md:flex-row"
      >
        {/* Sidebar / Progress */}
        <div className="w-full md:w-1/3 bg-primary p-8 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="text-muted w-6 h-6" />
              <span className="font-display font-bold text-lg tracking-tight">Precision Quote</span>
            </div>
            <div className="space-y-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-4">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                    step >= s ? "bg-white text-primary" : "bg-white/10 text-white/40"
                  )}>
                    {s}
                  </div>
                  <span className={cn("text-sm font-semibold", step >= s ? "text-white" : "text-white/40")}>
                    {s === 1 ? "Select Service" : s === 2 ? "Customize Package" : "Final Details"}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="text-xs uppercase tracking-widest text-white/60 mb-2 font-bold">Estimated Investment</div>
            <div className="text-4xl font-display font-bold text-white">${totalPrice}</div>
            <div className="text-[10px] text-white/40 mt-4 uppercase tracking-wider leading-relaxed">Final price may vary based on specific project requirements</div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-8 md:p-12 overflow-y-auto max-h-[80vh] md:max-h-none">
          <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-background rounded-full transition-colors" aria-label="Close">
            <X className="w-5 h-5" />
          </button>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">What are we building?</h2>
                  <p className="text-secondary">Select the category that best fits your project needs.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICE_CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); setStep(2); }}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-md border-2 text-left transition-all group",
                        selectedCategory === cat.id ? "border-primary bg-background" : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className={cn(
                        "w-10 h-10 rounded-md flex items-center justify-center transition-colors",
                        selectedCategory === cat.id ? "bg-primary text-white" : "bg-background text-secondary group-hover:bg-primary/10 group-hover:text-primary"
                      )}>
                        {cat.icon}
                      </div>
                      <span className="font-bold text-sm">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">Tailor your package</h2>
                  <p className="text-secondary">Choose a tier and add any professional extras.</p>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold text-secondary">Select Tier</label>
                  <div className="grid grid-cols-1 gap-3">
                    {TIERS.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier.id)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-md border-2 text-left transition-all",
                          selectedTier === tier.id ? "border-primary bg-background" : "border-border"
                        )}
                      >
                        <div>
                          <div className="font-bold text-sm">{tier.name}</div>
                          <div className="text-xs text-secondary">{tier.description}</div>
                        </div>
                        <div className="text-sm font-bold font-mono text-primary">x{tier.multiplier.toFixed(1)}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold text-secondary">Add Extras</label>
                  <div className="grid grid-cols-2 gap-3">
                    {EXTRAS.map((extra) => (
                      <button
                        key={extra.id}
                        onClick={() => handleExtraToggle(extra.id)}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-md border-2 text-left transition-all",
                          selectedExtras.includes(extra.id) ? "border-primary bg-background" : "border-border"
                        )}
                      >
                        <div className={cn(
                          "w-8 h-8 rounded-md flex items-center justify-center",
                          selectedExtras.includes(extra.id) ? "bg-primary text-white" : "bg-background text-secondary"
                        )}>
                          {extra.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs font-bold">{extra.name}</div>
                          <div className="text-[10px] text-secondary font-bold">+${extra.price}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="btn-cta-outline flex-1 py-3">Back</button>
                  <button onClick={() => setStep(3)} className="btn-cta flex-1 py-3">Next Step</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div 
                key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold mb-2">Finalize Request</h2>
                  <p className="text-secondary">Provide your contact details to receive your formal quote.</p>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">Name</label>
                      <Input placeholder="John Doe" className="rounded-md border-border" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-primary">WhatsApp</label>
                      <Input placeholder="+254..." className="rounded-md border-border" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Email</label>
                    <Input placeholder="john@company.com" className="rounded-md border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-primary">Project Description</label>
                    <Textarea placeholder="Tell us more about your vision..." className="rounded-md border-border min-h-[100px]" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(2)} className="btn-cta-outline flex-1 py-3">Back</button>
                  <button className="btn-cta flex-1 py-3">Submit Request</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [quoteState, setQuoteState] = useState<{ isOpen: boolean; category: string | null; tier: string | null }>({
    isOpen: false,
    category: null,
    tier: null
  });
  const [caseStudyState, setCaseStudyState] = useState<{ isOpen: boolean; study: CaseStudy | null }>({
    isOpen: false,
    study: null
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openQuote = (category: string | null = null, tier: string | null = null) => {
    setQuoteState({ isOpen: true, category, tier });
    setIsMenuOpen(false);
  };

  const closeQuote = () => {
    setQuoteState(prev => ({ ...prev, isOpen: false }));
  };

  const openCaseStudy = (study: CaseStudy) => {
    setCaseStudyState({ isOpen: true, study });
  };

  const closeCaseStudy = () => {
    setCaseStudyState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-background selection:bg-accent selection:text-white grid-bg">
      <AnimatePresence>
        {quoteState.isOpen && (
          <QuoteBuilder 
            isOpen={quoteState.isOpen} 
            onClose={closeQuote} 
            initialCategory={quoteState.category}
            initialTier={quoteState.tier}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {caseStudyState.isOpen && (
          <CaseStudyModal 
            isOpen={caseStudyState.isOpen} 
            onClose={closeCaseStudy} 
            caseStudy={caseStudyState.study}
            onStartProject={() => openQuote(caseStudyState.study?.id === "skyline" ? "arch" : "branding")}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white border-b py-4 shadow-sm" : "bg-transparent py-8"
      )}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-md group-hover:bg-accent transition-colors">
              <Sparkles className="text-white w-6 h-6" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight uppercase">Precision</span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {["Services", "Portfolio", "Pricing", "About"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-secondary hover:text-accent transition-colors">
                {item}
              </a>
            ))}
            <button onClick={() => openQuote()} className="btn-cta text-sm py-2 px-6">
              Build Your Package
            </button>
          </div>

          <button className="md:hidden p-2 text-primary" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {["Services", "Portfolio", "Pricing", "About"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-4xl font-display font-extrabold tracking-tighter" onClick={() => setIsMenuOpen(false)}>
                  {item}
                </a>
              ))}
              <button onClick={() => openQuote()} className="btn-cta w-full py-6">
                Get Instant Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 md:pt-64 md:pb-48 overflow-hidden bg-background">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-8 rounded-md border-primary/20 bg-white px-4 py-1.5 text-xs uppercase tracking-widest font-bold text-primary">
                Nairobi Based • Global Standards
              </Badge>
              <h1 className="text-h1">
                ENGINEERING <br />
                <span className="text-primary/60">VISUAL IMPACT.</span>
              </h1>
              <p className="text-body">
                We apply architectural rigor to premium branding. 
                High-end design and print solutions for international visionaries who value precision and trust.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => openQuote()} className="btn-cta">
                  Start Your Project
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => openQuote()} className="btn-cta-outline bg-white">
                  Get Instant Quote
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-h2">
                ELITE DESIGN <br /> CAPABILITIES.
              </h2>
              <p className="text-body">
                From architectural graphics to global brand systems, we deliver with mathematical precision and absolute clarity.
              </p>
            </div>
            <button onClick={() => openQuote()} className="text-primary font-bold text-lg flex items-center gap-2 hover:underline">
              Build Your Package <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SERVICE_CATEGORIES.map((service, i) => (
              <motion.div
                key={i} whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => openQuote(service.id)}
              >
                <Card className="h-full rounded-lg border-border bg-background shadow-sm hover:border-primary transition-all p-2">
                  <CardHeader className="pb-4">
                    <div className="w-14 h-14 rounded-md bg-white flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{service.name}</CardTitle>
                    <CardDescription className="text-secondary font-medium pt-2">
                      Starting from <span className="text-primary font-bold">${service.basePrice}</span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-primary font-bold text-sm">
                      Get Quote <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="section-dark">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-h2">
                GLOBAL <br /> PORTFOLIO.
              </h2>
              <p className="text-body">
                High-stakes visual systems delivered for international partners with uncompromising quality.
              </p>
            </div>
            <button onClick={() => openQuote()} className="btn-cta">
              Start Your Project
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {CASE_STUDIES.map((p, i) => (
              <motion.div key={i} className="group cursor-pointer" onClick={() => openCaseStudy(p)}>
                <div className="relative aspect-[16/10] rounded-lg overflow-hidden mb-6 border border-white/10">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white text-primary flex items-center justify-center shadow-xl">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{p.title}</h3>
                  <p className="text-white/60 font-bold uppercase tracking-widest text-xs">{p.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-h2">TRANSPARENT PRICING.</h2>
            <p className="text-body">Choose the tier that matches your ambition. No hidden fees, just pure value.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TIERS.map((tier) => (
              <Card key={tier.id} className={cn(
                "relative flex flex-col p-8 rounded-lg border-2 transition-all",
                tier.id === "standard" ? "border-primary shadow-xl scale-105 z-10" : "border-border"
              )}>
                {tier.id === "standard" && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1">Most Popular</Badge>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-secondary text-sm">{tier.description}</p>
                </div>
                <div className="text-4xl font-bold mb-8">
                  {tier.multiplier}x <span className="text-sm text-secondary font-normal">base multiplier</span>
                </div>
                <ul className="space-y-4 mb-10 flex-1">
                  {["Premium Design Assets", "Multiple Revisions", "Source Files Included", "Direct Designer Access"].map((feat, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-medium">
                      <CheckCircle2 className="text-primary w-5 h-5" /> {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => openQuote(null, tier.id)} 
                  className={cn("w-full py-4 rounded-md font-bold transition-all", 
                    tier.id === "standard" ? "bg-primary text-white hover:bg-black" : "bg-background text-primary hover:bg-border"
                  )}
                >
                  Select {tier.name}
                </button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-muted">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-h2">ARCHITECTURAL RIGOR. <br /> ARTISTIC VISION.</h2>
              <p className="text-body">
                Founded by a designer with a background in technical architecture, Precision Design & Print brings a unique level of structural integrity to the creative world.
              </p>
              <div className="space-y-6 mb-10">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Global Standards</h4>
                    <p className="text-secondary text-sm">We operate on international timelines and quality benchmarks.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                    <Zap className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Rapid Execution</h4>
                    <p className="text-secondary text-sm">Our technical workflow ensures fast turnaround without quality loss.</p>
                  </div>
                </div>
              </div>
              <button onClick={() => openQuote()} className="btn-cta">
                Learn More & Start
              </button>
            </div>
            <div className="relative">
              <img src="https://picsum.photos/seed/studio/800/1000" alt="Our Studio" className="rounded-lg shadow-2xl" referrerPolicy="no-referrer" />
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-lg shadow-xl hidden md:block border border-border">
                <div className="text-4xl font-bold text-primary mb-1">150+</div>
                <div className="text-sm font-bold text-secondary uppercase tracking-widest">Global Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-24 md:py-32 bg-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-h2 text-white mb-8">
              READY TO <br /> TRANSFORM YOUR BRAND?
            </h2>
            <p className="text-white/90 text-xl mb-12 max-w-2xl mx-auto">
              Join 150+ international clients who trust our precision. 
              Build your custom package in seconds and get a clear, transparent quote.
            </p>
            <button onClick={() => openQuote()} className="bg-white text-primary font-bold py-5 px-12 rounded-md text-xl hover:bg-slate-100 transition-colors shadow-xl">
              Build Your Package Now
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-24 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-md">
                  <Sparkles className="text-white w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tight uppercase">Precision</span>
              </div>
              <p className="text-body text-secondary max-w-md">
                Engineering visual impact from Nairobi to the world. 
                Premium design solutions for technical industries that demand clarity and trust.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-primary">Navigation</h4>
              <ul className="space-y-4 text-secondary font-medium">
                {["Services", "Portfolio", "Pricing", "About"].map(item => (
                  <li key={item}><a href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-8 text-primary">Connect</h4>
              <div className="flex gap-4 mb-8">
                {[Instagram, Linkedin, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-md border border-border flex items-center justify-center hover:bg-muted hover:text-accent transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <button onClick={() => openQuote()} className="btn-cta-outline w-full py-3">
                Get Instant Quote
              </button>
            </div>
          </div>
          
          <div className="pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-medium text-secondary">
            <div>© 2026 PRECISION DESIGN & PRINT. ALL RIGHTS RESERVED.</div>
            <div className="flex gap-10">
              <a href="#" className="hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-accent transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
