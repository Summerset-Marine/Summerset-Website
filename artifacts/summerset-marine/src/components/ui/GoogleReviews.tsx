import { useEffect } from "react";
import ContentPlaceholder from "./ContentPlaceholder";

const WIDGET_ID = (
  (import.meta.env.VITE_ELFSIGHT_GOOGLE_REVIEWS_ID as string | undefined) ?? ""
).trim();

const ELFSIGHT_SCRIPT_SRC = "https://elfsightcdn.com/platform.js";
const ELFSIGHT_SCRIPT_ID = "elfsight-platform-script";

/**
 * True when the Google Reviews section should render at all:
 * always in dev (shows a placeholder when unconfigured), only when
 * VITE_ELFSIGHT_GOOGLE_REVIEWS_ID is set in production.
 */
export const googleReviewsEnabled = Boolean(WIDGET_ID) || import.meta.env.DEV;

/**
 * Google Reviews via Elfsight widget. Renders only when
 * VITE_ELFSIGHT_GOOGLE_REVIEWS_ID is set (the widget ID from the Elfsight
 * dashboard, e.g. "1a2b3c4d-...."). Loads the Elfsight platform script once.
 */
export function GoogleReviews({ className = "" }: { className?: string }) {
  useEffect(() => {
    if (!WIDGET_ID) return;
    if (
      document.getElementById(ELFSIGHT_SCRIPT_ID) ||
      document.querySelector(`script[src="${ELFSIGHT_SCRIPT_SRC}"]`)
    ) {
      return;
    }
    const script = document.createElement("script");
    script.id = ELFSIGHT_SCRIPT_ID;
    script.src = ELFSIGHT_SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  if (!WIDGET_ID) {
    if (import.meta.env.DEV) {
      return (
        <ContentPlaceholder
          label="Google Reviews widget (set VITE_ELFSIGHT_GOOGLE_REVIEWS_ID to the Elfsight Google Reviews widget ID)"
          className={className}
        />
      );
    }
    return null;
  }

  return <div className={`elfsight-app-${WIDGET_ID} ${className}`.trim()} />;
}
