import { Injectable, Inject, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http"
import { Observable } from "rxjs";
import { Produto } from "../../model/produto";

@Injectable({
    providedIn: "root"
})
export class ProdutoServico implements OnInit {
    private _baseURL: string;
    public produtos: Produto[];

    ngOnInit(): void {
        this.produtos = [];
    }

    constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
        this._baseURL = baseUrl;
    }

    get headers(): HttpHeaders {
        return new HttpHeaders().set('content-type', 'application/json');
    }

    public cadastar(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this._baseURL + "api/produto", JSON.stringify(produto), { headers: this.headers });
    }

    public salvar(produto: Produto): Observable<Produto> {
        return this.http.post<Produto>(this._baseURL + "api/produto/salvar", JSON.stringify(produto), { headers: this.headers });
    }

    public deletar(produto: Produto): Observable<Produto[]> {
        return this.http.post<Produto[]>(this._baseURL + "api/produto/deletar", JSON.stringify(produto), { headers: this.headers });
    }

    public obterTodosOsProdutos(): Observable<Produto[]> {
        return this.http.get<Produto[]>(this._baseURL + "api/produto");
    }

    public obterProduto(produtoId: number): Observable<Produto> {
        return this.http.get<Produto>(this._baseURL + "api/produto/" + produtoId);
    }

    public enviarArquivo(arquivoSelecionado: File): Observable<string> {
        const formData: FormData = new FormData();
        formData.append("arquivoEnviado", arquivoSelecionado, arquivoSelecionado.name);
        return this.http.post<string>(this._baseURL + "api/produto/enviarArquivo", formData);
    }
}