import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Title from "../../components/Title";
import ProductApi from "shared/api/ProductApi";
import React from "react";
import OrderableProductItem from "./OrderableProductItem";
import { BackDrop } from "../../components/Backdrop";
import { Dialog } from "../../components/Dialog";
import * as MyLayout from "../../lib/MyLayout";
import ErrorDialog from "../../components/ErrorDialog";


class ProductPage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { productList: [],
    };
  }

  async fetch() {
    const { startLoading, finishLoading, openDialog } = this.props;

    startLoading("메뉴 로딩중..");
    try{
      const productList = await ProductApi.fetchProductList();
      this.setState({ productList });
    }catch(e){
      openDialog(<ErrorDialog />);
      return;
    }
    finishLoading();
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