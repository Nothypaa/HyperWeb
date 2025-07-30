export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to HyperWeb
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A modern web application with a beautiful navigation bar
        </p>
        
        {/* Button Container */}
        <div className="flex items-center justify-center gap-3">
          <button className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-800 transition-colors">
            Sites réalisés
          </button>
          <button className="bg-white text-black px-5 py-2.5 rounded-full font-bold text-base hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 border border-gray-200 shadow-sm">
            See our plans
            <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
              <svg 
                width="13" 
                height="13" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </button>
        </div>
      </div>
      
      {/* Additional white space for scrolling */}
      <div className="h-screen"></div>
    </main>
  )
}