import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'Consulta Frete';
  public links = ['Frete', 'Cadastros'];
  public activeLink = this.links[0];

  public regionFormGroup: FormGroup;
  public destinyFormGroup: FormGroup;
  public fareFormGroup: FormGroup;
  public companyFormGroup: FormGroup;
  public modalityFormGroup: FormGroup;

  public loading: boolean;
  public loadingCompany: boolean;
  public loadingModality: boolean;
  public loadingRegion: boolean;
  public loadingFare: boolean;

  public shippingCompannyList = [];
  public shippingModalityList = [];
  public regions = [];
  public fares = [];
  public selectedShippingCompany;

  constructor(
    private _restService: RestService,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit() {

    this.getRegions();

    this.regionFormGroup = this._formBuilder.group({
      zone: [null, [Validators.required]]
    });

    this.destinyFormGroup = this._formBuilder.group({
      zipCode: [null, [Validators.required, Validators.pattern(/^\d{8}$/), this._zipChars]]
    });

    this.fareFormGroup = this._formBuilder.group({
      fare: [null, [Validators.required]]
    });

    this.companyFormGroup = this._formBuilder.group({
      shippingCompany: [this.selectedShippingCompany, [Validators.required]]
    });

    this.modalityFormGroup = this._formBuilder.group({
      shippingModality: ['', [Validators.required]]
    });
  }

  /** Aplica ao FormControl apenas caracteres numéricos */
  private _zipChars(control: FormControl) {
    const patternNumerico = /[\D]/g;
    if (control.value && patternNumerico.test(control.value)) {
      control.setValue(control.value.replace(patternNumerico, ''));
    }
  }

  private _encapsule(d) {
    return (Array.isArray(d)) ? d : [d];
  }

  /**
   * set mockup data
   */
  setZipCode(e) {
    console.log(e.path[0].innerText);
    this.destinyFormGroup.get('zipCode').setValue(e.path[0].innerText);
  }

  checkStep(e) {
    if (e.selectedIndex === 2) { this.getShippingCompany(); }
    if (e.selectedIndex === 3) { this.getShippingModality(); this.getFare(); }
    // if (e.selectedIndex === 3) { this.getFare(); }
  }

  getShippingCompany() {
    this.loadingCompany = true;
    this._restService.getData('shippingCompany')
    .subscribe(
      data => {
        this.shippingCompannyList = this._encapsule(data);
        this.loadingCompany = false;
      },
      error => { console.log(error); this.loadingCompany = false; }
    );
  }

  getShippingModality() {
    this.loadingModality = true;
    this._restService.getData('shippingModality')
    .subscribe(
      data => {
        this.shippingModalityList = this._encapsule(data);
        this.loadingModality = false;
      },
      error => { console.log(error); this.loadingModality = false; }
    );
  }

  getRegions() {
      this.loadingRegion = true;
      this._restService.getData('regions')
      .subscribe(
        data => {
          this.regions = this._encapsule(data);
          this.loadingRegion = false;
        },
        error => { console.log(error); this.loadingRegion = false; }
      );
  }

  getFare() {
    const destiny = this.destinyFormGroup.get('zipCode').value;
    const region = this.regionFormGroup.get('zone').value;
    const shippingCompany = this.companyFormGroup.get('shippingCompany').value;

    this.loadingFare = true;
    this._restService.getData('fare')
    .subscribe(
      data => {
        this.fares = data.filter(f =>
          f.destinationRegion.zipCode === destiny &&
          f.originRegion.id === region.id &&
          f.shippingModality.shippingCompany.id === shippingCompany.id
        );
        this.loadingFare = false;
      },
      error => { console.log(error); this.loadingFare = false; }
    );
  }

}

/**
 * INTERFACES
*/
export interface ShippingCompany {
  id: number;
  name: string;
}

export interface ShippingModality {
  id: number;
  name: string;
  shippingCompany: ShippingCompany;
}

export interface Region {
  id: number;
  name: string;
  zipCode: string;
}

export interface Fare {
  id: number;
  time: number;
  cost: number;
  originRegion: Region;
  destinationRegion: Region;
  shippingModality: ShippingModality;
}
