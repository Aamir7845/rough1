import { Component, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Brand } from '../../../types/brand';
import { Category } from '../../../types/category';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/product';
import { ActivatedRoute, Router } from '@angular/router';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  formBuilder = inject(FormBuilder);
  toasterService=inject(ToastrService);
  productForm = this.formBuilder.group({
    name: [null, [Validators.required, Validators.minLength(5)]],
    shortDescription: [null, [Validators.required, Validators.minLength(10)]],
    description: [null, [Validators.required, Validators.minLength(50)]],
    price: [null, [Validators.required]],
    discount: [],
    images: this.formBuilder.array([]),
    categoryId: [null, [Validators.required]],
    brandId: [null, [Validators.required]],
    isFeatured:[false],
    isNewProduct:[false]
  });
  categoryService = inject(CategoryService);
  brandService = inject(BrandService);
  productService = inject(ProductService);
  brands: Brand[] = [];
  categories: Category[] = [];
  id!:string;
  route=inject(ActivatedRoute);
  ngOnInit() {
   
    this.categoryService.getCategories().subscribe((result) => {
      this.categories = result;
    });
    this.brandService.getBrands().subscribe((result) => {
      this.brands = result;
    });
    this.id=this.route.snapshot.params["id"];
    console.log(this.id);
    if(this.id){
           this.productService.getProductbyId(this.id).subscribe(result=>{
              for (let index = 0; index < result.images.length; index++) {
                this.addImage();
              }
              this.productForm.patchValue(result as any);
           })
    }else{
      this.addImage();
    }

  }
  router=inject(Router);
  addProduct() {
    let value = this.productForm.value;
    console.log(value);
    this.productService.addProduct(value as any).subscribe((result) => {
      this.toasterService.success('Prodcut Added');
      this.router.navigateByUrl("/admin/products")
    });
  }
  updateProduct(){
    let value = this.productForm.value;
    console.log(value);
    this.productService.updateProduct(this.id,value as any).subscribe((result) => {
      this.toasterService.success('Product updated');
      this.router.navigateByUrl("/admin/products")
    });
  }

  addImage() {
    this.images.push(this.formBuilder.control(null));
  }
  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }
  get images() {
    return this.productForm.get('images') as FormArray;
  }
}
