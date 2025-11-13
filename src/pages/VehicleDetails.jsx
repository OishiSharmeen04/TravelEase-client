import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { get, post } from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const VehicleDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booked, setBooked] = useState(false);

  useEffect(() => {
    get(`/vehicles/${id}`)
      .then(data => {
        setVehicle(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load vehicle details');
        setLoading(false);
      });

    if (user?.email) {
      get(`/my-bookings/${user.email}`)
        .then(data => {
          const alreadyBooked = data.some(
            booking => booking.vehicleId === id
          );
          setBooked(alreadyBooked);
        })
        .catch(err => console.error(err));
    }
  }, [id, user]);

  const handleBookNow = async () => {
    if (!vehicle || booked) return;

    if (!user) {
      toast.error('Please login to book a vehicle');
      return;
    }

    const bookingData = {
      vehicleId: vehicle._id,
      vehicleName: vehicle.vehicleName,
      pricePerDay: vehicle.pricePerDay,
      userEmail: user.email,
      userName: user.displayName || user.email,
      bookingDate: new Date().toISOString()
    };

    try {
      await post('/bookings', bookingData);
      toast.success('Vehicle booked successfully!');
      setBooked(true);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to book vehicle');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!vehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400 text-lg">Vehicle not found</p>
      </div>
    );
  }

  return (
    <div className="py-12 bg-dark-900 min-h-screen">
      <title>{vehicle.vehicleName}</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative h-96 lg:h-full rounded-lg overflow-hidden">
              <img
                src={vehicle.coverImage}
                alt={vehicle.vehicleName}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  vehicle.availability === 'Available' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {vehicle.availability}
                </span>
              </div>
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-primary text-dark-900">
                  {vehicle.category}
                </span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-secondary mb-4">
                  {vehicle.vehicleName}
                </h1>
                <div className="flex items-center text-gray-400 mb-2">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                  </svg>
                  {vehicle.location}
                </div>
                <div className="flex items-center text-gray-400">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  Owner: {vehicle.owner}
                </div>
              </div>

              <div className="border-t border-dark-700 pt-6">
                <h2 className="text-2xl font-bold text-white mb-4">
                  <span className="text-primary">${vehicle.pricePerDay}</span>
                  <span className="text-lg text-gray-400 font-normal"> / day</span>
                </h2>
              </div>

              <div className="border-t border-dark-700 pt-6">
                <h3 className="text-xl font-bold text-secondary mb-3">Description</h3>
                <p className="text-gray-400 leading-relaxed">{vehicle.description}</p>
              </div>

              <div className="border-t border-dark-700 pt-6">
                <h3 className="text-xl font-bold text-secondary mb-3">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                    <p className="text-gray-400 text-sm mb-1">Category</p>
                    <p className="text-secondary font-semibold">{vehicle.category}</p>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                    <p className="text-gray-400 text-sm mb-1">Status</p>
                    <p className="text-secondary font-semibold">{vehicle.availability}</p>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                    <p className="text-gray-400 text-sm mb-1">Listed On</p>
                    <p className="text-secondary font-semibold">
                      {format(new Date(vehicle.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="bg-dark-800 rounded-lg p-4 border border-dark-700">
                    <p className="text-gray-400 text-sm mb-1">Price per Day</p>
                    <p className="text-secondary font-semibold">${vehicle.pricePerDay}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                disabled={vehicle.availability !== 'Available' || booked}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition ${
                  vehicle.availability === 'Available' && !booked
                    ? 'bg-primary text-dark-900 hover:bg-yellow-500'
                    : 'bg-gray-600 text-secondary cursor-not-allowed'
                }`}
              >
                {booked
                  ? 'Already Booked'
                  : vehicle.availability === 'Available'
                  ? 'Book Now'
                  : 'Not Available'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VehicleDetails;