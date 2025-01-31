import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule
} from "@angular/forms";

import { ClientService } from "../../../../providers/services/client.service";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  RowComponent
} from "@coreui/angular";
import { IconComponent } from "@coreui/icons-angular";
import { Client } from "../../../client/client/models/client";
import { Producto } from "../../models/producto";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {ProductService} from "../../../../providers/services/product.service";
import {SaleService} from "../../../../providers/services/sale.service";

@Component({
  selector: 'app-new-sale',
  standalone: true,
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss',
  imports: [
    ReactiveFormsModule,
    CardBodyComponent,
    CardHeaderComponent,
    CardComponent,
    RowComponent,
    ColComponent,
    FormsModule,
    IconComponent,
    NgForOf,
    CurrencyPipe,
    ButtonDirective
  ]
})
export class NewSaleComponent implements OnInit {
  comprobanteForm: FormGroup;
  clientes: Client[] = [];
  productos: Producto[] = [];
  selectedProduct?: Producto;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private clientService: ClientService,
    private productService:ProductService,
    private saleService:SaleService
  ) {
    this.comprobanteForm = this.fb.group({
      serie: ['F001', Validators.required],
      numero: ['1', Validators.required],
      fechaEmision: [new Date().toISOString(), Validators.required],
      cliente: this.fb.group({  // ✅ Cliente como FormGroup
        id: [null, Validators.required],
        nombre: [''],
        tipoDocumento: [''],
        numeroDocumento: [''],
        direccion: ['']
      }),
      tipoComprobante: ['Factura', Validators.required],
      moneda: ['PEN', Validators.required],
      total: [0],
      producto: [null],
      detalles: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadProducts();
  }
  updateClientData(): void {
    const selectedClientId = this.comprobanteForm.get('cliente.id')?.value;
    const selectedClient = this.clientes.find(client => client.id === selectedClientId);

    if (selectedClient) {
      this.comprobanteForm.patchValue({
        cliente: {
          id: selectedClient.id,
          nombre: selectedClient.nombre,
          tipoDocumento: selectedClient.tipoDocumento,
          numeroDocumento: selectedClient.numeroDocumento,
          direccion: selectedClient.direccion
        }
      });
    }
  }
  get detalles(): FormArray {
    return this.comprobanteForm.get('detalles') as FormArray;
  }

  /**
   * Método para agregar el producto seleccionado a la lista de detalles
   */
  addSelectedProduct(): void {
    const producto = this.comprobanteForm.get('producto')?.value as Producto;
    if (producto) {
      const existingDetail = this.detalles.controls.find(
        (detalle: any) => detalle.value.producto.id === producto.id
      );

      if (existingDetail) {
        existingDetail.patchValue({ cantidad: existingDetail.value.cantidad + 1 });
      } else {
        this.addDetalle(producto);
      }
    }
  }

  /**
   * Método para agregar un producto al detalle
   */
  addDetalle(producto: Producto): void {
    const precioUnitario = producto.precioUnitario ?? 0;

    const detalleForm = this.fb.group({
      producto: [producto],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [precioUnitario],
      subtotal: [precioUnitario],
      igv: [precioUnitario * 0.18],
      total: [precioUnitario * 1.18]
    });

    // Detectar cambios en la cantidad y recalcular los totales
    detalleForm.get('cantidad')?.valueChanges.subscribe((cantidad: number | null) => {
      const cantidadSegura = cantidad ?? 1;

      detalleForm.patchValue({
        subtotal: precioUnitario * cantidadSegura,
        igv: (precioUnitario * cantidadSegura) * 0.18,
        total: (precioUnitario * cantidadSegura) + ((precioUnitario * cantidadSegura) * 0.18)
      }, { emitEvent: false });
      this.calculateTotalGeneral();

    });

    this.detalles.push(detalleForm);
    this.calculateTotalGeneral();
  }

  asFormControl(control: any): FormControl {
    return control as FormControl;
  }

  removeDetalle(index: number): void {
    this.detalles.removeAt(index);
    this.calculateTotalGeneral();
  }

  loadClients(): void {
    this.clientService.getAll$().subscribe(response => {
      this.clientes = response;
    });
  }

  loadProducts(): void {
    this.productService.getAll$().subscribe(response => {
      this.productos = response;
    });
  }
  calculateTotalGeneral(): void {
    const totalGeneral = this.detalles.controls.reduce((sum, detalle: any) => {
      return sum + (detalle.value.total || 0);
    }, 0);

    this.comprobanteForm.patchValue({ total: totalGeneral }); // ✅ Actualiza el campo total
  }

  goBack() {
    this.router.navigate(['/sale'], { state: { reload: true } });
  }

  save() {
    if (this.comprobanteForm.valid) {
      this.comprobanteForm.value.cliente
      this.saleService.add$(this.comprobanteForm.value).subscribe(response => {
        this.router.navigate(['/sale']);
      })

    } else {
      alert("Complete todos los campos requeridos");
    }
  }
}
