import { useState, useEffect } from 'react';
import axios from 'axios';

interface User {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const url = 'http://localhost:4000';

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`);
            if (response.data.success) {
                setUsers(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            // Show sample data if backend not available
            setUsers([
                {
                    _id: '1',
                    name: 'John Doe',
                    email: 'john@example.com',
                    isAdmin: false,
                },
                {
                    _id: '2',
                    name: 'Jane Smith',
                    email: 'jane@example.com',
                    isAdmin: false,
                },
                {
                    _id: '3',
                    name: 'Admin User',
                    email: 'admin@tomato.com',
                    isAdmin: true,
                },
                {
                    _id: '4',
                    name: 'Rahul Kumar',
                    email: 'rahul@example.com',
                    isAdmin: false,
                },
                {
                    _id: '5',
                    name: 'Priya Sharma',
                    email: 'priya@example.com',
                    isAdmin: false,
                },
            ]);
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
                                            <span className="status-badge delivered">Active</span>
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
