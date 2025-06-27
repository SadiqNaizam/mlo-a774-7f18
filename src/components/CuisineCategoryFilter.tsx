import React from 'react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils"; // Assuming cn utility exists from shadcn install
import {
  Pizza,
  Fish,
  UtensilsCrossed,
  Salad,
  Soup,
  Sandwich,
  IceCream,
  Coffee,
  Croissant,
  Beef
} from 'lucide-react';

const cuisineTypes = [
  { name: 'All', icon: <UtensilsCrossed className="h-6 w-6" /> },
  { name: 'Pizza', icon: <Pizza className="h-6 w-6" /> },
  { name: 'Sushi', icon: <Fish className="h-6 w-6" /> },
  { name: 'Salads', icon: <Salad className="h-6 w-6" /> },
  { name: 'Burgers', icon: <Sandwich className="h-6 w-6" /> },
  { name: 'Steak', icon: <Beef className="h-6 w-6" /> },
  { name: 'Soups', icon: <Soup className="h-6 w-6" /> },
  { name: 'Desserts', icon: <IceCream className="h-6 w-6" /> },
  { name: 'Breakfast', icon: <Croissant className="h-6 w-6" /> },
  { name: 'Coffee', icon: <Coffee className="h-6 w-6" /> },
];

interface CuisineCategoryFilterProps {
  /** The currently selected cuisine category. */
  selectedCategory: string | null;
  /** Callback function when a category is selected. */
  onSelectCategory: (category: string) => void;
}

const CuisineCategoryFilter: React.FC<CuisineCategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  console.log('CuisineCategoryFilter loaded');

  return (
    <div className="w-full py-2">
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-3 px-4 py-2">
          {cuisineTypes.map((cuisine) => {
            const isSelected = selectedCategory === cuisine.name;
            return (
              <div
                key={cuisine.name}
                onClick={() => onSelectCategory(cuisine.name)}
                className={cn(
                  "flex flex-col items-center justify-center space-y-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out border-2",
                  "w-24 h-24", // Fixed size for consistency
                  isSelected
                    ? "bg-primary text-primary-foreground border-primary shadow-md"
                    : "bg-card text-card-foreground hover:bg-muted/80 border-transparent hover:border-primary/30"
                )}
                role="button"
                aria-pressed={isSelected}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onSelectCategory(cuisine.name);
                  }
                }}
              >
                {React.cloneElement(cuisine.icon, {
                  className: cn(cuisine.icon.props.className, "h-8 w-8 mb-1"),
                })}
                <span className="text-sm font-medium truncate">{cuisine.name}</span>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" className="h-2" />
      </ScrollArea>
    </div>
  );
};

// A small utility function to combine class names, as cn from lib/utils might not be directly available.
// In a real shadcn/ui setup, you would import `cn` from `@/lib/utils`.
function cn(...inputs: any[]): string {
  // A simplified implementation for demonstration purposes.
  return inputs.filter(Boolean).join(' ');
}


export default CuisineCategoryFilter;