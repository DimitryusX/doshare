interface UploadProgressOverlayProps {
  isVisible: boolean;
  isServerProcessing: boolean;
  progress: number;
}

export default function UploadProgressOverlay({ 
  isVisible, 
  isServerProcessing, 
  progress 
}: UploadProgressOverlayProps) {
  if (!isVisible) return null;

  return (
    <>
      <style>
        {`body { overflow: hidden !important; }`}
      </style>
      <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/95 via-purple-50/95 to-cyan-50/95 dark:from-slate-950/95 dark:via-indigo-950/95 dark:to-cyan-950/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/50 dark:from-slate-900 dark:via-indigo-900/30 dark:to-cyan-900/50 rounded-2xl shadow-xl shadow-indigo-500/20 dark:shadow-indigo-950/50 border border-indigo-200/30 dark:border-slate-700/30 backdrop-blur-sm p-6">
            {isServerProcessing ? (
              <div className="text-center">
                <div className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                  Processing files on server...
                </div>
                <div className="flex justify-center items-center mb-4">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-slate-300 dark:border-slate-700 border-t-indigo-600 dark:border-t-indigo-400"></div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Creating archive and preparing your files. Please wait...
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
                  {Math.round(progress)}%
                </div>
                <div className="w-full bg-gradient-to-r from-indigo-200 to-purple-200 dark:from-slate-700 dark:to-slate-600 rounded-full h-3 mb-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 dark:from-indigo-400 dark:via-purple-400 dark:to-cyan-400 h-3 rounded-full transition-all duration-300 shadow-lg" 
                    style={{ width: `${progress}%`}}
                  ></div>
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Uploading files...
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
