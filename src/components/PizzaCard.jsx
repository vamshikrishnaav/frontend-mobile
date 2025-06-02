import './PizzaCard.css'
export default function PizzaCard({ name, price, image, quantity, onAdd, onRemove }) {
  return (
    <div className="pizza-card">
      <img src={image} alt={name} />
      <div className="card-content">
        <div>
          <h4>{name}</h4>
          <p>₹ {price}</p>
        </div>
        <div className="quantity-controls">
          <button className="quantity-btn" onClick={onRemove} disabled={quantity === 0}>-</button>
          <span className="quantity-number">{quantity}</span>
          <button className="quantity-btn" onClick={onAdd}>+</button>
        </div>
      </div>
    </div>
  );
}
