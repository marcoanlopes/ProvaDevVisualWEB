import { Component, OnInit } from "@angular/core";
import { ItemVenda } from "src/app/models/item-venda";
import { ItemService } from "src/app/services/item.service";

@Component({
    selector: "app-finalizar-compra",
    templateUrl: "./finalizar-compra.component.html",
    styleUrls: ["./finalizar-compra.component.css"],
})
export class FinalizarCompraComponent implements OnInit {
    itens: ItemVenda[] = [];
    colunasExibidas: String[] = ["nome", "preco", "quantidade"];
    valorTotal!: number;
    constructor(private itemService: ItemService) {}

    ngOnInit(): void {
        let carrinhoId = localStorage.getItem("carrinhoId")! || "";
        this.itemService.getByCartId(carrinhoId).subscribe((itens) => {
            this.itens = itens;
            this.valorTotal = this.itens.reduce((total, item) => {
                return total + item.preco * item.quantidade;
            }, 0);
        });
    }
}
