import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/services/auth.services';
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
    private readonly fb: FormBuilder,
    private readonly authSvc: AuthService
    ) { }

  ngOnInit(): void {
    this.initForm();

  }

  onSubmit(): void {
    console.log('Salve');
    this.authSvc.signUp(this.authForm.value);

  }

  private initForm():void{
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    })
  }

}
