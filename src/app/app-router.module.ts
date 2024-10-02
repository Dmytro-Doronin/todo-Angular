import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ErrorPageComponent } from './shared/components/404/404.component'

export const routes: Routes = [
  // { path: '', redirectTo: 'main/blogs', pathMatch: 'full' },
  { path: 'main', loadChildren: () => import('./blog/blog.module').then(m => m.BlogModule) },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: '**', component: ErrorPageComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouterModule {}