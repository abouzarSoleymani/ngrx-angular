import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as customerActions from "../state/customer.actions";
import * as formCustomer from "../state/customer.reducer";
import { Customer } from "../customer.model";

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store<formCustomer.AppState>
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required]
    })
  }
  get f() { return this.customerForm.controls; }

  createCustomer(){
    const newCustomer: Customer = {
      name: this.f.name.value,
      phone: this.f.phone.value,
      address: this.f.address.value,
      membership: this.f.membership.value
    }
    console.log(newCustomer)
    this.store.dispatch(new customerActions.CreateCustomer(newCustomer))
    this.customerForm.reset()
  }
}
