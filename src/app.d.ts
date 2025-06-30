// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    // interface Locals {}
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  
  // Extend Window interface to include dataLayer and gtag
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}


export {};
