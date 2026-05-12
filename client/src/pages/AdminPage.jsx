import { useState, useEffect } from 'react'
import { getStats } from '../services/api'
import LoadingSpinner from '../components/LoadingSpinner'

function AdminPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [lastUpdated, setLastUpdated] = useState(null)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await getStats()
        setStats(res.data)
        setLastUpdated(new Date().toLocaleTimeString())
      } catch {
        console.log('Gabim')
      } finally {
        setLoading(false)
      }
    }
    loadStats()
    const interval = setInterval(loadStats, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const res = await getStats()
      setStats(res.data)
      setLastUpdated(new Date().toLocaleTimeString())
    } catch {
      console.log('Gabim')
    }
  }

  if (loading) return <LoadingSpinner text="Duke ngarkuar dashboard..." />

  const checkInRate = stats.total > 0
    ? Math.round((stats.checkedIn / stats.total) * 100)
    : 0

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 animate-fade-in">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-yellow-400">📊 Admin Dashboard</h1>
          <p className="text-gray-500 text-sm mt-1">
            {lastUpdated && `U përditësua: ${lastUpdated}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Live
          </div>
          <button
            onClick={fetchStats}
            className="bg-gray-800 text-gray-300 hover:text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-700 transition-all duration-200"
          >
            🔄 Rifresko
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { value: stats.total, label: 'Rezervime Totale', icon: '🎫', delay: 'stagger-1' },
          { value: stats.checkedIn, label: 'Kanë Hyrë', icon: '✅', delay: 'stagger-2' },
          { value: stats.active, label: 'Në Pritje', icon: '⏳', delay: 'stagger-3' },
          { value: `${stats.revenue}€`, label: 'Revenue', icon: '💰', delay: 'stagger-4' },
        ].map((stat, i) => (
          <div
            key={i}
            className={`animate-fade-in ${stat.delay} bg-gray-900 border border-gray-800 rounded-xl p-4 md:p-5 text-center hover:scale-105 transition-all duration-300`}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="text-2xl md:text-3xl font-bold text-yellow-400">
              {stat.value}
            </div>
            <div className="text-gray-500 text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Check-in Rate */}
      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-white font-bold text-lg">📈 Check-in Rate</h3>
            <p className="text-gray-500 text-sm">{stats.checkedIn} nga {stats.total} kanë hyrë</p>
          </div>
          <span className="text-yellow-400 font-bold text-3xl">{checkInRate}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-4 rounded-full transition-all duration-1000"
            style={{ width: `${checkInRate}%` }}
          />
        </div>
        <div className="flex justify-between text-gray-600 text-xs mt-2">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'overview', label: '📊 Sipas Filmit' },
          { key: 'bookings', label: '🎫 Rezervimet' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Sipas Filmit */}
      {activeTab === 'overview' && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-800">
            <h3 className="text-white font-bold text-lg">🎬 Rezervimet sipas Filmit</h3>
          </div>
          {stats.byMovie.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="text-5xl mb-3">🎬</div>
              <p>Nuk ka rezervime ende</p>
            </div>
          ) : (
            stats.byMovie.map((item, index) => (
              <div key={index} className="p-5 border-b border-gray-800 last:border-0 hover:bg-gray-800/50 transition-colors duration-200">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-semibold">{item._id}</span>
                  <div className="flex gap-3">
                    <span className="text-yellow-400 text-sm bg-yellow-400/10 px-3 py-1 rounded-full">
                      {item.count} bileta
                    </span>
                    <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">
                      {item.revenue}€
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Rezervimet */}
      {activeTab === 'bookings' && (
        <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
          <div className="p-5 border-b border-gray-800 flex justify-between items-center">
            <h3 className="text-white font-bold text-lg">🎫 Lista e Rezervimeve</h3>
            <span className="text-gray-500 text-sm bg-gray-800 px-3 py-1 rounded-full">
              {stats.bookings?.length} total
            </span>
          </div>

          {stats.bookings?.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <div className="text-5xl mb-3">🎫</div>
              <p>Nuk ka rezervime ende</p>
            </div>
          ) : (
            <>
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-gray-500 text-sm border-b border-gray-800 bg-gray-800/50">
                      <th className="text-left p-4">Klienti</th>
                      <th className="text-left p-4">Filmi</th>
                      <th className="text-left p-4">Vendet</th>
                      <th className="text-left p-4">Totali</th>
                      <th className="text-left p-4">Statusi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.bookings?.map((booking) => (
                      <tr key={booking._id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                        <td className="p-4">
                          <div className="text-white font-semibold">{booking.customerName}</div>
                          <div className="text-gray-500 text-xs">{booking.customerEmail}</div>
                        </td>
                        <td className="p-4 text-gray-300">{booking.movieTitle}</td>
                        <td className="p-4 text-gray-300">{booking.seats}</td>
                        <td className="p-4 text-yellow-400 font-bold">{booking.totalPrice}€</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            booking.status === 'used'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                              : booking.status === 'active'
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50'
                              : 'bg-red-500/20 text-red-400 border border-red-500/50'
                          }`}>
                            {booking.status === 'used' ? '✅ Hyrë' :
                             booking.status === 'active' ? '⏳ Aktiv' : '❌ Anuluar'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile */}
              <div className="md:hidden divide-y divide-gray-800">
                {stats.bookings?.map((booking) => (
                  <div key={booking._id} className="p-4 hover:bg-gray-800/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-semibold">{booking.customerName}</p>
                        <p className="text-gray-500 text-xs">{booking.customerEmail}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'used'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {booking.status === 'used' ? '✅ Hyrë' : '⏳ Aktiv'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">{booking.movieTitle}</span>
                      <span className="text-yellow-400 font-bold">{booking.totalPrice}€</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminPage