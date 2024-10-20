// src/components/BookDetails.tsx
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectBooks } from "../redux/bookSlice";
import { Book } from "../redux/bookSlice";
import { Helmet } from "react-helmet";

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const books = useSelector(selectBooks);
  const book = books.find((b: Book) => b.id === id);

  if (!book) {
    return <div>Book not found</div>;
  }

  return (
    <div className="  w-1/3">
      <Helmet>
        <title>{book.name} - Intent Bookstore</title>
      </Helmet>
      <h2 className="text-xl font-bold mb-2">{book.name}</h2>
      <div className=" border rounded-lg p-4 w-full mb-16">
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Category:</strong> {book.bookCategory}
        </p>
        <p>
          <strong>ISDN Number:</strong> {book.ISDNNumber}
        </p>
        <p>
          <strong>Created Date:</strong> {book.createdDate}
        </p>
      </div>

      <Link to={"/"} className=" border p-4 rounded-md hover:bg-gray-200">
        Return to list
      </Link>
    </div>
  );
};

export default BookDetails;
