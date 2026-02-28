import React, { useState } from 'react';
import { useAuth } from '../../context/authContext';
import { Lock, Mail } from 'lucide-react';

const Login = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const res = await login(formData.email, formData.password);
        if (!res.success) {
            setError(res.error);
        }
        setIsLoading(false);
    };

    return (
        <div className="flex-center" style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Background glowing orbs for that premium feel */}
            <div style={{
                position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw',
                background: 'var(--accent-glow)', filter: 'blur(120px)', borderRadius: '50%', zIndex: -1
            }} />
            <div style={{
                position: 'absolute', bottom: '-10%', right: '-10%', width: '40vw', height: '40vw',
                background: 'rgba(14, 165, 233, 0.2)', filter: 'blur(100px)', borderRadius: '50%', zIndex: -1
            }} />

            <div className="glass-panel" style={{ width: '100%', maxWidth: '420px', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>HELA</h1>
                    <p style={{ fontSize: '14px' }}>Sign in to your workspace</p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)',
                        color: 'var(--danger)', padding: '12px', borderRadius: 'var(--radius-sm)',
                        marginBottom: '20px', fontSize: '14px', textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-secondary)' }} />
                        <input
                            type="email"
                            className="input-field"
                            placeholder="Email address"
                            style={{ paddingLeft: '40px' }}
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-secondary)' }} />
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Password"
                            style={{ paddingLeft: '40px' }}
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading} style={{ marginTop: '8px' }}>
                        {isLoading ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
