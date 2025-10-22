---
title: Service Schema Scoping
subtitle: Exploring machine-readable representation of service offerings
date: 2025-04-16
publish: true
license: CC BY-SA 4.0
quartzShowTitle: true
quartzShowSubtitle: true
quartzShowTOC: true
quartzShowExplorer: true
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowFlex: true
quartzShowGraph: true
quartzSearch: true
type: pre-spec
uuid: dca423de-feb6-4f6a-8549-b6b1fafa3ab2
---

## Overview

This document outlines a strategy for representing Clinamenic LLC's service offerings in a machine-readable XML format. The goal is to create a standardized schema that would allow for programmatic consumption, syndication, and potential integration with other services or platforms.

## Relevant Existing Schemas and Ontologies

Based on research, the following standards and approaches are particularly relevant:

### 1. Schema.org Service Schema

[Schema.org](https://schema.org) provides a widely-adopted vocabulary for structured data that includes a [Service](https://schema.org/Service) entity which can be used to describe service offerings in a standardized way.

Key properties include:

- `serviceType` - The type of service being offered
- `provider` - The service provider (Organization or Person)
- `serviceOutput` - The direct result of the service
- `offers` - Specific offerings, including pricing
- `areaServed` - Geographic area where service is provided

Schema.org markup can be implemented in various formats, including JSON-LD, Microdata, and RDFa.

### 2. RDF (Resource Description Framework)

RDF provides a framework for expressing information about resources using subject-predicate-object triples. This creates a graph-based data model ideal for representing complex relationships between services, clients, deliverables, etc.

Benefits of RDF for service representation:

- Rich expression of relationships between entities
- Extensibility through custom vocabularies
- Integration with existing semantic web standards
- Support for inference and reasoning

### 3. Good Relations Ontology

The [GoodRelations](http://www.heppnetz.de/projects/goodrelations/) ontology is specifically designed for e-commerce and can be applied to service offerings. It provides vocabulary for describing:

- Business entities
- Offerings and products
- Terms and conditions
- Price specifications

### 4. USDL (Unified Service Description Language)

USDL provides a comprehensive approach to describing services across business, operational, and technical dimensions. While primarily focused on web services and APIs, its concepts are applicable to consulting services.

## Proposed Service XML Schema Structure

Based on analysis of Clinamenic's services and the above ontologies, we propose the following high-level structure:

```xml
<Service>
  <Metadata>
    <ID>unique-identifier</ID>
    <Name>Service Name</Name>
    <Category>Governance|Knowledge Management|Branding</Category>
    <Description>Detailed description</Description>
    <Keywords>comma,separated,keywords</Keywords>
  </Metadata>

  <Provider>
    <Name>Clinamenic LLC</Name>
    <ContactInfo>...</ContactInfo>
    <Website>https://clinamenic.io</Website>
  </Provider>

  <Offering>
    <Package>
      <Name>Package Name</Name>
      <Description>Package description</Description>
      <Deliverables>
        <Deliverable>Deliverable 1</Deliverable>
        <Deliverable>Deliverable 2</Deliverable>
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
    </Package>
  </Offering>

  <PreviousWork>
    <Example>
      <Name>Project Name</Name>
      <URL>https://example.com</URL>
      <Description>Brief description</Description>
    </Example>
  </PreviousWork>
</Service>
```

## Implementation Considerations

1. **RDF Integration**: Consider implementing the XML schema with RDF compatibility to leverage the power of semantic relationships. This could be done through RDFa annotations or by providing an XSLT transformation to RDF.

2. **Schema.org Alignment**: Ensure the XML schema aligns with Schema.org vocabulary where possible to maximize compatibility with search engines and other systems that understand Schema.org.

3. **Extensibility**: Design the schema to be extensible for future service categories or attributes.

4. **Validation**: Develop an XSD (XML Schema Definition) to validate service XML documents.

5. **Syndication**: Consider how the XML can be used in syndication formats like RSS/Atom or as a data source for APIs.

## Next Steps

1. Develop detailed XSD schema definition
2. Create example XML files for each service category
3. Implement transformation to Schema.org JSON-LD
4. Develop documentation on how to consume the service XML
5. Create a validation tool/service
6. Design a UI for generating service XML files

## Sample Service XML for Knowledge Management

```xml
<Service xmlns="https://clinamenic.io/schemas/service/v1">
  <Metadata>
    <ID>knowledge-management-personal</ID>
    <Name>Personal Knowledge Management</Name>
    <Category>Knowledge Management</Category>
    <Description>Creation of a git-enabled Quartz knowledge base, optimized dually for Obsidian and Cursor.</Description>
    <Keywords>knowledge management,personal wiki,quartz,obsidian,cursor</Keywords>
  </Metadata>

  <Provider>
    <Name>Clinamenic LLC</Name>
    <ContactPerson>Spencer Saar Cavanaugh</ContactPerson>
    <Website>https://clinamenic.io</Website>
  </Provider>

  <Offering>
    <Package>
      <Name>Personal</Name>
      <Description>Personal knowledge base setup and configuration</Description>
      <Deliverables>
        <Deliverable>Creation of a git-enabled Quartz knowledge base</Deliverable>
        <Deliverable>Basic personalization of the boilerplate Quartz architecture</Deliverable>
        <Deliverable>Custom rules framework for Cursor</Deliverable>
        <Deliverable>Client-controlled Git repo</Deliverable>
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
    </Package>
  </Offering>

  <PreviousWork>
    <Example>
      <Name>SuperBenefit Knowledge Garden</Name>
      <URL>https://knowledge.superbenefit.org/</URL>
    </Example>
    <Example>
      <Name>Ethereum Localism</Name>
      <URL>https://www.ethereumlocalism.xyz/</URL>
    </Example>
    <Example>
      <Name>Sensemaking Scenius</Name>
      <URL>https://www.scenius.space/</URL>
    </Example>
  </PreviousWork>
</Service>
```

This document serves as a starting point for developing a comprehensive service XML schema. Further refinement will be needed based on stakeholder feedback and technical requirements.
