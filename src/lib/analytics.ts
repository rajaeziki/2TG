type Gtag = (command: "event", name: string, params?: Record<string, string | number>) => void;

// No-op unless Google Analytics is configured (NEXT_PUBLIC_GA_ID).
export function track(name: string, params?: Record<string, string | number>) {
  try {
    (window as unknown as { gtag?: Gtag }).gtag?.("event", name, params);
  } catch {}
}
