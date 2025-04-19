function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Carrito de Celulares</h1>
      <ProductList />
    </div>
  );
}

function ProductList() {
  const products = [
    { id: 1, name: "iPhone 13", category: "Apple", price: 900, favorite: true },
    {
      id: 2,
      name: "Samsung S21",
      category: "Samsung",
      price: 750,
      favorite: false,
    },
    {
      id: 3,
      name: "Xiaomi Mi 11",
      category: "Xiaomi",
      price: 600,
      favorite: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductCard({ product }) {
  return (
    <div className="border rounded-2xl p-4 shadow-md">
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">Categoría: {product.category}</p>
      <p className="text-lg font-bold">${product.price}</p>
      <FavoriteIcon favorite={product.favorite} />
      <AddToCartButton />
    </div>
  );
}

function FavoriteIcon({ favorite }) {
  return <span className="text-red-500 text-xl">{favorite ? "❤️" : "🤍"}</span>;
}

function AddToCartButton() {
  return (
    <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
      Agregar al carrito
    </button>
  );
}

export default App;
