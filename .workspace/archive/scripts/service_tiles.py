#!/usr/bin/env python3

import xml.etree.ElementTree as ET
import re
import os
import argparse
from pathlib import Path
import sys
from typing import Optional, List, Dict, Any, Union


class ServiceTileGenerator:
    def __init__(self, xml_path="content/service.xml"):
        self.xml_path = xml_path
        try:
            # Parse the XML file
            self.tree = ET.parse(xml_path)
            self.root = self.tree.getroot()

            # Check for namespaces and handle them
            self.ns = self._get_namespace(self.root)
            if self.ns:
                print(f"Found namespace: {self.ns}")

            # Debug flag
            self.debug = False
        except FileNotFoundError:
            print(f"Error: Could not find XML file at {xml_path}")
            sys.exit(1)
        except ET.ParseError as e:
            print(f"Error parsing XML: {e}")
            sys.exit(1)

    def _slugify(self, text: str) -> str:
        """Convert text into a URL-friendly slug."""
        text = text.lower()
        text = re.sub(r"\s+", "-", text)  # Replace spaces with hyphens
        text = re.sub(
            r"[^\w\-]+", "", text
        )  # Remove non-alphanumeric characters except hyphens
        text = re.sub(
            r"\-\-+", "-", text
        )  # Replace multiple hyphens with single hyphen
        text = text.strip("-")  # Remove leading/trailing hyphens
        return text

    def _get_namespace(self, element):
        """Extract namespace from element tag"""
        if "}" in element.tag:
            return "{" + element.tag.split("}")[0].strip("{") + "}"
        return ""

    def _with_ns(self, tag):
        """Add namespace to tag if needed"""
        return f"{self.ns}{tag}"

    def _safe_get_text(self, element: Optional[ET.Element]) -> str:
        """Safely get text from an element, handling None cases"""
        if element is None:
            return ""
        return element.text or ""

    def _wrap_list_items(
        self, items: List[ET.Element], wrapper_class: str, title: str
    ) -> str:
        """Convert a list of XML elements to an HTML list with a title"""
        if not items:
            return ""

        html = f'<div class="{wrapper_class}"><strong>{title}:</strong><ul>'
        for item in items:
            item_text = self._safe_get_text(item)
            if item_text.strip():
                html += f"<li>{item_text}</li>"
        html += "</ul></div>"
        return html

    def find_element_by_id(self, service_id: str) -> Optional[ET.Element]:
        """Find an element in the XML by its ID"""
        # Remove "service-" prefix if it exists in the input
        if service_id.startswith("service-"):
            clean_id = service_id[8:]  # Remove "service-" prefix
        else:
            clean_id = service_id

        if self.debug:
            print(f"Looking for service with ID: {clean_id}")

        # Handle top-level service numeric IDs (1, 2, 3)
        if clean_id.isdigit() and 1 <= int(clean_id) <= 3:
            # Find services that have a numeric ID matching the requested ID
            for service in self.root.findall(f".//{self._with_ns('Service')}"):
                metadata = service.find(f".//{self._with_ns('Metadata')}")
                if metadata is not None:
                    id_elem = metadata.find(f".//{self._with_ns('id')}")
                    if id_elem is not None and self._safe_get_text(id_elem) == clean_id:
                        if self.debug:
                            print(f"Found top-level service with id: {clean_id}")
                        return service
            return None

        # Look for an element with ID attribute matching service-ID
        for service in self.root.findall(f".//{self._with_ns('Service')}"):
            metadata = service.find(f".//{self._with_ns('Metadata')}")
            if metadata is not None:
                id_elem = metadata.find(f".//{self._with_ns('ID')}")
                if (
                    id_elem is not None
                    and self._safe_get_text(id_elem) == f"service-{clean_id}"
                ):
                    if self.debug:
                        print(f"Found service with ID: service-{clean_id}")
                    return service

                # Also try the ID attribute directly
                if metadata.get("ID") == f"service-{clean_id}":
                    if self.debug:
                        print(f"Found service with ID attribute: service-{clean_id}")
                    return service

        # For numeric IDs, try to navigate through numeric IDs
        if clean_id.replace(".", "").isdigit():
            parts = clean_id.split(".")

            # Top level service (1, 2, 3)
            if len(parts) == 1:
                for service in self.root.findall(f".//{self._with_ns('Service')}"):
                    metadata = service.find(f".//{self._with_ns('Metadata')}")
                    if metadata is not None:
                        id_elem = metadata.find(f".//{self._with_ns('id')}")
                        if (
                            id_elem is not None
                            and self._safe_get_text(id_elem) == parts[0]
                        ):
                            if self.debug:
                                print(f"Found service with numeric id: {parts[0]}")
                            return service

            # Second level (1.1, 2.1, etc)
            elif len(parts) == 2:
                parent_id = parts[0]
                child_id = clean_id  # Full ID like 1.1

                # First find the parent service
                for service in self.root.findall(f".//{self._with_ns('Service')}"):
                    metadata = service.find(f".//{self._with_ns('Metadata')}")
                    if metadata is None:
                        continue

                    parent_id_elem = metadata.find(f".//{self._with_ns('id')}")
                    if (
                        parent_id_elem is None
                        or self._safe_get_text(parent_id_elem) != parent_id
                    ):
                        continue

                    # Now look for packages and retainers
                    for package in service.findall(f".//{self._with_ns('Package')}"):
                        pkg_id = package.find(f".//{self._with_ns('id')}")
                        if (
                            pkg_id is not None
                            and self._safe_get_text(pkg_id) == child_id
                        ):
                            if self.debug:
                                print(f"Found package with id: {child_id}")
                            return package

                    for retainer in service.findall(f".//{self._with_ns('Retainer')}"):
                        ret_id = retainer.find(f".//{self._with_ns('id')}")
                        if (
                            ret_id is not None
                            and self._safe_get_text(ret_id) == child_id
                        ):
                            if self.debug:
                                print(f"Found retainer with id: {child_id}")
                            return retainer

            # Third level (1.1.1, 2.1.2, etc)
            elif len(parts) == 3:
                parent_id = f"{parts[0]}.{parts[1]}"  # e.g., 1.1
                child_id = clean_id  # Full ID like 1.1.1

                # Look for tiers in packages
                for package in self.root.findall(f".//{self._with_ns('Package')}"):
                    pkg_id = package.find(f".//{self._with_ns('id')}")
                    if pkg_id is None or self._safe_get_text(pkg_id) != parent_id:
                        continue

                    for tier in package.findall(f".//{self._with_ns('Tier')}"):
                        tier_id = tier.find(f".//{self._with_ns('id')}")
                        if (
                            tier_id is not None
                            and self._safe_get_text(tier_id) == child_id
                        ):
                            if self.debug:
                                print(f"Found tier with id: {child_id}")
                            return tier

                # Look for modules in retainers
                for retainer in self.root.findall(f".//{self._with_ns('Retainer')}"):
                    ret_id = retainer.find(f".//{self._with_ns('id')}")
                    if ret_id is None or self._safe_get_text(ret_id) != parent_id:
                        continue

                    for module in retainer.findall(f".//{self._with_ns('Module')}"):
                        mod_id = module.find(f".//{self._with_ns('id')}")
                        if (
                            mod_id is not None
                            and self._safe_get_text(mod_id) == child_id
                        ):
                            if self.debug:
                                print(f"Found module with id: {child_id}")
                            return module

        # Final fallback - look for name match
        name_to_find = clean_id.replace("-", " ").title()
        for service in self.root.findall(f".//{self._with_ns('Service')}"):
            name_elem = service.find(f".//{self._with_ns('Name')}")
            if (
                name_elem is not None
                and self._safe_get_text(name_elem).lower() == name_to_find.lower()
            ):
                if self.debug:
                    print(f"Found service with name: {name_to_find}")
                return service

        return None

    def generate_tile_inner_html(self, service_id: str) -> Dict[str, str]:
        """Generate the separate HTML components for a service tile (banner, content, explore)."""
        element = self.find_element_by_id(service_id)

        if element is None:
            # Return empty components for not found
            return {
                "banner": "",
                "content": f'<div class="service-tile" data-service-id="{service_id}"><p class="service-tile-error">Service ID "{service_id}" not found</p></div>',
                "explore": "",
            }

        # Determine the element's type and level
        element_tag = element.tag.split("}")[-1]  # Get tag name without namespace
        is_top_level_service = False
        is_package_or_retainer = False
        is_tier_or_module = False

        id_elem = element.find(f".//{self._with_ns('id')}")
        element_id_text = self._safe_get_text(id_elem) if id_elem is not None else ""

        if element_tag == "Service":
            # Check if it's a top-level service by its numeric ID (1, 2, 3)
            if element_id_text.isdigit() and 1 <= int(element_id_text) <= 3:
                is_top_level_service = True
        elif element_tag in ["Package", "Retainer"]:
            # Check if it's a package/retainer with a single decimal ID (X.Y)
            if (
                element_id_text
                and "." in element_id_text
                and element_id_text.count(".") == 1
            ):
                is_package_or_retainer = True
        elif element_tag in ["Tier", "Module"]:
            # Check if it's a tier/module with a two-decimal ID (X.Y.Z)
            if (
                element_id_text
                and "." in element_id_text
                and element_id_text.count(".") == 2
            ):
                is_tier_or_module = True

        # Clean the service ID for later use in data attribute
        clean_id = service_id[8:] if service_id.startswith("service-") else service_id

        # Extract basic details (Name and Description are common)
        name_elem = element.find(f".//{self._with_ns('Name')}")
        name = (
            self._safe_get_text(name_elem)
            if name_elem is not None
            else "Unnamed Service"
        )

        desc_elem = element.find(f".//{self._with_ns('Description')}")
        description = self._safe_get_text(desc_elem) if desc_elem is not None else ""

        # Determine service type and banner text
        banner_text = ""
        if is_package_or_retainer:
            if element.tag.endswith("Package"):
                banner_text = "Service Package"
            elif element.tag.endswith("Retainer"):
                banner_text = "Service Retainer"
            else:
                # Default case if we can't determine specifically
                banner_text = "Service Offering"
        else:
            # Top-level services (1, 2, 3)
            if clean_id.isdigit() and 1 <= int(clean_id) <= 3:
                banner_text = "Service Category"
            else:
                # For other types (like tiers, modules)
                if element.tag.endswith("Tier"):
                    banner_text = "Service Tier"
                elif element.tag.endswith("Module"):
                    banner_text = "Add-On Module"
                else:
                    banner_text = "Service Component"

        # Create banner HTML
        banner_html = f'<div class="service-tile-banner">{banner_text}</div>'

        # Try to find pricing information
        price_html = ""
        # Only show the main price for Tier or Module level elements
        if is_tier_or_module:
            price_element = element.find(f".//{self._with_ns('BasePrice')}")
            if price_element is not None:
                price = self._safe_get_text(price_element)
                currency = price_element.get("currency", "USD")
                price_html = f'<p class="service-tile-price"><strong>Price:</strong> ${price} {currency}</p>'

            # Check for RecurringPrice (for retainers or modules)
            recurring_element = element.find(f".//{self._with_ns('RecurringPrice')}")
            if recurring_element is not None:
                price = self._safe_get_text(recurring_element)
                currency = recurring_element.get("currency", "USD")
                frequency = recurring_element.get("frequency", "monthly")
                price_html = f'<p class="service-tile-price"><strong>Price:</strong> ${price} {currency}/{frequency}</p>'

            # Check for other pricing types specific to modules
            per_session_element = element.find(f".//{self._with_ns('PerSessionFee')}")
            if per_session_element is not None:
                price = self._safe_get_text(per_session_element)
                currency = per_session_element.get("currency", "USD")
                price_html = f'<p class="service-tile-price"><strong>Price:</strong> ${price} {currency}/session</p>'

            range_element = element.find(f".//{self._with_ns('RangeFee')}")
            if range_element is not None:
                min_price = range_element.get("min")
                max_price = range_element.get("max")
                currency = range_element.get("currency", "USD")
                basis = self._safe_get_text(range_element)
                if min_price and max_price:
                    price_html = f'<p class="service-tile-price"><strong>Price:</strong> ${min_price}-{max_price} {currency} ({basis})</p>'
                else:
                    price_html = f'<p class="service-tile-price"><strong>Price:</strong> {basis}</p>'

            custom_quote_element = element.find(f".//{self._with_ns('CustomQuote')}")
            if custom_quote_element is not None:
                basis = self._safe_get_text(custom_quote_element)
                price_html = (
                    f'<p class="service-tile-price"><strong>Price:</strong> {basis}</p>'
                )

        # --- Conditional Content Generation based on Level ---

        main_content_html = (
            ""  # This will hold the list of children or deliverables/services
        )

        if is_top_level_service:
            # For top-level services, list child packages and retainers
            offering_elem = element.find(
                f".//{self._with_ns('Offering')}"
            )  # Look for direct Offering child
            if offering_elem is not None:
                child_items = offering_elem.findall(
                    f".//{self._with_ns('Package')}"
                ) + offering_elem.findall(f".//{self._with_ns('Retainer')}")
                if child_items:
                    main_content_html = '<div class="service-tile-offerings"><strong>Offerings:</strong><ul>'
                    for child_item in child_items:
                        child_name_elem = child_item.find(
                            f".//{self._with_ns('Name')}"
                        )  # Look for direct Name child
                        child_name = (
                            self._safe_get_text(child_name_elem)
                            if child_name_elem is not None
                            else "Unnamed Offering"
                        )
                        child_desc_elem = child_item.find(
                            f".//{self._with_ns('Description')}"
                        )  # Look for direct Description child
                        child_description = (
                            self._safe_get_text(child_desc_elem)
                            if child_desc_elem is not None
                            else ""
                        )
                        child_id_elem = child_item.find(
                            f".//{self._with_ns('id')}"
                        )  # Look for direct id child
                        child_id = (
                            self._safe_get_text(child_id_elem)
                            if child_id_elem is not None
                            else ""
                        )

                        # Determine if the child is a Package or Retainer for slug generation
                        child_type = ""
                        if child_item.tag.endswith("Package"):
                            child_type = "Package"
                        elif child_item.tag.endswith("Retainer"):
                            child_type = "Retainer"

                        # Create the slug based on name only
                        target_slug = self._slugify(child_name)

                        # Generate the link targeting the heading in /services.md
                        main_content_html += f'<li><a href="/services#{target_slug}"><strong>{child_name}</strong></a><span class="offering-desc">: {child_description}</span></li>'

                    main_content_html += "</ul></div>"

                    # Prepare the Explore Offerings button HTML (don't add it to main_content_html yet)
                    category_slug = self._slugify(name)  # Slugify the category name
                    explore_button_html = f'\n<div class="service-tile-explore">\n  <a href="/services#{category_slug}" class="button">Explore Offerings</a>\n</div>'
                else:
                    explore_button_html = ""  # No offerings, no explore button
            else:
                explore_button_html = ""  # No offerings element, no explore button

        elif is_package_or_retainer:
            # For package/retainers, list tiers or direct deliverables/services
            tiers = element.findall(
                f".//{self._with_ns('Tiers')}/{self._with_ns('Tier')}"
            )  # Look for direct Tiers child
            modules = element.findall(
                f".//{self._with_ns('AddOnModules')}/{self._with_ns('Module')}"
            )  # Look for direct Module child

            if tiers:
                # List tiers and their specific deliverables
                tiers_html = '<div class="service-tile-tiers"><strong>Available Tiers:</strong><ul>'
                for tier in tiers:
                    tier_name_elem = tier.find(
                        f".//{self._with_ns('Name')}"
                    )  # Look for direct Name child
                    tier_name = (
                        self._safe_get_text(tier_name_elem)
                        if tier_name_elem is not None
                        else "Unnamed Tier"
                    )

                    tier_desc_elem = tier.find(
                        f".//{self._with_ns('Description')}"
                    )  # Look for direct Description child
                    tier_desc = (
                        self._safe_get_text(tier_desc_elem)
                        if tier_desc_elem is not None
                        else ""
                    )

                    tier_id_elem = tier.find(
                        f".//{self._with_ns('id')}"
                    )  # Look for direct id child
                    tier_id = (
                        self._safe_get_text(tier_id_elem)
                        if tier_id_elem is not None
                        else ""
                    )

                    tier_price_elem = tier.find(
                        f".//{self._with_ns('Pricing')}/{self._with_ns('BasePrice')}"
                    )  # Look for direct Pricing/BasePrice child
                    tier_price = ""
                    if tier_price_elem is not None:
                        price = self._safe_get_text(tier_price_elem)
                        currency = tier_price_elem.get("currency", "USD")
                        tier_price = f" - ${price} {currency}"

                    # Get discounts for this tier only
                    tier_discounts_html = ""
                    discounts = tier.findall(
                        f".//{self._with_ns('Discounts')}/{self._with_ns('Discount')}"
                    )  # Look for direct Discounts/Discount child
                    if discounts:
                        tier_discounts_html = '<ul class="tier-discounts">'
                        for discount in discounts:
                            condition_elem = discount.find(
                                f".//{self._with_ns('Condition')}"  # Look for direct Condition child
                            )
                            condition = (
                                self._safe_get_text(condition_elem)
                                if condition_elem is not None
                                else ""
                            )

                            amount_elem = discount.find(
                                f".//{self._with_ns('Amount')}"
                            )  # Look for direct Amount child
                            if amount_elem is not None:
                                amount = self._safe_get_text(amount_elem)
                                currency = amount_elem.get("currency", "USD")
                                tier_discounts_html += (
                                    f"<li>{condition}: ${amount} {currency}</li>"
                                )
                        tier_discounts_html += "</ul>"

                    # Get deliverables specific to this tier
                    tier_deliverables = tier.findall(
                        f".//{self._with_ns('Deliverables')}/{self._with_ns('Deliverable')}"
                    )  # Look for direct Deliverables/Deliverable child
                    tier_deliverables_list_html = ""
                    if tier_deliverables:
                        tier_deliverables_list_html = '<ul class="tier-deliverables-list"><strong>Deliverables:</strong>'
                        for item in tier_deliverables:
                            item_text = self._safe_get_text(item)
                            if item_text.strip():
                                tier_deliverables_list_html += f"<li>{item_text}</li>"
                        tier_deliverables_list_html += "</ul>"

                    # Add tier details including its deliverables/services
                    tiers_html += (
                        f"<li><strong>{tier_name}</strong>{tier_price}: {tier_desc}"
                    )
                    if tier_deliverables_list_html:
                        tiers_html += tier_deliverables_list_html
                    if tier_discounts_html:
                        tiers_html += tier_discounts_html
                    tiers_html += "</li>"

                tiers_html += "</ul></div>"
                main_content_html = tiers_html

                # Ensure explore_button_html is empty for these types
                explore_button_html = ""

            elif modules:
                # List modules and their specific deliverables
                modules_html = '<div class="service-tile-modules"><strong>Add-On Modules:</strong><ul>'
                for module in modules:
                    module_name_elem = module.find(
                        f".//{self._with_ns('Name')}"
                    )  # Look for direct Name child
                    module_name = (
                        self._safe_get_text(module_name_elem)
                        if module_name_elem is not None
                        else "Unnamed Module"
                    )
                    module_desc_elem = module.find(
                        f".//{self._with_ns('Description')}"
                    )  # Look for direct Description child
                    module_description = (
                        self._safe_get_text(module_desc_elem)
                        if module_desc_elem is not None
                        else ""
                    )
                    module_id_elem = module.find(
                        f".//{self._with_ns('id')}"
                    )  # Look for direct id child
                    module_id = (
                        self._safe_get_text(module_id_elem)
                        if module_id_elem is not None
                        else ""
                    )

                    # Get pricing for the module
                    module_price_html = ""
                    pricing_elem = module.find(
                        f".//{self._with_ns('Pricing')}"
                    )  # Look for direct Pricing child
                    if pricing_elem is not None:
                        setup_fee_elem = pricing_elem.find(
                            f".//{self._with_ns('SetupFee')}"
                        )
                        if setup_fee_elem is not None:
                            price = self._safe_get_text(setup_fee_elem)
                            currency = setup_fee_elem.get("currency", "USD")
                            module_price_html += f"Setup Fee: ${price} {currency}"

                        recurring_fee_elem = pricing_elem.find(
                            f".//{self._with_ns('RecurringFee')}"
                        )
                        if recurring_fee_elem is not None:
                            price = self._safe_get_text(recurring_fee_elem)
                            currency = recurring_fee_elem.get("currency", "USD")
                            frequency = recurring_fee_elem.get("frequency", "monthly")
                            if module_price_html:
                                module_price_html += ", "
                            module_price_html += (
                                f"Recurring Fee: ${price} {currency}/{frequency}"
                            )

                        per_session_fee_elem = pricing_elem.find(
                            f".//{self._with_ns('PerSessionFee')}"
                        )
                        if per_session_fee_elem is not None:
                            price = self._safe_get_text(per_session_fee_elem)
                            currency = per_session_fee_elem.get("currency", "USD")
                            if module_price_html:
                                module_price_html += ", "
                            module_price_html += f"Per Session Fee: ${price} {currency}"

                        range_fee_elem = pricing_elem.find(
                            f".//{self._with_ns('RangeFee')}"
                        )
                        if range_fee_elem is not None:
                            min_price = range_fee_elem.get("min")
                            max_price = range_fee_elem.get("max")
                            currency = range_fee_elem.get("currency", "USD")
                            basis = self._safe_get_text(range_fee_elem)
                            if module_price_html:
                                module_price_html += ", "
                            if min_price and max_price:
                                module_price_html += f"Price: ${min_price}-${max_price} {currency} ({basis})"
                            else:
                                module_price_html += f"Price: {basis}"

                        custom_quote_elem = pricing_elem.find(
                            f".//{self._with_ns('CustomQuote')}"
                        )
                        if custom_quote_elem is not None:
                            basis = self._safe_get_text(custom_quote_elem)
                            if module_price_html:
                                module_price_html += ", "
                            module_price_html += f"Price: {basis}"

                    # Get deliverables specific to this module
                    module_deliverables = module.findall(
                        f".//{self._with_ns('Deliverables')}/{self._with_ns('Deliverable')}"
                    )  # Look for direct Deliverables/Deliverable child
                    module_deliverables_list_html = ""
                    if module_deliverables:
                        module_deliverables_list_html = '<ul class="module-deliverables-list"><strong>Deliverables:</strong>'
                        for item in module_deliverables:
                            item_text = self._safe_get_text(item)
                            if item_text.strip():
                                module_deliverables_list_html += f"<li>{item_text}</li>"
                        module_deliverables_list_html += "</ul>"

                    modules_html += (
                        f"<li><strong>{module_name}</strong>: {module_description}"
                    )
                    if module_price_html:
                        modules_html += f" ({module_price_html})"
                    if module_deliverables_list_html:
                        modules_html += module_deliverables_list_html
                    modules_html += "</li>"

                modules_html += "</ul></div>"
                main_content_html = modules_html

                # Ensure explore_button_html is empty for these types
                explore_button_html = ""

            else:
                # If no tiers/modules, list direct deliverables/services for the package/retainer
                deliverables = element.findall(
                    f".//{self._with_ns('Deliverables')}/{self._with_ns('Deliverable')}"
                )  # Look for direct Deliverables child
                services = element.findall(
                    f".//{self._with_ns('Services')}/{self._with_ns('Service')}"
                )  # Look for direct Services child

                if deliverables:
                    main_content_html = self._wrap_list_items(
                        deliverables, "service-tile-deliverables", "Deliverables"
                    )
                elif (
                    services
                ):  # Prioritize services for retainers if both are present, though typically only one or the other
                    main_content_html = self._wrap_list_items(
                        services, "service-tile-services", "Included Services"
                    )

                # Ensure explore_button_html is empty for these types
                explore_button_html = ""

        elif is_tier_or_module:
            # For tiers/modules, list their specific deliverables or services
            deliverables = element.findall(
                f".//{self._with_ns('Deliverables')}/{self._with_ns('Deliverable')}"
            )  # Look for direct Deliverables child
            services = element.findall(
                f".//{self._with_ns('Services')}/{self._with_ns('Service')}"
            )  # Look for direct Services child

            if deliverables:
                main_content_html = self._wrap_list_items(
                    deliverables, "service-tile-deliverables", "Deliverables"
                )
            elif services:
                main_content_html = self._wrap_list_items(
                    services, "service-tile-services", "Included Services"
                )

            # Ensure explore_button_html is empty for these types
            explore_button_html = ""

        # Assemble the main *content* tile HTML (excluding banner and explore)
        content_html = f"""<div class="service-tile" data-service-id="{clean_id}">
  <h3>{name}</h3>
  <p class="service-tile-description">{description}</p>
  {price_html}
  {main_content_html}
</div>"""

        # Return the components separately
        return {
            "banner": banner_html,
            "content": content_html,
            "explore": explore_button_html,
        }

    def generate_tile_html(
        self,
        service_id: str,
        css_class: str = "service-tile",  # css_class might be unused now
    ) -> str:
        """Generate HTML for a full service tile section (wrapper, banner, content, explore)."""
        components = self.generate_tile_inner_html(service_id)

        # Assemble in the desired order: Wrapper > Banner > Content > Explore
        # Clean service_id for the outer div ID
        clean_id_for_wrapper = (
            service_id  # Keep original service_id like '1', '1.1' etc.
        )
        if service_id.startswith("service-"):
            clean_id_for_wrapper = service_id[8:]

        full_html = f'<div id="service-{clean_id_for_wrapper}">\n'
        if components["banner"]:
            full_html += f'  {components["banner"]}\n'
        full_html += f'  {components["content"]}\n'
        if components["explore"]:
            full_html += f'  {components["explore"]}\n'
        full_html += "</div>"

        return full_html

    def process_markdown_file(self, md_file_path: str) -> bool:
        """Process a markdown file, replacing service tile placeholders"""
        try:
            with open(md_file_path, "r", encoding="utf-8") as file:
                content = file.read()
        except (FileNotFoundError, PermissionError) as e:
            print(f"Error reading file {md_file_path}: {e}")
            return False

        # Keep track of changes
        changes_made = False
        processed_content = content

        # Extract service IDs from the XML file
        available_service_ids = set()
        for elem in self.root.iter():
            if elem.tag.endswith("id"):
                id_value = self._safe_get_text(elem)
                if id_value:
                    available_service_ids.add(id_value)

        # For each available service ID in our XML
        for service_id in available_service_ids:
            # Define the pattern for the outer div wrapper based on the service ID
            clean_id_for_wrapper = service_id
            if service_id.startswith("service-"):
                clean_id_for_wrapper = service_id[8:]
            pattern = rf'<div\s+id="service-{re.escape(clean_id_for_wrapper)}"[^>]*>'  # Escape potential '.' in ID

            matches = list(re.finditer(pattern, processed_content))

            # Skip if no instances of this service ID
            if not matches:
                continue

            # Generate the full HTML for this service (banner, content, explore)
            full_tile_html = self.generate_tile_html(service_id)

            # For each match, replace the entire div section
            for match in reversed(
                matches
            ):  # Process in reverse to avoid index shifting
                start_pos = match.start()

                # Find the end of this div section - more robustly
                remainder = processed_content[match.end() :]
                open_count = 1
                end_pos = -1
                i = 0
                while i < len(remainder):
                    if remainder[i:].startswith("<div"):
                        # Simple check, could be more robust with regex if needed
                        open_count += 1
                        i += 4  # Skip past '<div'
                    elif remainder[i:].startswith("</div>"):
                        open_count -= 1
                        if open_count == 0:
                            end_pos = match.end() + i + 6  # Position after '</div>'
                            break
                        i += 6  # Skip past '</div>'
                    else:
                        i += 1

                if end_pos != -1:
                    # Replace the entire found block
                    processed_content = (
                        processed_content[:start_pos]
                        + full_tile_html
                        + processed_content[end_pos:]
                    )
                    changes_made = True
                else:
                    # Could not find matching end tag - this might indicate broken HTML
                    # Optionally log a warning or handle differently
                    print(
                        f"Warning: Could not find closing tag for {pattern} near character {start_pos} in {md_file_path}"
                    )
                    # Fallback: Just replace the opening tag (might leave orphaned content)
                    processed_content = (
                        processed_content[:start_pos]
                        + full_tile_html
                        + processed_content[match.end() :]
                    )
                    changes_made = True

        # If no changes were made, return False
        if not changes_made:
            return False

        # Write back the file
        try:
            with open(md_file_path, "w", encoding="utf-8") as file:
                file.write(processed_content)
            return True
        except PermissionError as e:
            print(f"Error writing to file {md_file_path}: {e}")
            return False

    def debug_xml_structure(self):
        """Print the XML structure to help with debugging"""
        print("\nXML Structure Debug:")
        print(f"Root tag: {self.root.tag}")

        print("\nServices:")
        for i, service in enumerate(
            self.root.findall(f".//{self._with_ns('Service')}")
        ):
            print(f"  Service {i+1}:")

            # Print Metadata
            metadata = service.find(f".//{self._with_ns('Metadata')}")
            if metadata is not None:
                print(f"    Metadata found")
                for child in metadata:
                    print(
                        f"      {child.tag.split('}')[-1]}: {self._safe_get_text(child)}"
                    )

            # Print offerings
            offering = service.find(f".//{self._with_ns('Offering')}")
            if offering is not None:
                print(f"    Offering found")

                # Print packages
                for j, package in enumerate(
                    offering.findall(f".//{self._with_ns('Package')}")
                ):
                    print(f"      Package {j+1}:")
                    for child in package:
                        if child.tag.endswith("id"):
                            print(f"        id: {self._safe_get_text(child)}")
                        elif child.tag.endswith("Name"):
                            print(f"        Name: {self._safe_get_text(child)}")

        print("\nElements with 'ID' attributes:")
        for elem in self.root.iter():
            if "ID" in elem.attrib:
                print(f"  Tag: {elem.tag.split('}')[-1]}, ID: {elem.get('ID')}")

        print("\nElements with 'id' attributes:")
        for elem in self.root.iter():
            if "id" in elem.attrib:
                print(f"  Tag: {elem.tag.split('}')[-1]}, id: {elem.get('id')}")

        print("\nStandalone <id> elements:")
        for elem in self.root.iter():
            if elem.tag.endswith("id"):
                # ElementTree doesn't have getparent
                try:
                    parent_path = [
                        p.tag.split("}")[-1]
                        for p in self.root.findall(f".//*/{elem.tag}/..")
                    ]
                    print(
                        f"  Element: {elem.tag.split('}')[-1]}, Value: {self._safe_get_text(elem)}, Possible parents: {parent_path[:5]}"
                    )
                except Exception as e:
                    print(
                        f"  Element: {elem.tag.split('}')[-1]}, Value: {self._safe_get_text(elem)}"
                    )

    def generate_css(self) -> str:
        """Generate CSS for service tiles"""
        return """<style>
/* Service Tile Styles */
/* Main service container styling */
div[id^="service-"] {
  margin-bottom: 2rem; /* Space between service blocks */
  background: transparent; /* Ensure container is transparent */
  border-radius: 8px; /* Rounded corners for the whole container */
  overflow: hidden; /* Ensure child borders stay within container */
  box-shadow: 0 2px 6px rgba(0,0,0,0.1); /* Apply shadow to the container */
  border: 4px solid red;
}

/* Individual tile styling */
.service-tile {
  border: 1px solid var(--lightgray);
  border-top: none; /* Remove top border as banner is now separate */
  border-bottom: none; /* Remove bottom border as explore is now separate */
  padding: 1.5rem;
  margin-bottom: 0; /* Remove margin if explore is directly below */
  border-radius: 0; /* Remove rounding as banner/explore handle corners */
  background-color: var(--light);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative; /* CRITICAL: Needed for absolute positioning of children */
}

.service-tile:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.service-tile-banner {
  background-color: var(--secondary);
  color: white;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.3rem 0.7rem;
  margin: -1.5rem -1.5rem 1rem -1.5rem;
  border-radius: 8px 8px 0 0;
  font-weight: 600;
}

.service-tile h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: var(--dark);
  font-size: 1.25rem;
}

.service-tile p {
  margin-bottom: 0.75rem;
  color: var(--darkgray);
  line-height: 1.5;
}

.service-tile-description {
  font-size: 0.95rem;
}

.service-tile-price {
  font-size: 1rem;
  margin-top: 1rem;
}

.service-tile strong {
  color: var(--dark);
  font-weight: 600;
}

.service-tile ul {
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.service-tile li {
  color: var(--gray);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.service-tile-deliverables,
.service-tile-services,
.service-tile-discounts,
.service-tile-tiers {
  margin-top: 1rem;
}

.service-tile-tiers li {
  margin-bottom: 1rem;
}

.tier-discounts {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.tier-discounts li {
  color: var(--gray);
  margin-bottom: 0.25rem;
  font-size: 0.85rem;
  font-style: italic;
}

.service-tile-explore {
  width: 100%; /* Ensure it spans the full width */
  background-color: var(--gray); /* Match banner background - user changed this */
  padding: 0.3rem 0.7rem;
  margin-top: 0; /* Ensure it touches the content tile */
  margin-bottom: 1.5rem; /* Add margin below the whole block */
  border-radius: 0 0 8px 8px; /* Round bottom corners like footer */
  text-align: center;
  box-sizing: border-box;
}

.service-tile-explore a.button, /* Target the link */
.service-tile-explore a { /* Be more general just in case */
  color: white; /* Match banner text color */
  text-decoration: none;
  font-weight: 600; /* Match banner font weight */
  font-size: 0.9rem; /* Slightly larger, more readable link text */
  display: inline-block; /* Ensure proper block behavior for link */
}

.service-tile-error {
  border-color: #ff5252;
  background-color: #ffeded;
  color: #d32f2f;
  padding: 1rem;
}

/* Dark mode adjustments */
:root.dark div[id^="service-"] {
  box-shadow: 0 2px 6px rgba(0,0,0,0.4); /* Darker shadow for dark mode */
}

:root.dark .service-tile {
  background-color: var(--darkgray);
  border-color: var(--dark);
}

:root.dark .service-tile-banner {
  background-color: var(--tertiary);
}

:root.dark .service-tile h3 {
  color: var(--light);
}

:root.dark .service-tile p {
  color: var(--lightgray);
}

:root.dark .service-tile strong {
  color: var(--light);
}

:root.dark .service-tile li {
  color: var(--lightgray);
}

:root.dark .tier-discounts li {
  color: var(--lightgray);
}

:root.dark .service-tile-error {
  background-color: rgba(255, 82, 82, 0.2);
  color: #ff8a8a;
}
</style>"""

    def process_directory(self, directory: str = "content") -> int:
        """Process all markdown files in a directory"""
        count = 0
        try:
            for root, _, files in os.walk(directory):
                for file in files:
                    if file.endswith(".md"):
                        file_path = os.path.join(root, file)
                        if self.process_markdown_file(file_path):
                            count += 1
                            print(f"Updated: {file_path}")
        except Exception as e:
            print(f"Error processing directory {directory}: {e}")
        return count


def main():
    parser = argparse.ArgumentParser(description="Generate service tiles from XML")
    parser.add_argument(
        "--xml", default="content/service.xml", help="Path to service.xml file"
    )
    parser.add_argument("--file", help="Process a specific markdown file")
    parser.add_argument(
        "--dir", default="content", help="Directory to process markdown files"
    )
    parser.add_argument(
        "--css", action="store_true", help="Output CSS to include in your themes"
    )
    parser.add_argument(
        "--css-file", help="Write CSS to a specific file instead of stdout"
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Enable verbose output"
    )
    parser.add_argument(
        "--debug",
        action="store_true",
        help="Print debug information about XML structure",
    )

    args = parser.parse_args()

    if args.verbose:
        print(f"Using XML file: {args.xml}")

    generator = ServiceTileGenerator(args.xml)

    if args.debug:
        generator.debug = True
        generator.debug_xml_structure()
        return

    if args.css:
        css = generator.generate_css()
        if args.css_file:
            try:
                with open(args.css_file, "w", encoding="utf-8") as f:
                    f.write(css)
                print(f"CSS written to {args.css_file}")
            except Exception as e:
                print(f"Error writing CSS to {args.css_file}: {e}")
        else:
            print(css)
        return

    if args.file:
        if generator.process_markdown_file(args.file):
            print(f"Successfully processed file: {args.file}")
        else:
            print(f"No service placeholders found in {args.file} or error occurred")
    else:
        count = generator.process_directory(args.dir)
        print(f"Processed {count} markdown files in {args.dir}")


if __name__ == "__main__":
    main()
