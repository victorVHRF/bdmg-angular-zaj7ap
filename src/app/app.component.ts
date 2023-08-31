import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
import { Formulario } from './formulario.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;

  formGroup: FormGroup;
  formData: Formulario;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      cep: [''],
      logradouro: [''],
      complemento: [''],
      bairro: [''],
      localidade: [''],
      uf: [''],
      ibge: [{ value: '', disabled: true }],
      gia: [''],
      ddd: [''],
      siafi: [{ value: '', disabled: true }],
    });
  }

  fetchCepData() {
    const cep = this.formGroup?.get('cep').value;
    this.appService.getCepData(cep).subscribe((data) => {
      this.formData = data;
      this.formGroup.patchValue(data);
    });
  }

  onBlurComplemento() {
    const complementoControl = this.formGroup.get('complemento');
    if (complementoControl.value) {
      const numberPart = complementoControl.value.replace(/\D/g, '');
      const formattedValue = numberPart.replace(/(\d{1})(\d{3})/, '$1.$2');
      complementoControl.setValue(formattedValue);
    }
  }

  saveChanges() {
    if (this.formGroup.valid)
      localStorage.setItem('formData', JSON.stringify(this.formGroup.value));

    alert(`Salvo no localStorage!`);
  }
}
