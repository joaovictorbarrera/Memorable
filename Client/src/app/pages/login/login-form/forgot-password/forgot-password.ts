import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  imports: [],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  @Output() doneResetting = new EventEmitter<any>()
  success = signal(false)

  constructor(private authService: AuthService) {

  }

  forgotPasswordSubmit(event: Event) {
    event.preventDefault()
    
    const form = event.target as HTMLFormElement
    const body = new FormData(form);

    this.authService.forgotPassword(body).subscribe({
      next: () => this.success.set(true),
      error: (err) => console.log
    });
    
  }
}
