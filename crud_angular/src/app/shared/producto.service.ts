import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductoModel } from './producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /**
   * Método para obtener una lista de todos los productos
   */
  obtenerProductos(){
    return this.http.get<ProductoModel[]>(`${this.BASE_URL}/productos`);
  }

  /**
   * Método para obtener un producto por su id
   * @param id id del producto
   */
  obtenerProducto(id: number){
    return this.http.get<ProductoModel>(`${this.BASE_URL}/productos/${id}`);
  }

  /**
   * Método para agregar o insertar un producto
   * @param producto Producto a insertar
   */
  nuevoProducto(producto: ProductoModel){
    return this.http.post<string>(`${this.BASE_URL}/productos`, producto);
  }

  /**
   * Método para actualizar un producto
   * @param producto Producto a actualizar
   */
  actualizarProducto(producto: ProductoModel){
    return this.http.put<string>(`${this.BASE_URL}/productos/${producto.id}`, producto);
  }

  /**
   * Método para eliminar un producto
   * @param id id del producto
   */
  eliminarProducto(id: number){
    return this.http.delete<string>(`${this.BASE_URL}/productos/${id}`);
  }
}
