class StripeCard {
  constructor (username) {
    this.username = ''
    this.cardProps = {}
  }
  setExpires (month, year) {
    const updateProps = {
      exp_year: year ? parseInt(year) : 0,
      exp_month: month ? parseInt(month) : 0
    }
    this.cardProps = Object.assign(this.cardProps, updateProps)
  }
  setCardInfo (token, id = '', brand = '', last4 = '') {
    const updateProps = {
      last4,
      id,
      token,
      brand
    }
    this.cardProps = Object.assign(this.cardProps, updateProps)
  }
  getToken () {
    return this.cardProps.token
  }
}
module.exports = StripeCard
