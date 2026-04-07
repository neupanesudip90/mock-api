"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Copy, AlertTriangle } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface KeyRevealDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  apiKey: string;
  title?: string;
}

export function KeyRevealDialog({
  open,
  onOpenChange,
  apiKey,
  title = "Your API Key",
}: KeyRevealDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(apiKey);
      setCopied(true);
      toast({
        variant: "success",
        title: "Copied!",
        description: "API key copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please copy the key manually.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            {title}
          </DialogTitle>
          <DialogDescription>
            Copy this key now. You won't be able to see it again!
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Warning */}
          <div className="rounded-lg border border-warning/50 bg-warning/10 p-4">
            <p className="text-sm text-warning">
              This is the only time this key will be displayed. Store it
              securely and never share it publicly.
            </p>
          </div>

          {/* Key Display */}
          <div className="flex gap-2">
            <Input value={apiKey} readOnly className="font-mono text-sm" />
            <Button
              onClick={handleCopy}
              variant={copied ? "default" : "outline"}
              className="shrink-0 gap-2"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)} className="w-full">
            I've saved my key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
