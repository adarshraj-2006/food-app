import React, { useState, useContext } from "react";
import MainLayout from '../../components/layout/MainLayout/MainLayout';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import RestaurantDisplay from '../../components/RestaurantDisplay/RestaurantDisplay';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import FoodSection from '../../components/FoodSection/FoodSection';
import OffersCarousel from '../../components/OffersCarousel/OffersCarousel';
import AppDownload from '../../components/AppDownload/AppDownload';
import { useStore } from "../../context/StoreContext";

const Home = () => {
  const [category, setCategory] = useState("all");
  const { food_list, isLoading } = useStore();

  // Filter and categorize all food items
  const topRated = (food_list || []).slice(0, 10);
  const salads = (food_list || []).filter((item: any) => item.category === "Salad");
  const rolls = (food_list || []).filter((item: any) => item.category === "Rolls");
  const deserts = (food_list || []).filter((item: any) => item.category === "Deserts");
  const sandwich = (food_list || []).filter((item: any) => item.category === "Sandwich");
  const cakes = (food_list || []).filter((item: any) => item.category === "Cake");
  const pureVeg = (food_list || []).filter((item: any) => item.category === "Pure Veg");
  const pasta = (food_list || []).filter((item: any) => item.category === "Pasta");
  const noodles = (food_list || []).filter((item: any) => item.category === "Noodles");

  return (
    <MainLayout>
      <div className="flex flex-col gap-10 md:gap-24 pb-20 overflow-x-hidden">
        {/* Full Width Header */}
        <section id="home" className="w-full">
          <Header />
        </section>

        {/* Contained Content Section */}
        <div className="container mx-auto px-4 lg:px-8 max-w-[1440px] flex flex-col gap-8 md:gap-16">
          <section id="offers">
            <OffersCarousel />
          </section>

          {/* Restaurant Section First as per user request */}
          <section id="restaurants">
            <RestaurantDisplay />
          </section>


          <section id="menu">
            <ExploreMenu category={category} setCategory={setCategory} />
          </section>

          <div className="space-y-4">
            {isLoading ? (
              <div className="py-20 flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-neutral-500 dark:text-neutral-400 font-medium">Fetching the menu...</p>
              </div>
            ) : food_list.length === 0 ? (
              <div className="py-20 text-center bg-neutral-100 dark:bg-neutral-800/50 rounded-[32px] border-2 border-dashed border-neutral-200 dark:border-neutral-700">
                <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">No food items found</h3>
                <p className="text-neutral-500">Go to the seller dashboard to add some delicious dishes!</p>
              </div>
            ) : (
              <>
                <section id="popular">
                  <FoodSection title="Popular Dishes" items={topRated} />
                </section>

                <section id="rolls">
                  <FoodSection title="Quick Rolls" items={rolls} />
                </section>

                <section id="pure-veg">
                  <FoodSection title="Pure Veg Delights" items={pureVeg} />
                </section>

                <section id="noodles">
                  <FoodSection title="Wok-tastic Noodles" items={noodles} />
                </section>

                <section id="salads">
                  <FoodSection title="Fresh Salads" items={salads} />
                </section>

                <section id="sandwich">
                  <FoodSection title="Gourmet Sandwiches" items={sandwich} />
                </section>

                <section id="deserts">
                  <FoodSection title="Sweet Deserts" items={deserts} />
                </section>

                <section id="cakes">
                  <FoodSection title="Deluxe Cakes" items={cakes} />
                </section>

                <section id="pasta">
                  <FoodSection title="Italian Pasta" items={pasta} />
                </section>

                <section id="food-list">
                  <FoodDisplay category={category} />
                </section>
              </>
            )}
          </div>
        </div>


        {/* Apps section contained */}
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <section id="mobile-app">
            <AppDownload />
          </section>
        </div>
      </div>
    </MainLayout >
  );
};




export default Home;
