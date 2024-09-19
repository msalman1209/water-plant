import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Delivery = () => {
  const { customerId } = useParams(); // Get customer ID from URL
  console.log(customerId);
  
  const [customer, setCustomer] = useState(null);
  const [bottles, setBottles] = useState([]);
  const [bottleType, setBottleType] = useState('');
  const [bottleQty, setBottleQty] = useState('');
  const [pricePerBottle, setPricePerBottle] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [editBottle, setEditBottle] = useState(null);
  const [payments, setPayments] = useState([]);

  // Define available bottle types
  const bottleTypes = [
    '1 Can',
    '2 Dispenser Can',
    '3 Local Can'
  ];

  useEffect(() => {
    fetchCustomer();
    fetchBottles();
    fetchPayments(); // Fetch payments history on component mount
  }, [customerId]);

  const fetchCustomer = async () => {
    try {
      if (!customerId) throw new Error('Customer ID is missing');
      const response = await axios.get(`http://localhost:5000/customers/${customerId}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error.response || error.message);
    }
  };

  const fetchBottles = async () => {
    try {
      if (!customerId) throw new Error('Customer ID is missing');
      const response = await axios.get(`http://localhost:5000/bottles`, {
        params: { customerId }
      });
      setBottles(response.data);
    } catch (error) {
      console.error('Error fetching bottles:', error.response || error.message);
    }
  };

  const fetchPayments = async () => {
    try {
      if (!customerId) throw new Error('Customer ID is missing');
      const response = await axios.get(`http://localhost:5000/paymentcustomer/${customerId}`);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error.response || error.message);
    }
  };
  
// salman
  const handleAddBottle = async () => {
    if (bottleType.trim() === '' || isNaN(bottleQty) || isNaN(pricePerBottle)) {
      alert('Please enter valid details');
      return;
    }
  
    try {
      const totalAmount = parseInt(bottleQty) * parseFloat(pricePerBottle);
  
      // Log the data you're about to send
      console.log({
        type: bottleType,
        qty: parseInt(bottleQty),
        pricePerBottle: parseFloat(pricePerBottle),
        totalAmount,
        customerId,
        date: new Date().toISOString()
      });
  
      if (editBottle) {
        await axios.put(`http://localhost:5000/bottles/${editBottle._id}`, {
          type: bottleType,
          qty: parseInt(bottleQty),
          pricePerBottle: parseFloat(pricePerBottle),
          totalAmount,
          customerId,
          date: new Date().toISOString()
        });
        setEditBottle(null);
      } else {
        await axios.post('http://localhost:5000/bottles', {
          type: bottleType,
          qty: parseInt(bottleQty),
          pricePerBottle: parseFloat(pricePerBottle),
          totalAmount,
          customerId,
          date: new Date().toISOString()
        });
        console.log(customerId);
        
      }
      setBottleType('');
      setBottleQty('');
      setPricePerBottle('');
      fetchBottles();
      fetchCustomer();
    } catch (error) {
      console.error('Error adding or updating bottle:', error.response || error.message);
    }
  };
  // salman

  const handleDeleteBottle = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/bottles/${id}`);
      fetchBottles();
    } catch (error) {
      console.error('Error deleting bottle:', error.response || error.message);
    }
  };

  const handlePayment = async () => {
    if (!paymentAmount || isNaN(paymentAmount) || parseFloat(paymentAmount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }
    try {
      const paymentDate = new Date().toISOString();
      await axios.post('http://localhost:5000/payments', {
        customerId,
        paymentAmount: parseFloat(paymentAmount),
        date: paymentDate
      });
      await fetchCustomer();
      await fetchBottles();
      await fetchPayments();
      setPaymentAmount('');
    } catch (error) {
      console.error('Error recording payment:', error.response || error.message);
    }
  };

  const calculateTotalAmount = () => {
    return bottles.reduce((total, bottle) => total + (bottle.totalAmount || 0), 0);
  };
  


  return (
    <div>
      <h2>Delivery Page for Customer {customer?.name}</h2>
      <div>
        <h3>{editBottle ? 'Edit Bottle' : 'Add Bottle'}</h3>
        <select
          value={bottleType}
          onChange={(e) => setBottleType(e.target.value)}
        >
          <option value="">Select Bottle Type</option>
          {bottleTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={bottleQty}
          onChange={(e) => setBottleQty(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price Per Bottle"
          value={pricePerBottle}
          onChange={(e) => setPricePerBottle(e.target.value)}
        />
        <button onClick={handleAddBottle}>
          {editBottle ? 'Update Bottle' : 'Add Bottle'}
        </button>
      </div>
      <div>
        <h3>Bottles for Customer</h3>
        <ul>
          {bottles.map((bottle) => (
            <li key={bottle._id}>
              {bottle.type}: {bottle.qty} bottles at Rs{bottle.pricePerBottle} each 
              (Total: Rs{bottle.totalAmount}) - {bottle.date ? new Date(bottle.date).toLocaleDateString() : 'No date available'}
              <button onClick={() => { 
                setEditBottle(bottle); 
                setBottleType(bottle.type); 
                setBottleQty(bottle.qty); 
                setPricePerBottle(bottle.pricePerBottle); 
              }}>
                Edit
              </button>
              <button onClick={() => handleDeleteBottle(bottle._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h3>Grand Total: Rs {calculateTotalAmount()}</h3>
      </div>
    </div>
  );
};

export default Delivery;
