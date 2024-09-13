import { Routes } from '@angular/router';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

export const routes: Routes = [
    {path: 'productos', component: ListaProductosComponent},
    {path:'productos/editar/:id', component: EditarProductoComponent},
    {path: 'productos/nuevo', component: EditarProductoComponent},
    {path: '**', redirectTo: '/productos', pathMatch: 'full'}
];
