import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { listUsers } from '../../services/admin/admin';

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    isVerified: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await listUsers();
            if (response.success) {
                setUsers(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading users...</div>;
    }

    return (
        <div>
            <div className="table-card">
                <div className="table-header">
                    <h2 className="table-title">All Users</h2>
                    <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={fetchUsers}>
                            🔄 Refresh
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px' }}>
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <div
                                                    style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '50%',
                                                        background: user.isAdmin
                                                            ? 'linear-gradient(135deg, var(--primary), var(--primary-dark))'
                                                            : 'var(--gray-200)',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        color: user.isAdmin ? 'white' : 'var(--gray-600)',
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: 600 }}>{user.name}</span>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span
                                                className={`status-badge ${user.isAdmin ? 'processing' : 'pending'}`}
                                            >
                                                {user.isAdmin ? '👑 Admin' : '👤 User'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.isVerified ? 'delivered' : 'cancelled'}`}>
                                                {user.isVerified ? '✅ Verified' : '❌ Not Verified'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Users;
