---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI: https://arweave.net/adMJyqREd1b7sFF_EWbcUWGN54A84doFU-fFEB-gX1Q
date: 2025-02-11
draftStart: 0024-06-28
headDescription:
headIcon:
keywords:
language: en
license: CC BY-NC-SA 4.0
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
sponsor: LexDAO, SuperBenefitDAO
subtitle: An analysis of the innovations and challenges of the onchain philanthropy sector.
tags:
  - personal-discourse
  - text
title: Survey on Methodology for Onchain Ecosystem Funding and Impact Assessment
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: report
uuid: 98b0c624-84a8-4a8c-8c1b-ee9b2451aeb9
---
## Acknowledgments

This report was researched and written by Spencer Saar Cavanaugh of [Clinamenic LLC](https://www.clinamenic.com/). Support for this research was provided by [LexDAO](https://lexdao.org/) and [SuperBenefitDAO](https://superbenefit.org/).

I would like to thank the following individuals for their feedback and support: Kyle Smith of LexClinic; rathermercurial, Michelle Baldwin, and Heenal Rajani of SuperBenefitDAO; Holke Brammer and bitbeckers of Hypercerts; Mahesh Murthy of Karma; Natalie J. Crüe; Monty Merlin of ReFi DAO; Eugene Leventhal of MetaGov; Mashal Waqar of Octant; LauNaMu of Optimism; Mike Natanzon of Abundance Protocol.

---

## Abstract

The onchain impact economy, which utilizes open-source blockchain infrastructure to evaluate and fund public goods, has occasioned various methodological breakthroughs which innovate upon aspects of the traditional philanthropic sector. This emerging parallel economy has also encountered various challenges familiar to the traditional philanthropy sector, and runs the risk of incurring similar systemic inefficiencies and misallocations. Various open-source protocols exist, or are actively being developed, to: administer onchain grant programs; configure and issue onchain certificates of impact; publish claims and attestations to build onchain trust networks; and retroactively fund public goods via automated and transparent parafiscal systems. These mechanisms are developed as distinct protocols, but with the intention of inter-operating as multi-functional open-source assemblages for evaluating and funding impact. While the infrastructure is being engineered to technologically enable more robust evaluation and funding practices, the actual assessment methodology is also being refined to minimize burdensome procedure and ensure equitable funding arrangements. That is, the _what_ and the _how_ are being developed in parallel, and this development ought to draw from the successes and failures of traditional philanthropy where applicable, in what could optimistically be considered an inter-paradigm dialogue. This report is a holistic survey of existing practices and challenges, intended to inform our ecosystem's efforts at coordinating a satisfactory paradigm.

---

## Section 1 - Orientation

The ecosystem under consideration, referred to as the onchain impact economy, is multi-faceted, interdisciplinary, and rapidly evolving in lockstep with breakthroughs in its underlying technological infrastructure. Due to the promising potential of this technology to improve human coordination at scale, there is an unusual degree of solidarity across this industry, which spans from the simple alignment of values to the more ideological forms of utopianism.

The effects this potential has on the culture of this industry, including the more philanthropic sector in question, can be beneficial or detrimental, in terms of the actual impact this technology makes. A beneficial aspect of this alignment is that it promotes a communitarian spirit of collaboration across organizational lines, with projects openly promoting each other's donation portals and grant applications, to drive interest in and funding for their respective areas of impact<sup>1</sup>. A detrimental aspect of this technologically-oriented alignment is the collective propensity to fixate on the engineering-related dimensions of these challenges without adequate feedback from non-technical beneficiaries and stakeholders. This design vacuum tends to create a technological environment which is only accessible to people who are already actively involved, and, moreover, who are able to keep up with the bleeding edge.

For the purposes of this discourse, which is intended for curious newcomers to this industry as well as its more seasoned practitioners, it may help to clearly define some of the more important terms at play, and introduce some of the novel concepts and technologies. It is in this spirit of sensemaking that following introductory section is provided.

### 1.1 - Nomenclature and Semantic Considerations

Because the matters at hand are complex enough without the added confusion of semantic ambiguity, some effort here is made to disambiguate the meaning of the integral terms of this discourse. The following is not necessarily presented as prescriptive, but rather merely as an indication of how these terms are interpreted for our purposes in this survey. If this clarity isn't needed, the reader may wish to skip past the nomenclature section.

#### 'Impact' and 'Outcome'

These terms are meant in the sense articulated by the [Impact Management Norms](https://impactfrontiers.org/norms/), developed by Impact Frontiers:

> Impact is a change in an outcome caused by an organization. An impact can be positive or negative, intended or unintended.
>
> An outcome is the level of well-being experienced by a group of people, or the condition of the natural environment, as a result of an event or action.
>
> Impact management is the process of identifying the positive and negative impacts that an enterprise has on people and the planet, and then reducing the negative and increasing the positive.

#### 'Public Goods' and 'Network Goods'

The term '[public good](<https://en.wikipedia.org/wiki/Public_good_(economics)>)' is meant in its conventional economic sense, referring to a good which is non-rivalrous (meaning it is virtually inexhaustible, i.e. people do not need to compete for it) and non-excludable (meaning it cannot be gatekept or otherwise enclosed according to private interests). Examples of public goods can include physical infrastructure, knowledge, and open-source software, depending on how these things are specifically configured.

One can understand public goods within the fourfold model of goods, composed of the axes of rivalrousness and excludability, as shown below:

|                   | Excludable                                          | Non-Excludable                                           |
| ----------------- | --------------------------------------------------- | -------------------------------------------------------- |
| **Rivalrous**     | _Private Goods_<br>(food, clothing, parking spaces) | _Common Goods_<br>(fish, timber)                         |
| **Non-Rivalrous** | _Club Goods_<br>(cinemas, private parks)            | _Public Goods_<br>(clean air, national defense, privacy) |

The term 'network good' refers to any good which experiences an increase in value as its adoption or usage levels increase, such as how the value of the telephone grew as the number of people using telephones grew.

While this network dynamic generally seems non-rivalrous in nature, i.e. it is difficult to conceive of network private goods or network common goods in the sense provided above, one can conceive of how this may apply to non-rivalrous goods. For example, certain open-source software can constitute a public network good insofar as it promotes interoperability and diminishes technical friction as its usage levels increase. An example of a club network good would be membership in a professional society, wherein the value of membership is simultaneously enabled by its exclusion of non-lucrative acquaintances, and expanded by its increasing inclusion of lucrative acquaintances.

#### 'Platforms' and 'Protocols'

One key distinction at play in these considerations is that between a platform and a protocol. While this distinction deserves a more rigorous treatment than what is provided here, what follows should be sufficient for our purposes.

Platforms, such as Gmail, are usually apps intended for users to engage with, which may or may not incorporate open-source software or open protocols, and which are usually managed as a product by some central company. Protocols, such as Simple Mail Transfer Protocol (SMTP), exist as communication standards for computer networking, enabling different ways for end users to interact through these networks.

Most of the time, users engage with these protocols through platforms, i.e. the platform creates a user-friendly environment for people to leverage the underlying capabilities of the protocols. Gmail creates a relatively simple and accessible way for people to use SMTP without requiring them to be a programmer. Broadly speaking, if not for these platforms, only highly technical individuals would be able to use the internet.

A key aspect of the nascent coordination paradigm under consideration is the potential to couch the actual mechanisms of coordination within the protocol layer, rather then restricting them to the platform level, which usually involves centralized administration by companies with profit-maximizing imperatives which are not always incentivized to maintain digital public infrastructure as such. Much of this can be understood in terms of capture-resistant technology (Graham, 2022).

This engineering constraint is intended to distinguish digital public goods from digital private goods, because while they each need sustainable funding, the manners by which each can be viably funded are different. If we are to build digital public infrastructure using this technology, there is a strong argument to be made that, at the protocol level, the solutions themselves need to be distributed and resistant to capture.

#### 'Digital Public Infrastructure'

The term 'digital public infrastructure' is meant here to refer to the complex of digital public goods comprising the digital public sphere. Here, again, a more rigorous definition is deserved than what is provided, but for our purposes is it sufficient to frame it as such.

It is also worthwhile to draw attention to a certain analogy between digital public infrastructure and physical public infrastructure, namely manners in which they are systemically funded. It is argued that market dynamics, i.e. private enterprise, lack the economic incentive structures to fund and maintain public infrastructure, seeing as public goods, by virtue of being non-excludable, rule out many of the standard monetization models, such as subscriptions. If subscriptions are ruled out, alternative monetization models need to be established, such as the monetization of user data.

The major conventional alternative to private funding is, of source, public funding, but seeing as much of the digital public infrastructure under consideration seeks to operate with greater autonomy and plurality than what government subsidization would likely permit, we are faced with a significant challenge regarding sustainable funding, at scale, for digital public infrastructure. These challenges, and potential solutions, will be covered in the later sections of this survey.

#### 'Onchain'

The term 'onchain' refers to any activity on a blockchain, similar to how the term 'online' refers to any activity on the internet. The particulars capacities in which this technology enters into the complex of digital public infrastructure will be covered in the section on selected onchain infrastructure. For now, it will suffice to introduce the following technology as viable infrastructure for peer-to-peer settlement and computation.

### 1.2 - Selected Onchain Infrastructure

In this section we will highlight how certain blockchain-based protocols and platforms can factor into the complex of digital public infrastructure.

Worth bearing in mind throughout this section is the distinction between solutions based on peer-to-peer protocols, and solutions based on institutionally maintained platforms. While both classes of technical tooling have their place in the larger stack, they each come with their own risk profile.

Much of the potential of this technology, as digital public infrastructure, rests on the premise that the software itself is functionally autonomous and not reliant on the revenue models of the institutions that developed it. While institutions, public and private, have crucial roles to play in these socio-economic systems, they also have their own economic and legal imperatives which may preclude them from effectively stewarding public goods. After all, the institutional tooling will not de-enshittify the institutional paradigm<sup>2</sup>.

#### Hypercerts

[Hypercerts](https://hypercerts.org/docs/) are onchain certificates designed to facilitate the assessment and funding of public goods. Someone working on a public good can mint a hypercert, specify the work they are doing, and sell a number of these hypercerts to funders who want to support public goods. This last step can also be understood as issuing a donation receipt to funders of public goods.

Like other protocols in the blockchain public goods space, hypercerts were designed with the intention of supporting an ecosystem. That is, they are configured to be interoperable within a network of developers, funders and beneficiaries revolving around public goods, all of whom having their own information to share and seek. People building public goods need to convey the work they are doing and the impact it is having, in order to receive funding. People funding public goods want to see evidence of the impactful work being done, in order to feel confident that their donations are being effectively allocated.

#### Ethereum Attestation Service

[Ethereum Attestation Service](https://docs.attest.org/docs/purpose/eas-purpose) (EAS) is a general-purpose protocol for storing and indexing information onchain. Users can create and publish attestations as particular statements of information, and these statements can be integrated with smart contracts to trigger desired onchain outcomes. Not only can individuals publish information using attestations, they can also create attestation schemas to for other users to publish information.

Using attestations, individuals can make claims and reference the claims of others. In our case, we will be exploring how attestations can be used to qualitatively and quantitatively evaluate the impact and outcomes of public goods in the field of legal engineering. EAS, like Hypercerts, is itself a public good insofar as it is freely accessible and open-source. In this sense, protocols such as these collectively constitute digital public infrastructure, and can be used to systematically promote and support philanthropic and commercial work alike.

#### Allo Protocol and Grants Stack

[Allo Protocol](https://docs.allo.gitcoin.co/) is a framework for constructing custom funding allocation processes. Specifically this framework enables the configuration of certain processes, such as how funds are collected into a pool, how recipients are approved, and how funds are disbursed.

One example of an implementation of Allo Protocol is [Grants Stack](https://www.gitcoin.co/grants-stack), which can be described as an off-the-shelf customizable grant-making program. An institution or community can operate a grant program using Grants Stack, which allows them to pool funds, field and approve grantee applications, determine the precise allocation of the funding pool to the grantees, and disburse this funding. This entire process unfolds publicly onchain, according to the underlying mechanisms of Allo Protocol<sup>3</sup>. Further implementation nuances of Grants Stack will be explored in a later section.

#### Grantee Accountability Protocol

[Grantee Accountability Protocol](https://docs.gap.karmahq.xyz/) (GAP) is an onchain protocol and application built using EAS, specifically geared around accountability, impact reporting and philanthropic transparency. Grantees or other beneficiaries of public goods funding use GAP to publish statements around the outcomes they intend to have through their work. Upon completion of work, they share their work along with proof, all of which are recorded on chain.

The goal behind this arrangement of attestations is to facilitate insight into and expectations around the work being done by beneficiaries of philanthropic funding. In this respect, GAP can be understood along the lines of existing reporting requirements for nonprofits<sup>4</sup>, albeit in a more granular peer-to-peer fashion.

While GAP provides specialized infrastructure for onchain impact reporting and assessment, there remains work to be done in the area of standardization and ontology. This matter will be explored in a later section of this inquiry.

#### Additional Examples

In addition to the various platforms and protocols highlighted above, there are various other examples of onchain infrastructure. These smart contracts can be understood as components for designing onchain organizations (Cavanaugh, 2023). The following examples, as those provided above, qualify as public goods insofar as they are free and inexhaustible, but that does not necessarily extend

[0xSplits](https://docs.splits.org/) and [Drips](https://docs.drips.network/) are smart contracts which can facilitate targeted fund distribution, with incoming funds divided among recipients according to a specified breakdown.

[Hats Protocol](https://www.hatsprotocol.xyz/) is a distributed role and permissions management protocol, which lends itself to centralized and decentralized oversight of organizational hierarchy.

[Ethereum Name Service](https://ens.domains/) (ENS) is an Ethereum-based domain registry and protocol, allowing users to resolve human-readable domain names to their account addresses.

[Safe](https://docs.safe.global/home/what-is-safe) multi-signature or "multisig" accounts are shared accounts which allow users to exercise joint custody of assets, without needing institutional approval. These shared accounts presently constitute the industry standard for treasury management for onchain organizations.

### 1.3 - Selected Funding Processes

The fundamental innovation of the onchain philanthropy sector is the usage of smart contracts to facilitate the financial and computational elements of philanthropy. Arguably the primary purpose of the usage of this technology in these capacities is to uphold high standards of financial transparency while automating unnecessary administrative burden.

Ideals aside, the utilization of blockchain and related technologies for philanthropic purposes, such as funding public goods, is still a radically novel economic phenomenon, constituting a movement in its own right. Over the last several years, this experimental infrastructure has enabled several novel funding mechanisms, which will be examined throughout this section. This infrastructure has facilitated the distribution of over $150 million dollars in public goods funding over the last few years. For more information on the financial scale and nuance of this technology, see the Appendix on Grant Volume.

However, as we will see in the section on challenges, there remain significant obstacles which these experiments face as they attempt to scale.

#### Direct and Quadratic Funding

The most popular examples of philanthropic applications of smart contracts are grant programs. Many of these grant programs implement participatory grant allocation mechanisms, based on quadratic formulae, which aim to proportionately reward grantees according to the amount of donations they receive (Buterin, Hitzig, & Weyl, 2018).

For the purpose of this section, we will focus on Grants Stack, as digital public infrastructure to facilitate grantmaking, and Gitcoin's [grant manager platform](https://manager.gitcoin.co/#/) as an interface to enable communities and institutions to configure their instance of Grants Stack. Those who operationally administer these grant programs (henceforth "round operators") can choose either direct or quadratic funding mechanisms<sup>5</sup>, depending on how participatory they want the grant program to be.

Both direct and quadratic grant rounds involve a matching pool funding process, whereby administrators deposit funds into the smart contract to eventually be disbursed to grantees, and a grantee application process, whereby applicants submit forms to be approved by the round operators. Once approved, the accepted grantees have their project profiles published, and the funding can be facilitated.

In the case of quadratic funding, there is a customizable period of time, conventionally two to three week, whereby anyone can visit the grantees' profiles, and donate to them in crypto or in fiat currencies<sup>6</sup>. During this donation period, various data are collected automatically, such as the amount of donations, the value of each donation, and various other analytics performed upon donor activity. One significant aspect of this analysis pertains to the identification and prevention of fraudulent donor behavior, which will be examined more closely in the section on technical challenges.

Once these results are calculated, the funds from the matching pool are disbursed to grantees according to a quadratic formula such as the following:

$$F^p = (∑_j \sqrt{c_j^p})^2$$

Direct funding, on the other hand, merely has round operators directly determine the amount each grantee receives from the matching pool.

Allo Protocol uses smart contracts to programmatically facilitate both direct and quadratic funding rounds, meaning that the essential mechanisms of this grantmaking process occur onchain, and that the public data involved is stored on a global peer-to-peer network which is not managed by a single institution. Instead, institutions such as Gitcoin maintain dedicated user interfaces, like the Gitcoin round manager interface, for people to interact with the underlying smart contracts. In this case, the users in question are grant round operators, grant applicants, and donors.

#### Retroactive Funding

Whereas the above quadratic and direct grants, as facilitated by the likes of Allo Protocol, are prospective in nature in that they generally fund work which is yet to be done, there also exists a class of funding processes concerned with retroactively funding work which has been completed.

This idea that "it is easier to agree on what was useful than what will be useful" has guided the prominent examples of retroactive funding programs in this ecosystem so far, such as Optimism's Retroactive Public Goods Funding program, or RetroPGF (Optimism Collective, 2023b). In the case of RetroPGF, applications are reviewed by members of the Optimism Collective, and funding is provided by institutional donors (wheebill, 2024). For more information about the economic volume of the RetroPGF rounds, see the appendix on grant volume.

#### Ecosystem Development Funding

One of the primary difficulties encountered in the allocation of funding to public goods is that of sustainable value exchange. With respect to the source of funding, this funding process ought to be sustainable if it is to support the long term development and maintenance of public goods from an ecosystem perspective.

That said, by virtue of public goods being non-rivalrous and non-excludable, it is often difficult to configure a financial model which permits a return on investment. Indeed, depending on how strictly we define public goods, it may even be impossible to conceive of a public good which can entail exclusive rights to profit. Are exclusive rights to profit needed in order to promote sustainable funding for public goods at scale, and would it necessarily compromise the essential value of public goods? This question of value exchange and profitability has been discussed extensively in the ecosystem.

Ecosystem development funding arguably constitutes an example of this sort of compromise. In these arrangements, grants are awarded to projects which expand or enrich the ecosystem stewarded by the grantor institution. In cases like this, the projects receiving funding can still qualify as public goods, even if the constraints of ecosystem development limit the effective beneficiary base of the value created. The ecosystem in question can be anything from a particular domain of impact, to the user base of a particular software product.

For example, if a software company receives a grant from a protocol foundation to incorporate a certain protocol into the company's software, that grant constraint itself does not necessarily preclude the software from being non-rivalrous and non-excludable. While the devil is ultimately in the details, some voices in the ecosystem rightfully point out how, in stressing the pedantic criteria of public goods, we risk losing the forest for the trees, and should instead focus on funding work that creates value for a given community<sup>7</sup>.

Recently a report was published suggesting a formula for grantor institutions to systematically determine the ecosystem alignment of a potential grantee (Waqar, M. 2024). This report includes a number of heuristic formulae and models which ecosystem development grantmaking institutions can utilize to quantitatively evaluate the prospects and efficacy of their grants. One example is the strategic alignment score (SAS) determined by the formula below, which represents the degree of alignment between grantees and the strategic ecosystem goals determined by the grantor. $$SAS = \frac{\sum^G_{g=1}((\frac{1}{N}\sum^N_{i=1}A_{g,i}) \cdot W_g)}{\sum^G_{g=1}W_g}$$
Where $A_{g,i}$ is the alignment score (on a scale of 1 to 5) of project $i$ for a given strategic ecosystem goal $g$; $W_g$ is the weight of a given goal $g$; $N$ is the number of projects; and $G$ is the number of goals. Given a grant program with a number of grantees, and a number of measurable goals, this formula determines the average alignment of projects for each goal, weights these averages according to the weight of each goal, adds these goal-weights average alignment scores, and then divides by the sum of the goal weights, yielding a value which represents how impactful the grant program was in light of its strategic goals

### 1.4 - Ontological Considerations

While the onchain impact and philanthropy ecosystems have seen great advancements in terms of technical infrastructure, the actual methodologies and ontologies surrounding impact reporting and assessment still need refinement (Leventhal et al., 2024). While there have been promising conversations emerging within the onchain philanthropy sector around outcome-based and milestone-based impact reporting, we still have much to learn from existing standards and practices beyond the sphere of blockchain technology. In this section, we will explore some examples of ontological frameworks for impact assessment.

#### LinkedClaims and Verifiable Credentials

[LinkedTrust](https://linkedtrust.us/#about) is a system for facilitating impact claims, called LinkedClaims, via verifiable credentials which can be independently and openly verified by third parties. These LinkedClaims constitute an open knowledge graph representing the web of claims which derive social legitimacy from their relations to other claims and entities in the network.

LinkedClaims builds upon the [W3C Verifiable Credentials envelope data model](https://www.w3.org/TR/vc-data-model-2.0/), and is intended to facilitate compound credentials (wherein a number of constituent credentials are verified en masse) as well as micro-credentials (wherein a given block of credentials can be granularly verified).

The W3C Verifiable Credential model uses JSON-LDs as the base format for credentials. Below is an example of a university degree expressed as a JSON-LD according to the W3C Verifiable Credential model.

```
{
  "@context": [
    "https://www.w3.org/ns/credentials/v2",
    "https://www.w3.org/ns/credentials/examples/v2"
  ],
  "id": "http://university.example/credentials/3732",
  "type": ["VerifiableCredential", "ExampleDegreeCredential"],
  "issuer": "https://university.example/issuers/565049",
  "validFrom": "2010-01-01T00:00:00Z",
  "credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "degree": {
      "type": "ExampleBachelorDegree",
      "name": "Bachelor of Science and Arts"
    }
  }
}
```

LinkedClaims build upon this basic format by introducing a few other ontlogical standards, including but not limited to the ability to reference other VC JSON-LDs, the ability to reference particular sections of other VC JSON-LDs (i.e. in order to facilitate micro-credential verification), the ability to form cryptographic associations between these VCs, and the inclusion of various human-readable properties pertaining to the nature of the assertion or claim at hand.

#### Common Impact Data Standard

The [Common Impact Data Standard](https://www.commonapproach.org/common-impact-data-standard/) (CIDS), as designed by Common Approach, is a standardized framework for organizations to represent their impact models and outcomes. CIDS uses the [W3C Web Ontology Language](https://www.w3.org/OWL/) (OWL) to semantically articulate the various parameters and values of organizational impact, based on [JSON-LD](https://en.wikipedia.org/wiki/JSON-LD) exchange.

In other words, the common impact data standard is a data formatting method for communicating impact-related information in a manner readable by humans and machines. This standard is designed to be adopted by impact reporting software, such as KarmaGAP's platform, and it already has [a number of such platforms](https://www.youtube.com/playlist?list=PLjaTMP-2h_lLAzoYRUjnh7-hOwZvmNdGu) using it.

This standard can also be considered infrastructure-agnostic, meaning it can work within and across a number of storage layers, seeing as relies on widely adopted ontologies. For example, if an organization is to express its impact measurements in a JSON-LD, this information can be stored using EAS, Arweave, or offchain data layers, and it can still function within this paradigm of open and transparent impact reporting.

Below is visual representation of a CIDS schema for an organization, building upon the [TOVE Organization Ontology](http://ontology.eil.utoronto.ca/organization.html). This schema demonstrates how organizations can use OWL to define ontologies expressed via RDF and serialized as JSON-LDs to communicate critical impact-related information to their wider network of beneficiaries and stakeholders.

![Organizational Schema](https://arweave.net/k3KUumHmxV-k-SSmYJw_krHTqruHCOVxlPMo0Td9EGA)

---

## Section 2 - Challenges

Having provided some fundamental context to orient our inquiry, we will now advance to address the various challenges faced by the communities and institutions implementing this technology in philanthropic capacities. These challenges are not presented as comprehensive in nature, but are intended to broadly span the technical, operational, and financial dimensions of the ecosystems in question. Additionally, while many of the following challenges specifically pertain to onchain philanthropy, the scope of this survey is ultimately broader than blockchain-based solutions.

### 2.1 - Technical Challenges

Many of the challenges under consideration in this section are directly or indirectly owing to the highly technical and esoteric nature of the underlying infrastructure. This technical complexity often presents a participation barrier insofar as it requires users to have some basic prerequisite understanding of the technology, in order to use it. Technical nomenclature abounds and proliferates in correspondence with rapid technical innovation, resulting in a steepening learning curve for developers and users alike.

#### User Experience and Accessibility

Because many of the solutions under consideration involve early-stage technologies which are rapidly evolving, our collective understanding of them is constantly in flux. At the forefront of innovation, the collective sensemaking and dialogues naturally tend to be limited to specialists, and additional efforts need to be made to communicate learnings and discoveries across a knowledge gap, to the general public.

One symptom of this early stage of development is the state of user interfaces, and of user experience (UX) more broadly. As a manifestation of the aforementioned knowledge gap, these early-stage user interfaces often assume a degree of technical familiarity on behalf of the user, a degree of familiarity which cannot reasonably be expected from the general public.

While the existence and widening of this knowledge gap can indicate technical progress and industry maturation, such progress is certainly not without its limiting factors. The realization of the potential of a technology, at scale, tends to require a UX which accommodates the technical literacy of its target users.

One can view this through the lens of UX development, streamlining the UX to accommodate the existing average user literacy, or one can view this process through the lens of user education, bringing the average user literacy closer to the existing UX. The former is more along the lines of product-market fit, developing a product to suit the needs of an established addressable market, while the latter is more along the lines of market-product fit, cultivating a market to suit the capabilities of a novel product.

In actuality, with emerging technology, we tend to see a combination of the two. However, it is worth remembering that while even the combination of UX development and user education can help bridge this gap, the gap itself tends to widen as the technology undergoes innovation. Such innovation tends to entail the state of the art advancing deeper into specialized territories of knowledge. That said, sometimes breakthroughs are made which fundamentally simplify a technology, or at least the discourse around a technology.

This is all to contextualize one of the more glaring challenges facing the onchain philanthropy sector in particular, namely that the apps in this industry tend to have a UX which is too complex for many would-be users, thus setting a firm ceiling on the scalability of the underlying infrastructure.

#### Sybil Resistance

Some of the above technologies and methods incentivize mass participation by treating popularity as a proxy for value assignment. Quadratic funding, for example, tends to treat the number of donors as a determinant of funding outcomes.

This dynamic tends to introduce the risk of Sybil attacks, or events wherein individuals fraudulently operate multiple accounts to manipulate outcomes. In the case of quadratic voting, this takes the form of individuals making multiple accounts to donate small sums to grantees, in order to unduly multiply the matching funds received by said grantees.

In the case of quadratic funding, additional protective measures have been developed to mitigate or screen out Sybil attacks, resulting in something of an arms race between defensive protocol design and offensive financial fraudulence.

Below are highlighted some examples of these defensive measures, which each bring their own strengths and weaknesses. Here, it is worth bearing in mind the aforementioned challenge of UX, namely that the introduction of additional technical features can risk raising the technical barrier to entry, thus increasing the burden placed on UX development. That said, if a community or institution decides to use quadratic funding or comparable processes which reward mass participation, the threat of Sybil attacks is real and costly. The challenge, of mitigating fraudulent engagement while maximizing accessibility, is starkly manifest.

##### Gitcoin Passport

The Gitcoin community has been the methodological pioneer and developmental epicenter of quadratic funding, and thus they also play a leading role in addressing the challenges specific to quadratic funding.

[Gitcoin Passport](https://app.passport.xyz/#/) is one solution they developed in response to Sybil attacks. In essence, it is a user verification process intended to enable grant round operators to identify donors who have a high likelihood of being a real, individual person. Instead of letting all donations be eligible for matching funds, grant round operators can configure their grant round to only match donations from users with Gitcoin Passport.

Specifically, Gitcoin Passport involves a number of third-party account verification processes, each resulting in a "badge" earned by the passport holder. The user can verify their accounts and activities on other protocols and platforms, both onchain and offchain, to earn badges which add points to their passport score. For example, the user may earn points by connecting a LinkedIn account, having voted on a DAO proposal, having over 100 transactions on Ethereum, or various other things. Once the user accrues enough points to surpass a specified threshold, they are deemed a unique individual.

This is an entirely optional feature for those who want to use Allo Protocol and Grants Stack to run their own grant rounds, but where it succeeds in blocking users who would otherwise mobilize puppet accounts, it also succeeds in blocking users who lack the time or literacy to navigate an admittedly complex multi-step verification process.

##### Connection-Oriented Cluster Matching

Another innovative anti-Sybil solution originating from Gitcoin is [Connection-Oriented Cluster Mapping](https://www.gitcoin.co/blog/leveling-the-field-how-connection-oriented-cluster-matching-strengthens-quadratic-funding) (COCM), an algorithmic analytical process designed to detect potential collusion activity in quadratic funding rounds.

This process maps out relational data between donors and the grantee projects which receive donations, in order to identify suspicious donation activity and allocate matching funds accordingly. COCM rewards projects which receive donations from a diverse body of donors, meaning donors who exhibit diverse donation activity.

For example, a project which receives donations from donors who each only give to that one project, and thus exhibit similar donation activity, will receive a smaller matching amount than a project which receives donations from donors who each donate to a variety of projects and thus exhibit diverse donation activity.

#### Compliance, KYC and AML

Many of the experimental funding processes explored here have hitherto been operating largely without clear and applicable legal precedent. For example, the usage of immutable smart contracts to facilitate funding carries novel implications around ownership, introducing the legal possibility of autonomous, non-institutional financial infrastructure<sup>8</sup>.

That said, even if immutable smart contracts end up receiving distinct and novel legal treatment, many of the existing KYC/AML reporting requirements will still exist. Because of the emergent and unprecedented nature of some of this technology, these challenges are not always well-defined. Nevertheless, if these technologies are to see systematic adoption, greater clarity is needed with regard to these matters of compliance.

##### Zero-Knowledge KYC

The tension between privacy and compliance is one of the more fundamental tensions at play in the maturation of the onchain economy at large. Some argue that the ideal arrangement allows for security verification of key aspects of user identity, without compromising the privacy of the user.

Existing financial reporting standards require institutions to implement traditional KYC measures, in order for user/accountholder data to be available for the relevant authorities<sup>9</sup>. This approach puts the onus of security on the institution to responsibly custody this highly sensitive information.

An alternative approach, making use of zero-knowledge cryptography to privately verify critical user identity information, is actively being developed<sup>10</sup>. Such an approach could, and arguably already begins to, reconcile the imperatives of compliance with the individual's right to privacy.

For example, if an onchain grant program is being facilitated in a jurisdiction which enforces economic sanctions, the immutable smart contracts of the grant program can be configured to only accept applicants which can privately prove they don't reside in certain sanctioned countries. Such an arrangement could conceivably exist without requiring the institutional collection and custody of sensitive identity information.

### 2.2 - Economic Challenges

In addition to the aforementioned technical challenges, the onchain philanthropy sector also systemically faces a number of financial and economic challenges. Seeing as these philanthropic experiments are unfolding in what is effectively a parallel economy, there remain issues of adoption and liquidity which introduce financial friction into the allocation of funding. There also remain challenges having less to do with the novel financial technology, and more to do with the business of philanthropy.

#### Asset Liquidity and Volatility

Because many vendors, utilities, and other daily living expenses around the world do not accept stablecoins or other blockchain-based assets, the scope of the onchain economy is still largely confined to a narrow sliver of the total global economy. Regardless of however more efficient this new financial infrastructure may be, the reality of adoption still sets the tone for how people engage with this technology.

Specifically, if grantees receive grants in stablecoins, but still primarily need fiat currency to pay their bills and employees, they will need to convert their stablecoins to their needed form of fiat currency. In this arrangement, the grantees engage with the onchain economy in a largely transitory capacity, and the issues of asset liquidity and volatility are foregrounded. That is, in order for these funding processes to be functional in their de facto transitory capacity, the assets denominating the funding need to be adequately stable and liquid.

Fortunately, many of the onchain grant programs have adopted the practice of using stablecoins for funding, primarily USDC and DAI. This practice minimizes the volatility risk as much as can be expected<sup>11</sup>, and while liquidity is not a significant issue per se, the process of conversion into fiat currency can still be onerous, and involves a number of steps which do not come intuitively to everyone.

#### Value Exchange

Another aspect of this ecosystem which can occasion economic friction is the dynamic of value exchange in grant programs and ecosystem development rounds. Here, the question of value exchange is largely analogous to traditional philanthropy: grantees receive financial support from benefactor institutions, and in exchange the benefactor institutions see their missions advanced, their ecosystems expanded, their reputations enhanced, or some combination of the three.

This value exchange relationship, between grantor and grantee, holds true for some of the ecosystem development arrangements outlined in this report, regardless of whether the arrangement is philanthropic or for-profit. Grantmaking institutions need a financially sustainable model for distributing funds within their particular ecosystems, and recipient projects shouldn't have to put more work into grant round participation than is justified by the funds they receive.

In other words, the funds received by grantees should go to support their mission, and not the operational overhead of participating in the round. Otherwise, we're left with an arrangement whereby grantees develop a dependency on funding to support efforts to procure more funding. Ideally, the projects in question can focus on executing their missions, and grantmaking institutions can benefit from patronal association with these effectual mission-aligned projects and can effectively fundraise on the proven basis of this association. In this ideal arrangement, the operational overhead specific to the funding process is minimized for the grantee, allow them to focus on their mission.

##### Promotional Overhead

With respect to the nuances particular to the participatory funding processes outlined in this report, such as those of quadratic funding rounds, some additional value exchange considerations arise. For example, because quadratic funding rounds require extended community participation in the allocation of funds, much of the work involved in facilitating these rounds consists of social media engagement and publicity. This work falls jointly on the operators of the grant round, who administer the allocation of funds from matching donors to grantees, and on the grantees themselves, who raise awareness of their projects.

In this particular arrangement, the grantor institutions seek to expand their ecosystem in terms of brand awareness, active users, or some other metric, while grantees seek to increase their individual donor count in order to boost their results from the quadratic funding formula. Here, the goal of the grantor institutions is aligned with that of the grantee: donor participation. That said, the grantee projects are often at an early stage and may not have personnel specialized in this kind of social engagement, thus running the risks of over-allocating efforts to this kind of publicity campaign, relative to the amount of funds received, thus risking net-negative economic outcomes.

The grantor institution faces a slightly different economic task. While grantees in a quadratic funding round are, to an extent, competing for matching funds, the grantor is largely impartial as to which donors donate to which projects. Instead, the grantor aims more broadly to maximize donor participation in terms of quantity of unique donors, and optimize in terms of ensuring uniqueness and non-collusion among said donors. This means that the promotional overhead of the grantees is competitive with respect to the goals of the grantees, but cooperative with respect to the goals of the grantor.

In other words, this promotional work does not always prove worthwhile for the grantees, even if it may prove worthwhile within the context of the ecosystem development goals of the grantor. A solution here would seem to involve a concentrative outsourcing of the promotional efforts from the grantees onto some specialized entity. In fact, this methodology has already seen some practice, with Gitcoin functioning in this capacity for some of the quadratic funding rounds it has facilitated.

### 2.3 - Operational Challenges

The third category of challenges we will consider are those of an operational and executive nature. Even if economic and technical infrastructure is optimized in terms of minimal UX friction and ideal stakeholder incentives, the efficacy of such funding paradigms still depends on the agency and skill of the people involved.

#### Impact Reporting Burden

One of the major systemic difficulties encountered during some of these new ecosystem funding processes, is that of impact reporting and the operational burden it places on grantees<sup>12</sup>. Grantees receiving funds, whether from a philanthropic grant program or an ecosystem development fund, are expected to execute projects which promote the priorities of the grantor. In order to discern the effectiveness of this funding, certain metrics or indicators are relied on to gauge how well the the work of the grantee aligns with the priorities of the grantor.

This basic arrangement, involving success metrics as a vehicle for feedback between funding rounds, is a sound an intuitive approach to maintaining financially sustainable funding models. However, when the burden of collecting and reporting this feedback falls on the grantee, and entails too great an amount of work, it begins to detract from the grantee's ability to focus on the work being funded in the first place. At the same time, some sort of feedback is needed in order to develop a financially sustainable ecosystem funding model.

Thus constitutes the dual risks of impact reporting: too extensive, and it can detract from the primary work being funding, and by extension from the impact of the ecosystem funding model itself; too sparse, and it can result in blindspots in the funding feedback loop. Of course, the matter is not so plainly linear as that risk model may suggest. Indeed, an effective reporting process can be thorough without necessarily being burdensome.

Currently, the major fronts of designing effective impact reporting systems are, firstly, the identification of the key metrics and indicators needed in the funding feedback process and, secondly, the simplification of the UX of the reporting process itself. The Common Impact Data Standard has already established a technical vocabulary and holistic ontology for the former issue, whereas the latter issue is a more open-ended effort.

For the onchain ecosystem funding rounds highlighted in this survey, the reporting process often utilizes attestations to capture information about milestone progress, prior funding, and stakeholder testimony<sup>13</sup>. As detailed in the section on technical challenges, these tools often have a challenging UX which requires some degree of patience and technical literacy on behalf of participants, but thankfully this degree is discernibly diminishing as UX improves industry-wide, due to innovations like sponsored gas fees and account abstraction (Bedawala et al., 2025).

#### Accountability and Execution

In addition to the burden of impact reporting, another operational challenge faced by these funding models is that of establishing proper incentives to ensure the execution of the funding projects. While much of this has to do with the technical and economic considerations outlined in the previous sections, it also heavily involves the social and professional expectations set during these funding arrangements.

Specifically, the grantor should have a reasonable degree of confidence that the grantee(s) will be able to execute their intended goals within the timeframe of the funding model, and the grantees should be able to focus on said goals and be fairly compensated for doing so. If both sides of this relationship are not satisfied, it may jeopardize the sustainability of the funding model. Not only to the technical and economic circumstances need to be conducive to the proper incentives, but the operational circumstances need to reflect and promote the actual priorities of the stakeholders (Cavanaugh, 2024).

---

## Section 3 - Prospective Methodology

Given the extensive variety of innovations and challenges encompassed by this survey, one may be left wondering how everything fits together. While the purpose of this survey is to examine the breadth of said innovations and challenges, and not to prescribe any comprehensive unifying strategy, it may nonetheless aid in our sensemaking efforts to briefly probe in that direction. Indeed, it will remain the purview of some subsequent discourse to more holistically outline such a unifying strategy.

### 3.1 - Ontology for Impact Reporting

Regarding the _how_ of impact reporting, i.e. how we should communicate and structure impact metrics and indicators, it would seem the Common Impact Data Standard constitutes a systematically viable framework for the various ecosystems referenced in this survey. CIDS has a widely interoperable and platform-agnostic ontology for communicating this information, using JSON-LDs which can be written to attestations onchain. Indeed, some promising work is already being done to this effect<sup>14</sup>.

What remains to be seen is how this framework can be distilled down to an operational equilibrium wherein grantees are not burdened by excessive reporting requirements and challenging reporting UX. Again, as explained in the section on UX, this difficulty can be ameliorated jointly by educating stakeholders and by streamlining UX. Moreover, if a sustainable status quo technological self-service cannot be attained, an operational fallback may be for grantmaking institutions to designate an internal role for managing impact reporting, in order to remove the burden from grantees.

In such an arrangement, this role would theoretically be tasked with collecting key information from grantees, and processing this information through the onchain CIDS framework. However, the efficacy of such a framework hinges on the public attribution of attestations to particular entities, which means that we likely will not be able to rely on a solution wherein institutions nominally author the attestations of ecosystem stakeholders. Luckily, thanks to account abstraction, we may actually have a way for grantmaking institutions to designate specialized technicians to manage attestations on behalf of grantees, without compromising grantee attribution.

### 3.2 - A Peer-to-Peer Fiscal Paradigm

While most of the content of this survey pertains to private sector philanthropic programs operating on parallel economic rails, the methodology described may also have implications for fiscal or even parafiscal systems. Thanks to technical features like Contract Secured Revenue (CSR), we can now have peer-to-peer economic infrastructure wherein the utilization of certain facets of this infrastructure can transparently generate and allocate tax-like funding.

With CSR, smart contracts can collect fees and direct these fees elsewhere, such as to the creator of the contract or to a matching pool for a grant program. Optimism is also experimenting with network-wide sequencer fee revenue generation, to support ecosystem development efforts<sup>15</sup>. In certain capacities, this functionality can theoretically enable an transparently protocolized fiscal authority, in the case of pseudo-public funding. For example, popular DeFi protocol contracts could choose to collect a fee to support ongoing protocol development, and a fee to support grant programs chosen by the creator of the contract.

---

## Conclusion

A wide array of complex emerging technologies have been highlighted in this report, all of which are rapidly evolving in an open-source pluralistic environment. Many of the problems being addressed have to do with efficient and sustainable allocation of funding to projects which promote the common good, without coercing or imposing a monolithic vision of The Common Good. We have seen successful examples of participatory budgeting to determine grant allocation (quadratic funding), peer-based trust networks (DeVouch), exhaustive ontological paradigms for impact reporting (CIDS), and various other processes and mechanisms which are gradually amounting to a parallel grassroots philanthropic sector.

Naturally, these capture-resistant peer-to-peer economic technologies are conducive to such envisioned paradigms as this, but they also entail a great potential for abuse. While the prospects are distant and vague, they are nonetheless profoundly promising and deserving of proper stewardship. As with arguably all technology, these tools are as beneficial or as detrimental as the ends to which we employ them. The task, such as it seems to be, is to refine and embody a viable vision for how this technology can promote the world we want to see.

---

---

## Endnotes

1. For example, grantees included in Gitcoin's quadratic funding rounds tend to participate in public panels, such as Twitter spaces, intended to cross-promote the grantees' projects and to more generally promote the development of the Gitcoin ecosystem.
2. See ["The Master's Tools Will Never Dismantle the Master's House"](https://collectiveliberation.org/wp-content/uploads/2013/01/Lorde_The_Masters_Tools.pdf) by Audre Lord, Cory Doctorow's concept of [enshittification](https://en.wikipedia.org/wiki/Enshittification), and ["An Introduction to Extitutional Theory"](https://medium.com/berkman-klein-center/an-introduction-to-extitutional-theory-e74b5a49ea53) by Jessy Kate Schingler and Primavera de Filippi.
3. While the process at large is public and transparent, there are certain configurable exceptions to this, such as the solicitation of private personal data from grant applicants, such as email addresses and KYC/AML screening information.
4. For example, information about tax-exempt organizations collected via [IRS Form 990](https://www.irs.gov/forms-pubs/about-form-990) is public, and constitutes a major part of the existing reporting paradigm for impact and philanthropy. It is in full awareness of this existing reporting paradigm that any novel unified onchain impact assessment ontologies should be devised.
5. For more resources regarding the quadratic funding mechanism, see this [calculator](https://www.wtfisqf.com/?match=10000&grant=34-56&grant=3-100-4&grant=2-2-2-2-2&grant=700) provided by Gitcoin.
6. Recently there have been successful attempts to integrate payment processing for fiat currencies in these grant rounds, thanks to projects like [ViaPrize](https://www.viaprize.org/). For example, the [OpenCivics Collaborative Research Round](https://gov.gitcoin.co/t/gg21-retrospective-opencivics-collaborative-research-round/19313) utilized ViaPrize to facilitate dollar donations to grantees, thus eliminating the need for donors to donate in cryptoassets.
7. This sentiment can be discerned in the shift of certain currents of discourse in the industry, such as Gitcoin's pivot from language around funding public goods to simply "Fund what Matters".
8. See _[Van Loon v. U.S. Department of the Treasury](https://www.ca5.uscourts.gov/opinions/pub/23/23-50669-CV0.pdf)_ for a decision which intimates a paradigm shift in the legal treatment of non-institutional financial infrastructure:

> The six plaintiffs-appellants are users of Tornado Cash. They argue that Tornado Cash's inclusion on the SDN list exceeded OFAC's statutory authority. The district court disagreed, granting summary judgment to the Department and finding Tornado Cash subject to OFAC's sanctioning authority. Van Loon and the other plaintiffs appealed, making the same principal argument here—that Tornado Cash's open-source, self-executing software is not sanctionable under the Act (as opposed to the rogue persons and entities who abuse it). OFAC's concerns with illicit foreign actors laundering funds are undeniably legitimate. Perhaps Congress will update IEEPA, enacted during the Carter Administration, to target modern technologies like crypto-mixing software. Until then, we hold that Tornado Cash's immutable smart contracts (the lines of privacy-enabling software code) are not the "property" of a foreign national or entity, meaning (1) they cannot be blocked under IEEPA, and (2) OFAC overstepped its congressionally defined authority.

9. See [FinCEN](https://www.fincen.gov/what-we-do) and the [Egmont Group of Financial Intelligence Units](https://www.fincen.gov/resources/international/egmont-group-financial-intelligence-units) for more information about existing KYC/AML reporting standards.
10. See the zero-knowledge solutions being developed by [Holonym](https://holonym.id/), such as [Human.Tech](https://human.tech/).
11. USDC and DAI have, to date, proven adequate stability, but not all stablecoins have. It should be noted that another tension of institutional trust can be discerned in the choice between USDC and DAI, with the former being a more traditionally institutionally managed stablecoin, collateralized by dollars and dollar equivalents, where DAI is a more experimental multi-collateralized algorithmic stablecoin managed by a DAO.
12. Over the three quadratic funding rounds we have managed at OpenCivics, impact reporting, has been a primary tension, due to a combination of factors which dynamically relate.
13. Regarding stakeholder testimony, one example of implementation is [Giveth's use of DeVouch](https://blog.giveth.io/devouch-leveraging-trust-networks-for-better-capital-allocation-ad134d130dd4) to enable a project's community to make public statements about the project, using EAS.
14. See this [ReFi DAO proposal](https://gov.gitcoin.co/t/gg22-community-round-proposal-biofi-pathfinders/19399) on the Gitcoin governance forum.
15. See Optimism's [Onchain Net Revenue Tracker](https://docs.google.com/spreadsheets/d/1XtyBu5lvCI6MtMBQPC6ZOnjZ5nbbPw4bOH7WO2Pn7cI/edit?gid=0#gid=0).

---

## Bibliography

- Bedawala, M., Ozbay, M., & Gu, C. [What is account abstraction? Exploring new techniques for blockchain payment processing](https://usa.visa.com/solutions/crypto/rethink-digital-transactions-with-account-abstraction.html). [Visa Crypto Thought Leadership](https://usa.visa.com/solutions/crypto.html#3).
- Buterin, V., Hitzig, Z., & Weyl, E. G. (2018). [A Flexible Design for Funding Public Goods](https://arxiv.org/abs/1809.06421v2).
- Cavanaugh, S. S. (2023). [What Are Onchain Organizations?](https://www.clinamenic.com/Writing/What-Are-Onchain-Organizations). ([Arweave](https://viewblock.io/arweave/tx/GxrelcyAGMRd0lqR-uNZG9pcWGRaaqf1HaEtLy8nNvs)).
- Cavanaugh, S. S. (2024). [Progressive Public Goods Funding](https://www.clinamenic.com/Writing/Progressive-Public-Goods-Funding). ([Arweave](https://viewblock.io/arweave/tx/YwpUk7Vxn2c6YKPTGmODfyA5u1-n6VvrZHJXNDy1fBE)).
- Common Approach to Impact Measurement (2024) [Technical Guide: The Common Impact Data Standard V3.0 Exposure Draft. An Ontology for Representing Impact](https://www.commonapproach.org/wp-content/uploads/2024/06/Exposure-Draft_Common-Impact-Data-Standard-v3.0.pdf), Common Approach to Impact Measurement.
- Graham, S. (2022). [Anticapture: Towards a Framework of Capture-Resistant Governance](https://spengrah.mirror.xyz/f6bZ6cPxJpP-4K_NB7JcjbU0XblJcaf7kVLD75dOYRQ). [Arweave](https://viewblock.io/arweave/tx/yAxnXi_oZlIa5eB3CkKujBwzrprX177jEPemu2LeLl8).
- Leventhal, E., Waqar, M., Liu, A., Biedermann, B., Feems, Devjani, H., LauNaMu, Grendel, M., Mori, S., & Elefante, V. (2024). [State of Web3 Grants Report 2024](https://drive.google.com/file/d/1JBbGos6Bjdvd1LRGDvIijREic4l7Th2I/view).
- D. Long, P., Zagidulin, D., & Velez, G. (2023). [Composing Credentials via LinkedClaims and Cryptographic Binding](https://github.com/WebOfTrustInfo/rwot11-the-hague/blob/master/final-documents/composable-credentials.pdf). [RWOT](https://www.weboftrust.info/about/).
- Optimism Collective (2023a). [Announcing the Results of RetroPGF 2](https://arc.net/l/quote/ndqlckpa). ([Arweave](https://viewblock.io/arweave/tx/8UPSPW9Fpim1rrZWDnhCiWQg0T9Hd0S0FebLEdJljzs)).
- Optimism Collective (2023b). [RetroPGF2: Learnings & Reflections](https://arc.net/l/quote/iuqqismf). ([Arweave](https://viewblock.io/arweave/tx/ry5yRtkJYgehHoKSTr-Wd92MkyaCYAcHxwL5NnycoH8)).
- Optimism Collective (2024a). [Announcing RetroPGF Round 3 Recipients](https://optimism.mirror.xyz/37Bgum6MfTJWDuE41CH9RXSH5KBm_RCL5zsSFeRZl4E). ([Arweave](https://viewblock.io/arweave/tx/8UPSPW9Fpim1rrZWDnhCiWQg0T9Hd0S0FebLEdJljzs)).
- Optimism Collective (2024b). [RetroPGF 3: Learnings & Reflections](https://arc.net/l/quote/tguyvict). ([Arweave](https://viewblock.io/arweave/tx/Tz3JQkadZHSVrFTipuCNAMOU80-MjZWGPEoiH05gZqI)).
- Schrott, L. P. (2024). [Leveling the Field: How Connection-Oriented Cluster Matching Strengthens Quadratic Funding](https://www.gitcoin.co/blog/leveling-the-field-how-connection-oriented-cluster-matching-strengthens-quadratic-funding). Gitcoin blog.
- Waqar, M., ZER8 (2024). [Web3 Grant Program Research and Analysis](https://docsend.com/view/rxs93u4s5sb93xck).
- wheebill (2024, September 18). [Badgeholder Onchain Analysis Report](https://gov.optimism.io/t/badgeholder-onchain-analysis-report/8881) (online forum post). Optimism Collective Governance Forum.

---

## Appendix on Grant Volume

- Gitcoin, over \$60 million to date ([Report](https://impact.gitcoin.co/))
- Optimism Collective's RetroPGF results. For calculations of simple moving average (SMA), I am using discrete weekly snapshots of the closing price of the asset (\$OP) taken every Monday at midnight UTC. I am using data exported from CoinMarketCap's price history.
  - Round 1, Q4 2022, \$1 million distributed ([Results](https://github.com/ethereum-optimism/op-analytics/blob/main/rpgf/rpgf1/results/rpgf1_results.csv)).
  - Round 2, Q2 2023, 10 million \$OP distributed, approx. \$25 million FMV ([Results](https://optimism.mirror.xyz/Upn_LtV2-3SviXgX_PE_LyA7YI00jQyoM1yf55ltvvI), [Learnings](https://optimism.mirror.xyz/7v1DehEY3dpRcYFhqWrVNc9Qj94H2L976LKlWH1FX-8)). In Q2 2023 the \$OP token had an SMA of \$1.73, and a standard deviation of approximately 24%.
  - Round 3, Q4 2023, 30 million \$OP, approx. \$78 million ([Results](https://vote.optimism.io/retropgf/3/summary), [Learnings](https://optimism.mirror.xyz/Bbu5M1mTNV2Z637QxOiF7Qt7R9hy6nxghbZiFbtZOBA)). In Q4 2023 the \$OP token had an SMA of \$1.95, and a standard deviation of approximately 65%, indicating drastic volatility, even by the standards of crypto markets.
  - Round 4, Q2 2024, 10 million \$OP, approx. \$25 million ([Results](https://retrofunding.optimism.io/round/results)). In Q2 2024 the \$OP token had an SMA of \$2.40, and a standard deviation of approximately 16%, indicating relative stability compared to the previous round.

---

## Disclaimers

At the time of writing this, the author holds a material amount of ETH and other Ethereum-based assets, and is actively involved in the governance and operations of several organizations and projects in this ecosystem, in various paid and unpaid capacities.

The contents of this report do not constitute legal, financial or professional advice or endorsement of practices, and is intended purely for informational purposes.

AI was used as a research aid over the course of the creation of this report, but was not used in a generative capacity. Nothing in this report was generated by AI.

---

## Licensing

The contents of this report are licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).
