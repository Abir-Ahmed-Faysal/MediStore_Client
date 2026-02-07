"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { OrderStatus as APIOrderStatus } from "@/types/sellerOrderDetails";

interface Props {
  id: string;
  status: APIOrderStatus;
}

export function UpdateOrderStatusDialogue({ id, status }: Props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [nextStatus, setNextStatus] = useState<APIOrderStatus>(status);

  const STATUS_OPTIONS: APIOrderStatus[] = [
    "PLACED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
  ];

  const handleUpdateStatus = async () => {
    if (nextStatus === status) {
      toast.info("Status is already set to this value");
      return;
    }

    // await orderService.updateOrderStatus(id, nextStatus)

    toast.success(`Order status updated to ${nextStatus}`);
    setOpen(false);
    router.refresh();
  };

  return (
    <>
      {/* Trigger */}
<Badge
  variant="outline"
  onClick={() => setOpen(true)}
  className="cursor-pointer px-3 py-1 text-sm hover:bg-muted"
>
  {status}
</Badge>


      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            {/* Header */}
            <h2 className="text-lg font-semibold mb-4">
              Change Order Status
            </h2>

            {/* Current status */}
            <div className="text-sm mb-4">
              Current status:
              <Badge variant="outline" className="ml-2">
                {status}
              </Badge>
            </div>

            {/* Select */}
            <div className="space-y-2 mb-4">
              <label className="block text-sm font-medium">
                Select new status
              </label>
              <select
                value={nextStatus}
                onChange={(e) =>
                  setNextStatus(e.target.value as APIOrderStatus)
                }
                className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Warning */}
            <div className="rounded-md border border-yellow-300 bg-yellow-50 p-3 text-sm text-yellow-800 mb-6">
              ⚠️ <strong>Warning:</strong> This process cannot be undone.
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateStatus}
                className="rounded-md bg-primary px-4 py-2 text-sm text-white"
              >
                Confirm Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
