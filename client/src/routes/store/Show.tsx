import { useEffect, useState } from "react";
import Download from "../../component/Icon/Download";
import TableDownloadRow from "../../component/TableDownloadRow";
import { useParams } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';
import Counter from '../../component/Counter'
import Lock from './../../component/Icon/Lock'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import CodeBlock from "../../component/CodeBlock";

interface IStore {
  alias: string,
  hasPassword: false,
  title: string,
  content?: string,
  isCode?: boolean,
  time: number,
  hasArchive?: boolean,
  start: number,
  files: {
    _id: string,
    title: string,
    size: number
  }[]
}

interface IEncryptStore {
  alias: string,
  hasPassword: true,
  title: string,
  time: number,
  start: number,
  error?: string
}

export default function ShowPage() {

  const { slug } = useParams();

  if (!slug) {
    window.location.href = `/404`;
  }

  const [store, setStore] = useState<IStore | IEncryptStore>()
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const load = async () => {
    setIsLoading(true)

    let URL = `${import.meta.env.VITE_APP_BACK_HOST}/api/v1/store/${slug}`;

    if (!!password) {
      const params = new URLSearchParams({
        password
      });

      URL += `?${params}`
    }

    const response = await fetch(URL, {
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!response.ok && response.status !== 422) {
      window.location.href = `/404`;
    }

    const responseStore: IStore | IEncryptStore = await response.json();

    setStore({
      ...responseStore,
      time: responseStore.time || 0
    })

    setIsLoading(false)
  };

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  const downloadSingleFile = async (slug: string, fileId: string, filename: string) => {
    const url = `${import.meta.env.VITE_APP_BACK_HOST}/api/v1/store/${slug}/file/${fileId}`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      // Clear state after 2 seconds
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }

  const download = (slug: string) => {
    let url = `${import.meta.env.VITE_APP_BACK_HOST}/api/v1/store/${slug}/download`;

    if (!!password) {
      const params = new URLSearchParams({
        password
      });

      url += `?${params}`
    }

    const link = document.createElement('a');
    link.href = url;
    link.download = `${slug}.zip`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  return (
    <>
      <Helmet>
        <title>DO Share | Your content here</title>
      </Helmet>

      <div className="relative">
        {!!store && (
          <div className="max-w-4xl m-auto space-y-5">

            {store.hasPassword && !!store.error && (
              <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 border border-red-200 dark:border-red-800/50 rounded-xl shadow-lg" role="alert">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❌</span>
                  <div>
                    <span className="font-bold text-red-800 dark:text-red-300 text-lg">Error!</span>
                    <p className="text-red-700 dark:text-red-400">{store.error}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6">
              <div className="flex lg:flex-row flex-col gap-6">

                <div className="flex flex-col gap-4 flex-1">
                  <div className="relative">
                    <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                      🔗 Share Link
                    </label>
                    <div className="relative">
                      <div className="block w-full p-3 pr-16 text-slate-900 dark:text-slate-100 bg-gradient-to-r from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-900/50 backdrop-blur-sm border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl font-mono text-sm break-all">
                        {window.location.href}
                      </div>
                      <button
                        type="button"
                        className={`absolute right-2 top-2 bottom-2 px-3 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] ${
                          isCopied 
                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500' 
                            : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600'
                        }`}
                        onClick={copy}
                      >
                        {isCopied ? '✅ Copied!' : '📋 Copy'}
                      </button>
                    </div>
                  </div>

                  {store.start && store.time && (
                    <div className="text-center p-3 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-cyan-50/50 dark:from-indigo-900/50 dark:via-purple-900/50 dark:to-cyan-900/50 rounded-xl border border-indigo-200/30 dark:border-slate-700">
                      <p className="text-slate-700 dark:text-slate-200">
                        ⏰ Available: <strong className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                          <Counter start={store.start} time={store.time} />
                        </strong>
                      </p>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-center items-start">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-indigo-200/50 dark:border-slate-700">
                    <QRCodeSVG value={window.location.href} size={128} />
                  </div>
                </div>
              </div>
            </div>

            {store.hasPassword && (
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-5">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                      🔐 Enter Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full p-3 text-slate-900 dark:text-slate-100 bg-gradient-to-r from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-900/50 backdrop-blur-sm border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl text-base focus:ring-4 focus:ring-indigo-200/50 dark:focus:ring-indigo-800/50 focus:border-indigo-300/70 dark:focus:border-indigo-500 transition-all duration-200"
                      placeholder="Password"
                      disabled={isLoading}
                    />
                  </div>

                  <button 
                    type="button" 
                    className="border border-indigo-200/50 dark:border-slate-700 text-base font-bold rounded-xl px-3 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white flex items-center justify-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/50"
                    onClick={() => load()}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    ) : (
                      <Lock />
                    )}
                  </button>
                </div>
              </div>
            )}

            {!store.hasPassword && !!store.content && (
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm p-6">
                <label className="block text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                  Content
                </label>
                <div 
                  className="from-white to-indigo-50/50 dark:from-slate-900 dark:to-indigo-900/50 backdrop-blur-sm border-2 border-indigo-200/50 dark:border-slate-700 rounded-xl text-slate-700 dark:text-slate-200"
                >
                  {store.isCode && (
                    <CodeBlock
                      code={store.content}
                    />
                  )}

                  {!store.isCode && (
                    <div className="leading-relaxed p-4 whitespace-pre-wrap bg-white dark:bg-slate-800 rounded-xl text-slate-700 dark:text-slate-100 font-mono text-sm">
                      {store.content}
                    </div>
                  )}
                </div>
              </div>
            )}

            {!store.hasPassword && store.files.length > 0 && (
              <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/10 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700 backdrop-blur-sm overflow-hidden">
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/50 dark:to-purple-900/50 border-b border-indigo-200/30 dark:border-slate-700">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                          📁 Files
                        </th>
                        <th scope="col" className="px-6 py-4 text-end font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {store.files.map((file, index) => {
                        return (
                          <TableDownloadRow
                            key={index} 
                            title={file.title} 
                            size={file.size} 
                            download={() => downloadSingleFile(store.alias, file._id, file.title)}
                          />
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              {!store.hasPassword && store.hasArchive && (
                <button 
                  type="button" 
                  className="w-full text-lg font-bold rounded-xl px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-500 dark:via-purple-500 dark:to-cyan-500 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 dark:hover:from-indigo-600 dark:hover:via-purple-600 dark:hover:to-cyan-600 text-white flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 dark:shadow-indigo-900/50"
                  onClick={() => download(store.alias)}
                >
                  Download ZIP
                  <Download />
                </button>
              )}

              <Link 
                to="/create" 
                className="w-full text-lg font-bold rounded-xl px-6 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-700 hover:via-purple-700 hover:to-cyan-700 text-white flex items-center justify-center gap-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-indigo-500/20 text-center"
              >
                Create new store
              </Link>
            </div>
            
          </div>
        )}
      </div>
    </>
    
  );
}
