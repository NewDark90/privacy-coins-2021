const fs = require("fs"); 
  
// STEP 1: Reading JSON file 
const allCoins = require("./cmc-coins-latest").data; 
const coins = {
    coinlore: require("./privacy-coins_coinlore"),
    coinmarketcap: require("./privacy-coins_coinmarketcap"),
    cryptoslate: require("./privacy-coins_cryptoslate")
};
   
let mergedCoins = allCoins
    .map(coin => {
        return {
            name: coin.name,
            ticker: coin.symbol,
            market_cap: coin.quote.USD.market_cap,
            tags: coin.tags,
            coinlore: coins.coinlore.some(cl => cl.ticker == coin.symbol),
            coinmarketcap: coins.coinmarketcap.some(cmc => cmc.symbol == coin.symbol),
            cryptoslate: coins.cryptoslate.some(cs => cs.ticker == coin.symbol),
        };
    }).filter(c => c.coinlore || c.coinmarketcap || c.cryptoslate);


const mktcap = mergedCoins.map(c => c.market_cap).reduce((acc, curr) => { return acc + curr; }, 0);
console.log(mktcap);
console.log((mktcap * 100) / 1700000000000);
