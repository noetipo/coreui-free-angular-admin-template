import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    data: { title: 'Sales' },
    children: [
      {
        path: '',
        redirectTo: 'sale',
        pathMatch: 'full'
      },
      {
        path: 'sale',
        loadComponent: () =>
          import('./sale/sale.component').then((m) => m.SaleComponent),
        data: { title: 'Sales' },
      },
      {
        path: 'sale/new',
        loadComponent: () =>
          import('./components/new/new.component').then((m) => m.NewSaleComponent),
        data: { title: 'Nuevo Cliente' }
      }
    ]
  }
];
