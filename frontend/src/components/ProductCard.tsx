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
  oldPrice: number;
  price?: number;
  dimensions?: string;
  isFeatured?: boolean;
}

const ProductCard = ({ _id, image, name, description, material, dimensions, oldPrice, price, isFeatured }: ProductCardProps) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="group bg-card/60 rounded-lg overflow-hidden shadow-soft hover:shadow-card transition-shadow duration-300 max-w-sm mx-auto w-full border border-black/40 backdrop-blur-lg">
        <div style={{ backgroundImage: `url(${image})` }} className="aspect-[4/2] bg-center bg-fit overflow-hidden relative">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />
          <img
            src={image}
            alt={name}
            className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-heading text-xl text-center bg-primary rounded-lg py-1 font-semibold text-white mb-1">{name}</h3>
          {(material || dimensions || price) && (
            <div className="text-[13px] bg-primary/5 border border-primary/10 rounded-md p-2.5 mb-4 grid grid-cols-2 gap-2">
              {price &&
                <div className="col-span-1 border-primary/10">
                  <p className="text-primary font-bold text-sm">
                    Price
                  </p>
                  <span className="font-bold text-sm">
                    <span className="line-through text-gray-500">{oldPrice !== 0 ? oldPrice?.toLocaleString() : ""}</span>
                    <span className=" "> Rs {price.toLocaleString()}</span>
                  </span>
                </div>}
              {dimensions &&
                <div className="col-span-1">
                  <span className="text-primary/70 font-bold uppercase text-[10px] tracking-wider block">Dimensions</span>
                  <p className="text-foreground font-semibold truncate">{dimensions}</p>
                </div>}
              {material &&
                <div className="col-span-2">
                  <span className="text-primary/70 font-bold uppercase text-[10px] tracking-wider block">Material</span>
                  <p className="text-foreground font-semibold break-words overflow-clip text-wrap whitespace-nowrap">{material}</p>
                </div>}
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
