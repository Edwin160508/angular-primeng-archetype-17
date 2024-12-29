import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  displayErrorDialog: boolean = false;
  submitted: boolean = false;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
   
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if(this.isFormValid()){
      const { username, password } = this.loginForm.value;
      if (!this.authService.login(username, password)) {
        //alert('Usuário ou senha inválidos');
        this.displayErrorDialog = true; 
      }
    }
  }

  closeDialog(): void {
    this.displayErrorDialog = false; 
  }

  verifyFields(field: string): boolean {
    return !(this.loginForm.get(field) != null &&
    this.loginForm.get(field)?.value != null &&
    this.loginForm.get(field)?.value != '');
  }

  private isFormValid(): boolean {
    this.submitted = true;
    return this.loginForm.valid;
  }
}