const convert = (callback) => {
    const fs = require("fs"); 

    const allCoins = require("../data/privacy-coins-noted");

    const billion = 1000000000;
    const million = 1000000;
    
    let privacyCoins = allCoins.filter(coin => coin.isPrivacyCoin === true);
    let nonPrivacyCoins = allCoins.filter(coin => !coin.isPrivacyCoin);

    let markdowns = [];
    let refMarkdowns = [];

    //markdowns.push("## Privacy Coins");
    markdowns.push("\r\n---");

    privacyCoins.forEach((coin, i) => {

        let priceDisplay = coin.market_cap;
        if (priceDisplay > billion)
            priceDisplay = `$${(priceDisplay / billion).toFixed(2)} billion`;
        else if (priceDisplay > million)
            priceDisplay = `$${(priceDisplay / million).toFixed(0)} million`;
        else 
            priceDisplay = `$${priceDisplay.toFixed(0)}`;

        let markdown = `
## *${coin.name}* - ${coin.ticker}

**Market Cap**: ~${priceDisplay}

**Privacy**: ${coin.privacy.type} - ${coin.privacy.tech.join(", ")} 

**Transaction Stats**: ${coin.transactions.block_time} block time **/** ${coin.transactions.per_second} transactions per second **/** ${coin.transactions.fee} fee

**Coin Rundown / Pitch**: 

> ${coin.pitch}

**My Impression**: 

${coin.impression.long}

*Overall impression*: ${coin.impression.short} ${coin.impression.emoji}

---
`;

        let refMarkdown = `
## *${coin.name}* - ${coin.ticker}

${coin.references.length ? "**References**:" : ""}
${coin.references.map(ref => `- [${ref}](${ref})`).join("\r\n")}
`;

        markdowns.push(markdown);
        refMarkdowns.push(refMarkdown);

        //const fileName = `coin-${(i + 1).toString().padStart(2, '0')}-${coin.ticker}.md`;
        const fileName = `${coin.ticker}`;

        fs.writeFile(`./post/privacy-coins/${fileName}.md`, markdown, err => { 
            if (err) throw err;  
            console.log(fileName);
        }); 

        fs.writeFile(`./post/privacy-coins/${fileName}-references.md`, refMarkdown, err => { 
            if (err) throw err;  
            console.log(fileName);
        }); 
    });


    markdowns.push("## Excluded \"Privacy\" Coins");

    nonPrivacyCoins.forEach((coin, i) => {

        let markdown = `
### *${coin.name}* - ${coin.ticker}

**Why is this coin here?**: 

${coin.impression.long}

---
`;
        let refMarkdown = `
### *${coin.name}* - ${coin.ticker}

${coin.references.length ? "**References**:" : ""}
${coin.references.map(ref => `- [${ref}](${ref})`).join("\r\n")}

---
`;


        markdowns.push(markdown);

        //const fileName = `coin-${(i + 1).toString().padStart(2, '0')}-${coin.ticker}.md`;
        const fileName = `${coin.ticker}`;

        fs.writeFile(`./post/fake-coins/${fileName}.md`, markdown, err => { 
            if (err) throw err;  
            console.log(fileName);
        }); 

        fs.writeFile(`./post/fake-coins/${fileName}-references.md`, refMarkdown, err => { 
            if (err) throw err;  
            console.log(fileName);
        }); 
    });

    fs.writeFile(`./post/coins-all.md`, markdowns.join("\r\n"), err => { 
        if (err) throw err;  
        if (callback)
            callback();
    }); 


    fs.writeFile(`./post/coins-all-references.md`, refMarkdowns.join("\r\n"), err => { 
        if (err) throw err;
        if (callback)
            callback();
    }); 
}

module.exports = convert;