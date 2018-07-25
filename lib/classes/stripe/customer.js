class StripeCustomer {
  constructor (id = '', email = '', metadata = {}) {
    this.setCustomerId(id)
    this.setEmail(email)
    this.setMetadata(metadata)
  }
  setCustomerId (id) {
    this.customerId = id
  }
  setEmail (email) {
    this.email = email
  }
  setMetadata (metadata) {
    this.metadata = metadata
  }
  getCustomerId () {
    return this.customerId
  }
  getCreateNewProps () {
    return {
      email: this.email,
      metadata: this.metadata
    }
  }
}
module.exports = StripeCustomer
