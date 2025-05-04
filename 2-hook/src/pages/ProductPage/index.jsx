import Page from "../../components/Page";
import Title from "../../components/Title";
import Navbar from "../../components/Navbar";
import OrderableProductItem from "./OrderableProductItem";
import React, { useEffect } from "react";
import ProductApi from 'shared/api/ProductApi'

const ProductPage = () => {
  const [productList, setProductList] = React.useState([]);

  const fetch = async () => {
    try {
      const productList = await ProductApi.fetchProductList();
      setProductList(productList);
    }catch(e){
      //openDialog(<ErrorDialog />);
      return;
    }
  }

  React.useEffect(() => {
    fetch();
  }, []);
  

  return (
    <div className="ProductPage">
      <Page header={<Title>메뉴목록</Title>} footer={<Navbar />}>
        <ul>
            {productList.map(product => (
              <li key={product.id}>
                <OrderableProductItem product={product} />
              </li>
            ))}
        </ul>
      </Page>
    </div>
  );
};
export default ProductPage;