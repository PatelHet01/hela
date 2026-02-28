import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RefreshCw, Image as ImageIcon, FileText, Play } from 'lucide-react';

const TemplateCard = ({ template }) => {
    // Utility to render the rich components into a visual preview
    const renderPreview = () => {
        if (!template.components) return <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>No preview available</div>;

        const header = template.components.find(c => c.type === 'HEADER');
        const body = template.components.find(c => c.type === 'BODY');
        const footer = template.components.find(c => c.type === 'FOOTER');
        const buttons = template.components.find(c => c.type === 'BUTTONS');

        return (
            <div style={{ background: '#dcf8c6', borderRadius: '12px', padding: '12px', color: '#111', maxWidth: '300px', margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                {header && header.format === 'IMAGE' && (
                    <div style={{ height: '140px', background: '#ccc', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ImageIcon size={32} color="#666" />
                    </div>
                )}
                {header && header.format === 'VIDEO' && (
                    <div style={{ height: '140px', background: '#ccc', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Play size={32} color="#666" />
                    </div>
                )}
                {header && header.format === 'DOCUMENT' && (
                    <div style={{ height: '60px', background: '#ccc', borderRadius: '8px', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FileText size={24} color="#666" />
                        <span style={{ marginLeft: '8px', fontWeight: 500 }}>Document</span>
                    </div>
                )}
                {header && header.format === 'TEXT' && (
                    <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '15px' }}>{header.text}</div>
                )}

                {body && (
                    <div style={{ fontSize: '14px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>
                        {body.text}
                    </div>
                )}

                {footer && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '8px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '4px' }}>
                        {footer.text}
                    </div>
                )}

                {buttons && buttons.buttons.length > 0 && (
                    <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {buttons.buttons.map((btn, idx) => (
                            <div key={idx} style={{ background: 'white', padding: '8px', textAlign: 'center', borderRadius: '8px', color: '#007bff', fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}>
                                {btn.text}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="glass-panel" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '24px', flex: 1 }}>
                <div className="flex-between" style={{ marginBottom: '16px' }}>
                    <span style={{
                        padding: '4px 12px',
                        borderRadius: '100px',
                        fontSize: '12px',
                        fontWeight: 600,
                        backgroundColor: template.status === 'APPROVED' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                        color: template.status === 'APPROVED' ? 'var(--success)' : 'var(--warning)'
                    }}>
                        {template.status}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '4px' }}>
                        {template.category}
                    </span>
                </div>

                <h3 style={{ marginBottom: '4px', fontSize: '18px' }}>{template.name}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Language: {template.language}</p>

                {/* Visual Preview replicating WhatsApp's UI */}
                <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: '16px', padding: '16px', border: '1px dashed var(--glass-border)' }}>
                    {renderPreview()}
                </div>
            </div>
        </div>
    );
};

const Templates = () => {
    const [templates, setTemplates] = useState([]);
    const [isSyncing, setIsSyncing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchTemplates = async () => {
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
            const res = await axios.get(`${apiBase}/templates`);
            setTemplates(res.data.data || []);
            setError('');
        } catch (err) {
            console.error('Fetch templates error:', err);
            setError('Failed to load templates.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
            await axios.post(`${apiBase}/templates/sync`);
            await fetchTemplates();
        } catch (err) {
            console.error('Sync templates error:', err);
            setError(err.response?.data?.error || 'Failed to sync. Ensure Meta API credentials are valid.');
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div>
            <div className="flex-between" style={{ marginBottom: '32px' }}>
                <div>
                    <h2 className="gradient-text" style={{ fontSize: '28px', marginBottom: '8px' }}>Meta Templates</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>View and sync your rich media templates from WhatsApp Manager.</p>
                </div>
                <button onClick={handleSync} disabled={isSyncing} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={18} className={isSyncing ? "spin-animation" : ""} />
                    {isSyncing ? 'Syncing...' : 'Sync from Meta'}
                </button>
            </div>

            {error && <div style={{ color: 'var(--danger)', marginBottom: '20px' }}>{error}</div>}

            {isLoading ? (
                <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>Loading templates...</div>
            ) : templates.length === 0 ? (
                <div style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px', background: 'var(--glass-bg)', borderRadius: 'var(--radius-lg)' }}>
                    No templates found. Click "Sync from Meta" to pull your approved templates.
                </div>
            ) : (
                <div className="grid-3">
                    {templates.map(tmpl => (
                        <TemplateCard key={tmpl._id} template={tmpl} />
                    ))}
                </div>
            )}

            {/* Adding the spin animation class dynamically */}
            <style>{`
                @keyframes spin { 100% { transform: rotate(360deg); } }
                .spin-animation { animation: spin 1s linear infinite; }
            `}</style>
        </div>
    );
};

export default Templates;
