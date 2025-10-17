import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
import React, { useState } from "react";
import Home from "./pages/Home";
import Recipes from "./pages/Recipes";
import Header from "./components/Header";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="min-h-screen">
      <Header onNavigate={setPage} />
      <main className="p-4">
        {page === "home" ? <Home /> : <Recipes />}
      </main>
    </div>
  );
}
export default function Header({ onNavigate }) {
  return (
    <header className="bg-green-600 text-white flex justify-between items-center p-4 shadow">
      <h1 className="text-xl font-bold">🥗 SmartBite</h1>
      <nav className="flex gap-4">
        <button onClick={() => onNavigate("home")} className="hover:underline">Home</button>
        <button onClick={() => onNavigate("recipes")} className="hover:underline">Recipes</button>
      </nav>
    </header>
  );
}
export default function ItemCard({ item }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition">
      <h3 className="font-semibold text-lg">{item.name}</h3>
      <p className="text-gray-600 text-sm">{item.description || "No description"}</p>
      <p className="mt-2 text-sm">
        Quantity: <strong>{item.quantity}</strong>
      </p>
      {item.discounted && (
        <p className="text-green-600 text-sm">
          Discount: {item.discountPct}% off
        </p>
      )}
    </div>
  );
}
export default function RecipeCard({ recipe }) {
  if (!recipe) return null;
  return (
    <div className="border p-4 rounded-lg bg-white shadow-md">
      <h2 className="text-lg font-bold mb-2">{recipe.title}</h2>
      <p className="text-sm text-gray-700 mb-2">
        ⏱ {recipe.time || "Approx. 20 mins"}
      </p>
      <h4 className="font-semibold mt-2">Ingredients:</h4>
      <ul className="list-disc list-inside text-sm">
        {recipe.ingredients?.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <h4 className="font-semibold mt-2">Steps:</h4>
      <ol className="list-decimal list-inside text-sm space-y-1">
        {recipe.steps?.map((s, i) => <li key={i}>{s}</li>)}
      </ol>
    </div>
  );
}
import { useEffect, useState } from "react";
import api from "../services/api";
import ItemCard from "../components/ItemCard";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/items").then((res) => setItems(res.data)).catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
import { useState } from "react";
import api from "../services/api";
import RecipeCard from "../components/RecipeCard";

export default function Recipes() {
  const [ingredients, setIngredients] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await api.post("/recipes", {
        ingredients: ingredients.split(",").map((i) => i.trim()),
      });
      setRecipe(res.data.recipe);
    } catch (err) {
      console.error(err);
      alert("Error generating recipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Generate a Recipe</h2>
      <textarea
        className="w-full border p-2 rounded mb-2"
        rows={3}
        placeholder="Enter ingredients, separated by commas"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        {loading ? "Generating..." : "Get Recipe"}
      </button>
      <div className="mt-6">
        {recipe && <RecipeCard recipe={recipe} />}
      </div>
    </div>
  );
}
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
});

export default api;
