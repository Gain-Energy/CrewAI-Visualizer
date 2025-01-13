import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle } from "lucide-react";

interface CreateAgentDialogProps {
  onSuccess?: () => void;
}

export function CreateAgentDialog({ onSuccess }: CreateAgentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<{
    enhancedDescription?: string;
    suggestedCapabilities?: string[];
    validationErrors?: string[];
  } | null>(null);
  const queryClient = useQueryClient();

  const validateAgent = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/marketplace/agents/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to validate agent");
      }
      
      return response.json();
    },
  });
  
  const createAgent = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch("/api/marketplace/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create agent");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["marketplaceAgents"] });
      setOpen(false);
      onSuccess?.();
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const agentData = {
      name: formData.get("name")?.toString() || "",
      description: formData.get("description")?.toString() || "",
      capabilities: formData.get("capabilities")?.toString().split(",").map(c => c.trim()) || [],
      category: formData.get("category")?.toString() || "",
      price: Number(formData.get("price")) || 0,
      version: formData.get("version")?.toString() || "1.0.0",
      author: formData.get("author")?.toString() || "",
    };

    setIsValidating(true);
    try {
      const result = await validateAgent.mutateAsync(agentData);
      setValidationResult(result);
      
      if (!result.validationErrors?.length) {
        // Use enhanced description if available
        createAgent.mutate({
          ...agentData,
          description: result.enhancedDescription || agentData.description,
          capabilities: Array.from(new Set([
            ...agentData.capabilities,
            ...(result.suggestedCapabilities || [])
          ])),
        });
      }
    } catch (error) {
      console.error("Error validating agent:", error);
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <PlusCircle className="h-4 w-4" />
          Create New Agent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Agent</DialogTitle>
          <DialogDescription>
            Add a new AI agent to the marketplace. New agents start in experimental status.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              name="description" 
              required 
              className={validationResult?.enhancedDescription ? "border-green-500" : undefined}
            />
            {validationResult?.enhancedDescription && (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-950 rounded-md">
                <Label>Enhanced Description:</Label>
                <p className="text-sm text-muted-foreground mt-1">
                  {validationResult.enhancedDescription}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => {
                    const textarea = document.getElementById("description") as HTMLTextAreaElement;
                    if (textarea && validationResult.enhancedDescription) {
                      textarea.value = validationResult.enhancedDescription;
                    }
                  }}
                >
                  Use Enhanced Description
                </Button>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="capabilities">Capabilities (comma-separated)</Label>
            <Input 
              id="capabilities" 
              name="capabilities" 
              placeholder="drilling, optimization, monitoring" 
              className={validationResult?.suggestedCapabilities?.length ? "border-green-500" : undefined}
            />
            {validationResult?.suggestedCapabilities?.length ? (
              <div className="mt-2 p-3 bg-green-50 dark:bg-green-950 rounded-md">
                <Label>Suggested Additional Capabilities:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {validationResult.suggestedCapabilities.map((capability) => (
                    <Badge 
                      key={capability}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        const input = document.getElementById("capabilities") as HTMLInputElement;
                        if (input) {
                          const current = input.value.split(",").map(c => c.trim()).filter(Boolean);
                          if (!current.includes(capability)) {
                            input.value = [...current, capability].join(", ");
                          }
                        }
                      }}
                    >
                      {capability}
                    </Badge>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          {validationResult?.validationErrors?.length ? (
            <div className="p-3 bg-red-50 dark:bg-red-950 rounded-md">
              <Label className="text-red-600 dark:text-red-400">Validation Issues:</Label>
              <ul className="list-disc list-inside mt-2 space-y-1">
                {validationResult.validationErrors.map((error, index) => (
                  <li key={index} className="text-sm text-red-600 dark:text-red-400">
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input id="category" name="category" placeholder="drilling" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="version">Version</Label>
              <Input id="version" name="version" placeholder="1.0.0" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" name="author" required />
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createAgent.isPending || isValidating}
            >
              {isValidating ? (
                "Validating..."
              ) : createAgent.isPending ? (
                "Creating..."
              ) : validationResult?.validationErrors?.length ? (
                "Fix Issues"
              ) : (
                "Create Agent"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
