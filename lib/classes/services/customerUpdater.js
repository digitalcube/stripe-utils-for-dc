class CustomerUpdater {
  constructor (stripeUpdater, StripeCustomer, stage = 'development') {
    this.stripeUpdater = stripeUpdater
    this.StripeCustomer = StripeCustomer
    this.stage = stage
  }
  setServiceCustomer (customer) {
    this.customer = customer
  }
  async updateStripeData () {
    try {
      if (!this.customer) {
        throw new Error(
          'Should run `setServiceCustomer` before running updateStripeData()'
        )
      }
      const customerId = this.customer.getStripeCustomerId()
      const email = this.customer.getEmail()
      const metadata = this.customer.getStripeMetadata()
      // Stripeに送るcustomer情報
      const customer = new this.StripeCustomer(customerId, email, metadata)
      this.stripeUpdater.setCustomer(customer)
      // Stripeに送るCard情報
      const card = this.customer.getStripeCard()
      this.stripeUpdater.setCard(card)
      // customerが存在しない場合は新規に作る
      const stripeCustomerId = await this.stripeUpdater.createCustomerIfExists()
      // cardを新しく登録する
      const newCard = await this.stripeUpdater.putNewCard(stripeCustomerId)
      // defaultのカードを変更する
      await this.stripeUpdater.updateDefaultCard(stripeCustomerId, newCard.id)
      return {
        newCard,
        stripeCustomerId
      }
    } catch (e) {
      console.log(e)
      return e
    }
  }
}
module.exports = CustomerUpdater
