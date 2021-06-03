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
  tickers: any;
  ticker: any;
  tickerArray = [];
  key: 'cea3b6e1d525e7743a9a2d803db00d8518755a1fd9e7df73c126a4911feb36ce'
  krypto: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTickers()
  }



  getTickers() {
    this.http.get(`https://min-api.cryptocompare.com/data/blockchain/list?api_key=cea3b6e1d525e7743a9a2d803db00d8518755a1fd9e7df73c126a4911feb36ce`)
    .toPromise().then(result =>
      { //console.log(result)

        this.cryptos = result["Data"]
        for (let crypto in this.cryptos)
        {
          this.tickers = this.cryptos[crypto]
          //console.log(this.tickers["symbol"])
          this.ticker = this.tickers["symbol"]
          this.tickerArray.push(this.ticker)
        }
      });

  }



}
