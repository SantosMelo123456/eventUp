export function LoadingSpinner({ message = 'Carregando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-3" />
      <p>{message}</p>
    </div>
  );
}

export function AlertMessage({ type, message }) {
  if (!message) return null;

  const styles = {
    success: 'bg-green-50 border-green-400 text-green-800',
    error: 'bg-red-50 border-red-400 text-red-800',
  };

  const icons = { success: '✅', error: '❌' };

  return (
    <div className={`border-l-4 p-4 rounded-lg ${styles[type]}`}>
      <p className="font-medium">{icons[type]} {message}</p>
    </div>
  );
}