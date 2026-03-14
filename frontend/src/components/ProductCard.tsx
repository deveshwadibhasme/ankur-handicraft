import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
  material?: string;
  category: string;
  price?: number;
  dimensions?: string;
  isFeatured?: boolean;
}

const ProductCard = ({ image, name, description, material, dimensions, price }: ProductCardProps) => (
  <div className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 max-w-sm mx-auto w-full">
    <div className="aspect-[4/2] overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-contain group-hover:scale-150 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-4">
      <h3 className="font-heading text-base font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-muted-foreground text-xs mb-3 leading-relaxed line-clamp-2">{description}</p>
      {(material || dimensions) && (
        <div className="text-[12px] text-muted-foreground mb-3">
          {material && <p><span className="font-medium text-foreground">Material:</span> {material}</p>}
          {dimensions && <p><span className="font-medium text-foreground">Dimensions:</span> {dimensions}</p>}
          {price && <p><span className="font-medium text-foreground">Price:</span> Rs {price}</p>}
        </div>
      )}
      <a
        href={getWhatsAppUrl(`Hello, I am interested in "${name}" from Ankur Handicraft.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full text-center bg-primary text-primary-foreground text-xs font-medium px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
      >
        Enquire on WhatsApp
      </a>
    </div>
  </div>
);

export default ProductCard;
