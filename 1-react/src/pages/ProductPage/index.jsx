import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Title from "../../components/Title";
import ProductApi from "shared/api/ProductApi";
import React from "react";
import OrderableProductItem from "./OrderableProductItem";
import { BackDrop } from "../../components/Backdrop";
import { Dialog } from "../../components/Dialog";
import * as MyLayout from "../../lib/MyLayout";


class ProductPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { productList: [],
    };
  }

  async fetch() {
    this.props.openDialog(<Dialog>메뉴 로딩중..</Dialog>);
    try{
      const productList = await ProductApi.fetchProductList();
      this.setState({ productList });
      this.props.closeDialog();
    }catch(e){
      console.error(e);
    }
  }

  componentDidMount() {
    this.fetch();
  }


  render() {
    return (
      <>
      <div className="ProductPage">
        <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
          <ul>
              {this.state.productList.map(product => (
                <li key={product.id}>
                  <OrderableProductItem product={product} />
                </li>
              ))}
          </ul>
        </Page>
      </div>
      </>
    )
  }
}

export default MyLayout.withLayout(ProductPage);