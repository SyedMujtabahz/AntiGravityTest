import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  Variants,
} from 'framer-motion';
import { ParticleMeshBackground } from './components/ParticleMeshBackground';
import { TiltServiceCard } from './components/TiltServiceCard';
import { LAB_IMAGE_URL, SERVICES } from './data/services';

type FilterCategory = 'all' | 'pc' | 'peripherals' | 'infrastructure';
type NavSection = 'home' | 'services' | 'about' | 'contact';

const NAV_ITEMS: { id: NavSection; label: string; mobileLabel: string; icon: string }[] = [
  { id: 'home', label: 'Home', mobileLabel: 'Home', icon: 'home' },
  { id: 'services', label: 'Services', mobileLabel: 'Services (12 Solutions)', icon: 'build_circle' },
  { id: 'about', label: 'About', mobileLabel: 'About & SLA Workflow', icon: 'verified_user' },
  { id: 'contact', label: 'Contact', mobileLabel: 'Contact & Dispatch', icon: 'support_agent' },
];

const SEO_KEYWORDS_LIST = [
  'Laptop BGA Micro-Soldering & Motherboard Repair',
  'Custom Liquid-Cooled Gaming PC Builds',
  'Windows 11, Linux, macOS & Server OS Installation',
  'BSOD & Hardware Diagnostics Troubleshooting',
  'Desktop Workstation & GPU VRAM Repair',
  'Enterprise Cisco & UniFi Cat6A/Fiber Networking',
  'Rackmount Server Installation, VMware ESXi & Proxmox',
  'APC & Eaton UPS Inverter & LiFePO4 Battery Upgrades',
  'Industrial LaserJet, InkJet & Thermal Printer Repair',
  'High-Yield Laser Toner Refilling & OPC Drum Servicing',
  '144Hz-360Hz Gaming Monitor LCD/LED Backlight Repair',
  'Studio Monitor Speaker & Amplifier Voice Coil Repair',
];

// Staggered character-reveal variants for "IT Solutionz Services" header
const headerContainerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.038,
      delayChildren: 0.15,
    },
  },
};

const charRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    rotateX: -55,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 20,
    },
  },
};

// 0.1s staggered fade-up variants for the 12-card Services Grid when scrolled into view
const servicesGridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('all');
  const [activeSection, setActiveSection] = useState<NavSection>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ticketState, setTicketState] = useState<'idle' | 'submitting' | 'dispatched'>('idle');
  const dispatchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsScrolled(latest > 24);

    // Track active section while scrolling
    const sectionOrder: NavSection[] = ['contact', 'about', 'services', 'home'];
    for (const sec of sectionOrder) {
      const el = document.getElementById(sec);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 180) {
          setActiveSection(sec);
          break;
        }
      }
    }
  });

  useEffect(() => {
    return () => {
      if (dispatchTimerRef.current) {
        clearTimeout(dispatchTimerRef.current);
      }
    };
  }, []);

  const filteredServices = SERVICES.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const handleTicketSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setTicketState('submitting');

    if (dispatchTimerRef.current) {
      clearTimeout(dispatchTimerRef.current);
    }

    dispatchTimerRef.current = setTimeout(() => {
      setTicketState('dispatched');
      form.reset();
    }, 900);
  };

  const handleFormChange = () => {
    if (ticketState === 'dispatched') {
      setTicketState('idle');
    }
  };

  const titlePrefixWords = ['IT', 'Solutionz'];
  const titleHighlightWord = 'Services';

  return (
    <div className="min-h-screen bg-background text-on-background font-body-md relative selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Subtle Dark Tech-Themed Particle Mesh Background (Framer Motion) */}
      <ParticleMeshBackground />

      {/* SHARED COMPONENT: Sticky TopNavBar with Dark Glassmorphism Blur on Scroll */}
      <motion.header
        initial={false}
        animate={{
          backgroundColor: isScrolled
            ? 'rgba(6, 14, 32, 0.85)'
            : 'rgba(11, 19, 38, 0.55)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
          borderColor: isScrolled
            ? 'rgba(76, 215, 246, 0.28)'
            : 'rgba(66, 71, 84, 0.25)',
          boxShadow: isScrolled
            ? '0 10px 35px -10px rgba(3, 181, 211, 0.22)'
            : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="text-primary docked full-width top-0 sticky z-50 border-b"
      >
        <div
          className={`flex justify-between items-center w-full px-3.5 sm:px-6 transition-all duration-200 max-w-7xl mx-auto ${
            isScrolled ? 'py-2.5' : 'py-3 sm:py-3.5'
          }`}
        >
          {/* Brand Logo Container */}
          <a
            onClick={() => setActiveSection('home')}
            className="flex items-center gap-2.5 sm:gap-3 group min-w-0"
            href="#home"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-surface-container-high border border-secondary/40 flex items-center justify-center glow-cyan group-hover:border-secondary transition-all">
              <span
                className="material-symbols-outlined text-secondary text-xl sm:text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                terminal
              </span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[16px] sm:text-headline-sm font-headline-sm font-bold text-on-surface tracking-tight leading-none truncate">
                IT Solutionz Services
              </span>
              <span className="font-label-sm text-[9px] sm:text-label-sm text-secondary tracking-widest uppercase mt-0.5 truncate">
                One-Stop Of All Solutionz
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-8 text-label-md font-label-md"
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={
                    isCurrent
                      ? 'text-secondary border-b-2 border-secondary pb-1 transition-transform duration-150 active:scale-95'
                      : 'text-on-surface-variant hover:text-secondary pb-1 transition-colors duration-200 active:scale-95'
                  }
                  href={`#${item.id}`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Trailing Action Hub */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Telemetry Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/90 border border-outline-variant/50 text-label-sm font-label-sm text-on-surface-variant">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
              </span>
              <span>24/7 Rapid Response Active</span>
            </div>

            {/* Quick Emergency Action on Mobile (Icon Button) */}
            <a
              onClick={() => setActiveSection('contact')}
              aria-label="Emergency IT Support"
              className="flex sm:hidden w-10 h-10 rounded-xl bg-primary-container text-on-primary-container items-center justify-center shadow-md active:scale-95 glow-blue"
              href="#contact"
            >
              <span className="material-symbols-outlined text-lg">bolt</span>
            </a>

            {/* Primary CTA (Tablet & Desktop) */}
            <a
              onClick={() => setActiveSection('contact')}
              className="hidden sm:flex px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-label-md text-label-md font-semibold hover:bg-primary transition-all duration-200 shadow-md active:scale-95 items-center gap-1.5 glow-blue"
              href="#contact"
            >
              <span className="material-symbols-outlined text-base">bolt</span>
              <span>Emergency Support</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="md:hidden w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/50 flex items-center justify-center text-on-surface hover:text-secondary hover:border-secondary/50 transition-colors"
            >
              <span className="material-symbols-outlined">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Glassmorphism Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              aria-label="Mobile Navigation"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-surface-container-lowest/95 backdrop-blur-2xl border-t border-outline-variant/30"
            >
              <div className="px-4 py-4 flex flex-col gap-1.5 font-label-md text-label-md">
                {/* Mobile Live SLA Status Pill */}
                <div className="flex items-center justify-between px-3 py-2 mb-2 rounded-lg bg-surface-container-high/60 border border-outline-variant/30 text-label-sm font-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary"></span>
                    </span>
                    <span>24/7 Rapid Response Active</span>
                  </span>
                  <span className="text-secondary">SLA &lt; 15m</span>
                </div>

                {NAV_ITEMS.map((item) => {
                  const isCurrent = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`min-h-[44px] px-3 rounded-lg flex items-center gap-3 transition-colors ${
                        isCurrent
                          ? 'bg-secondary/10 text-secondary font-semibold border border-secondary/30'
                          : 'text-on-surface-variant hover:text-secondary hover:bg-surface-container'
                      }`}
                      href={`#${item.id}`}
                    >
                      <span className="material-symbols-outlined text-lg">
                        {item.icon}
                      </span>
                      <span>{item.mobileLabel}</span>
                    </a>
                  );
                })}
                <a
                  onClick={() => {
                    setActiveSection('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 min-h-[46px] px-4 py-2.5 rounded-xl bg-primary-container text-on-primary-container font-semibold flex items-center justify-center gap-2 glow-blue active:scale-95 transition-transform"
                  href="#contact"
                >
                  <span className="material-symbols-outlined text-base">bolt</span>
                  <span>Emergency 24/7 Support Dispatch</span>
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* MAIN CANVAS */}
      <main className="relative z-10">
        {/* 1. HERO SECTION */}
        <section
          className="relative min-h-[88vh] sm:min-h-[92vh] flex items-center justify-center py-12 sm:py-20 px-4 sm:px-6 overflow-hidden border-b border-outline-variant/20"
          id="home"
        >
          <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center relative z-10">
            {/* Live Hardware Matrix Pill */}
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-2xl sm:rounded-full bg-surface-container-high/80 border border-secondary/40 text-secondary font-label-sm text-label-sm mb-6 sm:mb-8 backdrop-blur-md max-w-full"
            >
              <span
                className="material-symbols-outlined text-sm shrink-0"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="leading-snug">
                Certified Enterprise IT Infrastructure &amp; Multi-Tier Diagnostics SLA
              </span>
              <span className="hidden sm:inline text-outline">|</span>
              <span className="text-on-surface flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary inline-block"></span>
                SYS.RUNNING: OK
              </span>
            </motion.div>

            {/* Master Title: Staggered Character-Reveal Animation on Load */}
            <motion.h1
              variants={headerContainerVariants}
              initial="hidden"
              animate="visible"
              aria-label="IT Solutionz Services"
              style={{ perspective: 800 }}
              className="font-headline-xl text-[32px] leading-[38px] xs:text-headline-xl-mobile sm:text-headline-xl text-on-surface max-w-5xl tracking-tight mb-3 sm:mb-4 sm:leading-none uppercase flex flex-wrap justify-center gap-x-2.5 sm:gap-x-4 gap-y-1"
            >
              {titlePrefixWords.map((word, wIdx) => (
                <span key={wIdx} className="inline-flex whitespace-nowrap">
                  {Array.from(word).map((char, cIdx) => (
                    <motion.span
                      key={`${wIdx}-${cIdx}`}
                      variants={charRevealVariants}
                      className="inline-block will-change-transform"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}

              <span className="inline-flex whitespace-nowrap">
                {Array.from(titleHighlightWord).map((char, cIdx) => {
                  const total = titleHighlightWord.length - 1;
                  const pct = total > 0 ? (cIdx / total) * 100 : 0;
                  return (
                    <motion.span
                      key={`highlight-${cIdx}`}
                      variants={charRevealVariants}
                      style={{
                        backgroundImage:
                          'linear-gradient(90deg, #4d8eff 0%, #4cd7f6 50%, #2fd9f4 100%)',
                        backgroundSize: `${titleHighlightWord.length * 100}% 100%`,
                        backgroundPosition: `${pct}% 0%`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                      className="inline-block bg-clip-text text-transparent will-change-transform"
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
            </motion.h1>

            {/* Sub-headline Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
              className="font-headline-md text-[18px] sm:text-headline-md text-secondary tracking-tight font-semibold max-w-3xl mb-4 sm:mb-6"
            >
              One-Stop Of All Solutionz
            </motion.p>

            {/* Descriptive Copy (Keyword-Rich) */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05, ease: 'easeOut' }}
              className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-3xl mb-8 sm:mb-10 leading-relaxed px-1"
            >
              From chip-level laptop BGA micro-soldering, desktop PC repair, and custom
              liquid-cooled gaming PC builds to enterprise rackmount server configuration,
              structured optical networking, UPS inverter repair, and laser printer
              servicing — we deploy instant technical mastery for commercial systems and
              personal workstations.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-4 w-full sm:w-auto mb-12 sm:mb-16"
            >
              <a
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-semibold hover:bg-primary transition-all duration-200 glow-blue active:scale-95 flex items-center justify-center gap-2"
                href="#contact"
              >
                <span className="material-symbols-outlined">support_agent</span>
                <span>Get Support Now</span>
              </a>
              <a
                className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-xl bg-surface-container border border-outline-variant/60 text-on-surface font-label-lg text-label-lg hover:border-secondary hover:text-secondary transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                href="#services"
              >
                <span className="material-symbols-outlined">grid_view</span>
                <span>Explore 12+ Solutions</span>
              </a>
            </motion.div>

            {/* Telemetry Stats Row (2x2 Grid on Mobile, 4 Columns on Desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.35, ease: 'easeOut' }}
              className="w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl"
            >
              <div className="glass-card p-3.5 sm:p-5 rounded-xl text-center">
                <p className="font-label-sm text-[9px] sm:text-label-sm text-secondary uppercase tracking-widest mb-1">
                  SYSTEMS RESTORED
                </p>
                <p className="font-headline-md text-[22px] sm:text-headline-md text-on-surface font-bold">
                  15,000+
                </p>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5 sm:mt-1">
                  Laptops, Servers &amp; Rigs
                </p>
              </div>
              <div className="glass-card p-3.5 sm:p-5 rounded-xl text-center">
                <p className="font-label-sm text-[9px] sm:text-label-sm text-secondary uppercase tracking-widest mb-1">
                  FIRST-PASS RESOLUTION
                </p>
                <p className="font-headline-md text-[22px] sm:text-headline-md text-secondary font-bold">
                  99.8%
                </p>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5 sm:mt-1">
                  Chip-Level Accuracy
                </p>
              </div>
              <div className="glass-card p-3.5 sm:p-5 rounded-xl text-center">
                <p className="font-label-sm text-[9px] sm:text-label-sm text-secondary uppercase tracking-widest mb-1">
                  AVERAGE SLA DISPATCH
                </p>
                <p className="font-headline-md text-[22px] sm:text-headline-md text-on-surface font-bold">
                  &lt; 15 Min
                </p>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5 sm:mt-1">
                  Enterprise Hotline
                </p>
              </div>
              <div className="glass-card p-3.5 sm:p-5 rounded-xl text-center">
                <p className="font-label-sm text-[9px] sm:text-label-sm text-secondary uppercase tracking-widest mb-1">
                  ENGINEER MATRIX
                </p>
                <p className="font-headline-md text-[22px] sm:text-headline-md text-tertiary font-bold">
                  Tier 3
                </p>
                <p className="font-body-sm text-[11px] sm:text-body-sm text-outline mt-0.5 sm:mt-1">
                  Cisco &amp; Apple Certified
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. CORE SOLUTIONS MATRIX (SERVICES) */}
        <section
          className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
          id="services"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-5 sm:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-label-sm text-label-sm tracking-wider uppercase mb-2">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>Engineering &amp; Repair Capabilities</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight">
                Core Solutions Matrix
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-2">
                12 precision IT &amp; hardware repair services engineered to guarantee
                zero downtime, peak workstation throughput, and long-term infrastructure
                reliability.
              </p>
            </div>

            {/* Filter Tabs (Swipeable on Mobile) */}
            <div
              role="group"
              aria-label="Filter services by category"
              className="flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-xl bg-surface-container border border-outline-variant/40 overflow-x-auto no-scrollbar w-full md:w-auto self-start md:self-auto"
            >
              {(
                [
                  { id: 'all', label: 'All Services' },
                  { id: 'pc', label: 'Hardware & PC' },
                  { id: 'peripherals', label: 'Printers & Displays' },
                  { id: 'infrastructure', label: 'Networking & Servers' },
                ] as const
              ).map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    id={`filter-${tab.id}`}
                    aria-pressed={isActive}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`min-h-[38px] px-3.5 sm:px-4 py-2 rounded-lg font-label-md text-label-md whitespace-nowrap transition-all ${
                      isActive
                        ? 'bg-secondary text-on-secondary font-semibold'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* The 12 Comprehensive Service Cards Grid:
              - Single column on mobile (grid-cols-1), 2 on tablet (md:grid-cols-2), 3 on desktop (lg:grid-cols-3)
              - 0.1s staggered fade-up when scrolled into view
              - 3D Framer Motion tilt effect on each card */}
          <motion.div
            key={activeCategory}
            variants={servicesGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
            id="services-grid"
          >
            {filteredServices.map((service) => (
              <TiltServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </section>

        {/* 3. ABOUT US SECTION ('The Precision Standard') */}
        <section
          className="py-16 sm:py-24 px-4 sm:px-6 bg-surface-container-low/70 border-y border-outline-variant/20 relative"
          id="about"
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center mb-16 sm:mb-20">
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 text-secondary font-label-sm text-label-sm tracking-wider uppercase mb-3">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>The Precision Standard</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg-mobile sm:text-headline-lg text-on-surface tracking-tight mb-4 sm:mb-6">
                  Engineered Reliability Across Every Microscopic Junction
                </h2>
                <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant mb-5 sm:mb-6 leading-relaxed">
                  For over a decade,{' '}
                  <span className="text-on-surface font-semibold">
                    IT Solutionz Services
                  </span>{' '}
                  has operated under a single operating principle: no machine is
                  unfixable, and no infrastructure can afford unplanned downtime. What
                  started as an elite micro-electronics diagnostics lab has expanded into
                  a full-scale enterprise technological support partner.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 sm:mb-8 leading-relaxed">
                  Our facilities house Class 100 ESD-safe workstations,
                  computer-controlled BGA optical alignment reballers, and real-time FLIR
                  thermal analysis cameras. We service high-concurrency corporate server
                  rooms, architectural rendering farms, esports arenas, and personal
                  workstations with equal surgical rigor.
                </p>
              </div>

              {/* Diagnostic Terminal Card & Lab Image */}
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="relative rounded-xl overflow-hidden border border-outline-variant/50 shadow-xl">
                  <img
                    className="w-full h-56 sm:h-64 object-cover"
                    src={LAB_IMAGE_URL}
                    loading="lazy"
                    decoding="async"
                    alt="High-tech cleanroom electronics diagnostics lab bench in an IT hardware repair facility with two male technicians"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap items-center justify-between gap-2 text-label-sm font-label-sm">
                    <span className="px-2.5 py-1 rounded bg-surface/90 border border-secondary/40 text-secondary backdrop-blur-md">
                      ESD CLEANROOM LAB // BAY 04
                    </span>
                    <span className="text-on-surface">CALIBRATED TODAY</span>
                  </div>
                </div>

                {/* Terminal Telemetry Box */}
                <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl border border-outline-variant/30 font-label-sm text-label-sm text-on-surface-variant overflow-x-auto">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/20">
                    <span className="text-secondary flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                      STATION_TELEMETRY.LOG
                    </span>
                    <span className="text-outline">SYS: STABLE</span>
                  </div>
                  <p className="text-outline mb-1">
                    &gt;_ ping gateway.itsolutionz.internal: 0.12ms
                  </p>
                  <p className="text-secondary mb-1">
                    &gt;_ flir_thermal_sensor_array: active [nominal 21.4°C]
                  </p>
                  <p className="text-outline mb-1">
                    &gt;_ ultrasonic_cleaner_tank: fluid_purity 99.9%
                  </p>
                  <p className="text-primary mb-1">
                    &gt;_ bga_reball_station: vacuum_lock engaged
                  </p>
                  <p className="text-on-surface font-bold">
                    &gt;_ READY FOR NEW DISPATCH / TICKETING PIPELINE
                  </p>
                </div>
              </div>
            </div>

            {/* 4-Step Diagnostic SLA Workflow */}
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
                <h3 className="font-headline-md text-[22px] sm:text-headline-md text-on-surface tracking-tight mb-2">
                  4-Step Diagnostic SLA Workflow
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Every repair follows a strict, repeatable engineering protocol before
                  delivery back to your production floor.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className="glass-card p-5 sm:p-6 rounded-xl relative">
                  <span className="font-label-lg text-label-lg text-secondary font-bold block mb-2">
                    01 // TRIAGE
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Optical &amp; Thermal Triage
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    High-magnification stereo microscope inspect for trace corrosion and
                    FLIR radiometric scans under powered state to identify shorted
                    capacitors.
                  </p>
                </div>

                <div className="glass-card p-5 sm:p-6 rounded-xl relative">
                  <span className="font-label-lg text-label-lg text-secondary font-bold block mb-2">
                    02 // PROBING
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Board-Level Testing
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Oscilloscope pulse verification across 3.3V, 5V, and 12V rails.
                    Memory address probing and IC logic gate continuity confirmation.
                  </p>
                </div>

                <div className="glass-card p-5 sm:p-6 rounded-xl relative">
                  <span className="font-label-lg text-label-lg text-secondary font-bold block mb-2">
                    03 // REPAIR
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    Precision Micro-Soldering
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Component replacement with OEM-spec microchips, lead-free solder
                    reflow, trace jumper wiring, and ultrasonic sonic bath
                    decontamination.
                  </p>
                </div>

                <div className="glass-card p-5 sm:p-6 rounded-xl relative">
                  <span className="font-label-lg text-label-lg text-secondary font-bold block mb-2">
                    04 // VALIDATION
                  </span>
                  <h4 className="font-headline-sm text-headline-sm text-on-surface mb-2">
                    24h Stress &amp; Burn-In
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    High-concurrency load testing (AIDA64, 3DMark, MemTest, and packet
                    flood simulations) ensuring rock-solid thermal stability before
                    handover.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CONTACT US & RAPID DISPATCH PORTAL */}
        <section
          className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
          id="contact"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12">
            {/* Interactive Support Ticket Form */}
            <div className="lg:col-span-7 glass-card p-5 sm:p-10 rounded-xl relative">
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center gap-2 text-secondary font-label-sm text-label-sm tracking-wider uppercase mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  <span>Rapid Dispatch &amp; Ticket Portal</span>
                </div>
                <h2 className="font-headline-md text-[24px] sm:text-headline-md text-on-surface tracking-tight">
                  Initiate Service Ticket
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Our certified engineers acknowledge critical tickets within 15 minutes.
                </p>
              </div>

              {/* Notification Banner for simulated Ticket Gen */}
              {ticketState === 'dispatched' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="status"
                  aria-live="polite"
                  className="mb-6 p-4 rounded-xl bg-secondary/10 border border-secondary text-on-surface flex items-start gap-3"
                  id="ticket-success"
                >
                  <span className="material-symbols-outlined text-secondary text-2xl mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <p className="font-label-md text-label-md font-bold text-secondary">
                      TICKET #ITS-8842 CREATED SUCCESSFULLY
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Rapid Dispatch SLA initiated. Tier-3 duty engineer assigned. You
                      will receive an SMS and encrypted tracking dispatch email within 10
                      minutes.
                    </p>
                  </div>
                </motion.div>
              )}

              <form
                className="space-y-5 sm:space-y-6"
                id="dispatch-form"
                onChange={handleFormChange}
                onSubmit={handleTicketSubmit}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface mb-2"
                      htmlFor="user-name"
                    >
                      Full Name *
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-base sm:text-body-md"
                      id="user-name"
                      placeholder="Alex Morgan"
                      required
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface mb-2"
                      htmlFor="user-phone"
                    >
                      Phone Number *
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-base sm:text-body-md"
                      id="user-phone"
                      placeholder="+1 (555) 019-2834"
                      required
                      type="tel"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2"
                    htmlFor="user-email"
                  >
                    Work Email *
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-base sm:text-body-md"
                    id="user-email"
                    placeholder="alex.morgan@company.com"
                    required
                    type="email"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface mb-2"
                      htmlFor="service-category"
                    >
                      Service Category *
                    </label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-base sm:text-body-md"
                      id="service-category"
                    >
                      <option value="Laptop Repairing">
                        Laptop Repairing (Chip-Level)
                      </option>
                      <option value="Desktop PC Repairing">Desktop PC Repairing</option>
                      <option value="Gaming PC BUILDS">Gaming PC BUILDS</option>
                      <option value="OS Installation">
                        OS Installation &amp; Optimization
                      </option>
                      <option value="Software/Hardware Troubleshooting">
                        Hardware/Software Troubleshooting
                      </option>
                      <option value="Networking">
                        Networking &amp; Structured Cabling
                      </option>
                      <option value="Server Installation">
                        Server Installation &amp; Storage
                      </option>
                      <option value="UPS Repairing">
                        UPS &amp; Power Inverter Repair
                      </option>
                      <option value="Printer Repairing">
                        Printer Repairing (Laser/InkJet)
                      </option>
                      <option value="Toner Refilling">
                        Toner Refilling &amp; OPC Drums
                      </option>
                      <option value="LCD/LED Repairing">
                        LCD / LED Panel Repairing
                      </option>
                      <option value="Speaker Repairing">
                        Speaker &amp; Audio Repairing
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-2">
                      Issue Severity
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <label className="flex items-center justify-center min-h-[44px] p-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest cursor-pointer hover:border-secondary transition-all text-center">
                        <input
                          defaultChecked
                          className="hidden peer"
                          name="severity"
                          type="radio"
                          value="Standard"
                        />
                        <span className="font-label-sm text-label-sm peer-checked:text-secondary peer-checked:font-bold">
                          Standard
                        </span>
                      </label>
                      <label className="flex items-center justify-center min-h-[44px] p-2.5 rounded-lg border border-outline-variant/40 bg-surface-container-lowest cursor-pointer hover:border-secondary transition-all text-center">
                        <input
                          className="hidden peer"
                          name="severity"
                          type="radio"
                          value="High"
                        />
                        <span className="font-label-sm text-label-sm peer-checked:text-secondary peer-checked:font-bold">
                          High
                        </span>
                      </label>
                      <label className="flex items-center justify-center min-h-[44px] p-2.5 rounded-lg border border-error/40 bg-surface-container-lowest cursor-pointer hover:border-error transition-all text-center">
                        <input
                          className="hidden peer"
                          name="severity"
                          type="radio"
                          value="Urgent"
                        />
                        <span className="font-label-sm text-label-sm text-error font-bold">
                          24/7 Urgent
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block font-label-md text-label-md text-on-surface mb-2"
                    htmlFor="user-message"
                  >
                    Device Hardware Specs &amp; Failure Symptoms *
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-lowest border border-outline-variant/60 text-on-surface placeholder:text-outline focus:border-secondary focus:ring-1 focus:ring-secondary transition-all outline-none font-body-md text-base sm:text-body-md"
                    id="user-message"
                    placeholder="Please mention device model, exact error codes (e.g. 0x0000007B, beep codes), or failure timeline..."
                    required
                    rows={4}
                  ></textarea>
                </div>

                <button
                  disabled={ticketState === 'submitting'}
                  className={`w-full min-h-[52px] py-4 rounded-xl font-label-lg text-label-lg font-semibold transition-all duration-200 glow-blue flex items-center justify-center gap-2 ${
                    ticketState === 'dispatched'
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-primary-container text-on-primary-container hover:bg-primary'
                  }`}
                  id="submit-btn"
                  type="submit"
                >
                  {ticketState === 'submitting' ? (
                    <>
                      <span className="material-symbols-outlined animate-spin text-xl">
                        sync
                      </span>
                      <span>Registering SLA on Distributed Ledger...</span>
                    </>
                  ) : ticketState === 'dispatched' ? (
                    <>
                      <span className="material-symbols-outlined text-xl">done_all</span>
                      <span>Ticket #ITS-8842 Dispatched</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined">send</span>
                      <span>Generate Ticket &amp; Dispatch Engineer</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Direct Contact Operations Info */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              <div className="glass-card p-5 sm:p-8 rounded-xl">
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary">
                    headset_mic
                  </span>
                  <span>Technical Operations Center</span>
                </h3>
                <div className="space-y-6">
                  {/* Direct Line */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-xl">call</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline">
                        EMERGENCY 24/7 HOTLINE
                      </p>
                      <a
                        className="font-headline-sm text-headline-sm text-secondary hover:underline"
                        href="tel:+18005557658"
                      >
                        +1 (800) 555-SOLUZ
                      </a>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Toll-free priority triage queue
                      </p>
                    </div>
                  </div>

                  {/* Physical Lab Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-xl">
                        location_on
                      </span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline">
                        HARDWARE LAB &amp; DISPATCH HEADQUARTERS
                      </p>
                      <p className="font-body-md text-body-md text-on-surface font-semibold">
                        104 Cyberway Blvd, Suite 400
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tech Innovation District, CA 94107
                      </p>
                    </div>
                  </div>

                  {/* Support Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-high border border-outline-variant flex items-center justify-center text-secondary shrink-0">
                      <span className="material-symbols-outlined text-xl">
                        mark_email_read
                      </span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-outline">
                        DIRECT ENGINEERING INBOX
                      </p>
                      <p className="font-body-md text-body-md text-on-surface font-semibold break-all">
                        support@itsolutionzservices.com
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        PGP key available upon request
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operating Hours & Status */}
                <div className="mt-8 pt-6 border-t border-outline-variant/30 flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">Walk-in Diagnostics:</span>
                  <span className="text-secondary font-semibold">
                    Mon - Sat: 08:00 - 20:00 PST
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between font-label-sm text-label-sm">
                  <span className="text-on-surface-variant">
                    Critical Enterprise Dispatch:
                  </span>
                  <span className="text-tertiary font-bold">24 Hours / 365 Days</span>
                </div>
              </div>

              {/* Quick FAQ Prompt Card */}
              <div className="glass-card p-5 sm:p-6 rounded-xl border border-secondary/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="material-symbols-outlined text-secondary">
                    electric_bolt
                  </span>
                  <span className="font-label-md text-label-md text-secondary font-bold">
                    Zero-Risk Diagnostic Policy
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  We perform complete visual and electrical triage prior to charging
                  repair fees. If a machine or component is classified unrepairable, no
                  bench fee applies.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* SHARED COMPONENT: Footer with High-Ranking SEO Service Index */}
      <footer className="bg-surface-container-lowest text-primary docked full-width bottom border-t border-outline-variant/20 relative z-10">
        <div className="w-full px-4 sm:px-6 pt-10 pb-12 max-w-7xl mx-auto">
          {/* Search Engine Specialized Service Directory (High-Ranking Keywords) */}
          <div className="mb-8 pb-8 border-b border-outline-variant/15">
            <h2 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest mb-3">
              Certified IT Repair, Infrastructure &amp; Hardware Engineering Specialties
            </h2>
            <div className="flex flex-wrap gap-2">
              {SEO_KEYWORDS_LIST.map((kw) => (
                <a
                  key={kw}
                  href="#services"
                  className="px-2.5 py-1 rounded-md bg-surface-container/60 border border-outline-variant/25 text-outline hover:text-secondary hover:border-secondary/40 font-body-sm text-[11px] transition-colors"
                >
                  {kw}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand & Telemetry Information */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-headline-sm font-headline-sm font-bold text-on-surface tracking-tight">
                IT Solutionz Services
              </span>
              <p className="text-body-sm font-body-sm text-outline mt-1">
                © 2025 IT Solutionz Services. One-Stop Of All Solutionz. All rights
                reserved. System Telemetry: Normal.
              </p>
            </div>

            {/* Footer Navigation Cluster */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-label-sm font-label-sm">
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#services"
              >
                Hardware Lab
              </a>
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#services"
              >
                Server Infrastructure
              </a>
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#contact"
              >
                Emergency Dispatch
              </a>
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#about"
              >
                Diagnostics SLA
              </a>
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#home"
              >
                Privacy Policy
              </a>
              <a
                className="text-outline hover:text-secondary transition-colors duration-200"
                href="#home"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
