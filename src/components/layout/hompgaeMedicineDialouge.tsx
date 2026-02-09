import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MedicineResponse } from "@/services/medicine.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface MedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: MedicineResponse | null;
}

export function MedicineDialog({
  open,
  onOpenChange,
  data,
}: MedicineDialogProps) {
  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{data.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative w-full h-40">
            <img
              src={data.image}
              alt={data.title}
              // fill
              className="object-cover rounded-md"
              sizes="(max-width: 640px) 100vw, 400px"
            />
          </div>

          <p className="text-sm text-muted-foreground line-clamp-3">
            {data.description}
          </p>

          <div className="flex justify-between text-sm font-medium">
            <span>Price</span>
            <span>৳ {data.price}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Stock</span>
            <span>{data.stock}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Link onClick={() => onOpenChange(false)}
              href={`/medicine/${data.id}`}
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              See details
            </Link>

            <Button size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
