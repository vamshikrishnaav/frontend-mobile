const categories = ["Burger", "Pizza", "Drink", "French fries", "Veggies"];

export default function CategoryTabs() {
  return (
    <div className="tabs">
      {categories.map((cat, idx) => (
        <button key={idx} className={cat === "Pizza" ? "tab active" : "tab"}>
          {cat}
        </button>
      ))}
    </div>
  );
}
