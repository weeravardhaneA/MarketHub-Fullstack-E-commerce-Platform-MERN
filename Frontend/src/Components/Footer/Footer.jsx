const Footer = () => {
  return (
    <footer className="border-t-3 border-[var(--c3)] bg-blue-900 text-white">
      <div className="max-w-screen-xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">ShopNest</h2>
          <p className="text-sm text-gray-300">
            Your one-stop shop for all quality products. We value trust, speed, and reliability.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/products" className="hover:text-yellow-300 transition">Products</a></li>
            <li><a href="/about" className="hover:text-yellow-300 transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-yellow-300 transition">Contact</a></li>
            <li><a href="/log-in" className="hover:text-yellow-300 transition">Login</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Contact</h3>
          <p className="text-sm text-gray-300 mb-2">Email: support@shopnest.com</p>
          <p className="text-sm text-gray-300 mb-2">Phone: +1 234 567 890</p>
          <p className="text-sm text-gray-300">Location: 123 Market St, New York, USA</p>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-950 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;