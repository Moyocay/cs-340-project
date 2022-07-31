class User {

    constructor(Operation,id_user,username,password, first_name, last_name, sw_active) {

      this.customerId = CustomerId;
      this.name = Name;
      this.address = Address;
      this.phoneNumber = PhoneNumber;
    }

    getCustomerId() {
      return this.customerId;
    }

    setCustomerId(customerId) {
      this.customerId = customerId
    }

    getName() {
      return this.name;
    }

    setName(name) {
      this.name = name
    }

    getAddress() {
      return this.address;
    }

    setAddress(address) {
      this.address = address
    }

    getPhoneNumber() {
      return this.phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
      this.phoneNumber = phoneNumber
    }

}
module.exports.user = User;