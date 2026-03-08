import { Link } from 'react-router-dom';
import { Activity, Github, Twitter, Mail, Heart } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Brand */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <div className="footer-logo-icon"><Activity size={16} /></div>
                            <span className="footer-logo-text"><span style={{ color: 'var(--accent-green)' }}>Fed</span>Health<span style={{ color: 'var(--accent-amber)' }}>AI</span></span>
                        </div>
                        <p className="footer-tagline">
                            Collaborative AI for rare disease detection.<br />Hospitals contribute. Patients benefit. Data stays private.
                        </p>
                        <div className="footer-social">
                            <a href="#" className="social-btn"><Github size={16} /></a>
                            <a href="#" className="social-btn"><Twitter size={16} /></a>
                            <a href="#" className="social-btn"><Mail size={16} /></a>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="footer-col">
                        <h5>Platform</h5>
                        <Link to="/">Home</Link>
                        <Link to="/about">About</Link>
                        <Link to="/models">Model Library</Link>
                        <Link to="/local">Local Client</Link>
                    </div>

                    <div className="footer-col">
                        <h5>Resources</h5>
                        <a href="#">Documentation</a>
                        <a href="#">API Reference</a>
                        <a href="#">Federated Learning Guide</a>
                        <a href="#">Privacy Standards</a>
                    </div>

                    <div className="footer-col">
                        <h5>Organization</h5>
                        <a href="#">Ministry of Health (GoI)</a>
                        <a href="#">NHA Partnership</a>
                        <a href="#">Contact Us</a>
                        <a href="#">Privacy Policy</a>
                    </div>
                </div>

                <div className="footer-bottom">
                    <span className="mono-tag">© 2026 FedHealthAI — Government Health Initiative</span>
                    <span className="footer-made">Made with <Heart size={12} style={{ color: 'var(--accent-amber)', display: 'inline' }} /> for public health</span>
                </div>
            </div>

            <style>{`
        .footer {
          background: var(--bg-surface);
          border-top: 1px solid var(--border-subtle);
          padding: 4rem 0 2rem;
          margin-top: 4rem;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        .footer-brand {}
        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 1rem;
        }
        .footer-logo-icon {
          width: 30px; height: 30px;
          background: var(--accent-green);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          color: var(--bg-base);
        }
        .footer-logo-text {
          font-family: var(--font-mono);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .footer-tagline {
          font-size: 0.85rem;
          color: var(--text-muted);
          line-height: 1.7;
          margin-bottom: 1.25rem;
        }
        .footer-social { display: flex; gap: 0.5rem; }
        .social-btn {
          width: 34px; height: 34px;
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .social-btn:hover {
          border-color: var(--accent-green);
          color: var(--accent-green);
          background: var(--accent-green-glow);
        }
        .footer-col { display: flex; flex-direction: column; gap: 0.6rem; }
        .footer-col h5 {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.25rem;
        }
        .footer-col a {
          font-size: 0.88rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .footer-col a:hover { color: var(--accent-green); }
        .footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 2rem;
          border-top: 1px solid var(--border-subtle);
        }
        .footer-made { font-size: 0.82rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.3rem; }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>
        </footer>
    );
}
