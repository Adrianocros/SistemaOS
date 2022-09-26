import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: "app-tecnico-create",
  templateUrl: "./tecnico-create.component.html",
  styleUrls: ["./tecnico-create.component.css"],
})
export class TecnicoCreateComponent implements OnInit {
  tecnico: Tecnico = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(9)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(private router: Router, private service: TecnicoService) {}

  ngOnInit(): void {}

  cancel(): void {
    this.router.navigate(["tecnicos"]);
  }

  create(): void {
    this.service.create(this.tecnico).subscribe(
      (resposta) => {
        this.router.navigate(["tecnicos"]);
        this.service.message("Tecnico criado com sucesso!");
      },
      (err) => {
        if (err.error.error.match("ja cadastado")) {
          this.service.message(err.error.error);
        } else if (err.error.error.match("validação dos campos")) {
          this.service.message("Verifique se o CPF está correto !");
        }
      }
    );
  }

  errorValidNome() {
    if (this.nome.invalid) {
      return "Nome é obrigato !";
    }
    return false;
  }

  errorValidCpf() {
    if (this.nome.invalid) {
      return "CPF é obrigatorio !";
    }
    return false;
  }

  errorValidTelefone() {
    if (this.nome.invalid) {
      return "Telefone deve ter no minimo cinco  caracteres !";
    }
    return false;
  }
}
 