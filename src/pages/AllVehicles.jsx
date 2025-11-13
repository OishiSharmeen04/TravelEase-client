import { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleCard from '../components/VehicleCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';

const AllVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: '',
    sortBy: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5000/vehicles')
      .then(res => {
        setVehicles(res.data);
        setFilteredVehicles(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...vehicles];

    if (filters.search) {
      filtered = filtered.filter(v => 
        v.vehicleName.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.category) {
      filtered = filtered.filter(v => v.category === filters.category);
    }

    if (filters.location) {
      filtered = filtered.filter(v => 
        v.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.sortBy === 'price-low') {
      filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (filters.sortBy === 'price-high') {
      filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (filters.sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setFilteredVehicles(filtered);
  }, [filters, vehicles]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      category: '',
      location: '',
      search: '',
      sortBy: ''
    });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12 min-h-screen transition-colors duration-300">
      <title>All Vehicles</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-display font-bold mb-8 text-secondary">
            All <span className="text-primary">Vehicles</span>
          </h1>

          <div className="card p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral">
                  Search Vehicle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search by name..."
                    className="input pl-10 text-neutral"
                  />
                  <svg 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral/70"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral">
                  Category
                </label>
                <select
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="select bg-secondary text-primary font-medium border-none rounded-lg"
                >
                  <option value="">All Categories</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Electric">Electric</option>
                  <option value="Van">Van</option>
                  <option value="Motorcycle">Motorcycle</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="Search by location"
                  className="input text-neutral"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-neutral">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  className="select bg-secondary text-primary font-medium border-none rounded-lg"
                >
                  <option value="">Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="w-full btn-secondary flex items-center justify-center gap-2 text-neutral/40"
                >
                  <svg className="w-5 h-5 text-neutral" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reset
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className='text-neutral/80'>
              Showing <span className="text-primary font-semibold">{filteredVehicles.length}</span> vehicles
            </p>
          </div>

          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVehicles.map(vehicle => (
                <VehicleCard key={vehicle._id} vehicle={vehicle} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <svg className="w-24 h-24 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p style={{ color: 'rgb(var(--text-secondary))' }} className="text-lg">
                No vehicles found matching your criteria
              </p>
              <button onClick={resetFilters} className="btn-primary mt-4">
                Clear All Filters
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AllVehicles;