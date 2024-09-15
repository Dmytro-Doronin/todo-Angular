import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AuthRoutingModule } from './auth-routing.module'
import { AuthLoginComponent } from './auth-login/auth-login.component'
import { ButtonComponent } from '../shared/ui/button/button.component'
import { AuthInputComponent } from './auth-input/auth-input.component'
import { CardComponent } from './card/card.component'
import { AuthLoginFormComponent } from './auth-login-form/auth-login-form.component'
import { LoginImageComponent } from './auth-images/login-image/login-image.component'
import {AuthSignUpComponent} from "./auth-sign-up/auth-sign-up.component";

@NgModule({
  declarations: [AuthLoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ButtonComponent,
    AuthInputComponent,
    CardComponent,
    AuthLoginFormComponent,
    AuthSignUpComponent,
    LoginImageComponent,
  ],
})
export class AuthModule {}
