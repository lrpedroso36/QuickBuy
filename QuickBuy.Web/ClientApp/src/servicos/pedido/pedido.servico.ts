import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Pedido } from "../../model/pedido";

@Injectable({
    providedIn: 'root'
})
export class PedidoServico implements OnInit {
    private _baseURL: string;

    ngOnInit(): void {

    }

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseURL = baseUrl;
    }

    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    public efetivarCompra(pedido: Pedido): Observable<number> {
        return this.http.post<number>(this._baseURL + "api/pedido", JSON.stringify(pedido), { headers: this.headers });
    }
}