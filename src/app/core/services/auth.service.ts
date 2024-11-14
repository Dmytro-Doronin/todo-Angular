import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { AuthMe } from '../../types/auth.models'
import { IBlog } from '../../types/blogs.models'

@Injectable({
  providedIn: 'root',
})

//https://blog-backend-nest.vercel.app/
//http://localhost:3000/
export class AuthService {
  constructor(private http: HttpClient) {}

  userLogin(loginOrEmail: string, password: string) {
    return this.http.post(
      'http://localhost:3000/auth/login',
      {
        loginOrEmail,
        password,
      },
      { withCredentials: true }
    )
  }
  userRegistration(login: string, password: string, email: string) {
    return this.http.post('http://localhost:3000/auth/registration', {
      login,
      password,
      email,
    })
  }

  passwordConfirmation(code: string) {
    return this.http.post('http://localhost:3000/auth/registration-confirmation', {
      code,
    })
  }

  sendPasswordRecovery(email: string) {
    return this.http.post('http://localhost:3000/auth/password-recovery', {
      email,
    })
  }

  emailResending(email: string) {
    return this.http.post('http://localhost:3000/auth/registration-email-resending', {
      email,
    })
  }

  newPassword(newPassword: string, recoveryCode: string) {
    return this.http.post('http://localhost:3000/auth/new-password', {
      newPassword,
      recoveryCode,
    })
  }

  changeUserData(login: string, file: File | null) {
    const formData = new FormData()
    formData.append('login', login)
    if (file) {
      formData.append('image', file)
    }

    return this.http.put<{ login: string; imageUrl: string }>(
      'http://localhost:3000/users',
      formData,
      {
        withCredentials: true,
      }
    )
  }

  sendRefreshToken() {
    return this.http.post('http://localhost:3000/auth/refresh-token', {}, { withCredentials: true })
  }

  me() {
    return this.http.get<AuthMe>('http://localhost:3000/auth/me')
  }

  logOut() {
    return this.http.post('http://localhost:3000/auth/logout', {}, { withCredentials: true })
  }
}
