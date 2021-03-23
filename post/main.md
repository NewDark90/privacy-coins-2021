# **2021 Guide to Private Cryptocurrency**

In the past few months I've been very involved in understanding and researching cryptocurrency. Like many of you, I find the technology fascinating and the prospects for the near and distant future enthralling. However, I've noticed a few things that caused me to write this guide. 

1. Gathering the details on coins in itself usually isn't tricky on a per-coin basis. However, comparing them, especially on more technical aspects instead of market dynamics can be challenging. I want to share what I've compiled, as I was already doing half the work in an unorganized way already.
2. Privacy coins are a very, very small part of the market currently. The most generous interpretation of the current market cap of all privacy crypto coins is well under 1%. Even knowing that BTC and ETH account for ~60% and ~12% respectively, that still seems low.

Please note, some of these details will be basic, especially if you frequent /r/cryptocurrency. I want this to still be generally approachable for people relatively fresh to blockchain and crypto concepts. Some things might get over simplified, but I'll try not to throw out any important details or nuance. As always, do your own research. I'm not an expert. Please correct me with references where I'm wrong. Not financial advice.

## *What is private crypto, and wait, isn't it already private?* 
Well, not quite. It would be safe to say that most crypto-currencies, including bitcoin, are pseudo-anonymous. Blockchains are a distributed ledger of transactions. And because these transactions are public knowledge, you can see that wallet "ABC" gave 0.5 bitcoin to "XYZ" at a certain timeframe. You don't know that John Smith owns the "ABC" wallet. However, if anyone were to find out that John Smith owns "ABC" wallet, that makes every single transaction John Smith has ever made or recieved out of that wallet, traceable to him. 

That seems like a fundamental flaw. I don't want governments, companies, or even family combing through my entire reddit history... much MUCH less my entire financial transaction history. 

So, what's out there to solve for the privacy problem?

## **Privacy Tech Overview**

Before going into individual coins and implementations, I'm going to briefly go over the technology that powers most of them. If there's a unique tech for a coin, it probably won't be here and instead touched on in the coin information itself. I'm basing my Pros and Cons on the [firo tech comparison guide](https://firo.org/guide/privacy-technology-comparison.html). It's not perfect and the source is technically biased, but it's one of the better comprehensive guides and a good starting point.

### *Coin-Joins/Mixers/Tumblers*

One of the simpler, quick and dirty methods of anonymizing yourself on the blockchain. You can even do this with Bitcoin! A quick real world analogy would be that you and multiple others get together with handfuls of metal coins. Everyone puts their money in a jar. A dedicated "jar-shaker" is told where to send coins in the amounts that are put in by the individuals. The jar gets shaken up by the shaker. The shaker then distributes the coins from the jar. 

Pros:

- Works on top of most cryptocurrencies
- Relatively simple to implement
- Lightweight

Cons:

- Basic anonymity
- Requires mixers to be online
- Acquiring coins from a mixer may give you coins that are being tracked and/or tied to illegal activity.

References: 
- [https://academy.bit2me.com/en/what-is-coinjoin/](https://academy.bit2me.com/en/what-is-coinjoin/)
- [https://www.investopedia.com/terms/c/coinjoin.asp](https://www.investopedia.com/terms/c/coinjoin.asp)

### *RingCT + CryptoNote*
I'm putting these together as they almost always are used in a pair, most notably in Monero.

RingCT works by sending multiple "decoy" transactions among the actual transaction. The amount is not known to anyone other than sender and reciever.
CryptoNote handles generating one-time use addresses to use for a transaction.

Together, the amount of anonymity is very solid. Its not perfect given it partly uses "security through obscurity" with multiple decoys. 

Pros:

- Can be implemented with "privacy on" by default
- Anonymity increases as time passes as outputs become the new inputs of new mixes
- Hides transaction amounts when implemented with RingCT (or bulletproofs)
- Well researched cryptography

Cons:

- Does not break transaction links, merely obscures them, hence a 'decoy' model.
- Scalability issues because of large transaction sizes and a non prunable blockchain
- Risks of blockchain being deanonymized in the future or through incorrect implementations
- Ring size is practically limited
- Does not have supply auditability meaning hidden inflation can go undetected.

References: 
- [https://www.getmonero.org/resources/moneropedia/ringCT.html](https://www.getmonero.org/resources/moneropedia/ringCT.html)
- [https://blockonomi.com/cryptonote-technology/](https://blockonomi.com/cryptonote-technology/)
- [https://www.wired.com/story/monero-privacy/](https://www.wired.com/story/monero-privacy/)


### *Zero-Knowledge Proofs (zk-SNARKs, zk-STARKs, Bulletproofs)*

A method of proving a transaction is valid, without identifying any other information about it. 

Primarily, the method used for blockchains are zk-SNARKs. *Zero-Knowledge Succinct Non-Interactive Argument of Knowledge*

Pros:

- Can be implemented with "privacy on" by default
- Hides all details of transaction, including amount
- Proof sizes are small and fast to verify
- Cryptographically Secure

Cons: 

- Requires a trusted setup.
    - This risk can be managed through Multi-party Computation Ceremonies.
- Incorrect implementation or leakage of trusted setup parameters can lead to forgery of coins.
- Does not have supply auditability meaning hidden inflation can go undetected.

References:
- [https://z.cash/technology/zksnarks/](https://z.cash/technology/zksnarks/)
- [https://github.com/matter-labs/awesome-zero-knowledge-proofs#comparison-of-the-most-popular-zkp-systems](https://github.com/matter-labs/awesome-zero-knowledge-proofs#comparison-of-the-most-popular-zkp-systems)
- [https://cointelegraph.com/news/why-setup-matters-for-cryptocurrency-privacy](https://cointelegraph.com/news/why-setup-matters-for-cryptocurrency-privacy)
- [https://z.cash/technology/paramgen/](https://z.cash/technology/paramgen/)

### **MimbleWimble**

A newer technology that hides all transactions and amounts. Uses a "blinding factor" that acts similiarly to secret addresses that are shared between both parties, which means only the sender and reciever know they are a part of the transaction. Also, probably most importantly, MimbleWimble is a Harry Potter spell for tongue-tying.

Pros:

- All transactions are private
- Uses well established cryptography
- Hides transaction amounts
- Blockchain can reduce in size as it only retains UTXOs
- No re-use of address problems

Cons: 

- Needs interaction between receiver and sender. Cannot post address and receive. Multi-party transactions are problematic as all parties need to communicate to create a transaction.
- Does not break transaction links, merely obscures them, hence a 'decoy' model.
    - Transaction links are to secret addresses, not a wallet.
- Cold storage in hardware wallets are tricky to implement.
- Smart contracts are harder to implement on MimbleWimble.
- Relatively early in development.
- Doesn't share Bitcoin core code, making third-party integration more challenging.

References: 
- [https://cryptopotato.com/what-is-mimblewimble-the-complete-beginners-guide/](https://cryptopotato.com/what-is-mimblewimble-the-complete-beginners-guide/)
- [https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9](https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9)
- [https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/](https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/)

### *Lelantus*

Previous / older implementations: Sigma, Zerocoin.

Lelantus protocol uses a burn-and-redeem model to achieve a high level of privacy. The users can redeem their coins using a special receipt which they receive when they burn their coins, new coins don't have a trace on the blockchain.

Pros:

- Very high anonymity with anonymity sets of up to around 100,000. Mint and spend transactions and completely breaks transaction links between addresses.
- Uses well-researched cryptography and only requiring DDH cryptographic assumptions
- Small proof sizes of around 1.5 kB
- No trusted setup
- Scalable enough to allow "privacy on" by default

Cons:

- Difficult to scale past anonymity sets of 100,000 without cryptographic breakthrough.
- Direct anonymous payments in current form require recipient to spend and remint the coin again to prevent the sender from finding out when that coin is spent.
- Still in early development, potential bugs and exploits could arise.

References: 
- [https://medium.com/@zcoin/lelantus-zcoins-next-gen-privacy-protocol-f17ac53be277](https://medium.com/@zcoin/lelantus-zcoins-next-gen-privacy-protocol-f17ac53be277)
- [https://forum.firo.org/t/lelantus-disabled-temporarily](https://forum.firo.org/t/lelantus-disabled-temporarily)
- [Zcoin's Upcoming Privacy Protocols: Sigma and Lelantus](https://www.youtube.com/watch?v=HSf8bqC0Pcw)

## Network Tech Overview

Not all protections are implemented directly on the blockchain. There are some network level tools that are also occasionally included within the wallet software or the blockchain nodes themselves.

### *Tor*

You probably know Tor, right? It hides your IP while browsing the internet. You send a request to the Tor network. That request gets bounced around several random network nodes before finally exiting.

References: 
- [https://www.csoonline.com/article/3287653/what-is-the-tor-browser-how-it-works-and-how-it-can-help-you-protect-your-identity-online.html](https://www.csoonline.com/article/3287653/what-is-the-tor-browser-how-it-works-and-how-it-can-help-you-protect-your-identity-online.html)

### *Dandelion++*

Instead of immediately broadcasting a transaction to the blockchain to spread, a transaction is passed through a few blockchain nodes sequentially and anonymously before being broadcast to the network.

References:
- [https://blockonomi.com/dandelion-protocol/](https://blockonomi.com/dandelion-protocol/)


Further General Reading 
- [firo.org's Privacy Technology Comparison](https://firo.org/guide/privacy-technology-comparison.html)

## **Privacy Coins**

Before going into the details of every coin in this list. I want to make a few things known. 

*First*, I'm only going to be looking at coins, not tokens.

*Second*, there are varying degrees of how private a coin is. Some may draw the line on what "is" and "is not" a privacy coin based on different criteria. The bar that I will use for this list is going to be fairly simple and as reasonably inclusive as I can be. To be a privacy coin here, you need to at least do better than what you can do with Bitcoin. With Bitcoin, you can optionally perform a coinjoin for transactions. If your coin has Opt-In security features, it has to be better than a coinjoin. If the security feature IS a coinjoin, it must at least be the default. Having some network security bells and whistles to keep your IP private is nice, but also not enough to make the cut.

*Third*, I haven't checked every coin in existence. I've found 3 lists of coins I'm working off of here, with a 4th I found later as another sanity check. [Coin Market Cap Api \(filtering by tags\)](https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000&cryptocurrency_type=coins), [Cryptoslate](https://cryptoslate.com/cryptos/privacy/), [Coinlore](https://www.coinlore.com/privacy-coins), [CoinGecko](https://www.coingecko.com/en/categories/privacy-coins)

*Fourth*, remember that this is a **very small** sector of the crypto market currently. Many of these coins are going to be far below the top 100. I've limited the criteria to be any coin over $20 million Market Cap on 3/13 (~0.002% of BTC), so the floor for these coins is very low. Why that number specifically? Mostly, I wanted to make sure Grin made the cut. Beyond that, it was trying to keep interesting projects I found near that line also in the cut. I also didn't want to add a bunch of extra work for truly bottom of the barrel coins. If you have a favorite down there that does something interesting and unique beyond being another Monero clone, I want to know. 

I'll also have a special list underneath these coins that specifically call out the coins that were marked as private by at least one of these lists, and reasoning as to why I think it isn't really a privacy coin.


---


## *Monero* - XMR

**Market Cap**: ~$4.14 billion

**Privacy**: Full - CryptoNote, RingCT 

**Transaction Stats**: ~2 min block time **/** >1000 transactions per second **/** ~0.000011 XMR, ~0.0025 - 0.10 USD fee

**Coin Rundown / Pitch**: 

> Privacy is achieved through a few distinctive features. Whereas each Bitcoin in circulation has its own serial number, meaning that cryptocurrency usage can be monitored, XMR is completely fungible. By default, details about senders, recipients and the amount of crypto being transferred are obscured — and Monero advocates says this offers an upper hand over rival privacy coins such as Zcash, which are “selectively transparent.” Obfuscation is achieved through the use of ring signatures. Here, past transaction outputs are picked from the blockchain and act as decoys, meaning that outside observers can’t tell who signed it. To ensure that transactions cannot be linked to one another, stealth addresses are created for every single transaction that are only used once.

**My Impression**: 

The Bitcoin of privacy coins. The market leader that's more of a store of value than a currency. While transaction fees are high relative to most others listed, they're still very reasonable, especially compared to BTC and ETH. Unless there's major problems that show up with the technology, it will probably stay a major/top coin. If Bitcoin's market dominance has taught me anything, even mildly flawed tech can be a juggernaut industry leader if it's the standard people build around.

*How do I feel about this project?* Great 😄

**References**:
- [https://coingeek.com/monero-is-traceable-using-new-ciphertrace-tool/](https://coingeek.com/monero-is-traceable-using-new-ciphertrace-tool/)
- [https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/](https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/)
- [https://www.financemagnates.com/cryptocurrency/news/is-monero-still-a-privacy-coin-ciphertrace-files-2nd-xmr-tracing-patent/](https://www.financemagnates.com/cryptocurrency/news/is-monero-still-a-privacy-coin-ciphertrace-files-2nd-xmr-tracing-patent/)
- [https://old.reddit.com/r/Monero/comments/72kp2f/is_monero_truly_untraceable_or_is_there_just_a/](https://old.reddit.com/r/Monero/comments/72kp2f/is_monero_truly_untraceable_or_is_there_just_a/)
- [https://bitinfocharts.com/comparison/monero-transactionfees.html#6m](https://bitinfocharts.com/comparison/monero-transactionfees.html#6m)
- [https://www.monero.how/monero-transaction-fees](https://www.monero.how/monero-transaction-fees)
- [https://monero.stackexchange.com/questions/405/how-many-transactions-per-second-can-the-monero-network-handle](https://monero.stackexchange.com/questions/405/how-many-transactions-per-second-can-the-monero-network-handle)

---



## *Zcash* - ZEC

**Market Cap**: ~$1.72 billion

**Privacy**: Opt-In - zk-SNARKs 

**Transaction Stats**: 2.5 min block time **/** ~27 transactions per second **/** 0.0001 ZEC, ~0.01USD fee

**Coin Rundown / Pitch**: 

> 

**My Impression**: 

Another Opt-In privacy coin. This coin is the highest market cap with a zk-SNARKs implementation. Most transactions aren't z-address to z-address (private), so if the rest of the transactions are public in some capacity. Transaction stats seem passable, but not amazing. If privacy is your main concern, I'd look elsewhere. Otherwise it seems like a decent coin. Hard to say if it's undervalued given how small the sector is overall or overvalued given how good some of the other coins are.

*How do I feel about this project?* Neutral 😐

**References**:
- [https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/](https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/)
- [https://cointelegraph.com/news/researchers-claim-999-of-zcash-transactions-are-traceable](https://cointelegraph.com/news/researchers-claim-999-of-zcash-transactions-are-traceable)
- [https://old.reddit.com/r/zec/comments/662iq4/noob_question_whats_zcash_network_transactions/?st=JGWQXK4K&sh=3add5e26](https://old.reddit.com/r/zec/comments/662iq4/noob_question_whats_zcash_network_transactions/?st=JGWQXK4K&sh=3add5e26)

---



## *Horizen* - ZEN

**Market Cap**: ~$563 million

**Privacy**: Opt-In - zk-SNARKs 

**Transaction Stats**: 2.5 min block time **/** undefined transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Horizen uses a sidechain architecture that can open up a myriad of potential real-world use cases. This cross-chain transfer protocol allows for decentralized sidechains. These are separate blockchains that are pegged to the parent blockchain that can run simultaneously.

**My Impression**: 

Opt-In zk-SNARKs implementation... wait, is this ZCash? No? Ok. Blockchains on blockchains? Sounds cool, but I don't know what to make of it. Hard to dig up details on this one.

*How do I feel about this project?* Neutral 😐




---



## *Verge* - XVG

**Market Cap**: ~$422 million

**Privacy**: Mixed/Optional - Wraith Protocol, I2P/Tor 

**Transaction Stats**: 30 sec block time **/** 100(2000 with RSK?) transactions per second **/** 0.1 XVG, ~0.003 USD fee

**Coin Rundown / Pitch**: 

> Verge was created as a way to fulfill Bitcoin founder Satoshi Nakamoto's vision of a decentralized, trustless electronic payment system while also providing more privacy than is available with Bitcoin. In order to accomplish this goal, Verge relies on a series of key privacy features. It automatically routes all traffic to and from its vergePay wallet through the Tor network, anonymizing the traffic and masking IP addresses. It also offers dual-key stealth addressing, through which senders can create one-time wallet addresses on behalf of recipients to help protect the recipients' privacy, as well as using atomic swaps to power trustless peer-to-peer cross-blockchain transactions.

**My Impression**: 

Wraith Protocol is optional, and it leaks the transaction amount unlike zk-SNARKs, oof. The chain has also been 51% attacked quite a few times, and recently had it's block history re-written for a short time before a fix. That said, this coin has some pretty good transaction stats and quite a few good features like an atomic swap functionality, and smart contracts being implemented in the future through RSK. It's and interesting project that's had a shaky and strange history.

*How do I feel about this project?* Wary 😟

**References**:
- [https://medium.com/@sashakolupaev/what-is-the-wraith-protocol-bd1dfb289cda](https://medium.com/@sashakolupaev/what-is-the-wraith-protocol-bd1dfb289cda)
- [https://www.coinbureau.com/review/verge-xvg/](https://www.coinbureau.com/review/verge-xvg/)
- [https://old.reddit.com/r/CryptoCurrency/comments/avvmb9/verge_xvg_has_lost_94_percent_of_its_value_after/](https://old.reddit.com/r/CryptoCurrency/comments/avvmb9/verge_xvg_has_lost_94_percent_of_its_value_after/)

---



## *Secret* - SCRT

**Market Cap**: ~$207 million

**Privacy**:  -  

**Transaction Stats**: ? block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Secret Network is the first blockchain with privacy-preserving smart contracts. Applications built on Secret Network utilize encrypted data without exposing it to anyone, even the nodes in the network. Secret Network empowers developers to build decentralized, permissionless, privacy-preserving applications - Secret Apps. For blockchain technology to reach global adoption, users and organizations need granular control over their data. Private by default - transparent when needed - Secret Network's programmable privacy delivers this level of control, securing and scaling Web 3.0.

**My Impression**: 

Seems like less of a currency, and more of a 'computational gas' for secret smart contracts. It used to be an ETH token, but has it's own blockchain now. Seems like a niche use case, but also a necessary one.

*How do I feel about this project?* Neutral 😐

**References**:
- [https://www.coindesk.com/enigma-blockchain-has-a-new-name-and-a-privacy-boost-in-the-works](https://www.coindesk.com/enigma-blockchain-has-a-new-name-and-a-privacy-boost-in-the-works)
- [https://forum.scrt.network/t/typical-transaction-time-and-costs/906](https://forum.scrt.network/t/typical-transaction-time-and-costs/906)

---



## *Haven Protocol* - XHV

**Market Cap**: ~$193 million

**Privacy**: Full - RingCT, CryptoNote 

**Transaction Stats**: 2 min block time **/**  transactions per second **/** 0.2%-20% fee

**Coin Rundown / Pitch**: 

> Haven Protocol is similar to an offshore bank where users can create private tokens that represent stable and volatile assets, including commodities and fiat currencies (such as USD). The protocol is based on Monero, which focuses on secure, private and untraceable transactions. As a result, most of the features of Monero extend to the Haven protocol, including the bulletproofs and other privacy tech. The base currency of Haven is the XHV, which is burnt to provide users with private, untraceable, synthetic assets and commodities called xAssets. The network uses a “mint and burn” process to provide users with untraceable digital assets with standard market pricing and real asset-pegged value storage. Simply, users can burn Haven (XHV) for Haven Dollars (xUSD), which is a synthetic stablecoin.

**My Impression**: 

Uses XMR tech. Has high fees and long transaction times. I love the inherit contrictory nature of what this one promotes versus what it explicitly says. The pitch really does say it all really. You're an "offshore bank", but the FAQ has this line: "Note: Although Haven transactions are private it should not be used for illicit or illegal purposes that violate a user’s local or national laws." - lol

*How do I feel about this project?* Wary 😟

**References**:
- [https://havenprotocol.org/knowledge/transaction-fees/](https://havenprotocol.org/knowledge/transaction-fees/)
- [https://havenprotocol.org/faqs/](https://havenprotocol.org/faqs/)

---



## *Phala Network* - PHA

**Market Cap**: ~$163 million

**Privacy**:  -  

**Transaction Stats**: ? block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Phala Network tackles the issue of trust in the computation cloud. This blockchain is a trustless computation platform that enables massive cloud processing without sacrificing data confidentiality. Built around TEE-based privacy technology already embedded into modern processors, Phala Network's distributed computing cloud is versatile and confidential. By separating the consensus mechanism from computation, Phala ensures processing power is highly scalable. Together, this creates the infrastructure for a powerful, secure, and scalable trustless computing cloud. As a member parachain of the Polkadot cross-chain ecosystem, Phala will be able to provide computing power to other blockchain applications while protecting the data layer, enabling possibilities like privacy-protected DeFi trading positions and transaction history, co-computing DID confidential data, developing light-node cross-chain bridges, and more.

**My Impression**: 

Seems kind of like SCRT in that it's used for private blockchain computing. Seems niche but useful.

*How do I feel about this project?* Neutral 😐




---



## *MimbleWimbleCoin* - MWC

**Market Cap**: ~$201 million

**Privacy**: Full - MimbleWimble 

**Transaction Stats**: 1 min block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> MWC is an in-progress implementation of the MimbleWimble protocol. Many characteristics are still undefined but the following constitutes the first set of choices: Clean and minimal implementation, and aiming to stay as such. Follows the Mimblewimble protocol, which provides hidden amounts and scaling advantages. Cuckoo Cycle proof of work in two variants named Cuckaroo (ASIC-resistant) and Cuckatoo (ASIC-targeted). Relatively fast block time: one minute. Fixed block reward over time with a decreasing dilution. Transaction fees are based on the number of Outputs created/destroyed and total transaction size. Smooth curve for difficulty adjustments.

**My Impression**: 

The first MimbleWimble-based coin on the list is, well, MimbleWimbleCoin. It's my least favorite of the three. Half of this coin was pre-mined and distributed to BTC holders that signed up for a few airdrops in 2019 and 2020. The trading volume of this coin is also very low. Overall, this project seems sketchy. There doesn't seem to be anything about this coin that BEAM or GRIN does better on some level. My hunch says this one will fade.

*How do I feel about this project?* Wary 😕

**References**:
- [https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9](https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9)
- [https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/](https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/)
- [https://www.mwc.mw/mimble-wimble-coin-articles/thoughts-on-the-mwc-initial-supply](https://www.mwc.mw/mimble-wimble-coin-articles/thoughts-on-the-mwc-initial-supply)
- [https://www.mwc.mw/mimble-wimble-coin-articles/future-of-privacy-in-mwc](https://www.mwc.mw/mimble-wimble-coin-articles/future-of-privacy-in-mwc)

---



## *Firo* - FIRO

**Market Cap**: ~$92 million

**Privacy**: Full - Lelantus, Dandelion++ 

**Transaction Stats**: 5 min block time **/** ? transactions per second **/** none? fee

**Coin Rundown / Pitch**: 

> Firo (formerly ZCoin) is a digital currency that enables untraceable private transactions, offering users freedom from large financial institutions. The team behind the project believes that privacy is a human right and that people need the option to regain control over their money. Firo uses zero-knowledge proofs in order to maintain anonymity. The technology allows users to prove to their counterparties that they own the Firo coins they are sending without actually revealing the source of the coins. When a coin is minted, it is destroyed soon after. When this occurs, the Zerocoin protocol generates a random serial number and a secret number. These are used in a cryptographic function to generate a value that a user becomes committed to. The value is then posted on the blockchain in order to prevent it from being changed again in the future.

**My Impression**: 

Seems like the privacy-first tech is stronger than Monero. The "burn and mint" strategy is novel and kind of cool. It's a pretty straight-forward coin without a lot of the other bells and whistles of other coins (smart contracts, atomic swaps, etc). A quick fix from the devs against a 51% attack is a good sign that this coin has a future. It's not a terribly exciting project, but it seems strong and I want to see where it goes.

*How do I feel about this project?* Good 🙂

**References**:
- [https://firo.org/guide/privacy-technology-comparison.html](https://firo.org/guide/privacy-technology-comparison.html)
- [https://firo.org/2021/01/28/chainlocks-activated-mainnet.html](https://firo.org/2021/01/28/chainlocks-activated-mainnet.html)
- [https://www.coinbureau.com/review/zcoin-xzc/](https://www.coinbureau.com/review/zcoin-xzc/)

---



## *Beldex* - BDX

**Market Cap**: ~$86 million

**Privacy**: Full - RingCT, CryptoNote 

**Transaction Stats**: ? block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> The Beldex coin (BDX) is one of the very first privacy coins to act as an in-house token. The token is cryptographically designed in such a way, that is can be easily integrated into the Beldex extended ecosystem. It distinguishes itself from other coins by providing better privacy and security. The Beldex coin improves on the features of Monero while introducing its own advancements. Beldex has a default ring size of 10, as opposed to Monero, which strengthens transaction privacy. Thus, the coin offers default privacy. Ring sizes are not immutable and are flexible as users can increase the size as per their requirement. Beldex is the world's first islamic compliant exchange.

**My Impression**: 

An "in-house" privacy token based on an Islamic exchange website? Huh. Easily one of more niche coins in this list. The only use case I can tell is if you really want to use this exchange specifically. Monero already exists, and this is just a slightly modified Monero implementation.

*How do I feel about this project?* Wary 😕




---



## *Bytecoin* - BCN

**Market Cap**: ~$83 million

**Privacy**: Full - CryptoNote 

**Transaction Stats**: ? block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Created in 2012, Bytecoin (BCN) describes itself as a private, decentralized cryptocurrency with an open source code. The main goal of the project is to facilitate fast, anonymous, and untraceable transactions. Bytecoin claims to be the first project to implement CryptoNote technology. Its security reportedly comes from using ring signatures to protect a sender's identity and unlinkable addresses to prevent blockchain analysis. Bytecoin claims to have a block time of 2 minutes and adaptive parameters that are designed to make it easy to mine. Recent additions to Bytecoin technology include Auditable Wallets, which reportedly enables secure, publicly observable deposits, and Blockchain Gateways, a means of connecting Bytecoin's blockchain with other blockchains.

**My Impression**: 

This project looks kind of dead. Last github commit in 2019? That's a yikes. And look at that! 80%+ Premine? Another yikes. Monero looks like it was spun off the tech here and made into a real project. The fact this is so high on this list is, frankly amazing.

*How do I feel about this project?* [Oof](https://www.youtube.com/watch?v=LN0-_fEDLCQ) 😣

**References**:
- [https://old.reddit.com/r/BytecoinBCN/comments/lek4b7/bytecoin_is_not_dead/](https://old.reddit.com/r/BytecoinBCN/comments/lek4b7/bytecoin_is_not_dead/)
- [https://captainaltcoin.com/bytecoin-bcn-price-prediction](https://captainaltcoin.com/bytecoin-bcn-price-prediction)
- [https://old.reddit.com/r/Monero/comments/26we1g/why_monero_and_not_bytecoin/](https://old.reddit.com/r/Monero/comments/26we1g/why_monero_and_not_bytecoin/)

---



## *Beam* - BEAM

**Market Cap**: ~$78 million

**Privacy**: Default - Mimblewimble, LelantusMW 

**Transaction Stats**: 1 min block time **/** 17 [for now](https://beam.mw/faq/how-many-transactions-per-second-does-beam-support) transactions per second **/** ~0.000001 BEAM fee

**Coin Rundown / Pitch**: 

> BEAM is a confidential decentralized finance (DeFi) platform that runs on a combination of two blockchain protocols (LelantusMW and Mimblewimble). Beam allows financial counterparties to make safe, stable and reliable transactions. This helps eliminate the problem of user data mismanagement, keeping the system cleaner and more secure. Beam’s blockchain was built on the C++ programming language from scratch. User addresses are kept confidential at all times and are never disclosed to any third parties. Users have total access and control over their privacy, deciding who can access their information and what they are allowed to see. Beam supports custom transactions of different types, such as escrow, atomic swaps and time-locked ones.

**My Impression**: 

This is my favorite of the three MW coins, and one of the main reasons I wanted to dig into all of the privacy coins. While it is private by default, it has opt-in auditability. The amount of [extra features](https://beam.mw/features) that have been developed and the [roadmap](https://beam.mw/#roadmap) look very good for the future. Devs and the foundation get a 20% cut of the miner rewards for the first five years, which would seem to incentivize them to have BEAM succeed, but I can also see if that would bother some as well. There's a few things nit-picky issues that bother me with it currently, but most of which I think are being addressed or have bandaid solutions currently.

*How do I feel about this project?* Great 😄

**References**:
- [https://beam.mw/faq/how-many-transactions-per-second-does-beam-support](https://beam.mw/faq/how-many-transactions-per-second-does-beam-support)
- [https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9](https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9)
- [https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/](https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/)
- [https://medium.com/beam-mw/about-dandelion-and-mimblewimble-e083597e0355](https://medium.com/beam-mw/about-dandelion-and-mimblewimble-e083597e0355)
- [https://www.coinbureau.com/review/beam-coin/](https://www.coinbureau.com/review/beam-coin/)
- [https://medium.com/beam-mw/beam-the-best-in-privacy-59023593c06](https://medium.com/beam-mw/beam-the-best-in-privacy-59023593c06)
- [https://medium.com/@realsimplecrypto/beam-vs-grin-a-complete-comparison-26bf416598f2](https://medium.com/@realsimplecrypto/beam-vs-grin-a-complete-comparison-26bf416598f2)

---



## *PIVX* - PIVX

**Market Cap**: ~$73 million

**Privacy**: Opt-In - zk-SNARKs(transactions) 

**Transaction Stats**: 1 min block time **/** <=173 TPS Unshielded, <=60 TPS Sheilded transactions per second **/** none? fee

**Coin Rundown / Pitch**: 

> PIVX is a decentralized autonomous organization (DAO) that is self-funded and community-driven. It is a third-generation privacy coin and uses a modified version of Dash’s masternode architecture. It also uses Zcoin’s Zerocoin privacy protocol. Its transaction capacity can reach up to 1000 transactions per second through the usage of the SwiftxX payment protocol. PIVX also uses a proof-of-stake consensus mechanism that involves two parties: the masternodes and the validators. Masternodes are responsible for voting on development proposals that are put forward by the PIVX community and validating the transactions on the blockchain with a single confirmation. 10,000 PIVX is the minimum requirement to run a masternode. Each masternode gets 1 vote and is not involved in the mining of new tokens.

**My Impression**: 

What is ZCash was proof of stake? That's PIVX in a nutshell. One of the highest PoS coins in this list. Stats are pretty great. Decentralized org. Cold Staking. Seems OK for an Opt-In Coin.

*How do I feel about this project?* Good 🙂




---



## *Pirate Chain* - ARRR

**Market Cap**: ~$64 million

**Privacy**: Full - zk-SNARKs, Tor 

**Transaction Stats**: 1 min block time **/** <=34 transactions per second **/** 0.0001 ARRR fee

**Coin Rundown / Pitch**: 

> Pirate Chain harnesses Delayed Proof of Work (dPoW) from Komodo, zero-knowledge proof (zk-SNARKs) transactions from ZCash, and the rule of enforced private-only transactions by Monero. Whereas many other “privacy” coins have optional privacy features, Pirate (ARRR) claims to be a 100% private send cryptocurrency, as well as the first 'z transaction-only' chain. ZK-Snarks technology (zero-knowledge cryptography) is utilized to shield peer to peer transactions. The team claims that this has created the largest shielded private pool of funds of any privacy coin.

**My Impression**: 

What if ZCash only had z-addresses? That's Pirate Chain. If I had ZCash, it'd make me want to convert it to ARRR out of principle. This coin is probably my favorite that uses a zk-SNARKs implementation. With so few coins having privacy features as the default or only way to transact, it's a nice change of pace. The branding might be rough for any kind of mass public adoption, however.

*How do I feel about this project?* Great 😄




---



## *Oxen* - OXEN

**Market Cap**: ~$58 million

**Privacy**: Full - RingCT, CryptoNote 

**Transaction Stats**: 2 min block time **/**  transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> LOKI rebranded to Oxen. Oxen is a privacy-oriented cryptocurrency that joins a long list of other coins that are trying to improve on Bitcoin’s lack of privacy. Oxen is a developer platform for privacy tools. Through the usage of Oxen’s technology stack, developers are able to access proper privacy, security, safety and decentralization. As such, this privacy network allows users to build applications on the Oxen platform which include messaging services, and even online marketplaces or social media platforms that are privacy-oriented. By default, all of them will have a high level of data security and privacy that are fundamentally risked each time a user signs up for a traditional platform.

**My Impression**: 

Based on Monero. Seems like the project is more of a set of developer building blocks for private blockchain-based applications. I like the concept, but hard to say how good the use case is.

*How do I feel about this project?* Neutral 😐

**References**:
- [https://docs.oxen.io/about-the-oxen-blockchain/overview](https://docs.oxen.io/about-the-oxen-blockchain/overview)

---



## *VerusCoin* - VRSC

**Market Cap**: ~$53 million

**Privacy**: Mixed? - zk-SNARKs 

**Transaction Stats**: 1 min block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Verus Coin is a zero-knowledge technology, privacy-oriented project working to offer Public Blockchains as a Service (PBaaS). Verus Coin introduces a new consensus algorithm called Proof of Power, a 50% PoW / 50% PoS algorithm, which aims to solve weaknesses in other PoS systems. The Verus PoP algorithm is reportedly provably immune to 51% hash attacks, making Verus one of the most double-spend resistant public blockchain(s) running. Verus also uses VerusHash 2.0, a quantum-resistant hash algorithm that aims to bridge the performance gap between CPUs, GPUs, and FPGAs. The Verus Coin’s project vision is to enable automatic blockchain provisioning with PBaaS, provisioned by Verus miners, and stakers. Verus claims to be a 100% fairly launched community project, with no-ICO and premine.

**My Impression**: 

I'm not going to pretend I'm smart enough to know weather or not this concept overall is a good idea. I've got mixed feelings here, and mostly I just can't find a good reason to advocate for this coin over others in this list.

*How do I feel about this project?* Neutral 😐




---



## *Grin* - GRIN

**Market Cap**: ~$36 million

**Privacy**: Default - MimbleWimble 

**Transaction Stats**: 1 min block time **/** 25 transactions per second **/**  fee

**Coin Rundown / Pitch**: 

> Grin is a minimalistic, lightweight cryptocurrency, implementing the Mimblewimble protocol for a unique balance of privacy and scalability. The chain has no addresses, no amounts, and no need to store data of spent outputs. Grin is fully open-source and community-driven. There is no single entity behind it, Grin’s development is funded by donations as well as done voluntarily by contributors. Everybody can discuss, influence, or work on its development. Grin’s blocktime is 1 minute, each with a coinbase reward of 60 grins, thus creating 1 unit per second, forever. This linear emission creates a constant increase in supply, but a decreasing rate of inflation; making the emission disinflationary. This simple design serves to ensure both the long term security of the chain and a fair process of coin distribution to all participants.

**My Impression**: 

Grin is my second favorite coin of the three MimbleWimble variants. It's team is more decentralized and community driven instead of a startup like Beam. For better or worse, this coin is infinately minable and has a linear inflation rate. The features and roadmap are less and smaller in scope than BEAM. However, this is still a travesty that this coin ranks below VTC and BCN

*How do I feel about this project?* Good 🙂

**References**:
- [https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9](https://medium.com/grin-mimblewimble/factual-inaccuracies-of-breaking-mimblewimbles-privacy-model-8063371839b9)
- [https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/](https://news.bitcoin.com/researcher-breaks-mimblewimble-deanonymizing-96-of-grin-transactions/)
- [https://www.coinbureau.com/review/grin-coin/](https://www.coinbureau.com/review/grin-coin/)
- [https://medium.com/@realsimplecrypto/beam-vs-grin-a-complete-comparison-26bf416598f2](https://medium.com/@realsimplecrypto/beam-vs-grin-a-complete-comparison-26bf416598f2)

---



## *Super Zero Protocol* - SERO

**Market Cap**: ~$36 million

**Privacy**: Full - Super-ZK 

**Transaction Stats**: undefined block time **/** undefined transactions per second **/** undefined fee

**Coin Rundown / Pitch**: 

> SERO describes itself as a privacy protection platform for Decentralized Applications. It aims to become a next-generation privacy blockchain that supports smart contract and enables the issuance of privacy coins and anonymous assets. SERO platform reportedly allows developers to issue privacy coins and use them in DApps. SERO claims to have built the world's fastest zero-knowledge proof encryption library "Super-ZK" which is reportedly 20+ times faster than the latest zk-SNARKs (Sapling upgrade) that Zcash uses. SERO also claims to be the first privacy coin protocol supporting smart contracts using zero-knowledge proofs.

**My Impression**: 

Like ETH, if the tokens used a quicker zk-SNARKs (Super-ZK) implementation. I can't tell if the coin itself has its transactions protected by Super-ZK, and if it's Opt-In or not. It's also unclear if it requires a trusted setup, which to my knowledge, a zk-SNARK implementation does. Without knowing those details, this coin is a hard pass for me.

*How do I feel about this project?* Unsure / DYOR 😕




---



## *Navcoin* - NAV

**Market Cap**: ~$33 million

**Privacy**: Opt-In - blsCT, Dandelion++ 

**Transaction Stats**: 30 sec block time **/** 1120 transactions per second **/** 0.0001 NAV fee

**Coin Rundown / Pitch**: 

> Navcoin (NAV) is an open-sourced digital currency with privacy-enhanced features. Transactions that occur on the blockchain of Navcoin are made in a peer-to-peer fashion with no need for intermediaries. Following the release of Navcoin Core 6.0, it’s possible to store and transact coins both publicly (NAV) and privately (xNAV). When making a private transaction, it will not be possible to link the transaction to its sender or receiver, or even view the amount that was sent. This is made possible by Navcoin’s self-developed privacy protocol called Boneh-Lynn-Shacham Confidential Transactions (blsCT). Navcoin was invented in 2014 and had no pre-mine or ICO. With block times of 30 seconds, one can stake their coins to earn rewards through Proof of Stake Version 3 (PoSv3) for helping to secure the network. Navcoin’s current spendable supply is 69M NAV with a block reward of 2.5 NAV, hence a decreasing inflation model. From the 2.5 NAV, 2 NAV are redirected to the staker who found the block, and 0.5 NAV are accumulated in a decentralized treasury used to fund community initiatives based on the outcome of DAO votings. Navcoin’s decentralized autonomous organization (DAO) enables the community to be self-funded through its treasury, self-guided through consultations, and self-governed through consensus changes.

**My Impression**: 

At first glance, seeing this coin was from back in 2014 made it look like it was 2018 bags and I was getting ready to talk shit about it. Looking into it, it's a shame this isn't higher on this list. It's got a lot of nice features. It's stakable, self governed, has regular releases, and seems overall solid. Will it break through and have a great future? Maybe, but it's got a long climb. I'm rooting for it.

*How do I feel about this project?* Good 🙂

**References**:
- [https://www.coinbureau.com/review/navcoin-nav/](https://www.coinbureau.com/review/navcoin-nav/)
- [https://old.reddit.com/r/NavCoin/comments/7ktmoz/max_transactions_per_second/](https://old.reddit.com/r/NavCoin/comments/7ktmoz/max_transactions_per_second/)
- [https://medium.com/nav-coin/comparing-xnav-with-other-privacy-enhanced-coins-151b420629ac](https://medium.com/nav-coin/comparing-xnav-with-other-privacy-enhanced-coins-151b420629ac)

---



## *CUTcoin* - CUT

**Market Cap**: ~$25 million

**Privacy**: Full - RingCT, CryptoNote 

**Transaction Stats**: 2 min block time **/** ? transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> CUTcoin describes itself as the first CryptoNote-based pure PoS coin. The CUTcoin uses cryptography to enable anonymous transactions. Its Proof of Stake consensus conceals the total amount of coins in staking wallets. The project is the first to have developed privacy tokens (CNT) on it's chain. The tokens deployed on the Cutcoin chain has all privacy features as native CUT tokens and Monero, including RingCT. The CNT token deployment is made so user-friendly that even person without deep technical knowledge in coding or programming can deploy his / her token just by one single command. CUTcoin has its own dedicated staking pool which is managed by official project team. The Cutcoin staking pool provides an opportunity for all small stakers to earn more CUT (Daily) by staking on the official staking pool.

**My Impression**: 

A relatively new PoS coin. It had a small premine, 2%. Staking and Transactions are private. Good roadmap. Looks good overall, but not amazing. Hope it gets some traction.

*How do I feel about this project?* Good 🙂

**References**:
- [https://cutcoin.org/faqfull](https://cutcoin.org/faqfull)

---



## *Dero* - DERO

**Market Cap**: ~$23 million

**Privacy**: Full - CryptoNote, RingCT, Bulletproofs 

**Transaction Stats**: 27 sec block time **/** 1000 transactions per second **/** ? fee

**Coin Rundown / Pitch**: 

> Dero is the first crypto project to combine a Proof of Work blockchain with a DAG block structure and wholly anonymous transactions. The fully distributed ledger processes transactions with a twelve-second average block time and is secure against majority hashrate attacks. Dero will be the first CryptoNote blockchain to have smart contracts on its native chain without any extra layers or secondary blockchains.

**My Impression**: 

Seems OK. 10% Premine. Nothing amazing jumping out at me, but nothing horribly offensive either. Big shrug here.

*How do I feel about this project?* Neutral 😐

**References**:
- [https://forum.dero.io/t/lower-the-transaction-fee/174](https://forum.dero.io/t/lower-the-transaction-fee/174)

---


## Excluded "Privacy" Coins


### *Litecoin* - LTC

**Why this coin isn't with the other privacy coins?**: 

Wait, why is Litecoin here? Well, there's a MimbleWimble implementation that's coming soon. I don't want to add to the list as it's not fully realized yet. However, leaving it fully out feels like a disservice.

**References**:
- [https://beincrypto.com/litecoin-completes-mimblewimble-code-ltc-scaling-privacy/](https://beincrypto.com/litecoin-completes-mimblewimble-code-ltc-scaling-privacy/)
- [https://decrypt.co/56296/litecoin-is-getting-closer-to-adding-mimblewimbles-privacy-features](https://decrypt.co/56296/litecoin-is-getting-closer-to-adding-mimblewimbles-privacy-features)

---



### *Dash* - DASH

**Why this coin isn't with the other privacy coins?**: 

It seems to be a decent coin with some minimal extra privacy sprinkles. Its PrivateSend feature is just a mediocre CoinJoin implemention.

**References**:
- [https://bitcoinmagazine.com/culture/battle-privacycoins-why-dash-not-really-private](https://bitcoinmagazine.com/culture/battle-privacycoins-why-dash-not-really-private)
- [https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/](https://news.bitcoin.com/not-so-private-99-of-zcash-and-dash-transactions-traceable-says-chainalysis/)
- [https://coinsutra.com/transaction-speeds/](https://coinsutra.com/transaction-speeds/)
- [https://bitinfocharts.com/comparison/dash-transactionfees.html](https://bitinfocharts.com/comparison/dash-transactionfees.html)

---



### *Decred* - DCR

**Why this coin isn't with the other privacy coins?**: 

This coin's public ledger has amounts, senders, and recipients. Staking uses a mixnet. Transactions can optionally use a baked in CoinJoin implementation. 

**References**:
- [https://blog.decred.org/2019/08/28/Iterating-Privacy/](https://blog.decred.org/2019/08/28/Iterating-Privacy/)
- [https://blog.decred.org/2020/06/02/A-More-Private-Way-to-Stake/](https://blog.decred.org/2020/06/02/A-More-Private-Way-to-Stake/)
- [https://medium.com/@blockblogfr/top-6-cryptocurrencies-with-the-highest-median-fees-f0d1662a16aa](https://medium.com/@blockblogfr/top-6-cryptocurrencies-with-the-highest-median-fees-f0d1662a16aa)

---



### *DigiByte* - DGB

**Why this coin isn't with the other privacy coins?**: 

Can't find much in the way of good info on the privacy features in this project. Doesn't seem like a privacy coin, but does use Dandelion++




---



### *Counos X* - CCXX

**Why this coin isn't with the other privacy coins?**: 

Might be a fine psuedo-stablecoin, it's hard to tell. I can't find any mention of privacy tech on their website beyond a very vague poorly worded statement.

**References**:
- [https://cryptocoin.news/press-releases/heres-why-you-should-choose-counos-x-for-your-financial-transfers-46095/](https://cryptocoin.news/press-releases/heres-why-you-should-choose-counos-x-for-your-financial-transfers-46095/)
- [https://www.counos.io/CounosX](https://www.counos.io/CounosX)

---



### *AXEL* - AXEL

**Why this coin isn't with the other privacy coins?**: 

Not quite sure why this was listed as a privacy coin, but ok. It seems like it's just a blockchain on top of a centralized file database?

**References**:
- [https://www.axel.org/](https://www.axel.org/)

---



### *Aeternity* - AE

**Why this coin isn't with the other privacy coins?**: 

Looks like this is not a privacy coin. It just mentions that the data is encrypted when it's being used during computation and transfer?




---



### *Groestlcoin* - GRS

**Why this coin isn't with the other privacy coins?**: 

Doesn't look like a privacy coin. It looks like there's some nodes with TOR and that might be why it was marked.

**References**:
- [https://www.groestlcoin.org/what-is-groestlcoin-backed-by/](https://www.groestlcoin.org/what-is-groestlcoin-backed-by/)

---



### *Apollo Currency* - APL

**Why this coin isn't with the other privacy coins?**: 

This project really feels like it's trying to bend the truth to make it look like a better project than what it is. I wish I could tell you what they use to send their "private" transactions, but I can't find any details. Getting some zombocom vibes. I'd personally avoid it.

**References**:
- [https://aplfintech.com/apollo-currency/](https://aplfintech.com/apollo-currency/)

---



### *Vertcoin* - VTC

**Why this coin isn't with the other privacy coins?**: 

Basically a Litecoin fork. The only mention of a privacy feature is specifically in the wallet with stealth addresses from Coin Market Cap. I don't see any details on the website. It looks like this has been 51% attacked frequently. The only thing remotely interesting is one-click mining, and that's a stretch. This project looks like some bags.




---

## **Closing Thoughts**

So, out of the top ~200 coins, or ~750 coins & tokens:

- Only 31 came up as even being labeled a privacy coin
- Only ~21 seem to actually be privacy coins 
- Only 13 *are not* opt-in.

And a handy tl;dr of my opinion on each ticker:

|Opinion|Ticker|
|:------|---------:|
|Great|XMR, BEAM, ARRR|
|Good|FIRO, PIVX, GRIN, NAV, CUT|
|Neutral|ZEC, ZEN, SCRT, PHA, OXEN, VRSC, DERO|
|Wary|XVG, XHV, MWC, BDX|
|Oof|BCN|
|Unsure|SERO|

This whole deep dive was a lot of information to dig up. I'm sure I've missed details on some of these coins. 

*Remember, as always, do your own research. I'm not an expert. Please correct me with references where I'm wrong. Not financial advice. Thanks for reading!* 