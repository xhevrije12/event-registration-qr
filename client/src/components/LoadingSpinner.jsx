function LoadingSpinner({ text = 'Duke ngarkuar...' }) {
  return (
    <div className="flex flex-col justify-center items-center h-96 gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-2xl">
          🎬
        </div>
      </div>
      <p className="text-yellow-400 text-lg animate-pulse">{text}</p>
    </div>
  )
}

export default LoadingSpinner