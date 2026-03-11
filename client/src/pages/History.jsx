import { useEffect, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";

function History() {

  const [readmes, setReadmes] = useState([]);

  useEffect(() => {

    const fetchHistory = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/history",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setReadmes(res.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchHistory();

  }, []);

  return (
    <>
      <Navbar />

      <div className="p-10 bg-gray-100 min-h-screen">

        <h1 className="text-3xl font-bold mb-6">
          README History
        </h1>

        {readmes.map((item, index) => (

          <div
            key={index}
            className="bg-white p-6 rounded shadow mb-6"
          >

            <p className="text-sm text-gray-500 mb-2">
              {item.repoUrl}
            </p>

            <div className="prose max-w-none">
              <ReactMarkdown>
                {item.content}
              </ReactMarkdown>
            </div>

          </div>

        ))}

      </div>
    </>
  );
}

export default History;