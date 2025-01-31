import {Component, EventEmitter, Input, Output} from '@angular/core';
import { Comprobante } from '../../models/comprobante';
import {
  ButtonDirective,
  ModalBodyComponent,
  ModalComponent,
  ModalFooterComponent,
  ModalHeaderComponent,

} from "@coreui/angular";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-comprobante-modal',
  standalone: true,
  templateUrl: './comprobante.component.html',
  styleUrl: './comprobante.component.scss',
  imports: [ ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent, ButtonDirective, CurrencyPipe]

})
export class ComprobanteComponent {
  @Input() comprobante?: Comprobante;
  @Input() isVisible = false;
  @Output() isVisibleChange = new EventEmitter<boolean>(); // ✅ Evento para Two-way Binding

  closeModal() {
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible); // ✅ Emitir cambio al padre
  }
}
