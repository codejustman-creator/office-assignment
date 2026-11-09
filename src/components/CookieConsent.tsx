import { useEffect, useState } from "react";

type CookiePreferences = {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
};
export function getCookiePreferences():
  CookiePreferences | null {
  try {
    const saved = localStorage.getItem("cookie-consent");

    return saved ? JSON.parse(saved) as CookiePreferences : null;
  } catch {
    return null;
  }
}

// Example:
const consent = getCookiePreferences();

if (consent?.analytics) {
  // Initialize your analytics provider here.
}

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = "cookie-consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [customizing, setCustomizing] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) === null);
    } catch {
      setVisible(true);
    }
  }, []);

  function saveConsent(value: CookiePreferences) {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(value)
      );
    } catch {
      // Consent persistence may be unavailable.
    }

    setPreferences(value);
    setVisible(false);
    setCustomizing(false);

    window.dispatchEvent(
      new CustomEvent("cookie-consent-updated", {
        detail: value,
      })
    );
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-describedby="cookie-description"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl
                 rounded-2xl border border-gray-200 bg-white p-6
                 text-gray-900 shadow-2xl"
    >
      <h2 className="text-xl font-bold">
        Your privacy matters 🍪
      </h2>

      <p
        id="cookie-description"
        className="mt-2 text-sm leading-6 text-gray-600"
      >
        We use necessary storage to keep our website working.
        With your permission, we may also use analytics and
        marketing technologies. You can change your choices
        at any time.
      </p>

      {customizing && (
        <div className="my-4 space-y-3">
          {(
            [
              ["necessary", "Necessary", true],
              ["analytics", "Analytics", false],
              ["marketing", "Marketing", false],
            ] as const
          ).map(([key, label, required]) => (
            <label
              key={key}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <span>
                {label}
                {required && (
                  <span className="ml-2 text-gray-500">
                    (always on)
                  </span>
                )}
              </span>

              <input
                type="checkbox"
                checked={preferences[key]}
                disabled={required}
                onChange={(event) =>
                  setPreferences((current) => ({
                    ...current,
                    [key]: event.target.checked,
                  }))
                }
              />
            </label>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        <button
          onClick={() =>
            saveConsent({
              necessary: true,
              analytics: true,
              marketing: true,
            })
          }
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm
                     font-semibold text-white hover:bg-blue-700"
        >
          Accept all
        </button>

        <button
          onClick={() => saveConsent(DEFAULT_PREFERENCES)}
          className="rounded-lg border border-gray-300 px-4 py-2
                     text-sm hover:bg-gray-100"
        >
          Reject optional
        </button>

        <button
          onClick={() => {
            if (customizing) {
              saveConsent(preferences);
            } else {
              setCustomizing(true);
            }
          }}
          className="rounded-lg border border-gray-300 px-4 py-2
                     text-sm hover:bg-gray-100"
        >
          {customizing ? "Save choices" : "Customize"}
        </button>
      </div>
    </div>
  );
}
