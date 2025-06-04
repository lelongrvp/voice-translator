import { Info, AlertCircle, Search, X } from "lucide-react";

interface STTInputSearchProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
}

export default function STTInputSearch({
  label,
  value,
  onChange,
  disabled = false,
  helperText,
  errorText,
}: STTInputSearchProps) {
  const baseBorder = errorText
    ? "border-red-500 focus:border-red-500"
    : "border-gray-300 focus:border-sky-500";

  return (
    <div className="w-full">
      <div className={`relative w-full flex items-center`}>
        {/* Search icon */}
        <span className="absolute left-3 text-gray-400">
          <Search size={18} />
        </span>

        <input
          type="text"
          id={`input-${label}`}
          placeholder={label}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-10 pr-10 py-2 rounded-xl border outline-none transition-all
            ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
            ${baseBorder}
          `}
        />

        {/* Clear (X) button */}
        {value.length > 0 && !disabled && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 text-gray-400 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Error or helper text */}
      {errorText ? (
        <div className="flex items-center text-sm text-red-600 mt-1">
          <AlertCircle className="w-4 h-4 mr-1" />
          {errorText}
        </div>
      ) : helperText ? (
        <div className="flex items-center text-sm text-gray-400 mt-1">
          <Info className="w-4 h-4 mr-1" />
          {helperText}
        </div>
      ) : null}
    </div>
  );
}
