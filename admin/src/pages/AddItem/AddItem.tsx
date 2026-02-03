import { useState } from 'react';

import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { addFood } from '../../services/admin/admin';

const AddItem = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
    });
    const [image, setImage] = useState<File | null>(null);

    const categories = [
        'Salad',
        'Rolls',
        'Deserts',
        'Sandwich',
        'Cake',
        'Pure Veg',
        'Pasta',
        'Noodles',
        'Pizza',
        'Main Course',
        'Rice',
        'Dessert',
        'Beverages',
    ];

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!image) {
            toast.error('Please select an image');
            return;
        }

        setLoading(true);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('category', formData.category);
        data.append('image', image);

        try {
            const response = await addFood(data);
            if (response.success) {
                toast.success('Food item added successfully!');
                navigate('/food-list');
            } else {
                toast.error(response.message || 'Failed to add item');
            }
        } catch (error) {
            console.error('Error adding food:', error);
            toast.error('Failed to add item. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form className="form-card" onSubmit={handleSubmit}>
                <h2 className="form-title">Add New Food Item</h2>

                <div className="form-group">
                    <label className="form-label">Upload Image</label>
                    <label className="image-upload">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                        />
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="image-preview" />
                        ) : (
                            <>
                                <div className="image-upload-icon">📤</div>
                                <p className="image-upload-text">
                                    <span>Click to upload</span> or drag and drop
                                </p>
                            </>
                        )}
                    </label>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="name">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input"
                        placeholder="Enter food name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-input"
                        placeholder="Enter food description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="category">
                            Category
                        </label>
                        <select
                            id="category"
                            name="category"
                            className="form-input form-select"
                            value={formData.category}
                            onChange={handleInputChange}
                            required
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="price">
                            Price (₹)
                        </label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input"
                            placeholder="0"
                            min="0"
                            value={formData.price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate('/food-list')}
                    >
                        Cancel
                    </button>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? '⏳ Adding...' : '➕ Add Item'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddItem;
