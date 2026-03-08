import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Activity, Eye, EyeOff, ArrowRight, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Signup() {
    const [form, setForm] = useState({ name: '', hospital: '', email: '', password: '', confirm: '' });
    const [showPwd, setShowPwd] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(prev => ({ ...prev, [k]: e.target.value }));

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.hospital || !form.email || !form.password) {
            setError('Please fill in all fields.'); return;
        }
        if (form.password !== form.confirm) {
            setError('Passwords do not match.'); return;
        }
        if (form.password.length < 8) {
            setError('Password must be at least 8 characters.'); return;
        }
        setLoading(true); setError('');
        try {
            const response = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: form.name,
                    hospital: form.hospital,
                    email: form.email,
                    password: form.password
                }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.detail || 'Registration failed');
            }
            login(data.token, data.user);
            navigate('/models');
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const perks = [
        'Download federated ML models for rare diseases',
        'Train locally — patient data never leaves your servers',
        'Contribute model updates to improve accuracy for all',
        'Access validation reports and audit logs',
    ];

    return (
        <div className="auth-page">
            {/* Left Panel */}
            <div className="auth-visual">
                <div className="auth-visual-content">
                    <div className="auth-badge"><span className="badge badge-amber">Hospital Registration</span></div>
                    <h1 className="auth-visual-title">Join the<br />Network Today.</h1>
                    <p className="auth-visual-desc">
                        Register your hospital to access the federated model library and start improving rare disease detection.
                    </p>
                    <div className="auth-perks">
                        {perks.map((p, i) => (
                            <motion.div key={i} className="auth-perk"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 + i * 0.12 }}>
                                <CheckCircle size={15} style={{ color: 'var(--accent-green)', flexShrink: 0 }} />
                                <span>{p}</span>
                            </motion.div>
                        ))}
                    </div>
                    <div className="auth-nodes" aria-hidden>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className={`node node-${i}`} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right — Form */}
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
                        <h2>Create account</h2>
                        <p>Register your hospital on the network</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input className="form-input" type="text" placeholder="Dr. Priya Sharma"
                                    value={form.name} onChange={set('name')} />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Hospital Name</label>
                                <input className="form-input" type="text" placeholder="KEM Hospital, Mumbai"
                                    value={form.hospital} onChange={set('hospital')} />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email Address</label>
                            <input className="form-input" type="email" placeholder="doctor@hospital.gov.in"
                                value={form.email} onChange={set('email')} />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <div className="input-wrapper">
                                    <input className="form-input" type={showPwd ? 'text' : 'password'}
                                        placeholder="Min. 8 characters" value={form.password} onChange={set('password')} />
                                    <button type="button" className="eye-btn" onClick={() => setShowPwd(!showPwd)}>
                                        {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input className="form-input" type="password" placeholder="Re-enter password"
                                    value={form.confirm} onChange={set('confirm')} />
                            </div>
                        </div>

                        {error && <p className="form-error">{error}</p>}

                        <button type="submit" className="btn btn-primary btn-lg auth-submit" disabled={loading}>
                            {loading ? <span className="btn-spinner" /> : <><span>Create Account</span><ArrowRight size={16} /></>}
                        </button>
                    </form>

                    <p className="auth-switch">
                        Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
