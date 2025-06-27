import React from 'react';
import { Link } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import MenuItemCard from '@/components/MenuItemCard';
import CartSummary from '@/components/CartSummary';

// shadcn/ui Components
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

// Lucide Icons
import { Star, MapPin } from 'lucide-react';

// Placeholder menu data
const menuData = {
  categories: [
    {
      name: "Appetizers",
      items: [
        { id: "app-1", name: "Edamame", description: "Steamed young soybeans, lightly salted. A classic starter.", price: 5.00, imageUrl: "https://images.unsplash.com/photo-1553277202-7c8612f17e93?q=80&w=800", hasCustomizations: false },
        { id: "app-2", name: "Gyoza", description: "Pan-fried pork and vegetable dumplings with a savory dipping sauce.", price: 8.50, imageUrl: "https://images.unsplash.com/photo-1627916928341-447551e1a539?q=80&w=800", hasCustomizations: false },
      ],
    },
    {
      name: "Signature Rolls",
      items: [
        { id: "roll-1", name: "Dragon Roll", description: "Eel and cucumber topped with avocado, tobiko, and eel sauce.", price: 16.99, imageUrl: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?q=80&w=800", hasCustomizations: true },
        { id: "roll-2", name: "Spicy Tuna Roll", description: "Chopped tuna with a spicy mayo sauce, cucumber, and sesame seeds.", price: 12.99, imageUrl: "https://images.unsplash.com/photo-1611141649970-58461b7c22e4?q=80&w=800", hasCustomizations: true },
        { id: "roll-3", name: "California Roll", description: "Crab, avocado, and cucumber, wrapped in seaweed and rice.", price: 10.50, imageUrl: "https://images.unsplash.com/photo-1553830591-2f394da804e5?q=80&w=800", hasCustomizations: false },
      ],
    },
    {
      name: "Sashimi & Nigiri",
      items: [
        { id: "sashimi-1", name: "Tuna Sashimi (5 pcs)", description: "Thick slices of fresh, high-quality maguro tuna.", price: 18.00, imageUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=800", hasCustomizations: false },
        { id: "nigiri-1", name: "Salmon Nigiri (2 pcs)", description: "A slice of fresh salmon over a small bed of sushi rice.", price: 7.50, imageUrl: "https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=800", hasCustomizations: false },
      ],
    },
  ]
};

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container py-8">
        {/* Restaurant Banner & Info */}
        <section className="mb-8">
          <div className="relative h-64 w-full rounded-lg overflow-hidden mb-4">
            <img 
              src="https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1920" 
              alt="Sushi restaurant interior"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Sushi Haven</h1>
          <div className="flex items-center gap-4 text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 text-yellow-500" fill="currentColor" />
              <span className="font-semibold text-gray-800">4.8</span>
              <span>(250+ ratings)</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <MapPin className="h-5 w-5" />
              <span>123 Main St, Anytown</span>
            </div>
          </div>
        </section>

        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          {/* Menu Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">Menu</h2>
            <Accordion type="multiple" defaultValue={['Appetizers', 'Signature Rolls']} className="w-full">
              {menuData.categories.map((category) => (
                <AccordionItem value={category.name} key={category.name}>
                  <AccordionTrigger className="text-xl font-medium">{category.name}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                      {category.items.map((item) => (
                        <MenuItemCard
                          key={item.id}
                          id={item.id}
                          name={item.name}
                          description={item.description}
                          price={item.price}
                          imageUrl={item.imageUrl}
                          hasCustomizations={item.hasCustomizations}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Cart Column */}
          <aside className="lg:col-span-1 mt-8 lg:mt-0">
            <div className="sticky top-24">
              <CartSummary />
            </div>
          </aside>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;