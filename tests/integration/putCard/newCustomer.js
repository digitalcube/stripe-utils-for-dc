const stripe = require('stripe')(process.env.STRIPE_KEY)
const assert = require('power-assert')

const { putStripeCustomer } = require('../../../index')

describe('putNewCard', () => {
  const token = 'tok_amex'
  const username = process.env.TEST_USERNAME
  const stage = 'development'
  const email = process.env.TEST_EMAIL
  const userPoolId = 'userpool_DEV'
  let props = {}
  describe('new customer', () => {
    let customer
    let card
    before(async () => {
      const customerId = ''
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
      card = await stripe.customers.retrieveCard(
        props.stripeCustomerId,
        customer.default_source
      )
    })
    it('should has cardId', () => {
      assert.notEqual(props.newCard.id, '')
    })
    it('should has customer id', () => {
      assert.notEqual(props.stripeCustomerId, '')
    })
    it('should has valid metadata', () => {
      assert.deepEqual(customer.metadata, {
        UserPoolId: userPoolId,
        Username: username
      })
    })
    it('should match default card brand', () => {
      assert.deepEqual(card.brand, 'American Express')
    })
    after(async () => {
      await stripe.customers.del(props.stripeCustomerId)
    })
  })
})
