import { AddToCart } from "@/components/modules/medicine/addToCart";
import { Badge } from "@/components/ui/badge";
import { medicineService } from "@/services/medicine.service";

interface MedicineDetailsProps {
    id: string;
}

export default async function MedicineDetailsPage({
  params,
}: {params:Promise<MedicineDetailsProps>}) {
  const { id } =await params;

  const { data, error } = await medicineService.getMedicineById(id);

  if (error || !data) {
    return <p className="text-center text-red-500">Medicine not found</p>;
  }

  const price = Number(data.price);

  return (
    <section className="container mx-auto max-w-3xl px-6 py-12 space-y-6">
      <h1 className="text-3xl font-semibold">{data.title}</h1>

      <Badge variant="secondary">{data.categoryRef.category_name}</Badge>

      <div className="flex items-center gap-6">
        <p className="text-2xl font-bold">৳ {price}</p>

        <p className={data.stock > 0 ? "text-green-600" : "text-red-500"}>
          {data.stock > 0 ? `In stock (${data.stock})` : "Out of stock"}
        </p>
      </div>

      <p className="text-muted-foreground">{data.description}</p>

      <div className="text-sm space-y-1">
        <p>
          <strong>Manufacturer:</strong> {data.manufacturer}
        </p>
      </div>

      <AddToCart
        id={data.id}
        title={data.title}
        price={price}
        stock={data.stock}
        disabled={data.stock === 0}
      />
    </section>
  );
}
