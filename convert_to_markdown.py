#!/usr/bin/env python3
"""
Convert HTML documentation files to Markdown format.
Removes specific elements and extracts the first h1 as frontmatter title.
"""

import os
from pathlib import Path
from bs4 import BeautifulSoup
from markdownify import markdownify as md


def main():
    """Main function to convert all HTML files in the docs directory."""
    # Get the script directory
    script_dir = Path(__file__).parent
    docs_dir = script_dir

    # Create output directory
    output_dir = script_dir / "markdown_output"
    output_dir.mkdir(exist_ok=True)

    # Find all HTML files
    html_files = list(docs_dir.glob("**/*.html"))

    print(f"Found {len(html_files)} HTML files to convert")

    converted_count = 0
    for html_file in html_files:
        try:
            # Get relative path for better directory structure
            rel_path = html_file.relative_to(docs_dir)
            output_path = output_dir / rel_path.with_suffix(".mdx")

            # Read HTML
            with open(html_file, "r", encoding="utf-8") as f:
                html_content = f.read()

            # Parse with BeautifulSoup
            soup = BeautifulSoup(html_content, "html.parser")

            # Extract only the div.col-content if it exists
            col_content = soup.find("div", {"class": "col-content"})

            if col_content:
                # Work with only the col-content div
                working_content = col_content
            else:
                # Fallback to entire soup if col-content doesn't exist
                working_content = soup

            # Elements to decompose (remove)
            elements_to_remove = ['ul.tsd-breadcrumb[aria-label="Breadcrumb"]']

            # Remove specified elements
            for selector in elements_to_remove:
                for element in working_content.select(selector):
                    element.decompose()

            # Extract first h1 for frontmatter
            first_h1 = working_content.find("h1")
            title = first_h1.get_text(strip=True) if first_h1 else "Untitled"

            # Remove h1 from content
            if first_h1:
                first_h1.decompose()

            # Convert to markdown
            markdown_content = md(str(working_content), heading_style="ATX")

            # Create frontmatter
            frontmatter = f"""---
title: {title}
---

"""

            # Combine
            final_content = frontmatter + markdown_content

            # Create output directory
            output_path.parent.mkdir(parents=True, exist_ok=True)

            # Write MDX file
            with open(output_path, "w", encoding="utf-8") as f:
                f.write(final_content)

            converted_count += 1
            print(f"Converted: {rel_path} -> {output_path.relative_to(output_dir)}")

        except Exception as e:
            print(f"Error converting {html_file}: {e}")

    print(f"\nConversion complete! Converted {converted_count}/{len(html_files)} files")
    print(f"Output directory: {output_dir}")


if __name__ == "__main__":
    main()
