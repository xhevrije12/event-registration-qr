function NewsTicker({ movies = [] }) {
  const messages = movies.length > 0
    ? movies.map(m => `🎬 ${m.title} — ${m.availableSeats} vende të disponueshme`)
    : [
        '🎬 Mirë se vini në CineCloud!',
        '🎫 Rezervoni biletat tuaja online',
        '📱 Hyrja bëhet me QR kod',
        '🍿 Shijoni eksperiencën e kinemasë'
      ]

  const tickerText = messages.join('   •   ')

  return (
    <div className="bg-yellow-500 text-black py-2 overflow-hidden">
      <div className="flex">
        <div className="flex-shrink-0 bg-black text-yellow-400 font-bold px-4 py-0.5 text-sm z-10 flex items-center gap-1">
          📢 LAJME
        </div>
        <div className="overflow-hidden flex-1">
          <div
            className="whitespace-nowrap text-sm font-semibold"
            style={{
              animation: 'ticker 30s linear infinite',
            }}
          >
            {tickerText} &nbsp;&nbsp;&nbsp; {tickerText}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsTicker