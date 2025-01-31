import {Component, OnInit} from '@angular/core';
import {CommonModule, } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  ColComponent,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  ButtonDirective,
  TableDirective
} from '@coreui/angular';
import {ActivatedRoute, Router} from "@angular/router";

import {IconComponent} from "@coreui/icons-angular";

import {SaleService} from "../../../providers/services/sale.service";
import {Comprobante} from "../models/comprobante";
import {ComprobanteComponent} from "../components/modal/comprobante.component";

@Component({
    selector: 'app-sale',
    templateUrl: './sale.component.html',
    styleUrls: ['./sale.component.scss'],
  imports: [ColComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, ButtonDirective, TableDirective, CommonModule, IconComponent, ComprobanteComponent]
})
export class SaleComponent implements OnInit {
public comprobantes:Comprobante[]=[];
  selectedComprobante?: Comprobante;
  isModalVisible = false;

  constructor(private saleService:SaleService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit():void {
    this.getSale();


  }
  private getSale():void {
    this.saleService.getAll$().subscribe(response=>{
      this.comprobantes=response;
      console.log(this.comprobantes);
    });
  }

  public postNewComprobante(): void {
    this.router.navigate(['new'], {relativeTo: this.route});
  }


    goDelete(id: number=0) {
      this.saleService.delete$(id).subscribe(response=>{
        if(response){
          this.getSale();
        }

      })
    }

      openModal(comprobante: Comprobante) {
        console.log(comprobante);
        this.selectedComprobante = comprobante;
        this.isModalVisible = true;
      }
}
