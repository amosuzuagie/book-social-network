import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CommonModule } from '@angular/common';
import { CodeInputModule } from 'angular-code-input';

@Component({
  selector: 'app-activate-account',
  standalone: true,
  imports: [CommonModule, CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrl: './activate-account.component.scss',
})
export class ActivateAccountComponent {
  message: string = '';
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }

  confirmAccount(token: string) {
    this.authService.activate({ token }).subscribe({
      next: () => {
        this.message =
          'Your account has been successfully activated.\nProceed to login.';
        this.submitted = true;
        this.isOkay = true;
      },
      error: () => {
        this.message =
          'Token has expired or is invalid.\nConfirm token or check email for a new one.';
        this.submitted = true;
        this.isOkay = false;
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['login']);
  }
}
