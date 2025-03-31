import Button from "./Button";

const ProductItem = ({product}) => {


  const { name, price, thumbnail } = product;
  
  const handleClick=() => {
    console.log('handle Click');
  }

  return (
      <div className="ProductItem">
        <div className="description">
          <h2>{name}</h2>
          <div>{price.toLocaleString()}원</div>
          <Button styleType="brand" onClick={handleClick}>주문하기</Button>
        </div>
        <div className="thumbnail">
          <img src={thumbnail} alt={name} />
        </div>
      </div>
  )
}

export default ProductItem;