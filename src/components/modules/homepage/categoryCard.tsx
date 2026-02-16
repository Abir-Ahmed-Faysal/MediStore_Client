import Link from "next/link";

type CategoryCardProps = {
  name: string;
  icon: string;
};

export function CategoryCard({ name, icon }: CategoryCardProps) {
  return (
    <Link
      href={`/medicine?category=${name}`}
      className="text-sm text-muted-foreground"
    >
      <div className="flex items-center justify-between gap-4">
        {/* content div */}
        <div className="flex flex-col justify-between">
          <h1 className="text-lg font-semibold">{name}</h1>
          <h6 className="text-sm text-muted-foreground">see this →</h6>
        </div>

        {/* image div */}
        <div className="shrink-0">
          <img src={icon} alt={name} className="h-10 w-10 object-contain" />
        </div>
      </div>
    </Link>
  );
}
