// components/marketplace/EnergyPurchaseModal.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Zap, Check, Package, Sparkles } from "lucide-react";

interface EnergyPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (amount: number) => Promise<void>;
}

const ENERGY_PACKAGES = [
  {
    id: 1,
    name: "Starter Pack",
    units: 1000,
    price: 9.99,
    description: "Perfect for testing and small projects",
    popular: false
  },
  {
    id: 2,
    name: "Professional",
    units: 5000,
    price: 39.99,
    description: "Most popular for professional use",
    popular: true
  },
  {
    id: 3,
    name: "Enterprise",
    units: 20000,
    price: 149.99,
    description: "Best value for large-scale operations",
    popular: false
  }
];

export function EnergyPurchaseModal({
  isOpen,
  onClose,
  onPurchase
}: EnergyPurchaseModalProps) {
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!selectedPackage) return;

    const energyPackage = ENERGY_PACKAGES.find(pkg => pkg.id === selectedPackage);
    if (!energyPackage) return;

    setLoading(true);
    try {
      await onPurchase(energyPackage.units);
      onClose();
    } catch (error) {
      console.error("Failed to purchase energy units:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Purchase Energy Units</DialogTitle>
          <DialogDescription>
            Choose an energy package that suits your needs. Energy units can be used to purchase and run AI agents.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          {ENERGY_PACKAGES.map((pkg) => (
            <Card 
              key={pkg.id}
              className={`relative cursor-pointer transition-all ${
                selectedPackage === pkg.id 
                  ? "border-emerald-500 shadow-emerald-500/20 shadow-lg" 
                  : "hover:border-emerald-500/50"
              }`}
              onClick={() => setSelectedPackage(pkg.id)}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-emerald-500 text-white text-xs px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {pkg.name}
                  {selectedPackage === pkg.id && (
                    <Check className="h-5 w-5 text-emerald-500" />
                  )}
                </CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold">${pkg.price}</span>
                    <span className="text-muted-foreground">one-time</span>
                  </div>

                  <div className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span className="font-semibold">{pkg.units.toLocaleString()}</span>
                    <span className="text-muted-foreground">units</span>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-emerald-500" />
                      <span>No expiration</span>
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Sparkles className="h-4 w-4 text-emerald-500" />
                      <span>Use with any agent</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <DialogFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-yellow-500" />
            Energy units never expire
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              disabled={!selectedPackage || loading}
              onClick={handlePurchase}
              className="bg-emerald-500 hover:bg-emerald-600"
            >
              {loading ? "Processing..." : "Purchase Now"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}