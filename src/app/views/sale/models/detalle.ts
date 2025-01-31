import {Producto} from "./producto";

export class Detalle {
  id?: number;
  producto?: Producto;
  cantidad?: number;
  precioUnitario?: number;
  subtotal?: number;
  igv?: number;
  total?: number;
}
