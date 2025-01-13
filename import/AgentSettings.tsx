import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Loader2, Power, RefreshCw } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface AgentSettingsData {
  id: number;
  name: string;
  description: string;
  status: string;
  rating: number;
  capabilities: string[];
  category: string;
  price: number;
  version: string;
  author: string;
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
  installId?: number;
  enabled?: boolean;
  autoUpdate?: boolean;
  customSettings?: Record<string, any>;
}

interface AgentSettingsProps {
  agent: AgentSettingsData;
  onUpdate?: () => void;
}

export function AgentSettings({ agent, onUpdate }: AgentSettingsProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isEnabled, setIsEnabled] = useState(agent.enabled ?? true);
  const [autoUpdate, setAutoUpdate] = useState(agent.autoUpdate ?? true);

  const toggleAgent = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/agents/${agent.id}/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !isEnabled }),
      });
      if (!res.ok) throw new Error("Failed to toggle agent");
      return res.json();
    },
    onSuccess: () => {
      setIsEnabled(!isEnabled);
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      onUpdate?.();
      toast({
        title: isEnabled ? "Agent disabled" : "Agent enabled",
        description: `${agent.name} has been ${isEnabled ? "disabled" : "enabled"}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to toggle agent status",
        variant: "destructive",
      });
    },
  });

  const { data: availableUpdates } = useQuery({
    queryKey: ["agentUpdates"],
    queryFn: () => fetch("/api/agents/updates").then(res => res.json()),
    refetchInterval: 300000 // Check for updates every 5 minutes
  });

  const hasUpdate = availableUpdates?.some(
    (update: any) => update.installId === agent.installId
  );

  const updateInfo = availableUpdates?.find(
    (update: any) => update.installId === agent.installId
  );

  const updateAgent = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/agents/${agent.id}/update`, {
        method: "POST",
      });
      if (!res.ok) throw new Error("Failed to update agent");
      return res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["agents"] });
      queryClient.invalidateQueries({ queryKey: ["agentUpdates"] });
      onUpdate?.();
      toast({
        title: "Success",
        description: `${agent.name} has been ${data.justUpdated ? 'updated to' : 'is already on'} version ${data.version}`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update agent",
        variant: "destructive",
      });
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{agent.name}</CardTitle>
            <CardDescription>{agent.description}</CardDescription>
          </div>
          <Badge variant={agent.status === "verified" ? "default" : "secondary"}>
            {agent.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Agent Status</h4>
            <p className="text-sm text-muted-foreground">
              Enable or disable this agent
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            className={isEnabled ? "text-primary" : "text-muted-foreground"}
            onClick={() => toggleAgent.mutate()}
            disabled={toggleAgent.isPending}
          >
            {toggleAgent.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Power className="h-4 w-4" />
            )}
          </Button>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Auto Updates</h4>
            <p className="text-sm text-muted-foreground">
              Automatically update when new versions are available
            </p>
          </div>
          <Switch
            checked={autoUpdate}
            onCheckedChange={setAutoUpdate}
            aria-label="Auto update"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-sm font-medium">Version Control</h4>
            <p className="text-sm text-muted-foreground">
              {hasUpdate 
                ? `Update available: v${updateInfo?.currentVersion} → v${updateInfo?.latestVersion}`
                : `Current version: ${agent.version || '1.0.0'}`
              }
            </p>
          </div>
          <Button
            variant={hasUpdate ? "default" : "outline"}
            onClick={() => updateAgent.mutate()}
            disabled={updateAgent.isPending}
          >
            {updateAgent.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            {hasUpdate ? "Update Available" : "Check for Updates"}
          </Button>
        </div>

        <div className="rounded-lg border p-4">
          <h4 className="mb-2 text-sm font-medium">Capabilities</h4>
          <div className="flex flex-wrap gap-2">
            {agent.capabilities?.map((capability) => (
              <Badge key={capability} variant="outline">
                {capability}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}