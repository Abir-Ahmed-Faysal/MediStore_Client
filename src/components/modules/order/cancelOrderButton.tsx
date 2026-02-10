"use client";

import { updateUserOrderStatus } from "@/actions/updateUserOrderStatus";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  orderId: string;
  status: string;
};

export function CancelOrderButton({ orderId, status }: Props) {
  const handleCancel = async () => {
    if (status !== "PLACED") {
      toast.error(
        `Current status "${status}" cannot be cancelled. Only PLACED orders can be cancelled.`,
      );
      return;
    }

  

    try {
      await updateUserOrderStatus(orderId)
      toast.success("order cancelled");
    } catch (error) {
      toast.error("order cancel failed");
    }
  };

  return (
    <Button variant="destructive" className="w-full" onClick={handleCancel}>
      Cancel Order
    </Button>
  );
}
