import React from 'react';
import { useAuth } from '../../context/AuthenticationContext';
import { Users, MessageSquareText, Activity, LogOut } from 'lucide-react';

const AdminHome = () => {
    const { user, logout } = useAuth();

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <div className="flex-between" style={{ marginBottom: '40px' }}>
                <div>
                    <h1 className="gradient-text" style={{ fontSize: '32px', marginBottom: '8px' }}>Super Admin</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Welcome back, {user?.name}</p>
                </div>
                <button onClick={logout} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid var(--glass-border)' }}>
                    <LogOut size={16} /> Logout
                </button>
            </div>

            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(79, 70, 229, 0.1)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-primary)' }}>
                            <Users size={24} />
                        </div>
                        <h3 style={{ color: 'var(--text-secondary)' }}>Total Workspaces</h3>
                    </div>
                    <h2 style={{ fontSize: '36px' }}>12</h2>
                    <p style={{ fontSize: '14px', color: 'var(--success)', marginTop: '8px' }}>+2 this week</p>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(14, 165, 233, 0.1)', borderRadius: 'var(--radius-sm)', color: 'var(--accent-secondary)' }}>
                            <MessageSquareText size={24} />
                        </div>
                        <h3 style={{ color: 'var(--text-secondary)' }}>Messages Sent</h3>
                    </div>
                    <h2 style={{ fontSize: '36px' }}>1.2M</h2>
                    <p style={{ fontSize: '14px', color: 'var(--success)', marginTop: '8px' }}>Global Volume</p>
                </div>

                <div className="glass-panel" style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ padding: '10px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: 'var(--radius-sm)', color: 'var(--success)' }}>
                            <Activity size={24} />
                        </div>
                        <h3 style={{ color: 'var(--text-secondary)' }}>API Health</h3>
                    </div>
                    <h2 style={{ fontSize: '36px', color: 'var(--success)' }}>99.9%</h2>
                    <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '8px' }}>All systems operational</p>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
                <h2 style={{ marginBottom: '24px' }}>Recent Workspaces</h2>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Workspace Name</th>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Owner Email</th>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Status</th>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)', fontWeight: 500 }}>Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3].map(i => (
                                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '16px 8px' }}>Acme Corp {i}</td>
                                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>founder{i}@acme.com</td>
                                    <td style={{ padding: '16px 8px' }}>
                                        <span style={{ padding: '4px 12px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: '100px', fontSize: '12px' }}>Active</span>
                                    </td>
                                    <td style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Just now</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
