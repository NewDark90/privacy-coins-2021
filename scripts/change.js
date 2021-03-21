const fs = require("fs"); 
  
// STEP 1: Reading JSON file 
let coins = require("../data/cmc-coins-latest").data; 
   
coins = coins.filter(c => c.tags.some(t => t == "privacy" || t == "ringct"))
   
// STEP 3: Writing to a file 
fs.writeFile("./data/privacy-coins_coinmarketcap.json", JSON.stringify(coins, null, 4), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log(coins); // Success 
}); 