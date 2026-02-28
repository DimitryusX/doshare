import { useForm } from "react-hook-form";
import TableUploadRow from "../../component/TableUploadRow";
import Dropzone from "../../component/Dropzone";
import ErrorDisplay from "../../component/ErrorDisplay";
import UploadProgressOverlay from "../../component/UploadProgressOverlay";
import Refresh from "../../component/Refresh";
import Close from "../../component/Close";
import { TFormData, TErrorMessage } from "../../types";
import axios from "axios";
import { useImperativeHandle, useRef, useState } from "react";
import useAutosizeTextArea from "../../component/AutoResizeTextArea";
import { Helmet } from "react-helmet-async";
import Checkbox from "../../component/Checkbox";

export default function CreatePage() {

  const { 
    register,
    handleSubmit, 
    control, 
    watch, 
    getValues, 
    setValue, 
    formState: { isLoading, isSubmitting } 
  } = useForm<TFormData>({
    defaultValues: {
      time: "30",
      password: "",
      content: "",
      isCode: true,
      files: [],
    },
  });

  const [progress, setProgress] = useState<number>(0)
  const [errors, setErrors] = useState<TErrorMessage[]>([])
  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [isServerProcessing, setIsServerProcessing] = useState<boolean>(false)

  const onSubmit = async (data: TFormData) => {
    setIsProcessing(true)
    setIsServerProcessing(false)
    setProgress(0)
    setErrors([]) // Clear previous errors
    
    const formData = new FormData()

    if (data.password) {
      formData.append('password', data.password)
    }

    if (data.content) {
      formData.append('content', data.content)
    }

    for(let i = 0; i < data.files.length; i++) {
      formData.append('files', data.files[i])
    }

    formData.append('isCode', data.isCode ? '1' : '0' )
    formData.append('time', data.time)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BACK_HOST}/api/v1/store`, 
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
            'Accept-Encoding': 'UTF-8'
          },
          onUploadProgress: (event) => {
            const uploadProgress = Math.round(100 * event.loaded) / (event.total || 1);
            setProgress(uploadProgress);
            
            // When upload is complete, show processing phase
            if (uploadProgress >= 100) {
              setIsServerProcessing(true);
            }
          }
        },
      )

      if (response.status >= 200 && response.status < 300 && response.data.alias) {
        window.location.href = `/${response.data.alias}`;
      }

    } catch (error: any) {
      setIsProcessing(false)
      setIsServerProcessing(false)

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          // Handle validation errors from server
          const serverResponse = error.response.data;
          if (serverResponse.errors && Array.isArray(serverResponse.errors)) {
            // Convert server error format to our client format
            const formattedErrors: TErrorMessage[] = serverResponse.errors.map((err: any) => ({
              field: err.field || 'unknown',
              message: err.message || err.msg || 'Unknown error occurred'
            }));
            setErrors(formattedErrors);
          } else {
            // Fallback for old error format
            setErrors([{
              message: serverResponse.message || 'Validation error occurred'
            }]);
          }
        } else {
          // Handle other HTTP errors
          const errorMessage = error.response?.data?.message || error.message || 'Network error occurred';
          setErrors([{
            message: errorMessage
          }]);
        }
      } else {
        // Handle non-axios errors
        console.error(error);
        setErrors([{
          message: 'An unexpected error occurred. Please try again.'
        }]);
      }
    }
  };

  const watchUploadFiles = watch("files", []);
  const watchPasswordValue = watch("password", "");

  const limit: number = parseInt(import.meta.env.VITE_APP_FILES_LIMIT!);
  const textLimit: number = parseInt(import.meta.env.VITE_APP_TEXT_LIMIT!);

  const handeRemoveFile = (index: number) => {
    const files = getValues('files');
    setValue('files', files.filter((_, i) => i !== index))
  }

  const watchContentValue = watch("content", '');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, watchContentValue);

  const { ref, ...registerFormContent } = register("content", { required: false, maxLength: textLimit })

  useImperativeHandle(ref, () => textAreaRef.current)

  const times = [
    {
      label: '5 mins',
      value: 5
    },
    {
      label: '15 mins',
      value: 15
    },
    {
      label: '30 mins',
      value: 30
    },
    {
      label: '1 hour',
      value: 60
    },
    {
      label: '3 hours',
      value: 180
    },
  ]

  // Function to generate a random 4-character password
  function generatePassword(length = 4) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  return (
    <>
      <Helmet>
        <title>DO Share | Create new store</title>
        <meta name="description" content="Easily upload files and add text on this page. Create a unique link to share your content securely and temporarily. Quick and straightforward process with a user-friendly interface." />
      </Helmet>

      <div className="relative">
        <UploadProgressOverlay 
          isVisible={isProcessing || isSubmitting}
          isServerProcessing={isServerProcessing}
          progress={progress}
        />

        <div className="py-0">
          <form onSubmit={handleSubmit(onSubmit)} acceptCharset="UTF-8">
            <div className="max-w-2xl mx-auto space-y-5">

              <ErrorDisplay errors={errors} />

              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6 space-y-6">
                
                {/* Time and Code syntax in one row (always) */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <select
                        {...register("time")}
                        className="block w-full px-4 py-3 pl-10 text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-800 border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-800/50 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600 appearance-none cursor-pointer font-medium"
                        disabled={isLoading || isSubmitting}
                      >
                        {times.map((time, index) => (
                          <option key={index} value={time.value} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-2">
                            {time.label}
                          </option>
                        ))}
                      </select>
                      {/* Time icon */}
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-lg">⏰</span>
                      </div>
                      {/* Custom dropdown arrow */}
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <div className="p-1 rounded-md bg-indigo-500 dark:bg-indigo-600">
                          <svg 
                            className="w-4 h-4 text-white" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="h-[52px] flex items-center justify-center">
                      <Checkbox
                        label={'💻 Code'}
                        control={control}
                        name="isCode"
                        disabled={isLoading || isSubmitting}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Content</label>
                    <div className={`text-sm ${watchContentValue.length > textLimit ? 'text-red-500 dark:text-red-400 font-medium' : 'text-slate-500 dark:text-slate-400'}`}>
                      <div>{watchContentValue.length} / {textLimit.toLocaleString()} characters</div>
                      {watchContentValue.length > textLimit && (
                        <div className="text-xs text-red-600 dark:text-red-400 mt-1">
                          Character limit exceeded by {(watchContentValue.length - textLimit).toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <textarea
                    {...registerFormContent}
                    ref={textAreaRef}
                    rows={5}
                    style={{ minHeight: '120px' }}
                    className={`block px-4 py-3 w-full text-slate-900 dark:text-slate-100 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border-2 transition-all duration-300 resize-none ${
                      watchContentValue.length > textLimit 
                        ? 'border-red-400 dark:border-red-600 focus:border-red-500 dark:focus:border-red-500 focus:ring-4 focus:ring-red-500/20 dark:focus:ring-red-800/50' 
                        : 'border-indigo-200/50 dark:border-slate-700 focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-800/50 hover:border-indigo-300 dark:hover:border-indigo-600'
                    } focus:outline-none`}
                    placeholder="Share text, code snippets, notes, links, or any content..."
                    disabled={isLoading || isSubmitting}
                  ></textarea>
                </div>

                <Dropzone 
                  control={control} 
                  disabled={isLoading || isSubmitting} 
                  limit={limit}
                />
              </div>

              {watchUploadFiles.length > 0 && (
                <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm overflow-hidden shadow-lg shadow-indigo-500/10 dark:shadow-indigo-950/50">
                  <table className="w-full text-sm text-left text-slate-600 dark:text-slate-300">
                    <thead className="text-xs bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/50 dark:to-purple-900/50 border-b border-indigo-200/30 dark:border-slate-700">
                      <tr>
                        <th scope="col" className="px-5 py-3 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                          📁 Files
                        </th>
                        <th scope="col" className="px-5 py-3 text-end font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {watchUploadFiles.map((file, index) => {
                        return (
                          <TableUploadRow
                            key={index}
                            title={file.name}
                            size={file.size}
                            disabled={isLoading || isSubmitting}
                            remove={() => handeRemoveFile(index)}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Password section after Dropzone */}
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-5">
                <div className="relative">
                  <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                    🔒 Password Protection (optional)
                  </label>
                  <input
                    type="text"
                    {...register("password", { required: false, maxLength: 64 })}
                    className="block w-full px-4 py-3 text-slate-900 dark:text-slate-100 border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-base focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-800/50 focus:outline-none transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-600"
                    placeholder="Enter password"
                    disabled={isLoading || isSubmitting}
                  />
                  {/* Generate password button */}
                  <button
                    type="button"
                    title="Generate random password"
                    className="absolute right-3 top-9 p-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-100 hover:to-purple-100 dark:hover:from-indigo-900/50 dark:hover:to-purple-900/50 transition-all duration-300"
                    onClick={() => setValue("password", generatePassword())}
                    disabled={isLoading || isSubmitting}
                    tabIndex={-1}
                  >
                    <Refresh className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                  </button>
                  {/* Clear password button */}
                  {watchPasswordValue && !isLoading && !isSubmitting && (
                    <button
                      type="button"
                      title="Clear password"
                      className="absolute right-11 top-9 p-2 rounded-lg hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/50 dark:hover:to-pink-900/50 transition-all duration-300"
                      onClick={() => setValue("password", "")}
                      tabIndex={-1}
                    >
                      <Close className="w-5 h-5 text-red-500 dark:text-red-400" />
                    </button>
                  )}
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Add a password to protect access to your shared content
                  </p>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  id="create-store-submit-button"
                  className={`w-full px-6 py-4 text-lg font-bold rounded-xl text-white text-center transition-all duration-300 transform ${
                    watchContentValue.length > textLimit || isLoading || isSubmitting
                      ? 'bg-slate-400 dark:bg-slate-600 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 active:from-indigo-800 active:via-purple-800 active:to-cyan-800 dark:active:from-indigo-700 dark:active:via-purple-700 dark:active:to-cyan-700 shadow-2xl hover:shadow-indigo-500/30 dark:hover:shadow-indigo-900/50 hover:scale-[1.02] hover:-translate-y-1'
                  }`}
                  disabled={watchContentValue.length > textLimit || isLoading || isSubmitting}
                >
                  <span className="relative z-10">
                    {watchContentValue.length > textLimit ? 'TEXT LIMIT EXCEEDED' : 'Create Store'}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}
