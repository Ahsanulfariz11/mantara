const express = require('express');
const cors = require('cors');
const midtransClient = require('midtrans-client');

const app = express();
app.use(cors());
app.use(express.json());

// Use sandbox placeholder keys as requested
const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || 'SB-Mid-server-xW-yT0OQz_eN_P1-p5Q_Z_uX'; // Example sandbox key format

const snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: SERVER_KEY
});

app.post('/api/payment/create', async (req, res) => {
  try {
    const { order_id, gross_amount, first_name, email, phone } = req.body;

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: Math.round(gross_amount) // Must be integer
      },
      customer_details: {
        first_name: first_name,
        email: email || 'passenger@mantara.com',
        phone: phone
      },
      // Restrict payment methods to QRIS only
      enabled_payments: ["qris"]
    };

    const transaction = await snap.createTransaction(parameter);
    res.json({ token: transaction.token, redirect_url: transaction.redirect_url });
  } catch (error) {
    console.error("Midtrans Error:", error);
    res.status(500).json({ error: 'Failed to generate transaction token' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`MANTARA Payment API running on port ${PORT}`);
});
