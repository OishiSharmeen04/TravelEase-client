import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import AllVehicles from './pages/AllVehicles';
import VehicleDetails from './pages/VehicleDetails';
import AddVehicle from './pages/AddVehicle';
import MyVehicles from './pages/MyVehicles';
import MyBookings from './pages/MyBookings';
import UpdateVehicle from './pages/UpdateVehicle';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import FloatingButton from './components/FloatingButton';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex flex-col transition-colors duration-300">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-vehicles" element={<AllVehicles />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                <Route path="/vehicle/:id" element={
                  <PrivateRoute>
                    <VehicleDetails />
                  </PrivateRoute>
                } />
                
                <Route path="/add-vehicle" element={
                  <PrivateRoute>
                    <AddVehicle />
                  </PrivateRoute>
                } />
                
                <Route path="/my-vehicles" element={
                  <PrivateRoute>
                    <MyVehicles />
                  </PrivateRoute>
                } />
                
                <Route path="/my-bookings" element={
                  <PrivateRoute>
                    <MyBookings />
                  </PrivateRoute>
                } />
                
                <Route path="/update-vehicle/:id" element={
                  <PrivateRoute>
                    <UpdateVehicle />
                  </PrivateRoute>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <FloatingButton />
            <Toaster position="top-right" />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;