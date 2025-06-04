import { Info } from "lucide-react";

interface STTInputTextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
  showToggle?: boolean;
}

export default function STTInputTextArea({
  label,
  value,
  onChange,
  disabled = false,
  helperText,
}: STTInputTextAreaProps) {
  return (
    <div className="relative w-full">
      <textarea
        rows={4}
        cols={50}
        id={`text-area-${label}`}
        placeholder=""
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full px-4 pt-5 pb-1 rounded-xl border outline-none transition-all
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
          border-gray-300 focus:border-sky-500
        `}
      />
      <label
        htmlFor={`text-area-${label}`}
        className={`
          absolute left-4 top-1 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400
          peer-focus:top-1 peer-focus:text-sm
          ${disabled ? "text-gray-400" : ""}
        `}
      >
        {label}
      </label>
      {helperText ? (
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <Info className="w-4 h-4 mr-1" />
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
