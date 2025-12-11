import { useState, useEffect } from 'react';
import axios from 'axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings');
      setBookings(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete Function
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`/api/bookings/${id}`);
        setBookings(bookings.filter(b => b._id !== id));
      } catch (error) {
        alert('Error deleting booking');
      }
    }
  };

  // Status Update Function
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.patch(`/api/bookings/${id}`, { status: newStatus });
      setBookings(bookings.map(b => 
        b._id === id ? { ...b, status: newStatus } : b
      ));
    } catch (error) {
      alert('Error updating status');
    }
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="booking-list-container">
      <h2>📅 Admin Dashboard (Bookings)</h2>
      
      {loading ? (
        <p style={{textAlign: 'center', color: 'white'}}>Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p style={{textAlign: 'center', color: 'white'}}>No bookings yet.</p>
      ) : (
        <div style={{overflowX: 'auto'}}>
          <table cellSpacing="0" cellPadding="0">
            <thead>
              <tr>
                <th>Court Name</th>
                <th>Date & Time</th>
                <th>Price</th>
                <th>Coach</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id}>
                  <td>
                    {/* Safe Check for Name */}
                    {b.court ? b.court.name : 'Unknown Court'}
                    <br/>
                    <span style={{fontSize: '0.8rem', color: '#666'}}>
                      {b.court ? b.court.type : ''}
                    </span>
                  </td>
                  <td>
                    {new Date(b.startTime).toLocaleDateString()}
                    <br/>
                    <small>{formatTime(b.startTime)} - {formatTime(b.endTime)}</small>
                  </td>
                  <td style={{fontWeight: 'bold', color: '#004e92'}}>₹{b.totalPrice}</td>
                  <td>{b.coach ? b.coach.name : '-'}</td>
                  <td>
                    <select 
                      value={b.status} 
                      onChange={(e) => handleStatusChange(b._id, e.target.value)}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(b._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;