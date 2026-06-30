---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI: http://i.ibb.co/pjV24YTb/second-brain.png
date: 2026-05-26
keywords:
language: en
license:
ogSiteName: Clinamenic LLC
ogType: website
publish: true
subtitle: Personal knowledge management practices for permalinks, tag-based file organization, and metadata schemas that can evolve with your needs
tags:
title: PKM Techniques for Stable Links, Flexible Tags, and Evolving Metadata
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: publication
uuid: 3aa586c4-05db-4801-a58d-9a641d255be8
publication-url:
---

In this article, we will cover a few practices and methodologies for personal knowledge management, specifically oriented around Obsidian. These practices are a work in progress, and have been evolving over time, according to changing technical constraints and user priorities.

In my case, I have a multi-purpose personal knowledge management (PKM) system, or second brain, which functions as a journal, rolodex, bookmark library, website, and more. Personally, I'm of the notion that one's practices should gradually be tailored to one's need, a process which takes time and often involves tension between practical usability and ontological elegance. It's tempting to prematurely fixate on the schemas and frameworks, but just remember that as you start using your second brain, its formal needs can become more evident.

## UUID Permalinking

If you are managing your own website, regardless of whether there is an integrated PKM system, you have likely had the experience of moving or renaming a page, causing existing links to that page to break. This phenomenon, of live links breaking due to a variety of reasons, is called linkrot. If you are maintaining a personal website, or especially an institutional website, mitigating linkrot can become a serious consideration.

In the case of moving/renaming pages or assets in a website, there is a tension between keeping these pages available via a fixed URL, and letting the site evolve and change structure as needed. For example, right now you may have separate folders in your site for example.com/recipes and example.com/articles, but eventually you may wish to consolidate your recipes and articles into example.com/blog. This would simplify the structure of the site, but it would also break any existing links you've shared for your recipes or articles.

One way to address this is via permalinks, or alternative links which are designed to not change. Permalinks can redirect visitors to pages with URLs that can change. Quartz, a static site builder which was designed with Obsidian in mind, has a built-in permalink system. In my case, I customized it to use a UUID as the URL slug. Each page has a UUID (this page's UUID is 3aa586c4-05db-4801-a58d-9a641d255be8), which gets appended to the base website domain to create a permalink for that page.

For example, below is the URL for an article I wrote:

- [https://www.clinamenic.com/writing/A-Rhapsody-on-Neurodiversity](https://www.clinamenic.com/writing/A-Rhapsody-on-Neurodiversity')

If I were to move this article (a markdown file named ‘A Rhapsody on Neurodiversity.md’) from the ‘writing’ folder to another folder, say ‘blog’, the above link would no longer work, and the article would then be available at the following:

- [https://www.clinamenic.com/blog/A-Rhapsody-on-Neurodiversity](https://www.clinamenic.com/blog/A-Rhapsody-on-Neurodiversity)

Because I have UUID permalinks enabled, I can use the following stable link to point to the current URL for that article, even if I move the article to a different folder:

- [https://www.clinamenic.com/245497b4-8ced-46b3-a841-d8e683c09373](https://www.clinamenic.com/245497b4-8ced-46b3-a841-d8e683c09373)

This means that I can share and publish the above permalink without the tension of knowing that the link will break if I change the article title or move it to a different folder.

How does this work? I write the article as a markdown file in Obsidian, and I have a new UUID automatically generated in its frontmatter. Then, when I rebuild the site with Quartz, the markdown file is converted to an HTML webpage, and Quartz maps the UUID to the file path slug of the webpage. Every time I make changes to my site, Quartz rebuilds it as a static site, ensuring that this UUID mapping remains accurate. For UUID generation, I use the Templater plugin to create new notes with the following frontmatter field:

```
uuid: "<%* function generateUUID() {  let dt = new Date().getTime();  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {    let r = (dt + Math.random() * 16) % 16 | 0;    dt = Math.floor(dt / 16);    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);  });  return uuid;}tR += generateUUID(); %>"
```

There are some tradeoffs with this permalinking system, such as how URL previews are generated on sites like Twitter, but they are beyond the scope of this piece. If anyone wants to learn more about these tradeoffs, consider consulting me.

## Tags over Folders

One of the things we hear from many avid users of Obsidian and similar PKM tools, is how tags make for a better organizational system than folders. There are tradeoffs, but the argument is that tags are more extensive and flexible, in terms of grouping and labeling files. If you are using folders to group files, you may encounter situations where a file ought to belong to multiple groups, but can only be in one folder. With tags, you can just apply multiple tags to files which need multiple labels.

For example, if you wrote a recipe for apple pie, which includes notes about how you refined that recipe, you may get caught up in indecision around whether to put that file in the 'recipes' folder or the 'notes' folder. Instead of relying on folders to serve as labels, you can apply multiple tags to that file's frontmatter, as follows:

```yaml
tags:
  - article
  - recipe
```

Then, in Obsidian, you can selectively surface all files which share a given tag or set of tags. You can use the Dataview plugin to create dynamic tables that can query frontmatter. Alternatively, Obsidian Bases allows for this, by filtering for a particular tag:

```
file.tags.contains("recipe")
```

The logic and benefits of tags, in this respect, generalizes beyond the literal _tags_ frontmatter field. You can set a custom frontmatter field, with a value type of list, to create a custom tag-like organizing structure. This can be useful if you want to keep one set of labels distinct from another, such that they can both be used for a given file, while retaining taxonomic independence.

Of course, this is only advisable if you're comfortable collapsing 'article' and 'recipe' from distinct types into mere labels, or values for the tag field. There are situations where you may wish to keep these separate, such as if you have a particular frontmatter schema for articles, and another for recipes. In that case, both of those file types can exist in the same folder, or in different folders, depending on your needs.

One reason to separate things by folder, is if you want to conveniently track that folder as a git repository. For example, I keep journal entries in a 'journal' folder, because I separately track those files in an independent repo. I also have a separate folder for 'writing' and 'recipes' and each of these has their own frontmatter schema, with a distinguishing _type_ value, which I will cover in the next section.

## Malleable Metadata

Similar to the earlier consideration around the file path of a page changing over time, sometimes metadata can change over time. If we're being realistic, it is arguably worth admitting that our priorities and technical constraints change over time, and that our practices should be accordingly dynamic. Some metadata, like UUID, shouldn't change over time, while some, like tags or other custom fields, are intended to expand and evolve along with the context around that page. For example, you may eventually become a vegetarian, and you may wish to retroactively apply tags like 'vegetarian' to the 'tags' field of your recipes.

The premise here is that some metadata can be malleable. In fact, this can even have the effect of diminishing the pressure you feel to perfect your schemas and metadata framework up front. Knowing that you have the option to eventually change these things, without breaking your system or its organizing logic, can empower you to create, unburdened by taxonomic minutiae.

For example, I just reactivated my Substack account, after several years of dormancy, and migrated a bunch of blog posts from my website onto my Substack publication. In doing so, I added a new field called 'publication-url' to my articles' frontmatter, as follows:

```
---
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
bannerURI: https://arweave.net/xyErVkoWdB0uDWV5a5onev40x8gZBSd8yINxgzKKOrE
date: 2023-01-17
keywords:
  - autodidacticism
  - neurodiversity
  - neuroplasticity
language: en
license: CC BY-SA 4.0
ogSiteName: Clinamenic LLC
ogType: website
publish: true
subtitle: Reflections on auto-didacticism and neurodiversity
tags:
  - personal-discourse
  - text
title: A Rhapsody on Neurodiversity
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: writing
uuid: 245497b4-8ced-46b3-a841-d8e683c09373
publication-url: https://solosalon.substack.com/p/a-rhapsody-on-neurodiversity
---
```

In this case, there are various fields which are likely to change over time. In the case of this article, I may add more tags or keywords (keywords are used by Quartz for SEO purposes, with respect to the final HTML webpage metadata). If I ever change my website to a different domain, I would update the 'authorURL' field value. Other fields, like UUID and date, are intended to remain fixed across time.

Notice the 'type: writing' frontmatter property in the example above. This is the primary way I distinguish schemas and their corresponding templates. Below is an example of the schema I use for journal entries, populated with dummy content:

```
---
uuid: ddf62a97-a2b1-4fbd-a5e2-0520a1903978
date: 2020-02-03 00:00:00+00:00
people:
  - "[[Adaeze Nwosu]]"
  - "[[Emil Kowalski]]"
  - "[[Oscar Nguyen]]"
  - "[[Lucas Ferreira]]"
  - "[[Kira Vogel]]"
recipes:
  - "[[French Onion Soup]]"
type: journal-entry
films-watched: null
previous_entry: "[[Journal 2020-02-02 Sun]]"
next_entry: "[[Journal 2020-02-04 Tue]]"
media_attachments: null
has-content: true
---

Made [[French Onion Soup]] for dinner. Spent time with [[Adaeze Nwosu]] and [[Emil Kowalski]]. Everyone asked for the recipe afterward.

```

Notice how this journal entry (type: journal-entry) contains internal links to French Onion Soup (type: recipe) and Kira Vogel (type: contact) in the frontmatter. These each follow their own schema, such as the following for contacts:

```
---
type: contact
first-name: Kira
last-name: Vogel
aliases:
location: Vienna, Austria
address: Kärntner Straße 18
email: kira.vogel@email.com
phone: +43 664 1234567
eth-address:
birthday: 10-07
social-context:
uuid: 73197335-478c-4e07-8af8-b85a6f1cb028
---
```

Across these various schemas, much of the metadata can change, whether that be renaming the field or value for a given frontmatter property, or adding/removing values from lists, like tags. The importance of the ability to edit metadata may become more evident as one begins to use Obsidian Bases or comparable methods for navigating large corpuses of knowledge. See below how one can use Obsidian Bases to create tables for contacts:

![](https://i.ibb.co/9knR01cb/Screenshot-2026-05-21-at-10-28-26-AM.png)

Or for journal entries:

![](https://i.ibb.co/hFxTc7QK/Screenshot-2026-05-21-at-10-29-15-AM.png)

The same could be done for blog posts, website pages, recipes, zettelkasten notes, bookmarks, and more.

## Semantic Dynamism

Overall, there is an important tension between constancy (in the effort to mitigate linkrot) and dynamism (to accommodate a shifting context of intentions and technical constraints). Within the knowledge management paradigm of markdown files, and interfaces like Obsidian which operate as harnesses for your knowledge base, frontmatter properties are a powerful feature, even if they can seem unwieldy and overcomplicated at first.
