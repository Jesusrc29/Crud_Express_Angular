import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../shared/producto.model';
import { ProductoService } from '../shared/producto.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-lista-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent implements OnInit {

  productos: Observable<ProductoModel[]>|undefined;
  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.productos = this.productoService.obtenerProductos();
  }

  borrarProducto(id: number){
    this.productoService.eliminarProducto(id).subscribe(() => {
      this.productos = this.productoService.obtenerProductos();
    });
  }
}
