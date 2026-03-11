import { Link, useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-indigo-600 text-white p-4 flex justify-between">

      <h1 className="font-bold text-lg">
        AI README Generator
      </h1>

      <div className="space-x-4">

        <Link to="/dashboard">Dashboard</Link>

        <Link to="/history">History</Link>

        <button onClick={logout}>
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;