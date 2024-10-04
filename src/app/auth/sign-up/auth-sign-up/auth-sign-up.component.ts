import { Component, OnDestroy, OnInit } from '@angular/core'
import {
  selectAuthAlertSeverity,
  selectRegistrationEmail,
  selectRegistrationLoading,
} from '../../../store/selectors/auth.selector'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { registerUser } from '../../../store/actions/auth.actions'
import { SeverityType } from '../../../types/notification.models'

@Component({
  selector: 'blog-auth-sign-up',
  templateUrl: './auth-sign-up.component.html',
  styleUrl: './auth-sign-up.component.scss',
})
export class AuthSignUpComponent implements OnInit, OnDestroy {
  authSeverity$?: Observable<SeverityType | undefined>
  signUpLoading$?: Observable<boolean>
  emailRegistration$?: Observable<string>
  isModalOpen = false
  email: string = ''
  content: string = `We have sent a link to confirm your email to ${this.email}`
  private emailSubscription: Subscription = new Subscription()
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.loader()
    this.emailRegistration$ = this.store.select(selectRegistrationEmail)
    this.emailRegistration$.subscribe(item => ((this.isModalOpen = !!item), (this.email = item)))
  }
  loader() {
    this.signUpLoading$ = this.store.select(selectRegistrationLoading)
    this.authSeverity$ = this.store.select(selectAuthAlertSeverity)
  }

  closeModal(): void {
    this.isModalOpen = false
  }
  onFormSubmit(data: { login: string; password: string; email: string }) {
    this.store.dispatch(
      registerUser({ login: data.login, password: data.password, email: data.email })
    )
  }

  ngOnDestroy() {
    this.emailSubscription.unsubscribe()
  }
}
