import PizzaCard from "./PizzaCard";
import "./PizzaList.css";


export default function PizzaList({ pizzas, cart, updateCart }) {
  return (
    <div className="pizza-list">
      {pizzas.map((pizza) => (
        <PizzaCard
          key={pizza.id}
          id={pizza.id}
          name={pizza.name}
          price={pizza.price}
          image={pizza.image}
          quantity={cart[pizza.id] || 0} 
          onAdd={() => updateCart(pizza.id, 1)}
          onRemove={() => updateCart(pizza.id, -1)}
        />
      ))}
    </div>
  );
}
