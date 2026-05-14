import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import StaffRoute from './components/StaffRoute'
import HomePage from './pages/HomePage'
import MoviePage from './pages/MoviePage'
import BookingPage from './pages/BookingPage'
import ConfirmationPage from './pages/ConfirmationPage'
import CheckinPage from './pages/CheckinPage'
import AdminPage from './pages/AdminPage'
import StaffLoginPage from './pages/StaffLoginPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        {/* Staff Login — Pa Navbar */}
        <Route path="/staff-login" element={<StaffLoginPage />} />

        {/* Të gjitha faqet tjera me Navbar */}
        <Route path="/*" element={
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies/:id" element={<MoviePage />} />
              <Route path="/book/:id" element={<BookingPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/checkin" element={
                <StaffRoute>
                  <CheckinPage />
                </StaffRoute>
              } />
            </Routes>
          </>
        } />
      </Routes>
    </div>
  )
}

export default App