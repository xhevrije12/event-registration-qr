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
    <div className="max-w-2xl mx-auto px-6 py-10">

      {/* Sukses Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">
          Rezervimi u Konfirmua!
        </h1>
        <p className="text-gray-400">
          Printo këtë faqe dhe shfaqe në hyrje të kinemасë
        </p>
      </div>

      {/* QR Kodi */}
      <div className="bg-white rounded-2xl p-8 flex flex-col items-center mb-6">
        <QRCodeCanvas
          value={booking.qrToken}
          size={280}
          level="H"
          includeMargin={true}
        />
        <p className="text-gray-500 text-sm mt-4 text-center">
          Skano këtë kod në hyrje
        </p>
      </div>

      {/* Detajet e Biletës */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 mb-6">
        <h2 className="text-xl font-bold text-white mb-4">🎫 Detajet e Biletës</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400">Filmi:</span>
            <span className="text-white font-semibold">{booking.movieTitle}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Emri:</span>
            <span className="text-white">{booking.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Email:</span>
            <span className="text-white">{booking.customerEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Orari:</span>
            <span className="text-white">
              {new Date(booking.showtime).toLocaleDateString('sq-AL', {
                day: '2-digit', month: 'long'
              })} — {new Date(booking.showtime).toLocaleTimeString('sq-AL', {
                hour: '2-digit', minute: '2-digit'
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Vendet:</span>
            <span className="text-white">{booking.seats}</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between">
            <span className="text-gray-400 font-bold">Totali:</span>
            <span className="text-yellow-400 font-bold text-xl">{booking.totalPrice}€</span>
          </div>
        </div>
      </div>

      {/* Butonat */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate('/')}
          className="flex-1 bg-gray-800 text-white py-3 rounded-xl font-semibold hover:bg-gray-700 transition"
        >
          ← Kthehu te Filmat
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
        >
          🖨️ Printo Biletën
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPage