import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook, selectBooks, Book } from "../redux/bookSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const CreateBook: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectBooks);
  const [formValues, setFormValues] = useState<
    Omit<Book, "id" | "createdDate">
  >({
    name: "",
    author: "",
    bookCategory: "",
    ISDNNumber: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createBook(formValues));
    console.log(books);
    setFormValues({
      name: "",
      author: "",
      bookCategory: "",
      ISDNNumber: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/3 flex flex-col gap-4">
      <Helmet>
        <title>Create Book - Intent Bookstore</title>
      </Helmet>
      <div className=" flex flex-col gap-2">
        <label htmlFor="name">Book Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formValues.name}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="author">Author</label>
        <input
          id="author"
          name="author"
          type="text"
          value={formValues.author}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="bookCategory">Book Category</label>
        <input
          id="bookCategory"
          name="bookCategory"
          type="text"
          value={formValues.bookCategory}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className=" flex flex-col gap-2">
        <label htmlFor="ISDNNumber">ISDN Number</label>
        <input
          id="ISDNNumber"
          name="ISDNNumber"
          type="text"
          value={formValues.ISDNNumber}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 mt-4 w-1/2 rounded-md"
      >
        Add Book
      </button>
      <div className=" mt-16">
        <Link to={"/"} className=" border p-4 rounded-md hover:bg-gray-200">
          Go to Book List
        </Link>
      </div>
    </form>
  );
};

export default CreateBook;
