import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interfaces/gifsSearchResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('imagenes')!) || [];
  }

  private _historial: string[] = [];
  private url: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = '5OPSim3kRXU02CzEl6TeTsvt2YWQwoR4';


  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string) {

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http.get<SearchGIFResponse>(`${this.url}/search`, { params })
      .subscribe((res) => {
        console.log(res.data);
        this.resultados = res.data;
        localStorage.setItem('imagenes', JSON.stringify(this.resultados));
      });

    this.AddHistory(query);
  }

  AddHistory(query: string) {
    query = query.trim().toLowerCase();

    if (query.length > 0 && !this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.slice(0, 10);
      console.log(this._historial);
    }
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }

}
