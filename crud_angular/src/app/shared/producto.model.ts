export class ProductoModel{
    constructor(
        public id: number,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public estado: number,
        public fecha_creacion: Date,
        public fecha_modificacion: Date
    ){}
}