import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from './admin/admin.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';


const routes: Routes = [
  { path: 'items', component: ShoppingListComponent },
  { path: 'cart', component: CartComponent},
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'welcome', component: WelcomepageComponent},
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent},
 

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
