"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Props = {
  orderId: string;
  status: string;
};

export function CancelOrderButton({ orderId, status }: Props) {
  const handleCancel = async () => {
    if (status !== "PLACED") {
      toast.error(`Current status "${status}" cannot be cancelled. Only PLACED orders can be cancelled.`,
      );
      return;
    }

    console.log("CANCEL ORDER ID:", orderId);
    //server action api call to cancel order

    // এখানে future এ API call যাবে
    // await cancelOrder(orderId)
  };

  return (
    <Button variant="destructive" className="w-full" onClick={handleCancel}>
      Cancel Order
    </Button>
  );
}
