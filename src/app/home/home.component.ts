import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=CAD')
    .subscribe(result => this.cryptos = result)
  }

}
