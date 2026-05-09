import Link from "next/link";

function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-alert rounded flex items-center justify-center text-white font-bold text-sm">
            SI
          </div>
          <span className="font-bold text-lg text-white">ShieldIvanti</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <a href="#threat" className="hover:text-white transition">Threat Intel</a>
          <a href="#services" className="hover:text-white transition">Services</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#team" className="hover:text-white transition">Team</a>
          <a href="#contact" className="hover:text-white transition">Contact</a>
        </div>
        <a href="#contact" className="bg-red-alert hover:bg-red-dark text-white px-4 py-2 rounded text-sm font-semibold transition">
          Emergency Scan
        </a>
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-alert/5 to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto text-center relative">
        <div className="inline-flex items-center gap-2 bg-red-alert/10 border border-red-alert/30 text-red-glow px-4 py-2 rounded-full text-sm font-mono mb-8 animate-pulse-red">
          <span className="w-2 h-2 bg-red-alert rounded-full" />
          ACTIVE THREAT — CVE-2025-4427 / CVE-2025-4428
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          Dormant Backdoors Are Hiding
          <br />
          <span className="text-red-alert">In Your Ivanti EPMM Systems</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Attackers have planted <code className="text-red-glow bg-red-alert/10 px-2 py-0.5 rounded font-mono text-base">403.jsp</code> sleeper
          shells in Ivanti EPMM deployments worldwide. Traditional security scanners miss them. We find and remove them — in under 24 hours.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="bg-red-alert hover:bg-red-dark text-white px-8 py-4 rounded-lg text-lg font-semibold transition shadow-lg shadow-red-alert/20">
            Request Emergency Scan
          </a>
          <a href="#threat" className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-lg text-lg font-semibold transition">
            Read the Threat Brief
          </a>
        </div>
        <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto text-center">
          <div>
            <div className="text-2xl font-bold text-white">47</div>
            <div className="text-xs text-slate-400 mt-1">Systems scanned</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-alert">12</div>
            <div className="text-xs text-slate-400 mt-1">Backdoors found</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-emerald-500">&lt;4hr</div>
            <div className="text-xs text-slate-400 mt-1">Avg. response time</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ThreatSection() {
  return (
    <section id="threat" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Understanding the Threat</h2>
        <p className="text-slate-400 mb-12 max-w-3xl">
          In May 2025, attackers chained two Ivanti EPMM vulnerabilities to deploy persistent JSP webshells. These dormant backdoors survive patches and reboots, giving attackers on-demand access to your network.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-alert">01</span> Attack Chain
            </h3>
            <div className="font-mono text-sm text-slate-400 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-red-alert mt-0.5">&#9656;</span>
                <span><strong className="text-slate-200">CVE-2025-4427</strong> — Authentication bypass on API endpoint</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-alert mt-0.5">&#9656;</span>
                <span><strong className="text-slate-200">CVE-2025-4428</strong> — Remote code execution via expression language injection</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-alert mt-0.5">&#9656;</span>
                <span>Deploy <code className="text-red-glow">403.jsp</code> webshell to Tomcat webapps directory</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-red-alert mt-0.5">&#9656;</span>
                <span>Webshell persists across patches, hidden as a normal error page</span>
              </div>
            </div>
          </div>
          <div className="bg-[#0a0a0a] border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <span className="text-red-alert">02</span> Why Scanners Miss It
            </h3>
            <div className="font-mono text-sm text-slate-400 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">&#9888;</span>
                <span>File named <code className="text-red-glow">403.jsp</code> blends with legitimate error pages</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">&#9888;</span>
                <span>No outbound C2 traffic until manually activated by attacker</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">&#9888;</span>
                <span>Standard AV/EDR signature databases lack this specific IOC</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-amber-500 mt-0.5">&#9888;</span>
                <span>Shell code is obfuscated — appears as benign JSP on casual inspection</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-red-alert/5 border border-red-alert/20 rounded-xl p-6 font-mono text-sm">
          <div className="text-red-glow font-semibold mb-2">&#9632; Indicator of Compromise — File Hash (SHA-256)</div>
          <code className="text-slate-400 break-all">e4d97b3f6e8a1c2d...403.jsp — /opt/ivanti/mics/webapps/ROOT/403.jsp</code>
          <div className="text-slate-600 mt-2">If this file exists in your deployment, your system is compromised.</div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = [
    {
      icon: "🔍",
      title: "Automated Backdoor Scan",
      desc: "Deploy our proprietary scanning scripts to identify 403.jsp and variant backdoor signatures across your Ivanti EPMM file systems.",
      features: ["SHA-256 hash matching", "Behavioral signature analysis", "File integrity verification", "Tomcat webapps directory audit"],
    },
    {
      icon: "🔬",
      title: "Manual Forensic Analysis",
      desc: "Our analysts manually inspect suspicious files, configurations, and logs to identify modified or novel backdoor variants.",
      features: ["JSP source code deobfuscation", "Access log correlation", "Configuration drift analysis", "Lateral movement assessment"],
    },
    {
      icon: "📋",
      title: "Threat Assessment Report",
      desc: "Receive a detailed report documenting all findings, compromised assets, and recommended remediation steps.",
      features: ["Executive summary for leadership", "Technical IOC documentation", "Timeline reconstruction", "Compliance-ready format"],
    },
    {
      icon: "🛡️",
      title: "Backdoor Removal & Hardening",
      desc: "We safely remove identified backdoors and harden your Ivanti EPMM deployment against reinfection.",
      features: ["Safe backdoor elimination", "System restoration verification", "Access control hardening", "Monitoring rule deployment"],
    },
  ];

  return (
    <section id="services" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Our Services</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">End-to-end detection and removal, from initial scan to post-incident hardening.</p>
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-slate-800/40 border border-slate-800 rounded-xl p-6 hover:border-slate-700 transition">
              <div className="text-2xl mb-3">{s.icon}</div>
              <h3 className="text-lg font-semibold text-white mb-2">{s.title}</h3>
              <p className="text-slate-400 text-sm mb-4">{s.desc}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-emerald-500 text-xs">&#10003;</span>{f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const plans = [
    {
      name: "Scan Only",
      price: "$2,500",
      unit: "per system",
      desc: "Automated detection scan with summary report",
      features: ["Automated backdoor signature scan", "File integrity check", "Summary findings report", "Results within 48 hours"],
      cta: "Request Scan",
      highlight: false,
    },
    {
      name: "Full Assessment",
      price: "$7,500",
      unit: "per system",
      desc: "Complete forensic analysis with detailed reporting",
      features: ["Everything in Scan Only", "Manual forensic analysis", "Detailed threat assessment report", "Remediation recommendations", "Results within 24 hours"],
      cta: "Request Assessment",
      highlight: true,
    },
    {
      name: "Emergency Response",
      price: "$15,000",
      unit: "per system",
      desc: "24-hour detection, removal, and hardening",
      features: ["Everything in Full Assessment", "Backdoor removal service", "System restoration & verification", "Post-incident hardening", "4-hour initial response SLA", "30-day monitoring support"],
      cta: "Request Emergency Response",
      highlight: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4">Pricing</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">Transparent, per-system pricing. Volume discounts available for 5+ systems.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p) => (
            <div key={p.name} className={`rounded-xl p-6 border ${p.highlight ? "border-red-alert bg-red-alert/5 shadow-lg shadow-red-alert/10" : "border-slate-800 bg-[#0a0a0a]"}`}>
              {p.highlight && <div className="text-xs font-semibold text-red-alert mb-3 uppercase tracking-wider">Most Popular</div>}
              <h3 className="text-lg font-semibold text-white">{p.name}</h3>
              <div className="mt-2 mb-1">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-slate-400 text-sm ml-1">{p.unit}</span>
              </div>
              <p className="text-slate-400 text-sm mb-6">{p.desc}</p>
              <ul className="space-y-2 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-500 mt-0.5 text-xs">&#10003;</span>{f}
                  </li>
                ))}
              </ul>
              <a href="#contact" className={`block text-center py-3 rounded-lg font-semibold text-sm transition ${p.highlight ? "bg-red-alert hover:bg-red-dark text-white" : "border border-slate-700 hover:border-slate-500 text-slate-300"}`}>
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section id="team" className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12">Security Expertise You Can Trust</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-2xl mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Marcus Chen, CISSP, OSCP</h3>
            <p className="text-red-alert text-sm mb-3">Founder & Lead Analyst</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              15 years in enterprise cybersecurity. Former incident response lead at CrowdStrike. Specializes in Java-based application security and APT investigation. Published researcher on JSP webshell detection techniques.
            </p>
            <div className="flex gap-2 mt-4">
              {["CISSP", "OSCP", "GCIH", "GREM"].map((c) => (
                <span key={c} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded">{c}</span>
              ))}
            </div>
          </div>
          <div className="bg-slate-800/40 border border-slate-800 rounded-xl p-8">
            <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center text-2xl mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
            </div>
            <h3 className="text-xl font-semibold text-white">Dr. Sarah Okonkwo, PhD</h3>
            <p className="text-red-alert text-sm mb-3">Forensic Analysis Lead</p>
            <p className="text-slate-400 text-sm leading-relaxed">
              PhD in Computer Science (Security). 10 years at Mandiant leading MDM and mobile infrastructure investigations. Deep expertise in Ivanti/MobileIron platform internals and Tomcat application server forensics.
            </p>
            <div className="flex gap-2 mt-4">
              {["PhD", "GCFE", "EnCE", "OSWE"].map((c) => (
                <span key={c} className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-2 py-1 rounded">{c}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Combined years experience", value: "25+" },
            { label: "Enterprise IR engagements", value: "200+" },
            { label: "Ivanti-specific investigations", value: "30+" },
            { label: "Security certifications", value: "12" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Request a Security Assessment</h2>
            <p className="text-slate-400 mb-8">Submit your Ivanti EPMM system details for immediate triage. All information is handled under NDA.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-alert/10 flex items-center justify-center text-red-alert">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Emergency Hotline</div>
                  <div className="text-white font-semibold">+1 (888) 402-SCAN</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-alert/10 flex items-center justify-center text-red-alert">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Secure Email</div>
                  <div className="text-white font-semibold">response@shieldivanti.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-alert/10 flex items-center justify-center text-red-alert">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                </div>
                <div>
                  <div className="text-sm text-slate-400">Response Time</div>
                  <div className="text-white font-semibold">Under 4 hours for emergency requests</div>
                </div>
              </div>
            </div>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Full Name</label>
                <input type="text" className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition" placeholder="Jane Doe" />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Job Title</label>
                <input type="text" className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition" placeholder="CISO" />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Work Email</label>
              <input type="email" className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition" placeholder="jane@company.com" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Organization</label>
              <input type="text" className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition" placeholder="Acme Corp" />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Number of Ivanti EPMM Systems</label>
              <select className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition">
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>50+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Urgency Level</label>
              <select className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition">
                <option>Standard (48-hour response)</option>
                <option>Priority (24-hour response)</option>
                <option>Emergency (4-hour response)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Additional Details</label>
              <textarea rows={3} className="w-full bg-[#0a0a0a] border border-slate-700 rounded-lg px-4 py-3 text-white text-sm focus:border-red-alert focus:outline-none transition resize-none" placeholder="Describe your situation, any suspicious activity observed, etc." />
            </div>
            <button type="submit" className="w-full bg-red-alert hover:bg-red-dark text-white py-3 rounded-lg font-semibold transition shadow-lg shadow-red-alert/20">
              Submit Secure Request
            </button>
            <p className="text-xs text-slate-600 text-center">All submissions are encrypted and handled under strict confidentiality agreements.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-slate-800">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-red-alert rounded flex items-center justify-center text-white font-bold text-xs">SI</div>
          <span>&copy; 2025 ShieldIvanti. All rights reserved.</span>
        </div>
        <div className="flex gap-6">
          <Link href="/scan" className="hover:text-slate-400 transition">Free Scan Check</Link>
          <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ThreatSection />
      <ServicesSection />
      <PricingSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
