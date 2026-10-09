import { WHATSAPP_NUMBER } from '../data/travelData';

export function createWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

export function openWhatsApp(message: string): void {
  const url = createWhatsAppLink(message);
  window.open(url, '_blank', 'noopener,noreferrer');
}
