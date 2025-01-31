import {Detalle} from "./detalle";
import {Client} from "../../client/client/models/client";

export class Comprobante {
  id?: number;
  serie?: string;
  numero?: string;
  fechaEmision?: Date;
  cliente?: Client;
  tipoComprobante?: string;
  moneda?: string;
  total?: number;
  detalles?: Detalle[];
}
