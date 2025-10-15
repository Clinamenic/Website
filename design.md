---
bannerURI:
headDescription: Professional graphic design, branding, and visual identity services by Clinamenic LLC. Specializing in logo design, brand strategy, and diagrammatic design for modern businesses and organizations.
headIcon:
keywords:
  - graphic design
  - branding
  - logo design
  - diagrammatic design
  - clinamenic
  - spencer saar cavanaugh
  - clinamenic LLC
  - creative agency
  - visual identity
  - brand strategy
ogSiteName: Clinamenic LLC
ogType: website
publish: true
quartzSearch: true
quartzShowBacklinks: true
quartzShowBanner: false
quartzShowCitation: false
quartzShowExplorer: true
quartzShowFlex: false
quartzShowGraph: true
quartzShowSubtitle: false
quartzShowTitle: true
quartzShowTOC: true
structuredData:
  "@context": https://schema.org
  "@type": CreativeWork
  name: Design Portfolio - Clinamenic LLC
  author:
    "@type": Person
    name: Spencer Saar Cavanaugh
    jobTitle: Creative Director
    worksFor:
      "@type": Organization
      name: Clinamenic LLC
      url: https://clinamenic.com
  description: Professional graphic design, branding, and visual identity services by Clinamenic LLC. Specializing in logo design, brand strategy, and diagrammatic design for modern businesses and organizations.
  keywords: graphic design, branding, logo design, diagrammatic design, clinamenic, spencer saar cavanaugh, creative agency, visual identity, brand strategy
  image: https://arweave.net/QdjXOvmwj_JevlF53JDj5v0tMKRQz5gvPzgsh7ulKyc
  dateModified: 2024-03-19
  offers:
    "@type": Offer
    availability: https://schema.org/InStock
    price: "0"
    priceCurrency: USD
  mainEntityOfPage:
    "@type": WebPage
    "@id": https://clinamenic.com/design
tags: []
title: Design Portfolio
twitterCard: summary_large_image
twitterCreator: "@clinamenic"
type: site-page
uuid: bf82f849-e253-426f-8c18-a69446f10b32
---

<style>
  

.font-box{
    border: 1px solid white;
    border-radius: 10px;
    background-color: black;
    overflow: hidden;
}

.gallery2 {
  display: flex;
  width: 100%;
  gap: 1rem;
  /* Remove fixed height! */
  overflow: hidden;
}

.gallery-img {
  display: block;
  height: 100%;   /* Will be set by JS */
  width: auto;    /* Will be set by JS */
  border: 1px solid var(--gray);
  border-radius: 10px;
  object-fit: contain;
}

.center > article.popover-hint > h1,
.center > article.popover-hint > h2,
.center > article.popover-hint > h3,
.center > article.popover-hint > h4,
.center > article.popover-hint > h5,
.center > article.popover-hint > h6,
.center > .popover-hint > article > h1,
.center > .popover-hint > article > h2,
.center > .popover-hint > article > h3,
.center > .popover-hint > article > h4,
.center > .popover-hint > article > h5,
.center > .popover-hint > article > h6 {
  background: var(--highlight);
  border: 1px solid var(--gray);
}


</style>

<script>
// Immediately apply default styles to prevent overflow
document.addEventListener('DOMContentLoaded', () => {
  // Apply temporary styles to prevent overflow
  const styleEl = document.createElement('style');
  styleEl.textContent = `
    .gallery2 {
      height: 300px !important; /* Temporary height */
    }
    .gallery2 img {
      max-width: 45% !important; /* Ensure images don't overflow */
      height: 100% !important;
      width: auto !important;
    }
  `;
  document.head.appendChild(styleEl);
  
  // Remove temporary styles after proper layout
  setTimeout(() => {
    document.head.removeChild(styleEl);
  }, 1000);
});

function layoutGallery2(container) {
  const images = Array.from(container.querySelectorAll('img'));
  if (images.length === 0) return;
  
  const gap = parseFloat(getComputedStyle(container).gap) || 0;

  // For each image that isn't loaded yet, set a load listener
  images.forEach(img => {
    if (!img.complete || !img.naturalWidth) {
      img.onload = () => layoutGallery2(container);
    }
  });

  // If any image doesn't have dimensions, retry soon
  if (images.some(img => !img.naturalWidth)) {
    setTimeout(() => layoutGallery2(container), 50);
    return;
  }

  // Get aspect ratios
  const ratios = images.map(img => img.naturalWidth / img.naturalHeight);
  const totalRatio = ratios.reduce((a, b) => a + b, 0);

  // Calculate available width (subtracting gaps)
  const containerWidth = container.clientWidth;
  const totalGap = gap * (images.length - 1);
  const availableWidth = containerWidth - totalGap;

  // Calculate target height
  const targetHeight = availableWidth / totalRatio;

  // Set container height and each image's width/height
  container.style.height = `${targetHeight}px`;
  images.forEach((img, i) => {
    img.style.height = `${targetHeight}px`;
    img.style.width = `${ratios[i] * targetHeight}px`;
  });
}

function layoutAllGalleries() {
  document.querySelectorAll('.gallery2').forEach(layoutGallery2);
}

// Apply layouts at multiple times to ensure they take effect
document.addEventListener('DOMContentLoaded', function() {
  // Run immediately
  layoutAllGalleries();
  
  // Run again after short delays
  setTimeout(layoutAllGalleries, 50);
  setTimeout(layoutAllGalleries, 200);
  setTimeout(layoutAllGalleries, 500);
});

// Run when all resources are loaded
window.addEventListener('load', function() {
  layoutAllGalleries();
  setTimeout(layoutAllGalleries, 100);
});

// Re-layout on window resize
window.addEventListener('resize', layoutAllGalleries);

// Set up mutation observer to watch for image loads
document.addEventListener('DOMContentLoaded', function() {
  const observer = new MutationObserver(mutations => {
    let shouldLayout = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'attributes' && 
          mutation.attributeName === 'src' && 
          mutation.target.tagName === 'IMG') {
        shouldLayout = true;
      }
    });
    
    if (shouldLayout) {
      layoutAllGalleries();
    }
  });
  
  // Start observing image elements
  document.querySelectorAll('.gallery2 img').forEach(img => {
    observer.observe(img, { attributes: true });
  });
});
</script>

---

## Graphic Design

Below are some samples of my graphic design work, showcasing a speciality for geometric and technoclassical aesthetics. I have long been a user and supporter of [GIMP](https://www.gimp.org/), which remains my preferred graphic design software.

See [[Museotheque]] for some examples of artists who have influenced me.

---

<div class="gallery3">
          <img
            src="https://i.pinimg.com/originals/24/7f/45/247f45070cb1ef7163052703f80e5e5d.png"
            class="gallery-img"
            style="border: 0px;"
            alt="SoloSalonBadge"
          />
          <img
            src="https://arweave.net/OIwKrWqQCIPULVOlc9RIwHaQBbG2Z2XA0ZXSar1KWns"
            class="gallery-img"
            style="border: 0px;"
            alt="ClinamenicGreenCube"
          />
          <img
            src="https://arweave.net/_viyJRmVmCLAcG4CV3k8mt3_A9J1kwl0xcYyxsCb05Y"
            class="gallery-img"
            alt="Lobby3Summit"
          />
          <img
            src="https://arweave.net/UtrtvMCDKQXUkOsVopzDKKJDKE8pACPnkDCuWSVtHVo"
            class="gallery-img"
            style="border: 0px;"
            alt="DAOCoalitionLogo"
          />
          <img
            src="https://arweave.net/QdjXOvmwj_JevlF53JDj5v0tMKRQz5gvPzgsh7ulKyc"
            class="gallery-img"
            alt="SSCBlackSquare"
          />
          <img
            src="https://i.pinimg.com/originals/54/82/24/5482241c344c134a0e83d9a32b780d8b.png"
            class="gallery-img"
            alt="AESOP_Insignia"
          />
          <img
            src="https://arweave.net/-Fw0x-Uz3YSDD2R781KtGxWbh3S8SJTI28sJGCzwKpo"
            class="gallery-img"
            alt="Lobby3_CA"
          />
          <img
            src="https://arweave.net/sQBKqlNlXf3hYPLPtk_I_tBuXxhZtkstmvGcKiNC5Fs"
            class="gallery-img"
            alt="Clinamenic Fractile"
          />
          <img
            src="https://i.seadn.io/gcs/files/e0d3da2759fbeff246c962b0af0f3257.gif?auto=format&dpr=1&w=1000"
            class="gallery-img"
            alt="Automatos_Cap"
          />
</div>

---

## Editorial Design

The following graphics were designed to serve as the visual components of publications, articles or other written materials.

---

<div class="gallery3">
          <img
            src="https://www.arweave.net/FHWrLlz3qpU2eNpYuUVYB9QRJ7eWMLJPmTzm2vn2N4U"
            class="gallery-img"
            alt="Automatos V1E1 Banner"
          />
          <img
            src="https://www.arweave.net/kaGBy7LyLxCcFJqRUz_3E23QEXDowzexBx1GM6JW0Vk"
            class="gallery-img"
            alt="Automatos V1E2 Banner"
          />
          <img
            src="https://www.arweave.net/_SLdnfftL4Jt8mt6OOCtvlE_4aV9jhu0lrgnSZuLNmk"
            class="gallery-img"
            alt="Automatos V1E3 Banner"
          />
          <img
            src="https://www.arweave.net/eNJyJEwmt6Hd2V_42xe-9kEtPMrIE-po_CJS64ZbEEA"
            class="gallery-img"
            alt="Automatos V1E1 Banner Square"
          />
          <img
            src="https://www.arweave.net/_rlVQNJVvezo-XxNIl6fq33gB5sO_K82ox1suVmlhWE"
            class="gallery-img"
            alt="Automatos V1E2 Banner Square"
          />
          <img
            src="https://www.arweave.net/gY7r2S3K2vEijB7ALpaq21So9BfNfmJlDSaiaoiBYa8"
            class="gallery-img"
            alt="Automatos V1E3 Banner Square"
          />
          <img
            src="https://www.arweave.net/TRce_HUOBA04f6wceBQg3DkzUp7BZBrUqI3tzxUJtno"
            class="gallery-img"
            alt="Automatos V1E4 Banner"
          />
          <img
            src="https://www.arweave.net/aZYHxlolZAcCBsfaytx68tYwX6RCdtWRoNndthUcK3o"
            class="gallery-img"
            alt="Automatos V1E5 Banner"
          />
          <img
            src="https://www.arweave.net/BmOLAdJbnQWVC0ALcVtPbvn1DLGAFGEPUJE19OtIVdo"
            class="gallery-img"
            alt="Automatos V1E6 Banner"
          />
          <img
            src="https://www.arweave.net/eMTbdzvgqG67CmotCMofSaxVXgaFN6MUqvqTsoVoSso"
            class="gallery-img"
            alt="Automatos V1E4 Banner Square"
          />
          <img
            src="https://www.arweave.net/choAYNdYaGNef35TjY7ml2siXn6ew51JHb3KTHs9LI4"
            class="gallery-img"
            alt="Automatos V1E5 Banner Square"
          />
          <img
            src="https://www.arweave.net/1FAS6fAdokW4nnHJymJ02CBm-Ki_qMvvrTHHnafBfx8"
            class="gallery-img"
            alt="Automatos V1E6 Banner Square"
          />
          <img
            src="https://www.arweave.net/CTf3sFs2Fxbas4qmHJko60umDjZP537WDUT_Fq1yZs4"
            class="gallery-img"
            alt="Automatos V1E7 Banner"
          />
          <img
            src="https://www.arweave.net/r9V3rs5Ti5-uzbTI0Uz2eucqetChR8eDWmiF0oxEUbM"
            class="gallery-img"
            alt="Automatos V1E8 Banner"
          />
          <img
            src="https://www.arweave.net/jzWJvgZBDoEQsLWwGH76B1jbd_tMR5JEpBL9kNf4B6U"
            class="gallery-img"
            alt="Automatos V1E9 Banner"
          />
          <img
            src="https://www.arweave.net/95GuKnLPaoyuInkkhqOz9R9jXMe8oCWI1dRW-Mzt434"
            class="gallery-img"
            alt="Automatos V1E7 Banner Square"
          />
          <img
            src="https://www.arweave.net/DASLpm2_xbB-QM1QeC3Mdpuo_NmMQqwbOH-YMOcPEds"
            class="gallery-img"
            alt="Automatos V1E8 Banner Square"
          />
          <img
            src="https://www.arweave.net/862kaZXUurfdSZzrfXhpy-h2_SMA4wf6SV2r2mFBans"
            class="gallery-img"
            alt="Automatos V1E8 Banner Square"
          />
</div>

---

## Logo Design

Below are some examples of the logos I have designed, both for clients and for organizations in which I had a position. Aesthetically I specialize in simple logos which incorporate geometric themes, often have double visual meanings, and which work in monochrome contexts.

---

<div class="gallery4">
          <img
            src="https://arweave.net/yLPZGK3KHwEjMEOKXtjzW9ORWTLhGWlA5JbOtUn-3IQ"
            class="gallery-img"
            alt="PubDAO Logo"
          />
          <img
            src="https://arweave.net/3TAVprqLnvqjGYYg8nAP_g3McwdWK9DMxk0UW2ZQwsk"
            class="gallery-img"
            alt="Lobby3 Logo"
          />
          <img
            src="https://arweave.net/Hxdks3FGsej1el1_kmPLNaMfQOUMiv30z47PfeCj4IM"
            class="gallery-img"
            alt="JournoDAO Logo"
          />
          <img
            src="https://arweave.net/-ccfrMYluDqy0chV6f_Uq3BRmDK1CYuqLviNE1IXNAw"
            class="gallery-img"
            alt="DAO Coalition Logo"
          />
          <img
            src="https://arweave.net/LV7qaov2G7j194NaRzia-gONRhErYAxfKxnp5HC1Fbc"
            class="gallery-img"
            alt="Lumen Logo"
          />
          <img
            src="https://arweave.net/2tt04MwrGVCIBX8DkaCcxkY7cOTLvvbgdrH-_A4R76w"
            class="gallery-img"
            alt="aes0p Logo"
          />
          <img
            src="https://arweave.net/7fAZYimO6b4JWlrlU8L-OMGHYkDUXPmD_5Zw4V_6-YI"
            class="gallery-img"
            alt="Chiasma Logo"
          />
          <img
            src="https://arweave.net/MTcov50p5gqybv9gFUK8UBqmhbaT_-nDBiRGiILnN3c"
            class="gallery-img"
            alt="DosiDAO Logo"
          />
          <img
            src="https://arweave.net/XVFr82WjP9OUotbZpHvwsKxM5kvApMSsXYi02rsqx28"
            class="gallery-img"
            alt="Opus Collective Logo"
          />
          <img
            src="https://arweave.net/o3UVsU5OWVQOcO-4Hx3ws_jsSK7NWoO3qJspMqVwo0k"
            class="gallery-img"
            alt="LexDAO Logo"
          />
          <img
            src="https://arweave.net/wZivIrNiLsQn44oBV0VtKSCdzPob4-Pmkg8Lh9TRZ9Y"
            class="gallery-img"
            alt="Haight Street Archives Logo"
          />
          <img
            src="https://arweave.net/d361BXSq_J49_Ltv8kb2HBetop5I0rrZMrfgMIXLESU"
            class="gallery-img"
            alt="PermaPress Logo"
          />
</div>

---

## Brand Kits

For new or established brands, I can provide a kit of graphic assets geared around an event, promotional campaign, or foundational brand identity.

---

<div class="gallery1" style="margin-bottom: 1rem;"> 
  <img src="https://arweave.net/BkvnBpRmp12YtRNaKnMihW3p8Ryx8SvctZ68FVY3TGI" class="gallery-img" alt="Tally_Kit">
</div>

---

## Diagrammatic Design

Below are some examples of my organizational maps and ontological diagrams, made for the purpose of conveying complex architectures in visually streamlined and elegant manners.

---

<div class="gallery-row">
  <div class="gallery-column">
    <img class="gallery-img" src="https://arweave.net/GmlcPkbzbI3XrM2J6ABh4M9dWSZsXZGF4W6_gRgLp-s" alt="DAO Congress Diagrm">
    <img class="gallery-img" src="https://arweave.net/jq7qxuRtub_UrxzZQBkx0qqRm5jRi48ZEzzpHQKv6Q0" alt="Consultant Diagram">
    <img class="gallery-img" src="https://arweave.net/621nN8TWlR0IDZupCnKOyCH8cUbtHQAvlYQOuan_z4o" alt="DAO Assembly Diagram">
    <img class="gallery-img" src="https://arweave.net/bZ_wruNIhb8lx6sM6_FIUmNDfUfPaZ_Icm06sJCDSQ4" alt="DAO 501c3 Diagrm">
    <img class="gallery-img" src="https://arweave.net/vvBkbANs5dW4oyjnHY-DVZ7vph0bCQXeGuZ6v76LRKc" alt="DAO Ambassador Committee Diagram">
    <img class="gallery-img" src="https://arweave.net/Kmo19jfDNMpV6LhWzacaVrhfqa888WUMtV-5be75nRk" alt="Multi Entity Network Diagram">
    
  </div>
  <div class="gallery-column">
    <img class="gallery-img" src="https://arweave.net/lGMlyazUnFdPRBEkfal-5U-y2Gxh536um7EWReAVvv8" alt="Multi-DAO Hub Diagram">
    <img class="gallery-img" src="https://arweave.net/9XoWkon1XGb4NlaJoHuCJz1eS-XnVIFx72Lnvn8jbF4" alt="Education DAO Entity Diagram">
    <img class="gallery-img" src="https://arweave.net/gNoiU8r4Xv-U844idll4N0B-pc00RYIDx918gA66oaA" alt="Progressive Public Goods Diagram">
    <img class="gallery-img" src="https://arweave.net/2PDFV5uBTHTXVusN23-lalnLArAhE5M__X2QHDgTRHk" alt="Signergate Multisig Diagram">
    <img class="gallery-img" src="https://arweave.net/X-2KFh2v99NmzIm_YV1vDEqsXyZXP4NbQ_L_iBG6Hs8" alt="Seed Protocol Diagram">
    <img class="gallery-img" src="https://arweave.net/OEYaGuoOApUEJ5iAFpKLRH8LHDHbsRP3RE0ipMixiB0" alt="Consortium Diagram">
    <img class="gallery-img" src="https://arweave.net/IREOyLX8UYx5zg9OWhuT-oKzi0t7kQLFcvJU6xBnW2c" alt="Moloch Framework Diagram">
  </div>
</div>
