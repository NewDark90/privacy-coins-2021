const fs = require("fs"); 
  
// STEP 1: Reading JSON file 
let coins = require("../data/privacy-coins-noted.json"); 

coins.forEach(c => {
    //c["impression"] = {
        //long: c.impression,
        //short: ""
    //};
});

   
// STEP 3: Writing to a file 
fs.writeFile("./data/privacy-coins-noted.json", JSON.stringify(coins, null, 4), err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log(coins); // Success 
}); 