import { Component } from '@angular/core';
import { BookRequest } from '../../../../services/models';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { BookService } from '../../../../services/services';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss',
})
export class ManageBookComponent {
  selectedBookCover: any;
  errorMsg: Array<string> = [];
  selectedPicture: string | undefined;
  bookRequest: BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: '',
  };

  constructor(
    private router: Router,
    private bookService: BookService,
    private activatedRout: ActivatedRoute // For getting info on route
  ) {
    this.errorMsg = [];
  }

  ngOnInit(): void {
    const bookId = this.activatedRout.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById({ 'book-id': bookId }).subscribe({
        next: (book) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            authorName: book.authorName as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable,
          };
          if (book.cover) {
            this.selectedPicture = 'data:image/jpg;base64, ' + book.cover;
          }
        },
      });
    }
  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if (this.selectedBookCover) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as string;
      };
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.saveBook({ body: this.bookRequest }).subscribe({
      next: (bookId) => {
        this.bookService
          .uploadBookCoverPicture({
            'book-id': bookId,
            body: { file: this.selectedBookCover },
          })
          .subscribe({
            next: () => {
              this.router.navigate(['/books/my-books']);
            },
          });
      },
      error: (error) => {
        this.errorMsg = error.error.validationErrors;
      },
    });
  }
}
