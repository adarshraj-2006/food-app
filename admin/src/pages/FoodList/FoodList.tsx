import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { listFood, removeFood } from '../../services/admin/admin';
import { imageUrl } from '../../lib/api/api';

interface FoodItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

const FoodList = () => {
    const [foods, setFoods] = useState<FoodItem[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchFoods = async () => {
        try {
            const response = await listFood();
            if (response.success) {
                setFoods(response.data || []);
            }
        } catch (error) {
            console.error('Error fetching foods:', error);
            toast.error("Error fetching foods");

        } finally {
            setLoading(false);
        }
    };

    const deleteFood = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await removeFood(id);
            if (response.success) {
                toast.success('Item deleted successfully!');
                fetchFoods();
            }
        } catch (error) {
            console.error('Error deleting food:', error);
            toast.error('Failed to delete item');
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Loading food items...</div>;
    }

    return (
        <div>
            <div className="table-card">
                <div className="table-header">
                    <h2 className="table-title">All Food Items</h2>
                    <div className="table-actions">
                        <button className="btn btn-secondary btn-sm" onClick={fetchFoods}>
                            🔄 Refresh
                        </button>
                        <a href="/add-item" className="btn btn-primary btn-sm">
                            ➕ Add New Item
                        </a>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foods.length === 0 ? (
                                <tr>
                                    <td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>
                                        No food items found. <a href="/add-item" style={{ color: 'var(--primary)' }}>Add your first item</a>
                                    </td>
                                </tr>
                            ) : (
                                foods.map((food) => (
                                    <tr key={food._id}>
                                        <td>
                                            <img
                                                src={`${imageUrl}/${food.image}`}
                                                alt={food.name}
                                                className="food-image"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/60x60?text=🍔';
                                                }}
                                            />
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 600 }}>{food.name}</span>
                                        </td>
                                        <td>
                                            <span className="category-badge">{food.category}</span>
                                        </td>
                                        <td style={{ maxWidth: '300px' }}>
                                            {food.description.length > 60
                                                ? `${food.description.slice(0, 60)}...`
                                                : food.description}
                                        </td>
                                        <td>
                                            <span className="price">₹{food.price}</span>
                                        </td>
                                        <td>
                                            <div className="action-icons">
                                                <button className="action-icon delete" onClick={() => deleteFood(food._id)}>
                                                    🗑️
                                                </button>
                                            </div>
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

export default FoodList;
