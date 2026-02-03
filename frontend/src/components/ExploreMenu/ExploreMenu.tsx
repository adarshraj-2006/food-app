import { menu_list } from '../../assets/assets';

// Define strict types for props
interface ExploreMenuProps {
  category: string;
  setCategory: (category: string | ((prev: string) => string)) => void;
}

const ExploreMenu = ({ category, setCategory }: ExploreMenuProps) => {
  return (
    <div className="flex flex-col gap-6" id="menu">
      <div className="text-center max-w-[90%] md:max-w-[60%] mx-auto">
        <h1 className="text-neutral-900 dark:text-white font-medium text-3xl mb-4">Explore our menu</h1>
        <p className="text-neutral-600 dark:text-neutral-300 text-base lg:text-lg mb-6 leading-relaxed">
          Choose from a diverse menu featuring a delectable array of dishes crafted
          with the finest ingredients and culinary expertise. Our mission is to satisfy
          your cravings and elevate your dining experience, one delicious meal at a time.
        </p>
      </div>

      <div className="flex items-center gap-10 text-center m-8 overflow-x-auto no-scrollbar py-6 px-4">
        {menu_list.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              setCategory((prev: string) => (prev === item.menu_name ? "all" : item.menu_name))
            }
            className="cursor-pointer flex-shrink-0 group flex flex-col items-center gap-4"
          >
            <div className={`relative p-1.5 rounded-full transition-all duration-300 ${category === item.menu_name
              ? 'bg-gradient-to-tr from-orange-500 via-red-500 to-yellow-500 shadow-xl shadow-orange-500/30 scale-110'
              : 'bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}>
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={`w-[120px] h-[120px] lg:w-[140px] lg:h-[140px] rounded-full object-cover aspect-square transition-all duration-300 bg-white dark:bg-neutral-800 p-1 ${category === item.menu_name ? 'scale-95' : 'group-hover:scale-105'}`}
              />
              {category === item.menu_name && (
                <div className="absolute -bottom-2 -right-2 bg-white dark:bg-neutral-900 rounded-full p-1.5 shadow-md animate-in zoom-in">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              )}
            </div>

            <p className={`text-lg font-medium transition-all ${category === item.menu_name
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 font-bold scale-110'
              : 'text-neutral-500 dark:text-neutral-400 group-hover:text-orange-500'}`}>
              {item.menu_name}
            </p>
          </div>
        ))}
      </div>
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-200 dark:via-neutral-700 to-transparent my-4"></div>
    </div>
  );
};

export default ExploreMenu;
