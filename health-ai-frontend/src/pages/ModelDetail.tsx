import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Star, Hospital, Database, Calendar, Cpu, CheckCircle } from 'lucide-react';
import { mockModels } from '../data/mockModels';
import { modelsAPI } from '../lib/api';
import './ModelDetail.css';

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
});

export default function ModelDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const model = mockModels.find(m => m.id === id);

    if (!model) return (
        <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
            <h2>Model not found</h2>
            <Link to="/models" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>← Back to Models</Link>
        </div>
    );

    const avgRating = model.reviews.length
        ? (model.reviews.reduce((s, r) => s + r.rating, 0) / model.reviews.length).toFixed(1)
        : '—';

    return (
        <div className="detail-page">
            <div className="container">
                {/* Back */}
                <motion.button {...fade(0)} className="back-btn" onClick={() => navigate('/models')}>
                    <ArrowLeft size={16} /> Model Library
                </motion.button>

                <div className="detail-layout">
                    {/* ── Left Column ──────────────────── */}
                    <div className="detail-main">
                        {/* Header */}
                        <motion.div {...fade(0.05)} className="detail-header card">
                            <div className="detail-header-top">
                                <div className="detail-tags">
                                    {model.tags.map(t => <span key={t} className="badge badge-green">{t}</span>)}
                                    <span className="badge badge-blue">{model.category}</span>
                                </div>
                                <span className="mono-tag">v{model.version}</span>
                            </div>
                            <h1 className="detail-title">{model.name}</h1>
                            <p className="detail-disease">{model.disease}</p>
                            <p style={{ marginTop: '0.75rem', fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                                {model.description}
                            </p>

                            <div className="detail-meta-row">
                                <div className="detail-meta-item">
                                    <Hospital size={15} /> <span>{model.hospitalsUsing} hospitals</span>
                                </div>
                                <div className="detail-meta-item">
                                    <Database size={15} /> <span>{model.dataPoints.toLocaleString()} data points</span>
                                </div>
                                <div className="detail-meta-item">
                                    <Calendar size={15} /> <span>Updated {model.lastUpdated}</span>
                                </div>
                                <div className="detail-meta-item">
                                    <Cpu size={15} /> <span>{(model.sizeKB / 1024).toFixed(1)} MB</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Accuracy + Training History */}
                        <motion.div {...fade(0.1)} className="card">
                            <h3 style={{ marginBottom: '1.5rem' }}>Training History</h3>
                            <div className="accuracy-hero">
                                <div>
                                    <span className="accuracy-big">{model.accuracy}%</span>
                                    <span className="mono-tag" style={{ marginLeft: '0.75rem' }}>Current Accuracy</span>
                                </div>
                                <span className="badge badge-green">↑ Improving each round</span>
                            </div>
                            <div className="training-chart">
                                {model.trainingHistory.map((pt, i) => {
                                    const maxAcc = Math.max(...model.trainingHistory.map(p => p.accuracy));
                                    const minAcc = Math.min(...model.trainingHistory.map(p => p.accuracy));
                                    const heightPct = ((pt.accuracy - minAcc) / (maxAcc - minAcc + 5)) * 100;
                                    return (
                                        <div key={i} className="chart-col">
                                            <div className="chart-bar-wrap">
                                                <div className="chart-bar" style={{ height: `${heightPct}%` }}>
                                                    <span className="chart-tip">{pt.accuracy}%</span>
                                                </div>
                                            </div>
                                            <span className="chart-label">Rd {pt.round}</span>
                                            <span className="chart-sub">{pt.hospitals}H</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Features */}
                        <motion.div {...fade(0.15)} className="card">
                            <h3 style={{ marginBottom: '1.25rem' }}>Model Capabilities</h3>
                            <div className="features-grid">
                                {model.features.map((f, i) => (
                                    <div key={i} className="feature-row">
                                        <CheckCircle size={14} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                                        <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{f}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="io-row" style={{ marginTop: '1.5rem' }}>
                                <div className="io-box">
                                    <span className="mono-tag">Input Format</span>
                                    <code>{model.inputFormat}</code>
                                </div>
                                <div className="io-box">
                                    <span className="mono-tag">Output Format</span>
                                    <code>{model.outputFormat}</code>
                                </div>
                            </div>
                        </motion.div>

                        {/* Reviews */}
                        <motion.div {...fade(0.2)} className="card">
                            <div className="reviews-header">
                                <h3>Hospital Reviews</h3>
                                <div className="avg-rating">
                                    <Star size={16} style={{ color: 'var(--accent-amber)', fill: 'var(--accent-amber)' }} />
                                    <span className="avg-rating-n">{avgRating}</span>
                                    <span className="mono-tag">/ 5.0 · {model.reviews.length} reviews</span>
                                </div>
                            </div>
                            <div className="reviews-list">
                                {model.reviews.map(r => (
                                    <div key={r.id} className="review-card">
                                        <div className="review-top">
                                            <div>
                                                <p className="review-hospital">{r.hospital}</p>
                                                <p className="review-reviewer">{r.reviewer}</p>
                                            </div>
                                            <div className="review-stars">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} size={13}
                                                        style={{
                                                            color: i < r.rating ? 'var(--accent-amber)' : 'var(--border-medium)',
                                                            fill: i < r.rating ? 'var(--accent-amber)' : 'transparent'
                                                        }} />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="review-comment">{r.comment}</p>
                                        <span className="mono-tag review-date">{r.date}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* ── Right Sidebar ─────────────────── */}
                    <motion.div {...fade(0.1)} className="detail-sidebar">
                        {/* Download card */}
                        <div className="sidebar-card card">
                            <div className="accuracy-ring">
                                <svg viewBox="0 0 80 80" className="ring-svg">
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--border-subtle)" strokeWidth="7" />
                                    <circle cx="40" cy="40" r="34" fill="none" stroke="var(--accent-green)" strokeWidth="7"
                                        strokeDasharray={`${2 * Math.PI * 34 * model.accuracy / 100} ${2 * Math.PI * 34}`}
                                        strokeDashoffset={2 * Math.PI * 34 * 0.25}
                                        strokeLinecap="round" />
                                </svg>
                                <div className="ring-label">
                                    <span className="ring-pct">{model.accuracy}%</span>
                                    <span className="ring-sub">accuracy</span>
                                </div>
                            </div>

                            <div className="sidebar-stats">
                                {[
                                    { l: 'Hospitals', v: model.hospitalsUsing },
                                    { l: 'Data Points', v: model.dataPoints.toLocaleString() },
                                    { l: 'Model Size', v: `${(model.sizeKB / 1024).toFixed(1)} MB` },
                                    { l: 'Version', v: `v${model.version}` },
                                ].map(s => (
                                    <div key={s.l} className="sidebar-stat">
                                        <span className="mono-tag">{s.l}</span>
                                        <span className="sidebar-stat-v">{s.v}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn btn-primary btn-lg"
                                style={{ width: '100%', justifyContent: 'center' }}
                                onClick={async () => {
                                    try {
                                        const response = await modelsAPI.download(model.id);
                                        const blob = response.data;
                                        // Try to infer extension from model name or id
                                        let ext = '.json';
                                        if (model.name.toLowerCase().includes('pt') || model.id.toLowerCase().includes('pt')) ext = '.pt';
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `${model.name.replace(/\s+/g, '_')}${ext}`;
                                        a.click();
                                        URL.revokeObjectURL(url);
                                    } catch (err) {
                                        alert('Failed to download model.');
                                    }
                                }}
                            >
                                <Download size={16} /> Download Model
                            </button>
                            <p className="mono-tag" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                                {model.sizeKB} KB · Free for registered hospitals
                            </p>
                        </div>

                        {/* Use in Local Client */}
                        <div className="sidebar-card card" style={{ background: 'linear-gradient(135deg, #0f1c0e, #0d1509)' }}>
                            <h4>Train This Model Locally</h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.4rem', marginBottom: '1rem' }}>
                                Download and train on your own patient dataset. No data leaves your hospital.
                            </p>
                            <Link to="/local" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                                Open Local Client
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
