type TProps = {
  errors: { field?: string; message: string }[];
};

const getErrorIcon = (field?: string) => {
  switch (field) {
    case 'files':
      return '📁';
    case 'content':
      return '📝';
    case 'time':
      return '⏰';
    default:
      return '⚠️';
  }
};

const getErrorTitle = (field?: string) => {
  switch (field) {
    case 'files':
      return 'File Upload Error';
    case 'content':
      return 'Text Content Error';
    case 'time':
      return 'Time Setting Error';
    default:
      return 'Error';
  }
};

export default function ErrorDisplay({ errors }: TProps) {
  if (errors.length === 0) return null;

  return (
    <div className="space-y-2">
      {errors.map((error, index) => (
        <div 
          key={index} 
          className="flex items-start gap-3 p-3 text-red-800 dark:text-red-300 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50" 
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5 text-lg">
            {getErrorIcon(error.field)}
          </div>
          <div className="flex-1">
            <div className="font-bold text-sm mb-1">
              {getErrorTitle(error.field)}
            </div>
            <div className="text-sm leading-relaxed">
              {error.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
