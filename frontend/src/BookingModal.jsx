import { useState } from 'react';
import axios from 'axios';

const BookingModal = ({ court, coaches, onClose }) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [coachId, setCoachId] = useState('');
  const [rackets, setRackets] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const bookingData = {
        courtId: court._id,
        userEmail: "user@test.com", // Hardcoded for assignment
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        coachId: coachId || null,
        racketsNeeded: Number(rackets)
      };

      // Backend API Call
      const res = await axios.post('/api/bookings', bookingData);
      
      alert(`✅ Booking Success! Price: ₹${res.data.totalPrice}`);
      onClose(); // Close modal on success
    } catch (error) {
      // Error Handling (Overlap or Server Error)
      const msg = error.response?.data?.message || "Booking Failed";
      alert(`❌ Error: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        <h2>Book {court.name}</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Start Time */}
          <div className="form-group">
            <label>Start Time:</label>
            <input 
              type="datetime-local" 
              required 
              onChange={(e) => setStartTime(e.target.value)}
            />
          </div>

          {/* End Time */}
          <div className="form-group">
            <label>End Time:</label>
            <input 
              type="datetime-local" 
              required 
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          {/* Coach Selection */}
          <div className="form-group">
            <label>Select Coach (Optional):</label>
            <select onChange={(e) => setCoachId(e.target.value)}>
              <option value="">No Coach</option>
              {coaches.map(coach => (
                <option key={coach._id} value={coach._id}>
                  {coach.name} (+₹{coach.hourlyRate}/hr)
                </option>
              ))}
            </select>
          </div>

          {/* Rackets */}
          <div className="form-group">
            <label>Rackets Needed (+₹50 each):</label>
            <input 
              type="number" 
              min="0" 
              value={rackets}
              onChange={(e) => setRackets(e.target.value)}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;