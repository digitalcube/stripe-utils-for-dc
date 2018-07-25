class ServiceCustomer {
  constructor (userPoolId) {
    this.UserPoolId = userPoolId
  }
  setUserData (username, email, customerId = '') {
    this.setUsername(username)
    this.setEmail(email)
    this.setStripeCustomerId(customerId)
  }
  setUsername (username) {
    this.username = username
  }
  setEmail (email) {
    this.email = email
  }
  setStripeCustomerId (customerId) {
    this.customerId = customerId
  }
  setStripeCard (card) {
    this.card = card
  }
  getStripeCard () {
    return this.card
  }
  getEmail () {
    return this.email
  }
  getUsername () {
    return this.username
  }
  getStripeMetadata () {
    return {
      UserPoolId: this.UserPoolId,
      Username: this.getUsername()
    }
  }
  getStripeCustomerId () {
    return this.customerId
  }
}
module.exports = ServiceCustomer
