import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {



  tickerApi = 'https://min-api.cryptocompare.com/data/blockchain/list?api_key=cea3b6e1d525e7743a9a2d803db00d8518755a1fd9e7df73c126a4911feb36ce'
  currencyApi = 'https://openexchangerates.org/api/currencies.json'

  objectKeys = Object.keys;
  cryptos: any;
  tickers: any;
  ticker: any;
  tickerArray = []; //Array of tickers
  currencyArray = []; //Array of currencies

  selectedCrypto = ""
  selectedCurrency = ""

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
    console.log(this.selectedCrypto.toString())
    console.log(this.selectedCurrency.toString())
  }



}
