import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

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

    const url = 'http://localhost:4000';

    const fetchFoods = async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setFoods(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching foods:', error);
            // Show sample data if backend not available
            setFoods([
                {
                    _id: '1',
                    name: 'Margherita Pizza',
                    description: 'Classic pizza with fresh mozzarella and basil',
                    price: 299,
                    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=100',
                    category: 'Pizza',
                },
                {
                    _id: '2',
                    name: 'Butter Chicken',
                    description: 'Creamy tomato-based curry with tender chicken',
                    price: 349,
                    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=100',
                    category: 'Main Course',
                },
                {
                    _id: '3',
                    name: 'Veg Biryani',
                    description: 'Fragrant basmati rice with mixed vegetables',
                    price: 199,
                    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=100',
                    category: 'Rice',
                },
                {
                    _id: '4',
                    name: 'Chocolate Brownie',
                    description: 'Rich and fudgy chocolate brownie',
                    price: 129,
                    image: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=100',
                    category: 'Dessert',
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    const deleteFood = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        try {
            const response = await axios.post(`${url}/api/food/remove`, { id });
            if (response.data.success) {
                toast.success('Item deleted successfully!');
                fetchFoods();
            }
        } catch (error) {
            console.error('Error deleting food:', error);
            toast.error('Failed to delete item');
            // Remove locally for demo
            setFoods(foods.filter(food => food._id !== id));
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
                                                src={food.image.startsWith('http') ? food.image : `${url}/images/${food.image}`}
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
