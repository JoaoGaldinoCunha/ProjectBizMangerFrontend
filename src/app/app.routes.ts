import { Routes } from '@angular/router';

import { LadingPageComponent } from './components/screens/full-screens/lading-page/lading-page.component';
import { LoginPageComponent } from './components/screens/auth/login-page/login-page.component';
import { RegisterPageComponent } from './components/screens/auth/register-page/register-page.component';
import { EmployeesComponent } from './components/screens/dashboard/employees/employees.component';
import { OrdersComponent } from './components/screens/dashboard/orders/orders.component';
import { AlertsComponent } from './components/screens/dashboard/alerts/alerts.component';
import { StockComponent } from './components/screens/dashboard/stock/stock.component';
import { CompanyOverviewComponent } from './components/screens/admin/company-overview/company-overview.component';
import { DefaultScreenComponent } from './components/screens/full-screens/default-screen/default-screen.component';
import { ProfilieScreenComponent } from './components/screens/dashboard/profilie-screen/profilie-screen.component';

export const routes: Routes = [
    {
        path: "",
        component: LadingPageComponent
    }, {
        path: 'login',
        component: LoginPageComponent
    }, {
        path: 'register',
        component: RegisterPageComponent
    }, {
        path: 'dashboard',
        component: DefaultScreenComponent,
        children: [
            { path: 'alertas', component: AlertsComponent },
            { path: 'estoque', component: StockComponent },
            { path: 'pedidos', component: OrdersComponent },
            { path: 'funcionarios', component: EmployeesComponent },
            {path:'perfil', component:ProfilieScreenComponent},
        ]
    },
    {
        path:"company",
        component:CompanyOverviewComponent

    }

];
