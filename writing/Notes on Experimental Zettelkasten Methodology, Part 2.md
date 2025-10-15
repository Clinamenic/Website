---
author: Spencer Saar Cavanaugh
authorURL: https://www.clinamenic.com
date: 2024-11-08
draft started: 2024-11-08
headDescription: Prospects of a bespoke folgezettel UUID system and other considerations.
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
subtitle: Prospects of a bespoke folgezettel UUID system and other considerations.
tags:
- personal-discourse/log
title: Notes on Experimental Zettelkasten Methodology (2)
type: notes
uuid: cecbb51f-fb07-456f-835d-36d4300fb89f
---

![[Boilerplate#Canvas Foreword]]

Having made some methodological progress since writing [[Notes on Experimental Zettelkasten Methodology]], it might be helpful to address how things have shifted, which areas of confusion have persisted, and which have newly arisen.

In short, while there remains a mind-numbing degree of complexity regarding zettelkasten structure and methodology, in light the particular motivations and goals at hand, there has nonetheless been achieved some degree of clarity.

For one, establishing the habit of writing extended contemplative notes like this has been helpful, both in terms of actively working through some of the more cognitively intensive areas of confusion, and in terms of synthesizing wide breadths of topics and technical considerations. I was originally calling these extended notes 'logs' but have since started calling them 'canvases' - a pedantic point, to be sure, but one which reveals the broader difficulty of the assignment of names to particular classes of items in the zettelkasten.

In this case, given the context of auto-discourse as established in [[A Primer on Auto-Discourse]], my motivations are as follows. I would like this zettelkasten to function primarily as a publication engine, similarly to what I gather Luhmann's motivations were. More specifically, I would like it to function as an open-access publication engine, open not only in the sense of generating publicly accessible discourse artifacts, but also open in terms of the thought process culminating in said artifacts.

This methodological preference is partially architectural in nature, taking on a wiki-like structure of internal links serving to semantically contextualize particular documents, but also in terms of epistemology. That is, notes like this should ideally serve to provide an open scaffolding around the more polished discursive artifacts, such that readers, should they choose, can more integrally interrogate the epistemic bearings of such discourse.

In other words, this particular zettelkasten, qua publication engine, involves a public substrate of notes serving to trace the provenance and evolution of the ideas contained in discursive artifacts. And for the sake of clarity, by 'discourse' I mean a particular genre of media, particularly text in my case, oriented around the communication of ideas, mostly for didactic purposes but also for larger exploratory purposes. In my case, the discourse in question is mostly intended to serve a purpose of sensemaking, which is not limited in scope to the provision of answers, but also to the surfacing of salient inquiries. This matter, however is better reserved for an extended note on the subject of auto-discourse.

As regards matter more particularly regarding zettelkasten structure and methodology, below are listed some examples of active uncertainties around best practices, given the particular motivations driving this zettelkasten.

1. Extended Notes: How best to format these extended notes, vis a vis more polished/structured publications, and vis a vis more atomic zettel-like notes. Also, how to format continuations of extended notes, such as this one.
2. Arweave Storage: How best to facilitate the process of Arweave-based storage for the purposes of:
   1. version tracking;
   2. providing versioning-friendly public URIs for documents, beyond this particular zettelkasten;
   3. mitigating linkrot.
3. Reference Notes: How best to format reference notes.
4. Transclusions: How and when to use transclusions, vis static blockquotes.
5. Object Types: How best to categorize object types such as reference notes, reference sources, extended notes, finished publications, and miscellaneous documents and logs.
6. UUIDs: How best to utilize an ID system to identify and track documents across their individual version histories.

## Extended Notes

As of now, I am using the title of the extended notes as the file name, and generated a UUID v4 for each one. As for the title, I am currently following a naming convention of 'Notes on Topic' such that successive notes would be 'Notes on Topic, (2)'.

My primary concerns regarding extended notes are: how, or even if, they can be constructed in a way to function as molecules/strings for more atomic/bead-like notes; how they can facilitate extensive canvassing of ideas and theses which can then be refined for more structured publications; and whether there even needs to be a unifying naming convention for the titles and, by extension, file names.

Setting aside the question of molecules/strings and atoms/beads until I have a better idea of how the latter category will manifest in the zettelkasten, what I am more equipped to address now is the matter of canvassing functionality. Such as it is, the extended notes are functioning well in this regard, and the question of formatting and ontology is so far fairly academic as far as this function is concerned.

Regarding a unified naming convention, what is important here is the hermeneutic calibration achieved by prefixes such as "Notes on ..." and "Reflections on ...", i.e. that they set can predispose the reader to engage with the text as a prototype or rhizome, rather than a formal text. The nuance of this hermeneutic calibration deserves further exploration, perhaps as part of a larger effort to refine the methodology of auto-discourse.

## Arweave Storage

Right now, I am using protocol.land github workflows to upload the entire public section of the repo to Arweave, and I am also using ArDrive to selectively upload certain files for reference, such as the scanned handwritten notes included in note hubs like [[r-JK-GT-Hub]] and [[r-TP-CS-Hub]]. In both cases, the URI for these resources consists of a URL to a given Arweave explorer (mainly Viewblock so far) with the Arweave hash appended at the end.

So far, I have not been tagging these uploads in such a way which proves conducive to the sort of querying practices I would like to adopt. I gather there are ways to utilize github workflows to do this. At any rate, my current goal in this respect is to upload these files to Arweave and tag them with a UUID (and maybe other tags too). Once tagged with a UUID (which would match the UUID in the frontmatter), then we can query arweave for that tag, and retrieve the version history of the file with that tag.

In light of this desired function, the actual structure of the UUID seems of minimal importance, just so long as it is sufficiently unique. Another edge case which occurred to me, however, is a situation in which someone else tags an upload with the same UUID, either accidentally or deliberately. In this case, I gather it is likely possible to modify the query to include the additional parameter of the wallet address, such that one could query for files with a certain tag, uploaded by a certain address.

Regardless of querying practices, the reliance on Arweave is in the interest of leveraging a publicly accessible and plausibly permanent database.

## Reference Notes

As of now, I am currently using a variation of the folgezettel file naming convention, consisting of a prefix denoted the category of reference note (r-), followed by the initials of the author (e.g. 'JK'), followed by the initials of the document (e.g. 'GT'), followed by the number of the note referencing that specific document (e.g. '25'), followed by the derivative number if there is one (e.g. '.1'). This example would amount to 'r-JK-GT-25.1' to refer to the direct derivative of the 25th note I made in explicit reference to [[The General Theory of Employment, Interest and Money]] by John Maynard Keynes.

Here is the note itself: [[z-25a]]. If the name differs from 'r-JK-GT-25.1' that means the naming convention has been changed.

So far, this naming convention has not had any serious problem, aside from the minor inconvenience of not being able to infer anything about the contents of the note based on its name, aside from the fact that it references a particular text. As I understand, this is considered a feature, rather than a bug, in certain zettelkasten designs, intended to facilitate spontaneous or unpredicted rediscovery of notes, wherein the user is not able to infer the exact content based on the file name alone.

### Methodological Transition

While the above describes the system I have been using so far to identify reference notes, I am presently experimenting with a different approach, wherein the naming components are expressed via tags and subtags. For example, the note named 'r-JK-GT-25.1' is tagged with '#r/JK/GT' which, in principle, alleviates the need to have those ID components in the file name itself.

Given this new tagging practice, reference notes can be included in a more monolithic naming convention, and still be effectively distinguished by their tags. For example, if I were to adopting the note type of "permanent notes" as recommended by the Zettelkasten Orthodoxy, I could have a reference note simply named '25' and tagged with '#r/JK/GT', a derivative or recursive reference note named '25.1' and also tagged with '#r/JK/GT' , and a permanent note named '26' and tagged with something like '#p'.

What is still unclear to me here is whether reference notes should, like extended notes, have their file name match their title, and indeed if they should even have a title. The exact essence of the problem evades me, if there even is a problem. In any event, until I am clearly convinced of a better practice, I will maintain the present one. Operationally, I am not faced with any difficulty by the present practice, beyond pure analytical fatigue entailed by the consideration of alternatives. That said, such consideration does force one to address the ontological foundations of their practices.

## Transclusions

At present, I am using transclusions when the content being transcluded belongs to a file which I am planning to continuous update in a dynamic fashion. For situations where the highlighted content in question is not intended to be dynamically updated, I use regular blockquotes.

Additionally, the utilization of transclusions is one of the distinguishing factors between extended notes and publications. Extended notes, such as this, can make use of transclusions because they are intended to be embedded within the zettelkasten, in terms of reader experience. More specifically, extended notes are, at present, intended to be read within my quartz site, seeing as that user interface renders transclusion notation in ways which cannot be expected from an arbitrary markdown reader, to my knowledge.

Publications, on the other hand, are intended to be read in more arbitary and interface-agnostic conditions, and thus cannot afford the interoperability drawbacks of incorporating transclusion notation. Moreover, because they are intended to be static documents, not containing any dynamically updated segments, there is no real purpose to using transclusions instead of standard blockquotes, as I understand.

Therefore, publications make use of blockquotes, where extended notes can make use of blockquotes and transclusions, depending on whether the highlighted content in question is intended to be dynamically updatable.

## Object Types

Another nagging taxonomic consideration is that of the range of object types. Again, much of this is pedantic and off-course as far as the zettelkasten priorities are concerned. That said, it is still worth some degree of consideration, seeing as this sort of formatting may become more critical as the zettelkasten grows and as LLMs may enter the methodology.

Right now, I have a folder for publications ('/publications), which has a subfolder for drafts ('drafts). I also have a folder for canvases ('canvas') which presently contains this extended note. For reference materials I have the reference folder ('reference'), and for notes, such as reference notes, I have a notes folder ('notes). Lastly, I have a catch-all folder for miscellaneous items ('miscellanea') which contains various logs and indexes and whatnot.

I am not attached to this directory structure, and frankly I find the involvement of folders and file paths in the slugification of page URLs rather annoying, in that it entails linkrot whenever the directory structure is adjusted. In this respect, I am considering adjusting the Quartz codebase such that just the file name or title is used as the slug, but I have not tested this yet.

## UUIDs

Currently, for notes in need of a UUID, I am using a UUID v4 generated by the following python script:

```python
import os
import uuid
import re
import yaml

def generate_uuid_for_files(directory):
	for root, dirs, files in os.walk(directory):
		for filename in files:
			if filename.endswith('.md'):
				filepath = os.path.join(root, filename)
				with open(filepath, 'r+') as file:
					content = file.read()
					frontmatter_match = re.search(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
					if frontmatter_match:
						frontmatter = frontmatter_match.group(1)
						# Parse the frontmatter as YAML
						try:
							fm_data = yaml.safe_load(frontmatter)
						except yaml.YAMLError:
							print(f"Error parsing frontmatter in {filepath}")
							continue

							# Check if 'publish' is true and 'uuid' exists and is empty
							if fm_data.get('publish') == True and 'uuid' in fm_data and (fm_data['uuid'] is None or fm_data['uuid'] == ''):
								new_uuid = str(uuid.uuid4())
								fm_data['uuid'] = new_uuid

								# Convert the updated frontmatter back to YAML
								new_frontmatter = yaml.dump(fm_data, default_flow_style=False)
								new_content = content.replace(frontmatter, new_frontmatter)

								file.seek(0)
								file.write(new_content)
								file.truncate()
								print(f"Added UUID to {filepath}: {new_uuid}")

if __name__ == "__main__":
	directory = input("Enter the directory path: ")
	generate_uuid_for_files(directory)
```

This lets me generate UUIDs (e.g. '8166b4bc-4b46-4aba-be6d-e59607cc4aac') for new markdown files which have 'publish: true' and 'uuid: null' in their frontmatter. I just need to specify the directory, which is 'content' according to the default Quartz layout.

Some of these considerations lead me to ponder the prospects of a bespoke UUID system which can incorporate a codified representation of object category (e.g. r-, p-, etc), some adequately collision-proof alphanumeric sequence to uniquely identify the object itself, and some folgezettel-esque suffix component to denote recursive or derivative objects. I would want the UUID to be fixed across versions of the document, so that I can track a document across its version history, querying Arweave as a universal archive.

## A Capacity for Flux

Ultimately, in this case, I think work in the system beats working the system. That is, the system will remain in ontological flux until experience justifies a more permanent adoption of certain ontological facets of the system.