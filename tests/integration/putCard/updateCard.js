const stripe = require('stripe')(process.env.STRIPE_KEY)
const assert = require('power-assert')

const { putStripeCustomer } = require('../../../index')

describe('putNewCard', () => {
  const token = 'tok_amex'
  const username = process.env.TEST_USERNAME
  const stage = 'development'
  const customerId = process.env.TEST_CUSTOMER_ID
  const email = process.env.TEST_EMAIL
  const userPoolId = 'userpool_DEV'
  let props = {}
  describe('exists customer', () => {
    let customer
    before(async () => {
      props = await putStripeCustomer(
        stripe,
        username,
        email,
        userPoolId,
        token,
        customerId,
        stage
      )
      customer = await stripe.customers.retrieve(props.stripeCustomerId)
    })
    it('should update same customer', () => {
      assert.equal(props.stripeCustomerId, customerId)
    })
    it('should set new card as default', () => {
      assert.equal(props.newCard.id, customer.default_source)
    })
  })
  describe('update next card', () => {
    let customer
    let card
    before(async () => {
      // register new user ('AMEX')
      props = await putStripeCustomer(
        stripe,
        username,
        email,
        userPoolId,
        token,
        '',
        stage
      )
      // add new card ('VISA')
      props = await putStripeCustomer(
        stripe,
        username,
        email,
        userPoolId,
        'tok_visa',
        props.stripeCustomerId,
        stage
      )
      customer = await stripe.customers.retrieve(props.stripeCustomerId)
      card = await stripe.customers.retrieveCard(
        props.stripeCustomerId,
        customer.default_source
      )
    })
    it('should set new card as default', () => {
      assert.equal(props.newCard.id, customer.default_source)
    })
    it('should match default card brand', () => {
      assert.deepEqual(card.brand, 'Visa')
    })
    after(async () => {
      await stripe.customers.del(props.stripeCustomerId)
    })
  })
})
