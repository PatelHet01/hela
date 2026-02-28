import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, Users, Activity, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Templates from './Templates';

const ClientHome = () => (
    <div>
        <h2 className="gradient-text" style={{ fontSize: '28px', marginBottom: '32px' }}>Workspace Overview</h2>

        <div className="grid-3" style={{ marginBottom: '40px' }}>
            <div className="glass-panel" style={{ padding: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Messages Sent</p>
                <h3 style={{ fontSize: '32px' }}>12,450</h3>
            </div>
            <div className="glass-panel" style={{ padding: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Delivery Rate</p>
                <h3 style={{ fontSize: '32px', color: 'var(--success)' }}>98.2%</h3>
            </div>
            <div className="glass-panel" style={{ padding: '24px' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Active Campaigns</p>
                <h3 style={{ fontSize: '32px', color: 'var(--accent-secondary)' }}>3</h3>
            </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
            <div className="flex-between" style={{ marginBottom: '24px' }}>
                <h3>Recent Campaigns</h3>
                <button className="btn-primary" style={{ padding: '8px 16px' }}>New Campaign</button>
            </div>
            <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                        <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Name</th>
                        <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Status</th>
                        <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Sent</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                        <td style={{ padding: '16px 8px' }}>Summer Promo 2026</td>
                        <td style={{ padding: '16px 8px' }}><span style={{ color: 'var(--accent-secondary)' }}>Running</span></td>
                        <td style={{ padding: '16px 8px' }}>4,200</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
);

const ClientDashboard = () => {
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState('home');

    const renderContent = () => {
        switch (activeTab) {
            case 'home': return <ClientHome />;
            case 'templates': return <Templates />;
            default: return <ClientHome />;
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
            {/* Sidebar */}
            <div className="glass-panel" style={{ width: '260px', borderRadius: '0', borderLeft: 'none', borderTop: 'none', borderBottom: 'none', padding: '32px 24px', display: 'flex', flexDirection: 'column' }}>
                <h1 className="gradient-text" style={{ fontSize: '28px', marginBottom: '40px' }}>HELA</h1>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                    <button
                        onClick={() => setActiveTab('home')}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'home' ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: activeTab === 'home' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'var(--transition)' }}
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button
                        onClick={() => setActiveTab('templates')}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: activeTab === 'templates' ? 'rgba(79, 70, 229, 0.1)' : 'transparent', color: activeTab === 'templates' ? 'var(--accent-primary)' : 'var(--text-secondary)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'var(--transition)' }}
                    >
                        <MessageCircle size={20} /> Meta Templates
                    </button>
                    <button
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: 'var(--text-secondary)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', transition: 'var(--transition)' }}
                    >
                        <Users size={20} /> Contacts
                    </button>
                </nav>

                <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'transparent', color: 'var(--danger)', border: 'none', cursor: 'pointer', marginTop: 'auto' }}>
                    <LogOut size={20} /> Sign Out
                </button>
            </div>

            {/* Main View */}
            <div style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                {renderContent()}
            </div>
        </div>
    );
};

export default ClientDashboard;
