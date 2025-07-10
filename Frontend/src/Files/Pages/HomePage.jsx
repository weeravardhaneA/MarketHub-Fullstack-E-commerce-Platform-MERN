import { useNavigate } from "react-router-dom";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header with mobile menu and login/cart */}
      <Header />

      {/* Main Section */}
      <main className="w-full min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-100 flex flex-col items-center justify-start pt-16 px-4">
        {/* Hero Section */}
        <section className="text-center max-w-4xl mb-16">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-6">Welcome to ShopNest</h1>
          <p className="text-xl text-gray-700 mb-8">
            A modern marketplace where <span className="text-blue-800 font-semibold">sellers</span> create unique stores and <span className="text-blue-800 font-semibold">buyers</span> discover quality products from trusted vendors.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-3 bg-yellow-400 text-blue-900 rounded-xl font-semibold hover:bg-yellow-500 transition"
            >
              Join as Seller
            </button>
            <button
              onClick={() => navigate("/stores")}
              className="px-6 py-3 bg-white text-blue-900 border border-blue-900 rounded-xl font-semibold hover:bg-blue-100 transition"
            >
              Explore Stores
            </button>
          </div>
        </section>

        {/* Featured Stores */}
        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 mb-20">
          {[1, 2, 3].map((store) => (
            <div
              key={store}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition border-[3px] border-yellow-400"
            >
              <h3 className="text-2xl font-bold text-blue-900 mb-2">Store {store}</h3>
              <p className="text-gray-600 mb-4">
                Discover curated items from Store {store}. Each store offers unique value and trusted service.
              </p>
              <button
                onClick={() => navigate(`/store/${store}`)}
                className="text-blue-800 font-semibold hover:underline"
              >
                Visit Store →
              </button>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomePage;