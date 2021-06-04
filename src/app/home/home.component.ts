import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {

  objectKeys = Object.keys;
  cryptos: any;
  tickers: any;
  ticker: any;
  tickerArray = []; //Array of tickers
  currencyArray = []; //Array of currencies

  selectedCrypto = "BTC"
  selectedCurrency = "CAD"
  cryptoData: any;
  cryptoInfo: any;
  crypto: any;
  cryptoArray = [];


  tickerApi = 'https://min-api.cryptocompare.com/data/blockchain/list?api_key=cea3b6e1d525e7743a9a2d803db00d8518755a1fd9e7df73c126a4911feb36ce'
  currencyApi = 'https://openexchangerates.org/api/currencies.json'

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getTickers()
    this.getCurrency()
  }


  getCurrency() {
    this.http.get(this.currencyApi)
    .toPromise()
    .then(result => {

      for (let currency in result)
      {
          this.currencyArray.push(currency)
      }
      // console.log(this.currencyArray[10])
    })
  }

  getTickers() {
    this.http.get(this.tickerApi)
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

  displayData(){
    this.cryptoArray = []
    this.http.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.selectedCrypto}&tsyms=${this.selectedCurrency}`).toPromise()
    .then(result => {
      this.cryptoData = result["DISPLAY"]
      for (let crypto in this.cryptoData)
      {
        console.log(crypto)
        this.cryptoInfo = this.cryptoData[crypto]
        for (let item in this.cryptoInfo)
        {
          console.log(item)
          this.crypto = this.cryptoInfo[item]
          this.cryptoArray.push(this.crypto)
          console.log(this.cryptoArray)
        }
      }
    })

  }

}
