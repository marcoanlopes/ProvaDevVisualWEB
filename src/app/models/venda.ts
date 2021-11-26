import { formasPagamento } from "./formasPagamento";
import { ItemVenda } from "./item-venda";

export interface Venda {
  vendaId?: number;
  cliente: string;
  formaPagamento: formasPagamento;
  formaPagamentoId: number;
  itens: any;
}
