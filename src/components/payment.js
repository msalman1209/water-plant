import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css';

const Payment = () => {
  const [towns, setTowns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [customerDetails, setCustomerDetails] = useState(null);

  useEffect(() => {
    fetchTowns();
  }, []);

  const fetchTowns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/towns');
      setTowns(response.data);
    } catch (error) {
      console.error('Error fetching towns:', error);
    }
  };

  const fetchCustomers = async (townId) => {
    try {
      const response = await axios.get('http://localhost:5000/customers', { params: { townId } });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleTownChange = async (e) => {
    const townId = e.target.value;
    setSelectedTown(townId);
    setSelectedCustomer(''); // Reset selected customer
    setCustomerDetails(null); // Reset customer details
    if (townId) {
      await fetchCustomers(townId);
    } else {
      setCustomers([]); // Clear customers if no town is selected
    }
  };

  const handleCustomerChange = async (e) => {
    const customerId = e.target.value;
    setSelectedCustomer(customerId);
    if (customerId) {
      try {
        const response = await axios.get(`http://localhost:5000/customers/${customerId}`);
        setCustomerDetails(response.data);
      } catch (error) {
        console.error('Error fetching customer details:', error);
        setCustomerDetails(null);
      }
    } else {
      setCustomerDetails(null);
    }
  };

  const handlePayment = async () => {
    const amount = parseFloat(paymentAmount);

    if (isNaN(amount) || amount <= 0 || !selectedCustomer) {
      alert('Please enter a valid payment amount and select a customer');
      return;
    }

    try {
      await axios.post('http://localhost:5000/payments', {
        customerId: selectedCustomer,
        paymentAmount: amount,
      });
      setPaymentAmount('');
      handleCustomerChange({ target: { value: selectedCustomer } }); // Refresh customer details
    } catch (error) {
      console.error('Error recording payment:', error);
    }
  };

  return (
    <div className="container mt-4">
      <Link to="/dashboard" className="btn btn-secondary mb-4">Back to Dashboard</Link>
      <h2 className="mb-4">Town and Customer Payment</h2>
      <div className="row">
        {/* Town selection dropdown */}
        <div className="col-md-6 mb-3">
          <select className="form-select" onChange={handleTownChange} value={selectedTown}>
            <option value="">Select a Town</option>
            {towns.map((town) => (
              <option key={town._id} value={town._id}>
                {town.name}
              </option>
            ))}
          </select>
        </div>

        {/* Customer selection dropdown */}
        {selectedTown && (
          <div className="col-md-6 mb-3">
            <select className="form-select" onChange={handleCustomerChange} value={selectedCustomer}>
              <option value="">Select a Customer</option>
              {customers.length > 0 ? (
                customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.name}
                  </option>
                ))
              ) : (
                <option value="">No customers available</option>
              )}
            </select>
          </div>
        )}
      </div>

      {/* Display customer details if a customer is selected */}
      {customerDetails ? (
        <div className="card p-4 mb-4 shadow-sm">
          <h3>Customer Details</h3>
          <p><strong>Total Amount:</strong> RS {customerDetails.totalBill ?? 'N/A'}</p>
          <p><strong>Received Amount:</strong> RS {customerDetails.totalPaid ?? 'N/A'}</p>
          <p><strong>Remaining Balance:</strong> RS {customerDetails.balance ?? 'N/A'}</p>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Payment Amount"
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handlePayment}>Add Payment</button>
        </div>
      ) : (
        <p>No customer details available or an error occurred.</p>
      )}
    </div>
  );
};

export default Payment;
