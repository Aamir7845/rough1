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

// @Component({
//   selector: 'app-categories',
//   standalone: true,
//   imports: [
//     MatFormFieldModule,
//     MatInputModule,
//     MatTableModule,
//     MatSortModule,
//     MatPaginatorModule,
//     MatButtonModule,RouterLink
//   ],
//   templateUrl: './categories.component.html',
//   styleUrl: './categories.component.scss',
// })
// export class CategoriesComponent {
//   displayedColumns: string[] = ['id', 'name', 'action'];
//   dataSource: MatTableDataSource<Category>;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   @ViewChild(MatSort) sort!: MatSort;

//   categoryService=inject(CategoryService);
//   constructor() {
    
//     this.dataSource = new MatTableDataSource([] as any);
//   }
//   ngOnInit(){
//     this.getServerData();
//   }
//   private getServerData() {
//     this.categoryService.getCategories().subscribe((result) => {
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
//   delete(id:string){
//     console.log(id);
//     this.categoryService.deleteCategoryById(id).subscribe((result:any)=>{
//       alert("Category Deleted.");
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
import { CategoryService } from '../../../services/category.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Category } from '../../../types/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<Category>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  categoryService = inject(CategoryService);

  constructor() {
    this.dataSource = new MatTableDataSource([] as any);
  }

  ngOnInit() {
    this.getServerData();
  }

  private getServerData() {
    this.categoryService.getCategories().subscribe((result) => {
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
    const confirmDelete = window.confirm('Are you sure you want to delete this category?');
    if (confirmDelete) {
      this.categoryService.deleteCategoryById(id).subscribe(() => {
        alert('Category Deleted.');
        this.getServerData();
      });
    }
  }
}
