import { Control, Controller } from "react-hook-form";
import { TFormData } from "../types";

type TProps = {
  control: Control<TFormData>;
  name: 'time';
  label: string;
  value: string;
  disabled: boolean;
};

export default function TimeBadge({ control, name, label, value, disabled }: TProps) {
  return (
    <div>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <input
            {...field}
            type="radio"
            id={`time-${value}`}
            value={value}
            className="hidden peer"
            checked={value === field.value}
            disabled={disabled}
          />
        )}
      />
      <label
        htmlFor={`time-${value}`}
        className="inline-flex items-center justify-center w-full p-3 text-sm font-semibold text-center bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-2 rounded-xl cursor-pointer text-slate-600 dark:text-slate-300 border-indigo-200/50 dark:border-slate-700 peer-checked:border-indigo-500 dark:peer-checked:border-indigo-400 peer-checked:bg-gradient-to-r peer-checked:from-indigo-500 peer-checked:to-purple-500 dark:peer-checked:from-indigo-600 dark:peer-checked:to-purple-600 hover:text-white peer-checked:text-white hover:bg-gradient-to-r hover:from-indigo-400 hover:to-purple-400 dark:hover:from-indigo-500 dark:hover:to-purple-500 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 transform hover:scale-[1.02]"
      >
        {label}
      </label>
    </div>
  );
}
