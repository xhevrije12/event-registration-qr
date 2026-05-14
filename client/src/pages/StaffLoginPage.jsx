import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { staffLogin } from '../services/api'
import { useAuth } from '../context/useAuth'

function StaffLoginPage() {
  const navigate = useNavigate()
  const { loginStaff } = useAuth()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await staffLogin(code)
      loginStaff(res.data.token)
      navigate('/checkin')
    } catch (err) {
      setError(err.response?.data?.message || '❌ Kodi i gabuar!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl border border-gray-800">

        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Staff Login
        </h1>

        {error && (
          <div className="text-red-500 mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-gray-800 p-3 rounded-xl mb-4 text-center text-white"
            placeholder="Kodi i stafit"
          />

          <button className="w-full bg-yellow-500 p-3 rounded-xl text-black font-bold">
            {loading ? "Duke u verifikuar..." : "Hyr"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default StaffLoginPage