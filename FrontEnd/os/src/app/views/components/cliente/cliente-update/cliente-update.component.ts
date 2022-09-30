import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: "app-cliente-update",
  templateUrl: "./cliente-update.component.html",
  styleUrls: ["./cliente-update.component.css"],
})
export class ClienteUpdateComponent implements OnInit {
  id_cli = "";

  cliente: Cliente = {
    id: "",
    nome: "",
    cpf: "",
    telefone: "",
  };

  nome = new FormControl("", [Validators.minLength(5)]);
  cpf = new FormControl("", [Validators.minLength(9)]);
  telefone = new FormControl("", [Validators.minLength(11)]);

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id_cli = this.route.snapshot.paramMap.get("id")!;
    this.findById();
  }

  cancel(): void {
    this.router.navigate(["clientes"]);
  }

  findById():void{
    this.service.findById(this.id_cli).subscribe(resposta =>{
      this.cliente = resposta;
    })
  }

  update():void {
    this.service.update(this.cliente).subscribe((resposta) => {
        this.router.navigate(["clientes"]);
        this.service.message("Cliente atualizado com sucesso !");
      },err => {
        if (err.error.error.match("ja cadastado")) {
          this.service.message(err.error.error);
        }else if (err.error.erros[0].message === "número do registro de contribuinte individual brasileiro (CPF) inválido"){
          this.service.message("CPF inválido !"); 
        } 
    })
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
