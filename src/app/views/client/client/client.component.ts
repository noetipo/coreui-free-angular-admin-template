import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {CommonModule, NgStyle} from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DocsExampleComponent } from '@docs-components/public-api';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  ButtonDirective,
  TableDirective
} from '@coreui/angular';
import {ClientService} from "../../../providers/services/client.service";
import {Client} from "./models/client";
import {ActivatedRoute, NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {of, Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {IconComponent} from "@coreui/icons-angular";
import _default from "chart.js/dist/core/core.interaction";

@Component({
    selector: 'app-form-controls',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
  imports: [RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, DocsExampleComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, ButtonDirective, NgStyle, TableDirective, CommonModule, RouterOutlet, IconComponent]
})
export class ClientComponent implements OnInit, OnDestroy {
public clients:Client[]=[];
  private routeSubscription!: Subscription;
  public favoriteColor = '#26ab3c';

  constructor(private clientService:ClientService,
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit():void {
    this.getClients();
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.url.includes('/client'))
      )
      .subscribe(() => {
        this.getClients();
      });

  }
  private getClients():void {
    this.clientService.getAll$().subscribe(response=>{
      this.clients=response;
    });
  }
  public postNewClient(): void {
    this.router.navigate(['new'], {relativeTo: this.route});

  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }

  }

  goEdit(id: number | undefined) {
    this.router.navigate(['edit',id], {relativeTo: this.route});

  }

  goDelete(id: number=0) {
    this.clientService.delete$(id).subscribe(response=>{
      if(response){
        this.getClients();
      }

    })
  }


}
