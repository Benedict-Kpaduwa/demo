"use client";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 bg-gray-800 text-white p-4">
      <h2 className="text-xl mb-4">Dashboard</h2>
      <ul>
        <li className="mb-2">
          <a href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">
            Transactions
          </a>
        </li>
        <li className="mb-2">
          <button
            onClick={handleLogout}
            className="block p-2 hover:bg-gray-700 rounded w-full text-left"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}
