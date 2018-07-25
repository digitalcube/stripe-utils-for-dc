module.exports = {
  ServiceCustomer: require('./lib/classes/services/customer'),
  CustomerUpdater: require('./lib/classes/services/customerUpdater'),
  StripeCustomer: require('./lib/classes/stripe/customer'),
  StripeCustomerUpdater: require('./lib/classes/stripe/customerUpdater'),
  StripeCard: require('./lib/classes/stripe/card')
}
