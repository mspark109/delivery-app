import { Link } from "../lib/MyRouter";

const Navbar = () => {

  return (
    <nav className="Navbar">
      <Link className="active" to='/'>메뉴목록</Link>
      <Link to='/order'>주문내역</Link>
    </nav>
  )
}

export default Navbar;
