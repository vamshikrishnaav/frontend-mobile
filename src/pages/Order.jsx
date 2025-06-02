import { useState } from "react";
import { pizzas } from "../data/pizzas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Order.css";
const API = import.meta.env.VITE_API;

export default function Order({ cart, updateCart, userDetails }) {
  const [cookingInstructions, setCookingInstructions] = useState("");
  const [orderType, setOrderType] = useState("Dine In");
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [table, setTable] = useState(0);

  const navigate = useNavigate();

  const taxes = 5;
  const deliveryCharge = orderType === "Take Away" ? 50 : 0;

  const cartItems = pizzas
    .filter((pizza) => cart[pizza.id])
    .map((pizza) => ({
      ...pizza,
      quantity: cart[pizza.id],
      size: "14″",
    }));

  const itemTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const grandTotal = itemTotal + taxes + deliveryCharge;

  const handleSwipeOrder = async () => {
    let order = {
      tableNumber: table,
      orderItem: {},
      orderType: orderType === "Dine In" ? "dineIn" : "takeAway",
    };
    let orderItem = {};
    cartItems.forEach((item) => {
      orderItem[item.name] = { price: item.price, quantity: item.quantity };
    });
    order.orderItem = orderItem;

    console.log(order);

    const placeOrder = await axios.post(
      `${API}/api/v1/order/create-order`,
      order,
      { withCredentials: true }
    );

    if (!placeOrder) {
      console.log("failed to place order");
    }

    navigate("/");
    console.log(placeOrder);

    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="order-page">
      <h1>Good evening</h1>
      <p>Place you order here</p>

      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>

      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} />
          <div className="item-info">
            <div className="item-header">
              <h4>{item.name}</h4>
              <button
                className="remove-btn"
                onClick={() => updateCart(item.id, -item.quantity)}
              >
                ❌
              </button>
            </div>
            <p>₹ {item.price}</p>
            <p>{item.size}</p>
            <div className="quantity-controls">
              <button
                onClick={() => updateCart(item.id, -1)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateCart(item.id, 1)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <button
        className="instructions-button"
        onClick={() => setShowModal(true)}
      >
        Add cooking instructions (optional)
      </button>
      <div>
        <input
          placeholder="Enter table number"
          onChange={(e) => setTable(e.target.value)}
        ></input>
      </div>
      <div className="order-type">
        {["Dine In", "Take Away"].map((type) => (
          <button
            key={type}
            className={orderType === type ? "active" : ""}
            onClick={() => setOrderType(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="price-breakdown">
        <div>
          <span>Item Total</span>
          <span>₹{itemTotal.toFixed(2)}</span>
        </div>
        <div>
          <span>Delivery Charge</span>
          <span>₹{deliveryCharge}</span>
        </div>
        <div>
          <span>Taxes</span>
          <span>₹{taxes.toFixed(2)}</span>
        </div>
        <hr />
        <div className="grand-total">
          <strong>Grand Total</strong>
          <strong>₹{grandTotal.toFixed(2)}</strong>
        </div>
      </div>

      <div className="user-details">
        <p>
          <strong>Your details</strong>
        </p>
        <p>
          {userDetails?.name}, {userDetails?.phone}
        </p>
        <p>📍 {userDetails?.address}</p>
        <p>
          ⏱️ Delivery in <strong>42 mins</strong>
        </p>
      </div>

      <div className="swipe-order">
        <button className="swipe-btn" onClick={handleSwipeOrder}>
          ➡️ Swipe to Order
        </button>
      </div>

      {showToast && (
        <div className="toast-success">🎉 Order placed successfully!</div>
      )}

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h2>Add Cooking instructions</h2>
            <textarea
              value={cookingInstructions}
              onChange={(e) => setCookingInstructions(e.target.value)}
              placeholder="Type your instructions here..."
            />
            <p className="note">
              The restaurant will try its best to follow your request. However,
              refunds or cancellations in this regard won’t be possible.
            </p>
            <div className="modal-buttons">
              <button onClick={() => setShowModal(false)} className="cancel">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="next">
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
