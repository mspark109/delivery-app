import Card from "../../components/Card";
import Page from "../../components/Page";
import Title from "../../components/Title";
import OrderApi from 'shared/api/OrderApi';
import Navbar from "../../components/Navbar";
import OrderStatusCard from "./OrderStatusCard";
import OrderPaymentCard from "./OrderPaymentCard";
import OrderDeliveryCard from "./OrderDeliveryCard";
import React from "react";
class OrderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { order: null }
  }

  async fetch() {
    try{
      const order = await OrderApi.fetchMyOrder();
      this.setState({order});
    }catch(e) {
      console.error(e);
    }
  }

  componentDidMount() {
    this.fetch();
  }


  render() {
    const {order} = this.state;
    return(
      <div className="OrderPage">
        <Page header={<Title>주문내역</Title>} footer={<Navbar />} >
          {order && <>
            <OrderStatusCard order={order} />
            <OrderPaymentCard order={order} />
            <OrderDeliveryCard order={order} />
          </>}
        </Page>
      </div>
    )
  }

}

  const fakeOrder= {
      "id": "CACDA420",
      "orderDate": "2025. 3. 31. 오후 11:31:35",
      "status": "음식 준비중",
      "name": "짜장면",
      "totalPrice": 7000,
      "paymentMethod": "마이페이",
      "productPrice": 6000,
      "deliveryPrice": 3000,
      "discountPrice": 2000,
      "deliveryAddress": "서울특별시 송파구 잠실동 1번지",
      "deliveryContact": "010-1111-2222",
      "messageToShop": "포크는 주지 마세요",
      "messageToRider": "안전하게 오세요",
      "position": [
          30,
          30
      ]
  };


export default OrderPage;