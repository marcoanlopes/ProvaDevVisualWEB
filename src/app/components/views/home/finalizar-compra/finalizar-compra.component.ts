import { Component, OnInit } from "@angular/core";
import { formasPagamento } from "src/app/models/formasPagamento";
import { ItemVenda } from "src/app/models/item-venda";
import { FormaPagamentoService } from "src/app/services/forma-pagamento.service";
import { ItemService } from "src/app/services/item.service";

@Component({
  selector: "app-finalizar-compra",
  templateUrl: "./finalizar-compra.component.html",
  styleUrls: ["./finalizar-compra.component.css"],
})
export class FinalizarCompraComponent implements OnInit {
  itens: ItemVenda[] = [];
  formasPagamento: formasPagamento[] = [];
  colunasExibidas: String[] = ["nome", "preco", "quantidade"];
  valorTotal!: number;
  constructor(private itemService: ItemService, private formaPagamentoService: FormaPagamentoService) {}

  ngOnInit(): void {
    let carrinhoId = localStorage.getItem("carrinhoId")! || "";
    this.itemService.getByCartId(carrinhoId).subscribe((itens) => {
      this.itens = itens;
      this.valorTotal = this.itens.reduce((total, item) => {
        return total + item.preco * item.quantidade;
      }, 0);

      console.log(this.itens);
    });

    this.formaPagamentoService.get().subscribe((formaPgto) => {
      this.formasPagamento = formaPgto;
      console.log(this.formasPagamento);
    });
  }
}
