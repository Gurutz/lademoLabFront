import type { InputHTMLAttributes } from "react"
import type { FieldError } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}


export const InputComponent = ({ label, error, ...props } : Props) => {
  return (
    <div className="flex flex-col gap-1 mb-4">
        <label htmlFor="input" className="text-sm font-medium text-gray-700 capitalize">{label}</label>
        <input 
            id="input"
            {...props}
            className={
                `border rounded-lg p-2 outline-none transition-all duration-300
                    ${
                        error
                            ? "border-red-500 focus:ring-2 focus:ring-red-200"
                            : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-black"
                    } ${props.className || ""}
                `
            }
        />
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
