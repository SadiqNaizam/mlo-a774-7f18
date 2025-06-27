import React, { useState } from 'react';

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import RestaurantCard from '@/components/RestaurantCard';
import CuisineCategoryFilter from '@/components/CuisineCategoryFilter';

// shadcn/ui Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

// Placeholder data for restaurants
const restaurantData = [
  {
    id: '1',
    name: 'The Golden Spoon',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.5,
    deliveryTime: 30,
    deliveryCost: 2.99,
  },
  {
    id: '2',
    name: 'Sushi Central',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.8,
    deliveryTime: 25,
    deliveryCost: 0,
  },
  {
    id: '3',
    name: 'Burger Bliss',
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['American', 'Burgers', 'Fries'],
    rating: 4.2,
    deliveryTime: 20,
    deliveryCost: 1.99,
  },
  {
    id: '4',
    name: 'Taco Town',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['Mexican', 'Tacos', 'Burritos'],
    rating: 4.6,
    deliveryTime: 35,
    deliveryCost: 0,
  },
  {
    id: '5',
    name: 'The Green Leaf',
    imageUrl: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['Salads', 'Healthy', 'Vegan'],
    rating: 4.9,
    deliveryTime: 15,
    deliveryCost: 3.49,
  },
  {
    id: '6',
    name: 'Curry House',
    imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=800&auto=format&fit=crop',
    cuisineTypes: ['Indian', 'Curry', 'Spicy'],
    rating: 4.4,
    deliveryTime: 40,
    deliveryCost: 2.99,
  },
];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage loaded');

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<[number]>([50]);
  const [freeDelivery, setFreeDelivery] = useState<boolean>(false);

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header />
      <main className="flex-grow container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Filter & Sort</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Sort By */}
                <div className="space-y-2">
                  <Label htmlFor="sort-by">Sort by</Label>
                  <Select defaultValue="rating">
                    <SelectTrigger id="sort-by" className="w-full">
                      <SelectValue placeholder="Recommended" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rating">Rating</SelectItem>
                      <SelectItem value="delivery-time">Delivery Time</SelectItem>
                      <SelectItem value="price">Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <Label htmlFor="price-range">Max Delivery Cost (${priceRange[0]})</Label>
                  <Slider
                    id="price-range"
                    max={10}
                    step={1}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>

                {/* Other Filters */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="free-delivery" checked={freeDelivery} onCheckedChange={(checked) => setFreeDelivery(Boolean(checked))} />
                    <Label htmlFor="free-delivery" className="font-normal cursor-pointer">
                      Free Delivery
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="open-now" />
                    <Label htmlFor="open-now" className="font-normal cursor-pointer">
                      Open Now
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Restaurant List */}
          <div className="lg:col-span-3">
            <CuisineCategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <div className="my-6">
              <h2 className="text-2xl font-bold tracking-tight">
                {restaurantData.length} Restaurants Found
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {restaurantData.map(restaurant => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RestaurantListingPage;