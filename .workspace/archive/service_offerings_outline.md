---
title: Service Offerings Outline
date: 2024-07-27
publish: false
---

## Overview

This document outlines the structure for Clinamenic LLC's service offerings, designed for clarity, standardization (aligning with the proposed XML schema in `Service Schema Scoping.md`), market appeal, and profitability based on consulting best practices. It covers Governance, Knowledge Management, and Branding services, incorporating tiered packages, retainers, and value-based options.

## General Pricing Philosophy

- **Value-Oriented:** Even for fixed-fee or retainer models, pricing should reflect the _value_ and _outcomes_ delivered, not just estimated time.
- **Tiered Options:** Where appropriate, offer 2-3 options (e.g., Bronze/Silver/Gold or Foundational/Comprehensive/Strategic) to provide choice and anchor value.
- **Clear Scope:** Define deliverables, assumptions, and exclusions meticulously to manage scope creep, especially for fixed-fee projects.
- **Retainer Definition:** Clearly define access methods, response times, and scope for retainers (e.g., specific number of hours/sessions per month, defined deliverables).

## Service Categories

### 1. Governance Services

- **Description:** Configuration, auditing, and implementation of governance frameworks, specializing in on-chain organizations and smart contract-based structures.
- **Target Audience:** DAOs, startups, established corporations exploring decentralized or transparent governance models.
- **Schema Alignment:** `<Category>Governance</Category>`

- **Potential Packages (Fixed-Fee, Tiered Options Recommended):**

  - **Governance Audit:**
    - _Option 1 (Diagnostic):_ High-level review, risk identification report.
    - _Option 2 (Comprehensive):_ Detailed analysis, benchmarking, actionable recommendations document, presentation.
    - `Schema <Package>`: `Name="Governance Audit - Diagnostic"`, `Name="Governance Audit - Comprehensive"`
  - **Governance Framework:**
    - _Option 1 (Template + Review):_ Adapt existing templates (e.g., Pre-Constitutional Governance), document framework, review client/developer-created technical implementation specifications.
    - _Option 2 (Bespoke + Guided Spec):_ Design bespoke framework via deep discovery, document framework & implementation roadmap, facilitate workshops to create detailed technical specifications.
    - `Schema <Package>`: `Name="Gov Design & Support - Template+Review"`, `Name="Gov Design & Support - Bespoke+Guided"`
  - **Onchain Grants Program Design & Management:**
    - _Option 1 (Program Design):_ Design grant program structure, application process, evaluation criteria, milestone tracking/attestation framework (per Progressive Public Goods Funding concepts).
    - _Option 2 (Design & Management):_ Option 1 + Support setting up onchain tooling (e.g., Grants Stack) and manage the execution of one grant round (application review coordination, results compilation).
    - `Schema <Package>`: `Name="Grants Program - Design"`, `Name="Grants Program - Design+Mgmt"`

- **Potential Retainers (Monthly Fixed Fee):**

  - **Governance Advisory Retainer:** (Clearly define access: e.g., 2x 1hr calls/month + limited email support for strategic questions) - Good for ongoing guidance.
    - `Schema <Offering>`: Model as recurring service, specify access terms.
  - **Governance Council Support:** Facilitation support for regular governance meetings, proposal reviews (define frequency/scope).
  - **Grants Council Support:** Participate as an expert reviewer/advisor on a client's grants council (define scope: e.g., review X applications per cycle, attend Y meetings, provide evaluation summaries).
  - **Implementation Oversight:** Project management retainer during active implementation (define duration/deliverables).

- **Potential Value-Based/Success Fees:**
  - Consider for large-scale implementations where value (e.g., operational efficiency gain, risk reduction) can be clearly quantified _before_ the project and agreed upon with the client. Requires strong discovery and client buy-in.

### 2. Knowledge Management Services

- **Description:** Design, setup, and optimization of personal and organizational knowledge bases (wikis), specializing in open, local-first architectures (Quartz, Obsidian, Cursor).
- **Target Audience:** Individuals, teams, organizations seeking structured knowledge systems.
- **Schema Alignment:** `<Category>Knowledge Management</Category>`

- **Existing Packages (Fixed-Fee, Consider Tiering):**

  - **Personal Knowledge Base:**
    - _Standard:_ Base setup utilizes standard Quartz features on a markdown-based architecture, optimized for Obsidian/Cursor and optionally archived via Arweave.
    - _Potential 'Premium' tier:_ Standard tier + personalized training session, custom theme elements, advanced plugin configuration, **plus potential development of bespoke features or modules tailored to specific client needs within the Quartz/Markdown environment.**
    - `Schema <Package>`: `Name="Personal KB - Standard"`, `Name="Personal KB - Premium"`
  - **Organizational Knowledge Base:** (\$1500 base)
    - _Could be positioned as the 'Standard Org' tier._ Base setup utilizes standard Quartz features on a markdown-based architecture, optimized for Obsidian/Cursor, with basic Git submodules for teams, and optionally archived via Arweave.
    - _Potential 'Premium Org' tier:_ Standard Org tier + advanced Git submodule strategy, dedicated admin training, workflow integration consultation, **plus potential development of bespoke features or modules tailored to specific organizational needs within the Quartz/Markdown environment.**
    - `Schema <Package>`: `Name="Organizational KB - Standard"`, `Name="Organizational KB - Premium"`

- **Knowledge Base Support & Evolution Retainer:**
  - **Unified Knowledge Retainer:** A comprehensive retainer offering that combines technical maintenance, strategic guidance, and continuous knowledge structure optimization in one flexible package.
    - **Core Services (Base Tier - $350/month):**
      - Technical maintenance (software updates, troubleshooting, backup verification)
      - Monthly knowledge structure review and optimization consultation (60-min call)
      - Basic usage analytics and improvement recommendations
      - Limited ad-hoc support via email (48-hour response time)
    - **Add-On Modules (Customizable):**
      - **Custom Ontology Development ($750 one-time setup + $150/month maintenance):** Design and implementation of sophisticated metadata schemas and taxonomies based on client needs, including:
        - **Rich Frontmatter Schema Development:** Creation of comprehensive metadata frameworks including:
          - Core page metadata (title, abstract, author, creation/modification dates)
          - SEO optimization fields (meta descriptions, keywords, canonical URLs)
          - Social media integration (OpenGraph tags, Twitter cards)
          - Content classification systems (tags, categories, related content)
          - Academic/research metadata (citations, DOIs, references)
          - Custom fields tailored to specific organizational knowledge needs
        - **Knowledge Structure Design:** Development of custom tag hierarchies, relationship mapping, and content organization systems
        - **Schema Implementation:** Technical implementation of metadata structures, including creation of templates and validation systems
        - **Machine Readability:** Implementation of structured data for SEO and integration with external systems
        - **Quartz-Specific Optimizations:** Custom component configurations, search optimization, and Arweave integration
      - **Extended Training ($250/session):** Additional training sessions for new team members or advanced features
      - **Content Migration ($500-1500 based on volume):** Assistance with importing content from other systems
      - **Feature Development (Custom quote):** Custom component or plugin development for specific client needs
    - **Pricing Model:** Base retainer plus selected add-on modules, with transparent pricing for each component
    - `Schema <Offering>`: Model as recurring service with base and add-on components clearly defined

### 3. Branding Services

- **Description:** (Define: e.g., Developing cohesive visual and verbal identities for organizations, focusing on clarity, consistency, and impact.)
- **Target Audience:** (Define: e.g., Startups needing foundational branding, established orgs undergoing rebranding, projects needing clear communication.)
- **Schema Alignment:** `<Category>Branding</Category>`

- **Potential Packages (Fixed-Fee, Tiered Options Recommended):**

  - **Brand Kit:**
    - _Option 1 (Essentials):_ Logo design (limited concepts/revisions), basic color palette, font selection.
    - _Option 2 (Comprehensive):_ Deeper discovery, logo system, extended palette, typography guidelines, basic brand voice notes.
    - `Schema <Package>`: `Name="Brand Kit - Essentials"`, `Name="Brand Kit - Comprehensive"`
  - **Campaign Kit:**
    - _Option 1 (Essentials):_ Core campaign visual identity and basic assets.
    - _Option 2 (Comprehensive):_ Full-scale campaign identity system with extended asset production.
    - _Option 3 (Event Focused):_ Specialized campaign assets optimized for physical and virtual events.
    - `Schema <Package>`: `Name="Campaign Kit - Essentials"`, `Name="Campaign Kit - Comprehensive"`, `Name="Campaign Kit - Event Focused"`
  - **Brand Messaging & Positioning:**
    - _Option 1 (Workshop & Guide):_ Facilitated workshop, core messaging guide (voice, tone, key messages, value proposition).
    - _Option 2 (Deep Dive):_ Audience research, competitive analysis, detailed positioning statement, comprehensive messaging guide.
    - `Schema <Package>`: `Name="Messaging - Workshop"`, `Name="Messaging - Deep Dive"`
  - **Website Design Consultation:** (Position clearly as strategic input, _not_ development)
    - _Option 1 (Audit & Recommendations):_ Review existing site (or plans), provide documented UX/UI/Brand alignment feedback.
    - _Option 2 (Strategic Blueprint):_ Workshop, information architecture map, wireframe sketches, brand integration guidelines for developers.
    - `Schema <Package>`: `Name="Web Consult - Audit"`, `Name="Web Consult - Blueprint"`

- **Potential Retainers (Monthly Fixed Fee):**
  - **Brand Consistency Review:** (Define scope: e.g., review X pieces of marketing collateral/month, provide feedback on brand alignment).
  - **Ongoing Brand Advisory:** (Define access: e.g., monthly strategy call, ad-hoc questions via email on brand application).

## General Structure Considerations (Based on Schema & Best Practices)

For each distinct package or retainer:

- `<Metadata>`: `ID`, `Name` (use tiered naming), `Category`, `Description` (clarify tier differences), `Keywords`.
- `<Provider>`: Standard Clinamenic LLC info.
- `<Offering>`:
  - `<Package>` (for fixed-fee/deliverables): `Name`, `Description`, `Deliverables` (list precisely, differentiate tiers), `

## Example Testimonial

```xml
     <Package>
        <Name>Governance Audit - Diagnostic</Name>
        <Description>High-level review of governance structures with risk identification</Description>
        <Deliverables>
          <Deliverable>Governance structure assessment</Deliverable>
          <Deliverable>Risk identification report</Deliverable>
          <Deliverable>High-level recommendations</Deliverable>
        </Deliverables>
        <Pricing>
          <BasePrice currency="USD">2500</BasePrice>
        </Pricing>
        <PreviousWork>
          <Example>
            <Name>Education DAO Governance Review</Name>
            <URL>https://educationdao.xyz/</URL>
            <Description>Conducted diagnostic governance audit identifying misalignments between mission and voting mechanisms</Description>
            <Date>2023-09-15</Date>
            <Results>Identified 5 critical governance vulnerabilities; client implemented all recommendations</Results>
          </Example>
        </PreviousWork>
        <Testimonials>
          <Testimonial>
            <ClientInfo>
              <Name>Jane Smith</Name>
              <Position>Operations Lead</Position>
              <Company>Education DAO</Company>
            </ClientInfo>
            <Quote>The diagnostic audit uncovered critical issues we hadn't considered and provided actionable solutions that were easy to implement.</Quote>
            <Date>2023-10-05</Date>
          </Testimonial>
        </Testimonials>
      </Package>
```

## Master XML Structure for Services

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Services xmlns="https://www.clinamenic.com/schemas/services/v1">
  <!-- GOVERNANCE SERVICES -->
  <Service>
    <Metadata>
      <ID>service-governance</ID>
      <id>1</id>
      <Name>Governance Services</Name>
      <Category>Governance</Category>
      <Description>Configuration, auditing, and implementation of governance frameworks, specializing in on-chain organizations and smart contract-based structures.</Description>
      <Keywords>governance,dao,smart contracts,onchain organization,audit</Keywords>
    </Metadata>

    <Provider>
      <Name>Clinamenic LLC</Name>
      <ContactPerson>Spencer Saar Cavanaugh</ContactPerson>
      <Website>https://www.clinamenic.com</Website>
    </Provider>

    <Offering>
      <!-- GOVERNANCE AUDIT PACKAGE -->
      <Package>
        <id>1.1</id>
        <Name>Governance Audit</Name>
        <Description>Analysis and assessment of governance structures with recommendations</Description>
        <Tiers>
          <Tier>
            <id>1.1.1</id>
            <Name>Preliminary</Name>
            <Description>High-level review of governance structures with risk identification</Description>
            <Deliverables>
              <Deliverable>Governance structure assessment</Deliverable>
              <Deliverable>Risk identification report</Deliverable>
              <Deliverable>High-level recommendations</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">2500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>1.1.2</id>
            <Name>Comprehensive</Name>
            <Description>Detailed analysis of governance structures with benchmarking and actionable recommendations</Description>
            <Deliverables>
              <Deliverable>In-depth governance structure analysis</Deliverable>
              <Deliverable>Benchmarking against industry standards</Deliverable>
              <Deliverable>Comprehensive recommendations document</Deliverable>
              <Deliverable>Executive presentation of findings</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">5000</BasePrice>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- GOVERNANCE FRAMEWORK PACKAGE -->
      <Package>
        <id>1.2</id>
        <Name>Governance Design &amp; Support</Name>
        <Description>Creation and implementation of governance frameworks</Description>
        <Tiers>
          <Tier>
            <id>1.2.1</id>
            <Name>Template + Review</Name>
            <Description>Adaptation of existing governance templates with implementation review</Description>
            <Deliverables>
              <Deliverable>Adapted Pre-Constitutional Governance template</Deliverable>
              <Deliverable>Documented governance framework</Deliverable>
              <Deliverable>Review of technical implementation specifications</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">3500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>1.2.2</id>
            <Name>Bespoke + Guided</Name>
            <Description>Design of bespoke governance framework with guided implementation</Description>
            <Deliverables>
              <Deliverable>Discovery workshops</Deliverable>
              <Deliverable>Custom governance framework design</Deliverable>
              <Deliverable>Implementation roadmap</Deliverable>
              <Deliverable>Technical specification workshops</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">7500</BasePrice>
            </Pricing>
            <PreviousWork>
              <Example>
                <Name>Education DAO</Name>
                <URL>https://www.educationdao.xyz/</URL>
                <Description>Entity formatation with integrated smart contracts, custom governance framework design, coaching and guidance provided for team members</Description>
                <Date>2024</Date>
              </Example>
            </PreviousWork>
          </Tier>
        </Tiers>
      </Package>

      <!-- GRANTS PROGRAM PACKAGE -->
      <Package>
        <id>1.3</id>
        <Name>Grants Program</Name>
        <Description>Design and management of onchain grants programs</Description>
        <Tiers>
          <Tier>
            <id>1.3.1</id>
            <Name>Design</Name>
            <Description>Design of onchain grants program structure and evaluation framework</Description>
            <Deliverables>
              <Deliverable>Grant program structure design</Deliverable>
              <Deliverable>Application process flow</Deliverable>
              <Deliverable>Evaluation criteria framework</Deliverable>
              <Deliverable>Milestone tracking/attestation framework</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">2500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>1.3.2</id>
            <Name>Design + Management</Name>
            <Description>Design and management of onchain grants program including tooling setup</Description>
            <Deliverables>
              <Deliverable>Grant program structure design</Deliverable>
              <Deliverable>Application process flow</Deliverable>
              <Deliverable>Evaluation criteria framework</Deliverable>
              <Deliverable>Milestone tracking/attestation framework</Deliverable>
              <Deliverable>Onchain tooling setup (e.g., Grants Stack)</Deliverable>
              <Deliverable>Management of one grant round</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">Custom</BasePrice>
            </Pricing>
            <PreviousWork>
              <Example>
                <Name>OpenCivics</Name>
                <URL>https://www.educationdao.xyz/</URL>
                <Description>Deployed and operated three quarterly grant rounds using quadratic funding smart contracts, disbursing over a total of $100,000 in stablecoins.</Description>
                <Date>2023 - 2024</Date>
              </Example>
            </PreviousWork>
          </Tier>
        </Tiers>
      </Package>

      <!-- GOVERNANCE RETAINERS -->
      <Retainer>
        <id>1.4</id>
        <Name>Governance Advisory Retainer</Name>
        <Description>Ongoing strategic governance guidance</Description>
        <Services>
          <Service>Two 1-hour strategy calls per month</Service>
          <Service>Limited email support for strategic questions (48hr response time)</Service>
          <Service>Diagnostic assessment of key governance processes and documents</Service>
        </Services>
        <Pricing>
          <RecurringPrice frequency="monthly" currency="USD">1200</RecurringPrice>
          <MinimumTerm unit="months">2</MinimumTerm>
        </Pricing>
      </Retainer>

      <Retainer>
        <id>1.5</id>
        <Name>Governance Council Support</Name>
        <Description>Facilitation support for regular governance meetings and proposal reviews</Description>
        <Services>
          <Service>Bi-weekly governance meeting facilitation</Service>
          <Service>Review of up to 5 governance proposals per month</Service>
          <Service>Monthly governance process optimization recommendations</Service>
        </Services>
        <Pricing>
          <RecurringPrice frequency="monthly" currency="USD">3000</RecurringPrice>
          <MinimumTerm unit="months">3</MinimumTerm>
        </Pricing>
      </Retainer>
    </Offering>
  </Service>

  <!-- KNOWLEDGE MANAGEMENT SERVICES -->
  <Service>
    <Metadata>
      <ID>service-knowledge-management</ID>
      <id>2</id>
      <Name>Knowledge Management Services</Name>
      <Category>Knowledge Management</Category>
      <Description>Design, setup, and optimization of personal and organizational knowledge bases (wikis), specializing in open, local-first architectures.</Description>
      <Keywords>knowledge management,wiki,quartz,obsidian,cursor,documentation</Keywords>
    </Metadata>

    <Provider>
      <Name>Clinamenic LLC</Name>
      <ContactPerson>Spencer Saar Cavanaugh</ContactPerson>
      <Website>https://www.clinamenic.com</Website>
    </Provider>

    <Offering>
      <!-- PERSONAL KB PACKAGES -->
      <Package>
        <id>2.1</id>
        <Name>Personal Knowledge Base</Name>
        <Description>Setup of personal knowledge bases powered by Quartz, Obsidian, and Cursor</Description>
        <Tiers>
          <Tier>
            <id>2.1.1</id>
            <Name>Standard</Name>
            <Description>Creation of a git-enabled Quartz knowledge base optimized for Obsidian/Cursor</Description>
            <Deliverables>
              <Deliverable>Creation of a git-enabled Quartz knowledge base</Deliverable>
              <Deliverable>Basic personalization of the boilerplate Quartz architecture</Deliverable>
              <Deliverable>CNAME and DNS configuration</Deliverable>
              <Deliverable>Custom rules framework for Cursor</Deliverable>
              <Deliverable>Client-controlled Git repo with guidance</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">750</BasePrice>
              <Discounts>
                <Discount>
                  <Condition>Promotional footer placement</Condition>
                  <Amount currency="USD">100</Amount>
                </Discount>
                <Discount>
                  <Condition>Payment in DAI or USDC</Condition>
                  <Amount currency="USD">50</Amount>
                </Discount>
              </Discounts>
            </Pricing>
            <PreviousWork>
              <Example>
                <Name>SuperBenefit Knowledge Garden</Name>
                <URL>https://knowledge.superbenefit.org/</URL>
                <Description>Personal knowledge base with custom theme and Arweave integration</Description>
                <Date>2023-05-20</Date>
              </Example>
              <Example>
                <Name>Sensemaking Scenius</Name>
                <URL>https://www.scenius.space/</URL>
                <Description>Knowledge base featuring custom graph visualization and advanced metadata</Description>
                <Date>2023-08-15</Date>
              </Example>
            </PreviousWork>
            <Testimonials>
              <Testimonial>
                <ClientInfo>
                  <Name>Alex Johnson</Name>
                  <Position>Independent Researcher</Position>
                </ClientInfo>
                <Quote>Clinamenic's knowledge base setup transformed how I organize my research. The custom Cursor rules framework made technical components accessible even for a non-developer like me.</Quote>
                <Date>2023-06-10</Date>
              </Testimonial>
            </Testimonials>
          </Tier>
          <Tier>
            <id>2.1.2</id>
            <Name>Premium</Name>
            <Description>Enhanced personal knowledge base with custom features and personalized training</Description>
            <Deliverables>
              <Deliverable>All Standard tier features</Deliverable>
              <Deliverable>Personalized training session (90 minutes)</Deliverable>
              <Deliverable>Custom theme elements</Deliverable>
              <Deliverable>Advanced plugin configuration</Deliverable>
              <Deliverable>Development of one bespoke feature/module</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">1250</BasePrice>
              <Discounts>
                <Discount>
                  <Condition>Promotional footer placement</Condition>
                  <Amount currency="USD">100</Amount>
                </Discount>
                <Discount>
                  <Condition>Payment in DAI or USDC</Condition>
                  <Amount currency="USD">50</Amount>
                </Discount>
              </Discounts>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- ORGANIZATIONAL KB PACKAGES -->
      <Package>
        <id>2.2</id>
        <Name>Organizational Knowledge Base</Name>
        <Description>Setup of team-based knowledge management systems with collaboration features</Description>
        <Tiers>
          <Tier>
            <id>2.2.1</id>
            <Name>Standard</Name>
            <Description>Team knowledge base setup with git submodules and basic training</Description>
            <Deliverables>
              <Deliverable>Creation of a git-enabled Quartz knowledge base</Deliverable>
              <Deliverable>Basic personalization of the architecture</Deliverable>
              <Deliverable>CNAME and DNS configuration</Deliverable>
              <Deliverable>Custom rules framework for Cursor</Deliverable>
              <Deliverable>Git submodules for team collaboration</Deliverable>
              <Deliverable>One team training session (60 minutes)</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">1500</BasePrice>
              <Discounts>
                <Discount>
                  <Condition>Promotional footer placement</Condition>
                  <Amount currency="USD">100</Amount>
                </Discount>
                <Discount>
                  <Condition>Payment in DAI or USDC</Condition>
                  <Amount currency="USD">50</Amount>
                </Discount>
              </Discounts>
            </Pricing>
            <PreviousWork>
              <Example>
                <Name>Ethereum Localism</Name>
                <URL>https://www.ethereumlocalism.xyz/</URL>
                <Description>Organizational knowledge base for community collaborative research</Description>
                <Date>2023-03-10</Date>
              </Example>
            </PreviousWork>
          </Tier>
          <Tier>
            <id>2.2.2</id>
            <Name>Premium</Name>
            <Description>Enhanced team knowledge base with advanced collaboration features and workflow integration</Description>
            <Deliverables>
              <Deliverable>All Standard Org tier features</Deliverable>
              <Deliverable>Advanced Git submodule strategy for teams</Deliverable>
              <Deliverable>Dedicated admin training (90 minutes)</Deliverable>
              <Deliverable>Workflow integration consultation</Deliverable>
              <Deliverable>Development of one bespoke organizational feature</Deliverable>
              <Deliverable>Content structure optimization</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">2500</BasePrice>
              <Discounts>
                <Discount>
                  <Condition>Promotional footer placement</Condition>
                  <Amount currency="USD">100</Amount>
                </Discount>
                <Discount>
                  <Condition>Payment in DAI or USDC</Condition>
                  <Amount currency="USD">50</Amount>
                </Discount>
              </Discounts>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- KNOWLEDGE RETAINER -->
      <Retainer>
        <id>2.3</id>
        <Name>Unified Knowledge Retainer - Base Tier</Name>
        <Description>Technical maintenance, strategic guidance, and knowledge structure optimization</Description>
        <Services>
          <Service>Technical maintenance (software updates, troubleshooting, backup verification)</Service>
          <Service>Monthly knowledge structure review and optimization consultation (60-min call)</Service>
          <Service>Basic usage analytics and improvement recommendations</Service>
          <Service>Limited ad-hoc support via email (48-hour response time)</Service>
        </Services>
        <Pricing>
          <RecurringPrice frequency="monthly" currency="USD">350</RecurringPrice>
          <MinimumTerm unit="months">3</MinimumTerm>
        </Pricing>
        <AddOnModules>
          <Module>
            <id>2.3.1</id>
            <Name>Custom Ontology Development</Name>
            <Description>Design and implementation of sophisticated metadata schemas and taxonomies</Description>
            <Pricing>
              <SetupFee currency="USD">750</SetupFee>
              <RecurringFee frequency="monthly" currency="USD">150</RecurringFee>
            </Pricing>
            <Deliverables>
              <Deliverable>Rich Frontmatter Schema Development</Deliverable>
              <Deliverable>Knowledge Structure Design</Deliverable>
              <Deliverable>Schema Implementation</Deliverable>
              <Deliverable>Machine Readability optimization</Deliverable>
              <Deliverable>Quartz-Specific Optimizations</Deliverable>
            </Deliverables>
          </Module>
          <Module>
            <id>2.3.2</id>
            <Name>Extended Training</Name>
            <Description>Additional training sessions for new team members or advanced features</Description>
            <Pricing>
              <PerSessionFee currency="USD">250</PerSessionFee>
            </Pricing>
          </Module>
          <Module>
            <id>2.3.3</id>
            <Name>Content Migration</Name>
            <Description>Assistance with importing content from other systems</Description>
            <Pricing>
              <RangeFee min="500" max="1500" currency="USD">Based on volume</RangeFee>
            </Pricing>
          </Module>
          <Module>
            <id>2.3.4</id>
            <Name>Feature Development</Name>
            <Description>Custom component or plugin development for specific client needs</Description>
            <Pricing>
              <CustomQuote>Based on requirements</CustomQuote>
            </Pricing>
          </Module>
        </AddOnModules>
        <Testimonials>
          <Testimonial>
            <ClientInfo>
              <Name>Michael Torres</Name>
              <Position>Knowledge Manager</Position>
              <Company>TechOrg Inc</Company>
            </ClientInfo>
            <Quote>The unified retainer has been invaluable. Having both technical support and strategic guidance in one package ensures our knowledge base continuously evolves with our organization.</Quote>
            <Date>2024-02-15</Date>
          </Testimonial>
        </Testimonials>
      </Retainer>
    </Offering>
  </Service>

  <!-- BRANDING SERVICES -->
  <Service>
    <Metadata>
      <ID>service-branding</ID>
      <id>3</id>
      <Name>Branding Services</Name>
      <Category>Branding</Category>
      <Description>Developing cohesive visual and verbal identities for organizations, focusing on clarity, consistency, and impact.</Description>
      <Keywords>branding,logo design,brand messaging,visual identity,positioning</Keywords>
    </Metadata>

    <Provider>
      <Name>Clinamenic LLC</Name>
      <ContactPerson>Spencer Saar Cavanaugh</ContactPerson>
      <Website>https://www.clinamenic.com</Website>
    </Provider>

    <Offering>
      <!-- BRAND KIT PACKAGES -->
      <Package>
        <id>3.1</id>
        <Name>Brand Kit</Name>
        <Description>Development of visual identity systems for organizations</Description>
        <Tiers>
          <Tier>
            <id>3.1.1</id>
            <Name>Essentials</Name>
            <Description>Foundational visual identity with core brand elements</Description>
            <Deliverables>
              <Deliverable>Logo design (2 concepts, 2 rounds of revisions)</Deliverable>
              <Deliverable>Basic color palette (primary/secondary colors)</Deliverable>
              <Deliverable>Font selection and basic typography guidelines</Deliverable>
              <Deliverable>Basic brand usage guide (PDF)</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">1800</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>3.1.2</id>
            <Name>Comprehensive</Name>
            <Description>Complete visual identity system with extended brand assets</Description>
            <Deliverables>
              <Deliverable>Discovery workshop</Deliverable>
              <Deliverable>Logo system (primary, secondary, icon versions)</Deliverable>
              <Deliverable>Extended color palette with usage guidelines</Deliverable>
              <Deliverable>Typography system (headline, body, accent fonts)</Deliverable>
              <Deliverable>Basic brand voice and tone notes</Deliverable>
              <Deliverable>Visual element library (patterns, graphics)</Deliverable>
              <Deliverable>Comprehensive brand guidelines document</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">3500</BasePrice>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- CAMPAIGN KIT PACKAGES -->
      <Package>
        <id>3.2</id>
        <Name>Campaign Kit</Name>
        <Description>Specialized visual assets for campaigns and events by established brands</Description>
        <Tiers>
          <Tier>
            <id>3.2.1</id>
            <Name>Essentials</Name>
            <Description>Core campaign visual identity and basic assets</Description>
            <Deliverables>
              <Deliverable>Campaign concept development (2 concepts)</Deliverable>
              <Deliverable>Campaign key visual</Deliverable>
              <Deliverable>Basic asset templates (social media, email header)</Deliverable>
              <Deliverable>Color and typography specifications based on brand guidelines</Deliverable>
              <Deliverable>Campaign style guide (PDF)</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">1500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>3.2.2</id>
            <Name>Comprehensive</Name>
            <Description>Full-scale campaign identity system with extended asset production</Description>
            <Deliverables>
              <Deliverable>Campaign strategy workshop</Deliverable>
              <Deliverable>Campaign concept development (3 concepts, 2 rounds of refinement)</Deliverable>
              <Deliverable>Campaign key visual system (primary and secondary visuals)</Deliverable>
              <Deliverable>Extended asset production:</Deliverable>
              <Deliverable>- Social media templates (5 formats)</Deliverable>
              <Deliverable>- Email marketing templates (header, footer, body sections)</Deliverable>
              <Deliverable>- Digital ad templates (3 standard sizes)</Deliverable>
              <Deliverable>- Presentation/slide deck template</Deliverable>
              <Deliverable>Campaign visual style guide with usage examples</Deliverable>
              <Deliverable>Asset organization system and file delivery</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">3500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>3.2.3</id>
            <Name>Event</Name>
            <Description>Specialized campaign assets optimized for physical and virtual events</Description>
            <Deliverables>
              <Deliverable>All Comprehensive tier deliverables</Deliverable>
              <Deliverable>Event-specific assets:</Deliverable>
              <Deliverable>- Signage and wayfinding templates</Deliverable>
              <Deliverable>- Backdrop and stage design concepts</Deliverable>
              <Deliverable>- Name badges and printed materials</Deliverable>
              <Deliverable>- Virtual event graphics (backgrounds, overlays, transitions)</Deliverable>
              <Deliverable>- Event photography/videography shot list and style guide</Deliverable>
              <Deliverable>Post-event asset package for follow-up communications</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">4000</BasePrice>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- MESSAGING PACKAGES -->
      <Package>
        <id>3.3</id>
        <Name>Brand Messaging</Name>
        <Description>Development of strategic messaging and brand positioning</Description>
        <Tiers>
          <Tier>
            <id>3.3.1</id>
            <Name>Workshop</Name>
            <Description>Facilitated workshop and core messaging development</Description>
            <Deliverables>
              <Deliverable>Messaging workshop (3 hours)</Deliverable>
              <Deliverable>Core messaging guide including:</Deliverable>
              <Deliverable>Brand voice and tone guidelines</Deliverable>
              <Deliverable>Key messages and value proposition</Deliverable>
              <Deliverable>Basic audience segmentation</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">2200</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>3.3.2</id>
            <Name>Deep Dive</Name>
            <Description>Comprehensive research-based messaging and positioning strategy</Description>
            <Deliverables>
              <Deliverable>Audience research and analysis</Deliverable>
              <Deliverable>Competitive messaging analysis</Deliverable>
              <Deliverable>Positioning workshop</Deliverable>
              <Deliverable>Detailed positioning statement</Deliverable>
              <Deliverable>Comprehensive messaging guide with:</Deliverable>
              <Deliverable>Brand story and narrative</Deliverable>
              <Deliverable>Audience-specific messaging</Deliverable>
              <Deliverable>Message hierarchy and frameworks</Deliverable>
              <Deliverable>Content tone guidelines by channel</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">4500</BasePrice>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- WEB CONSULTATION PACKAGES -->
      <Package>
        <id>3.4</id>
        <Name>Web Consultation</Name>
        <Description>Strategic guidance for brand-aligned website development</Description>
        <Tiers>
          <Tier>
            <id>3.4.1</id>
            <Name>Audit</Name>
            <Description>Strategic audit of existing website or plans with brand alignment recommendations</Description>
            <Deliverables>
              <Deliverable>Review of existing site or plans</Deliverable>
              <Deliverable>UX/UI/Brand alignment analysis</Deliverable>
              <Deliverable>Documented feedback and recommendations</Deliverable>
              <Deliverable>One review session to discuss findings</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">1500</BasePrice>
            </Pricing>
          </Tier>
          <Tier>
            <id>3.4.2</id>
            <Name>Blueprint</Name>
            <Description>Strategic blueprint for brand-aligned website development</Description>
            <Deliverables>
              <Deliverable>Discovery workshop</Deliverable>
              <Deliverable>Information architecture map</Deliverable>
              <Deliverable>Wireframe sketches for key page types</Deliverable>
              <Deliverable>Brand integration guidelines for developers</Deliverable>
              <Deliverable>Content strategy recommendations</Deliverable>
              <Deliverable>Presentation and handoff to development team</Deliverable>
            </Deliverables>
            <Pricing>
              <BasePrice currency="USD">3800</BasePrice>
            </Pricing>
          </Tier>
        </Tiers>
      </Package>

      <!-- BRANDING RETAINERS -->
      <Retainer>
        <id>3.5</id>
        <Name>Brand Consistency Review</Name>
        <Description>Ongoing review of marketing materials to ensure brand alignment</Description>
        <Services>
          <Service>Review of up to 5 marketing pieces per month</Service>
          <Service>Brand alignment feedback and recommendations</Service>
          <Service>Monthly brand usage report</Service>
        </Services>
        <Pricing>
          <RecurringPrice frequency="monthly" currency="USD">800</RecurringPrice>
          <MinimumTerm unit="months">3</MinimumTerm>
        </Pricing>
      </Retainer>

      <Retainer>
        <id>3.6</id>
        <Name>Ongoing Brand Advisory</Name>
        <Description>Strategic brand guidance and application support</Description>
        <Services>
          <Service>Monthly strategy call (60 minutes)</Service>
          <Service>Ad-hoc brand application questions via email</Service>
          <Service>Quarterly brand health check</Service>
          <Service>Priority access for additional branding projects</Service>
        </Services>
        <Pricing>
          <RecurringPrice frequency="monthly" currency="USD">1200</RecurringPrice>
          <MinimumTerm unit="months">3</MinimumTerm>
        </Pricing>
      </Retainer>
    </Offering>
  </Service>
</Services>
```

## Incorporating Services XML into Quartz

To make the services XML data available on your website, there are two main approaches you can take with Quartz:

### Approach 1: Static XML File (Simplest)

The simplest approach is to create a static XML file that gets copied directly to your site during the build process:

1. **Create a file** at `content/services.xml` with the XML structure shown above
2. **Add it to the Quartz static file list** in your `quartz.config.ts`:

```typescript
// In quartz.config.ts
export default defineConfig({
  // ... other configuration
  plugins: {
    // ... other plugins
    emitters: [
      // ... other emitters
      Plugin.Assets({
        includeFiles: [
          // ... other files
          "services.xml", // Add this line to include services.xml
        ],
      }),
    ],
  },
})
```

3. Quartz will automatically copy this file to the root of your built site, making it accessible at `https://clinamenic.com/services.xml`

### Approach 2: Dynamic XML Generation (More Advanced)

For more advanced integration, you can create a custom Quartz plugin that generates the XML dynamically:

1. **Create a custom transformer plugin** at `.quartz/plugins/services-xml.ts`:

```typescript
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"

export const ServicesXML: QuartzEmitterPlugin = () => {
  return {
    name: "ServicesXML",
    getQuartzComponents() {
      return []
    },
    async emit(ctx, _content, _resources) {
      // Generate XML from your service structure
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Services xmlns="https://www.clinamenic.com/schemas/services/v1">
  <!-- Your structured service data here -->
  <!-- This could be loaded from a JSON file or generated programmatically -->
</Services>`

      // Write the XML file
      const outputPath = path.join(ctx.cfg.outputDir, "services.xml")
      await fs.promises.writeFile(outputPath, xml, "utf-8")

      return [outputPath]
    },
  }
}
```

2. **Register the plugin** in your `quartz.config.ts`:

```typescript
import { ServicesXML } from "./quartz/plugins/services-xml"

export default defineConfig({
  // ... other configuration
  plugins: {
    // ... other plugins
    emitters: [
      // ... other emitters
      ServicesXML(),
    ],
  },
})
```

#### Benefits of Dynamic Generation

The dynamic approach offers several advantages:

1. **Single Source of Truth**: You can store your service data in a more manageable format (like JSON or YAML) and generate both XML and other formats from it
2. **Integration with CMS**: You could pull service data from a headless CMS or API during build time
3. **Data Validation**: Implement validation logic to ensure your service data meets schema requirements
4. **Automated Updates**: Dynamically update pricing, package details, or other service information

#### Enhanced Implementation Example

Here's a more comprehensive implementation that loads service data from a JSON file:

```typescript
import { QuartzEmitterPlugin } from "../types"
import path from "path"
import fs from "fs"
import { XMLBuilder } from "fast-xml-parser" // You'd need to install this package

export const ServicesXML: QuartzEmitterPlugin = () => {
  return {
    name: "ServicesXML",
    getQuartzComponents() {
      return []
    },
    async emit(ctx, _content, _resources) {
      try {
        // 1. Load service data from JSON
        const dataPath = path.join(ctx.cfg.root, "content", "services-data.json")
        const servicesData = JSON.parse(await fs.promises.readFile(dataPath, "utf-8"))

        // 2. Transform data to XML structure if needed
        // This depends on how your JSON is structured

        // 3. Generate XML using a library like fast-xml-parser
        const builder = new XMLBuilder({
          attributeNamePrefix: "@_",
          format: true,
          ignoreAttributes: false,
          suppressEmptyNode: true,
        })

        const xmlObj = {
          Services: {
            "@_xmlns": "https://www.clinamenic.com/schemas/services/v1",
            ...servicesData,
          },
        }

        const xml = '<?xml version="1.0" encoding="UTF-8"?>\n' + builder.build(xmlObj)

        // 4. Write the XML file
        const outputPath = path.join(ctx.cfg.outputDir, "services.xml")
        await fs.promises.writeFile(outputPath, xml, "utf-8")

        // 5. Also generate JSON version for JavaScript consumers
        const jsonOutputPath = path.join(ctx.cfg.outputDir, "services.json")
        await fs.promises.writeFile(jsonOutputPath, JSON.stringify(servicesData, null, 2), "utf-8")

        // 6. Return list of generated files
        return [outputPath, jsonOutputPath]
      } catch (error) {
        console.error("Error generating services XML:", error)
        return []
      }
    },
  }
}
```

#### Integration with Markdown Content

You could even extract service information from your Markdown files using Quartz's content processing pipeline:

```typescript
export const ServicesXML: QuartzEmitterPlugin = () => {
  return {
    name: "ServicesXML",
    getQuartzComponents() {
      return []
    },
    async emit(ctx, content, _resources) {
      // Extract service data from content files
      const servicePages = content.filter(
        (page) => page.file.slug.startsWith("services/") && page.frontmatter.serviceData,
      )

      // Compile service data from frontmatter
      const servicesData = servicePages.map((page) => ({
        id: page.frontmatter.id,
        name: page.frontmatter.title,
        category: page.frontmatter.serviceCategory,
        description: page.frontmatter.description,
        // ... other fields
        packages: page.frontmatter.serviceData.packages || [],
      }))

      // Generate and save XML
      // ... similar to previous example
    },
  }
}
```

This approach would allow you to maintain your service data directly in your Markdown files (in frontmatter) and automatically generate a complete services.xml file during the build process.

#### Advanced Features

With this dynamic approach, you could implement additional features:

1. **Schema Validation**: Validate your service data against an XSD schema
2. **Differential Updates**: Only regenerate the XML when service data changes
3. **Multiple Output Formats**: Generate XML, JSON, and even HTML representations simultaneously
4. **Integration with External APIs**: Pull real-time pricing or availability from external systems
5. **Analytics Integration**: Include tracking codes or campaign parameters dynamically

This dynamic approach is particularly valuable if you anticipate frequent changes to your service offerings or if you want to maintain service data in a more user-friendly format than raw XML.

### Additional Enhancement: JSON Version

You might also want to provide a JSON version of your services data for easier consumption by JavaScript applications:

1. Create a `services.json` file alongside your XML
2. Include it in the `includeFiles` array in your Quartz config
3. This makes your service offerings available in both XML format (for structured data consumers) and JSON format (for web applications)

## Displaying Service Data as HTML Tiles/Cards

Once you have `service.xml` (and potentially `services.json`) available in your `public` directory, you can display specific service details within your Markdown content using HTML elements styled as tiles or cards. Here are common implementation strategies:

### Approach 1: Client-Side JavaScript Rendering

1. **Markdown Placeholders:** In your Markdown files, add empty `div` elements with a specific attribute identifying the service/package/tier ID:
   ```html
   <div class="service-tile" data-service-id="1.1.2"></div>
   <div class="service-tile" data-service-id="2.1"></div>
   ```
2. **Client-Side Script:** Create a JavaScript file (e.g., `quartz/components/scripts/service-loader.inline.ts`) that runs on page load.
3. **Fetch & Parse:** This script fetches `/service.xml` (or the easier `/services.json`).
4. **Populate:** The script finds all elements with `data-service-id`, extracts the required data for that ID from the parsed XML/JSON, and builds the inner HTML for the tile (e.g., name, description, price).
5. **Styling:** Use CSS to style the `.service-tile` class.

- **Pros:** Relatively simple JS logic, separates data fetching from build process.
- **Cons:** Content appears after initial page load (potential Cumulative Layout Shift - CLS), service details within tiles aren't easily indexed by search engines.

### Approach 2: Custom Quartz Component (Build-Time Rendering)

This is often the preferred method for static site generators as it renders content during the build.

1. **Create Component:** Define a custom Quartz component (e.g., `quartz/components/ServiceTile.tsx`).
2. **Component Logic:**
   - Accept a `serviceId` prop (e.g., `"1.1.2"`).
   - **Data Loading:** Inside the component (specifically in its server-side execution context during the build), read `content/service.xml`.
   - **Parsing:** Parse the XML (using a library like `fast-xml-parser` installed as a dev dependency).
   - **Data Extraction:** Find the XML node matching the `serviceId` and extract the necessary fields (name, description, price, deliverables, etc.). _Optimization: Consider parsing the XML once globally during the build and passing the parsed data via context to avoid re-parsing for every tile._
   - **Rendering:** Return JSX that renders the HTML structure for the tile using the extracted data.
3. **Register Component:** Make Quartz aware of your custom component.
4. **Usage in Markdown:** Embed the component in your Markdown files. The exact syntax depends on Quartz's Markdown flavour (MDX is often used for this):

   ```markdown
   import ServiceTile from "../components/ServiceTile.tsx"

   Here is the comprehensive audit package:
   <ServiceTile serviceId="1.1.2" />

   And the standard personal KB:
   <ServiceTile serviceId="2.1.1" />
   ```

5. **Styling:** Style the component's output using CSS.

- **Pros:** Content is pre-rendered into static HTML (great for SEO, no CLS), leverages React/JSX for templating, clean integration with Quartz's architecture.
- **Cons:** Higher initial setup complexity (creating/registering components, build-time data access), potentially slightly increases build time due to parsing.

### Approach 3: Hybrid (Build-Time JSON + Client-Side JS)

A balance between the two, often easier than full component rendering.

1.  **Build-Time Script/Plugin:** Create a simple Quartz emitter plugin or a standalone build script:
    - Reads `content/service.xml`.
    - Parses the XML.
    - Transforms the data into a structured JSON format (perhaps an object keyed by ID for fast lookups).
    - Writes the JSON to `public/services-data.json`.
2.  **Markdown Placeholders:** Same as Approach 1:
    ```html
    <div class="service-tile" data-service-id="1.1.2"></div>
    ```
3.  **Client-Side Script:** Similar to Approach 1, but fetches `/services-data.json` instead of `/service.xml`. Parsing and data lookup from JSON is significantly simpler and faster in the browser.

- **Pros:** Simpler client-side logic than Approach 1, build process is efficient (XML parsed only once), keeps `service.xml` as the source.
- **Cons:** Still relies on client-side rendering for tiles (SEO/CLS implications similar to Approach 1).

**Recommendation:** For optimal performance and SEO within a Quartz site, the **Custom Quartz Component (Approach 2)** is generally the best fit, despite the higher initial setup cost. The **Hybrid Approach (Approach 3)** offers a good compromise if client-side rendering is acceptable.
