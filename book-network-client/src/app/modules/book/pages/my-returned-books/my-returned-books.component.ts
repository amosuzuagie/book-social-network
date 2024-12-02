import { Component } from '@angular/core';
import {
  BorrowedBooksResponse,
  PageResponseBorrowedBooksResponse,
} from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-my-returned-books',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './my-returned-books.component.html',
  styleUrl: './my-returned-books.component.scss',
})
export class MyReturnedBooksComponent {
  returnedBooks: PageResponseBorrowedBooksResponse = {};
  page = 0;
  size = 5;
  message = '';
  level = '';
  selectedBook: BorrowedBooksResponse | undefined = undefined;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService
      .findAllReturnedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (res) => {
          this.returnedBooks = res;
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllReturnedBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = (this.returnedBooks.totalPages as number) - 1;
    this.findAllReturnedBooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.returnedBooks.totalPages as number) - 1;
  }

  approveBookReturned(book: BorrowedBooksResponse) {
    if (!book.returned) {
      this.level = 'error';
      this.message = 'The book is not yet returned.';
    }
    this.bookService
      .approveReturnBorrowedBook({
        'book-id': book.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = 'Book returned approved';
          this.findAllReturnedBooks();
        },
      });
  }
}
