const fs = require("fs"); 
const convert = require("./coin-post-convert");

convert();

const sections = [
    require("../post/intro.md"),
    require("../post/coins-all.md")
]

const allText = sections.join("\r\n");

// STEP 3: Writing to a file 
fs.writeFile("./post/main.md", allText, err => { 
     
    // Checking for errors 
    if (err) throw err;  
   
    console.log(allText); // Success 
}); 