import { Component } from '@angular/core';
import {
  BookResponse,
  PageResponseBookResponse,
} from '../../../../services/models';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 6;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooksByOwner({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (book) => {
          this.bookResponse = book;
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBooks();
  }

  goToLastPage() {
    this.page = (this.bookResponse.totalPages as number) - 1;
    this.findAllBooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.bookResponse.totalPages as number) - 1;
  }

  archiveBook(book: BookResponse) {
    this.bookService
      .updateArchivedStatus({ 'book-id': book.id as number })
      .subscribe({
        next: () => {
          book.archived = !book.archived;
        },
      });
  }

  shareBook(book: BookResponse) {
    this.bookService
      .updateShareableStatus({ 'book-id': book.id as number })
      .subscribe({
        next: () => {
          book.shareable = !book.shareable;
        },
      });
  }

  editBook(book: BookResponse) {
    this.router.navigate(['books', 'manage', book.id]);
    console.log('Edit reached!');
  }

  newBook() {
    this.router.navigateByUrl('books/manage');
  }
}
