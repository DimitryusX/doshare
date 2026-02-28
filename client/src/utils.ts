export const downloadHtmlEvent = (blob: Blob, filename: string) => {
  // Create blob link to download
  const url = window.URL.createObjectURL(
    new Blob([blob]),
  );

  const link = document.createElement('a');

  link.href = url;
  link.setAttribute(
    'download',
    filename?.replace(/"/gm, '') || 'file.zip',
  );

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode?.removeChild(link);
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}