import ProductPage from "./pages/ProductPage"
import OrderPage from "./pages/OrderPage"
import CartPage from "./pages/CartPage";
import * as  MyRouter from './lib/MyRouter';


const App = () => (
  <MyRouter.Router>
    <MyRouter.Routes>
      <MyRouter.Route path="/cart" element={<CartPage />} />
      <MyRouter.Route path="/order" element={<OrderPage />} />
      <MyRouter.Route path="/" element={<ProductPage />} />
    </MyRouter.Routes>
  </MyRouter.Router>
);

export default App;
