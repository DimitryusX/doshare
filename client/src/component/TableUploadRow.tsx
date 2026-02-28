import { formatBytes } from "../utils";
import Trash from "./Icon/Trash";

type TProps = {
  title: string;
  size: number;
  disabled: boolean;
  remove: () => void;
};

export default function TableUploadRow({ title, size, disabled, remove }: TProps) {
  return (
    <tr className="bg-gradient-to-r from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-900/30 border-b border-indigo-200/50 dark:border-slate-700 hover:from-indigo-50/50 hover:to-cyan-50/50 dark:hover:from-indigo-900/50 dark:hover:to-cyan-900/50 transition-all duration-200">
      <th scope="row" className="px-5 py-3 font-medium text-slate-900 dark:text-slate-100">
        <div className="font-semibold text-slate-800 dark:text-slate-200">{title}</div>
        <div className="font-normal text-slate-500 dark:text-slate-400 text-sm mt-1">{formatBytes(size)}</div>
      </th>
      <td className="px-5 py-3 text-end">
        <button 
          className="border border-red-200/50 dark:border-red-800/50 rounded-lg px-3 py-2 bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 hover:from-red-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-pink-700 text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-red-500/20 dark:shadow-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          type="button"
          disabled={disabled}
          onClick={remove}
        >
          <Trash className="text-white" />
        </button>
      </td>
    </tr>
  );
}
