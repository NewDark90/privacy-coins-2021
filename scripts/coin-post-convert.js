const fs = require("fs"); 

const allCoins = require("../data/privacy-coins-noted");

const billion = 1000000000;
const million = 1000000;
   
let privacyCoins = allCoins.filter(coin => coin.isPrivacyCoin === true);
let nonPrivacyCoins = allCoins.filter(coin => !coin.isPrivacyCoin);

let markdowns = [];

markdowns.push("## Privacy Coins");

privacyCoins.forEach((coin, i) => {

    let priceDisplay = coin.market_cap;
    if (priceDisplay > billion)
        priceDisplay = `$${(priceDisplay / billion).toFixed(2)} billion`;
    else if (priceDisplay > million)
        priceDisplay = `$${(priceDisplay / million).toFixed(0)} million`;
    else 
        priceDisplay = `$${priceDisplay.toFixed(0)}`;

    let markdown = `

### **${coin.name} - ${coin.ticker}** 

**Market Cap**: ~${priceDisplay}

**Privacy**: ${coin.privacy.type} - ${coin.privacy.tech.join(", ")} 

**Transaction Stats**: ${coin.transactions.block_time} block time **/** ${coin.transactions.per_second} transactions per second **/** ${coin.transactions.fee} fee

**CMC tags**: ${coin.tags.join(", ")}

**Coin Rundown / Pitch**: 

> ${coin.pitch}

**My Impression**: 

*${coin.impression.short}* ${coin.impression.emoji}

${coin.impression.long}

${coin.references.length ? "**References**:" : ""}
${coin.references.map(ref => `- [${ref}](${ref})`).join("\r\n")}

---

    `;

    markdowns.push(markdown);

    const fileName = `coin-${(i + 1).toString().padStart(2, '0')}-${coin.ticker}.md`;

    fs.writeFile(`./post/privacy-coins/${fileName}`, markdown, err => { 
        
        // Checking for errors 
        if (err) throw err;  
    
        console.log(fileName);
    }); 
});


markdowns.push("## Non-Privacy Coins");

nonPrivacyCoins.forEach((coin, i) => {

    let markdown = `

### **${coin.name} - ${coin.ticker}**

**Why this coin isn't with the other privacy coins?**: 

${coin.impression.long}

${coin.references.length ? "**References**:" : ""}
${coin.references.map(ref => `- [${ref}](${ref})`).join("\r\n")}

---

    `;

    markdowns.push(markdown);

    const fileName = `coin-${(i + 1).toString().padStart(2, '0')}-${coin.ticker}.md`;

    fs.writeFile(`./post/fake-coins/${fileName}`, markdown, err => { 
        
        // Checking for errors 
        if (err) throw err;  
    
        console.log(fileName);
    }); 
});


fs.writeFile(`./post/all.md`, markdowns.join("\r\n\r\n"), err => { 
        
    // Checking for errors 
    if (err) throw err;  
}); 