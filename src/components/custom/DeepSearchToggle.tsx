// src/components/custom/DeepSearchToggle.tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface DeepSearchToggleProps {
  isDeepSearch: boolean;
  onToggle: (checked: boolean) => void;
}

export function DeepSearchToggle({ isDeepSearch, onToggle }: DeepSearchToggleProps) {
  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="deep-search"
        checked={isDeepSearch}
        onCheckedChange={onToggle}
      />
      <Label htmlFor="deep-search">Deep Search</Label>
    </div>
  );
}