import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Book } from './book.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/books/";

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books: Book[] = [];
  private booksUpdated = new Subject<{ books: Book[], bookCount: number }>();

  constructor(private http: HttpClient) { }

  getBooks() {
    this.http
      .get<{ message: string, books: any, maxBooks: number }>(BACKEND_URL)
      .pipe(map((bookData) => {
        return {
          books: bookData.books.map(book => {
            return {
              title: book.title,
              description: book.description,
              id: book._id,
              imagePath: book.imagePath,
              author: book.author
            };
          }),
          maxBooks: bookData.maxBooks
        }
      }))
      .subscribe((transfomedBookData) => {
        this.books = transfomedBookData.books;
        this.booksUpdated.next({ books: [...this.books], bookCount: transfomedBookData.maxBooks });
      })
  };

  getPostUpdatedListener() {
    return this.booksUpdated.asObservable();
  };


  getBook(id: String) {
    return this.http.get<{ _id: string, title: string, description: string, imagePath: string, author: string }>(BACKEND_URL + id)
  };

  addBook() {

  };

  updateBook() {

  };

  deleteBook(bookId: string) {
    return this.http.delete(BACKEND_URL + bookId);
  };
}
