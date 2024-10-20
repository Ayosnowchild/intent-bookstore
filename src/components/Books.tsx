// src/components/BookList.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBookById, selectBooks, Book } from "../redux/bookSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Books: React.FC = () => {
  const books = useSelector(selectBooks);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const sortedBooks = [...books].sort(
    (a, b) =>
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );
  const filteredBooks = sortedBooks.filter((book: Book) =>
    book.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Helmet>
        <title>Books - Intent Bookstore</title> {/* Custom page title */}
      </Helmet>
      <input
        type="text"
        placeholder="Search by book name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="border p-2 mb-4 w-1/3"
      />
      <p className=" font-semibold text-lg mb-4">Available Books</p>
      <div className=" w-full flex flex-wrap gap-6 ">
        {filteredBooks ? (
          filteredBooks.map((book) => (
            <div
              key={book.id}
              className="border p-4 mb-2 flex-col gap-4 justify-between rounded-lg w-1/4"
            >
              <Link
                to={`/book/${book.id}`}
                className=" cursor-pointer hover:border-green-300"
              >
                <div>
                  <p>Title: {book.name}</p>
                  <p>Author: {book.author}</p>
                  <p>Category: {book.bookCategory}</p>
                  <p>ISDN: {book.ISDNNumber}</p>
                  <p>Date Created{book.createdDate}</p>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => dispatch(deleteBookById(book.id))}
                className="bg-red-500 text-white p-2 w-full rounded-md"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No result for search</p>
        )}
      </div>
    </div>
  );
};

export default Books;
