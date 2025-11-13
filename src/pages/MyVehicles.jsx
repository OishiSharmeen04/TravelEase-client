import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { get, del } from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const MyVehicles = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  useEffect(() => {
    if (user?.email) {
      get(`/my-vehicles/${user.email}`)
        .then(data => {
          setVehicles(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  const handleDelete = (id) => {
    setDeleteModal({ show: true, id });
  };

  const confirmDelete = () => {
    del(`/vehicles/${deleteModal.id}`)
      .then(() => {
        setVehicles(vehicles.filter(v => v._id !== deleteModal.id));
        toast.success('Vehicle deleted successfully!');
        setDeleteModal({ show: false, id: null });
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete vehicle');
        setDeleteModal({ show: false, id: null });
      });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-8 sm:py-10 md:py-12 bg-dark-900 min-h-screen">
      <title>My Vehicles</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
              My <span className="text-primary">Vehicles</span>
            </h1>
            <Link
              to="/add-vehicle"
              className="w-full sm:w-auto text-center px-4 sm:px-6 py-2.5 sm:py-3 bg-primary text-dark-900 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm sm:text-base"
            >
              Add New Vehicle
            </Link>
          </div>

          {/* Empty State */}
          {vehicles.length === 0 ? (
            <div className="text-center py-12 sm:py-16 md:py-20">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <p className="text-gray-400 text-base sm:text-lg mb-6">You haven't added any vehicles yet</p>
              <Link
                to="/add-vehicle"
                className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 bg-primary text-dark-900 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm sm:text-base"
              >
                Add Your First Vehicle
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {vehicles.map(vehicle => (
                <motion.div
                  key={vehicle._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-dark-800 rounded-lg overflow-hidden border border-dark-700 hover:border-primary transition"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Vehicle Image */}
                    <div className="w-full md:w-1/3 h-48 sm:h-56 md:h-auto">
                      <img
                        src={vehicle.coverImage}
                        alt={vehicle.vehicleName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Vehicle Info */}
                    <div className="flex-1 p-4 sm:p-6">
                      {/* Header Section */}
                      <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-2">
                            {vehicle.vehicleName}
                          </h3>
                          
                          {/* Badges - Stacked on mobile */}
                          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400">
                            <span className="flex items-center">
                              <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                              </svg>
                              {vehicle.location}
                            </span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                              vehicle.availability === 'Available' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-red-500 text-white'
                            }`}>
                              {vehicle.availability}
                            </span>
                            <span className="px-2 sm:px-3 py-1 rounded-full text-xs font-semibold bg-primary text-neutral">
                              {vehicle.category}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-left sm:text-right">
                          <p className="text-xl sm:text-2xl font-bold text-primary">
                            ${vehicle.pricePerDay}
                            <span className="text-xs sm:text-sm text-gray-400 font-normal">/day</span>
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2">
                        {vehicle.description}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <Link
                          to={`/vehicle/${vehicle._id}`}
                          className="flex-1 sm:flex-none text-center px-4 sm:px-6 py-2 bg-dark-700 text-neutral rounded-lg font-semibold hover:bg-dark-600 transition border border-primary text-sm sm:text-base"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => navigate(`/update-vehicle/${vehicle._id}`)}
                          className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-primary text-dark-900 rounded-lg font-semibold hover:bg-yellow-500 transition text-sm sm:text-base"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(vehicle._id)}
                          className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-dark-800 rounded-lg p-5 sm:p-6 max-w-md w-full border border-dark-700"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Confirm Delete</h3>
            <p className="text-gray-400 text-sm sm:text-base mb-5 sm:mb-6">
              Are you sure you want to delete this vehicle? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition text-sm sm:text-base"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteModal({ show: false, id: null })}
                className="flex-1 px-4 py-2.5 bg-dark-700 text-gray-300 rounded-lg font-semibold hover:bg-dark-600 transition text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyVehicles;