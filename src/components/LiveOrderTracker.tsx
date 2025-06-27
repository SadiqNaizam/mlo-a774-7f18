import React, { useState, useEffect, FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PackageCheck, ChefHat, Bike, Home, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the structure for each step in the tracker
interface Step {
  name: string;
  icon: React.ElementType;
}

const steps: Step[] = [
  { name: 'Order Placed', icon: PackageCheck },
  { name: 'Preparing', icon: ChefHat },
  { name: 'Out for Delivery', icon: Bike },
  { name: 'Delivered', icon: Home },
];

const LiveOrderTracker: FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  console.log('LiveOrderTracker loaded');

  // Simulate order progress for demonstration purposes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep(prevStep => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        }
        clearInterval(timer);
        return prevStep;
      });
    }, 4000); // Move to the next step every 4 seconds

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const progressPercentage = (activeStep / (steps.length - 1)) * 100;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Track Your Order</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Map Placeholder */}
        <div className="relative w-full h-64 bg-gray-200 rounded-md flex items-center justify-center">
          <MapPin className="h-12 w-12 text-gray-400" />
          <p className="absolute bottom-2 text-gray-500 text-sm">Live map view is currently unavailable</p>
          <div className="absolute top-3 left-3 bg-white p-2 rounded-md shadow-md">
            <p className="font-semibold">Estimated Delivery</p>
            <p className="text-lg font-bold text-green-600">10-15 min</p>
          </div>
        </div>

        {/* Progress Stepper */}
        <div>
          <div className="flex justify-between items-start mb-2 px-2">
            {steps.map((step, index) => (
              <div key={step.name} className="flex-1 text-center">
                <p
                  className={cn(
                    "font-semibold text-sm md:text-base",
                    index === activeStep ? "text-green-600" : "text-gray-500",
                    index < activeStep && "text-gray-800"
                  )}
                >
                  {step.name}
                </p>
              </div>
            ))}
          </div>
          <div className="relative">
            <Progress value={progressPercentage} className="h-2" />
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex justify-between items-center">
              {steps.map((step, index) => {
                const isCompleted = index < activeStep;
                const isActive = index === activeStep;
                return (
                  <div
                    key={index}
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300",
                      isCompleted ? "border-green-600 bg-green-600" : "border-gray-300",
                      isActive && "border-green-600 scale-125"
                    )}
                  >
                    <step.icon
                      className={cn(
                        "h-5 w-5",
                        isCompleted ? "text-white" : "text-gray-400",
                        isActive && "text-green-600"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveOrderTracker;