import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as customerActions from "../state/customer.actions";
import * as formCustomer from "../state/customer.reducer";
import { Customer } from "../customer.model";
import { Observable } from 'rxjs';

 
@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.scss']
})
export class CustomerEditComponent implements OnInit {

  customerForm: FormGroup;

  constructor(private fb:FormBuilder,
    private store: Store<formCustomer.AppState>) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      name: ["", Validators.required],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      membership: ["", Validators.required],
      id: null
    })

    const customer$: Observable<Customer> = this.store.select(
      formCustomer.getCurrentCustomer
    )
    
    customer$.subscribe(currentCustomer => {
      if(currentCustomer) {
         this.customerForm.patchValue({
           name: currentCustomer.name,
           phone: currentCustomer.name,
           address: currentCustomer.address,
           membership: currentCustomer.membership,
           id: currentCustomer.id
         })
      }
    })
  }
  get f(){ return this.customerForm.controls;}

  updateCustomer(){
    const updatedCustomer: Customer = {
      name: this.f.name.value,
      phone: this.f.phone.value,
      address: this.f.address.value,
      membership: this.f.membership.value,
      id: this.f.id.value
    }
    this.store.dispatch(new customerActions.UpdateCustomer(updatedCustomer))
  }
}
