import React, { useState } from "react";

export default function App() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showCart, setShowCart] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);

  const products = [
    {
      id: 1,
      name: "iPhone 13",
      price: 999,
      category: "apple",
      description: "Pantalla Super Retina XDR",
    },
    {
      id: 2,
      name: "Samsung S21",
      price: 799,
      category: "android",
      description: "Cámara profesional",
    },
    {
      id: 3,
      name: "Google Pixel 6",
      price: 599,
      category: "android",
      description: "Cámara computational",
    },
  ];

  const addToCart = (product) => setCart([...cart, product]);
  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));
  const toggleFavorite = (product) => {
    favorites.some((fav) => fav.id === product.id)
      ? setFavorites(favorites.filter((fav) => fav.id !== product.id))
      : setFavorites([...favorites, product]);
  };

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="app">
      <header className="navbar">
        <h1>Tienda de Celulares</h1>
        <div>
          <button
            onClick={() => {
              setShowFavorites(!showFavorites);
              setShowCart(false);
            }}
          >
            Favoritos ({favorites.length})
          </button>
          <button
            onClick={() => {
              setShowCart(!showCart);
              setShowFavorites(false);
            }}
          >
            Carrito ({cart.length})
          </button>
        </div>
      </header>

      <div className="filters">
        {["all", "apple", "android"].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? "active" : ""}
          >
            {cat === "all" ? "Todos" : cat === "apple" ? "Apple" : "Android"}
          </button>
        ))}
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className="product-actions">
              <button onClick={() => addToCart(product)}>
                Agregar al carrito
              </button>
              <button
                onClick={() => toggleFavorite(product)}
                className={
                  favorites.some((fav) => fav.id === product.id)
                    ? "favorite active"
                    : "favorite"
                }
              >
                {favorites.some((fav) => fav.id === product.id) ? "❤️" : "🤍"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="modal">
          <h2>Carrito</h2>
          <button onClick={() => setShowCart(false)}>Cerrar</button>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <span>
                    {item.name} - ${item.price}
                  </span>
                  <button onClick={() => removeFromCart(item.id)}>
                    Eliminar
                  </button>
                </div>
              ))}
              <p>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</p>
            </>
          )}
        </div>
      )}

      {showFavorites && (
        <div className="modal">
          <h2>Favoritos</h2>
          <button onClick={() => setShowFavorites(false)}>Cerrar</button>
          {favorites.length === 0 ? (
            <p>No hay favoritos</p>
          ) : (
            <div className="products">
              {favorites.map((product) => (
                <div key={product.id} className="product-card">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button onClick={() => addToCart(product)}>
                    Agregar al carrito
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
