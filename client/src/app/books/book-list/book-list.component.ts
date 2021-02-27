import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {
  books: Book[] = [];
  totalBooks = 0;
  private booksSubscription: Subscription
  constructor(public booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks();
    this.booksSubscription = this.booksService.getPostUpdatedListener()
      .subscribe((bookData: { books: Book[], bookCount: number }) => {
        this.totalBooks = bookData.bookCount;
        this.books = bookData.books;
      });
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

}
