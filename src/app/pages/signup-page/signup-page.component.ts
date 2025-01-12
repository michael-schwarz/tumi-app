import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MailSigninComponent } from '../../components/mail-signin/mail-signin.component';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
  authenticated$: Observable<boolean>;
  consentControl = new FormControl(false);

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.authenticated$ = this.authService.authenticated;
  }

  login(provider: string) {
    if (provider === 'email') {
      this.dialog.open(MailSigninComponent);
    } else {
      this.authService.login(provider);
    }
  }
}
