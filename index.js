const ServiceCustomer = require('./lib/classes/services/customer')
const CustomerUpdater = require('./lib/classes/services/customerUpdater')
const StripeCustomer = require('./lib/classes/stripe/customer')
const StripeCustomerUpdater = require('./lib/classes/stripe/customerUpdater')
const StripeCard = require('./lib/classes/stripe/card')

const putStripeCustomer = async (
  stripe,
  username,
  email,
  userPoolId,
  cardToken,
  customerId = '',
  stage = 'development'
) => {
  const shifterCustomer = new ServiceCustomer(userPoolId)
  shifterCustomer.setUserData(username, email, customerId)
  // カード情報のセット
  const card = new StripeCard(username)
  card.setCardInfo(cardToken)
  shifterCustomer.setStripeCard(card)
  // 情報更新用ワーカー各種の起動
  const stripeUpdater = new StripeCustomerUpdater(stripe, stage)
  const updater = new CustomerUpdater(stripeUpdater, StripeCustomer, stage)
  updater.setServiceCustomer(shifterCustomer)
  // Stripe情報の更新
  const props = await updater.updateStripeData()
  return props
}

module.exports = {
  putStripeCustomer,
  ServiceCustomer,
  CustomerUpdater,
  StripeCustomer,
  StripeCustomerUpdater,
  StripeCard
}
