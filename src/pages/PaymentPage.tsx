
import React from 'react';
import RefinedPageLayout from "@/components/layout/RefinedPageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

const PaymentPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <RefinedPageLayout title="Payment" backUrl="/pricing">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-card border-border">
            <div className="text-center mb-8">
              <CreditCard className="h-12 w-12 mx-auto text-primary mb-4" />
              <h2 className="text-2xl font-bold text-card-foreground mb-2">Complete Your Payment</h2>
              <p className="text-muted-foreground">Secure checkout with 256-bit SSL encryption</p>
            </div>

            <form className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-card-foreground">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div>
                <Label htmlFor="cardNumber" className="text-card-foreground">Card Number</Label>
                <Input 
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry" className="text-card-foreground">Expiry Date</Label>
                  <Input 
                    id="expiry"
                    placeholder="MM/YY"
                    className="bg-background border-border text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="cvc" className="text-card-foreground">CVC</Label>
                  <Input 
                    id="cvc"
                    placeholder="123"
                    className="bg-background border-border text-foreground"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="name" className="text-card-foreground">Cardholder Name</Label>
                <Input 
                  id="name"
                  placeholder="John Doe"
                  className="bg-background border-border text-foreground"
                />
              </div>

              <div className="bg-muted/20 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="text-foreground">$29.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Tax:</span>
                  <span className="text-foreground">$2.40</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">Total:</span>
                    <span className="font-semibold text-foreground">$32.39</span>
                  </div>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <Lock className="h-4 w-4 mr-2" />
                Complete Payment
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Your payment information is secure and encrypted. We never store your card details.
              </p>
            </form>
          </Card>
        </div>
      </RefinedPageLayout>
    </div>
  );
};

export default PaymentPage;
