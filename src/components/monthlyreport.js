import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './monthlyreport.css'; // Import custom CSS for additional styling

const Report = () => {
  const [towns, setTowns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedTown, setSelectedTown] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [month, setMonth] = useState('');
  const [report, setReport] = useState(null);

  useEffect(() => {
    fetchTowns();
  }, []);

  const fetchTowns = async () => {
    try {
      const response = await axios.get('http://localhost:5000/towns'); // Adjust API path if needed
      setTowns(response.data);
    } catch (error) {
      console.error('Error fetching towns:', error);
    }
  };

  const fetchCustomers = async (townId) => {
    try {
      const response = await axios.get(`http://localhost:5000/customers?townId=${townId}`); // Adjust API path if needed
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get(`/report/${selectedTown}/${selectedCustomer}/${month}`); // Adjust API path if needed
      setReport(response.data);
      generatePDF(response.data);
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  const generatePDF = (data) => {
    const doc = new jsPDF();
    doc.text('Monthly Report', 14, 16);
    doc.text(`Town: ${selectedTown}`, 14, 22);
    doc.text(`Customer: ${selectedCustomer}`, 14, 28);
    doc.text(`Month: ${month}`, 14, 34);

    doc.autoTable({
      startY: 40,
      head: [['Date', 'Amount', 'Bottles']],
      body: data.deliveries.map(delivery => [delivery.date, delivery.amount, delivery.bottles]),
    });

    doc.text(`Total Amount: ${data.totalAmount}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`Total Bottles: ${data.totalBottles}`, 14, doc.lastAutoTable.finalY + 16);
    doc.text(`Total Bill: ${data.totalBill}`, 14, doc.lastAutoTable.finalY + 22);
    doc.text(`Total Paid: ${data.totalPaid}`, 14, doc.lastAutoTable.finalY + 28);
    doc.text(`Remaining Balance: ${data.balance}`, 14, doc.lastAutoTable.finalY + 34);

    doc.save('monthly-report.pdf');
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Monthly Report</h2>

      <div className="row mb-4">
        {/* Town selection dropdown */}
        <div className="col-md-4 mb-3">
          <select className="form-select" onChange={(e) => {
            const townId = e.target.value;
            setSelectedTown(townId);
            fetchCustomers(townId);
          }}>
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
          <div className="col-md-4 mb-3">
            <select className="form-select" onChange={(e) => setSelectedCustomer(e.target.value)}>
              <option value="">Select a Customer</option>
              {customers.map((customer) => (
                <option key={customer._id} value={customer._id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Month input */}
        <div className="col-md-4 mb-3">
          <input
            type="month"
            className="form-control"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>
      </div>

      <button className="btn btn-primary" onClick={handleGenerateReport}>Generate Report</button>

      {report && (
        <div className="card mt-4 p-3 shadow-sm">
          <h3 className="card-title">Report for {selectedCustomer} in {month}</h3>
          <p><strong>Total Bottles:</strong> {report.totalBottles}</p>
          <p><strong>Total Amount:</strong> {report.totalAmount}</p>
          <p><strong>Total Bill:</strong> {report.totalBill}</p>
          <p><strong>Total Paid:</strong> {report.totalPaid}</p>
          <p><strong>Remaining Balance:</strong> {report.balance}</p>
        </div>
      )}
    </div>
  );
};

export default Report;
