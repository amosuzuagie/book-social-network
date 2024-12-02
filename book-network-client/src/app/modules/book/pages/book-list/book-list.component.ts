import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import {
  BookResponse,
  PageResponseBookResponse,
} from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../components/book-card/book-card.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookCardComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  bookResponse: PageResponseBookResponse = {};
  page: number = 0;
  size: number = 6;
  message: string = '';
  level: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.findAllBooks();
  }

  private findAllBooks() {
    this.bookService
      .findAllBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (book) => {
          console.log(book);
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

  borrowBook(br: BookResponse) {
    this.message = '';
    this.bookService
      .borrowBook({
        'book-id': br.id as number,
      })
      .subscribe({
        next: () => {
          this.level = 'success';
          this.message = `You successfully borrowed ${br.title}`;
        },
        error: (err) => {
          this.level = 'failure';
          this.message = err.error.error;
          console.log(err);
        },
      });
  }
}
