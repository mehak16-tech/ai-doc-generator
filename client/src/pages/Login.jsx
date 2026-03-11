import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");

    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white p-3 rounded "
          >
            Login
          </button>

        </form>

        <p className="mt-4 text-center text-sm">
          Don't have an account?
          <Link to="/signup" className="text-indigo-600 ml-1">
            Signup
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;