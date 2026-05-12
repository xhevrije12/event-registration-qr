function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-gray-950 via-yellow-950/20 to-gray-950 border-b border-yellow-500/20 overflow-hidden">

      {/* Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent" />

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Text */}
          <div className="text-center md:text-left">
            <div className="inline-block bg-yellow-500/20 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full border border-yellow-500/30 mb-4">
              🎬 TANI NË EKRAN
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 leading-tight">
              Eksperienca e<br />
              <span className="text-yellow-400">Kinemasë Digjitale</span>
            </h2>
            <p className="text-gray-400 text-base md:text-lg mb-6 max-w-md">
              Rezervo biletën tënde online, merr QR kodin dhe hyr direkt — pa radhë, pa pritje!
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">✓</span> Rezervim i menjëhershëm
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">✓</span> Hyrje me QR kod
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <span className="text-green-400">✓</span> 100% Online
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="text-9xl animate-pulse">🎬</div>
              <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                LIVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner