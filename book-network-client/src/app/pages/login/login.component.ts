import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  AuthenticationRequest,
  AuthenticationResponse,
} from '../../services/models';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenservice: TokenService
  ) {}

  login() {
    this.authService.authenticate({ body: this.authRequest }).subscribe({
      next: (res: AuthenticationResponse) => {
        this.tokenservice.token = res.token as string;
        this.router.navigate(['books']);
      },
      error: (err) => {
        if (err.error.validationErrors) {
          this.errorMsg = [];
          this.errorMsg = err.error.validationErrors;
          console.log(this.errorMsg);
        } else {
          this.errorMsg = [];
          this.errorMsg.push(err.error.businessErrorDescription);
        }
      },
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
