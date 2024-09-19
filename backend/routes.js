const express = require('express');
const app = express.Router();
const Town = require('./model/town');
const Customer = require('./model/coustomer');
const Bottle = require('./model/bottles');
// const Bottlemonthly = require('./model/bottlemonthly');
const Payment = require('./model/payments');
// const Login = require('./model/payment');



// // Get all towns
// app.get('/towns', async (req, res) => {
//   try {
//     const towns = await Town.find();
//     res.json(towns);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add a new town
// app.post('/towns', async (req, res) => {
//   const town = new Town({
//     name: req.body.town,
//   });

//   try {
//     const newTown = await town.save();
//     res.status(201).json(newTown);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Get all customers for a specific town
// app.get('/customers', async (req, res) => {
//   const townId = req.query.town;
//   try {
//     const customers = await Customer.find({ town: townId });
//     res.json(customers);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // Add a new customer
// app.post('/customers', async (req, res) => {
//   const customer = new Customer({
//     name: req.body.customer,
//     town: req.body.town,
//   });

//   try {
//     const newCustomer = await customer.save();
//     res.status(201).json(newCustomer);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // Add a bottle to a customer
// app.post('/bottles', async (req, res) => {
//   const bottle = new Bottle({
//     type: req.body.type,
//     qty: req.body.qty,
//     pricePerBottle: req.body.pricePerBottle,
//     customerId: req.body.customerId,
//   });

//   try {
//     const newBottle = await bottle.save();
//     res.status(201).json(newBottle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });
// Login route
// app.post('/login', async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Check if the user exists
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid username or password' });
//     }

//     // Compare the entered password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid username or password' });
//     }

//     // Create a token that expires in 1 week
//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1w' });

//     // Return the token
//     res.json({ success: true, token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });
const users = [
    { username: 'admin', password: '12345' } // Example user
  ];
  
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
  

// Get all towns
app.get('/towns', async (req, res) => {
  try {
    const towns = await Town.find();
    res.json(towns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new town
app.post('/towns', async (req, res) => {
  const town = new Town({ name: req.body.town });
  console.log(req.body.town);
  

  try {
    const newTown = await town.save();
    res.status(201).json(newTown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get customers by town
// salman
app.get('/customers', async (req, res) => {
  try {
    const { town } = req.query;
    if (!town) {
      return res.status(400).json({ message: 'Town ID is required' });
    }
    const customers = await Customer.find({ town });
    if (customers.length === 0) {
      return res.status(404).json({ message: 'No customers found for this town' });
    }
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// salman
// Add a new customer

// POST route to add a new customer
app.post('/customers', async (req, res) => {
  const { customer, town, phone, address } = req.body;

  // Ensure required fields are present
  if (!customer || !town || !phone || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new customer
    const newCustomer = new Customer({
      name: customer,
      town,
      phone,
      address
    });

    // Save the customer to the database
    const savedCustomer = await newCustomer.save();
    res.status(201).json(savedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Fetch Customer by ID
app.get('/customers/:customerId', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching customer: ' + error.message });
  }
});
// Update Customer by ID
app.put('/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params; // Get customer ID from URL parameters
    const updates = req.body; // Get updates from request body
    const customer = await Customer.findByIdAndUpdate(customerId, updates, { new: true });
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Error updating customer: ' + error.message });
  }
});

app.get('/customers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Delete Customer by ID
app.delete('/customers/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params; // Get customer ID from URL parameters
    const customer = await Customer.findByIdAndDelete(customerId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting customer: ' + error.message });
  }
});

// Add a new bottle entry
// app.post('/bottles', async (req, res) => {
//   const { type, qty, pricePerBottle, customerId } = req.body;

//   const bottle = new Bottle({
//     type,
//     qty,
//     pricePerBottle,
//     customerId,
//     totalPrice: qty * pricePerBottle, // Calculate total price
//     createdAt: new Date() // Store the current date
//   });

//   try {
//     const newBottle = await bottle.save();
//     res.status(201).json(newBottle);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Get all bottle entries
// app.get('/bottles', async (req, res) => {
//   try {
//     const bottles = await Bottle.find().populate('customerId', 'name');
//     res.json(bottles);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
// Add bottle
// app.post('/bottles', async (req, res) => {
//   try {
//     const { type, qty, pricePerBottle } = req.body;
//     const totalPrice = qty * pricePerBottle;
    
//     const bottle = new Bottle({
//       type,
//       qty,
//       pricePerBottle,
//       totalPrice,
//     });

//     await bottle.save();
//     res.status(201).json({ success: true });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });
// Add a new bottle entry
// salman
app.post('/bottles', async (req, res) => {
  const { type, qty, pricePerBottle, customerId , totalAmount } = req.body;

  const bottle = new Bottle({
    type,
    qty,
    pricePerBottle,
    customerId,
    totalAmount: qty * pricePerBottle, // Calculate total price
    date: new Date() // Store the current date
  });
  console.log(bottle.customerId);
  

  try {
    const newBottle = await bottle.save();
    res.status(201).json(newBottle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
// salman

// Get all bottles
app.get('/bottles', async (req, res) => {
  try {
    const bottles = await Bottle.find({ customerId: req.query.customerId }).populate('customerId', 'name');
    res.json(bottles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a bottle entry
app.delete('/bottles/:id', async (req, res) => {
  try {
    await Bottle.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Bottle entry deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a bottle entry
app.put('/bottles/:id', async (req, res) => {
  const { type, qty, pricePerBottle } = req.body;
  const totalAmount = qty * pricePerBottle; // Calculate total amount

  try {
    const updatedBottle = await Bottle.findByIdAndUpdate(req.params.id, {
      type,
      qty,
      pricePerBottle,
      totalAmount,
      date: new Date() // Update the date to current date
    }, { new: true });

    res.json(updatedBottle);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get bills (for employer)
app.get('/bills', async (req, res) => {
  try {
    const bills = await Bottle.find().sort({ date: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});



// Get daily data (admin view)
app.get('/daily-data', async (req, res) => {
  try {
    const dailyData = await Bottle.aggregate([
      {
        $group: {
          _id: { type: '$type', date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
          totalQty: { $sum: '$qty' },
          totalSales: { $sum: '$totalPrice' }
        }
      },
      {
        $project: {
          type: '$_id.type',
          date: '$_id.date',
          totalQty: 1,
          totalSales: 1,
          _id: 0
        }
      },
      { $sort: { date: -1 } }
    ]);

    res.json(dailyData);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


 // Get monthly report for a specific town and customer
app.get('/:townId/:customerId/:month', async (req, res) => {
  try {
    const { townId, customerId, month } = req.params;
    
    // Parse month to start and end dates
    const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0); // Last day of the month

    const query = {
      date: { $gte: startDate, $lte: endDate },
    };

    if (townId !== 'all') {
      query['town'] = townId;
    }
    if (customerId !== 'all') {
      query['customerId'] = customerId;
    }

    const bottles = await Bottle.find(query).populate('customerId', 'name');
    const totalBottles = bottles.reduce((sum, bottle) => sum + bottle.qty, 0);
    const totalAmount = bottles.reduce((sum, bottle) => sum + bottle.totalPrice, 0);

    // Fetch customer details
    let customer = {};
    if (customerId !== 'all') {
      customer = await Customer.findById(customerId);
    }
    
    // Calculate total bill, total paid, and remaining balance
    const totalBill = customer.totalBill || 0;
    const totalPaid = customer.totalPaid || 0;
    const balance = totalBill - totalPaid;

    res.json({
      deliveries: bottles.map(bottle => ({
        date: bottle.date.toISOString().split('T')[0],
        amount: bottle.totalPrice,
        bottles: bottle.qty
      })),
      totalBottles,
      totalAmount,
      totalBill,
      totalPaid,
      balance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get total amounts and remaining balances for all towns
app.get('/total', async (req, res) => {
  try {
    const towns = await Town.find();
    const townReports = await Promise.all(towns.map(async (town) => {
      const customers = await Customer.find({ town: town._id });
      const totalBill = customers.reduce((sum, customer) => sum + customer.totalBill, 0);
      const totalPaid = customers.reduce((sum, customer) => sum + customer.totalPaid, 0);
      const balance = totalBill - totalPaid;
      return { town: town.name, totalBill, totalPaid, balance };
    }));

    res.json(townReports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new payment
app.post('/payment', async (req, res) => {
  const { customerId, paymentAmount, date } = req.body;

  try {
    // Check if the customer exists
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const payment = new Payment({
      customerId,
      paymentAmount,
      date
    });

    const savedPayment = await payment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all payments
app.get('/payment', async (req, res) => {
  try {
    const payments = await Payment.find().populate('customerId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payments by customer ID
app.get('/paymentcustomer/:customerId', async (req, res) => {
  try {
    const payments = await Payment.find({ customerId: req.params.customerId }).populate('customerId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get payments by date range
app.get('/paymentdate', async (req, res) => {
  const { startDate, endDate } = req.query;
  
  try {
    const payments = await Payment.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    }).populate('customerId');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a payment
app.put('/payment/:id', async (req, res) => {
  const { paymentAmount, date } = req.body;

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      req.params.id,
      { paymentAmount, date },
      { new: true }
    );
    res.json(updatedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a payment
app.delete('/payment/:id', async (req, res) => {
  try {
    await Payment.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = app;
