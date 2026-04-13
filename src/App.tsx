/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
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
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  Twitter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const NAV_LINKS = [
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Pricing", href: "#pricing" },
  { name: "About", href: "#about" },
];

const SERVICES = [
  {
    title: "Strategic Branding",
    description: "Engineering visual identities that bridge technical complexity and market elegance.",
    icon: <Layers className="w-6 h-6" />,
    tags: ["Logo Design", "Brand Guidelines", "Visual Systems"],
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    title: "Technical Illustration",
    description: "Transforming complex architectural and engineering data into scannable, high-end visuals.",
    icon: <Cpu className="w-6 h-6" />,
    tags: ["Blueprints", "3D Visualization", "Infographics"],
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    title: "Premium Print Production",
    description: "Global-standard printing with precision finishing for high-stakes business collateral.",
    icon: <Printer className="w-6 h-6" />,
    tags: ["Brochures", "Packaging", "Large Format"],
    color: "bg-amber-500/10 text-amber-600"
  },
  {
    title: "Digital Ecosystems",
    description: "Conversion-focused web interfaces designed with an architect's eye for structure.",
    icon: <Layout className="w-6 h-6" />,
    tags: ["UI/UX Design", "Webflow", "React Development"],
    color: "bg-purple-500/10 text-purple-600"
  }
];

const PROJECTS = [
  {
    title: "Skyline Residences",
    category: "Real Estate Branding",
    image: "https://picsum.photos/seed/architecture/800/600",
    description: "A complete visual identity for a luxury Nairobi skyscraper."
  },
  {
    title: "TechFlow Logistics",
    category: "Corporate Identity",
    image: "https://picsum.photos/seed/tech/800/600",
    description: "Branding for a pan-African logistics tech startup."
  },
  {
    title: "EcoPrint Packaging",
    category: "Sustainable Print",
    image: "https://picsum.photos/seed/print/800/600",
    description: "Biodegradable packaging design for an international exporter."
  }
];

const PRICING = [
  {
    name: "Starter",
    price: "499",
    description: "Perfect for emerging startups looking for a professional edge.",
    features: ["Core Logo Identity", "Business Card Design", "Basic Brand Guide", "5 Print Mockups"],
    cta: "Start Project",
    popular: false
  },
  {
    name: "Professional",
    price: "1,499",
    description: "Comprehensive branding and collateral for growing firms.",
    features: ["Full Visual System", "Stationery Suite", "Detailed Brand Book", "Marketing Brochures", "Social Media Kit"],
    cta: "Get Started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "3,999",
    description: "Custom solutions for global organizations and complex projects.",
    features: ["Global Brand Strategy", "Technical Illustrations", "Full Print Management", "Custom Web Interface", "Priority Support"],
    cta: "Contact Sales",
    popular: false
  }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background selection:bg-primary selection:text-background grid-bg">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border-b py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-sm">
              <PenTool className="text-background w-6 h-6" />
            </div>
            <span className="font-display font-bold text-xl tracking-tighter uppercase">Precision</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium hover:text-accent transition-colors">
                {link.name}
              </a>
            ))}
            <Button size="sm" className="rounded-none px-6">Get a Quote</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-2xl font-display font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button className="w-full rounded-none py-6 text-lg">Get a Quote</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="outline" className="mb-6 rounded-none border-primary/20 px-4 py-1 text-xs uppercase tracking-widest font-mono">
                Based in Kenya • Serving Globally
              </Badge>
              <h1 className="font-display text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter mb-8">
                PRECISION-ENGINEERED <br />
                <span className="text-accent">DESIGN SYSTEMS.</span>
              </h1>
              <p className="text-xl md:text-2xl text-secondary max-w-2xl mb-10 leading-relaxed font-light">
                We bridge the gap between technical complexity and aesthetic elegance. 
                Premium branding and print production for international visionaries.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="rounded-none px-10 py-7 text-lg group">
                  View Portfolio
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="rounded-none px-10 py-7 text-lg border-primary/20">
                  Our Services
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-full opacity-10 pointer-events-none hidden lg:block">
          <div className="w-full h-full border-l border-b border-primary/20 relative">
            <div className="absolute top-0 left-0 w-4 h-4 bg-primary -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Stats/Trust */}
      <section className="border-y border-primary/10 bg-primary/5 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Clients Globally", value: "150+" },
              { label: "Projects Completed", value: "1.2k" },
              { label: "Print Accuracy", value: "99.9%" },
              { label: "Years Experience", value: "12+" }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="font-display text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-xs uppercase tracking-widest text-secondary font-mono">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                OUR SPECIALIZED <br /> CAPABILITIES.
              </h2>
              <p className="text-lg text-secondary">
                Leveraging an architectural background to provide design that isn't just visual, but structural.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-secondary">
              [ 01 / SERVICES ]
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className="h-full rounded-none border-primary/10 bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-colors">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-sm flex items-center justify-center mb-4 ${service.color}`}>
                      {service.icon}
                    </div>
                    <CardTitle className="font-display text-2xl">{service.title}</CardTitle>
                    <CardDescription className="text-secondary leading-relaxed pt-2">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span key={tag} className="text-[10px] uppercase tracking-wider font-mono px-2 py-1 bg-primary/5 border border-primary/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 md:py-32 bg-primary text-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
                THE BLUEPRINT <br /> GALLERY.
              </h2>
              <p className="text-lg text-background/60">
                A selection of high-stakes projects delivered for international clients.
              </p>
            </div>
            <div className="font-mono text-xs uppercase tracking-widest text-background/40">
              [ 02 / PORTFOLIO ]
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[4/5] overflow-hidden mb-6">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="outline" className="rounded-none border-background text-background hover:bg-background hover:text-primary">
                      View Case Study
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-1">{project.title}</h3>
                    <p className="text-sm text-background/60 font-mono uppercase tracking-widest">{project.category}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-background/40 group-hover:text-accent transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
            <Button variant="outline" className="rounded-none border-background/20 text-background hover:bg-background hover:text-primary px-12 py-6">
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-6">
              TRANSPARENT <br /> INVESTMENT.
            </h2>
            <p className="text-lg text-secondary">
              Premium services with clear, global-standard pricing in USD.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {PRICING.map((plan, i) => (
              <Card key={i} className={`rounded-none border-primary/10 relative overflow-hidden ${plan.popular ? "ring-2 ring-accent" : ""}`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1">
                    Most Popular
                  </div>
                )}
                <CardHeader className="pb-8">
                  <CardTitle className="font-display text-2xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-bold font-display">${plan.price}</span>
                    <span className="text-secondary text-sm font-mono">/ project</span>
                  </div>
                  <CardDescription className="text-secondary">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className={`w-full rounded-none py-6 ${plan.popular ? "bg-accent hover:bg-accent/90" : ""}`}>
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 bg-primary/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square bg-primary/10 relative overflow-hidden">
                <img 
                  src="https://picsum.photos/seed/designer/800/800" 
                  alt="Designer"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/10 backdrop-blur-xl border border-accent/20 p-6 hidden md:block">
                <div className="font-display text-4xl font-bold mb-2">12+</div>
                <div className="text-[10px] uppercase tracking-widest font-mono text-accent">Years of Technical Design Mastery</div>
              </div>
            </div>
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                THE ARCHITECT'S EYE <br /> IN DESIGN.
              </h2>
              <div className="space-y-6 text-lg text-secondary leading-relaxed">
                <p>
                  Founded in Nairobi, Kenya, Precision Design & Print was born from a simple observation: 
                  most design firms prioritize aesthetics over structure. With a background in architecture, 
                  we approached design differently—as an engineering challenge.
                </p>
                <p>
                  Today, we serve clients across Europe, North America, and the Middle East, delivering 
                  visual systems that are as robust as they are beautiful. Our Kenyan roots give us a 
                  unique perspective on global trends, while our technical rigor ensures international standards.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div className="flex items-start gap-4">
                  <ShieldCheck className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Global Trust</h4>
                    <p className="text-sm text-secondary">Verified by 150+ international partners.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-accent mt-1" />
                  <div>
                    <h4 className="font-bold mb-1">Seamless Logistics</h4>
                    <p className="text-sm text-secondary">Worldwide shipping for all print assets.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">FREQUENTLY ASKED.</h2>
            <p className="text-secondary">Everything you need to know about working with us internationally.</p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-primary/10">
              <AccordionTrigger className="font-display text-xl hover:no-underline">How do you handle international payments?</AccordionTrigger>
              <AccordionContent className="text-secondary text-lg">
                We accept payments via Stripe, PayPal, and Wise for international clients. For local Kenyan clients, we also support M-Pesa. All project quotes are provided in USD to maintain global consistency.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-primary/10">
              <AccordionTrigger className="font-display text-xl hover:no-underline">What is the typical turnaround time?</AccordionTrigger>
              <AccordionContent className="text-secondary text-lg">
                Branding projects typically take 3-5 weeks from discovery to delivery. Print production varies by complexity and shipping destination, but we provide detailed timelines at the start of every project.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-primary/10">
              <AccordionTrigger className="font-display text-xl hover:no-underline">Do you ship printed materials globally?</AccordionTrigger>
              <AccordionContent className="text-secondary text-lg">
                Yes. We partner with international courier services like DHL and FedEx to ensure your printed assets reach you anywhere in the world, safely and on time.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 border-t border-primary/10">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                READY TO <br /> <span className="text-accent">ELEVATE?</span>
              </h2>
              <p className="text-xl text-secondary mb-12 max-w-md">
                Let's discuss your next project. Our team is ready to bring technical precision to your brand.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-mono mb-1">Email Us</div>
                    <div className="text-xl font-medium">hello@precisiondesign.co</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-mono mb-1">Call Us</div>
                    <div className="text-xl font-medium">+254 700 000 000</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-secondary font-mono mb-1">Visit Studio</div>
                    <div className="text-xl font-medium">Nairobi, Kenya • Global Hub</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 md:p-12 border border-primary/10 shadow-2xl shadow-primary/5">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-mono">Full Name</label>
                    <Input placeholder="John Doe" className="rounded-none border-primary/10 focus:border-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest font-mono">Email Address</label>
                    <Input placeholder="john@company.com" className="rounded-none border-primary/10 focus:border-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-mono">Project Type</label>
                  <select className="w-full h-10 px-3 py-2 bg-transparent border border-primary/10 rounded-none focus:outline-none focus:ring-1 focus:ring-accent">
                    <option>Strategic Branding</option>
                    <option>Technical Illustration</option>
                    <option>Print Production</option>
                    <option>Digital Ecosystem</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest font-mono">Message</label>
                  <Textarea placeholder="Tell us about your vision..." className="rounded-none border-primary/10 min-h-[150px] focus:border-accent" />
                </div>
                <Button className="w-full rounded-none py-7 text-lg bg-primary hover:bg-primary/90">
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-background py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-background flex items-center justify-center rounded-sm">
                  <PenTool className="text-primary w-6 h-6" />
                </div>
                <span className="font-display font-bold text-2xl tracking-tighter uppercase">Precision</span>
              </div>
              <p className="text-background/60 max-w-sm text-lg leading-relaxed">
                Engineering visual excellence from Nairobi to the world. 
                Premium design and print solutions for technical industries.
              </p>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-widest">Navigation</h4>
              <ul className="space-y-4 text-background/60">
                {NAV_LINKS.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="hover:text-accent transition-colors">{link.name}</a>
                  </li>
                ))}
                <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6 uppercase tracking-widest">Connect</h4>
              <div className="flex gap-4 mb-8">
                <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-primary transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-primary transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center hover:bg-background hover:text-primary transition-all">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
              <div className="text-xs font-mono text-background/40">
                © 2026 PRECISION DESIGN & PRINT. <br />
                ALL RIGHTS RESERVED.
              </div>
            </div>
          </div>
          
          <div className="technical-line pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-background/40 uppercase tracking-widest">
            <div>Designed with Precision in Nairobi</div>
            <div className="flex gap-8">
              <span>Status: Operational</span>
              <span>Time: 07:10:51 GMT+3</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
