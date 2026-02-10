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
    <section className="container mx-auto max-w-5xl px-6 py-12">
  <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
    {/* Image Section */}
    <div className="rounded-xl border bg-muted p-4">
      <img
        src={data.image}
        alt={data.title}
        className="mx-auto h-[360px] w-full rounded-lg object-contain"
      />
    </div>

    {/* Details Section */}
    <div className="flex flex-col gap-5">
      {/* Category */}
      <Badge className="w-fit bg-[#FF3F9A] text-white">
        {data.categoryRef.category_name}
      </Badge>

      {/* Title */}
      <h1 className="text-3xl font-semibold leading-tight">
        {data.title}
      </h1>

      {/* Manufacturer */}
      <p className="text-sm text-muted-foreground">
        Manufactured by <span className="font-medium text-foreground">
          {data.manufacturer}
        </span>
      </p>

      {/* Price + Stock */}
      <div className="flex flex-wrap items-center gap-6">
        <p className="text-3xl font-bold text-primary">
          ৳ {price}
        </p>

        <span
          className={`rounded-md px-3 py-1 text-sm font-medium ${
            data.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {data.stock > 0
            ? `In Stock (${data.stock})`
            : "Out of Stock"}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {data.description}
      </p>

      {/* Action */}
      <div className="pt-4">
        <AddToCart
          id={data.id}
          title={data.title}
          price={price}
          stock={data.stock}
          disabled={data.stock === 0}
        />
      </div>
    </div>
  </div>
</section>

  );
}
