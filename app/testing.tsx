/**
 * Router - Testing Screen
 * Este es el punto de entrada del router de Expo
 * Delega toda la presentación a la View Component (TestingScreen)
 */

import { TestingScreen } from '@/src/views/TestingScreen';

export default function TestingScreenWrapper() {
  return <TestingScreen />;
}
