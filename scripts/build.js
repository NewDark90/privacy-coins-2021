const fs = require("fs"); 
const path = require('path');
const convert = require("./coin-post-convert");

convert(() => {

    const sections = [
        fs.readFileSync(path.resolve(__dirname, '../post/intro.md'), 'utf8'),
        fs.readFileSync(path.resolve(__dirname, '../post/tech-overview.md'), 'utf8'),
        fs.readFileSync(path.resolve(__dirname, '../post/coin-intro.md'), 'utf8'),
        fs.readFileSync(path.resolve(__dirname, '../post/coins-all.md'), 'utf8'),
        fs.readFileSync(path.resolve(__dirname, '../post/outro.md'), 'utf8'),
    ]
    
    const allText = sections.join("");
    
    // STEP 3: Writing to a file 
    fs.writeFile("./post/main.md", allText, err => { 
         
        // Checking for errors 
        if (err) throw err;  
       
        console.log(allText); // Success 
    }); 

});

