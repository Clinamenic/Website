---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2023-12-10
headDescription: Using smart contracts to design organizations and facilitate governance processes.
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
subtitle: Using smart contracts to design organizations and facilitate governance processes.
tags:
  - personal-discourse
  - misc/bureaumancy
  - text
title: What Are Onchain Organizations?
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: 89cc2fdf-006b-456c-8349-dd9f8209d102
---

Smart contracts have brought about a paradigm shift in organizational design. These algorithms, which operate on peer-to-peer financial databases like blockchains, can be used to facilitate a variety of administrative processes, and can enable large groups of stakeholders to govern themselves within a transparent framework which, if well designed, can be virtually impossible for any one entity to capture.

This piece will explain the key innovations of onchain organization design, highlight a few of the most versatile smart contracts available for such design, and illustrate an example of combining these smart contracts to facilitate organizational processes, all with the intention of being accessible to readers who are new to blockchain technology. What follows is not to be considered financial or legal advice, but is intended purely for informational purposes.

## Why Onchain Organizations?

This technology can be complicated. The terminology is dense and quickly evolving, the best practices are still nascent, and the means of interacting with these tools are not always that accessible. Is the cognitive burden entailed by all this worthwhile? What value does this technology add, to warrant the steep learning curve?

Much of this technology, namely smart contracts, reevaluates principles of governance and social enterprise so fundamental to human affairs that they may not, at first, seem tangible or even recognizable. How can groups of people collectively make decisions, while minimizing the opportunity for corrupt or extractive intermediaries to exploit trusted positions of central authority? Is it possible for an economy, at scale, to operate in a transparent and peer-to-peer digital framework which is open for everyone to participate in? These are among the questions this technology is being engineered in light of.

Philosophy and political science aside, what is the value add of this technology, from an operational perspective? Payments can be made instantaneously with negligible transaction fees, shared accounts can be created quickly and inexpensively to send and receive payments and to jointly interact with smart contracts, and community/stakeholder oversight can be practiced transparently due to the public and open-source nature of this technology. The term "onchain" refers to anything that resides on a blockchain, be it a user-controlled account or a smart contract.

What does it mean to "interact with smart contracts"? Here, we will walk through a few examples of smart contracts which can be viewed as open-source "building blocks" for organizations, and which constitute the very infrastructure in which these organizations are embedded.

## Shared Accounts

Anyone can freely create an account, through which they can operate in the digital economic framework, or the onchain economy, described here. Normally these accounts are for individuals, but there can also be shared accounts, similar to a shared bank account but without the need to get permission from a bank or similar institution.

While a normal account requires the individual user to provide a _signature_ to take actions, in order to send payments or to take other onchain actions, these shared accounts require _multiple signatures,_ from multiple of the users attached to it. This is why these shared accounts are known as multi-signature accounts, or, more colloquially, multisigs.

A multisig is, itself, a smart contract. Smart contracts are like accounts in that they both have public addresses which uniquely identify them, similar to how email addresses work. Your email address is unique to you, and represents you within the email system. In fact, email addresses are to Simple Mail Transfer Protocol, what these account addresses are to blockchain. However, while email addresses only exchange information in the form of data, blockchain accounts can exchange currency, assets and unique digital objects in the form of data.

One difference between these systems, which helps explain why email is much more widely adopted than blockchain, is that the former has been around long enough for highly accessible user interfaces to be developed by software companies, while the latter is still at an earlier and less accessible phase of development.

Putting aside the question of user accessibility, multisigs are an integral component of the onchain economy. They can be configured in a number of ways, specifying which individual accounts are to be listed as signers, as well as the percentage of signers required to approve and execute a transaction.

For example, a multsig can be created to include Alice, Bob and Cate, each of whom have their own unique individual address. None of them need institutional approval to create either their individual account or their shared multisig.

![](https://storage.googleapis.com/papyrus_images/3b229b15a21d6a5cdc8fa4ca2e191805.png)

Their individual accounts are similar to their shared multisig account, in that both have unique addresses (those long clunky codes of numbers and letters), both can send and receive assets, and both can interact with other smart contracts. That's right: the multisig is a smart contract which can interact with other smart contracts. It is an algorithm which can act upon, and be acted upon by, other algorithms. In this case, the multisig is a smart contract primarily being interacted with by Alice, Bob, and Cate.

What do these smart contract interactions look like? Smart contracts can have certain capabilities, called functions, which are triggered when certain users, or certain other smart contracts, take certain actions on them.

When Alice calls the "Execute" function on the multisig, to execute a transaction that has 2/3 signatures, it is as if she is pressing a button that only she, Bob, and Cate can press, because they are the three accounts which have access to this multisig. In doing so, Alice will pay a transaction fee, similar to if she were just making a normal transaction. In both cases, she is changing the state of the underlying ledger; she is making a change to the public database which all other accounts are using and making changes to. The record of Alice executing this multisig transaction is public, but will display only has her account (represented by her unique address) calling a certain function on this particular multisig (represented by its unique address).

In the diagram below, the individual accounts of Alice, Bob, and Cate are shown as having signer access to the multisig. In order for them to jointly take action through the multisig, whether that action is making a payment or interacting with another smart contract, the following process needs to unfold:

1. **One signer "submits" an action.** This means Alice, Bob, or Cate can initiate a transaction, by specifying the recipient address and the asset(s) being transferred. This action can also take the form of a smart contract interaction, in which case the address of the smart contract will need to be specified, as well as which function is to be called (i.e. which button is to be pressed) on that smart contract.
2. **The specified threshold of signatures need to be reached.** This is determined as the multisig is configured, and can be adjusted at any point. If there are three signers, the signature requirement can be 1/3, 2/3, or 3/3.
3. **One signer "executes" the action.** Any of the signers can execute an approved action, and doing do involves a transaction fee (transaction fees are native to the underlying infrastructure, but that topic is beyond the scope of this article).

![](https://storage.googleapis.com/papyrus_images/f7474157407f6319f59ebd1173bea9c4.png)

In the above diagrams, the accounts are shown only as containing funds, but they can contain arbitrary assets, such as digital collectibles, "badges" which grant access to content or which enable holders to interact with certain smart contracts, or any other sort of digital object which can be represented onchain. The sheer diversity of potential onchain objects, from certifications to complex financial instruments, is a topic deserving of its own article.

The industry standard for multisig accounts is [**Safe**](https://safe.global/), a particular brand of multisig. So widely adopted is the Safe multisig that the term "Safe" has become a popular [**eponym**](https://en.wikipedia.org/wiki/Eponym) for multisig accounts themselves, even though there can be other versions or standards of multisig accounts.

At this point, before we dive deeper into what can be built with multisigs, as organizational design components, it is worth remembering that multisigs (or at least the well-engineered ones like Safes) themselves cannot be taken down or blocked by third parties such as private institutions or governments. Alice, Bob, and Cate can have their accounts hacked (if someone obtains the private key which is needed to cryptographically facilitate their individual "signatures") or they can have their accounts seized by governments (if the government compels them to disclose their private key), but the multisig itself, being a smart contract, will exist for as long as its underlying digital infrastructure.

There are extenuating exceptions to this, such as network forks and smart contract vulnerabilities, but those are beyond the scope of this article. For our purposes, it is enough to convey that multisigs, like other smart contracts, are open-source and practically permanent. Signers may remove themselves, or be removed, from a multisig, but that multisig itself will still exist and will still technically be able to receive assets.

## Governance Frameworks

Governance is a, if not the, key process of onchain organizations. Who is included in the decision-making process, and for which decisions? Where is the line drawn between constitutional decisions which need to be ratified by entire stakeholder bodies, and operational decisions which need to be made by nimbler teams of experts or executives? When push comes to shove, who actually has what powers? In the interest of practicality, we will reserve the political and philosophical dimensions of these questions for another time, and approach them instead from a more operational perspective.

Many onchain organizations actually use smart contracts for some or all of their governance processes. While you can use "off-chain" voting to make some decisions, like using thumbs-up emojis to vote in text channels, implementing governance processes onchain brings with it certain benefits and certain risks.

The benefits include the potential for structural decentralization and censorship-resistance. Stakeholders can rest assured that proposals which are passed in a fully onchain manner _will_ be executed, whereas with off-chain proposals, there is always the risk that some executive figure, usually a multisig signer, will circumvent or ignore the popular opinion.

The risks of onchain governance include the difficulty, or even impossibility, of intervening in situations of bugs or unforeseen technical circumstances. There is also the risk of an unscrupulous stakeholder making a dangerous or illegal proposal, and gaming the system to force that proposal through. That said, there are onchain methods, such as the [**failsafe committee**](https://solosalon.clinamenic.com/3)**,** to enable manual emergency intervention to prevent such malicious acts.

If onchain governance is of interest to your organization, two of the leading industry standards are the [**Moloch framework**](https://daohaus.club/moloch) and the [**Governor framework**](https://docs.tally.xyz/user-guides/deploying-governor-daos/deploy-a-governor), both of which are smart contracts which facilitate voting, proposals, and member onboarding.

How can a smart contract facilitate such a broad range of bureaucratic processes, and why would you want to use a smart contract for doing so? Governance frameworks like Moloch and Governor facilitate these processes by determining which user accounts have permission to submit and vote on proposals, and this enables a transparent environment wherein stakeholders can rely on a well-defined governance process. In other words, by configuring which users can press which buttons on the governance smart contract, an internal system of governance can be established. By existing and operating onchain, an organization can, like individual accounts and multisigs, interact with the wider system of smart contracts.

That is, a large group of users can jointly and directly take action _en masse_, without the necessity of trustees or representatives. It should be emphasized that, while governance can be engineered in this dis-intermediated fashion, such is not always advisable from an operational perspective. That said, the very possibility of such governance models, which again operate on open-source peer-to-peer economic frameworks, enables community-driven and cooperative agency to arguably unprecedented extents.

One key example of how these governance frameworks, which are themselves smart contracts, can interact with other smart contracts, is how they integrate with multisigs. Both Moloch and Governor contracts can "plug in" to a multisig, and in doing so allow large numbers of users, who have voting power, collectively approve and execute payments or other smart contract interactions.

To take a step back before taking a step forward, perhaps a recap is in order. Users have individual accounts, through which they can send and receive payments and interact with smart contracts. One example of a smart contract is a multisig, which can be used for _multiple users_ to collectively send and receive payments and to interact with smart contracts. Another example of a smart contract is a governance framework, which can facilitate stakeholder proposals and votes and executions, and which can be used for _many users_ to collectively send and receive payments and to interact with smart contracts.

Now that multisigs and governance frameworks have been covered, we can look at a third example of a multisig, having to do with "onchain roles" and their management.

## Role Management

While multisigs and governance frameworks allow groups of users to collectively take action onchain, such an arrangement often isn't sufficient when it comes to nuanced business operations, especially at scale. With governance frameworks, members are often treated as homogenous in terms of their access levels and their permissions within the organization. How can onchain organizations identify specific roles and assign specific members to those roles, in the interest of delegation and specialization?

One solution which has emerged to address this problem is onchain role management, pioneered largely by Hats Protocol. This protocol enables individual accounts, multisigs, or organizations to create an dynamic hierarchy of roles and positions, each of which can be deeply customized and transferred between users. The idea is that someone holding a certain position, such as a social media manager, wears a certain "hat" in an organization, insofar as they have specific responsibilities and authorities within that organization. With Hats Protocol, these positions can be represented by onchain objects, called hats, which function similarly to keycards or clearance passes, insofar as they can grant the holder certain responsibilities and authorities.

It is worth remembering, here, that the holder (or "wearer") of a hat can be an individual account, a multisig with a few signers, _an entire organization_, or even other kinds of smart contracts. This dynamic, of human users being identified by the same unique addresses as smart contracts, is what enables onchain organizations to operate in novel fashions. Not only can group decisions be made in more transparent processes, but some processes can be automated altogether, such as [**payment streaming**](https://sablier.com/) and [**payment division**](https://splits.org/).

With Hats Protocol, a hierarchy of roles can be created, called a hat tree, and this hierarchy uses terminology and logic similar to those of a family tree. The wearer of a hat can create "child" hats, and those child hats can themselves create child hats, thus entailing a dynamic hierarchy of administration wherein "parent" hats can manage child hats, and each hat can have its own particular set of responsibilities and authorities.

For example, one hat can be configured to give the wearer signer access to a multisig, whereas another hat can give the wearer permission to submit proposals in the organization's governance framework. This first example, of a hats-integrated multisig, is one of the more versatile examples of combining smart contracts. Normally multisigs have regular individual accounts attached as signers, but with hats-integrated multisigs, that signer position becomes abstracted into a role, a hat which can be transferred from one user to another.

Yes, depending on how the organization has configured its internal governance processes, these hats can be transferred from one user to another, or they can have their settings adjusted, or they can be revoked. If an onchain organization wants to enable a community of stakeholders to [**elect signers to their multisig treasury**](https://solosalon.clinamenic.com/2), they can use Hats Protocol.

To take a step back, hats are assets that are held by individual accounts, or smart contracts (because they can both hold assets), and which can be programmed to grant the holder certain levels access or authority. They are called "hats" as a nod to the colloquialism of a person "wearing a hat" by operating in a certain role or position. To create and manage hats, you create a new "hat tree" which starts with a single parent hat, below which you can create a large number of child hats, allowing you to engineer an intricate system of roles. As such, Hats Protocol is a very interesting example of a smart contract which can be used as a building block for onchain organizations.

## Organizational Building Blocks

To take another step back, to the metaphor of building blocks, hopefully it is becoming evident how smart contracts can be used as modular, customizable components for onchain organizations, and how this technology, by virtue of operating on open-source peer-to-peer infrastructure, can revolutionize the field of organization design, and perhaps even democracy itself.

But instead of waxing on about democracy, let us instead return to an operational perspective of onchain organization design. What would some of the aforementioned processes look like, in concrete terms?

Let us say there is an onchain organization, which uses a Moloch framework for facilitating votes among stakeholders, and which has a multisig for its executive committee. In this arrangement, the stakeholder body effectively constitutes the board of directors, because the organization itself (represented by a "higher" multisig which is linked to the governance framework) wears the top hat. Lower in the hierarchy sits the executive committee multisig, and each executive wears a particular hat which grants them access to the executive multisig.

Below is a diagram illustrating the process whereby a community or stakeholder group may directly reappoint an executive or representative figure. This process is an example of what can be done, with a fully configured onchain organization.

![](https://storage.googleapis.com/papyrus_images/3bd1844c488b0333a1e8b0ae616338ae.jpg)

In the above diagram, the big round logos are multisigs, where the white one has a Moloch framework attached to it, and the yellow one is connected to hats, such that a given set of hats enable their wearers to be signers on the yellow multisig. Individual users are represented by the small circular silhouette logos. This yellow multisig is here understood as an executive committee, or core team, whereas the white one is understood as the total set of voting members.

It may be worthwhile to go over the above diagram one more time, before getting started on the guide for how to create such an organization. Individuals have agency onchain, in that they can send and receive payments and interact with smart contracts, all through their individual account, which is identified by a unique code. Smart contracts are open-source algorithms which run in the same environment as these individual user accounts, and they can be programmed to hold assets, issue assets, or take other actions, based on which of their "buttons" are pressed by users. Certain smart contracts, called multisigs, can facilitate shared accounts, wherein multiple users need to agree on the action they take through this shared account. Once they agree, one of the users can press the "Execute" button. Multisigs are the industry standard for organizational treasuries onchain. Some multisigs can actually _not_ have individual user accounts as signers, but _other smart contracts_. In the case of the multisig attached to the Moloch framework in the diagram above, the Moloch governance contract can be the sole signer of its associated multisig, thus effectively rendering that multisig a shared account for everyone who has voting power in that governance framework, i.e. the sixteen users displayed at the far left.

All of this is intended to demonstrate how smart contracts can be combined in useful ways to facilitate sophisticated and transparent governance models, some of which present profound implications for how humans do business and do politics.

[**_Clinamenic LLC_**](https://www.clinamenic.com/) _is available for hourly consultations and service retainers regarding onchain governance and operations._
