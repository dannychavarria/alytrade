const axios = require('axios')

const currencies = {
     1: { name: 'Bitcoin', symbol: 'BTC' },
     2: { name: 'Ethereum', symbol: 'ETH' },
     3: { name: 'Litecoin', symbol: 'LTC' },
     4: { name: 'Dash', symbol: 'DASH' },
     5: { name: 'Tether', symbol: 'USDT' },
     6: { name: 'DogeCoin', symbol: 'DOGE' },
     7: { name: 'Alycoin', symbol: 'ALY' },
     8: { name: 'Ripple', symbol: 'XRP' },
     9: { name: 'Binance', symbol: 'BNB' },
}

export const getCurrencyDataById = (id) => currencies[id]

export const getCurrencyPrices = async () => {
     const response = await axios({
          method: 'get',
          url: process.env.REACT_APP_PRICES_ENDPOINT,
          headers: {}
     })
     const { data } = response
     const keys = Object.keys(data)
     const prices = {}
     
     for (let key of keys) {
          prices[key] = data[key].quote.USD.price
     }

     return prices
}