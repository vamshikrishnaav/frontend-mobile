import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import PizzaList from "../components/PizzaList";
import { pizzas } from "../data/pizzas";
import "../App.css";

export default function HomePage({ cart, updateCart }) {
  const [selectedCategory, setSelectedCategory] = useState("Pizza");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredPizzas = pizzas.filter(
    (pizza) =>
      pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory === "Pizza" || pizza.category === selectedCategory)
  );

  return (
    <div className="app">
      <Header />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="tabs">
        {["Pizza", "Burger", "Drink", "French fries", "Veggies"].map((cat) => (
          <button
            key={cat}
            className={`tab ${cat === selectedCategory ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="title">Available {selectedCategory}s</div>
      <PizzaList pizzas={filteredPizzas} cart={cart} updateCart={updateCart} />

      {Object.keys(cart).length > 0 && (
        <div className="footer">
          <button className="next-btn" onClick={() => navigate("/order")}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
