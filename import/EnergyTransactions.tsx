// components/marketplace/EnergyTransactions.tsx
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Bot,
  RefreshCcw,
} from "lucide-react";

interface Transaction {
  id: string;
  type: "purchase" | "spend" | "refund" | "renewal";
  amount: number;
  description: string;
  date: string;
  agentId?: string;
  agentName?: string;
}

interface EnergyTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
  transactions: Transaction[];
}

export function EnergyTransactions({
  isOpen,
  onClose,
  transactions,
}: EnergyTransactionsProps) {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "purchase":
        return <Package className="h-4 w-4 text-emerald-500" />;
      case "spend":
        return <ArrowUpRight className="h-4 w-4 text-red-500" />;
      case "refund":
        return <ArrowDownRight className="h-4 w-4 text-emerald-500" />;
      case "renewal":
        return <RefreshCcw className="h-4 w-4 text-blue-500" />;
      default:
        return <Zap className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case "purchase":
        return "text-emerald-500";
      case "spend":
        return "text-red-500";
      case "refund":
        return "text-emerald-500";
      case "renewal":
        return "text-blue-500";
      default:
        return "text-zinc-500";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Energy Unit Transactions</DialogTitle>
          <DialogDescription>
            View your energy unit transaction history
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Agent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTransactionIcon(transaction.type)}
                      <span
                        className={`capitalize ${getTransactionColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span
                        className={`font-medium ${getTransactionColor(
                          transaction.type
                        )}`}
                      >
                        {transaction.type === "spend" ? "-" : "+"}
                        {transaction.amount.toLocaleString()}
                      </span>
                      <Zap className="h-3 w-3 text-yellow-500" />
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(transaction.date)}</TableCell>
                  <TableCell>
                    {transaction.agentName ? (
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span>{transaction.agentName}</span>
                      </div>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
}