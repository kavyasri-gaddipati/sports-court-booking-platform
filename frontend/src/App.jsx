import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import BookingModal from './BookingModal';
import BookingList from './BookingList';

function App() {
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourt, setSelectedCourt] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courtsRes = await axios.get('/api/courts');
        const coachesRes = await axios.get('/api/coaches');
        setCourts(courtsRes.data);
        setCoaches(coachesRes.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      {/* --- NEW HEADER --- */}
      <header>
        <h1>⚡ ACORN SPORTS CLUB</h1>
        <p className="subtitle">Premium Sports Facility Management & Booking System</p>
      </header>

      {/* --- COURTS GRID --- */}
      {loading ? (
        <p style={{textAlign: 'center', color: 'white', fontSize: '1.5rem'}}>Loading Premium Courts...</p>
      ) : (
        <div className="court-grid">
          {courts.map((court) => (
            <div key={court._id} className="court-card">
              {/* Type Badge */}
              <span className={`badge ${court.type}`}>
                {court.type}
              </span>

              <div className="court-title">{court.name}</div>
              
              <div className="court-details">
                {court.description || 'Standard International Size Court'}
              </div>
              
              <div className="price-tag">
                ₹{court.basePricePerHour} <span style={{fontSize: '0.8rem', color: '#999', fontWeight: '400'}}>/ hr</span>
              </div>
              
              <button 
                className="book-btn"
                onClick={() => setSelectedCourt(court)}
              >
                Book Now 🚀
              </button>
            </div>
          ))}
        </div>
      )}

      {/* --- ADMIN DASHBOARD --- */}
      <BookingList />

      {/* --- MODAL --- */}
      {selectedCourt && (
        <BookingModal 
          court={selectedCourt} 
          coaches={coaches}
          onClose={() => setSelectedCourt(null)} 
        />
      )}
    </div>
  );
}

export default App;