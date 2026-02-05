import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    error?: FieldError;
    rows?: number;
}


export const TextAreaComponent = ({ label, error, rows, ...props } : Props) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="input" className="text-sm font-medium text-gray-700 capitalize">{label}</label>
        <textarea
            id="input"
            {...props}
            rows={rows || 3}
            className={
                `border rounded-lg p-2 outline-none transition-all duration-300
                    ${
                        error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-black"
                    } ${props.className || ""}
                `
            }
        ></textarea>
        {
            error && (
                <span className="text-sm text-red-400 font-medium animate-pulse">
                    {error.message}
                </span>
            )
        }
    </div>
  )
}
