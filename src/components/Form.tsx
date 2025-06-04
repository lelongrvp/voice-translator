import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

interface FormField {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
}

interface FormProps {
  fields: FormField[];
  initialData?: Record<string, unknown>;
  onSubmit: (data: Record<string, unknown>) => void;
  submitLabel: string;
}

function Form({ fields, initialData, onSubmit, submitLabel }: FormProps) {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700">
            {field.label}
          </label>
          {field.type === "select" ? (
            <select
              name={field.name}
              value={String(formData[field.name] || "")}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required={field.required}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={field.type || "text"}
              name={field.name}
              value={String(formData[field.name] || "")}
              onChange={handleChange}
              className="mt-1 block w-full border rounded p-2"
              required={field.required}
            />
          )}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </form>
  );
}

export default Form;
