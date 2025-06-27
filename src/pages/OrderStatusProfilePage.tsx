import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Custom Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LiveOrderTracker from '@/components/LiveOrderTracker';

// shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// Zod schema for the profile form
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  address: z.string().min(5, { message: "Please enter a valid address." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Placeholder data
const pastOrders = [
  { id: 'ORD#001', date: '2023-10-25', restaurant: 'The Sushi Place', total: '$25.50', status: 'Delivered' },
  { id: 'ORD#002', date: '2023-10-22', restaurant: 'Pizza Palace', total: '$35.00', status: 'Delivered' },
  { id: 'ORD#003', date: '2023-10-18', restaurant: 'Burger Barn', total: '$18.75', status: 'Cancelled' },
  { id: 'ORD#004', date: '2023-10-15', restaurant: 'Taco Town', total: '$22.00', status: 'Delivered' },
];

const defaultProfileValues: Partial<ProfileFormValues> = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    phone: "123-456-7890",
    address: "123 Flavor St, Foodie City, 12345"
};

const OrderStatusProfilePage = () => {
  console.log('OrderStatusProfilePage loaded');
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: defaultProfileValues,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    console.log("Profile updated:", data);
    // Here you would typically call an API to save the data
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1 w-full py-8 md:py-12">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="track-order" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto">
              <TabsTrigger value="track-order">Track Your Order</TabsTrigger>
              <TabsTrigger value="order-history">Order History</TabsTrigger>
              <TabsTrigger value="profile-settings">Profile Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="track-order" className="mt-6">
              <LiveOrderTracker />
            </TabsContent>

            <TabsContent value="order-history" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Past Orders</CardTitle>
                  <CardDescription>Here is a list of your recent orders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pastOrders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.restaurant}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell className="text-right">
                            <Badge variant={order.status === 'Delivered' ? 'default' : 'destructive'}>
                              {order.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile-settings" className="mt-6">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your personal information and saved details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Default Address</FormLabel>
                            <FormControl>
                              <Input placeholder="123 Main St, Anytown, USA" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" className="w-full">Save Changes</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderStatusProfilePage;