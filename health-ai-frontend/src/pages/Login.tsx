import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, ArrowRight, Dna, Shield, Network } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) { setError('Please fill in all fields.'); return; }
        setLoading(true);
        setError('');
        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Login failed');
            }
            login(data.token, data.user);
            navigate('/models');
        } catch (err: any) {
            setError(err.message || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-visual">
                <div className="auth-visual-content">
                    <div className="auth-badge"><span className="badge badge-green">Federated Learning</span></div>
                    <h1 className="auth-visual-title">Train Smarter.<br />Share Nothing.</h1>
                    <p className="auth-visual-desc">
                        Join India's collaborative hospital network. AI that improves with every hospital — without ever touching patient records.
                    </p>
                    <div className="auth-features">
                        {[
                            { icon: <Shield size={16} />, label: 'Zero Data Exposure' },
                            { icon: <Network size={16} />, label: '60+ Hospital Network' },
                            { icon: <Dna size={16} />, label: '6 Rare Disease Models' },
                        ].map((f, i) => (
                            <motion.div key={i} className="auth-feature-item"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.15 }}>
                                <span className="auth-feature-icon">{f.icon}</span>
                                <span>{f.label}</span>
                            </motion.div>
                        ))}
                    </div>
                    {/* Animated network nodes */}
                    <div className="auth-nodes" aria-hidden>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`node node-${i}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Panel — Form */}
            <motion.div className="auth-form-panel"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}>

                <div className="auth-form-inner">
                    <Link to="/" className="auth-logo">
                        <div className="auth-logo-icon"><Activity size={18} /></div>
                        <span><span style={{ color: 'var(--accent-green)' }}>Fed</span>Health<span style={{ color: 'var(--accent-amber)' }}>AI</span></span>
                    </Link>

                    <div className="auth-header">
                        <h2>Welcome back</h2>
                        <p>Sign in to your hospital account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input className="form-input" type="email" placeholder="doctor@hospital.gov.in"
                                value={email} onChange={e => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <div className="input-wrapper">
                                <input className="form-input" type={showPwd ? 'text' : 'password'}
                                    placeholder="••••••••" value={password}
                                    onChange={e => setPassword(e.target.value)} />
                                <button type="button" className="eye-btn" onClick={() => setShowPwd(!showPwd)}>
                                    {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : <><span>Sign In</span> <ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Don't have an account? <Link to="/signup">Create one</Link>
                    </p>

                    <p className="auth-demo-note mono-tag">
                        Demo: use any email / password to log in
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
