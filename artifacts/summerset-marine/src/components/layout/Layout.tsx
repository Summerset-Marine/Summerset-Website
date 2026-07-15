import { useEffect, type ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

const HUBSPOT_PORTAL_ID = import.meta.env.VITE_HUBSPOT_PORTAL_ID as
  | string
  | undefined;

/**
 * Loads the HubSpot tracking script once. It sets the `hubspotutk` cookie so
 * form submissions can be attributed to prior site visits.
 */
function useHubSpotTracking() {
  useEffect(() => {
    if (!HUBSPOT_PORTAL_ID) return;
    if (document.getElementById("hs-script-loader")) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.id = "hs-script-loader";
    script.async = true;
    script.defer = true;
    script.src = `//js.hs-scripts.com/${HUBSPOT_PORTAL_ID}.js`;
    document.head.appendChild(script);
  }, []);
}

export default function Layout({ children }: { children: ReactNode }) {
  useHubSpotTracking();
  return (
    <div className="flex min-h-screen flex-col bg-brand-offwhite">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
