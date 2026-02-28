import { formatBytes } from "../utils";
import Download from "./Icon/Download";

type TProps = {
  title: string;
  size: number;
  download: () => void
};

export default function TableDownloadRow({ title, size, download }: TProps) {
  return (
    <tr className="bg-gradient-to-r from-white to-indigo-50/30 dark:from-slate-900 dark:to-indigo-900/30 border-b border-indigo-200/50 dark:border-slate-700 hover:from-indigo-50/50 hover:to-cyan-50/50 dark:hover:from-indigo-900/50 dark:hover:to-cyan-900/50 transition-all duration-200">
      <th 
        scope="row" 
        className="px-5 py-3 font-medium text-slate-900 dark:text-slate-100 text-wrap"
      >
        <div className="font-semibold text-slate-800 dark:text-slate-200">{title}</div>
        <div className="font-normal text-slate-500 dark:text-slate-400 text-sm mt-1">{formatBytes(size)}</div>
      </th>
      <td className="px-5 py-3 text-end">
        <button 
          type="button"
          className="border border-indigo-200/50 dark:border-indigo-700/50 rounded-lg px-3 py-2 bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/50"
          onClick={download}
        >
          <Download className="text-white" />
        </button>
      </td>
    </tr>
  );
}
