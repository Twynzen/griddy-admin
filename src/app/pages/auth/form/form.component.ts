import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ACTIONS } from 'src/app/shared/constants/constants';

export interface OptionsForm{
  id: string;
  label: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input ()options !: OptionsForm;
  authForm !: FormGroup;
  signIn = ACTIONS.signIn;

  constructor(
    private readonly fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.initForm();

  }

  onSubmit(): void {
    console.log('Salve');

  }

  private initForm():void{
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

}
