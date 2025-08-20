
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Star } from "lucide-react";

const Wishlist = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="My Wishlist" backUrl="/marketplace">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-24">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Start adding courses and skills you're interested in to keep track of them for later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Browse Marketplace
              </Button>
              <Button variant="outline" size="lg">
                <Star className="h-5 w-5 mr-2" />
                View Recommendations
              </Button>
            </div>
          </div>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default Wishlist;
