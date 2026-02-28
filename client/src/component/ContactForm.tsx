import { useForm } from "react-hook-form";
import { useState } from "react";
import classNames from "classnames";
import axios from "axios";
import ErrorDisplay from "./ErrorDisplay";
import { TErrorMessage } from "../types";

type TContactForm = {
  name: string,
  email: string,
  text: string
}

type TProps = {
  className?: string
  messageSentSuccessfully: () => void
}

export default function ContactForm({className, messageSentSuccessfully}: TProps) {
  
  const [errorsResponse, setErrorsResponse] = useState<TErrorMessage[]>([])

  const { 
    register,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting } 
  } = useForm<TContactForm>({
    defaultValues: {
      name: "",
      email: "",
      text: "",
    },
  });

  const onSubmit = async (data: TContactForm) => {

    // Clear errors
    setErrorsResponse([]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACK_HOST}/api/v1/contact`, 
        data
      )

      if (response.status >= 200 && response.status < 300) {
        reset()
        messageSentSuccessfully()
      } else {
        const serverErrors = response.data.errors || [];
        const formattedErrors: TErrorMessage[] = serverErrors.map((err: any) => ({
          field: err.field || 'unknown',
          message: err.message || err.msg || 'Unknown error occurred'
        }));
        setErrorsResponse(formattedErrors)
      }

    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          const serverErrors = error.response.data.errors || [];
          const formattedErrors: TErrorMessage[] = serverErrors.map((err: any) => ({
            field: err.field || 'unknown',
            message: err.message || err.msg || 'Unknown error occurred'
          }));
          setErrorsResponse(formattedErrors)
        } else {
          setErrorsResponse([{
            message: error.response?.data?.message || 'Network error occurred'
          }]);
        }
      } else {
        console.log(error)
        setErrorsResponse([{
          message: 'An unexpected error occurred. Please try again.'
        }]);
      }
    }
  };

  return (
    <div className={className}>
      <form 
        className="flex flex-col gap-3" 
        onSubmit={handleSubmit(onSubmit)}
      >
        <ErrorDisplay errors={errorsResponse} />

        <div>
          <input
            type="text"
            {...register("name", { required: true, maxLength: 64 })}
            className={classNames("block w-full p-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl text-base focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-800/50 focus:border-indigo-300/70 dark:focus:border-indigo-600/70 transition-all duration-200", {"border-red-400/70 dark:border-red-600/70 focus:border-red-500/70 dark:focus:border-red-500/70 focus:ring-red-200/50 dark:focus:ring-red-800/50": errors.name})}
            placeholder="Name (required)"
            disabled={isLoading || isSubmitting}
          />
        </div>

        <div>
          <input
            type="text"
            {...register("email", { 
              required: true, 
              maxLength: 64, 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
            })}
            className={classNames("block w-full p-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl text-base focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-800/50 focus:border-indigo-300/70 dark:focus:border-indigo-600/70 transition-all duration-200", {"border-red-400/70 dark:border-red-600/70 focus:border-red-500/70 dark:focus:border-red-500/70 focus:ring-red-200/50 dark:focus:ring-red-800/50": errors.email})}
            placeholder="Email (required)"
            disabled={isLoading || isSubmitting}
          />
        </div>

        <div>
          <textarea
            {...register("text", { required: true, maxLength: 4096 })}
            rows={4}
            className={classNames("block w-full p-3 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl text-base focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-800/50 focus:border-indigo-300/70 dark:focus:border-indigo-600/70 transition-all duration-200 resize-vertical", {"border-red-400/70 dark:border-red-600/70 focus:border-red-500/70 dark:focus:border-red-500/70 focus:ring-red-200/50 dark:focus:ring-red-800/50": errors.text})}
            placeholder="Write your thoughts here..."
            disabled={isLoading || isSubmitting}
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            className="w-full text-base font-bold rounded-xl px-5 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            disabled={isLoading || isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>
        </div>
        
      </form>
    </div>
  )
}