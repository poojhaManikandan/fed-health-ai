import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, Menu, X, ChevronRight, User, LogOut } from 'lucide-react';
import './Navbar.css';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Models', href: '/models' },
    { label: 'Local Client', href: '/local' },
];

export default function Navbar() {
    const { isAuthenticated, user, logout } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-inner container">
                {/* Logo */}
                <Link to="/" className="navbar-logo">
                    <div className="navbar-logo-icon">
                        <Activity size={18} strokeWidth={2.5} />
                    </div>
                    <span className="navbar-logo-text">
                        <span className="logo-prefix">Fed</span>Health<span className="logo-ai">AI</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <ul className="navbar-links">
                    {navLinks.map(link => (
                        <li key={link.href}>
                            <Link
                                to={link.href}
                                className={`navbar-link ${location.pathname === link.href ? 'active' : ''}`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Desktop Auth */}
                <div className="navbar-auth">
                    {isAuthenticated ? (
                        <div className="navbar-user">
                            <div className="user-avatar">
                                <User size={14} />
                            </div>
                            <span className="user-name">{user?.name.split(' ')[0]}</span>
                            <button className="btn btn-sm btn-secondary" onClick={handleLogout}>
                                <LogOut size={13} /> Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
                            <Link to="/signup" className="btn btn-sm btn-primary">
                                Get Started <ChevronRight size={14} />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="navbar-mobile">
                    {navLinks.map(link => (
                        <Link
                            key={link.href}
                            to={link.href}
                            className={`navbar-mobile-link ${location.pathname === link.href ? 'active' : ''}`}
                            onClick={() => setMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="navbar-mobile-auth">
                        {isAuthenticated ? (
                            <button className="btn btn-secondary" onClick={handleLogout}>
                                <LogOut size={14} /> Logout
                            </button>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-secondary" onClick={() => setMenuOpen(false)}>Login</Link>
                                <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Get Started</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}
