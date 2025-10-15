---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI:
date: 2023-03-26
headDescription:
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
quartzShowTitle: true
quartzShowTOC: true
subtitle:
tags:
  - personal-discourse
  - text
title: Slayer Cake, A Layered Membership Structure for DAOs
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: a017e199-2054-48ef-a637-568e69348c8c
---

Despite frigid market conditions, the DAO space remains a robust laboratory for organizational design.

These innovative and experimental membership structures are enabled by modular tools and protocols which unlock new capabilities for on-chain organizations. From zero-knowledge identity verification, to tokenized roles, to non-transferable credentials, DAOs have a growing toolbox at their disposal as they engineer their ideal organizational framework.

In what follows, I introduce the "Slayer Cake" model for layered membership in DAOs, and highlight the active experiments of three DAOs as they relate to such layered membership structures: PubDAO, Lobby3 and JournoDAO. It should be noted that the structures outlined below are highly liable to change.

'Slayer' here is just a nod to the [running theme of Moloch](https://www.youtube.com/watch?v=51soGxJMzZ0) throughout the DAO space.

Before getting started, I would like to thank the teams at [Holonym](https://holonym.io/), [Guild.xyz](https://guild.xyz/explorer), [Unlock](https://unlock-protocol.com/), [Hats Protocol](https://www.hatsprotocol.xyz/), and [Badger](https://www.trybadger.com/) for their instrumental products and platforms.

_Disclaimer: The author is a core contributor for PubDAO, Lobby3 and JournoDAO, and has helped Holonym with some community management._

## The Case for a Layered Membership Structure

Ultimately, I'm of the notion that it is still too early to identify most of the best practices for DAOs to sustainably endure market cycles. That said, a nascent case can be made for a heterogenous membership structure for DAOs, involving multiple membership tokens which each confer a particular access level governance power. Specifically, here we will be exploring the case for layered membership structures, in which such access levels and governance powers can be measured according to a hierarchy of tokens.

If you want a membership token with secure governance dynamics, some tokenholder verification or other "positive friction" may be justified, at some expense of inclusivity. If you want a maximally inclusive membership token, such inclusivity may come at the cost of operational security and contributor quality. Separating the various responsibilities and privileges of your membership body into various tokenholder groups may be a viable solution for, _ahem_, having your cake and eating it too.

The Slayer Cake model for DAOs is a mosaic and combinatorial approach to membership, involving a multitude of tokens which each have particular acquisition criteria and each endow particular access levels.

## PubDAO

[PubDAO](https://www.pubdao.space/) is a collective of web3-native content creators, founded by the team at Decrypt. We are hoping to move PubDAO in the direction of a nonprofit "industry DAO" along the lines of a business association or chamber of commerce. The goal is to enfranchise and coordinate between the various stakeholders of the web3 publishing and content creation industries.

After around a year of operating in a pre-DAO status and experimenting with various organizational layouts and business models, we have finally started iterating on our membership structure.

The first iteration of our membership structure includes a foundational "Community Token" which is fairly inclusive in its distribution. This Community Token is non-transferable, confers no financial benefit, and does not necessarily indicate that PubDAO has staked its reputation on any given holder.

While all of this is liable to change rapidly, right now the only requirements to receiving this Community Token is to complete the onboarding path in our [Discord server](https://discord.gg/E2C5ydMam5), which just consists of sharing your content portfolio, being added to our [Directory](https://docs.google.com/spreadsheets/d/1qOZjPuowKbUTPDSsWuH9n1pPExwbd8XYxzORyJddd3k/edit?usp=sharing), and connecting your wallet via the Guild.xyz bot.

Beyond this base Community Token, we will continue to introduce various tokenized certificates into our [Certificate Index](https://docs.google.com/spreadsheets/d/1XC8FdCuhVIMZoJG1voaj2lT9CBbmCtIqhaq3yWslgZA/edit?usp=sharing), such as certificates for attending workshops or completing courses. These certificates enable us to establish an on-chain reputation system, in the interest of PubDAO becoming a hub for content creators to find work and collaborate on publications like [Automatos](https://mirror.xyz/0x4Ef22A7356D96dbf95a7FdEaD4a196A668e75B38).

For the sake of illustration, I've included a hypothetical token, the Featured Writer Token, which would indicate that the holder has been published on some official PubDAO publication.

Below is a diagram illustrating this membership structure, using some hypothetical tokens as examples. In this diagram, and those which follow, each stack of tokens represents a unique wallet owner.

![](https://images.mirror-media.xyz/publication-images/l_Rj9pQZhTwzOiF5c9fcU.png)

The logic is as follows:

- You need to complete basic onboarding to receive the draft Community Token.
- You need the Community Token to receive certain in-house tokens such as the Featured Writer token.
- If the certificates are issued outside of PubDAO, such as the [Content Guild](https://contentguild.xyz/Join-Now) role badges, then the Community Token is not a prerequisite to receive them.

This way, access to the Community Token, the base token of our membership structure, is inclusive and open to early-career content creators, while factors such as talent, experience, and contribution levels can be measured by additional tokens which would effectively constitute sub-DAOs.

For example, any user with a writing portfolio can receive the Community Token, but the writers who additionally possess certificates and featured writer tokens may be seen as having a greater on-chain credibility or presence.

## Lobby3

[Lobby3](https://www.lobby3.org/) is an advocacy organization at the intersection of civic engagement and DAO technology, looking to support the Decentralized Civics (DeCiv) space with grants, and lobby on behalf of civically and socially impactful applications of this technology. We are also at the early stages of developing [DeVox](https://www.lobby3.org/devox), an advocacy protocol.

The original DAO was launched just over a year ago, with a mission which has, at its core, remained constant. The original token was transferable, and the token mint did not involve any verification of tokenholders. This arrangement was beneficial in terms of treasury fundraising, in that it attracted speculative demand, but it was detrimental in that it opened the door for integral governance vulnerabilities, such as plutocratic takeovers and non-commital tokenholders.

The transferability of the original token was an attractor for speculators, and the lack of verification meant that we couldn't know who among the tokenholders were U.S. residents, which is an important piece of information as far as lobbying regulation goes.

While the original DAO, henceforth known as the Lobby3 Legacy DAO, continues to oversee disbursements from its community treasury, the core team has been learning from these lessons and rebuilding the DAO as an Unincorporated Nonprofit Association in Wyoming.

This second version of the DAO will involve a non-transferable membership token, and will make use of Holo as a proof of uniqueness and as a proof of nationality, all without requiring the member to actually disclose that information (unless certain matters of compliance dictate otherwise in certain situations).

Another deep lesson we learned from the original DAO, is that a community needs a practice around which they can rally and bond. The original DAO harbored some important discussion and ideation, but ultimately lacked concrete avenues for members to get involved, resulting in an arrangement where only the highly ambiguity-tolerant self-starters among the community were positioned to rise up. In the new DAO, we seek to have this central practice more well-defined before actively inviting in new members.

Below is a diagram illustrating this membership structure.

![](https://images.mirror-media.xyz/publication-images/cJuJtkXVkzlzyrdZDmkvy.png)

The logic is as follows:

- In order to receive the Lobby3 Membership Token, you need to complete Holo's proof of uniqueness, and agree to the Lobby3 Association Agreement.
- You need the Holo proof of U.S. residency in order to participate in certain nationality-sensitive operations, but this proof is not necessary to become a member.

In this respect, the Lobby3 Membership Token is more restrictive in is distribution than the PubDAO Community Token, even though both may remain free across iterations.

## JournoDAO

[JournoDAO](https://journodao.xyz/) is a tight-knit professional network of journalists and journalism enthusiasts, unified in their belief that web3 can impact journalistic practices, and the media landscape at large, for the better.

Also conceived around a year ago, JournoDAO is similarly fresh out of its pre-DAO stage, with the launch of the first iteration of its Voter Token. Unlike PubDAO and Lobby3, which both make use of Badger to deploy their current membership tokens, JournoDAO uses Unlock.

Another similarity is that JournoDAO's Voter Token is free and relatively accessible, open to those in the wider JournoDAO community cortex, regardless of whether they are journalists or not. The initial use of this Voter Token is to approve applicants for our directory of journalists, based on the information contained in the application.

Those who are approved to join this directory would be given an additional token, which here will be referred to as the Directory Badge. Unlike the Voter Token, the Directory Badge will indicate that JournoDAO is, to some extent, staking its reputation on any given holder. Because of this, a greater level of consideration is warranted in determining who receives the Directory Badge.

The idea is here simple: if we let just anyone onto the directory, JournoDAO wouldn't be able to stake its reputation on such a group, in the manner of a professional network. But if we only handpicked those who made it onto the directory, a certain gatekeeper bias may prevail at the expense of a diverse and balanced array of perspectives reflected in the directory. Our solution here is to introduce a mediating layer, the community layer, which serves to further decentralize the gatekeeping process.

Beyond the directory, and seeing as JournoDAO's main value add to the web3 ecosystem has been [thought leadership](https://www.cryptosapiens.xyz/e/taking-a-decentralized-approach-to-journalism/) at the intersection of web3 and journalism, we plan to experiment with a consultancy service built atop the Voter Token and Directory Badge. For the sake of illustration here, this consultant position will be represented by a third tier of token, the Consultancy Badge.

Below is a diagram illustrating this membership structure.

![](https://images.mirror-media.xyz/publication-images/i3ZVKwdwuCUx3eqeuufGA.png)

The logic is as follows:

- To get the Directory Badge, you don't need to already have the Voter Token, but upon approval for the former you will be given the latter, should you accept it.
- You do not need the Directory Badge in order to qualify for the Consultancy Badge, meaning that non-journalist members of the JournoDAO community may participate in certain consulting services.

## Member Experience

Now that we've gone over three basic architectures for layered membership, we can think about how these architectures can be navigated by the user: the member being onboarded.

In all three of these cases, Discord + Guild.xyz is involved, so the onboarding process would require the user to join the Discord server and connect their wallet using the Guild.xyz bot. This basic step enables all the token-based access levels, because the user's Discord account is being associated with the wallet(s) they connect to Guild.xyz.

But why rely so heavily on Discord? In short, because it makes this stage quite easy. Once tokens are distributed, the organization, and the user's role(s) within that organization, exists on-chain with greater autonomy and can operate in more of a platform-agnostic fashion. That said, from the user perspective, it is often easier to have the organization's activities based on a single platform, so as to minimize the fatigue entailed by the constant "tooling churn" we all experience.

And while the user now has their membership represented on-chain in a platform-agnostic arrangement, the question remains about transferability and revocability. Setting the membership tokens to non-transferable helps maintain standards of membership and prevent speculation from corrupting governance integrity.

That said, binding this token to the soul of the user also carries with it some undesirable edge cases. What if the user no longer wants to be associated with that organization? One solution is to make the token revocable by administrators, but then that opens the possibility of unilateral revocation without proper grounds. So long as such administrator authority is well defined and accepted by the community, this is arguably the optimal path.

These questions will inspire solutions which breed further questions - but ultimately one may find that ruminating too much on these edge cases results in a fatiguing stagnation. One is arguably better off just beginning the iterative process and learning in a safe testing environment, perhaps even communicating to members that the first iterations of the membership structure are drafts and non-binding.

## DAOs Are Like Onions

A layered membership structure is a promising option for DAOs of many shapes, sizes, and levels of legal complexity. This approach may also be conducive to the practice of [departmental sovereignty](https://mirror.xyz/0x4Ef22A7356D96dbf95a7FdEaD4a196A668e75B38/58IFNhSUmneWrH8Cr_zg5U09U2muI2FxQ-HtuCCv9Fw), whereby guilds or other organizational subdivisions may exercise some degree of operational independence and perhaps even make use of their own departmental badge or on-chain credential.

The tools explored above make it trivially easy and inexpensive to experiment here, in case any readers wish to try building such membership structures. That said, the layered membership structures explored above involve issuing separate tokens as representations of roles, certifications, or other classifiers. Such classifiers could also conceivably be represented by metadata parameters within a single token contract, resulting in a composable membership token - but that seems like fodder for a different essay.
