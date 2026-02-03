import { useState } from 'react';
import {
    Bell,
    Lock,
    Shield,
    Globe,
    User,
} from 'lucide-react';

const Settings = () => {
    const [notifications, setNotifications] = useState({
        orders: true,
        users: true,
        emails: false,
        system: true
    });

    return (
        <div className="settings-page">
            <div className="form-card" style={{ maxWidth: '800px', width: '100%' }}>
                <h2 className="form-title">Dashboard Settings</h2>

                <section className="settings-section" style={{ marginBottom: '32px' }}>
                    <h3 className="nav-section-title" style={{ padding: '0', marginBottom: '16px' }}>General Preferences</h3>

                    <div className="notification-list" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                            { id: 'orders', label: 'Order Notifications', desc: 'Get alerts for new incoming orders', icon: Bell },
                            { id: 'users', label: 'New User Alerts', desc: 'Notify when new customers register', icon: User },
                            { id: 'system', label: 'System Updates', desc: 'Stay updated with platform maintenance', icon: Globe }
                        ].map((item) => (
                            <div key={item.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '16px',
                                background: 'var(--gray-50)',
                                borderRadius: '12px',
                                border: '1px solid var(--gray-100)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ color: 'var(--primary)', background: 'var(--primary-bg)', padding: '10px', borderRadius: '10px' }}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '600', color: 'var(--gray-900)' }}>{item.label}</p>
                                        <p style={{ fontSize: '12px', color: 'var(--gray-500)' }}>{item.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setNotifications({ ...notifications, [item.id]: !notifications[item.id as keyof typeof notifications] })}
                                    style={{
                                        width: '44px',
                                        height: '24px',
                                        borderRadius: '12px',
                                        background: notifications[item.id as keyof typeof notifications] ? 'var(--primary)' : 'var(--gray-300)',
                                        border: 'none',
                                        position: 'relative',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    <div style={{
                                        width: '18px',
                                        height: '18px',
                                        borderRadius: '50%',
                                        background: 'white',
                                        position: 'absolute',
                                        top: '3px',
                                        left: notifications[item.id as keyof typeof notifications] ? '23px' : '3px',
                                        transition: 'all 0.3s'
                                    }} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="settings-section" style={{ marginBottom: '32px' }}>
                    <h3 className="nav-section-title" style={{ padding: '0', marginBottom: '16px' }}>Account & Security</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div style={{ padding: '20px', background: 'var(--gray-50)', borderRadius: '16px', border: '1px solid var(--gray-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <Lock size={20} color="var(--primary)" />
                                <span style={{ fontWeight: '600' }}>Password</span>
                            </div>
                            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '12px' }}>Change Password</button>
                        </div>
                        <div style={{ padding: '20px', background: 'var(--gray-50)', borderRadius: '16px', border: '1px solid var(--gray-100)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                                <Shield size={20} color="var(--primary)" />
                                <span style={{ fontWeight: '600' }}>2FA Auth</span>
                            </div>
                            <button className="btn btn-secondary" style={{ width: '100%', fontSize: '12px' }}>Enable 2FA</button>
                        </div>
                    </div>
                </section>

                <section className="settings-section">
                    <h3 className="nav-section-title" style={{ padding: '0', marginBottom: '16px' }}>Admin Content Management</h3>
                    <div style={{
                        padding: '24px',
                        background: 'linear-gradient(135deg, var(--white) 0%, var(--primary-bg) 100%)',
                        borderRadius: '16px',
                        border: '1px solid var(--primary-bg)',
                        textAlign: 'center'
                    }}>
                        <p style={{ color: 'var(--gray-600)', fontSize: '14px', marginBottom: '16px' }}>
                            You are currently managing the Tomato. Admin Dashboard.
                            All changes made here affect the live application state.
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
                            <div className="stat-badge" style={{ padding: '8px 16px', borderRadius: '50px', background: 'white', border: '1px solid var(--gray-100)', fontSize: '12px', fontWeight: '600' }}>
                                LIVE PRODUCTION
                            </div>
                            <div className="stat-badge" style={{ padding: '8px 16px', borderRadius: '50px', background: 'white', border: '1px solid var(--gray-100)', fontSize: '12px', fontWeight: '600' }}>
                                VERSION 2.1.0
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Settings;
