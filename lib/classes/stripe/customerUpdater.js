class StripeCustomerUpdater {
  constructor (stripe, stage = 'development') {
    this.stripe = stripe
    this.stage = stage
    this.customer = {}
    this.card = {}
  }
  setCard (card) {
    this.card = card
  }
  setCustomer (customer) {
    this.customer = customer
  }
  async updateDefaultCard (customerId, cardId) {
    const params = {
      default_source: cardId
    }
    const result = await this.stripe.customers.update(customerId, params)
    return result
  }
  async putNewCard (customerId) {
    const params = {
      source: this.card.getToken()
    }
    const newCard = await this.stripe.customers.createSource(customerId, params)
    return newCard
  }
  async createNewCustomer () {
    const props = this.customer.getCreateNewProps()
    const result = await this.stripe.customers.create(props)
    return result
  }
  async createCustomerIfExists () {
    const customerId = this.customer.getCustomerId()
    if (!customerId) {
      const customer = await this.createNewCustomer()
      return customer.id
    }
    try {
      const customer = await this.stripe.customers.retrieve(customerId)
      return customer.id
    } catch (e) {
      if (e.statusCode === 404 && e.code === 'resource_missing') {
        const customer = await this.createNewCustomer()
        return customer.id
      }
      throw e
    }
  }
}

module.exports = StripeCustomerUpdater
