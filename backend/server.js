// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const app = express();
// const port = 5000;

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost/water_billing', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const Town = require('./model/town');
// const Customer = require('./model/coustomer');
// const Bottle = require('./model/bottles');
// const Payment = require('./model/payments');

// app.use(cors());
// app.use(express.json());

// const users = [
//   { username: 'admin', password: '12345' } // Example user
// ];

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;

//   const user = users.find(u => u.username === username && u.password === password);
//   if (user) {
//     res.json({ success: true, message: 'Login successful' });
//   } else {
//     res.json({ success: false, message: 'Invalid credentials' });
//   }
// });



// // Route to fetch all towns
// app.get('/towns', async (req, res) => {
//   try {
//     const towns = await Town.find();
//     res.json(towns);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching towns' });
//   }
// });

 
// // Route to add a new town
// app.post('/towns', async (req, res) => {
//   try {
//     const { town } = req.body;
//     if (!town) {
//       return res.status(400).json({ error: 'Town name is required' });
//     }

//     const newTown = new Town({ name: town });
//     await newTown.save();
//     res.json({ success: true, message: 'Town added successfully' });
//   } catch (error) {
//     console.error('Error adding town:', error);
//     res.status(500).json({ error: 'Error adding town' });
//   }
// });
// app.post('/towns', async (req, res) => {
//   try {
//     const { town } = req.body;
//     if (!town) {
//       return res.status(400).json({ error: 'Town name is required' });
//     }
//     const newTown = new Town({ name: town });
//     await newTown.save();
//     res.json({ success: true, message: 'Town added successfully' });
//   } catch (error) {
//     console.error('Error adding town:', error);
//     res.status(500).json({ error: 'Error adding town' });
//   }
// });



// // // Route to fetch customers by town
// // // Consolidated route to fetch customers by town name or townId
// // app.get('/customers', async (req, res) => {
// //   const { town, townId } = req.query;

// //   try {
// //     let townDoc;

// //     if (town) {
// //       // Fetch town by name
// //       townDoc = await Town.findOne({ name: town });
// //       if (!townDoc) {
// //         return res.status(404).json({ error: 'Town not found' });
// //       }
// //     } else if (townId) {
// //       // Use townId directly
// //       townDoc = { _id: townId };
// //     } else {
// //       return res.status(400).json({ error: 'Town name or town ID is required' });
// //     }

// //     // Fetch customers by town ID
// //     const customers = await Customer.find({ town: townDoc._id });
// //     if (!customers.length) {
// //       return res.status(404).json({ error: 'No customers found for this town' });
// //     }

// //     res.json(customers);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching customers' });
// //   }
// // });




// // app.get('/customers', async (req, res) => {
// //   const { town } = req.query;

// //   try {
// //     const townDoc = await Town.findOne({ name: town });
// //     if (!townDoc) {
// //       return res.status(404).json({ error: 'Town not found' });
// //     }

// //     const customers = await Customer.find({ town: townDoc._id });
// //     res.json(customers);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching customers' });
// //   }
// // });

// // // Route to fetch customers by townId
// // app.get('/customers', async (req, res) => {
// //   const { townId } = req.query;

// //   if (!townId) {
// //     return res.status(400).json({ error: 'Town ID is required' });
// //   }

// //   try {
// //     const customers = await Customer.find({ town: townId }); // Assuming 'town' field in customer schema stores townId
// //     if (!customers.length) {
// //       return res.status(404).json({ error: 'No customers found for this town' });
// //     }

// //     res.json(customers);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching customers' });
// //   }
// // });

// // // Route to add a new customer
// // app.post('/customers', async (req, res) => {
// //   try {
// //     const { customer, town } = req.body;
// //     const townDoc = await Town.findOne({ name: town });
// //     if (!townDoc) {
// //       return res.status(404).json({ error: 'Town not found' });
// //     }

// //     const newCustomer = new Customer({ name: customer, town: townDoc._id });
// //     await newCustomer.save();
// //     res.json({ success: true, message: 'Customer added successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error adding customer' });
// //   }
// // });
 
// // app.get('/customers', async (req, res) => {
// //   const { townId } = req.query;

// //   if (!townId) {
// //     return res.status(400).json({ error: 'Town ID is required' });
// //   }

// //   try {
// //     // Assuming you're using Mongoose or similar ORM to fetch customers from a database
// //     const customers = await Customer.find({ townId });
    
// //     if (!customers.length) {
// //       return res.status(404).json({ error: 'No customers found for this town' });
// //     }

// //     res.json(customers);
// //   } catch (error) {
// //     res.status(500).json({ error: 'An error occurred while fetching customers' });
// //   }
// // });


 

// // app.get('/customers/:id', (req, res) => {
// //   const customerId = req.params.id;
// //   // Fetch customer from the database by customerId
// //   const customer = customer.find((cust) => cust._id === customerId);

// //   if (customer) {
// //     res.json(customer);
// //   } else {
// //     res.status(404).json({ message: 'Customer not found' });
// //   }
// // });


// // Route to fetch customers by town name or townId
// // Route to fetch customers by town name or townId
// // Consolidated route to fetch customers by town name or townId
// // app.get('/customers', async (req, res) => {
// //   const { town, townId } = req.query;

// //   try {
// //     let townDoc;

// //     if (town) {
// //       // Fetch town by name
// //       townDoc = await Town.findOne({ name: town });
// //       if (!townDoc) {
// //         return res.status(404).json({ error: 'Town not found' });
// //       }
// //     } else if (townId) {
// //       // Use townId directly
// //       townDoc = { _id: townId };
// //     } else {
// //       return res.status(400).json({ error: 'Town name or town ID is required' });
// //     }

// //     // Fetch customers by town ID
// //     const customers = await Customer.find({ town: townDoc._id });
// //     if (!customers.length) {
// //       return res.status(404).json({ error: 'No customers found for this town' });
// //     }

// //     res.json(customers);
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error fetching customers' });
// //   }
// // });
// // Route to fetch customers by townId
// app.get('/customers', async (req, res) => {
//   const { town } = req.query; // Expecting 'town' as query parameter
//   if (!town) {
//     return res.status(400).json({ error: 'Town ID is required' });
//   }
//   try {
//     const customers = await Customer.find({ town }); // Assuming 'town' field in customer schema stores townId
//     if (!customers.length) {
//       return res.status(404).json({ error: 'No customers found for this town' });
//     }
//     res.json(customers);
//   } catch (error) {
//     console.error('Error fetching customers:', error);
//     res.status(500).json({ error: 'Error fetching customers' });
//   }
// });


// // Route to fetch customer details by customerId
// app.get('/customers/:id', async (req, res) => {
//   const customerId = req.params.id;

//   try {
//     // Fetch customer from the database by customerId
//     const customer = await Customer.findById(customerId);
//     if (!customer) {
//       return res.status(404).json({ message: 'Customer not found' });
//     }

//     res.json(customer);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching customer details' });
//   }
// });

// // Route to add a new customer
// // app.post('/customers', async (req, res) => {
// //   const { customer, town } = req.body;

// //   try {
// //     const townDoc = await Town.findOne({ name: town });
// //     if (!townDoc) {
// //       return res.status(404).json({ error: 'Town not found' });
// //     }

// //     const newCustomer = new Customer({ name: customer, town: townDoc._id });
// //     await newCustomer.save();
// //     res.json({ success: true, message: 'Customer added successfully' });
// //   } catch (error) {
// //     res.status(500).json({ error: 'Error adding customer' });
// //   }
// // });



// // Add a new delivery (bottle)
// app.post('/bottles', async (req, res) => {
//   const { type, qty, pricePerBottle, customerId } = req.body;
//   const totalAmount = qty * pricePerBottle;

//   try {
//     // Create a new bottle record
//     const newBottle = new Bottle({
//       type,
//       qty,
//       pricePerBottle,
//       totalAmount,
//       customerId,
//       date: new Date()  // Set the date to current date
//     });
//     await newBottle.save();

//     // Update customer's total bill and balance
//     const customer = await Customer.findById(customerId);
//     if (customer) {
//       customer.totalBill += totalAmount;
//       customer.balance = customer.totalBill - customer.totalPaid;
//       await customer.save();
//     }

//     res.json({ success: true, message: 'Bottle recorded' });
//   } catch (error) {
//     console.error('Error adding bottle:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Fetch bottles for a specific customer
// app.get('/bottles', async (req, res) => {
//   const { customerId } = req.query;

//   try {
//     const bottles = await Bottle.find({ customerId }).sort({ date: -1 }); // Sort by date descending
//     res.json(bottles);
//   } catch (error) {
//     console.error('Error fetching bottles:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });
// // Update a bottle entry
// app.put('/bottles/:id', async (req, res) => {
//   const { id } = req.params;
//   const { type, qty, pricePerBottle, customerId } = req.body;
//   const totalAmount = qty * pricePerBottle;

//   try {
//     // Find the existing bottle and update it
//     const bottle = await Bottle.findById(id);
//     if (!bottle) return res.status(404).json({ message: 'Bottle not found' });

//     // Calculate the difference in total amount
//     const previousAmount = bottle.totalAmount;
//     bottle.type = type;
//     bottle.qty = qty;
//     bottle.pricePerBottle = pricePerBottle;
//     bottle.totalAmount = totalAmount;
//     await bottle.save();

//     // Update the customer's total bill and balance
//     const customer = await Customer.findById(customerId);
//     if (customer) {
//       customer.totalBill += (totalAmount - previousAmount); // Adjust total bill
//       customer.balance = customer.totalBill - customer.totalPaid;
//       await customer.save();
//     }

//     res.json({ success: true, message: 'Bottle updated' });
//   } catch (error) {
//     console.error('Error updating bottle:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// // Delete a bottle entry
// app.delete('/bottles/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     // Find and delete the bottle
//     const bottle = await Bottle.findByIdAndDelete(id);
//     if (!bottle) return res.status(404).json({ message: 'Bottle not found' });

//     // Update the customer's total bill and balance
//     const customer = await Customer.findById(bottle.customerId);
//     if (customer) {
//       customer.totalBill -= bottle.totalAmount; // Adjust total bill
//       customer.balance = customer.totalBill - customer.totalPaid;
//       await customer.save();
//     }

//     res.json({ success: true, message: 'Bottle deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting bottle:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// //  Record a payment
// app.post('/payments', async (req, res) => {
//   const { customerId, paymentAmount, date } = req.body;

//   try {
//     // Create a new payment record
//     const payment = new Payment({
//       customerId,
//       paymentAmount,
//       date
//     });
//     await payment.save();

//     // Update the customer's balance and total paid
//     const customer = await Customer.findById(customerId);
//     if (!customer) return res.status(404).send('Customer not found');

//     customer.balance -= paymentAmount;
//     customer.totalPaid += paymentAmount;
//     await customer.save();

//     res.status(201).send(payment);
//   } catch (error) {
//     res.status(500).send('Error recording payment: ' + error.message);
//   }
// });

// // Endpoint to record payment
// // app.post('/payments', async (req, res) => {
// //   try {
// //     const { customerId, paymentAmount, date } = req.body;

// //     // Validate input
// //     if (!customerId || !paymentAmount || isNaN(paymentAmount)) {
// //       return res.status(400).json({ message: 'Invalid input' });
// //     }

// //     // Record the payment
// //     const payment = new Payment({
// //       customerId,
// //       paymentAmount,
// //       date,
// //     });
// //     await payment.save();

// //     // Update customer balance
// //     const customer = await Customer.findById(customerId);
// //     if (!customer) {
// //       return res.status(404).json({ message: 'Customer not found' });
// //     }

// //     // Calculate new balance
// //     customer.balance = (customer.balance || 0) - paymentAmount;
// //     if (customer.balance < 0) customer.balance = 0; // Ensure balance doesn't go negative

// //     await customer.save();

// //     res.status(200).json({ message: 'Payment recorded and balance updated' });
// //   } catch (error) {
// //     console.error('Error recording payment:', error);
// //     res.status(500).json({ message: 'Internal server error' });
// //   }
// // });
// // Route to fetch payments for a specific customer
// app.get('/payments', async (req, res) => {
//   const { customerId } = req.query;

//   if (!customerId) {
//     return res.status(400).json({ error: 'Customer ID is required' });
//   }

//   try {
//     const payments = await Payment.find({ customerId });
//     res.json(payments);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching payments' });
//   }
// });

// // Add a new delivery
// app.post('/delivery', async (req, res) => {
//   const { bottleType, qty, pricePerBottle, customer } = req.body;
//   const totalAmount = qty * pricePerBottle;

//   try {
//     // Create new delivery record
//     const newDelivery = new Delivery({
//       bottleType,
//       qty,
//       pricePerBottle,
//       customer,
//       totalAmount,
//     });
//     await newDelivery.save();

//     // Update customer's total bill and balance
//     const customerData = await Customer.findOne({ name: customer });
//     customerData.totalBill += totalAmount;
//     customerData.balance = customerData.totalBill - customerData.totalPaid;
//     await customerData.save();

//     res.json({ success: true, message: 'Delivery recorded' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error recording delivery' });
//   }
// });

// // Record a Payment
// app.post('/payment', async (req, res) => {
//   const { customer, paymentAmount } = req.body;

//   try {
//     // Update customer's payment and balance
//     const customerData = await Customer.findOne({ name: customer });
//     customerData.totalPaid += paymentAmount;
//     customerData.balance = customerData.totalBill - customerData.totalPaid;
//     await customerData.save();

//     res.json({ success: true, message: 'Payment recorded' });
//   } catch (error) {
//     res.status(500).json({ success: false, message: 'Error recording payment' });
//   }
// });

// // Monthly Report (Deliveries and Balances)
// // Route to fetch monthly report for a specific customer and town
// app.get('/report/:townId/:customerId/:month', async (req, res) => {
//   const { townId, customerId, month } = req.params;

//   try {
//     const deliveries = await Delivery.find({
//       town: townId,
//       customer: customerId,
//       month: month,
//     });

//     const customer = await Customer.findById(customerId);

//     const totalAmount = deliveries.reduce((sum, delivery) => sum + delivery.amount, 0);
//     const totalBottles = deliveries.reduce((sum, delivery) => sum + delivery.bottles, 0);

//     res.json({
//       deliveries,
//       totalAmount,
//       totalBottles,
//       totalBill: customer.totalBill,
//       totalPaid: customer.totalPaid,
//       balance: customer.balance,
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Error generating report' });
//   }
// });

// app.delete('/towns/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     const town = await Town.findByIdAndDelete(id);
//     if (!town) {
//       return res.status(404).send('Town not found');
//     }
//     res.send('Town deleted successfully');
//   } catch (error) {
//     res.status(500).send('Server error');
//   }
// });
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
// const loginRoute = require('./login'); // Import login route

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// app.use('/login', loginRoute);
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/deliverySystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const routes = require('./routes');
app.use('/', routes);

// Start server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
