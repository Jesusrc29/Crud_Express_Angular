import { Component, OnInit } from '@angular/core';
import { on } from 'events';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Console, error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.css'
})
export class EditarProductoComponent implements OnInit {
  id =0;
  producto = new ProductoModel(0,"","",0,0,1,new Date(),new Date());
  constructor(
    private productoService:ProductoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if(this.id){
      console.log('EDITAR');
      this.productoService.obtenerProducto(this.id).subscribe((data) => {
        console.log('Producto recibido:', data);  // Muestra los datos recibidos
        this.producto = data; 
      }, error => {
        console.log(error)
      });
    }else {
      console.log('CREAR');
    }
    
  }

  onSubmit(){
    if(this.producto.id){
      this.productoService.actualizarProducto(this.producto).subscribe(() => {
        this.router.navigate(['/productos']);
      });
  }else{
    this.productoService.nuevoProducto(this.producto).subscribe(() => {
      this.router.navigate(['/productos']);
    });
  }
}
cancelar() {
  this.router.navigate(['/']); 
}

}
