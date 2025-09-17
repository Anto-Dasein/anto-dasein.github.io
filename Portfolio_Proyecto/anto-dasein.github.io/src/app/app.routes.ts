import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/components/body/body').then(m => m.Body)
  },
  {
    path: 'skills',
    loadComponent: () => import('./pages/skills/skills').then(m => m.Skills)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about').then(m => m.About)
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/portfolio/portfolio').then(m => m.Portfolio)
  }
];
