import React, { useState } from 'react';
import { LayoutDashboard, MessageCircle, Users, Activity, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Templates from './Templates';

const ClientHome = () => {
    const [metrics, setMetrics] = useState({ totalSent: 0, deliveryRate: 0, activeCampaigns: 0 });
    const [campaigns, setCampaigns] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
                // Fetch campaigns
                const campRes = await axios.get(`${apiBase}/campaigns`);
                const allCampaigns = campRes.data.data || [];

                setCampaigns(allCampaigns);

                // Calculate mock metrics based on actual campaigns until we build a dedicated analytics route
                const running = allCampaigns.filter(c => c.status === 'RUNNING').length;
                const totalMsg = allCampaigns.length * 150; // Mock calculation for UI purposes

                setMetrics({
                    totalSent: totalMsg,
                    deliveryRate: allCampaigns.length > 0 ? 98.2 : 0,
                    activeCampaigns: running
                });
            } catch (err) {
                console.error('Failed to load dashboard data', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) return <div style={{ color: 'var(--text-secondary)' }}>Loading overview...</div>;

    return (
        <div>
            <h2 className="gradient-text" style={{ fontSize: '28px', marginBottom: '32px' }}>Workspace Overview</h2>

            <div className="grid-3" style={{ marginBottom: '40px' }}>
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Total Messages Sent</p>
                    <h3 style={{ fontSize: '32px' }}>{metrics.totalSent.toLocaleString()}</h3>
                </div>
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Delivery Rate</p>
                    <h3 style={{ fontSize: '32px', color: 'var(--success)' }}>{metrics.deliveryRate}%</h3>
                </div>
                <div className="glass-panel" style={{ padding: '24px' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>Active Campaigns</p>
                    <h3 style={{ fontSize: '32px', color: 'var(--accent-secondary)' }}>{metrics.activeCampaigns}</h3>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '32px' }}>
                <div className="flex-between" style={{ marginBottom: '24px' }}>
                    <h3>Recent Campaigns</h3>
                    <button className="btn-primary" style={{ padding: '8px 16px' }}>New Campaign</button>
                </div>
                {campaigns.length === 0 ? (
                    <div style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>No campaigns created yet.</div>
                ) : (
                    <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Name</th>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Status</th>
                                <th style={{ padding: '16px 8px', color: 'var(--text-secondary)' }}>Scheduled/Sent At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map(camp => (
                                <tr key={camp._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td style={{ padding: '16px 8px' }}>{camp.name}</td>
                                    <td style={{ padding: '16px 8px' }}>
                                        <span style={{
                                            color: camp.status === 'COMPLETED' ? 'var(--success)' :
                                                camp.status === 'RUNNING' ? 'var(--accent-secondary)' :
                                                    'var(--text-secondary)'
                                        }}>
                                            {camp.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '16px 8px' }}>{new Date(camp.scheduledAt || camp.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

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
