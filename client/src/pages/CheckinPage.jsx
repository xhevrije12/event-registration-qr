import { useState } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { checkIn } from '../services/api'

function CheckinPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    setLoading(true)
    setResult(null)

    const html5Qr = new Html5Qrcode('qr-reader-hidden')

    try {
      const decodedText = await html5Qr.scanFile(file, true)
      const res = await checkIn(decodedText)
      setResult({
        success: true,
        message: res.data.message,
        booking: res.data.booking
      })
    } catch (err) {
      setResult({
        success: false,
        message: err.response?.data?.message || '❌ QR i pavlefshëm!'
      })
    } finally {
      html5Qr.clear()
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-10">

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">📱 Staff Check-in</h1>
        <p className="text-gray-400">Ngarko screenshot-in e QR kodit</p>
      </div>

      {!result && (
        <label className={`block border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition
          ${loading
            ? 'border-yellow-500 bg-yellow-500/10'
            : 'border-gray-600 hover:border-yellow-500 hover:bg-gray-900'
          }`}>
          {loading ? (
            <div>
              <div className="text-5xl mb-4 animate-pulse">🔍</div>
              <p className="text-yellow-400 text-xl font-semibold">Duke skanuar QR...</p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">📸</div>
              <p className="text-white text-xl font-semibold mb-2">Ngarko QR Kodin</p>
              <p className="text-gray-500 text-sm mb-3">
                Kliko ose tërhiq imazhin e QR këtu
              </p>
              <span className="bg-blue-500/20 text-blue-400 border border-blue-500 px-3 py-1 rounded-full text-xs font-semibold">
                📸 PNG / JPG / Screenshot
              </span>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
            disabled={loading}
          />
        </label>
      )}

      {result && (
        <div className={`rounded-xl p-8 text-center border-2 ${
          result.success
            ? 'bg-green-900/50 border-green-500'
            : 'bg-red-900/50 border-red-500'
        }`}>
          <div className="text-6xl mb-4">{result.success ? '✅' : '❌'}</div>
          <p className="text-2xl font-bold text-white mb-4">{result.message}</p>

          {result.success && result.booking && (
            <div className="bg-black/30 rounded-lg p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Filmi:</span>
                <span className="text-white font-semibold">{result.booking.movieTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Emri:</span>
                <span className="text-white">{result.booking.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Vendet:</span>
                <span className="text-white">{result.booking.seats}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-2">
                <span className="text-gray-400 font-bold">Totali:</span>
                <span className="text-yellow-400 font-bold text-lg">{result.booking.totalPrice}€</span>
              </div>
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition"
          >
            Skano Tjetrin →
          </button>
        </div>
      )}

      <div id="qr-reader-hidden" className="hidden" />
    </div>
  )
}

export default CheckinPage