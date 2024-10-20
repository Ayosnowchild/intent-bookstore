import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';
import { RootState } from './store';


export interface Book {
    id: string;
    name: string;
    bookCategory: string;
    author: string;
    createdDate: string;
    ISDNNumber: string;
  }

  const loadBooksFromLocalStorage = (): Book[] => {
    const books = localStorage.getItem('books');
    return books ? JSON.parse(books) : [];
  };

  interface BookState {
    books: Book[];
  }
  
  const initialState: BookState = {
    books: loadBooksFromLocalStorage(),
  };

  const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
      createBook: (state, action: PayloadAction<Omit<Book, 'id' | 'createdDate'>>) => {
        const newBook: Book = {
          ...action.payload,
          id: uuidv4(),
          createdDate: new Date().toISOString(),
        };
        state.books.push(newBook);
        localStorage.setItem('books', JSON.stringify(state.books));
      },
      deleteBookById: (state, action: PayloadAction<string>) => {
        state.books = state.books.filter(book => book.id !== action.payload);
        localStorage.setItem('books', JSON.stringify(state.books));
      },
     
      getBooksFromStorage: (state) => {
        const storedBooks = localStorage.getItem('books');
        if (storedBooks) {
          state.books = JSON.parse(storedBooks);
        }
      },
  
    },
  });


  export const {createBook, deleteBookById, getBooksFromStorage} = bookSlice.actions
  export const selectBooks = (state:RootState) => state.books.books
  export default bookSlice.reducer;
