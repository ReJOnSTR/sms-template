import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          SMS Şablonları
        </Link>
        <Link
          to="/add"
          className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
        >
          Yeni Şablon
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
