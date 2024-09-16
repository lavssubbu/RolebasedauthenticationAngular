import { Routes } from '@angular/router';
import { authGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { roleGuard } from './role.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

export const routes: Routes = [
    {
        path: 'products',
        component: ProductlistComponent,
        canActivate: [authGuard] // Apply AuthGuard here
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [roleGuard], // Apply RoleGuard here
        data: { requiredRole: 'Admin' } // Pass the required role to RoleGuard
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'forbidden',
        component: ForbiddenComponent
      }
];
