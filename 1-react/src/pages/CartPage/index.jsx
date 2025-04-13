import OrderApi from "shared/api/OrderApi";
import Page from "../../components/Page";
import ProductItem from "../../components/ProductItem";
import Title from "../../components/Title";
import OrderForm from "./OrderForm";
import PaymentButton from "./PaymentButton";
import React from "react";
import ProductApi from "shared/api/ProductApi";
import * as MyRouter from "../../lib/MyRouter";
import * as MyLayout from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";

class CartPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = { product : null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async fetch() {
    const { startLoading, finishLoading, openDialog } = this.props;

    startLoading("장바구니에 담는중..");
    const {productId} = this.props.params();
    if (!productId) return;
    
    try {  
      const product = await ProductApi.fetchProduct(productId);
      this.setState({product});
    }catch(e) {
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
  }

  componentDidMount() {
    this.fetch();
  }

  handleSubmit(values) {
    console.log(values);

    //TODO: 결제 성공 후 
    this.props.navigate('/order')
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

export default MyLayout.withLayout(MyRouter.WithRouter(CartPage));