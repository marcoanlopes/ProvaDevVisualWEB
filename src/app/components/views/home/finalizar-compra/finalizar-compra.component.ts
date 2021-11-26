import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { formasPagamento } from "src/app/models/formasPagamento";
import { ItemVenda } from "src/app/models/item-venda";
import { Venda } from "src/app/models/venda";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
import { ItemService } from "src/app/services/item.service";
import { VendaService } from "src/app/services/venda.service";

interface itensEnvio {
  produtoId: number;
  quantidade: number;
  preco: number;
  carrinhoId: string;
}
@Component({
  selector: "app-finalizar-compra",
  templateUrl: "./finalizar-compra.component.html",
  styleUrls: ["./finalizar-compra.component.css"],
})
export class FinalizarCompraComponent implements OnInit {
  itens: ItemVenda[] = [];
  formasPagamento: formasPagamento[] = [];
  formaPgto: formasPagamento = {};
  colunasExibidas: String[] = ["nome", "preco", "quantidade"];
  valorTotal!: number;
  nomeUsuario: string = "";
  itensParaEnvio: itensEnvio[] = [];
  constructor(
    private itemService: ItemService,
    private formaPagamentoService: FormaPagamentoService,
    private vendaService: VendaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let carrinhoId = localStorage.getItem("carrinhoId")! || "";
    this.itemService.getByCartId(carrinhoId).subscribe((itens) => {
      this.itens = itens;
      this.valorTotal = this.itens.reduce((total, item) => {
        return total + item.preco * item.quantidade;
      }, 0);
    });

    this.formaPagamentoService.get().subscribe((formaPgto) => {
      this.formasPagamento = formaPgto;
    });
  }

  finalizarVenda() {
    this.itens.map((data) => {
      let item: itensEnvio = {
        carrinhoId: data.carrinhoId,
        preco: data.preco,
        quantidade: data.quantidade,
        produtoId: data.produtoId,
      };

      this.itensParaEnvio.push(item);
    });

    const venda: Venda = {
      cliente: this.nomeUsuario,
      formaPagamentoId: this.formaPgto.formaPagamentoId!,
      itens: this.itensParaEnvio,
    };

    this.vendaService.post(venda).subscribe(() => {
      this.router.navigate(["home/carrinho"]);
      localStorage.removeItem("carrinhoId");
    });
  }
}
