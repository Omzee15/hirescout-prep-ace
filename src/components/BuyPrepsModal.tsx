import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Check, Zap, Crown } from "lucide-react";

interface BuyPrepsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPreps: number;
}

const BuyPrepsModal = ({ isOpen, onClose, currentPreps }: BuyPrepsModalProps) => {
  const packages = [
    {
      id: "basic",
      name: "Basic Pack",
      preps: 5,
      price: 9.99,
      icon: Target,
      popular: false,
      features: ["5 Interview Preps", "AI Analysis", "Performance Reports"]
    },
    {
      id: "standard",
      name: "Standard Pack",
      preps: 12,
      price: 19.99,
      icon: Zap,
      popular: true,
      features: ["12 Interview Preps", "AI Analysis", "Performance Reports", "Priority Support"]
    },
    {
      id: "premium",
      name: "Premium Pack",
      preps: 25,
      price: 34.99,
      icon: Crown,
      popular: false,
      features: ["25 Interview Preps", "AI Analysis", "Performance Reports", "Priority Support", "Resume Review"]
    }
  ];

  const handlePurchase = (packageId: string) => {
    // TODO: Implement Stripe payment integration
    console.log("Purchase package:", packageId);
    // For now, just close the modal
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            You're out of interview preps! 🎯
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Choose a package to continue practicing and improving your interview skills
          </DialogDescription>
        </DialogHeader>

        {/* Current Status */}
        <div className="bg-muted/30 p-4 rounded-lg text-center mb-6">
          <p className="text-sm text-muted-foreground mb-2">Current Status</p>
          <Badge variant="outline" className="text-lg px-4 py-2">
            <Target className="h-4 w-4 mr-2" />
            {currentPreps} Preps Remaining
          </Badge>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <Card 
              key={pkg.id} 
              className={`relative ${pkg.popular ? 'border-primary ring-2 ring-primary/20' : ''}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4 mx-auto">
                  <pkg.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-primary">${pkg.price}</span>
                  <span className="text-muted-foreground ml-1">one-time</span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{pkg.preps}</div>
                  <div className="text-sm text-muted-foreground">Interview Preps</div>
                </div>
                
                <ul className="space-y-2">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <Check className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  onClick={() => handlePurchase(pkg.id)}
                  className="w-full" 
                  variant={pkg.popular ? "default" : "outline"}
                  size="lg"
                >
                  Get {pkg.preps} Preps
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground mt-6">
          <p>💳 Secure payment processed by Stripe</p>
          <p>🔄 Preps are added instantly to your account</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BuyPrepsModal;