import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const VehicleCard = ({ vehicle }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="card-interactive overflow-hidden group"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={vehicle.coverImage}
          alt={vehicle.vehicleName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-dark-900/80 via-transparent to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <span className={`badge ${
            vehicle.availability === 'Available' 
              ? 'badge-success' 
              : 'badge-error'
          } shadow-lg`}>
            {vehicle.availability}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="badge-primary shadow-xl text-neutral bg-primary px-2 rounded">
            {vehicle.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-display font-bold text-secondary mb-2 
                     group-hover:text-primary transition-colors duration-200">
          {vehicle.vehicleName}
        </h3>
        
        <div className="flex items-center text-gray-400 text-sm mb-2 group">
          <svg className="w-4 h-4 mr-1 text-primary/70" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <span className="group-hover:text-secondary transition-colors">{vehicle.location}</span>
        </div>
        
        <div className="flex items-center text-gray-400 text-sm mb-4 group">
          <svg className="w-4 h-4 mr-1 text-primary/70" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
          </svg>
          <span className="group-hover:text-secondary transition-colors">{vehicle.owner}</span>
        </div>
        
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-700 
                      group-hover:border-primary/30 transition-colors duration-200">
          <div>
            <p className="text-2xl font-display font-bold text-secondary">
              ${vehicle.pricePerDay}
              <span className="text-sm text-gray-400 font-normal">/day</span>
            </p>
          </div>
          <Link
            to={`/vehicle/${vehicle._id}`}
            className="btn btn-primary text-sm inline-flex items-center gap-2 shadow-gold"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleCard;
