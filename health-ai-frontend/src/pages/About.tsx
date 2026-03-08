import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, AlertTriangle, Database, Lock, Globe, BarChart2 } from 'lucide-react';
import './About.css';

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, delay },
});

const problems = [
    'Patients in rural areas receive delayed treatment due to lack of diagnostic intelligence',
    'Clinical decisions depend on manual judgment rather than data-driven support',
    'Hospitals cannot leverage AI for early prediction of rare diseases',
    'Delayed assessment of rare diseases often puts patient lives at risk',
    'ML models trained on low data due to patient privacy restrictions make dangerous mistakes',
];

const techStack = [
    { name: 'Federated Learning', desc: 'Distributed model training across hospital nodes without data centralization', icon: <Globe size={18} /> },
    { name: 'Differential Privacy', desc: 'Gaussian noise injection during gradient computation prevents patient re-identification', icon: <Lock size={18} /> },
    { name: 'Secure Aggregation', desc: 'Cryptographic aggregation of model updates on the central server', icon: <Database size={18} /> },
    { name: 'Adaptive Weighting', desc: 'Local dataset quality and size determine each hospital\'s contribution weight', icon: <BarChart2 size={18} /> },
];

export default function About() {
    return (
        <div className="about-page">
            {/* ── Header ──────────────────────── */}
            <section className="about-hero section">
                <div className="container">
                    <motion.div {...fade(0)} className="text-center" style={{ marginBottom: '3rem' }}>
                        <span className="mono-tag">// mission</span>
                        <h1 style={{ marginTop: '0.75rem' }}>
                            AI That Serves<br />
                            <span style={{ color: 'var(--accent-green)', fontStyle: 'italic' }}>Every Hospital.</span>
                        </h1>
                        <p style={{ maxWidth: 580, margin: '1rem auto 0', fontSize: '1.05rem' }}>
                            India's public healthcare system serves over 1.4 billion people. We're making sure the smallest district hospital has the same AI diagnostic power as the largest city hospital.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ── Problem Statement ───────────── */}
            <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container">
                    <div className="about-split">
                        <motion.div {...fade(0)}>
                            <span className="mono-tag">// problem_statement</span>
                            <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>The Diagnostic Gap</h2>
                            <p style={{ marginBottom: '1.5rem' }}>
                                India's public healthcare system serves one of the largest and most diverse patient populations in the world. However, the detection of rare and under-diagnosed diseases remains a major challenge, especially across government hospitals and district healthcare centers.
                            </p>
                            <div className="problem-list">
                                {problems.map((p, i) => (
                                    <motion.div key={i} className="problem-item" {...fade(0.1 + i * 0.08)}>
                                        <AlertTriangle size={14} style={{ color: 'var(--accent-amber)', flexShrink: 0, marginTop: 3 }} />
                                        <span>{p}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div {...fade(0.2)} className="about-stat-col">
                            {[
                                { n: '1.4B', l: 'People served by India\'s public health system' },
                                { n: '70%', l: 'Cases in rural areas with limited diagnostic tools' },
                                { n: '12+', l: 'Rare diseases commonly misdiagnosed or delayed' },
                                { n: '40%', l: 'Reduction in model error when hospitals collaborate' },
                            ].map((s, i) => (
                                <div key={i} className="about-stat-item">
                                    <span className="about-stat-n">{s.n}</span>
                                    <span className="about-stat-l">{s.l}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Solution ────────────────────── */}
            <section className="section">
                <div className="container">
                    <motion.div {...fade(0)} className="text-center section-header">
                        <span className="mono-tag">// solution</span>
                        <h2>Federated Learning for Healthcare</h2>
                        <p>One liner: Hospitals download a global ML model, train it locally, and only send the <em style={{ color: 'var(--accent-green)' }}>improvements</em> — not the patient data.</p>
                    </motion.div>

                    {/* Architecture Diagram */}
                    <motion.div {...fade(0.2)} className="arch-diagram">
                        <div className="arch-center">
                            <div className="arch-server">
                                <div className="arch-server-icon">🖥️</div>
                                <span>Global Server</span>
                                <span className="mono-tag">Central Model</span>
                            </div>
                        </div>
                        <div className="arch-hospitals">
                            {['Hospital A', 'Hospital B', 'Hospital C', 'Hospital D'].map((h, i) => (
                                <div key={i} className="arch-hospital">
                                    <div className="arch-hospital-icon">🏥</div>
                                    <span>{h}</span>
                                    <span className="arch-tag">Local Training</span>
                                </div>
                            ))}
                        </div>
                        <div className="arch-arrows" aria-hidden>
                            <div className="arch-label-down">← Model Download</div>
                            <div className="arch-label-up">Gradient Upload →</div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Technology ──────────────────── */}
            <section className="section" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
                <div className="container">
                    <motion.div {...fade(0)} className="text-center section-header">
                        <span className="mono-tag">// technology</span>
                        <h2>Under the Hood</h2>
                        <p>Privacy-preserving distributed machine learning at scale.</p>
                    </motion.div>
                    <div className="grid-2">
                        {techStack.map((t, i) => (
                            <motion.div key={i} className="card" {...fade(0.1 + i * 0.1)}>
                                <div className="feature-icon">{t.icon}</div>
                                <h4 style={{ marginTop: '0.75rem' }}>{t.name}</h4>
                                <p style={{ fontSize: '0.88rem', marginTop: '0.4rem' }}>{t.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Feasibility + USP ───────────── */}
            <section className="section">
                <div className="container">
                    <div className="about-split">
                        <motion.div {...fade(0)}>
                            <span className="mono-tag">// feasibility</span>
                            <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Why It Works</h2>
                            {['No patient data is shared between hospitals', 'Works with existing hospital infrastructure', 'Scales by adding hospitals incrementally', 'Uses readily available open-source tools', 'Requires minimal technical knowledge from hospital staff'].map((p, i) => (
                                <motion.div key={i} className="problem-item" {...fade(0.05 * i)} style={{ marginBottom: '0.85rem' }}>
                                    <span style={{ color: 'var(--accent-green)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>✓</span>
                                    <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{p}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div {...fade(0.2)}>
                            <span className="mono-tag">// target_audience</span>
                            <h2 style={{ marginTop: '0.75rem', marginBottom: '1.5rem' }}>Who Uses This</h2>
                            {['Government hospitals and district healthcare centers', 'State and national health departments', 'Medical colleges and research institutions', 'Public health policymakers and planners', 'Government-backed health IT agencies'].map((a, i) => (
                                <motion.div key={i} className="problem-item" {...fade(0.05 * i)} style={{ marginBottom: '0.85rem' }}>
                                    <span style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>→</span>
                                    <span style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>{a}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────── */}
            <section className="section">
                <div className="container text-center">
                    <motion.div {...fade(0)}>
                        <h2>Explore the Model Library</h2>
                        <p style={{ margin: '1rem auto', maxWidth: 480 }}>Six disease detection models, each trained collaboratively across dozens of hospitals. Download, train locally, contribute back.</p>
                        <Link to="/models" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }}>
                            View All Models <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
