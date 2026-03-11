import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Signup() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/signup",
        { email, password }
      );

      alert("Account created successfully!");

      navigate("/");

    } catch (err) {

      console.log(err);

      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Signup failed");
      }

    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 via-purple-500 to-violet-600 flex items-center justify-center">

      <div className="bg-white p-10 rounded-xl shadow-lg w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">

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
            Signup
          </button>

        </form>

        <p className="mt-4 text-center text-sm">

          Already have an account?

          <Link
            to="/"
            className="text-indigo-600 ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Signup;