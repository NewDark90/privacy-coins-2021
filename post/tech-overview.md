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

