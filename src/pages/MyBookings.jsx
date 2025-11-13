import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { get } from "../utils/api";
import LoadingSpinner from "../components/LoadingSpinner";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      get(`/my-bookings/${user.email}`)
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [user]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="py-12 bg-dark-900 min-h-screen">
      <title>My Bookings</title>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-secondary mb-8">
            My <span className="text-primary">Bookings</span>
          </h1>

          {bookings.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">
                You haven't made any bookings yet
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-dark-800 rounded-lg p-6 border border-gray-500 hover:border-primary transition"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">
                        {booking.vehicleName}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-400">
                        <p>
                          Booked on:{" "}
                          {format(
                            new Date(booking.bookingDate),
                            "MMM dd, yyyy - hh:mm a"
                          )}
                        </p>
                        <p>
                          Price per day:{" "}
                          <span className="text-primary font-semibold">
                            ${booking.pricePerDay}
                          </span>
                        </p>
                        <p>
                          Status:{" "}
                          <span className="text-green-500 font-semibold">
                            Confirmed
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/vehicle/${booking.vehicleId}`}
                        className="btn btn-primary text-sm inline-flex items-center gap-2 shadow-gold"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyBookings;