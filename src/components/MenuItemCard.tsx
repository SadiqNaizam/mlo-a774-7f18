import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface MenuItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  hasCustomizations?: boolean;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl = 'https://via.placeholder.com/400x300.png?text=ChowNow+Express',
  hasCustomizations = false,
}) => {
  console.log(`MenuItemCard loaded for: ${name}`);

  const handleSimpleAddToCart = () => {
    toast.success(`${name} added to cart!`);
    console.log(`Added simple product ${id} to cart.`);
  };

  const handleCustomAddToCart = () => {
    // In a real application, you would gather form data here before adding to cart.
    toast.success(`Customized ${name} added to cart!`);
    console.log(`Added customized product ${id} to cart.`);
    // The dialog will close automatically on button click when inside DialogFooter.
  };

  const customizationDialog = (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{name}</DialogTitle>
        <DialogDescription>
          Customize your item and add it to your order.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-6 py-4">
        {/* Example customization: Size */}
        <div className="grid gap-2">
          <Label>Size</Label>
          <RadioGroup defaultValue="medium" className="flex items-center gap-4">
            <div>
              <RadioGroupItem value="small" id={`r1-${id}`} />
              <Label htmlFor={`r1-${id}`} className="ml-2 font-normal">Small</Label>
            </div>
            <div>
              <RadioGroupItem value="medium" id={`r2-${id}`} />
              <Label htmlFor={`r2-${id}`} className="ml-2 font-normal">Medium (+$2.00)</Label>
            </div>
            <div>
              <RadioGroupItem value="large" id={`r3-${id}`} />
              <Label htmlFor={`r3-${id}`} className="ml-2 font-normal">Large (+$4.00)</Label>
            </div>
          </RadioGroup>
        </div>
        {/* Example customization: Add-ons */}
        <div className="grid gap-2">
          <Label>Add-ons</Label>
          <div className="flex items-center space-x-2">
            <Checkbox id={`addon-avocado-${id}`} />
            <Label htmlFor={`addon-avocado-${id}`} className="font-normal">Avocado (+$1.50)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id={`addon-cheese-${id}`} />
            <Label htmlFor={`addon-cheese-${id}`} className="font-normal">Extra Cheese (+$1.00)</Label>
          </div>
        </div>
        {/* Example customization: Special Instructions */}
        <div className="grid gap-2">
          <Label htmlFor={`instructions-${id}`}>Special Instructions</Label>
          <Input id={`instructions-${id}`} placeholder="e.g. no onions, extra spicy" />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" onClick={handleCustomAddToCart}>Add to Order</Button>
      </DialogFooter>
    </DialogContent>
  );

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col group">
      <div className="relative">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold tracking-tight">{name}</h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{description}</p>
        </div>
        
        <div className="flex justify-between items-end mt-4">
          <p className="text-xl font-bold text-gray-900">${price.toFixed(2)}</p>
          {hasCustomizations ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <PlusCircle className="mr-2 h-4 w-4" /> Add
                </Button>
              </DialogTrigger>
              {customizationDialog}
            </Dialog>
          ) : (
            <Button size="sm" onClick={handleSimpleAddToCart}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;