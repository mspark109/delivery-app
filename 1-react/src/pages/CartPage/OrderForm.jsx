import FormControl from "../../components/FormControl";
import React from "react";

class OrderForm extends React.Component {

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  getInputValueByName(name) {
    if(!this.formRef.current) return;

    const inputElement = this.formRef.current.elements.namedItem(name);
    if(!inputElement) return '';

    return inputElement.value;
  }

  handleSubmit(e) {
    e.preventDefault();

    const deliveryAddress = this.getInputValueByName('deliveryAddress');
    const deliveryContact = this.getInputValueByName('deliveryContact');
    const paymentMethod = this.getInputValueByName('paymentMethod');
    const messageToShop = this.getInputValueByName('messageToShop');
    const messageToRider = this.getInputValueByName('messageToRider');
    this.props.onSubmit({
      deliveryAddress,
      deliveryContact,
      paymentMethod,
      messageToShop,
      messageToRider
    });
  }

  render() {
    return (
        <form className="OrderForm" id="order-form" ref={this.formRef} onSubmit={this.handleSubmit}>
          <FormControl label="주소" htmlFor="deliveryAddress" required autoFocus>
            <input type="text" id="deliveryAddress" />  
          </FormControl>
          <FormControl label="연락처" htmlFor="deliveryContact" required>
            <input type="text" id="deliveryContact" />  
          </FormControl>
          <FormControl label="결제수단" htmlFor="paymentMethod" reqruied>
          <select name="paymentMethod" id="paymentMethod" >
            <option value="마이페이" >마이페이</option>
            <option value="만나서결제" >만나서결제제</option>
          </select>
          </FormControl>
          <FormControl label="가게 사장님께" htmlFor="messageToShop">
            <textarea id="messageToShop" />
          </FormControl>
          <FormControl label="라이더님께" htmlFor="messageToRider">
            <textarea id="messageToRider" />
          </FormControl>    
        </form>
    )
  }
  
}

export default OrderForm;