import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star, Clock, Truck } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  cuisineTypes: string[];
  rating: number;
  deliveryTime: number; // in minutes
  deliveryCost: number; // in currency units
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  cuisineTypes,
  rating,
  deliveryTime,
  deliveryCost,
}) => {
  console.log('RestaurantCard loaded for:', name, 'with ID:', id);

  return (
    <Link to="/restaurant-menu" className="block group focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-lg" aria-label={`View menu for ${name}`}>
      <Card className="w-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-1 flex flex-col h-full">
        <CardHeader className="p-0 border-b">
          <AspectRatio ratio={16 / 9}>
            <img
              src={imageUrl || 'https://via.placeholder.com/400x225?text=Restaurant'}
              alt={`Image of ${name}`}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </CardHeader>
        
        <CardContent className="p-4 flex-grow">
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-lg font-bold line-clamp-1">{name}</CardTitle>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-sm">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-3">
            {cuisineTypes.slice(0, 3).map((cuisine) => (
              <Badge key={cuisine} variant="secondary">{cuisine}</Badge>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 bg-muted/50 text-sm text-muted-foreground">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>
                {deliveryCost > 0 ? `$${deliveryCost.toFixed(2)}` : 'Free'}
              </span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;