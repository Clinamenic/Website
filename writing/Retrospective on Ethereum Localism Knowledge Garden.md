---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI: 
date: 2025-06-05
headDescription: 
headIcon: 
keywords: 
language: en
license: CC BY-NC-SA 4.0
ogSiteName: Clinamenic LLC
ogType: website
publish: true
quartzShowBacklinks: true
quartzShowBanner: false
quartzShowCitation: false
quartzShowExplorer: true
quartzShowFlex: true
quartzShowGraph: true
quartzSearch: true
quartzShowSubtitle: true
quartzShowTitle: true
quartzShowTOC: true
structuredData: 
subtitle: Learnings from configuring a cosmolocal community knowledge base.
tags: 
title: "Retrospective: Ethereum Localism Knowledge Garden"
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: retrospective
url: 
uuid: 72f8f575-2f24-4fd2-826b-9fbeb2c54a5d
---

## Background

[Ethereum Localism](https://www.ethereumlocalism.xyz/introduction/) is a nascent, niche subculture at the intersection of blockchain and grassroots organizing. Given the existing global socio-professional Ethereum community, as well as a number of more localized communities of technologies and community builders, Ethereum Localism applies global peer-to-peer technologies to the needs of local communities, in true "cosmolocal" fashion.

During the [General Forum on Ethereum Localism (GFEL) in Boulder](https://www.ethereumlocalism.xyz/library/GFEL/GFEL-2025-Boulder-Documentation), many of our discussions were geared around how communities can collectively manage their knowledge, in the form of a library of documents and media resources. Beyond just creating a database, we felt the need to create something more conducive to ongoing cultivation and care, in the spirit of a digital garden. Seeing as many in attendance support open-source and local-first technologies, we figured this community knowledge garden should also reflect those values.

### Contributors

The following individuals took on the work of creating this community knowledge garden, and thereafter received retroactive compensation from a community treasury.

- Christy: Created the contribution flow for non-technical community members, curated various resources and documents into the garden, and designed the overall layout of the website.
- Exeunt: Wrote and/or collated many of the documents and artifacts included in the site, including extensive literature from previous GFEL events, and secured funding for the project.
- Clinamenic: Deployed a customized stack involving Git, Obsidian, and Quartz to constitute the knowledge garden, and provided ongoing technical support.

---

## Scope of Project

The project was concisely scoped, insofar as it entailed the creation of a wiki-like hub for documents and resources pertaining to Ethereum Localism, while also being open-ended, in that the precise methods for collaboration were yet to be determined. We needed a way to not only build an open-source, local-first community knowledge garden, but to do so in a manner which is accessible to non-technical community members who want to contribute to it.

That said, we wanted to avoid critical dependencies on collaborative platforms which are institutionally maintained as products, chiefly due to their deprecation risk. These technologies need to be around and operational years from now.

### The Stack

- [Git](https://en.wikipedia.org/wiki/Git) is a great example of a collaborative framework which functions as a peer-to-peer protocol. It also requires a certain level of technical familiarity to utilize, which shouldn't necessarily be presumed on behalf of the community in question.
- [Obsidian](https://obsidian.md/) is a local-first notetaking app which we decided to use as our primary environment for editing and organizing the documents included in the garden.
- [Quartz](https://quartz.jzhao.xyz/) is a framework for converting markdown notes, like those in Obsidian, into webpages, creating a wiki-like website.

Core contributors would collaboratively create, edit, and organize documents in a shared Obsidian knowledge base, using Git to synchronize our work. Because our central team was so lean, we didn't run into any merge conflicts or such difficulties, but the risk of this would increase along with the number of collaborators. That is, it wouldn't be advisable to have dozens of communities members directly editing the knowledge base in Obsidian and manually syncing with Git.

In light of this, we created an alternative, more accessible option for contribution. While it doesn't meet our criteria for fundamental technology stack, Google Docs is an excellent option for easy and intuitive collaboration on documents, and it also allows these documents to be exported as markdown files. This allows us to download documents from Google Docs and bring them into the Obsidian knowledge base. Thuswise we encouraged our other community members to create and share google docs for documents they'd like to include in the knowledge garden, which we would then download and move into the Obsidian directory.

---

## Learnings

The primary tension we faced was that of reconciling the virtues of local-first open-source technologies, with the accessibility requirements of non-technical communities. Our solution, of relying on Git and Obsidian as the core collaboration stack, Quartz as a free site-building framework, and Google Docs as an auxiliary contribution avenue, fundamentally suffices but definitely has room for improvement.

### Unified Environment

For example, during the construction of the knowledge garden, we were using Obsidian to stage changes, then switching to Github Desktop to commit and push these changes. This jump form one tool to another constituted a point of friction, which could have been improved by using a more integrated solution like the [Git plugin](https://github.com/Vinzent03/obsidian-git) for Obsidian, which would allow us to do everything we need directly in Obsidian.

### Linkrot Mitigation

One of the main reasons we sought to build a local-firs community knowledge garden, was to establish reliable storage for documents and other media artifacts generated during GFEL and related events. Hosting these documents on siloed web solutions is often the convenient option, but once those links change or deprecate, our resources disappear. Having everything we need in a git-synced repository also has its limitations, but it does allow for more resilient local-first storage.

As an ongoing issue, to mitigate linkrot moving forward, Quartz has various [alias](https://quartz.jzhao.xyz/plugins/AliasRedirects) and [permalink](https://quartz.jzhao.xyz/authoring-content#syntax) features which can provide fallbacks for broken links.

### Arweave Storage

For images and videos which can bloat a repository, we instead chose to use Arweave as a globally accessible database. We would upload a file to Arweave, and then use that transaction hash as a unique identifier for that file. Then, we would be able to embed or reference these files within our markdown pages, without needing to store them in our synced repository

## Summary

Overall, the project was successful, and the resulting knowledge garden serves as a reliable foundation for ongoing contributions, as well as a publicly accessible showcase for Ethereum Localism resources. The primary learnings were mostly technical in nature, regarding the ideal configuration of our technological stack, with a view toward long-term functionality and availability. Given the open-source nature of the technologies involved, such as Quartz, we also have the opportunity to continue adding custom features, allowing the garden to adapt to future circumstances.

---

## Resources

- [Obsidian](https://obsidian.md/): A free, local-first tool for notetaking, writing, and knowledge management.
- [Quartz](https://quartz.jzhao.xyz/): A free, open-source static site builder for Obsidian vaults.
- [Git plugin for Obsidian](https://github.com/Vinzent03/obsidian-git): An Obsidian extension which allows for more seamless integration with Git, enabling knowledge gardeners to everything they need to do without leaving Obsidian.
