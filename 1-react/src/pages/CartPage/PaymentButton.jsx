import Button from "../../components/Button";

const PaymentButton = ({onClick}) => {

  return(
    <div className="PaymentButton">
      <Button styleType="brand-solid block" form="order-form">결제하기</Button>
    </div>
  )
}
export default PaymentButton;