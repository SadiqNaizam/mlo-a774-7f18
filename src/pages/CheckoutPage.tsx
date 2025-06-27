import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartSummary from '@/components/CartSummary'; // Although not used directly, we'll mimic its data structure

// shadcn/ui Components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from "@/components/ui/use-toast";

// Icons
import { CreditCard, Truck } from 'lucide-react';

// Form validation schema
const checkoutFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  address: z.string().min(5, { message: "Address must be at least 5 characters." }),
  city: z.string().min(2, { message: "City is required." }),
  postalCode: z.string().min(5, { message: "A valid postal code is required." }),
  paymentMethod: z.enum(['credit-card', 'paypal', 'cash'], {
    required_error: "You need to select a payment method.",
  }),
  promoCode: z.string().optional(),
});

// Mock data similar to CartSummary
const mockOrder = {
  items: [
    { id: "sushi-1", name: "Spicy Tuna Roll", price: 12.99, quantity: 1, image: "https://via.placeholder.com/150" },
    { id: "drink-2", name: "Green Tea", price: 2.50, quantity: 2, image: "https://via.placeholder.com/150" },
    { id: "side-3", name: "Edamame", price: 5.00, quantity: 1, image: "https://via.placeholder.com/150" },
  ],
  subtotal: 22.99,
  deliveryFee: 4.99,
  total: 27.98,
};

const CheckoutPage = () => {
  console.log('CheckoutPage loaded');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof checkoutFormSchema>>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      fullName: "Alex Doe",
      address: "123 Flavor Street",
      city: "Tastytown",
      postalCode: "12345",
      paymentMethod: "credit-card",
      promoCode: "",
    },
  });

  function onSubmit(values: z.infer<typeof checkoutFormSchema>) {
    console.log("Order submitted:", values);
    toast({
      title: "Order Placed!",
      description: "Your delicious meal is on its way.",
    });
    // Navigate to the order status page after a short delay to allow toast to be seen
    setTimeout(() => {
      navigate('/order-status-profile'); // Path from App.tsx
    }, 1000);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight mb-8">Checkout</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column: Form */}
            <div className="lg:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><Truck className="w-5 h-5" /> Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField control={form.control} name="fullName" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="address" render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Street Address</FormLabel>
                          <FormControl><Input placeholder="123 Main St" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl><Input placeholder="Anytown" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="postalCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl><Input placeholder="12345" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2"><CreditCard className="w-5 h-5" /> Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <FormField control={form.control} name="paymentMethod" render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormItem><FormControl><RadioGroupItem value="credit-card" id="credit-card" className="peer sr-only" /></FormControl><Label htmlFor="credit-card" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Credit Card</Label></FormItem>
                              <FormItem><FormControl><RadioGroupItem value="paypal" id="paypal" className="peer sr-only" /></FormControl><Label htmlFor="paypal" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">PayPal</Label></FormItem>
                              <FormItem><FormControl><RadioGroupItem value="cash" id="cash" className="peer sr-only" /></FormControl><Label htmlFor="cash" className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary">Cash on Delivery</Label></FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </CardContent>
                  </Card>
                   <Button type="submit" size="lg" className="w-full">Place Order - ${mockOrder.total.toFixed(2)}</Button>
                </form>
              </Form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {mockOrder.items.map(item => (
                      <div key={item.id} className="flex justify-between items-center text-sm">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p>Subtotal</p>
                      <p>${mockOrder.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Delivery Fee</p>
                      <p>${mockOrder.deliveryFee.toFixed(2)}</p>
                    </div>
                  </div>
                   <Separator />
                   <FormField control={form.control} name="promoCode" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Promotional Code</FormLabel>
                          <FormControl><Input placeholder="Enter code" {...field} /></FormControl>
                        </FormItem>
                      )} />
                </CardContent>
                <CardFooter className="flex justify-between items-center font-bold text-lg">
                  <p>Total</p>
                  <p>${mockOrder.total.toFixed(2)}</p>
                </CardFooter>
              </Card>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;