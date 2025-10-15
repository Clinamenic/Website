---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI:
date: 2024-04-05
headDescription: Publicly tracking impact progress, and balancing between proactive and retroactive funding models.
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
subtitle: Publicly tracking impact progress, and balancing between proactive and retroactive funding models.
tags:
  - personal-discourse
  - misc/onchain-philanthropy
  - text
title: Progressive Public Goods Funding
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: article
uuid: 8166b4bc-4b46-4aba-be6d-e59607cc4aac
---

_The following does not constitute legal, financial, accounting, or compliance advice, but is intended purely for informational purposes._

The realm of public goods funding has recently seen a variety of technologically innovative models emerge, engineered in the interest of more sustainably and intelligently funding the commons. Philanthropic mechanisms such as quadratic funding, retroactive public goods funding, and impact certificates are being advanced by institutions such as [**Gitcoin**](https://www.gitcoin.co/?ref=blog.subsquid.io), [**Giveth**](https://giveth.io/), [**Octant**](https://octant.build/), and [**Endaoment**](https://endaoment.org/). Moreover, these mechanisms are increasingly [**being built onchain**](https://solosalon.clinamenic.com/5), allowing for greater degrees of transparency and collective governance, as well as interoperability with one another.

This explosion of open-source invention has unlocked a fascinating new technological dimension of a much older challenge, namely the matter of how to best allocate funding toward public goods. In the economic sense of the term, [**public goods**](<https://en.wikipedia.org/wiki/Public_good_(economics)>) refer to goods that are non-excludable, meaning they can be accessed by everyone, and non-rivalrous, meaning that their usage doesn't require people to compete for it. One generally thinks of public goods as being funded by state institutions via taxation, but they can also be funded within private sector by established or experimental means.

In this piece, I will briefly survey aspects of the design space for funding public goods, with an emphasis on the novel technological mechanisms above described. Additionally, I will suggest a framework intended to 1) address some of the problems we face in this domain, and 2) reconcile the virtues of some of the different approaches thus far taken to address them.

## Public Goods Funding: Proactive vs Retroactive

One approach taken to funding public goods, largely pioneered by the technologists at Gitcoin, can be described as _proactive public goods funding_. In this model, teams working on projects apply to join a grants program, describing the nature of their project, how it qualifies as a public good, and what they plan on doing with these funds. This information can, and generally is and ought to be, public, especially if the grants program involves quadratic funding, wherein individuals on the internet can browse the applications and donate to these projects.

This model can be understood as proactive in that the funding generally precedes, or is permitted to precede, the impact. There are examples of projects, which have secured funding in this manner, and which already have a history of execution and impact, in which cases the funding can be understood as rewarding previous as well as future work, but my point here is to draw attention to how projects are here able to secure funding for impactful work that has yet to be done.

There are positive and negative aspects about this arrangement, generally speaking. One positive aspect is that the team does not need to risk putting in much work before the potential for getting funded, as is the case in the retroactive approach. This aspect may be appealing for those who cannot afford to dedicate much time to philanthropic efforts based only on the prospect of potentially getting paid. One negative aspect is that there are not always assurances that the team being funded has the ability to execute, or that there are the accountability measures necessary to encourage such execution. In other words, an impact project may proactively receive funding based on a compelling application, but sometimes the team may not follow through or use the funding in a tactful manner.

On the other hand, we now have the approach of retroactive public goods funding, as pioneered largely by the technologists at Optimism, wherein projects apply for funding for work that has already been done. Where the proactive approach permits funding to precede impact, the retroactive approach requires that impact precede funding.

The positive and negative aspects of this retroactive approach can be understood as an inversion of those of the proactive approach. Here, the positive is that the impactful work has already been done, so there is little risk of allocating funding to projects that don't execute. The negative aspect, however, is that it requires teams to do the work before, and without any guarantee of, getting paid. Naturally, this is an arrangement not everyone can afford to participate in. But how can we ensure accountability and execution, while still remaining accessible to those who cannot depend on the mere potential of eventually getting paid for their impactful work?

## Progressive Funding: A Synthetic Approach

If we frame the dilemma of the proactive and retroactive models, with their respective positive and negative aspects, in a [**dialectical fashion**](https://en.wikipedia.org/wiki/Dialectic), we may attempt to reconcile them.

- **Thesis**: _Proactive Public Goods Funding_
  - _Positive_: Is accessible to those who cannot afford to dedicate much time to impactful work without a strong likelihood of being compensated.
  - _Negative_: Does not involve sufficient accountability measures or assurances of execution.
  - _Summary_: Better for grantees, because funding can be secured before work is done, than for donors, who do not have strong assurances that their donations are likely to lead to execution of impact goals.
- **Antithesis**: _Retroactive Public Goods Funding_
  - _Positive_: Impactful work has been done, so there is no need for additional measures to assure accountability and execution.
  - _Negative_: Is not accessible to those who cannot afford to dedicate much time to impactful work without a strong likelihood of being compensated.
  - _Summary_: Better for donors, who want to reward impactful work which has already been done, than for grantees, who did that work without any guarantee of funding.
- **Synthesis**: _Progressive Public Goods Funding_
  - _Positive_: Funding is amortized across a series of impact milestones, balancing the needs for stable compensation of impactful work with the needs for accountability and execution assurance.
  - _Negative_: More of a procedural and reporting burden for the grantor and for the grantees.
  - _Summary_: Grantees can incrementally receive proactive funding, minimizing the risk of uncompensated work, while donors can track progress toward impact goals and have confidence that further funding is predicated on such goals being met.

While the above may constitute a sanguine oversimplification of the models in question, it may yet suffice to illustrate the logic of a particular attempt to balance their redeeming qualities. Many would-be grantees cannot afford to dedicate much time and work without compensation, while many would-be donors will not provide much funding for projects without proper assurances around accountability and execution. The two interests are often incidentally situated at the expense of one another, but not necessarily so.

## Existing Reporting Requirements

In the United States, and doubtless many other jurisdictions, [**non-profit organizations**](https://www.irs.gov/charities-and-nonprofits) are already required to [**publicly report**](https://apps.irs.gov/app/eos/) many of their operational and financial details. One example is [**Form 990**](https://www.irs.gov/forms-pubs/about-form-990), which requires non-profit organizations to report a variety of details regarding their funding, expenses, and activities. What is arguably lacking here, however, is meaningful public insight into the progress non-profits make, with regards to their impact goals.

As a donor who wants donated funds to contribute to successful impact, it can be useful to assess the track record of the organization and individuals involved. Many times, this information is sufficiently documented via the announcements, articles, and interviews surrounding the organization's efforts. This information, coupled with public filings, can constitute a solid informational basis for a decision to donate. But how can this arrangement be improved?

One approach, which remains theoretical, is to track impact milestones, along with the various claims and certifications surrounding them, on a public peer-to-peer database. This notion of an onchain semantic web has interesting implications for philanthropy, insofar as it may render philanthropic efforts more programmatic and transparent, beyond the existing reporting requirements. Below, a basic framework is suggested for how grant programs may implement attestations and certifications to contribute to an onchain semantic web, to the benefit of the philanthropic commons.

## Onchain Architecture

The following series of diagrams are meant to illustrate the cycle of a given grant program. The intention is to enable the grantor, or the institution managing this grant program, to run a series of grant-giving rounds, and to track the milestone-based progress from one round to another. The following architecture utilizes Gitcoin's [**Grant Stack**](https://www.gitcoin.co/grants-stack), [**Hypercerts**](https://hypercerts.org/), [**Ethereum Attestation Service**](https://attest.sh/), and Karma's [**Grantee Accountability Protocol**](https://gap.karmahq.xyz/).

![](https://storage.googleapis.com/papyrus_images/76b5ceb0297721d97154a7f18569239f.png)

During the preparation stage, the grantor specifies the application information, the matching donors contribute to the matching pool, and the prospective grantees complete their onchain profiles.

![](https://storage.googleapis.com/papyrus_images/191c8912b94dc2e87f5aaa1fd50b5388.png)

During the application stage, grantee applicants complete the application created by the grantor, and specify certain milestones they aim to meet, given the funding they receive. This grant submission can live onchain, regardless of whether the grantee is accepted into the round by the grantor.

![](https://storage.googleapis.com/papyrus_images/4c85000ab209448d8b3249dba994336a.png)

During the first part of the quadratic funding stage, individual donors donate to grantees of their choice, effectively voting for those grantees to receive portions of the matching pool. These individual donors may be members of the communities surrounding the grantees.

![](https://storage.googleapis.com/papyrus_images/2178dd991b2e15ed41593da89885e086.png)

In the second part of the quadratic funding stage, the matching pool is distributed according to the results of the individual donations. That is, the grantees who received more individual donations get a bigger "match" from the matching pool.

![](https://storage.googleapis.com/papyrus_images/34dcda34ddda6418ac1bf65a60cda781.png)

During the "request for attestation" stage, the grantees use their funding to work toward their specified milestones. During this stage, the general public is invited to make claims about the work of the grantees, and publish these claims as attestations, thus contributing to the onchain semantic web.

![](https://storage.googleapis.com/papyrus_images/5c9f0a4822140690adc5084f5261c598.png)

During the impact certification stage, which can be several months after the grantees have received their matching funds, the grantor revisits the milestones set by the grantees, and confirms whether these milestones have been met. This evaluation takes the form of a certification issued onchain, which can serve as evidence of impact, and as a basis for future fundraising.

## A Philanthropic Frontier

Many of the ideas explored above are posited as potential solutions to perceived inefficiencies in the existing philanthropic sector, while other ideas are more experimental and innovative in nature. In both cases, experimentation is required to discern how effective these technologies and techniques are. Fortunately, at the time of writing, [**this very methodology is about to be implemented for a grant round**](https://gov.gitcoin.co/t/gg20-proposal-opencivics-consortium-round/18296), with the hope of not only allocating funding to non-profit projects, but also of innovating upon the very nature of the allocation of such funding.

[**_Clinamenic LLC_**](https://www.clinamenic.com/) _is available for hourly consultations and service retainers regarding onchain governance and operations._
