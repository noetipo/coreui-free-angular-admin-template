import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Client'
    },
    children: [
      {
        path: '',
        redirectTo: 'client',
        pathMatch: 'full'
      },
      {
        path: 'client',
        loadComponent: () =>
          import('./client/client.component').then((m) => m.ClientComponent),
        data: {
          title: 'Client'
        },
        children: [
          {
            path: 'new',
            loadComponent: () =>import('./client/components/new/new.component').then((m) => m.NewComponent),
            data: {
              title: 'New Client'
            },
          },
          {
            path: 'edit/:id',
            loadComponent: () =>import('./client/components/edit/edit.component').then((m) => m.EditComponent),
            data: {
              title: 'New Client'
            },
          }
        ]
      },
    ]
  }
];
