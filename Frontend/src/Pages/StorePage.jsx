import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const StorePage = () => {
  const { id } = useParams(); // store ID from route
  const [store, setStore] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/store/${id}`);
        setStore(response.data.store);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to fetch store data:", error);

        // ✅ Default Dummy Data
        setStore({
          name: "Sample Store",
          description: "This is a demo store showcasing default products.",
          ownerName: "John Doe",
          logoUrl: "https://via.placeholder.com/150",
        });

        setProducts([
          {
            _id: "1",
            name: "Wireless Headphones",
            description: "High-quality noise-cancelling headphones.",
            imageUrl: "https://via.placeholder.com/300x200",
            price: 99.99,
          },
          {
            _id: "2",
            name: "Smart Watch",
            description: "Track your fitness and notifications easily.",
            imageUrl: "https://via.placeholder.com/300x200",
            price: 149.49,
          },
          {
            _id: "3",
            name: "Bluetooth Speaker",
            description: "Portable speaker with deep bass sound.",
            imageUrl: "https://via.placeholder.com/300x200",
            price: 79.99,
          },
          {
            _id: "4",
            name: "Gaming Mouse",
            description: "Ergonomic mouse with RGB lighting.",
            imageUrl: "https://via.placeholder.com/300x200",
            price: 45.00,
          },
        ]);
      }
    };

    fetchStoreData();
  }, [id]);

  if (!store) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-600">Loading store...</p>
      </div>
    );
  }

  return (
    <>
      <Header />

      <main className="bg-gray-100 min-h-screen p-4">
        {/* Store Banner */}
        <section className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <img
              src={store.logoUrl || "https://via.placeholder.com/150"}
              alt="Store Logo"
              className="w-32 h-32 object-cover rounded-full border-2 border-yellow-400"
            />
            <div>
              <h1 className="text-4xl font-extrabold text-blue-900 mb-2">{store.name}</h1>
              <p className="text-gray-700">{store.description}</p>
              <p className="mt-2 text-sm text-gray-500">Seller: {store.ownerName}</p>
            </div>
          </div>
        </section>

        {/* Product Grid */}
        <section>
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-600">This store has no products yet.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div key={product._id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/300x200"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-blue-900">{product.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{product.description}</p>
                    <p className="text-yellow-600 font-bold mt-2">${product.price.toFixed(2)}</p>
                    <button className="mt-3 w-full bg-yellow-400 text-blue-900 font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
};

export default StorePage;
