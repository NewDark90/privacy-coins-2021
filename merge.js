const fs = require("fs"); 
  
// STEP 1: Reading JSON file 
const allCoins = require("./cmc-coins-latest").data; 
const coins = {
    coinlore: require("./privacy-coins_coinlore"),
    coinmarketcap: require("./privacy-coins_coinmarketcap"),
    cryptoslate: require("./privacy-coins_cryptoslate")
};
   
let mergedCoins = allCoins
.filter(coin => coin.quote.USD.market_cap > 20000000)
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
   
// STEP 3: Writing to a file 
fs.writeFile("privacy-coins_merged.json", JSON.stringify(mergedCoins, null, 4), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log(mergedCoins.length); // Success 
}); 