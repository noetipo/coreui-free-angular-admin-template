import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardHeaderComponent,
  ColComponent,
  FormControlDirective, RowComponent
} from "@coreui/angular";
import {ClientService} from "../../../../../providers/services/client.service";
import {IconComponent} from "@coreui/icons-angular";

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [
    CardBodyComponent,
    CardComponent,
    CardHeaderComponent,
    ColComponent,
    FormControlDirective,
    ReactiveFormsModule,
    ButtonDirective,
    IconComponent,
    RowComponent
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.scss'
})
export class NewComponent implements OnInit {


  constructor(private router: Router,
              private clientService:ClientService) { }
  clientForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    tipoDocumento: new FormControl('', Validators.required),
    numeroDocumento: new FormControl('', Validators.required),
    direccion: new FormControl('', Validators.required)


  });


  goBack() {
    this.router.navigate(['/client'], { state: { reload: true } });
  }

  ngOnInit(): void {

  }

  save() {
    console.log(this.clientForm.value);
    if (this.clientForm.valid) {
      this.clientService.add$(this.clientForm.value).subscribe(response => {
        this.clientForm.reset();
        this.router.navigate(['/client']);
      });
    }

  }
}
