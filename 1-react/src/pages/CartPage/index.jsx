import OrderApi from "shared/api/OrderApi";
import Page from "../../components/Page";
import ProductItem from "../../components/ProductItem";
import Title from "../../components/Title";
import OrderForm from "./OrderForm";
import PaymentButton from "./PaymentButton";
import React from "react";
import ProductApi from "shared/api/ProductApi";

class CartPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { product : null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetch() {
    try {
      const product = await ProductApi.fetchProduct(this.props.productId);
      this.setState({product});
    }catch(e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.fetch();
  }

  handleSubmit(values) {
    console.log(values);
  }


  render() {
    return(
      <div className="CartPage">
        <Page header={<Title>장바구니</Title>} footer={<PaymentButton/>}>
          {this.state.product && <ProductItem product={this.state.product} />}
          <OrderForm onSubmit={this.handleSubmit}/>
        </Page>
      </div>
    )
  }
}

export default CartPage;