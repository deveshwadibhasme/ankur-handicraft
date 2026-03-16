const WHATSAPP_NUMBER = "919921899580";
const DEFAULT_MESSAGE = "Hello, I am interested in your metal craft from Ankur Handicraft.";

export const getWhatsAppUrl = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
