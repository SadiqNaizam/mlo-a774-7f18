import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-specific Components
import CuisineCategoryFilter from '@/components/CuisineCategoryFilter';
import RestaurantCard from '@/components/RestaurantCard';

// shadcn/ui Components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

// Placeholder data for restaurants
const restaurantData = [
  {
    id: '1',
    name: 'The Golden Spoon Diner',
    imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Burgers', 'Breakfast', 'American'],
    rating: 4.5,
    deliveryTime: 25,
    deliveryCost: 2.99,
  },
  {
    id: '2',
    name: 'Sushi Yama',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Sushi', 'Japanese', 'Asian'],
    rating: 4.8,
    deliveryTime: 30,
    deliveryCost: 4.50,
  },
  {
    id: '3',
    name: 'Pizza Palace',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Pizza', 'Italian'],
    rating: 4.3,
    deliveryTime: 35,
    deliveryCost: 0,
  },
  {
    id: '4',
    name: 'Salad Grove',
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-2850a02b5c0d?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Salads', 'Healthy', 'Soups'],
    rating: 4.9,
    deliveryTime: 20,
    deliveryCost: 1.99,
  },
    {
    id: '5',
    name: 'Steakhouse Supreme',
    imageUrl: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Steak', 'American'],
    rating: 4.7,
    deliveryTime: 45,
    deliveryCost: 5.00,
  },
  {
    id: '6',
    name: 'Taco Fiesta',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Mexican', 'Tacos'],
    rating: 4.6,
    deliveryTime: 25,
    deliveryCost: 2.50,
  },
  {
    id: '7',
    name: 'The Breakfast Nook',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Breakfast', 'Coffee'],
    rating: 4.8,
    deliveryTime: 15,
    deliveryCost: 3.00,
  },
  {
    id: '8',
    name: "Mama's Desserts",
    imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=225&fit=crop&q=80',
    cuisineTypes: ['Desserts', 'Bakery'],
    rating: 4.9,
    deliveryTime: 20,
    deliveryCost: 0,
  },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to the listing page with the search query
      navigate(`/restaurant-listing?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
        // Or just navigate to the listing page if no query
        navigate('/restaurant-listing');
    }
  };

  const filteredRestaurants = useMemo(() => {
    if (selectedCategory === 'All') {
      return restaurantData;
    }
    return restaurantData.filter(restaurant =>
      restaurant.cuisineTypes.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-80 flex items-center justify-center text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&h=768&fit=crop&q=80')" }}>
          <div className="absolute inset-0 bg-black/50" aria-hidden="true"></div>
          <div className="relative z-10 container text-white px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Food for any mood, delivered.
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
              Discover and order from the best local restaurants.
            </p>
            <form onSubmit={handleSearch} className="max-w-xl mx-auto flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Enter restaurant or cuisine..."
                  className="w-full pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" size="lg" className="h-12">Search</Button>
            </form>
          </div>
        </section>

        {/* Cuisine Category Filter Section */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-2">Or Browse by Cuisine</h2>
            <p className="text-center text-muted-foreground mb-6">Explore a world of flavors.</p>
            <CuisineCategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={(category) => setSelectedCategory(category)}
            />
          </div>
        </section>

        {/* Featured Restaurants Section */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold mb-8">{selectedCategory === 'All' ? 'Featured Restaurants' : `Showing ${selectedCategory}`}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
             {filteredRestaurants.length === 0 && (
                <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">No restaurants found for "{selectedCategory}". Try another category!</p>
                </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;