// import { Component, inject, ViewChild } from '@angular/core';

// import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
// import { MatSort, MatSortModule } from '@angular/material/sort';
// import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { MatInputModule } from '@angular/material/input';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { CategoryService } from '../../../services/category.service';
// import { MatButtonModule } from '@angular/material/button';
// import { RouterLink } from '@angular/router';
// import { Category } from '../../../types/category';
// import { Brand } from '../../../types/brand';
// import { BrandService } from '../../../services/brand.service';
// import { ProductService } from '../../../services/product.service';

// @Component({
//   selector: 'app-products',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatTableModule,
//     MatSortModule,
//     MatPaginatorModule,
//     MatButtonModule,
//     RouterLink,
//   ],
//   templateUrl: './products.component.html',
//   styleUrl: './products.component.scss',
// })
// export class ProductsComponent {
//   displayedColumns: string[] = ['id', 'name','shortDescription','price','discount', 'action'];
//   dataSource: MatTableDataSource<Brand>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   productService = inject(ProductService);
//   constructor() {
//     this.dataSource = new MatTableDataSource([] as any);
//   }
//   ngOnInit() {
//     this.getServerData();
//   }
//   private getServerData() {
//     this.productService.getAllProducts().subscribe((result) => {
//       console.log(result);
//       this.dataSource.data = result;
//     });
//   }

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//     this.dataSource.sort = this.sort;
//   }

//   applyFilter(event: Event) {
//     const filterValue = (event.target as HTMLInputElement).value;
//     this.dataSource.filter = filterValue.trim().toLowerCase();
//     if (this.dataSource.paginator) {
//       this.dataSource.paginator.firstPage();
//     }
//   }
//   delete(id: string) {
//     this.productService.deleteProduct(id).subscribe(result=>{
//       alert("Prodcut deleted");
//       this.getServerData();
//     })
//   }
// }


import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { ProductService } from '../../../services/product.service';
import { Brand } from '../../../types/brand';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'shortDescription', 'price', 'discount', 'action'];
  dataSource: MatTableDataSource<Brand>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  productService = inject(ProductService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.productService.getAllProducts().subscribe((result) => {
      this.dataSource.data = result;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: string) {
    const confirmed = confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.productService.deleteProduct(id).subscribe(() => {
        alert('Product deleted successfully.');
        this.getServerData(); // Refresh product list
      });
    }
  }
}
