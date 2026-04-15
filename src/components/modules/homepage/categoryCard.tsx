import Link from "next/link";
import Image from "next/image";

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
          <Image src={icon} alt={name} width={40} height={40} className="object-contain" />
        </div>
      </div>
    </Link>
  );
}
