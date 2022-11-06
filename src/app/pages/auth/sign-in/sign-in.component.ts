import { Component, OnInit } from '@angular/core';
import {OptionsForm } from '@auth/form/form.component';
import { ACTIONS } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-sign-in',
  template: `<app-form [options]="options"></app-form> `,
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  options: OptionsForm = {
    id: ACTIONS.signIn,
    label: ACTIONS.signIn
  }

  constructor() { }

  ngOnInit(): void {
  }

}
