import { useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const SMC_PHONE_PLACEHOLDER = "[SMC_PHONE_PLACEHOLDER]";

type FormType = "consultation" | "contact" | "service-request";

interface ContactFormProps {
  formType: FormType;
  market?: string;
  lake?: string;
}

interface FieldDef {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

const TIMEFRAME_OPTIONS = ["This season", "Next season", "Planning ahead", "Not sure"];
const HEAR_ABOUT_OPTIONS = [
  "Neighbor or friend",
  "Google Search",
  "Social Media",
  "Saw an SMC project",
  "Other",
];
const SERVICE_TYPE_OPTIONS = [
  "Seasonal Install",
  "Seasonal Removal",
  "Repair",
  "Inspection",
  "Other",
];
const PREFERRED_TIME_OPTIONS = ["Morning", "Afternoon", "Either"];

const BASE_FIELDS: FieldDef[] = [
  { name: "name", label: "Name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel" },
];

const FIELDS_BY_TYPE: Record<FormType, FieldDef[]> = {
  consultation: [
    ...BASE_FIELDS,
    { name: "lake", label: "Property Lake or Location", type: "text" },
    { name: "market", label: "Market", type: "text" },
    {
      name: "projectDescription",
      label: "Tell us about your project",
      type: "textarea",
      required: true,
    },
    { name: "timeframe", label: "Timeframe", type: "select", options: TIMEFRAME_OPTIONS },
    {
      name: "hearAbout",
      label: "How did you hear about us?",
      type: "select",
      options: HEAR_ABOUT_OPTIONS,
    },
  ],
  contact: [
    ...BASE_FIELDS,
    { name: "message", label: "Message", type: "textarea", required: true },
  ],
  "service-request": [
    ...BASE_FIELDS,
    {
      name: "serviceType",
      label: "Service Type",
      type: "select",
      options: SERVICE_TYPE_OPTIONS,
    },
    {
      name: "equipmentDescription",
      label: "Describe your pier or lift",
      type: "textarea",
    },
    {
      name: "issueDescription",
      label: "Describe the issue or service needed",
      type: "textarea",
      required: true,
    },
    { name: "propertyLocation", label: "Property address or lake", type: "text" },
    {
      name: "preferredTime",
      label: "Preferred time",
      type: "select",
      options: PREFERRED_TIME_OPTIONS,
    },
  ],
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputBase =
  "w-full rounded-md border bg-white px-3.5 py-2.5 text-brand-navy outline-none transition focus:ring-2 focus:ring-brand-blue focus:border-brand-blue";
const inputOk = "border-[#D1D5DB]";
const inputError = "border-brand-red";

function Spinner() {
  return (
    <svg
      className="h-4 w-4 animate-spin"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-medium text-brand-navy">
      {children}
      {required ? <span className="text-brand-red"> *</span> : null}
    </label>
  );
}

export default function ContactForm({ formType, market, lake }: ContactFormProps) {
  // Market is pre-filled and hidden when passed as a prop; otherwise it
  // renders as a normal editable field (consultation form only).
  const fields = market
    ? FIELDS_BY_TYPE[formType].filter((f) => f.name !== "market")
    : FIELDS_BY_TYPE[formType];
  const [values, setValues] = useState<Record<string, string>>(() => ({
    ...(lake ? { lake } : {}),
    ...(market ? { market } : {}),
  }));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  function setValue(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setValue(e.target.name, e.target.value);
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    for (const field of fields) {
      const value = (values[field.name] ?? "").trim();
      if (field.required && !value) {
        next[field.name] = `${field.label} is required.`;
      } else if (field.name === "email" && value && !EMAIL_REGEX.test(value)) {
        next[field.name] = "Please enter a valid email address.";
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    try {
      const response = await fetch(`${import.meta.env.BASE_URL}api/submit-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType,
          ...values,
        }),
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-green-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 12l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 className="mt-4 font-serif text-2xl text-brand-navy">
          Thank you — we&apos;ll be in touch within one business day.
        </h3>
        <p className="mt-2 text-brand-navy/70">
          A member of the Summerset Marine team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {market ? <input type="hidden" name="market" value={market} /> : null}

      {fields.map((field) => {
        const value = values[field.name] ?? "";
        const error = errors[field.name];
        const borderClass = error ? inputError : inputOk;

        return (
          <div key={field.name}>
            <FieldLabel htmlFor={`cf-${field.name}`} required={field.required}>
              {field.label}
            </FieldLabel>

            {field.type === "textarea" ? (
              <textarea
                id={`cf-${field.name}`}
                name={field.name}
                rows={4}
                value={value}
                onChange={handleChange}
                className={`${inputBase} ${borderClass}`}
              />
            ) : field.type === "select" ? (
              <select
                id={`cf-${field.name}`}
                name={field.name}
                value={value}
                onChange={handleChange}
                className={`${inputBase} ${borderClass}`}
              >
                <option value="">Select…</option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id={`cf-${field.name}`}
                name={field.name}
                type={field.type}
                value={value}
                onChange={handleChange}
                className={`${inputBase} ${borderClass}`}
              />
            )}

            {error ? (
              <p className="mt-1 text-[13px] text-brand-red">{error}</p>
            ) : null}
          </div>
        );
      })}

      {status === "error" ? (
        <p className="rounded-md border border-brand-red/30 bg-brand-red/5 p-3 text-sm text-brand-red">
          Something went wrong. Please call us directly at{" "}
          <a
            href={`tel:${SMC_PHONE_PLACEHOLDER}`}
            className="font-semibold underline"
          >
            {SMC_PHONE_PLACEHOLDER}
          </a>
          .
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full bg-brand-red text-white border-brand-red hover:bg-brand-red/90"
      >
        {status === "submitting" ? (
          <>
            <Spinner />
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </Button>
    </form>
  );
}
