import { Component } from '@angular/core';
import {
  BorrowedBooksResponse,
  FeedbackRequest,
  PageResponseBorrowedBooksResponse,
} from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from '../../components/rating/rating.component';

@Component({
  selector: 'app-borrowed-books-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RatingComponent],
  templateUrl: './borrowed-books-list.component.html',
  styleUrl: './borrowed-books-list.component.scss',
})
export class BorrowedBooksListComponent {
  borrowedBooks: PageResponseBorrowedBooksResponse = {};
  feedbackRequest: FeedbackRequest = { bookId: 0, comment: '', note: 0 };
  page = 0;
  size = 5;
  selectedBook: BorrowedBooksResponse | undefined = undefined;

  constructor(
    private bookService: BookService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.findAllBorrowedBoooks();
  }

  returnBorrowedBook(book: BorrowedBooksResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  private findAllBorrowedBoooks() {
    this.bookService
      .findAllBorrowedBooks({
        page: this.page,
        size: this.size,
      })
      .subscribe({
        next: (res) => {
          this.borrowedBooks = res;
        },
      });
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllBorrowedBoooks();
  }

  goToPreviousPage() {
    this.page--;
    this.findAllBorrowedBoooks();
  }

  goToPage(page: number) {
    this.page = page;
    this.findAllBorrowedBoooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllBorrowedBoooks();
  }

  goToLastPage() {
    this.page = (this.borrowedBooks.totalPages as number) - 1;
    this.findAllBorrowedBoooks();
  }

  get isLastPage(): boolean {
    return this.page == (this.borrowedBooks.totalPages as number) - 1;
  }

  returnBook(withFeedback: boolean) {
    this.bookService
      .returnBorrowedBook({
        'book-id': this.selectedBook?.id as number,
      })
      .subscribe({
        next: () => {
          if (withFeedback) {
            this.giveFeedback();
          }
          this.selectedBook = undefined;
          this.findAllBorrowedBoooks;
          window.location.reload();
        },
      });
  }

  private giveFeedback() {
    this.feedbackService
      .saveFeedback({
        body: this.feedbackRequest,
      })
      .subscribe({
        next: () => {},
      });
  }
}
