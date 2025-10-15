---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2023-08-08
headDescription: No longer must multisigs be statically assigned to wallet addresses.
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
subtitle: No longer must multisigs be statically assigned to wallet addresses.
tags:
  - misc/bureaumancy
  - personal-discourse
  - text
title: Role-Bound Multisigs
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: 26f1afd1-3d34-47db-be11-c68707fa13e4
---

The multisig wallet is a powerful organizational primitive, enabling individuals to share control over funds and assets, and to collectively execute smart contract interactions. They can be created quickly and inexpensively, and they facilitate international financial cooperation.

While this tool has been around for a few years, allowing individual wallet addresses to operate as signers, what is new is the ability to abstract this signer role into a token which can be transferred from one wallet address to another, thus transferring signatory status from one person to another. One tool which enables this is SignerGate, which is currently being developed by the team at Hats Protocol.

When considered in the context of a single, isolated multisig, this new capability may not seem to be much more useful than the default "account-bound" setting. After all, static signers can still propose to add or remove signers to the multisig, so why incur the complexity of interacting with an additional smart contract?

As usual, the answer depends on one's situation. If the multisig is only being used by a few people in a small organization with no membership body or auxiliary departments, then perhaps the simplicity of the default "account-bound" multisig makes it the better choice. If, however, the multisig in question is part of a larger organizational structure, or is subject to oversight from a higher committee or group of shareholders, then the composability of a role-bound multisig starts to take on more importance.

Before exploring said composability, first I will highlight the fundamental innovation of role-bound multisigs.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## Account-Bound Multisigs vs. Role-Bound Multisigs

Where normal account-bound multisigs have their signer slots assigned to wallet addresses, role-bound multisigs have their signer slots assigned to tokens, tokens which represent roles and which can be transferred between wallet addresses.

Below is a diagram illustrating the difference between an account-bound multisig and a role-bound multisig, in terms of how each would go about replacing a signer.

![](https://storage.googleapis.com/papyrus_images/ddd4eab05ed05f473da7fcd60345a7ea.png)

The SignerGate contract, developed by the team behind Hats Protocol, allows an admin (entity wearing the top hat\* of a given hat tree) to transfer multisig signatory status, from one wallet address to another (step 1). Once this transfer has occurred, the newly appointed user will need to accept the signer role (step 2) by calling a certain function on the SignerGate contract. See the resources section at the end of this article for links to relevant documentation.

In isolation, the difference between these methods may not bring much utility, and in fact the standard account-bound multisig may be more straightforward to operate, all else being equal. That said, the benefits of the role-bound multisig begin to emerge as the organization in question develops a more complex and hierarchical system of permissions and authority.

For example, imagine there is a multisig for a project management team, and they have a certain budget given to them from the organizations primary treasury multisig. Just using account-bound multisigs, the primary treasury team would not be able to actively oversee operations of the project management team, and would not be able to intervene if something goes wrong. Whereas, if the project management multisig were a role-bound multisig, and if the primary treasury multisig had admin over transferring signer hats, then the treasury team would be able to dynamically appoint and reappoint signers on the project management multisig.

Another example, and perhaps the most exciting one, is the prospect of giving a DAO, or some other tokenholder community, admin control over a given role-bound multisig, thus allowing the community to collectively elect who has signer status for their treasury. Operationally speaking, this can be done in a number of ways, such as giving the top hat\* of the organization's hat tree to a [Moloch DAO contract](https://daohaus.club/moloch), or even running a contest on [**jokerace**](https://jokerace.xyz/) to nominate and elect hat wearers.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## Takeaways

Whether to use a regular account-bound multisig or a role-bound multisig depends on the context in which the multisig will be used. If it will be used in relative isolation, such as for a small core team to co-manage funds, the simplicity of the account-bound multisig makes it a preferable option for less technical users. However, if the multisig in question will be nested in a larger hierarchical system of oversight and management, the role-bound multisig enables a whole field of sophisticated possibilities.

![](https://storage.googleapis.com/papyrus_images/bbc973dfa09ae9298bad54736744cf74.png)

## Footnotes & Resources

\*The term "Top Hat" refers to the master admin hat in a given hat tree. The top hat can create, modify and transfer "child hats" which represent different roles in an organization, and these child hats can create, modify, and transfer child hats of their own. For more information, see the Hats Protocol documentation listed below.

- [**Guide for integrating Hats Protocol with a Safe multisig**](https://docs.hatsprotocol.xyz/hats-integrations/hat-gated-authorities/safe-multisig-signing-authority) (using the SignerGate contract)
- [**Hats Protocol web app**](https://app.hatsprotocol.xyz/)
- [**Hats Protocol documentation**](https://docs.hatsprotocol.xyz/)
- [**Zodiac wiki**](https://zodiac.wiki/index.php/ZODIAC.WIKI) (SignerGate is a "Zodiac Module" for multisigs)
