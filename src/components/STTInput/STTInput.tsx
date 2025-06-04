import { useState } from "react";
import { Eye, EyeClosed, Info, AlertCircle } from "lucide-react";

interface STTInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "password";
  disabled?: boolean;
  helperText?: string;
  errorText?: string;
  showToggle?: boolean;
}

export default function STTInput({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  helperText,
  errorText,
  showToggle = false,
}: STTInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === "password" && !showPassword ? "password" : "text";

  const baseBorder = errorText
    ? "border-red-500 focus:border-red-500"
    : "border-gray-300 focus:border-sky-500";

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        id={`input-${label}`}
        placeholder=""
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className={`peer w-full px-4 pt-5 pb-1 rounded-xl border outline-none transition-all text-[16px]
          ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}
          ${baseBorder}
        `}
      />
      <label
        htmlFor={`input-${label}`}
        className={`
          absolute left-4 top-1 text-sm text-gray-500 transition-all 
          peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base 
          peer-placeholder-shown:text-gray-400
          peer-focus:top-1 peer-focus:text-sm
          ${disabled ? "text-gray-400" : ""}
          ${errorText ? "text-red-500 peer-focus:text-red-500" : ""}
        `}
      >
        {label}
      </label>
      {showToggle && type === "password" && !disabled && (
        <button
          type="button"
          className="absolute right-3 top-4 text-gray-400"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
        </button>
      )}

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
