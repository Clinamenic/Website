---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2023-09-25
headDescription: A hedge to better enable a "Code is Law" organizational policy.
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
subtitle: A hedge to better enable a "Code is Law" organizational policy.
tags:
  - misc/bureaumancy
  - personal-discourse
  - text
title: The Failsafe Committee
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: 707bafc0-4074-4ea1-98cd-ce7dd8e16961
---

On-chain organizations have a multitude of techniques available to institute truly community-led governance, without the need for representatives or committees to approve the will of the community.

That said, doing so typically involves relying on a protocol, and relying on the determinism of code without the opportunity for manual intervention brings with it a unique and largely novel risk profile for on-chain organizations. With the will of a community represented by a smart contract, how can an on-chain organization institute community-led governance, while also protecting itself against such risk?

One suggestion is to implement a certain kind of high-level committee which can override the community smart contract, but only in well-defined and collectively agreed-upon situations of perceived emergency. Such a "failsafe committee" can be situated within an organization so as to hedge against some of the risks entailed by totally algorithmic governance, thus providing guardrails to promote the adoption of on-chain community governance methods.

Through a combination of smart contracts and internal policy, this failsafe committee can be instituted as a sort of insurance regarding the risks of algorithmic governance.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## On-Chain Architecture

Below is a draft "blackprint" for an on-chain organization's implementation of a failsafe committee. For additional technical context, see my prior article about [**role-bound multisigs**](https://solosalon.clinamenic.com/2), which make use of the SignerGate contract from Hats Protocol, here represented by the yellow Safe logo.

![](https://storage.googleapis.com/papyrus_images/19815f0d428c49f13264bab8b71b6420.jpg)

In this arrangement, the community (represented on-chain by a DAO contract) effectively serves as the board of directors, and it elects executives, who effectively serve as the C-suite. The community elects individuals to serve executive roles by way of transferring a tokenized role, or Hat, to those individuals' addresses, thus giving them the authority and responsibility associated with those roles.

These executives can handle operations, such as budget appropriations, as signers on the executive committee multisig (bottom). These same individuals also occupy the failsafe committee multisig (top), seeing as both the executive multisig and the failsafe multisig have the same hats (Hat ID N.1.2) as their signers. This means that if someone receives one of these hats, they become a signer on the executive committee multisig as well as the failsafe committee multisig.

That said, the two multisigs have different positions in the on-chain hierarchy, and thus the two committees have different levels of responsibility and authority.

The executive committee heads up operations, by delegating project management responsibility to subordinate multisigs (not shown in the above diagram). Just as the community can elect the individuals on the executive/failsafe committees, the community can also manually elect people to serve on lower committees. Alternatively, the community can also trust the executives to appoint these lower roles.

The failsafe committee multisig has authority over the community. In the parlance of Hats Protocol, the failsafe committee wears the "top hat" of the hat tree. This means that the failsafe committee can intervene in any structural changes made by the community, and can even cut the community out of the organization, by way of transferring the community's hat to a different address, or by toggling the hat off.

The glaring concern, at least in the minds of decentralization advocates, is the potential for such a failsafe committee to exploit their position to seize control from the community. This can be addressed by way of mutual oversight, as embodied by a combination of [**capture-resistant**](https://spengrah.mirror.xyz/f6bZ6cPxJpP-4K_NB7JcjbU0XblJcaf7kVLD75dOYRQ) protocols and internal policies.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## Checks and Balances

While the human potential for self-interested malfeasance is arguably not completely preventable, this potential can certainly be curbed. One way to mitigate this risk, in the case of the failsafe committee, is to systematically limit their powers such that they can only override the community in well-defined scenarios wherein the community is corrupted or the community smart contract is compromised.

In addition to that policy-based limitation of power, which is more of a formal check on the power of the failsafe committee, there can also be instituted a protocol-based system of mutual oversight, which would serve as more of a real check.

The above diagram illustrates an arrangement whereby the community can override the executives in general operational scenarios, in the manner of a board of directors, but the executives (via the failsafe committee multisig) can override the community only in emergency scenarios, as defined by provisions in the organization's operating agreement. This means that the power the executives have over the community, via the failsafe committee multisig, is more tightly constrained than the power the community has over the executives. It also means that the community gets to elect who gets to override it in emergency scenarios, in accordance with the operating agreement.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## Boilerplate Provisions

Below are examples of the sorts of provisions an organization may choose to include in their bylaws or other relevant operating agreements. It should here be noted than I am not a lawyer, nor is this legal advice. Rather, the language below is meant to serve in a purely informational capacity, illustrating the basic logic by which an organization's internal policy can constrain the powers of the failsafe committee:

> ## ARTICLE X - THE FAILSAFE AND EXECUTIVE COMMITTEES
>
> ### SECTION X.1 - Committee Duality
>
> _The Failsafe Committee and Executive Committee shall each have their own distinct designated multisig contract address, but both multisig contracts will be occupied by the same set of signers. Appointments, replacements, removals, or any other actions taken to adjust the set of signers on these multisigs will be made by the DAO, according to the process(es) defined in SECTION X.8 (Actions Taken to Adjust Committee Rosters or Parameters) of this Operating Agreement. Such actions can only be taken by the Failsafe Committee in situations described in SECTION X.10 (Grounds for the Failsafe Committee to Override Actions Taken by the DAO) of this Operating Agreement_.
>
> ### SECTION X.2 - Failsafe Committee Purpose
>
> _The purpose of the Failsafe Committee is to ensure the operational and legal integrity of the Organization by overriding the DAO in, and only in, situations of perceived danger, illegality, or other forms of emergency as defined in SECTION X.10 (Grounds for the Failsafe Committee to Override Actions Taken by the DAO) of this Operating Agreement_
>
> _Such actions of override will be taken by the Failsafe Committee through the multisig contract address designated in SECTION X.3 (Designated Failsafe Committee Multisig Contract Address) of this Operating Agreement, and not through any other vehicle._
>
> ### SECTION X.3 - Designated Failsafe Committee Multisig Contract Address
>
> [Multisig contract address, and optionally its resolved ENS domain/subdomain.]
>
> ### SECTION X.4 - Failsafe Committee Parameters
>
> The Failsafe Committee multisig shall have 7 signers, with a super majority of 6/7 signatures required to take action.
>
> ### SECTION X.5 - Executive Committee Purpose
>
> _The purpose of the Executive Committee is to serve as the operational leaders of the Organization, subject to oversight by the DAO. The Executive Committee will have power to create and manage subordinate divisions and committees, appropriate funds to such committees, and administer operations in general, according to, and without conflicting with, the provisions in this Operating Agreement._
>
> _Such operational actions will be taken by the Executive Committee through the multisig contract address designated in SECTION X.6 (Designated Executive Committee Multisig Contract Address) of this Operating Agreement, and not through any other vehicle._
>
> ### SECTION X.6 - Designated Executive Committee Multisig Contract Address
>
> [Multisig contract address, and optionally its resolved ENS domain/subdomain.]
>
> ### SECTION X.7 - Executive Committee Parameters
>
> The Executive Committee multisig shall have 7 signers, with a simple majority of 4/7 signatures required to take action.
>
> ### SECTION X.8 - Actions Taken to Adjust Committee Rosters or Parameters
>
> _The DAO may take actions to adjust the roster of the Executive and Failsafe Committees, or to adjust any associated permissions or parameters, including but not limited to multisig quorum and spending permissions, whenever it sees fit, according to the DAO governance processes detailed in the Operating Agreement_
>
> [NOTE: These "governance processes" would be detailed in a separate article of the Operating Agreement, having to do with voting platforms, voting methods, voting quorum, etc.]
>
> [NOTE: The Organization may wish to have term limits, or to institute certain assurances against the DAO arbitrarily removing executives without substantial grounds.]
>
> ### SECTION X.9 - Grounds for the DAO to Override Actions Taken by the Executive Committee
>
> _The DAO may override the actions of the Executive Committee on any grounds, provided that the proposal to do so reaches sufficient quorum and surpasses sufficient majority, as specified in this Operating Agreement_ [detailed in a different article of this Operating Agreement]_. Such override may be further vetoed by the Failsafe Committee only in situations detailed in SECTION X.8 (Grounds for the Failsafe Committee to Override Actions Taken by the DAO) of this Operating Agreement._
>
> ### SECTION X.10 - Grounds for the Failsafe Committee to Override Actions Taken by the DAO
>
> _The Failsafe Committee may only override actions taken by the DAO in situations where the majority of the Failsafe Committee, as detailed in SECTION X.4 (Failsafe Committee Parameters), perceive, in their opinion, significant legal, operational, financial, or other risk which would reasonably be expected to be entailed by the pending action of the DAO._
