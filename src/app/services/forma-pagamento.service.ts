import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { formasPagamento } from "../models/formasPagamento";

@Injectable({
  providedIn: "root",
})
export class FormaPagamentoService {
  private baseUrl = "https://localhost:5001/api/pagamento";

  constructor(private http: HttpClient) {}

  get(): Observable<formasPagamento[]> {
    return this.http.get<formasPagamento[]>(`${this.baseUrl}/list`);
  }
}
