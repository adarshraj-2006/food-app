import { useParams, Link } from "react-router-dom";
import { food_list } from "../../assets/assets";
import FoodItem from "../../components/FoodItem/FoodItem";

const FoodDetail = () => {
  const { id } = useParams();

  const food = food_list.find(item => item._id === id);

  if (!food) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">Dish not found</h2>
        <Link to="/menu" className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors">
          Browse Menu
        </Link>
      </div>
    );
  }

  // Same category foods
  const sameCategory = food_list.filter(
    item => item.category === food.category && item._id !== food._id
  );

  // Different category foods
  const differentCategory = food_list
    .filter(item => item.category !== food.category)
    .slice(0, 4);

  return (
    <div className="pt-24 pb-20 container mx-auto px-4 max-w-7xl animate-in fade-in duration-500">

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 mb-8">
        <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/menu" className="hover:text-orange-500 transition-colors">Menu</Link>
        <span>/</span>
        <span className="text-neutral-900 dark:text-white font-medium">{food.name}</span>
      </div>

      {/* Food Main Info */}
      <div className="flex flex-col lg:flex-row gap-12 mb-20">
        <div className="w-full lg:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-black text-neutral-900 dark:text-white mb-4 leading-tight">
            {food.name}
          </h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 leading-relaxed mb-8">
            {food.description}
          </p>
          <h2 className="text-4xl font-bold text-neutral-900 dark:text-white mb-8">
            ${food.price}
          </h2>

          <button className="w-full md:w-auto px-8 py-4 bg-orange-500 text-white text-lg font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 hover:shadow-orange-500/40 transition-all active:scale-[0.98]">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Same Category */}
      {sameCategory.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">Similar Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sameCategory.map(item => (
              <FoodItem
                key={item._id}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </section>
      )}

      {/* Different Category */}
      <section>
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentCategory.map(item => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>

    </div>
  );
};

export default FoodDetail;
