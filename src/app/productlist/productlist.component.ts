import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-productlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productlist.component.html',
  styleUrl: './productlist.component.css'
})
export class ProductlistComponent {
  products: any[] = [];
  isAdmin: boolean = false;
  constructor(private authService:AuthService,private productService: ProductService, private router: Router) {}
  
  ngOnInit() {
    this.loadProducts();
    this.isAdmin = this.authService.isAdmin();
  }
  
  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      
    });
  }
  

  addProduct() {
    this.router.navigate(['/products/add']);
  }

  editProduct(id: number) {
    this.router.navigate([`/products/edit/${id}`]);
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts(); // Reload the product list after deletion
    });
  }
}
