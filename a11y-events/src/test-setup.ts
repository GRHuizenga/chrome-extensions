import { provideZonelessChangeDetection } from '@angular/core';

// Global test providers that should be available in all tests
export const globalTestProviders = [provideZonelessChangeDetection()];

// Helper to get providers for test configuration
export function getTestProviders(additionalProviders: any[] = []) {
  return [...globalTestProviders, ...additionalProviders];
}
