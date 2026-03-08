import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Cpu, Network, TrendingUp, Hospital, Users, Activity } from 'lucide-react';
import './Home.css';

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] as const },
});

const stats = [
    { value: '60+', label: 'Hospitals', icon: <Hospital size={18} /> },
    { value: '6', label: 'Disease Models', icon: <Cpu size={18} /> },
    { value: '94.2%', label: 'Peak Accuracy', icon: <TrendingUp size={18} /> },
    { value: '760K+', label: 'Data Points', icon: <Users size={18} /> },
];

const features = [
    {
        icon: <Shield size={22} />,
        title: 'Zero Data Exposure',
        desc: 'Patient records never leave the hospital. Only encrypted model gradients are shared — auditable and tamper-proof.',
    },
    {
        icon: <Network size={22} />,
        title: 'Federated Learning',
        desc: 'Each hospital trains the model locally. Improvements are aggregated globally, making every hospital smarter.',
    },
    {
        icon: <Activity size={22} />,
        title: 'Rare Disease Focus',
        desc: 'Pooling knowledge across hospitals dramatically increases rare disease datasets that no single hospital has alone.',
    },
    {
        icon: <Cpu size={22} />,
        title: 'Differential Privacy',
        desc: 'Controlled noise injection during training ensures individual patient records cannot be re-identified from model updates.',
    },
];

const steps = [
    { n: '01', title: 'Download Model', desc: 'Hospital downloads the latest global federated model from our secure server.' },
    { n: '02', title: 'Train Locally', desc: 'The model trains on local patient records. Data never moves. Privacy guaranteed.' },
    { n: '03', title: 'Send Updates', desc: 'Only encrypted model gradients are uploaded — never raw data. Global model improves.' },
];

export default function Home() {
    return (
        <div className="home-page">
            {/* ── Hero ──────────────────────────── */}
            <section className="hero-section">
                <div className="container hero-inner">
                    <motion.div {...fadeUp(0)} className="hero-badge">
                        <span className="badge badge-green">
                            <span className="badge-dot" /> Live Network · 60+ Hospitals
                        </span>
                    </motion.div>

                    <motion.h1 {...fadeUp(0.1)} className="hero-title">
                        Collaborative AI.<br />
                        <span className="hero-title-accent">Zero Data Exposure.</span>
                    </motion.h1>

                    <motion.p {...fadeUp(0.2)} className="hero-desc">
                        India's first federated learning platform for rare disease detection.
                        Hospitals share model improvements — never patient data.
                    </motion.p>

                    <motion.div {...fadeUp(0.3)} className="hero-cta">
                        <Link to="/models" className="btn btn-primary btn-lg">
                            Explore Models <ArrowRight size={18} />
                        </Link>
                        <Link to="/about" className="btn btn-secondary btn-lg">
                            How It Works
                        </Link>
                    </motion.div>

                    {/* Terminal-style snippet */}
                    <motion.div {...fadeUp(0.45)} className="hero-terminal">
                        <div className="terminal-bar">
                            <span /><span /><span />
                            <code className="terminal-title">fedhealth-cli · hospital-node</code>
                        </div>
                        <div className="terminal-body">
                            <div><span className="t-dim">$</span> fedhealth pull TBDetect-v3</div>
                            <div className="t-green">✓ Model downloaded (2.8 MB)</div>
                            <div><span className="t-dim">$</span> fedhealth train --data ./patients.csv</div>
                            <div className="t-amber">⟳ Training on local data... epoch 12/20</div>
                            <div className="t-green">✓ Gradients computed — patient data stayed local</div>
                            <div><span className="t-dim">$</span> fedhealth push --model TBDetect-v3</div>
                            <div className="t-green">✓ Model update submitted (no patient data uploaded)</div>
                            <div className="t-dim">Global accuracy improved: 93.1% → 94.2%<span className="cursor" /></div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Stats Strip ───────────────────── */}
            <section className="stats-section">
                <div className="container stats-grid">
                    {stats.map((s, i) => (
                        <motion.div key={i} className="stat-card" {...fadeUp(0.1 * i)}>
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── How It Works ──────────────────── */}
            <section className="section how-section">
                <div className="container">
                    <motion.div className="section-header text-center" {...fadeUp(0)}>
                        <span className="mono-tag">// process</span>
                        <h2>How Federated Learning Works</h2>
                        <p>Three steps. No data leaves the hospital. Ever.</p>
                    </motion.div>

                    <div className="steps-row">
                        {steps.map((s, i) => (
                            <motion.div key={i} className="step-card" {...fadeUp(0.1 + i * 0.15)}>
                                <div className="step-number">{s.n}</div>
                                <h3>{s.title}</h3>
                                <p>{s.desc}</p>
                                {i < steps.length - 1 && <div className="step-arrow"><ArrowRight size={20} /></div>}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features ──────────────────────── */}
            <section className="section features-section">
                <div className="container">
                    <motion.div className="section-header text-center" {...fadeUp(0)}>
                        <span className="mono-tag">// capabilities</span>
                        <h2>Built for Public Healthcare</h2>
                        <p>Designed for high-scale, privacy-first government hospital systems.</p>
                    </motion.div>

                    <div className="grid-2" style={{ marginTop: '3rem' }}>
                        {features.map((f, i) => (
                            <motion.div key={i} className="card feature-card" {...fadeUp(0.1 + i * 0.1)}>
                                <div className="feature-icon">{f.icon}</div>
                                <h4>{f.title}</h4>
                                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA Banner ────────────────────── */}
            <section className="section cta-section">
                <div className="container">
                    <motion.div className="cta-banner" {...fadeUp(0)}>
                        <h2>Ready to join the network?</h2>
                        <p>Register your hospital and access all six disease detection models today.</p>
                        <div className="cta-btns">
                            <Link to="/signup" className="btn btn-primary btn-lg">Register Hospital <ArrowRight size={18} /></Link>
                            <Link to="/local" className="btn btn-secondary btn-lg">Try Local Client</Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
