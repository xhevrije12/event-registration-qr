import { useState } from 'react'
import jsQR from 'jsqr'
import { checkIn } from '../services/api'

function CheckinPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const processFile = async (file) => {
    if (!file) return
    setLoading(true)
    setResult(null)

    try {
      const decodedText = await scanQRWithJsQR(file)

      if (!decodedText) {
        setResult({ success: false, message: '❌ QR kodi nuk u lexua! Provo me imazh më të qartë.' })
        return
      }

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
      setLoading(false)
    }
  }

  const scanQRWithJsQR = (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      const url = URL.createObjectURL(file)
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const code = jsQR(imageData.data, imageData.width, imageData.height)
        URL.revokeObjectURL(url)
        resolve(code ? code.data : null)
      }
      img.onerror = reject
      img.src = url
    })
  }

  const handleFile = (e) => processFile(e.target.files[0])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      processFile(file)
    }
  }

  return (
    <div className="max-w-lg mx-auto px-4 md:px-6 py-10 animate-fade-in">

      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📱</div>
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">Staff Check-in</h1>
        <p className="text-gray-400">Ngarko screenshot-in e QR kodit të biletës</p>
      </div>

      {/* Upload Box */}
      {!result && (
        <label
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`block border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
            loading
              ? 'border-yellow-500 bg-yellow-500/10'
              : dragOver
              ? 'border-yellow-400 bg-yellow-400/10 scale-105'
              : 'border-gray-600 hover:border-yellow-500 hover:bg-gray-900'
          }`}
        >
          {loading ? (
            <div>
              <div className="w-16 h-16 border-4 border-gray-700 border-t-yellow-400 rounded-full animate-spin mx-auto mb-4" />
              <p className="text-yellow-400 text-xl font-semibold animate-pulse">
                Duke skanuar QR...
              </p>
            </div>
          ) : (
            <div>
              <div className="text-6xl mb-4">
                {dragOver ? '📂' : '📸'}
              </div>
              <p className="text-white text-xl font-semibold mb-2">
                {dragOver ? 'Lësho imazhin këtu!' : 'Ngarko QR Kodin'}
              </p>
              <p className="text-gray-500 text-sm mb-4">
                Kliko ose tërhiq imazhin e QR këtu
              </p>
              <div className="flex justify-center gap-2">
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-semibold">
                  PNG
                </span>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-semibold">
                  JPG
                </span>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/50 px-3 py-1 rounded-full text-xs font-semibold">
                  Screenshot
                </span>
              </div>
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

      {/* Rezultati */}
      {result && (
        <div className={`rounded-2xl p-8 text-center border-2 animate-fade-in ${
          result.success
            ? 'bg-green-900/30 border-green-500'
            : 'bg-red-900/30 border-red-500'
        }`}>
          <div className="text-7xl mb-4">
            {result.success ? '✅' : '❌'}
          </div>
          <p className="text-2xl font-bold text-white mb-4">
            {result.message}
          </p>

          {result.success && result.booking && (
            <div className="bg-black/30 rounded-xl p-4 text-left space-y-3 mb-6">
              {[
                { label: 'Filmi', value: result.booking.movieTitle },
                { label: 'Emri', value: result.booking.customerName },
                { label: 'Vendet', value: result.booking.seats },
                { label: 'Totali', value: `${result.booking.totalPrice}€` },
              ].map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-gray-400">{item.label}:</span>
                  <span className={`font-semibold ${i === 3 ? 'text-yellow-400' : 'text-white'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => setResult(null)}
            className="w-full bg-yellow-500 text-black py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            Skano Tjetrin →
          </button>
        </div>
      )}

      {/* Info */}
      {!result && !loading && (
        <p className="text-center text-gray-600 text-sm mt-6">
          🔐 Kjo faqe është vetëm për stafin e autorizuar
        </p>
      )}
    </div>
  )
}

export default CheckinPage