// import { Component, inject } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { MatButtonModule } from '@angular/material/button';
// import { MatInputModule } from '@angular/material/input';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [MatButtonModule, MatInputModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss',
// })
// export class LoginComponent {
//   formbuilder = inject(FormBuilder);
//   loginForm = this.formbuilder.group({
//     email: ['', [Validators.required]],
//     password: ['', [Validators.required]],
//   });
//   authService = inject(AuthService);
//   router=inject(Router);
//   login() {
//     this.authService
//       .login(this.loginForm.value.email!, this.loginForm.value.password!)
//       .subscribe((result: any) => {
//         console.log(result);
//         localStorage.setItem('token', result.token);
//         localStorage.setItem('user', JSON.stringify(result.user));
//         this.router.navigateByUrl("/");
//       });
//   }
// }


import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

//check

//stop

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      [
        Validators.required,
        // Validators.pattern(
        //   /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/
        // ),
      ],
    ],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.invalid) {
      alert('All fields must be valid and filled out.');
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe((result: any) => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      this.router.navigateByUrl('/');
    });
  }

  forgotPassword() {
  const email = window.prompt("Enter your email:");
  if (email) {
    console.log("User entered email:", email);
  }
    this.router.navigateByUrl('/forgot-password');
  }
}


//checking
