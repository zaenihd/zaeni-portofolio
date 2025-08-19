import React, { useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, Github, Linkedin, Mail, Phone, MapPin, ExternalLink, ArrowRight, Download } from "lucide-react";

/**
 * ZAENI HILMAN DARMAWAN — Personal Website
 * Stack: React + TailwindCSS + Framer Motion + Lucide Icons
 *
 * FIX: Prevent invalid URL crash (e.g., "sandbox:/mnt/data/..." in resumeHref)
 * by sanitizing all outbound hrefs via safeHref() and guarding the click handler.
 * Includes lightweight runtime tests for the URL validator.
 *
 * Notes for customization:
 * - Set CONTACT.resumeHref to a **public** https URL (or data: URL) so the "My resume" button is enabled.
 * - Replace PROFILE_IMG with your own photo URL.
 * - Edit EXPERIENCE, SKILLS, PROJECTS to match your background.
 */

// ====== CONFIG / CONTENT ======
const PROFILE_IMG =
  "assets/foto.png"; // TODO: replace with your photo

const ACCENT = "#ff6b5a"; // coral-ish accent like in the design

const TAGS = ["Flutter", "Dart", "Android", "iOS", "Firebase", "REST API", "GetX", "BLoC", "Git", "CI/CD"];

// Summary taken from your PDF and adapted for the website
const ABOUT_SUMMARY =
  "I am Zaeni Hilman Darmawan Hilman Darmawan, a Flutter Developer with 2+ years of experience shipping cross‑platform mobile apps for Android and iOS. I write clean, maintainable code, follow best practices, and am comfortable integrating complex APIs, Firebase services, payments, and native capabilities. I’m enthusiastic, honest, and accountable.";

const CONTACT = {
  name: "Zaeni Hilman Darmawan",
  role: "Flutter Developer",
  phone: "+62 896-5708-1093",
  email: "hilman6262@gmail.com",
  address: "Kalapa Dua Street, Girimulya Village, Cibungbulang District, Bogor Regency, West Java, Indonesia",
  github: "https://github.com/zaenihd",
  linkedin: "https://www.linkedin.com/in/zaeni-hilman-darmawan-201a8a239/",
  instagram: "http://instagram.com/panggilajazezen",
  // NOTE: Placeholder. Replace with a public PDF URL (https://...) or a data: URL.
  // Using unknown schemas (e.g., "sandbox:/...") can trigger errors in some bundlers.
  resumeHref: "",
};

const EXPERIENCE = [
  {
    company: "Flower Advisor",
    title: "Mobile Developer",
    period: "Mar 2024 – Present",
    bullets: ["App maintenance", "Bug fixing", "Publish to Play Store", "Publish to App Store"],
  },
  {
    company: "Home Developers",
    title: "Mobile Developer",
    period: "Nov 2022 – Feb 2024",
    bullets: [
      "Slice UI/UX (Figma) to Flutter",
      "Implement REST APIs & app logic",
      "Application maintenance",
      "Release to Play Store & App Store",
    ],
  },
  {
    company: "PT. Sayap Mas Utama (Wings)",
    title: "Warehouse QC",
    period: "Oct 2015 – Jan 2019",
    bullets: ["Check product quality & quantity", "Stock opname / inventory count"],
  },
  {
    company: "Gas Station 34-16607",
    title: "Operator",
    period: "Sep 2019 – Aug 2022",
    bullets: ["Serve fueling operations", "Record revenue per shift"],
  },
];

const SKILLS = {
  APIs: [
    "REST integration (GET/POST/PUT/DELETE)",
    "Google Login",
    "Facebook Login",
    "Google Maps APIs",
    "Social Integration APIs",
    "App/Universal Links",
  ],
  Firebase: ["Auth", "FCM", "Crashlytics", "Dynamic Links"],
  "Payment Gateway": ["Espay", "Xendit", "In‑App Purchases"],
  Hardware: ["Camera", "Microphone", "GPS"],
  "State Management": ["GetX", "BLoC"],
  "Code Structure": ["MVC (Model‑View‑Controller)", "Reusable & Readable"],
  Storage: ["GetStorage", "Shared Preferences", "Hive"],
  Others: [
    "CorelDraw",
    "Microsoft Word",
    "Microsoft Excel",
    "Adobe Premiere Pro",
    "CapCut",
    "IT Support",
  ],
};

const PROJECTS = [
  {
    title: "Bionmed",
    desc: "Medical app for online consultation, remote monitoring, and digital medical records management.",
    tags: ["Medical", "Telemedicine"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.bionmed_app" },
      { label: "App Store", href: "https://apps.apple.com/id/app/bionmed/id6469526718" },
    ],
  },
  {
    title: "Mitra Bionmed",
    desc:
      "Partner app for healthcare professionals to provide online consultations, monitoring, and record keeping.",
    tags: ["Medical", "Partner"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.bionmed.bionmed" },
      { label: "App Store", href: "https://apps.apple.com/id/app/mitra-bionmed/id6471907689" },
    ],
  },
  {
    title: "Menuku",
    desc:
      "Restaurant ordering app with real‑time order tracking and multiple payment methods.",
    tags: ["Food", "Ordering"],
    links: [],
  },
  {
    title: "Asistenku",
    desc: "Marketplace for services (cleaning, laundry, drivers, babysitters, etc.).",
    tags: ["Service"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.AsistenKu" },
      { label: "App Store", href: "https://apps.apple.com/id/app/asistenku/id6473903785" },
    ],
  },
  {
    title: "Mitra Asistenku",
    desc: "Partner app for providers to register and manage Asistenku services.",
    tags: ["Service", "Partner"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.MitraAsisten" },
      { label: "App Store", href: "https://apps.apple.com/id/app/mitra-asistenku/id6473923399" },
    ],
  },
  {
    title: "Jooin",
    desc: "Community app for dues, rotating savings, marketplace, and community finance management.",
    tags: ["Community"],
    links: [
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.listin_mobile&hl=en&gl=US" },
      { label: "App Store", href: "https://apps.apple.com/app/jooin/id6737018373" },
    ],
  },
  {
    title: "Silancar",
    desc: "Job platform for applying to vacancies, tracking application history, and advanced filters.",
    tags: ["Jobs"],
    links: [{ label: "Play Test", href: "https://play.google.com/apps/testing/com.silancar_app" }],
  },
  {
    title: "Kartu AK‑1",
    desc:
      "Companion app for Silancar: generate job cards, upload documents, digital signatures, and download cards.",
    tags: ["Jobs"],
    links: [{ label: "Play Test", href: "https://play.google.com/apps/testing/com.kartu_ak1_app" }],
  },
  {
    title: "Flower Advisor",
    desc:
      "E‑commerce for flowers & gifts: order tracking, multi‑payment, multi‑language, and shipping options.",
    tags: ["Ecommerce"],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.flower.advisor&hl=en&gl=US",
      },
      { label: "App Store", href: "https://apps.apple.com/id/app/floweradvisor-flowers-gift/id1185232807" },
    ],
  },
  {
    title: "Flower Advisor Partner",
    desc: "Partner app for FA: accept/manage orders, real‑time chat, and performance analytics.",
    tags: ["Ecommerce", "Partner"],
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.flower.advisor.florist&hl=en&gl=US",
      },
      { label: "App Store", href: "https://apps.apple.com/id/app/floweradvisor-partner/id6467772100" },
    ],
  },
];

// ====== UTILS ======
function isValidKnownScheme(u) {
  try {
    const url = new URL(u);
    return ["http:", "https:", "mailto:", "tel:"] .includes(url.protocol);
  } catch {
    // Accept data/blobs by startsWith check (new URL can't parse data: without base in some bundlers)
    return typeof u === "string" && (u.startsWith("data:") || u.startsWith("blob:"));
  }
}

function safeHref(u) {
  return isValidKnownScheme(u) ? u : "#";
}

// Lightweight runtime tests (logged to console). Never throws in production UI.
(function runUnitTests() {
  const cases = [
    { in: "https://example.com/x.pdf", expect: true },
    { in: "http://example.com", expect: true },
    { in: "mailto:hi@example.com", expect: true },
    { in: "tel:+6289657081093", expect: true },
    { in: "data:application/pdf;base64,SGVsbG8=", expect: true },
    { in: "blob:https://example.com/123", expect: true },
    { in: "sandbox:/mnt/data/file.pdf", expect: false },
    { in: "not a url", expect: false },
    { in: "", expect: false },
  ];
  let pass = 0;
  cases.forEach((tc, i) => {
    const got = isValidKnownScheme(tc.in);
    const ok = got === tc.expect;
    pass += ok ? 1 : 0;
    // eslint-disable-next-line no-console
    console.log(`[test ${i + 1}]`, tc.in, '=>', got, ok ? 'PASS' : 'FAIL, expect', tc.expect);
  });
  // eslint-disable-next-line no-console
  console.log(`URL validator: ${pass}/${cases.length} tests passed.`);
})();

const Section = ({ id, children, className = "" }) => (
  <section id={id} className={`max-w-7xl mx-auto px-6 sm:px-8 ${className}`}>{children}</section>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl bg-slate-800/50 border border-white/10 shadow-xl ${className}`}>{children}</div>
);

// ====== LAYOUT ======
function AppLayout({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname]);

  const navLink = (to, label) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 rounded-lg text-sm transition hover:bg-white/5 ${
          isActive ? "text-white" : "text-slate-300"
        }`
      }
    >
      {label}
    </NavLink>
  );

  const resumeIsValid = isValidKnownScheme(CONTACT.resumeHref);

  return (
    <div className="min-h-screen bg-slate-900 text-white [--accent:#ff6b5a]">
      {!resumeIsValid && (
        <div className="bg-amber-500/10 border-b border-amber-400/30 text-amber-200 text-xs px-6 py-2">
          Heads‑up: set <span className="font-semibold">CONTACT.resumeHref</span> to a public URL (https://...) so the <em>My resume</em> button works.
        </div>
      )}
      <header className="sticky top-0 z-50 backdrop-blur bg-slate-900/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="font-semibold tracking-wide">Zaeni Hilman Darmawan</Link>
          <nav className="hidden md:flex items-center gap-2">
            {navLink("/", "Home")}
            <a href="#about" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5">About</a>
            <NavLink to="/portfolio" className={({isActive})=>`px-3 py-2 rounded-lg text-sm ${isActive?"text-white":"text-slate-300"} hover:bg-white/5`}>Projects</NavLink>
            <a href="#contact" className="px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-white/5">Contacts</a>
          </nav>
          <button className="md:hidden p-2 rounded-lg hover:bg-white/5" onClick={()=>setOpen(v=>!v)}>
            {open ? <X size={20}/> : <Menu size={20}/>}        
          </button>
        </div>
        {open && (
          <div className="md:hidden px-6 pb-4 space-y-2">
            <Link to="/" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5">Home</Link>
            <a href="#about" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5">About</a>
            <Link to="/portfolio" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5">Projects</Link>
            <a href="#contact" className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-white/5">Contacts</a>
          </div>
        )}
      </header>
      {children}
      <Footer />
    </div>
  );
}

// ====== HOME PAGE ======
function HomePage() {
  return (
    <main>
      <Hero />
      <TechStrip />
      <About />
      <Experience />
      <Skills />
      <CTAProjects />
      <Contact />
    </main>
  );
}

function Hero() {
  const resumeIsValid = isValidKnownScheme(CONTACT.resumeHref);

  const handleResumeClick = (e) => {
    if (!resumeIsValid) {
      e.preventDefault();
      alert("Your resume link isn't set to a valid public URL yet. Please update CONTACT.resumeHref to an https:// or data: URL.");
    }
  };

  return (
    <div className="relative overflow-hidden">
      <Section className="pt-12 sm:pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-slate-300">Hello. <span className="text-[var(--accent)]">•</span></p>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
              I’m <span className="text-white">Zaeni</span>
              <br />
              <span className="text-white">Flutter Developer</span>
            </h1>
            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 font-semibold shadow-lg shadow-[var(--accent)]/25 hover:brightness-110"
              >
                Got a project? <ArrowRight size={18} />
              </a>
              <a
                href={safeHref(CONTACT.resumeHref)}
                onClick={handleResumeClick}
                target={resumeIsValid ? "_blank" : undefined}
                rel={resumeIsValid ? "noreferrer" : undefined}
                className={`inline-flex items-center gap-2 rounded-xl border border-white/15 px-4 py-2 font-semibold hover:bg-white/5 ${
                  resumeIsValid ? "" : "opacity-60 cursor-not-allowed"
                }`}
              >
                <Download size={18} /> My resume
              </a>
            </div>
          </motion.div>

          {/* Right portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div
              className="relative mx-auto w-72 h-72 sm:w-[22rem] sm:h-[22rem] rounded-full shadow-2xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(255,107,90,.15), transparent 70%), conic-gradient(from 0deg at 50% 50%, rgba(255,107,90,.15), transparent 60%)",
                boxShadow:
                  "0 0 0 2px rgba(255,255,255,.06), inset 0 0 80px rgba(255,107,90,.18), 0 30px 80px rgba(0,0,0,.5)",
              }}
            >
              <img
                src={PROFILE_IMG}
                alt="Zaeni portrait"
                className="absolute inset-0 w-full h-full object-cover rounded-full p-6"
                style={{ filter: "contrast(1.05) saturate(1.05)" }}
              />
              {/* Decorative chevrons */}
              <div className="absolute -left-10 top-1/2 -translate-y-1/2 text-[var(--accent)]/70 text-4xl">❮</div>
              <div className="absolute -right-10 top-1/2 -translate-y-1/2 text-[var(--accent)]/70 text-4xl">❯</div>
            </div>
          </motion.div>
        </div>
      </Section>
    </div>
  );
}

function TechStrip() {
  return (
    <div className="border-y border-white/10 bg-slate-800/30">
      <Section className="py-4">
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-slate-400">
          {TAGS.map((t) => (
            <li key={t} className="text-sm">{t}</li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function About() {
  return (
    <Section id="about" className="py-16 grid lg:grid-cols-3 gap-8">
      <div className="space-y-6">
        <h2 className="text-3xl font-extrabold">About me</h2>
        <p className="text-slate-300 leading-relaxed">{ABOUT_SUMMARY}</p>
        <dl className="grid grid-cols-3 gap-4 pt-4">
          <div>
            <div className="text-2xl font-extrabold">10+</div>
            <div className="text-slate-400 text-sm">Completed Projects</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold">95%</div>
            <div className="text-slate-400 text-sm">Client satisfaction</div>
          </div>
          <div>
            <div className="text-2xl font-extrabold">2+</div>
            <div className="text-slate-400 text-sm">Years of experience</div>
          </div>
        </dl>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 grid sm:grid-cols-3 gap-6"
      >
        {[
          { title: "Mobile API & Firebase Integration", icon: "/" },
          { title: "API & Firebase Integration", icon: "/" },
          { title: "Store Deployment (Play/App Store)", icon: "/" },
        ].map((s) => (
          <Card key={s.title} className="p-6 hover:bg-slate-800/70 transition">
            <div className="text-[var(--accent)] mb-3">▣</div>
            <div className="font-semibold">{s.title}</div>
            <p className="text-sm text-slate-400 mt-2">End‑to‑end mobile solutions: UI implementation, state management, integrations, testing, and store release.</p>
          </Card>
        ))}
      </motion.div>
    </Section>
  );
}

function Experience() {
  return (
    <Section className="py-12">
      <h3 className="text-2xl font-bold mb-6">Experience</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {EXPERIENCE.map((job) => (
          <motion.div
            key={job.company + job.period}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl bg-slate-800/40 border border-white/10 p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="font-semibold">{job.title}</div>
                <div className="text-slate-300">{job.company}</div>
              </div>
              <div className="text-sm text-slate-400">{job.period}</div>
            </div>
            <ul className="mt-3 list-disc list-inside text-slate-300 space-y-1">
              {job.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  const entries = Object.entries(SKILLS);
  return (
    <Section className="py-12">
      <h3 className="text-2xl font-bold mb-6">Skills</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {entries.map(([group, items]) => (
          <Card key={group} className="p-6">
            <div className="font-semibold mb-2">{group}</div>
            <div className="flex flex-wrap gap-2">
              {items.map((it) => (
                <span
                  key={it}
                  className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300"
                >
                  {it}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function CTAProjects() {
  return (
    <Section className="py-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold">Projects</h3>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 font-semibold shadow-lg shadow-[var(--accent)]/25 hover:brightness-110"
        >
          See all <ArrowRight size={18} />
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {PROJECTS.slice(0, 3).map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}

function ProjectCard({ project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-slate-800/40 border border-white/10 p-5 hover:bg-slate-800/60 transition"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-lg">{project.title}</div>
          <p className="text-slate-300 mt-1 text-sm leading-relaxed">{project.desc}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <span key={t} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-400">
            {t}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={safeHref(l.href)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[var(--accent)] hover:underline"
            >
              {l.label} <ExternalLink size={14} />
            </a>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  const buildMailtoHref = () => {
    const subject = `New project inquiry from ${name || "Website Contact"}`;
    const bodyLines = [
      `Name: ${name || "-"}`,
      `Email: ${email || "-"}`,
      "",
      "Message:",
      message || "-",
      "",
      "— Sent from Zaeni Portfolio Website",
    ];
    const body = bodyLines.join("%0D%0A"); // CRLF for better formatting in clients
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sending) return;

    // basic client-side validation
    if (!message.trim()) {
      alert("Please tell me about your project in the message box.");
      return;
    }

    setSending(true);
    try {
      const href = buildMailtoHref();
      // Open the user's email client with a prefilled draft
      window.location.href = href;
      // Fallback copy-to-clipboard for environments without a mail client
      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText(
            `Send to: ${CONTACT.email}
Subject: New project inquiry from ${name || "Website Contact"}

${message}`
          );
          console.log("Message copied to clipboard as fallback.");
        } catch {}
        setSending(false);
      }, 300);
    } catch (err) {
      console.error(err);
      alert("Unable to open your mail app. Please send an email to " + CONTACT.email + " with your message.");
      setSending(false);
    }
  };

  return (
    <Section id="contact" className="py-16">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <div>
          <h3 className="text-2xl font-bold">Let’s build something</h3>
          <p className="text-slate-300 mt-2">Ready to help with your website or app—end‑to‑end from design and implementation to deployment.</p>
          <div className="mt-6 space-y-3 text-slate-300">
            <div className="flex items-center gap-3">
              <Mail size={18} /> <a className="hover:underline" href={safeHref(`mailto:${CONTACT.email}`)}>{CONTACT.email}</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone size={18} /> <a className="hover:underline" href={safeHref(`tel:${CONTACT.phone}`)}>{CONTACT.phone}</a>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} /> <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
                placeholder="Your name"
                name="name"
                autoComplete="name"
              />
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
                placeholder="Email"
                name="email"
                type="email"
                autoComplete="email"
              />
            </div>
            <textarea
              value={message}
              onChange={(e)=>setMessage(e.target.value)}
              rows={5}
              className="w-full bg-transparent border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
              placeholder="Tell me about your project"
              name="message"
            />
            <button disabled={sending} className={`inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 font-semibold shadow-lg shadow-[var(--accent)]/25 hover:brightness-110 ${sending?"opacity-60 cursor-not-allowed":""}`}>
              {sending? "Opening mail app…" : <>Send <ArrowRight size={18} /></>}
            </button>
          </form>
          <p className="text-xs text-slate-400 mt-3">Tip: Your default mail app will open with a pre‑filled draft to <span className="text-slate-300">{CONTACT.email}</span>. If it doesn’t, your message is copied to the clipboard as a fallback.</p>
        </Card>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <Section className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-slate-400 text-sm">© {new Date().getFullYear()} {CONTACT.name}</div>
        <div className="flex items-center gap-4">
          <a href={safeHref(CONTACT.github)} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
            <Github size={18} />
          </a>
          <a href={safeHref(CONTACT.linkedin)} target="_blank" rel="noreferrer" className="text-slate-300 hover:text-white">
            <Linkedin size={18} />
          </a>
          <a href={safeHref(`mailto:${CONTACT.email}`)} className="text-slate-300 hover:text-white">
            <Mail size={18} />
          </a>
        </div>
      </Section>
    </footer>
  );
}

// ====== PORTFOLIO PAGE ======
function PortfolioPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.tags.join(" ").toLowerCase().includes(term) ||
        p.desc.toLowerCase().includes(term)
    );
  }, [q]);

  return (
    <main>
      <Section className="pt-12 sm:pt-16 pb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Projects</h1>
            <p className="text-slate-300 mt-2">A collection of apps I have built or contributed to.</p>
          </div>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search projects..."
            className="w-full sm:w-80 bg-transparent border border-white/15 rounded-xl px-3 py-2 focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
      </Section>

      <Section className="pb-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </Section>
    </main>
  );
}

// ====== APP ROOT ======
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}
