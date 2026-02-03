import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../context/StoreContext';
import { Plus, Trash2, LayoutGrid, List, Upload, X } from 'lucide-react';

const SellerMenuManagement = () => {
    const { url, food_list, fetchFoodList } = useStore();
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form state
    const [image, setImage] = useState<File | null>(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Salad"
    });

    const onChangeHandler = (event: any) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    }

    const onSubmitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", String(data.price));
        formData.append("category", data.category);
        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await axios.post(`${url}/api/food/add`, formData);
            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Salad"
                });
                setImage(null);
                setIsAddModalOpen(false);
                fetchFoodList(); // Refresh list
                alert("Food item added successfully!");
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Error adding food:", error);
            alert("Failed to add food item");
        }
    }

    const removeFood = async (foodId: string) => {
        if (!window.confirm("Are you sure you want to remove this item?")) return;

        try {
            const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
            if (response.data.success) {
                fetchFoodList();
                alert("Item removed successfully");
            } else {
                alert("Error removing item");
            }
        } catch (error) {
            console.error("Error removing food:", error);
        }
    }

    return (
        <div className="p-1 md:p-6 space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-neutral-900 dark:text-white">Menu Management</h1>
                    <p className="text-neutral-500 dark:text-neutral-400">Add, edit or remove dishes from your restaurant</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-neutral-400'}`}
                        >
                            <LayoutGrid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white dark:bg-neutral-700 shadow-sm text-orange-500' : 'text-neutral-400'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                    >
                        <Plus size={20} /> Add New Dish
                    </button>
                </div>
            </div>

            {/* Food Items List */}
            {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {food_list.map((item: any) => (
                        <div key={item._id} className="bg-white dark:bg-neutral-900 rounded-[24px] border border-neutral-100 dark:border-neutral-800 overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="relative aspect-video overflow-hidden">
                                <img
                                    src={item.image ? (item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`) : 'https://placehold.co/600x400?text=No+Image'}
                                    alt={item.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <button
                                    onClick={() => removeFood(item._id)}
                                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md flex items-center justify-center text-red-500 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500 hover:text-white"
                                >
                                    <Trash2 size={18} />
                                </button>
                                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-md rounded-lg text-xs font-bold text-neutral-600 dark:text-neutral-300 shadow-sm">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-black text-neutral-900 dark:text-white line-clamp-1">{item.name}</h3>
                                    <span className="text-xl font-black text-orange-500">₹{item.price}</span>
                                </div>
                                <p className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2 mb-4">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white dark:bg-neutral-900 rounded-[24px] border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-neutral-100 dark:border-neutral-800">
                                <th className="px-6 py-4 font-bold text-neutral-900 dark:text-white">Dish</th>
                                <th className="px-6 py-4 font-bold text-neutral-900 dark:text-white">Category</th>
                                <th className="px-6 py-4 font-bold text-neutral-900 dark:text-white">Price</th>
                                <th className="px-6 py-4 font-bold text-neutral-900 dark:text-white text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {food_list.map((item: any) => (
                                <tr key={item._id} className="border-b border-neutral-50 dark:border-neutral-800/50 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image ? (item.image.startsWith('http') ? item.image : `${url}/images/${item.image}`) : 'https://placehold.co/100x100?text=No+Image'}
                                                alt=""
                                                className="w-12 h-12 rounded-xl object-cover"
                                            />
                                            <span className="font-bold text-neutral-900 dark:text-white">{item.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-xs font-bold text-neutral-600 dark:text-neutral-300">
                                            {item.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-black">₹{item.price}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => removeFood(item._id)}
                                            className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Add Food Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
                    <div className="relative bg-white dark:bg-neutral-900 w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="flex items-center justify-between p-8 border-b border-neutral-100 dark:border-neutral-800">
                            <div>
                                <h3 className="text-2xl font-black text-neutral-900 dark:text-white">Add New Dish</h3>
                                <p className="text-neutral-500 dark:text-neutral-400">Fill in the details to list a new item</p>
                            </div>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={onSubmitHandler} className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Upload Image</label>
                                        <label htmlFor="image" className="relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed border-neutral-200 dark:border-neutral-700 hover:border-orange-500 dark:hover:border-orange-500 transition-all aspect-video flex items-center justify-center bg-neutral-50 dark:bg-neutral-800">
                                            {image ? (
                                                <img src={URL.createObjectURL(image)} alt="" className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="flex flex-col items-center gap-2 text-neutral-400 group-hover:text-orange-500 transition-colors">
                                                    <Upload size={32} />
                                                    <span className="font-bold">Choose File</span>
                                                </div>
                                            )}
                                        </label>
                                        <input onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} type="file" id="image" hidden />
                                    </div>
                                </div>

                                <div className="space-y-6 text-black dark:text-white">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Product Name</label>
                                        <input onChange={onChangeHandler} value={data.name} name='name' type="text" placeholder="Type here" required className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-orange-500 dark:focus:border-orange-500 outline-none font-medium transition-all" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Product Description</label>
                                        <textarea onChange={onChangeHandler} value={data.description} name='description' rows={3} placeholder="Write content here" required className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-orange-500 dark:focus:border-orange-500 outline-none font-medium transition-all resize-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-black dark:text-white">
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Product Category</label>
                                    <select onChange={onChangeHandler} name='category' className="w-full px-5 py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-orange-500 dark:focus:border-orange-500 outline-none font-medium transition-all appearance-none cursor-pointer">
                                        <option value="Salad">Salad</option>
                                        <option value="Rolls">Rolls</option>
                                        <option value="Deserts">Deserts</option>
                                        <option value="Sandwich">Sandwich</option>
                                        <option value="Cake">Cake</option>
                                        <option value="Pure Veg">Pure Veg</option>
                                        <option value="Pasta">Pasta</option>
                                        <option value="Noodles">Noodles</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-widest pl-1">Product Price</label>
                                    <div className="relative">
                                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-neutral-400">₹</span>
                                        <input onChange={onChangeHandler} value={data.price} name='price' type="number" placeholder="20" required className="w-full pl-10 pr-5 py-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:border-orange-500 dark:focus:border-orange-500 outline-none font-black transition-all" />
                                    </div>
                                </div>
                            </div>

                            <button type='submit' className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-black text-xl shadow-xl shadow-orange-500/20 transition-all active:scale-[0.98] mt-4">
                                Add Dish to Menu
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SellerMenuManagement;
