"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { AlertCircle } from "lucide-react";

interface SuspendUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  userEmail: string;
  userName: string;
  onSuspended?: () => void;
}

type SuspensionType = "temporary" | "permanent";

export function SuspendUserModal({
  isOpen,
  onClose,
  userId,
  userEmail,
  userName,
  onSuspended,
}: SuspendUserModalProps) {
  const [suspensionType, setSuspensionType] = useState<SuspensionType>("temporary");
  const [durationDays, setDurationDays] = useState<number>(7);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    // Validation
    if (!reason.trim()) {
      setError("Reason is required");
      return;
    }

    if (suspensionType === "temporary" && durationDays <= 0) {
      setError("Duration must be greater than 0 days");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await axios.post(`/api/user/${userId}/suspend`, {
        type: suspensionType,
        durationDays: suspensionType === "temporary" ? durationDays : undefined,
        reason: reason.trim(),
      });

      // Success - close modal and callback
      setReason("");
      setSuspensionType("temporary");
      setDurationDays(7);
      onClose();
      onSuspended?.();
    } catch (error: any) {
      const message = error.response?.data?.error || "Failed to suspend user";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            Suspend User
          </DialogTitle>
          <DialogDescription>
            Suspend {userName} ({userEmail}) from the platform
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Suspension Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Suspension Type</Label>
            <Select value={suspensionType} onValueChange={(v) => setSuspensionType(v as SuspensionType)}>
              <SelectTrigger id="type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temporary">Temporary</SelectItem>
                <SelectItem value="permanent">Permanent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Duration (shown only for temporary) */}
          {suspensionType === "temporary" && (
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (days)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                max="365"
                value={durationDays}
                onChange={(e) => setDurationDays(Math.max(1, parseInt(e.target.value) || 1))}
                placeholder="Number of days"
              />
              <p className="text-xs text-gray-500">
                User will be unsuspended after {durationDays} days
              </p>
            </div>
          )}

          {/* Reason */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Suspension</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this user is being suspended..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
            <p className="text-xs text-gray-500">
              This will be recorded in the audit log
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-yellow-600 hover:bg-yellow-700"
          >
            {loading ? "Suspending..." : "Suspend User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
