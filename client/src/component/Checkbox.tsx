import { Control, Controller } from "react-hook-form";
import { TFormData } from "../types";

type TProps = {
  control: Control<TFormData>;
  name: keyof TFormData;
  label: string;
  disabled?: boolean;
};

export default function Checkbox({ control, name, label, disabled }: TProps) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <input
              type="checkbox"
              id={`checkbox-${name}`}
              className="hidden peer"
              checked={!!field.value}
              disabled={disabled}
              onChange={(e) => field.onChange(e.target.checked)}
              ref={field.ref}
            />
            <label
              htmlFor={`checkbox-${name}`}
              className={`inline-flex items-center justify-center gap-2 px-3 py-3 text-sm font-semibold text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                field.value 
                  ? 'border-indigo-400 dark:border-indigo-500 bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-600 dark:to-purple-600 text-white shadow-lg shadow-indigo-500/25 dark:shadow-indigo-900/50' 
                  : 'text-slate-600 dark:text-slate-300 border-indigo-200/50 dark:border-slate-700 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 hover:border-indigo-300 dark:hover:border-indigo-600'
              }`}
            >
              {/* Toggle switch visual */}
              <div className={`relative w-11 h-6 rounded-full transition-all duration-300 ${
                field.value ? 'bg-white/30 dark:bg-white/20' : 'bg-slate-400 dark:bg-slate-600'
              }`}>
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                  field.value ? 'translate-x-5' : 'translate-x-0.5'
                }`}>
                  {/* Icon inside the toggle */}
                  <div className="flex items-center justify-center w-full h-full">
                    {field.value ? (
                      <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-3 h-3 text-slate-400 dark:text-slate-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Just the label, no ON/OFF */}
              <span className="leading-tight">{label}</span>
            </label>
          </>
        )}
      />
    </div>
  );
}