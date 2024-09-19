import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TownCustomerManagement.css'; // Import the CSS file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const TownCustomerManagement = () => {
  const [towns, setTowns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newTown, setNewTown] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newPhone, setNewPhone] = useState(''); // New phone state
  const [newAddress, setNewAddress] = useState(''); // New address state
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTowns();
  }, []);

  const fetchTowns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/towns');
      setTowns(response.data);
    } catch (error) {
      alert('Error fetching towns: ' + error.message);
      console.error('Error fetching towns:', error.message);
    }
  };

  const fetchCustomers = async (townId) => {
    try {
      if (!townId) return;
      const response = await axios.get(`http://localhost:5000/customers?town=${townId}`);
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error.message);
    }
  };

  const handleAddTown = async () => {
    if (newTown.trim() === '') {
      alert('Town name cannot be empty');
      return;
    }
    try {
      await axios.post('http://localhost:5000/towns', { town: newTown });
      setNewTown('');
      fetchTowns();
    } catch (error) {
      alert('Error adding town: ' + error.message);
      console.error('Error adding town:', error.message);
    }
  };

  const handleAddCustomer = async () => {
    if (newCustomer.trim() === '' || !selectedTown || newPhone.trim() === '' || newAddress.trim() === '') {
      alert('Please fill in all customer details');
      return;
    }
    try {
      await axios.post('http://localhost:5000/customers', {
        customer: newCustomer,
        town: selectedTown,
        phone: newPhone, // Pass phone field
        address: newAddress // Pass address field
      });
      setNewCustomer('');
      setNewPhone(''); // Clear phone field
      setNewAddress(''); // Clear address field
      fetchCustomers(selectedTown);
    } catch (error) {
      console.error('Error adding customer:', error.message);
    }
  };

  const handleTownChange = (e) => {
    const townId = e.target.value;
    setSelectedTown(townId);
    fetchCustomers(townId);
  };

  const handleNavigateToDelivery = () => {
    if (!selectedCustomer) {
      alert('Please select a customer');
      return;
    }
    navigate(`/customers/${selectedCustomer}`);
  };

  return (
    <div className='container text-center mt-5'>
      {/* Home Link */}
      <div className='mb-4'>
        <Link to="/dashboard" className="btn btn-secondary">Home</Link>
      </div>
      
      <h2 className='header'>Manage Towns and Customers</h2>
      
      <div className='input-container'>
        <h2 className='mb-3'>Add Towns:</h2>
        <input
          type="text"
          placeholder="New Town"
          value={newTown}
          onChange={(e) => setNewTown(e.target.value)}
        />
        <button onClick={handleAddTown}>Add Town</button>
      </div>
      
      <div className='input-container'>
        <h2 className='mb-3 mt-4'>Select a Town</h2>
        <select onChange={handleTownChange} value={selectedTown}>
          <option value="">Select a Town</option>
          <option value="Se">Se</option>
          <option value="Seown">Seown</option>
          {towns.map((town) => (
            <option key={town._id} value={town._id}>
              {town.name}
            </option>
          ))}
        </select>
      </div>
      
      <div className='input-container'>
        <h2 className='mb-4 mt-4'>Add Customer If Not Exist</h2>
        <input
          type="text"
          placeholder="New Customer"
          value={newCustomer}
          onChange={(e) => setNewCustomer(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone Number" // New phone input
          value={newPhone}
          onChange={(e) => setNewPhone(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address" // New address input
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
        />
        <button onClick={handleAddCustomer}>Add Customer</button>
      </div>
      
      <div className='input-container'>
        <h3 className='mb-4 mt-4'>Select Customer for Delivery</h3>
        <select onChange={(e) => setSelectedCustomer(e.target.value)} value={selectedCustomer}>
          <option value="">Select a Customer</option>
          <option value="Semer">Semer</option>
          <option value="Seer">Seer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>
        <button onClick={handleNavigateToDelivery}>Go to Delivery Page</button>
      </div>
    </div>
  );
};

export default TownCustomerManagement;
