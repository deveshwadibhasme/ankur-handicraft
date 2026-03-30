import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useState } from "react";
import InquiryForm from "./InquiryForm";

interface ProductCardProps {
  _id: string;
  image: string;
  name: string;
  description: string;
  material?: string;
  category: string;
  price?: number;
  dimensions?: string;
  isFeatured?: boolean;
}

const ProductCard = ({ _id, image, name, description, material, dimensions, price, isFeatured }: ProductCardProps) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="group bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 max-w-sm mx-auto w-full border border-black/30">
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
          {(material || dimensions || price) && (
            <div className="text-[13px] bg-primary/5 border border-primary/10 rounded-md p-2.5 mb-4 grid grid-cols-2 gap-2">
              {material && <div className="col-span-1"><span className="text-primary/70 font-bold uppercase text-[10px] tracking-wider block">Material</span> <p className="text-foreground font-semibold truncate">{material}</p></div>}
              {dimensions && <div className="col-span-1"><span className="text-primary/70 font-bold uppercase text-[10px] tracking-wider block">Dimensions</span> <p className="text-foreground font-semibold truncate">{dimensions}</p></div>}
              {price && <div className="col-span-2 pt-1 border-t border-primary/10 mt-1"><p className="text-primary font-bold text-sm">Price : Rs {price.toLocaleString()}</p></div>}
            </div>
          )}
          <div className="flex gap-2">
            <a
              href={getWhatsAppUrl(`Hello, I am interested in "${name}" from Ankur Handicraft.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full text-center bg-whatsapp text-background text-xs font-medium px-2 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              WhatsApp Enquiry
            </a>
            <button
              onClick={() => setShowInquiry(true)}
              className="inline-block w-full text-center bg-primary text-primary-foreground text-xs font-medium px-2 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Send Inquiry Email
            </button>
          </div>
          <div className="mt-3">
            <p className={`text-muted-foreground text-xs leading-relaxed break-words whitespace-normal overflow-y-auto overflow-x-hidden max-h-20  ${!isExpanded ? "line-clamp-2" : ""}`}>
              {description}
            </p>
            {description.length > 60 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-primary text-[10px] font-bold uppercase tracking-wider mt-1 hover:underline"
              >
                {isExpanded ? "Show Less" : "Know More"}
              </button>
            )}
          </div>
        </div>
      </div>

      {showInquiry && (
        <InquiryForm
          productId={_id}
          productName={name}
          onClose={() => setShowInquiry(false)}
        />
      )}
    </>
  );
};

export default ProductCard;
