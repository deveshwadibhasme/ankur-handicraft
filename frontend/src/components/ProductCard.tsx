import { getWhatsAppUrl } from "@/lib/whatsapp";

interface ProductCardProps {
  image: string;
  name: string;
  description: string;
}

const ProductCard = ({ image, name, description }: ProductCardProps) => (
  <div className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300">
    <div className="aspect-square overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    </div>
    <div className="p-5">
      <h3 className="font-heading text-lg font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{description}</p>
      <a
        href={getWhatsAppUrl(`Hello, I am interested in "${name}" from Ankur Handicraft.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity"
      >
        Enquire on WhatsApp
      </a>
    </div>
  </div>
);

export default ProductCard;
