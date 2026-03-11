const WHATSAPP_NUMBER = "8048201272";
const DEFAULT_MESSAGE = "Hello, I am interested in your furniture from Ankur Handicraft.";

export const getWhatsAppUrl = (message: string = DEFAULT_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
