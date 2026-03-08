import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Download, ArrowRight, Star, Hospital } from 'lucide-react';
import axios from 'axios';
import { mockModels } from '../data/mockModels';
import { modelsAPI } from '../lib/api';
import './Models.css';

const categories = ['All', 'Oncology', 'Neurological', 'Nephrology', 'Hepatology', 'Genetic'];

// Map slug to ID
const SLUG_TO_ID: Record<string, string> = {
    "huntington": "1",
    "ckd": "2",
    "breast_cancer": "3",
    "parkinsons": "4",
    "als": "5",
    "cirrhosis": "6"
};

const fade = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay },
});

export default function Models() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [liveMetadata, setLiveMetadata] = useState<any>(null);

    useEffect(() => {
        const fetchMeta = async () => {
            try {
                const res = await axios.get('http://localhost:8000/api/models');
                setLiveMetadata(res.data);
            } catch (e) {
                console.error("Failed to fetch live model metadata", e);
            }
        };
        fetchMeta();
    }, []);

    const filtered = mockModels.map(m => {
        // Find matching slug for this ID
        const slug = Object.keys(SLUG_TO_ID).find(k => SLUG_TO_ID[k] === m.id);
        if (slug && liveMetadata && liveMetadata[slug]) {
            return {
                ...m,
                accuracy: liveMetadata[slug].accuracy,
                hospitalsUsing: liveMetadata[slug].hospitalsUsing,
                version: liveMetadata[slug].version
            };
        }
        return m;
    }).filter(m => {
        const matchCat = category === 'All' || m.category === category;
        const matchQ = m.name.toLowerCase().includes(search.toLowerCase()) ||
            m.disease.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchQ;
    });

    return (
        <div className="models-page">
            <section className="section">
                <div className="container">
                    {/* Header */}
                    <motion.div {...fade(0)} className="models-header">
                        <div>
                            <span className="mono-tag">// model_library</span>
                            <h1 style={{ marginTop: '0.75rem' }}>Disease Model Library</h1>
                            <p style={{ marginTop: '0.5rem', maxWidth: 520 }}>
                                Six federated ML models for rare disease detection, trained collaboratively across India's public hospital network.
                            </p>
                        </div>
                        <div className="models-header-stats">
                            <div className="header-stat">
                                <span className="header-stat-n">{mockModels.length}</span>
                                <span className="header-stat-l">Models</span>
                            </div>
                            <div className="header-stat">
                                <span className="header-stat-n">60+</span>
                                <span className="header-stat-l">Hospitals</span>
                            </div>
                            <div className="header-stat">
                                <span className="header-stat-n">94%</span>
                                <span className="header-stat-l">Peak Accuracy</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Search + Filter */}
                    <motion.div {...fade(0.1)} className="models-controls">
                        <div className="search-box">
                            <Search size={16} className="search-icon" />
                            <input
                                className="search-input"
                                placeholder="Search disease or model name..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>
                        <div className="category-tabs">
                            {categories.map(c => (
                                <button
                                    key={c}
                                    className={`cat-tab ${category === c ? 'active' : ''}`}
                                    onClick={() => setCategory(c)}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Grid */}
                    <div className="models-grid">
                        {filtered.length === 0 ? (
                            <div className="no-results">
                                <p>No models found for "{search}"</p>
                            </div>
                        ) : (
                            filtered.map((model, i) => (
                                <motion.div key={model.id} className="model-card card" {...fade(0.05 * i)}>
                                    {/* Top row */}
                                    <div className="model-card-top">
                                        <div className="model-tags">
                                            {model.tags.map(t => (
                                                <span key={t} className="badge badge-green">{t}</span>
                                            ))}
                                        </div>
                                        <span className="mono-tag">v{model.version}</span>
                                    </div>

                                    <h3 className="model-name">{model.name}</h3>
                                    <p className="model-disease">{model.disease}</p>
                                    <p className="model-desc">{model.description.slice(0, 110)}…</p>

                                    {/* Accuracy bar */}
                                    <div className="model-accuracy">
                                        <div className="accuracy-label">
                                            <span className="mono-tag">Accuracy</span>
                                            <span className="accuracy-val">{model.accuracy}%</span>
                                        </div>
                                        <div className="progress-track">
                                            <div className="progress-fill" style={{ width: `${model.accuracy}%` }} />
                                        </div>
                                    </div>

                                    {/* Meta */}
                                    <div className="model-meta">
                                        <span className="meta-item">
                                            <Hospital size={13} /> {model.hospitalsUsing} hospitals
                                        </span>
                                        <span className="meta-item">
                                            <Star size={13} /> {model.reviews.length} reviews
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="model-actions">
                                        <Link to={`/models/${model.id}`} className="btn btn-secondary btn-sm">
                                            Details <ArrowRight size={13} />
                                        </Link>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            style={{ marginLeft: 8 }}
                                            onClick={async () => {
                                                try {
                                                    const res = await modelsAPI.download(model.id);
                                                    const url = URL.createObjectURL(res.data);
                                                    const a = document.createElement('a');
                                                    a.href = url;
                                                    a.download = `${model.name.replace(/\s+/g, '_')}_model.pt`;
                                                    a.click();
                                                    URL.revokeObjectURL(url);
                                                } catch (e) {
                                                    console.error("Download failed", e);
                                                    alert("Failed to download model file.");
                                                }
                                            }}
                                        >
                                            <Download size={13} /> Download Model
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
