import { Component, EventEmitter, Output, signal } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { MatIcon } from "@angular/material/icon";
import { SubmitButton } from "../../../shared/components/submit-button/submit-button";

@Component({
  selector: 'app-forgot-password',
  imports: [MatIcon, SubmitButton],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  @Output() doneResetting = new EventEmitter<any>()
  
  success = signal(false)
  loading = signal(false)

  constructor(private authService: AuthService) {

  }

  forgotPasswordSubmit(event: Event) {
    event.preventDefault()
    
    const form = event.target as HTMLFormElement
    const body = new FormData(form);

    this.loading.set(true)
    this.authService.forgotPassword(body).subscribe({
      next: () => {
        this.success.set(true)
        this.loading.set(false)
      },
      error: (err) => this.loading.set(false)
    });
    
  }
}
