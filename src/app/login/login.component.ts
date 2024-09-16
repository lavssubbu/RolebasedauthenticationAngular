import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `<form (ngSubmit)="login()">
      <label for="username">Username</label>
      <input type="text" id="username" [(ngModel)]="user.userName" name="username" required>
      <label for="email">Email</label>
      <input type="email" id="email" [(ngModel)]="user.email" name="email" required>
      <label for="password">Password</label>
      <input type="password" id="password" [(ngModel)]="user.password" name="password" required>
      <label for="role">Role</label>
      <input type="text" id="role" [(ngModel)]="user.role" name="role" required>
      <button type="submit">Login</button>
    </form>
    `,
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: User = {
    uId:0,
    userName: '',
    email:'',
    password: '',
    role:''
  }

  constructor(private authService: AuthService, private router: Router) { }

  login() {
    console.log(this.user.email, this.user.password);
    if (this.user.email && this.user.password) {
      this.authService.login(this.user).subscribe(
        data => {
          console.log(data)
         const token = data?.token;
         console.log(token) // Directly get the token from API response
          if (token) {
            localStorage.setItem('token', token); // Store the token directly
            console.log('Token stored');
            console.log(localStorage.getItem('token'));
            this.router.navigate(['/products']); // Navigate to the products component
          } else {
            console.log('No token found in API response.');
            alert("Failed to retrieve token.");
          }        
        },
        error => {
          console.error('Login error:', error);
          alert("Invalid login details or server error");
        }
      );
    } else {
      alert("Please enter username and password first");
    }
  }

  

 /* getToken() {
    this.authService.login(this.loginus).subscribe(
      data => {
        const jsonString = localStorage.getItem('jwtUserToken');
        // Check if the JSON string exists
        if (jsonString) {
          // Parse the JSON string to an object
          const parsedObject = JSON.parse(jsonString);

          // Extract the token value from the parsed object
          const token = parsedObject.token;

          // Log the token
          console.log('Token:', token);
          localStorage.setItem('token',token);
          this.router.navigate(['/products']);
        } else {
          console.log('No token found in local storage.');
        }        
      },
      error => {
        console.error('Login error:', error);
        alert("Invalid login details or server error");
      }
    );
  }*/
  register() {
    this.router.navigate(['register']);
  }

}
