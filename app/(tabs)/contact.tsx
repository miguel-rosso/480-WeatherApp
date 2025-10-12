/**
 * Screen - Formulario de Contacto
 * Este es el punto de entrada del router de Expo
 * Delega toda la presentación a la View Component (ContactScreen)
 */

import { ContactScreen } from '@/src/views/ContactScreen';

export default function ContactScreenWrapper() {
  return <ContactScreen />;
}
