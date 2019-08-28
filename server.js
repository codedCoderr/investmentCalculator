const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
app.use(express.json({ extended: false }));
app.post('/calculate', (req, res) => {
  try {
    const { subscription, tenor, interest } = req.body;
    if (!subscription) return res.status(400).send('Subscription is required');
    if (!tenor) return res.status(400).send('Tenor is required');
    if (!interest) return res.status(400).send('Interest is required');
    const interestByMonth = Number(interest) / 12;
    let startMonth = 1;
    let startAmount = 0;

    for (let i = startMonth; i <= Number(tenor); i++) {
      const newAmount =
        startAmount +
        Number(subscription) +
        (interestByMonth / 100) * (Number(subscription) + startAmount);

      startAmount = newAmount;
    }

    res.status(200).json(startAmount);
  } catch (error) {}
});

const swaggerDefinition = {
  info: {
    title: 'INVESTMENT CALCULATOR',
    version: '1.0.0',
    description:
      'Calculate the amount you should invest based on the amount per month and the investment rate'
  },
  host: 'localhost:3500',
  basePath: '/'
};

const options = {
  swaggerDefinition,
  apis: ['docs/**/*.yaml']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 3500;

if (!module.parent) {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;
