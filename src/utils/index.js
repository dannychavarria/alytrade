const axios = require('axios')

const currencies = {
     1: { name: 'Bitcoin', symbol: 'BTC', color: '#f7931a' },
     2: { name: 'Ethereum', symbol: 'ETH',color: '#627eea' },
     3: { name: 'Litecoin', symbol: 'LTC', color: '#274778' },
     4: { name: 'Dash', symbol: 'DASH', color: '#2573c2'},
     5: { name: 'Tether', symbol: 'USDT', color: '#f7931a' },
     6: { name: 'DogeCoin', symbol: 'DOGE', color: '#ffcb09' },
     7: { name: 'Alycoin', symbol: 'ALY', color: '#f7931a' },
     8: { name: 'Ripple', symbol: 'XRP', color: '#f7931a' },
     9: { name: 'Binance', symbol: 'BNB', color: '#f7931a' },
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