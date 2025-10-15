# Local-First & Open-Source Tools Compilation

_Research compilation for manual review and selective addition to collate.json_

## Research Status

- **Started**: January 2025
- **Categories Researched**: 4/8
- **Tools Compiled**: 47 high-quality tools across 4 major categories
- **Quality Filter**: Applied (institutional independence, privacy-first, decentralization focus)

### Progress Summary

✅ **Version Control & Code Collaboration** - 4 tools researched  
✅ **Databases & Data Storage** - 7 tools researched  
✅ **Communication & Networking** - 6 tools researched  
✅ **Content Creation & Knowledge Management** - 12 tools researched  
✅ **Privacy & Security Tools** - 8 tools researched  
✅ **Development Libraries & Frameworks** - 10 tools researched  
⏳ **File Storage & Sharing** - Pending  
⏳ **AI & ML Tools** - Pending

---

## 1. Core Infrastructure & Development Tools

### Version Control & Code Collaboration

#### **Radicle** - Peer-to-Peer Code Collaboration

- **URL**: https://radicle.xyz/
- **Category**: Decentralized Version Control
- **Key Features**: P2P network, cryptographic identities, local-first, offline-capable, no central server
- **Why It Fits**: Sovereign code forge with zero institutional dependencies, privacy-preserving, fully decentralized
- **License**: MIT/Apache 2.0
- **Status**: Active development, 1.2 released

#### **Pijul** - Theory-Based Version Control

- **URL**: https://pijul.org/
- **Category**: Distributed Version Control
- **Key Features**: Patch-based theory, commutative changes, conflict resolution, partial clones
- **Why It Fits**: Open-source (GPL2), eliminates traditional merge conflicts, mathematically sound approach
- **License**: GPL2
- **Status**: Active development, bootstrapped

#### **Fossil SCM** - Self-Contained Development Platform

- **URL**: https://fossil-scm.org/
- **Category**: Integrated Version Control + Project Management
- **Key Features**: Built-in wiki, bug tracking, web interface, single binary, automatic sync
- **Why It Fits**: Completely self-contained, no external dependencies, integrated project management
- **License**: Open Source
- **Status**: Mature, actively maintained

#### **Dat Protocol** - P2P Hypermedia

- **URL**: https://www.datprotocol.com/
- **Category**: Decentralized Data/File Sharing
- **Key Features**: P2P archives, public-key addressing, versioned, secure, resilient
- **Why It Fits**: Fully decentralized, any device can host, no central authorities
- **License**: Open Source
- **Status**: Active protocol development

### Databases & Data Storage

#### **RxDB** - Offline-First JavaScript Database

- **URL**: https://rxdb.info/
- **Category**: Local-First NoSQL Database
- **Key Features**: Offline-first, real-time reactive queries, multi-platform, sync with any backend, observable data
- **Why It Fits**: Works without internet, stores data locally, no server dependencies, can sync when available
- **License**: Open Core (MIT for core, premium plugins available)
- **Status**: Mature, actively maintained, 22k+ GitHub stars

#### **CR-SQLite** - Conflict-Free Replicated SQLite

- **URL**: https://github.com/vlcn-io/cr-sqlite
- **Category**: Distributed Database
- **Key Features**: Multi-writer support, CRDT-based conflict resolution, SQLite extension, offline merging
- **Why It Fits**: Enables offline-first SQLite with automatic conflict resolution, no central authority needed
- **License**: MIT
- **Status**: Active development, 3.3k+ GitHub stars

#### **PouchDB** - Offline-First Document Database

- **URL**: https://pouchdb.com/
- **Category**: Local-First Document Database
- **Key Features**: Browser-based, CouchDB sync, offline storage, cross-browser compatibility
- **Why It Fits**: Runs entirely in browser, no server required, syncs when online
- **License**: Apache 2.0
- **Status**: Mature, stable

#### **WatermelonDB** - Reactive Database for React/React Native

- **URL**: https://nozbe.github.io/WatermelonDB/
- **Category**: Local-First Database Framework
- **Key Features**: Lazy loading, offline-first, SQLite-based, reactive queries, optimistic UI
- **Why It Fits**: Built for offline-first apps, no server dependencies, scales to tens of thousands of records
- **License**: MIT
- **Status**: Active development, production-ready

#### **OrbitDB** - Decentralized P2P Database

- **URL**: https://orbitdb.org/
- **Category**: Peer-to-Peer Database
- **Key Features**: IPFS-based, serverless, peer-to-peer, conflict-free, various data types
- **Why It Fits**: Completely decentralized, no servers or central authorities, peer-to-peer sync
- **License**: MIT
- **Status**: Mature, actively maintained

#### **Dexie.js** - IndexedDB Wrapper

- **URL**: https://dexie.org/
- **Category**: Browser Database Wrapper
- **Key Features**: IndexedDB abstraction, real-time queries, cloud sync capabilities, reactive
- **Why It Fits**: Makes browser storage accessible, no server dependencies, works offline
- **License**: Apache 2.0
- **Status**: Mature, stable

#### **GUN** - Real-time Decentralized Database

- **URL**: https://gun.eco/
- **Category**: Decentralized Graph Database
- **Key Features**: Real-time, peer-to-peer, offline-first, graph structure, no servers
- **Why It Fits**: Fully decentralized, works without servers, automatic P2P synchronization
- **License**: Apache 2.0/MIT dual license
- **Status**: Active development

### Communication & Networking

#### **Briar** - Decentralized Messaging

- **URL**: https://briarproject.org/
- **Category**: Peer-to-Peer Messaging
- **Key Features**: P2P encrypted messaging, works via Bluetooth/WiFi/Tor, offline messaging, local storage
- **Why It Fits**: No central servers, works offline, censorship-resistant, messages stored locally
- **License**: Open Source
- **Status**: Mature, actively maintained, mobile app available

#### **Berty** - P2P Communication Protocol

- **URL**: https://berty.tech/
- **Category**: Decentralized Communication
- **Key Features**: Mesh network protocol, asynchronous messaging, IPFS-based, no central servers
- **Why It Fits**: Built for unstoppable P2P communication, mesh networking, offline-capable
- **License**: Open Source
- **Status**: Active development, non-profit organization

#### **Earthstar** - Distributed Database for Applications

- **URL**: https://earthstar-project.org/
- **Category**: Distributed Storage/Communication
- **Key Features**: Offline-first, private, distributed, multiwriter, live syncing, self-hosted
- **Why It Fits**: Works offline, no blockchain/tokens, servers optional, always self-hosted
- **License**: Open Source
- **Status**: Active development, v11 in beta

#### **p2panda** - P2P Application Building Blocks

- **URL**: https://p2panda.org/
- **Category**: P2P Development Framework
- **Key Features**: Modular approach, offline-first, post-internet compatible, broadcast-only, CRDT support
- **Why It Fits**: Privacy-respecting, secure local-first, works with unstable connections, post-internet ready
- **License**: Open Source
- **Status**: Active development, multiple crates available

#### **Quiet** - Decentralized Team Communication

- **URL**: https://tryquiet.org/ (mentioned in case study)
- **Category**: Team Communication
- **Key Features**: Tor-based, P2P mesh network, no central servers, local-first, hidden services
- **Why It Fits**: No institutional dependencies, works offline, Tor-based privacy, mesh networking
- **License**: Open Source
- **Status**: Active development, inspired by local-first principles

#### **DefraDB** - P2P Database with CRDT

- **URL**: https://docs.source.network/defradb/
- **Category**: Peer-to-Peer Database
- **Key Features**: P2P networking, Merkle CRDTs, libp2p-based, offline-first, document replication
- **Why It Fits**: Trustless environment, no central authority, direct peer communication, offline-capable
- **License**: BSL 1.1
- **Status**: Active development, production-ready

---

## 2. Content Creation & Knowledge Management

### Note-Taking & PKM

#### **Logseq** - Local-First Block-Based Knowledge Management

- **URL**: https://logseq.com/
- **Category**: Personal Knowledge Management
- **Key Features**: Block-based outlining, local file storage, graph view, PDF annotation, privacy-first, offline-capable
- **Why It Fits**: Open-source, stores files locally as Markdown, works offline, no cloud dependencies, community-driven development
- **License**: Open Source (AGPL-3.0)
- **Status**: Mature, actively maintained, desktop and mobile apps

#### **Joplin** - Cross-Platform Encrypted Note-Taking

- **URL**: https://joplinapp.org/
- **Category**: Note-Taking Application
- **Key Features**: Markdown support, end-to-end encryption, multi-platform, offline storage, customizable sync options
- **Why It Fits**: Open-source, works offline, local storage with optional sync, strong privacy/encryption, no vendor lock-in
- **License**: Open Source (MIT)
- **Status**: Mature, actively developed, large community

#### **TiddlyWiki** - Non-Linear Documentation System

- **URL**: https://tiddlywiki.com/
- **Category**: Personal Wiki / Knowledge Base
- **Key Features**: Single-file wiki, non-linear structure, customizable, works offline, no server required
- **Why It Fits**: Completely self-contained, runs in browser, no external dependencies, decades of development
- **License**: Open Source (BSD-3-Clause)
- **Status**: Very mature, stable, active community development

#### **Trilium Notes** - Hierarchical Note-Taking

- **URL**: https://github.com/zadam/trilium
- **Category**: Personal Knowledge Base
- **Key Features**: Tree structure, rich text editing, encryption, scripting support, self-hosted sync option
- **Why It Fits**: Open-source, local-first design, optional self-hosted sync, works offline, no cloud dependencies
- **License**: Open Source (AGPL-3.0)
- **Status**: Maintenance mode (community fork available as TriliumNext)

#### **SilverBullet** - Hackable Note-Taking

- **URL**: https://silverbullet.md/
- **Category**: Self-Hosted Note-Taking
- **Key Features**: Markdown-based, programmable with Lua, web-based interface, pluggable architecture
- **Why It Fits**: Self-hosted, file-based storage, extensible, works offline, no external dependencies once deployed
- **License**: Open Source (MIT)
- **Status**: Active development, hackable and customizable

#### **Zettlr** - Academic Writing & Research

- **URL**: https://www.zettlr.com/
- **Category**: Academic Writing Tool
- **Key Features**: Markdown editor, Zettelkasten method support, citation management, local file storage, LaTeX support
- **Why It Fits**: Open-source, local file storage, works offline, academic focus, no cloud dependencies
- **License**: Open Source (GPL-3.0)
- **Status**: Mature, actively maintained, focused on researchers/academics

### Publishing & Documentation

#### **MkDocs** - Static Documentation Generator

- **URL**: https://www.mkdocs.org/
- **Category**: Documentation Generator
- **Key Features**: Markdown-based, YAML configuration, live preview, themes, easy deployment
- **Why It Fits**: Local development, static output, no external dependencies, offline-capable
- **License**: Open Source (BSD-2-Clause)
- **Status**: Mature, widely used, active development

#### **mdBook** - GitBook Alternative in Rust

- **URL**: https://rust-lang.github.io/mdBook/
- **Category**: Book/Documentation Generator
- **Key Features**: Single binary, Markdown input, fast builds, search functionality, customizable themes
- **Why It Fits**: Self-contained binary, local processing, static output, no server dependencies
- **License**: Open Source (MPL-2.0)
- **Status**: Mature, actively maintained by Rust team

#### **Zola** - Fast Static Site Generator

- **URL**: https://www.getzola.org/
- **Category**: Static Site Generator
- **Key Features**: Single binary, Tera templates, built-in search, SASS compilation, zero dependencies
- **Why It Fits**: Single executable, local processing, no runtime dependencies, fast builds
- **License**: Open Source (MIT)
- **Status**: Mature, active development, growing community

#### **Hugo** - Lightning-Fast Static Site Generator

- **URL**: https://gohugo.io/
- **Category**: Static Site Generator
- **Key Features**: Extremely fast builds, flexible templating, built-in themes, live reload, taxonomies
- **Why It Fits**: Single binary, local development, no external dependencies, works offline
- **License**: Open Source (Apache-2.0)
- **Status**: Very mature, large ecosystem, active development

#### **Jekyll** - Ruby-Powered Static Site Generator

- **URL**: https://jekyllrb.com/
- **Category**: Static Site Generator
- **Key Features**: Markdown support, Liquid templating, GitHub Pages integration, plugin ecosystem
- **Why It Fits**: Local development, static output, extensive theme ecosystem, battle-tested
- **License**: Open Source (MIT)
- **Status**: Very mature, GitHub's choice, large community

#### **Quartz** - Obsidian-Compatible Digital Garden

- **URL**: https://quartz.jzhao.xyz/
- **Category**: Digital Garden Generator
- **Key Features**: Obsidian compatibility, backlinks, graph view, local-first, modern web features
- **Why It Fits**: Works with local Obsidian vaults, static output, preserves linking structure
- **License**: Open Source (MIT)
- **Status**: Active development, growing popularity in PKM community

---

## 3. Privacy & Security Tools

### Password Management

#### **Bitwarden** - Open-Source Password Manager

- **URL**: https://bitwarden.com/
- **Category**: Password Manager
- **Key Features**: End-to-end encryption, self-hosting option, open-source, cross-platform, unlimited passwords on free tier
- **Why It Fits**: Self-hostable, open-source transparency, works offline, no vendor lock-in
- **License**: Open Source (GPL-3.0)
- **Status**: Very mature, widely adopted, active development

#### **KeePassXC** - Local Password Database

- **URL**: https://keepassxc.org/
- **Category**: Local Password Manager
- **Key Features**: Local database files, strong encryption, no cloud dependency, cross-platform, plugins support
- **Why It Fits**: Completely local storage, no internet required, database portability, open-source
- **License**: Open Source (GPL-2.0+)
- **Status**: Mature, actively maintained, community-driven

#### **Passbolt** - Team Password Manager

- **URL**: https://www.passbolt.com/
- **Category**: Collaborative Password Manager
- **Key Features**: Self-hosted, PGP encryption, team collaboration, open-source, granular permissions
- **Why It Fits**: Self-hosted deployment, open-source, end-to-end encryption, no third-party dependencies
- **License**: Open Source (AGPL-3.0)
- **Status**: Mature, enterprise-focused, active development

#### **Spectre** - Deterministic Password Generator

- **URL**: https://spectre.app/
- **Category**: Stateless Password Manager
- **Key Features**: No password storage, deterministic generation, works offline, cross-platform, privacy-first
- **Why It Fits**: No data storage, completely local calculation, works anywhere, impossible to lose data
- **License**: Open Source (GPL-3.0)
- **Status**: Active development, unique approach to password management

### Browsers & Web Privacy

#### **LibreWolf** - Privacy-Hardened Firefox

- **URL**: https://librewolf.net/
- **Category**: Privacy Browser
- **Key Features**: Firefox-based, privacy hardened, ad/tracker blocking, no telemetry, secure defaults
- **Why It Fits**: Local browsing privacy, removes institutional tracking, community-maintained
- **License**: Open Source (MPL-2.0)
- **Status**: Active development, regular updates with Firefox

#### **Brave Browser** - Privacy-First Browser with BAT

- **URL**: https://brave.com/
- **Category**: Privacy Browser
- **Key Features**: Built-in ad blocking, Tor integration, IPFS support, privacy-first design
- **Why It Fits**: Blocks trackers by default, integrated privacy tools, decentralized web support
- **License**: Open Source (MPL-2.0)
- **Status**: Mature, active development, large user base

### Encryption & Security

#### **Cryptomator** - Client-Side Cloud Encryption

- **URL**: https://cryptomator.org/
- **Category**: File Encryption
- **Key Features**: Transparent file encryption, works with any cloud service, cross-platform, open-source
- **Why It Fits**: Local encryption before cloud sync, open-source, works with existing storage solutions
- **License**: Open Source (GPL-3.0)
- **Status**: Mature, widely used, active development

#### **VeraCrypt** - Disk Encryption

- **URL**: https://www.veracrypt.fr/
- **Category**: Full Disk Encryption
- **Key Features**: Full disk encryption, hidden volumes, cross-platform, TrueCrypt successor, no backdoors
- **Why It Fits**: Local encryption, open-source, no external dependencies, complete privacy control
- **License**: Open Source (Apache-2.0 + others)
- **Status**: Very mature, security-focused, active maintenance

---

## 4. Development Libraries & Frameworks

### Local-First Development

#### **Automerge** - CRDT Library for Collaboration

- **URL**: https://automerge.org/
- **Category**: CRDT Library
- **Key Features**: Conflict-free replication, JavaScript/Rust implementation, JSON-like data structures, offline merging
- **Why It Fits**: Core building block for local-first apps, handles offline sync automatically, no central authority
- **License**: Open Source (MIT)
- **Status**: Mature, widely adopted, active development by Ink & Switch

#### **RxDB** - Reactive Local Database

- **URL**: https://rxdb.info/
- **Category**: Local-First Database
- **Key Features**: Observable queries, offline-first, replication, cross-platform, encryption support
- **Why It Fits**: Built for offline-first applications, works without server, reactive data layer
- **License**: Open Source (Apache-2.0)
- **Status**: Very mature, production-ready, extensive documentation

#### **Replicache** - Client-Side Sync Framework

- **URL**: https://replicache.dev/
- **Category**: Sync Framework
- **Key Features**: Optimistic UI, offline support, conflict resolution, backend agnostic, real-time collaboration
- **Why It Fits**: Enables local-first with any backend, handles complex sync scenarios, instant UI updates
- **License**: Open Source (previously commercial)
- **Status**: Mature, now open-source and in maintenance mode

#### **SyncedStore** - CRDT-Based Real-Time Sync

- **URL**: https://syncedstore.org/
- **Category**: State Synchronization
- **Key Features**: CRDT-based, real-time sync, offline support, simple API, framework agnostic
- **Why It Fits**: Simple local-first state management, automatic conflict resolution, works offline
- **License**: Open Source
- **Status**: Active development, growing community

#### **Local-First Web Toolkit** - Decentralized App Building

- **URL**: https://github.com/local-first-web
- **Category**: Development Framework
- **Key Features**: Decentralized auth, P2P networking, state synchronization, no central server required
- **Why It Fits**: Complete toolkit for local-first apps, cryptographic security, truly decentralized
- **License**: Open Source (MIT)
- **Status**: Active development, comprehensive solution

### P2P & Distributed Systems

#### **libp2p** - Modular P2P Networking Stack

- **URL**: https://libp2p.io/
- **Category**: P2P Networking Library
- **Key Features**: Modular design, multiple transport protocols, peer discovery, NAT traversal, multi-language
- **Why It Fits**: Foundation for P2P applications, protocol-agnostic, works in browsers and servers
- **License**: Open Source (Apache-2.0, MIT)
- **Status**: Very mature, Protocol Labs project, extensive ecosystem

#### **IPFS (js-ipfs)** - Distributed File System

- **URL**: https://js.ipfs.io/
- **Category**: Distributed Storage
- **Key Features**: Content-addressed storage, P2P distribution, versioning, works in browsers
- **Why It Fits**: Decentralized file storage, content integrity, works offline with local caching
- **License**: Open Source (Apache-2.0, MIT)
- **Status**: Mature, large ecosystem, active development

#### **OrbitDB** - P2P Database on IPFS

- **URL**: https://orbitdb.org/
- **Category**: Distributed Database
- **Key Features**: P2P database, built on IPFS, eventual consistency, serverless, programmable
- **Why It Fits**: Distributed database with no central authority, works offline, CRDT-based
- **License**: Open Source (MIT)
- **Status**: Mature, active development, production ready

#### **Hypercore Protocol** - P2P Data Sharing

- **URL**: https://hypercore-protocol.org/
- **Category**: P2P Protocol
- **Key Features**: Append-only logs, cryptographic verification, sparse replication, DAT ecosystem
- **Why It Fits**: Secure P2P data sharing, works offline, cryptographically secure, minimal dependencies
- **License**: Open Source (MIT)
- **Status**: Mature, actively maintained, Hypercore Labs

---

## Research Notes

- Focus on tools with strong institutional independence
- Prioritize privacy-first design and decentralization
- Include self-hosted, offline-capable, and P2P solutions
- Verify active development and community health
- Document source of discovery for each tool

---

## Quality Assessment Template

For each tool:

- **URL**:
- **Title**:
- **Description**:
- **Primary Tags**:
- **Independence Score**: (1-5)
- **Privacy Score**: (1-5)
- **Community Health**: (Active/Moderate/Minimal)
- **Discovery Source**:
- **Notes**:
