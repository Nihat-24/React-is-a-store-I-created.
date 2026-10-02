import { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Header from "./components/Header.jsx";
import RouterConfig from "./config/RouterConfig.jsx";
import { fetchProducts } from "./redux/counterSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <RouterConfig />
    </div>
  );
}

export default App;
