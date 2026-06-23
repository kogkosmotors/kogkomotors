import { Link } from "@tanstack/react-router";
import { Gauge, Fuel, Settings2, Calendar } from "lucide-react";
import type { SyntheticEvent } from "react";
import { type Vehicle, formatPrice, formatMileage } from "@/data/vehicles";
import { Badge } from "@/components/ui/badge";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    if (vehicle.fallbackImage && event.currentTarget.src !== vehicle.fallbackImage) {
      event.currentTarget.src = vehicle.fallbackImage;
    }
  };

  return (
    <Link
      to="/vehicle/$id"
      params={{ id: vehicle.id }}
      className="luxury-card group flex flex-col overflow-hidden rounded-xl"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={vehicle.mainImage}
          alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          width={1280}
          height={896}
          onError={handleImageError}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {vehicle.featured && (
          <Badge className="absolute left-3 top-3 bg-gold-gradient text-primary-foreground">Featured</Badge>
        )}
        {!vehicle.available && (
          <Badge className="absolute right-3 top-3 bg-destructive text-destructive-foreground">Sold</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-widest text-primary">{vehicle.make}</p>
        <h3 className="mt-1 font-display text-xl text-foreground">{vehicle.model}</h3>

        <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5 text-primary" /> {vehicle.year}</span>
          <span className="flex items-center gap-1.5"><Gauge className="h-3.5 w-3.5 text-primary" /> {formatMileage(vehicle.mileage)}</span>
          <span className="flex items-center gap-1.5"><Fuel className="h-3.5 w-3.5 text-primary" /> {vehicle.fuel}</span>
          <span className="flex items-center gap-1.5"><Settings2 className="h-3.5 w-3.5 text-primary" /> {vehicle.transmission}</span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
          <span className="text-gold-gradient text-xl font-semibold">{formatPrice(vehicle.price)}</span>
          <span className="text-xs font-medium text-primary transition-transform group-hover:translate-x-1">View →</span>
        </div>
      </div>
    </Link>
  );
}
