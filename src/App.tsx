import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import CreateBook from "./components/CreateBook";
import Books from "./components/Books";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <div className=" flex flex-col gap-8 w-full px-[4%] py-8">
      <div className=" flex justify-between items-center">
        <Link to={"/"}>
          <h1 className=" text-2xl font-semibold">Intent Book Store</h1>
        </Link>
        <Link
          to={"/create"}
          className=" border p-4 rounded-md hover:bg-gray-200"
        >
          Add
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Books />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/create" element={<CreateBook />} />
      </Routes>
    </div>
  );
}

export default App;
