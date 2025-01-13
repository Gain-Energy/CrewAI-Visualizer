// components/marketplace/AgentCard.tsx

import { Agent } from "@/types/marketplace";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot,
  Star,
  Zap,
  Clock,
  Calendar,
  CalendarDays,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AgentCardProps {
  agent: Agent;
  onPurchase: (agentId: string, plan: 'daily' | 'monthly' | 'yearly') => void;
}

export function AgentCard({ agent, onPurchase }: AgentCardProps) {
  const [selectedPlan, setSelectedPlan] = useState<'daily' | 'monthly' | 'yearly'>('monthly');

  const getPlanIcon = (plan: string) => {
    switch (plan) {
      case 'daily':
        return Clock;
      case 'monthly':
        return Calendar;
      case 'yearly':
        return CalendarDays;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-emerald-500/10 text-emerald-500';
      case 'beta':
        return 'bg-blue-500/10 text-blue-500';
      case 'experimental':
        return 'bg-orange-500/10 text-orange-500';
      default:
        return 'bg-zinc-500/10 text-zinc-500';
    }
  };

  const formatEnergyUnits = (amount: number) => {
    return new Intl.NumberFormat('en-US').format(amount);
  };

  // Calculate discounts
  const monthlyDiscount = ((agent.energyUnits.daily * 30 - agent.energyUnits.monthly) / (agent.energyUnits.daily * 30)) * 100;
  const yearlyDiscount = ((agent.energyUnits.monthly * 12 - agent.energyUnits.yearly) / (agent.energyUnits.monthly * 12)) * 100;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="rounded-lg p-2 bg-emerald-500/10">
              <Bot className="h-8 w-8 text-emerald-500" />
            </div>
            <div>
              <CardTitle className="text-lg mb-1">{agent.name}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(agent.status)} capitalize`}
                >
                  {agent.status}
                </Badge>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{agent.rating}</span>
                  <span className="text-muted-foreground">
                    ({agent.totalReviews})
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground mb-4">
          {agent.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Select
              value={selectedPlan}
              onValueChange={(value: 'daily' | 'monthly' | 'yearly') => setSelectedPlan(value)}
            >
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Select billing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Daily</span>
                  </div>
                </SelectItem>
                <SelectItem value="monthly">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Monthly ({monthlyDiscount.toFixed(0)}% off)</span>
                  </div>
                </SelectItem>
                <SelectItem value="yearly">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4" />
                    <span>Yearly ({yearlyDiscount.toFixed(0)}% off)</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-baseline gap-1">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span className="text-2xl font-bold">
                {formatEnergyUnits(agent.energyUnits[selectedPlan])}
              </span>
              <span className="text-sm text-muted-foreground">units</span>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {agent.features.slice(0, 3).map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Purchase Button */}
          <Button 
            className="w-full bg-emerald-500 hover:bg-emerald-600"
            onClick={() => onPurchase(agent.id, selectedPlan)}
          >
            <Zap className="h-4 w-4 mr-2" />
            Purchase with Energy Units
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}