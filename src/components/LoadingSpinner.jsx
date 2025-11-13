const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="relative">
        <div className="spinner"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-5 border-primary border-t-transparent 
                        rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;