import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class HomeComponent implements OnInit {

  cryptos: any;
  tickers: any;
  ticker: any;
  tickerArray = []; //Array of tickers
  currencyArray = []; //Array of currencies
  errMsg = ""
  statusCode = false
  selectedCrypto = ""
  selectedCurrency = ""
  cryptoData: any;
  cryptoInfo: any;
  crypto: any;
  cryptoArray = [];

  spin = false;

  tickerApi = 'https://min-api.cryptocompare.com/data/blockchain/list?api_key=cea3b6e1d525e7743a9a2d803db00d8518755a1fd9e7df73c126a4911feb36ce'
  currencyApi = 'https://openexchangerates.org/api/currencies.json'

  constructor(private http: HttpClient,
              private _auth: AuthService,
              private _router: Router) { }

  ngOnInit(): void {
    this.getTickers()
    this.getCurrency()
    this.updateData()
  }

  //currency extration from currency api
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

  //ticker extraction from ticker api
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

  //data display handler
  displayData(){
    this.cryptoArray = []
    this.http.get(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${this.selectedCrypto}&tsyms=${this.selectedCurrency}`).toPromise()
    .then(result => {
      this.cryptoData = result["DISPLAY"]
      for (let crypto in this.cryptoData)
      {
        // console.log(crypto)
        this.cryptoInfo = this.cryptoData[crypto]
        for (let item in this.cryptoInfo)
        {
          // console.log(item)
          this.crypto = this.cryptoInfo[item]
          this.cryptoArray.push(this.crypto)
          // console.log(this.cryptoArray)
        }
      }
    })
  }

  //click event handler
  handleClick() {
    if(this.selectedCrypto === "" || this.selectedCurrency === "")
    {
      this.statusCode = true;
      this.errMsg = "Selection Cannot be Blank"
    }
    else {
      this.statusCode = false;
      this.spin = true;
      this.spinner();
      this.displayData();
    }
  }

  //Spinner Control
  spinner = async () => {
    setTimeout(() => this.spin = false, 2000)
  }

  //Refresh Data Every 10 seconds
  updateData = async () => {
    setInterval(() => {
      this.displayData();
    }, 10000)
  }

  reset(){
    this.selectedCrypto=""
    this.selectedCurrency=""
  }

  logout(){
    this._auth.logout()
    this._router.navigate(['/register']);
  }

}
