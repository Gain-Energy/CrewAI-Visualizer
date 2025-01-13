import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { Agent, FilterOptions } from "@/types/marketplace";

interface AgentCatalogProps {
  agents: Agent[];
  filters: FilterOptions;
}

export function AgentCatalog({ agents, filters }: AgentCatalogProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {agents.map((agent) => (
        <Card key={agent.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{agent.name}</CardTitle>
              <Badge variant={agent.status === "verified" ? "default" : "secondary"}>
                {agent.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{agent.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < agent.rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({agent.downloads} downloads)
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {agent.capabilities.map((capability) => (
                <Badge key={capability} variant="outline">
                  {capability}
                </Badge>
              ))}
            </div>
            <Button className="w-full">Install Agent</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
