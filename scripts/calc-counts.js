
// STEP 1: Reading JSON file 
const notedCoins = require("../data/privacy-coins-noted"); 

const privacyCoins = notedCoins.filter(c => c.isPrivacyCoin);

const stats = {
    count: notedCoins.length,
    privateCount: privacyCoins.length,
    hasFullImpl: notedCoins.filter(c => c.privacy.type.toLowerCase().includes("default") || c.privacy.type.toLowerCase().includes("full")).length,
    lists: [
        { "great": privacyCoins.filter(c => c.impression.short == "Great").map(c => c.ticker).join(", ") },
        { "good": privacyCoins.filter(c => c.impression.short == "Good").map(c => c.ticker).join(", ") },
        { "neutral": privacyCoins.filter(c => c.impression.short == "Neutral").map(c => c.ticker).join(", ") },
        { "wary": privacyCoins.filter(c => c.impression.short == "Wary").map(c => c.ticker).join(", ") },
        { "yikes": privacyCoins.filter(c => c.impression.short != "Great" &&  c.impression.short != "Good" &&   c.impression.short != "Neutral" &&   c.impression.short != "Wary" && c.impression.short != "Unsure" ).map(c => c.ticker).join(", ") },
        { "unsure": privacyCoins.filter(c => c.impression.short.includes("Unsure")).map(c => c.ticker).join(", ") }
    ]
}
   
console.log(stats);
