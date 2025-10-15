---
author: Spencer Saar Cavanaugh
authorURL: https://www.clinamenic.com
date: 2024-10-12
draft started: 2024-10-12
headDescription: Some coverage of the various challenges faced in the construction
  of a bespoke multi-purpose zettelkasten.
headIcon: null
license: CC BY-SA 4.0
publish: true
quartzSearch: true
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowExplorer: true
quartzShowFlex: true
quartzShowGraph: true
quartzShowSubtitle: true
quartzShowTOC: true
quartzShowTitle: true
subtitle: Some coverage of the various challenges faced in the construction of a bespoke
  multi-purpose zettelkasten.
tags:
- personal-discourse/log
- misc/zettelkasten
title: Notes on Experimental Zettelkasten Methodology
type: notes
uuid: f287fa9c-c615-4f2c-97db-5103b6df1b07
---

![[Boilerplate#Canvas Foreword]]

Finding myself in a period of pronounced methodological disequilibrium, at once confounding and exciting, I think it may be useful to take brief account of the challenges faced, in hopes of dispelling artificial problems and surfacing potential solutions. It is also in the spirit of auto-discourse that this exercise, like those few preceding it, will be made public, so as to provide additional epistemic context for more polished future publications.

In a largely unstructured manner, I will list the methodological difficulties encountered over the course of my establishing this [zettelkasten](https://en.wikipedia.org/wiki/Zettelkasten) system.

## File Naming Conventions

One of the major difficulties, which I suspect may largely be artificial qua non-substantive, is the file-keeping and codification schema of the zettelkasten itself. I find myself formally drawn to the notion of having a uniform and canonical file-naming system to encompass more or less the entirely of the zettelkasten, but I run into several practical issues entailed by my particular circumstances.

Choosing concise non-content-oriented file names, like 'log-2024-09-18' for long(ish)-form notes like this or 'r-JK-GT-7' for reference notes like those I've taken for Keynes' General Theory, is appealing for formal (and potentially non-substantive) reasons, but is also appealing for a more substantive reason, namely that it could enable unforeseen rediscovery of notes in unexpected contexts. In this respect, one may view the zettelkasten as an epistemic landscape through which one may take a [dérive](https://en.wikipedia.org/wiki/D%C3%A9rive), insofar as it permits the ability to navigate ideas without a pre-determined destination.

Seeing as I am also publishing these notes, using Obsidian as the primary text editor and Quartz for the mechanism of systematic conversion from markdown to HTML, I also have to consider the mechanisms by which these notes will be publicly accessible and discoverable. This adds no small complexity to the determination of a satisfactory naming system, mostly owing to the challenge of linkrot. That is, if this were a purely internal zettelkasten with no public aspects, I would feel at greater liberty to adjust codification systems in an ad hoc manner, especially seeing as Obsidian preserves internal links much more robustly than could be expected of an analog zettelkasten.

This difficulty of preserving a viable public interface is one example of the challenges of a multi-purpose zettelkasten. In my case, I do not even reached a stable understanding of what purposes exactly this is serving, but so far I intend this zettelkasten to constitute:

- an internal knowledge management system for various non-sensitive domains of information, with an emphasis on discourse;
- a publication of this discourse, and other select content, with a view toward inviting feedback from peers and establishing publicly verifiable provenance of said content;
- a personal and professional website to showcase portfolios, prior experience, and anything else which may be relevant to future professional enterprise;
- a digital garden (hence "Zettelgarten") which serves as a canvas for aesthetic expression and collation of cool stuff I find on the internet.

Many of the aspects of these challenges are technical and ostensibly trivial in nature, but which nonetheless may be worth contending with earlier on, if this system is to effectively serve the various purposes for which it is presently intended. For example, with regards to file naming, I would like this zettelkasten to include:

- personal notes of arbitrary length and subject matter (e.g. [[Notes on Keynes, Hayek, and Fiscal Protocols]]);
- exegetic notes made in reference to books I read (e.g. [[z-9]])
- finished publications (e.g. [[Recuperate the Vanguard]]);
- external publications which I have publication rights to (e.g. [[The General Theory of Employment, Interest and Money]]);
- the various non-note pages of my website (e.g. [[index]]);
- any miscellaneous configuration files needed by Quartz or any other technical components of the system. Many, if not all, of these such files are not markdown files in nature, and thus they are not displayed in Obsidian, which effectively serves as my primary filing and navigation interface.

As far as file naming systems go, I think I don't have as much of a need for the atomic notes which the [folgezettel](https://medium.com/@ethomasv/the-folgezettel-conundrum-20b14dc986ec) naming system seems to be optimal for.

Rather, at least so far, I primarily have a need to draft publications and extended notes like this (which function as proto-publications), and various other pages (such as web pages) which do not seem to benefit much from such systematic naming conventions. That said, I am starting to think of this "[publication machine](https://pdfs.semanticscholar.org/88f8/fa9dfbc0c2b296758dd932b871917c5c775a.pdf)" as having strata of sorts, with polished publications being the outward-most layer, extended notes constituting the internal layer, and potentially some [ideonomic](https://ideonomy.mit.edu/) note network being the innermost layer. This latter notion, of ideonomically atomic notes, is a novel idea and one which deserves its own elaboration and potentially own flavor of folgezettel.

As for now, while I do not have much of need for non-reference atomic notes, I do have a need for reference notes, atomic or otherwise, and in this respect I am undecided regarding whether a naming convention like folgezettel will prove adequate. I also need to configure an adequately navigable tagging system for the purposes of semantic organization of notes.

## Books and Notes on Books

In piloting [[The General Theory of Employment, Interest and Money]] as a book my notes on which will systematically processed into a zettelkasten, I have incurred considerable complexity above and beyond what is already proving to be a challenging exercise in reading comprehension. That said, such a rigorous notetaking system is, I am finding, aiding tremendously in said comprehension, which is to say I do not regret incurring such added complexity.

In certain respects this comprehension exercise is a continuation of the Modular Generalist Program I had started developing a few years ago (see [[Modular Generalist Program]]. Specifically, I am attempting to process (qua intuitively comprehend) a given work of discourse from a given domain, in this case macroeconomics. My notetaking priorities in general are to:

- develop comprehension of the subject matter by re-articulating the content in my own terms, via atomic notes containing section summaries, general reflections, questions and uncertainties, etc.;
- build a body of notes which can eventually be reviewed, potentially even by way of methods like spaced repetition, which Obsidian has plugins for;
- incorporate these notes into a larger body (i.e. zettelkasten) of notes take from various books, such that I can comparatively analyze books and my notes taken on them;
- preserve the book itself in markdown format in the zettelkasten, provided the license grants such rights, such that I can directly reference sections of the book, and use transclusions and embedded notes;

With respect to Keynes' General Theory in particular, my comprehension priorities are:

- to better understand how highly developed liberal economies operate, and specifically the circumstances under which they can be expected to self-regulate and self-correct, and those under which state intervention is warranted even by classically liberal standards;
- to better understand how classically liberal values can be balanced with pro-social communitarian values, a topic I have explored in [[Recuperate the Vanguard]] and [[Prospectus of the Reconciliation of Individual Liberty and Collective Welfare]] (also see [[Notes on Keynes, Hayek, and Fiscal Protocols]]);
- to better understand how Keynesian economics is a discursive departure from the classical theories of economics, and in turn to understand how more recent theories have departed from conventional Keynesian premises;
- to inform practical strategies of designing organizations and mutualistic economic systems using peer-to-peer (see [[Notes on Active Discursive Efforts]] and [[Notes on Extitutional Theory and Progressive Protocolization]]);

Given the above priorities, I'm thinking it may be best to locate these notes in the innermost stratum of this zettelkasten, alongside their reference material. Additionally, I would like to be able to display my annotated versions of texts, perhaps using transclusions of corresponding notes within the page of the text itself.

## Publication Process

If the zettelkasten is to be optimized around a central function, that function would be the facilitation of writing and publishing. In this respect, my priorities are largely aligned with other zettelkasten proponents, such as [Sonke Ahrens](https://www.soenkeahrens.de/en/takesmartnotes) and Niklas Luhmann himself.

Where this particular methodology may differ is in how the publication process is structured. As of now, I am drafting multiple publications in parallel, while also writing and publishing extended notes (which I have been calling 'logs'), such as this note. These extended notes serve primarily as a personal sensemaking exercise and and internal discursive context, and secondarily as an external feedback facilitation mechanism. Publications, on the other hand, primarily serve the purpose of communicating these ideas to the public, in the form of polished discourse.

In other words, the primary function of these extended notes are internal, whereas the primary function of publications is external. Because they are both public, and thus considered publications, the polished publications are considered the "outermost" layer because they are outward facing in their purpose, whereas the extended notes (as proto-publications) constitute the middle layer insofar as their function is more internal. More atomic notes, and their accompanying reference material, constitute a still more inward layer and are also public.

What remains private are notes and files containing information I am not at liberty to publish. These files will remain in the zettelkasten, but will not be included in the publishing flow. Thus, the zettelkasten, across all its strata, ultimately revolves around publication, and is not entirely public. That said, I do find the approach of "drafting in public" to be appealing, in the spirit of auto-discourse.

## Site Construction, Hosting, and Networking

This particular zettelkasten stack consists, at present, of Obsidian as a text editor, Quartz as a site construction mechanism, and Github Pages as a site hosting solution. Beyond Github Pages, I plan on hosting either on IPFS (via Fleek) or Arweave (via Fleek or Protocol.land or something else). There is also the potential to utilize Seed Protocol to index this content onchain.

In the case of my Quartz publication, I have introduced several custom typescript components, thanks to the help of Perplexity and Cursor. This configurability, and how it can all be engineered into the frontmatter of the markdown files being published, opens a wide field of functionality potential.

Still unclear to me is the extent to which a website like this can operate purely on peer-to-peer infrastructure, instead of relying on institutionally managed platforms which can more readily be deprecated.

Beyond this particular publishing stack, this process can be replicated and repurposed for a variety of purposes, such as group publications or libraries. Based on preliminary testing so far, it seems feasible to have multiple people, each with their own local Obsidian vault, contribute to the same Quartz publication.