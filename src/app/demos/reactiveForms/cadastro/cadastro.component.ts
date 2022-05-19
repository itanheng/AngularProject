import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { Usuario } from "./models/usuario";
import { MASKS, NgBrazilValidators } from "ng-brazil";
import { CustomValidators } from "ng2-validation";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;
  usuario!: Usuario;
  formResult: string = "";
  public MASKS = MASKS;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    let senha = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
    ]);
    let confirmacaoSenha = new FormControl("", [
      Validators.required,
      CustomValidators.rangeLength([6, 15]),
      CustomValidators.equalTo(senha),
    ]);

    this.cadastroForm = this.fb.group({
      nome: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(150),
        ],
      ],
      cpf: ["", [Validators.required, NgBrazilValidators.cpf]],
      email: ["", [Validators.required, Validators.email]],
      senha: senha,
      confirmacaoSenha: confirmacaoSenha,
    });
  }
  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
      this.formResult = JSON.stringify(this.cadastroForm.value);
    } else {
      this.formResult = "Não submeteu!";
    }
  }
}
