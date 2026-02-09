import { UpdateOrderStatusDialogue } from "@/components/modules/sellerDashboard/updateStatusDialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { orderService } from "@/services/order.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function OrderInvoice({ params }: PageProps) {
  const { id } = await params;

  if (!id) throw new Error("Order ID is required");

  const { data: order, error } = await orderService.getAdminOrderDetails(id);

  if (error || !order) notFound();

  return (
    <div className="max-w-5xl mx-auto py-10 space-y-8 bg-white">
      {/* ================= Invoice Header ================= */}
      <div className="flex justify-between items-start border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoice</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Invoice ID: {order.id}
          </p>
          <p className="text-sm text-muted-foreground">
            Issued on: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-3">{order.status}</div>
      </div>

      {/* ================= Billing / Shipping ================= */}
      <Card className="border-muted">
        <CardContent className="grid md:grid-cols-2 gap-8 p-6">
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Billed To
            </h3>
            <p className="font-medium">{order.userRef.name}</p>
            <p className="text-sm text-muted-foreground">
              {order.userRef.email}
            </p>
            {order.userRef.phone && (
              <p className="text-sm text-muted-foreground">
                {order.userRef.phone}
              </p>
            )}
          </div>

          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">
              Shipping Address
            </h3>
            <p className="text-sm">{order.address}</p>
          </div>
        </CardContent>
      </Card>

      {/* ================= Items Table ================= */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40">
                <TableHead>Item</TableHead>
                <TableHead>Manufacturer</TableHead>
                <TableHead className="text-center">Qty</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Line Total</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {order.orderItems.map((item, index) => {
                const price = Number(item.medicineRef.price);
                const total = price * item.quantity;

                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {item.medicineRef.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {item.medicineRef.manufacturer}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.quantity}
                    </TableCell>
                    <TableCell className="text-right">৳{price}</TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{total}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ================= Summary ================= */}
      <div className="flex justify-end">
        <Card className="w-full max-w-sm">
          <CardContent className="p-6 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>৳{order.totalAmount}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span>৳0</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>৳{order.totalAmount}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================= Footer Note ================= */}
      <p className="text-xs text-muted-foreground text-center pt-6">
        This is a system generated invoice and does not require a signature.
      </p>
    </div>
  );
}
