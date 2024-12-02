import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registrationRequest: RegistrationRequest = {
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  register() {
    this.errorMsg = [];
    this.authService
      .register({
        body: this.registrationRequest,
      })
      .subscribe({
        next: () => {
          this.router.navigate(['activate-account']);
        },
        error: (err) => {
          this.errorMsg = err.error.validationErrors;
        },
      });
  }

  login() {
    this.router.navigate(['login']);
  }
}
