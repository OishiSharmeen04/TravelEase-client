import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { get, put } from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const UpdateVehicle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    vehicleName: '',
    owner: '',
    category: 'Sedan',
    pricePerDay: '',
    location: '',
    availability: 'Available',
    description: '',
    coverImage: ''
  });

  useEffect(() => {
    get(`/vehicles/${id}`)
      .then(vehicle => {
        setFormData({
          vehicleName: vehicle.vehicleName,
          owner: vehicle.owner,
          category: vehicle.category,
          pricePerDay: vehicle.pricePerDay,
          location: vehicle.location,
          availability: vehicle.availability,
          description: vehicle.description,
          coverImage: vehicle.coverImage
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load vehicle details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedVehicle = {
      ...formData,
      pricePerDay: parseFloat(formData.pricePerDay)
    };

    try {
      await put(`/vehicles/${id}`, updatedVehicle);
      toast.success('Vehicle updated successfully!');
      navigate('/my-vehicles');
    } catch (error) {
      console.error(error);
      toast.error('Failed to update vehicle');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12 bg-dark-900 min-h-screen">
      <title>Update Vehicle</title>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-dark-800 rounded-lg shadow-xl p-8 border border-dark-700">
            <h1 className="text-3xl font-bold text-secondary mb-8">
              Update <span className="text-primary">Vehicle</span>
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Vehicle Name *
                  </label>
                  <input
                    type="text"
                    name="vehicleName"
                    required
                    value={formData.vehicleName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Owner Name *
                  </label>
                  <input
                    type="text"
                    name="owner"
                    required
                    value={formData.owner}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="Sedan">Sedan</option>
                    <option value="SUV">SUV</option>
                    <option value="Electric">Electric</option>
                    <option value="Van">Van</option>
                    <option value="Motorcycle">Motorcycle</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Price Per Day ($) *
                  </label>
                  <input
                    type="number"
                    name="pricePerDay"
                    required
                    min="1"
                    step="0.01"
                    value={formData.pricePerDay}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    required
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary mb-2">
                    Availability *
                  </label>
                  <select
                    name="availability"
                    required
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-primary focus:outline-none focus:border-primary"
                  >
                    <option value="Available">Available</option>
                    <option value="Booked">Booked</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Cover Image URL *
                </label>
                <input
                  type="url"
                  name="coverImage"
                  required
                  value={formData.coverImage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-neutral placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                ></textarea>
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary text-dark-900 rounded-lg font-semibold hover:bg-yellow-500 transition"
                >
                  Update Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/my-vehicles')}
                  className="flex-1 py-3 bg-dark-700 text-gray-400 rounded-lg font-semibold hover:bg-dark-600 transition border border-primary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateVehicle;