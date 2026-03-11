import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import Navbar from "../components/Navbar";

function Dashboard() {

    const [repoUrl, setRepoUrl] = useState("");
    const [readme, setReadme] = useState("");
    const [loading, setLoading] = useState(false);

    const generateReadme = async () => {

        if (!repoUrl) {
            alert("Please enter a GitHub repository URL");
            return;
        }

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const res = await axios.post(
                "http://localhost:5000/generate-readme",
                { repoUrl },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setReadme(res.data.readme);

        } catch (err) {
            console.error(err);
            alert("Failed to generate README");
        }

        setLoading(false);
    };

    const copyReadme = () => {
        navigator.clipboard.writeText(readme);
        alert("README copied to clipboard!");
    };

    const downloadReadme = () => {

        const blob = new Blob([readme], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "README.md";
        a.click();
    };

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-gray-100 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    RepoDoc AI - GitHub README Generator
                </h1>

                <div className="bg-white p-6 rounded shadow-md mb-6">

                    <input
                        type="text"
                        placeholder="Enter GitHub Repository URL"
                        className="w-full border p-3 rounded mb-4"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />

                    <button
                        onClick={generateReadme}
                        disabled={loading}
                        className={`px-6 py-2 rounded text-white ${
                            loading
                                ? "bg-gray-400"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Generating README..." : "Generate README"}
                    </button>

                </div>

                {readme && (

                    <div className="bg-white p-6 rounded shadow-md">

                        <div className="flex justify-between items-center mb-4">

                            <h2 className="text-xl font-bold">
                                Generated README
                            </h2>

                            <div className="space-x-3">

                                <button
                                    onClick={copyReadme}
                                    className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
                                >
                                    Copy
                                </button>

                                <button
                                    onClick={downloadReadme}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                    Download
                                </button>

                            </div>

                        </div>

                        <div className="prose max-w-none">
                            <ReactMarkdown>
                                {readme}
                            </ReactMarkdown>
                        </div>

                    </div>

                )}

            </div>
        </>
    );
}

export default Dashboard;



