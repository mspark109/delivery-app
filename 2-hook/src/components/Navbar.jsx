
// TODO: MyLayout, MyRouter연동
const Navbar = ({match}) => {

  return (
    <nav className="Navbar">
      <a className={"active"} href="/">
        메뉴목록
      </a>
      <a href="/order">주문내역</a>
    </nav>
  )
}

export default Navbar;

