import { Control, Controller, FieldPathValue } from "react-hook-form";
import Upload from "./Icon/Upload";
import { TFormData } from "../types";
import { formatBytes } from "../utils";
import { useState } from "react";
import classNames from "classnames";

type TProps = {
  control: Control<TFormData>;
  disabled: boolean;
  limit: number;
};

export default function Dropzone({ control, disabled, limit }: TProps) {

  const [
    isActive, 
    setIsActive
  ] = useState<boolean>(false)

  const [
    droppedFilesTooLarge,
    setDroppedFilesTooLarge
  ] = useState<string[]>([])

  const handleInputChange = (values: FieldPathValue<TFormData, 'files'>, event: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {

    const files = values;
    let size = files.reduce((total: number, file: File) => total + file.size, 0);
    const skippedFiles: string[] = [];

    const length = event.target.files?.length;

    if (length) {
      for (let i = 0; i < length; i++) {
        const file = event.target.files?.item(i);

        if (file) {
          if (size + file.size > limit) {
            skippedFiles.push(file.name);
            continue;
          }

          size += file.size || 0;
          files.push(file);
        }
      }
    }

    const unique = files.filter((el, index) => {
      return files.findIndex(obj => obj.size === el.size && obj.name === el.name) === index
    }) 

    setDroppedFilesTooLarge(skippedFiles);
    onChange(unique);
  }

  const handleInputDrop = (values: FieldPathValue<TFormData, 'files'>, event: React.DragEvent<HTMLLabelElement>, onChange: (...event: any[]) => void) => {

    const files = values;
    let size = files.reduce((total: number, file: File) => total + file.size, 0);
    const skippedFiles: string[] = [];

    if (event.dataTransfer.items) {
      for (let i = 0; i < event.dataTransfer.items.length; i++) {

        const file = event.dataTransfer.items[i].getAsFile();

        if (file) {
          if (size + file.size > limit) {
            skippedFiles.push(file.name);
            continue;
          }
          
          size += file.size;
          files.push(file)
        }
      }
    } else {
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const file = event.dataTransfer.files[i];
        if (size + file.size > limit) {
          skippedFiles.push(file.name);
          continue;
        }
        
        size += file.size;
        files.push(file)
      }
    }

    const unique = files.filter((el, index) => {
      return files.findIndex(obj => obj.size === el.size && obj.name === el.name) === index
    })

    setDroppedFilesTooLarge(skippedFiles);
    onChange(unique);
  }

  return (
    <Controller
      control={control}
      name={"files"}
      render={({ field: { value, onChange, ...field } }) => {
        const currentSize = value.reduce((total: number, file: File) => total + file.size, 0);
        
        return (
          <div className="flex flex-col w-full">
            {droppedFilesTooLarge.length > 0 && (
              <div className="mb-2 p-3 bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <div className="text-yellow-600 dark:text-yellow-400 mt-0.5">⚠️</div>
                  <div>
                    <div className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Files skipped due to size limit
                    </div>
                    <div className="text-xs text-yellow-700 dark:text-yellow-400 mt-1">
                      The following files were not added because they would exceed the {formatBytes(limit)} total limit:
                    </div>
                    <ul className="text-xs text-yellow-700 dark:text-yellow-400 mt-1 ml-4 list-disc">
                      {droppedFilesTooLarge.map((fileName, index) => (
                        <li key={index}>{fileName}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center justify-center w-full">
              <label
              htmlFor="dropzone-file"
              className={classNames("flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-br from-indigo-50/50 to-cyan-50/50 dark:from-slate-900 dark:to-indigo-900/50 border-indigo-300/50 dark:border-slate-700 hover:from-indigo-100/50 hover:to-cyan-100/50 dark:hover:from-indigo-800/50 dark:hover:to-cyan-800/50 hover:border-indigo-400/70 dark:hover:border-indigo-600/70 backdrop-blur-sm", { "from-indigo-200/70 to-cyan-200/70 dark:from-indigo-700/70 dark:to-cyan-700/70 border-indigo-500/70 dark:border-indigo-500": isActive })}
              onDragEnter={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setIsActive(true)
              }}
              onDragOver={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setIsActive(true)
              }}
              onDragLeave={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setIsActive(false)
              }}
              onDrop={(event) => {
                event.preventDefault();
                event.stopPropagation();

                setIsActive(false)
                handleInputDrop(value, event, onChange)
              }}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload />
                <p className="mb-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">Click to upload</span>{' '}
                  <span className="text-slate-500 dark:text-slate-400">or drag and drop</span>
                </p>

                <p className="mb-2 text-xs text-slate-500 dark:text-slate-400">
                  Any file types allowed • Max total size: {formatBytes(limit)}
                </p>

                <div className="text-center">
                  <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-400 bg-clip-text text-transparent">
                    {formatBytes(currentSize)} / {formatBytes(limit)} ({Math.round((currentSize / limit) * 100)}%)
                  </p>
                </div>
              </div>

              <input 
                {...field} 
                id="dropzone-file" 
                type="file" 
                className="hidden" 
                multiple
                disabled={disabled}
                onChange={(event) => {
                  event.preventDefault();
                  handleInputChange(value, event, onChange)
                }} 
              />
            </label>
            </div>
          </div>
        );
      }}
    />
  );
}
