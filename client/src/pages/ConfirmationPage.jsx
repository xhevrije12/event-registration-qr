import { useLocation, useNavigate } from 'react-router-dom'
import { QRCodeCanvas } from 'qrcode.react'

function ConfirmationPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const booking = state?.booking

  if (!booking) {
    navigate('/')
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-10 animate-fade-in">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">🎉</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Rezervimi u Konfirmua!
        </h1>
        <p className="text-gray-400">
          Printo këtë faqe dhe shfaqe në hyrje të kinemасë
        </p>
      </div>

      {/* QR Kodi */}
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center mb-6 shadow-2xl shadow-yellow-500/10">
        <QRCodeCanvas
          value={booking.qrToken}
          size={250}
          level="H"
          includeMargin={true}
        />
        <p className="text-gray-500 text-sm mt-4 text-center font-medium">
          📱 Skano këtë kod në hyrje
        </p>
      </div>

      {/* Detajet */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-6 stagger-2 animate-fade-in">
        <h2 className="text-xl font-bold text-white mb-4 pb-3 border-b border-gray-800">
          🎫 Detajet e Biletës
        </h2>
        <div className="space-y-3">
          {[
            { label: 'Filmi', value: booking.movieTitle },
            { label: 'Emri', value: booking.customerName },
            { label: 'Email', value: booking.customerEmail },
            {
              label: 'Orari', value: `${new Date(booking.showtime).toLocaleDateString('sq-AL', {
                day: '2-digit', month: 'long'
              })} — ${new Date(booking.showtime).toLocaleTimeString('sq-AL', {
                hour: '2-digit', minute: '2-digit'
              })}`
            },
            { label: 'Vendet', value: booking.seats },
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center">
              <span className="text-gray-400">{item.label}:</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
          ))}
          <div className="flex justify-between items-center pt-3 border-t border-gray-800">
            <span className="text-gray-400 font-bold">Totali:</span>
            <span className="text-yellow-400 font-bold text-2xl">{booking.totalPrice}€</span>
          </div>
        </div>
      </div>

      {/* Butonat */}
      <div className="flex gap-3 stagger-3 animate-fade-in">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          ← Kthehu
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          🖨️ Printo Biletën
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPage