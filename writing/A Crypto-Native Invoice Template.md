---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2024-03-05
headDescription: Early thoughts on best practices for crypto-native invoicing, and an invoice template.
headIcon:
keywords:
language: en
license: CC BY-SA 4.0
ogSiteName: Clinamenic LLC
ogType: website
publish: true
quartzSearch: true
quartzShowArchive: true
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowExplorer: true
quartzShowFlex: true
quartzShowGraph: true
quartzShowSubtitle: true
quartzShowTOC: true
quartzShowTitle: true
subtitle: Early thoughts on best practices for crypto-native invoicing, and an invoice template.
tags:
  - personal-discourse
  - text
title: A Crypto-Native Invoice Template
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: e836933a-e99c-4c6a-abf3-9a03fe90f47c
---

Given how early the onchain economy is, compensation arrangements are often ambiguous and disordered, whether they involve DAO contributors or freelance service-providers. Despite the transparency of the underlying technology, allowing anyone to track payments between entities, personal and enterprise accounting practices remain largely undefined. This article will cover some basic practices for invoicing in the onchain economy, using both traditional invoice templates, as well as using smart contracts to facilitate invoices.

_The following does not constitute financial, legal, or accounting advice, but is intended purely for informational purposes. It is worth bearing in mind that, at the time this piece was written, the best practices around crypto-native accounting are still emerging._

## The Frontier of Accounting

Across the first few waves of DAOs and onchain communities, the matter of compensating contributors has often been vague and handled in an ad hoc fashion, given the absence of a clear regulatory environment and the "permissionless" nature of the emergent underlying technology. As a result, the manner in which contributors and core team members are paid is often poorly accounted for. While the transactions themselves are public, contextual information around these transactions is often lacking, even in terms of private record-keeping.

In addition to this, many DAOs and similar onchain organizations have operated without a legal entity, which can complicate the compensation and reporting processes. For example, if a DAO does not have a legal entity, it may not be able to issue the appropriate tax forms for contractors it engages with. Thus, a DAO contributor who receives a payment from the DAO treasury, in the manner of an contractor, may need to go about reporting that income in lieu of traditional client-contractor reporting practices.

While using an invoice to document this transaction may not solve some of these reporting issues, it does help both parties account for their business activities, and provide a basis for future auditing. Another practice which contractors may wish to adopt is the usage of [**dedicated accounts for client engagements**](https://solosalon.clinamenic.com/1), as distinct from accounts used for personal or other non-business purposes.

## A Crypto-Native Invoice Template

Paying for services in crypto is often the default for DAOs and onchain organizations which lack a legal entity, because without a legal entity it can be difficult, if not virtually impossible, for said organization to set up a bank account and go about payments in fiat currency. While some crypto-native commerce is borne of this necessity, some organizations and individuals may elect to pay or be paid in crypto, even if fiat is an option. In both cases, a crypto-native invoice template can be useful.

The primary distinction between a fiat invoice and a crypto invoice is the information about the payment type and account type. Where a traditional invoice may specify the account and routing number of the service provider's bank account, a crypto invoice would need to specify pertinent information about the service provider's crypto account. Here, I suggest some information fields a service provider may want to include in their invoice, if they want to be paid in cryptoassets.

- **Network**: [e.g. Ethereum Mainnet]
  - Note: It may also make sense to specify parameters like ChainID, depending on which blockchain is being used. This matter may be explored further in a later version of this template.
- **Payee Account Type**: [e.g. an externally owned account, or a smart contract]
- **Payee Account Address**: [e.g. 0xeAa47a3563a91B4016eF8C8e9504Aa3CB0A764C7]
- **Payee Account ENS**: [e.g. bureaumancy.eth]
  - Note: This field may introduce unnecessary redundancy or even the potential for conflicting information. It might be best to leave this field out, and wait for some invoicing tool which can automatically resolve ENS domains for addresses entered into the payee field. In the template provided, this field is left out
- **Accepted Assets**: [e.g. the following:]
  - USDC (Contract: 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48)
  - DAI (Contract: 0x6B175474E89094C44Da98b954EedeAC495271d0F)

These five fields, in addition to the rest of the fields contained in a traditional invoice, should provide sufficient information to prevent payment ambiguity and enable proper accounting measures. Below is a screenshot of an example invoice containing the above fields.

![](https://storage.googleapis.com/papyrus_images/a627a0e45c474a297ccd88fd3c01f138.png)

This template is watermarked and licensed (CC BY NC 4.0) purely for promotional purposes. Anyone can access this template and manually copy the formatting structure, or, if the original [**Google document**](https://docs.google.com/document/d/16d3HOZlcwqmbfLLv17J3I87nX7lFu0hUFHX__j8ACdQ/edit) remains accessible, simply copy the document itself and remove the watermark. The licensing details pertain more to individuals who wish to share/promote this template for their own professional endeavors, but hey, I'm not a very litigious person.

### Documents

- Crypto-Native Invoice Template
  - Version: 1
    - [**Google Document**](https://docs.google.com/document/d/16d3HOZlcwqmbfLLv17J3I87nX7lFu0hUFHX__j8ACdQ/edit) (for comments/feedback)
    - [**Rich Text Document on IPFS**](https://pinata.clinamenic.com/ipfs/Qme7MkJ2mdGhjMfEJdg6oAs5qXitCB2rDeBifdBUfSLF4k) (No watermark or license info)

## The State of Onchain Invoicing

While the above template regards using standard invoicing practices, only with cryptoassets instead of fiat currency, the advent of onchain invoicing is yet another interesting prospect. Projects like [**SmartInvoice**](https://smartinvoice.xyz/) and [**Bulla Network**](https://www.bulla.network/) are actively exploring these prospects, and there also remain opportunities for regulators to implement onchain compliance and reporting mechanisms. There also remains an opportunity for regulators and/or practitioners to decide upon standards for onchain invoicing, but that too is better left for a dedicated article.

---

_Clinamenic LLC is a solo consultancy and service provider. The above content is intended as a public good, freely accessible for informational purposes. If you wish to support Clinamenic LLC, please consider collecting an edition of this post._

_If you seek consultation or other services from Clinamenic LLC, please feel free to_ [**_browse available services_**](https://www.clinamenic.com/) _and reach out to_ [**_ssc@clinamenic.com_**](mailto:ssc@clinamenic.com) _with your inquiries._
