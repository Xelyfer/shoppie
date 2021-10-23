import "./App.css";
import Create from "./components/Create";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <a className="button">Create New Product</a>
      {/* <ProductCard /> */}
      <Create />
    </div>
  );
}

export default App;
