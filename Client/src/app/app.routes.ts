import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'about', loadComponent: () => import('./pages/about/about').then(m => m.About) },
  { path: 'user/:username', loadComponent: () => import('./pages/user/user').then(m => m.User) },
  { path: 'share/p/:postId', loadComponent: () => import ('./pages/post-share/post-share').then(m => m.PostShare) },
  { path: '**', redirectTo: '/' },
];
