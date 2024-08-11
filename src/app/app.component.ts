import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'sales-statistics';
  items = [
    {
      label: 'Customers',
      icon: 'pi pi-user',
      routerLink: 'customers'
    },
    {
      label: 'Products',
      icon: 'pi pi-shopping-bag',
      routerLink: 'products'
    }
  ] 
}
