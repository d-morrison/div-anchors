
<!-- README.md is generated from README.Rmd. Please edit that file -->

# qwt (<u>Q</u>uarto <u>W</u>ebsite <u>T</u>emplate)

<!-- badges: start -->

<!-- badges: end -->

A template repository for creating websites with
[Quarto](https://quarto.org/). This template provides everything you
need to quickly start writing your own website.

## Features

- 🌐 **Website-ready structure** with sample chapters and references
- 🎨 **Customizable themes** supporting light and dark modes
- 🚀 **Automatic deployment** to GitHub Pages via GitHub Actions
- 🔗 **Automated link checking** to ensure all URLs are reachable
- �� **Multiple output formats** including HTML, PDF, RevealJS slides, and DOCX
- 📑 **Bibliography support** with BibTeX integration
- 🔢 **Automatic numbering** of sections and cross-references
- 💅 **Custom CSS** for styling your website
- 🔍 **PR Preview** with change highlighting for pull requests
- ✅ **Automated checks** including spell checking and linting
- 🤖 **GitHub Copilot integration** with custom setup steps
- 📝 **AI-powered issue summaries** for new issues

## Quick Start

### Using this template

1.  Click the "Use this template" button at the top of this repository
2.  Name your new repository and create it
3.  Clone your new repository to your local machine

``` bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git
cd YOUR-REPO
```

### Prerequisites

You need to have [Quarto](https://quarto.org/) installed. Download it
from
[quarto.org/docs/get-started](https://quarto.org/docs/get-started/).

To verify Quarto is installed:

``` bash
quarto --version
```

### Customize your website

1.  **Edit `_quarto-website.yml`** to update:

    - Website title and site URL
    - Repository URL
    - Navigation menu items
    - Theme and styling options

2.  **Modify `index.qmd`** to create your website's homepage

3.  **Edit or create pages** (`.qmd` files):

    - Modify files in the `chapters/` directory as needed
    - Create new pages and add them to the navigation menu in
      `_quarto-website.yml`

4.  **Add references** to `references.bib` in BibTeX format

5.  **Customize styling** in `styles.css`

## Building the website

### Local preview

To preview your website with live reload during development:

``` bash
quarto preview
```

This will open your website in a web browser and automatically refresh
when you make changes.

### Render the website

To render the complete website:

``` bash
quarto render
```

The output will be generated in the `_site/` directory.

### Multiple output formats

This template supports multiple output formats through Quarto profiles:

- **Website** (default): `quarto render` or
  `quarto render --profile website`
- **RevealJS slides**: `quarto render --profile revealjs` (output in
  `_slides/`)
- **PDF handouts**: `quarto render --profile handout` (output in
  `_handouts/`)

## Publishing to GitHub Pages

This template includes a GitHub Actions workflow
(`.github/workflows/publish.yml`) that automatically builds and
publishes your website to GitHub Pages when you push to the main
branch.

### Setup steps:

1.  **Enable GitHub Pages** in your repository:

    - Go to Settings → Pages
    - Under "Build and deployment", set Source to "GitHub Actions"

2.  **Push to main branch**:

    ``` bash
    git add .
    git commit -m "Initial website setup"
    git push origin main
    ```

3.  **Wait for the workflow** to complete (check the Actions tab)

4.  **Access your website** at:
    `https://YOUR-USERNAME.github.io/YOUR-REPO/`

## GitHub Actions Workflows

This template includes several automated workflows to enhance your
development experience:

### 🚀 Publish Workflow (`publish.yml`)

Automatically builds and deploys your website to GitHub Pages when you
push to the main branch.

**Triggers:** Push to main branch, manual dispatch

### 🔍 PR Preview Workflow (`preview.yml`)

Creates a preview deployment for pull requests with:

- Change detection and highlighting
- DOCX files with tracked changes
- Visual indicators for modified chapters
- Banner showing what changed in the PR

**Triggers:** PR opened, reopened, synchronized, closed, labeled, or
unlabeled

**Labels:**

- Add `no-preview-highlights` label to disable change highlighting if
  it's glitchy

### ✅ Spell Check Workflow (`check-spelling.yaml`)

Runs automated spell checking on pushes and pull requests to maintain
content quality.

**Triggers:** Push to main, pull requests

### 📋 Lint Project Workflow (`lint-project.yaml`)

Checks R code style and quality using the lintr package.

**Triggers:** Push to main/master, pull requests

**Note:** Only runs if your project contains R code.

### 🤖 Copilot Setup Steps (`copilot-setup-steps.yml`)

Configures the GitHub Copilot coding agent's environment with Quarto and
TinyTeX.

**Triggers:** Workflow dispatch, changes to the setup file

### 📝 Issue Summary Workflow (`summary.yml`)

Automatically generates AI-powered summaries for newly opened issues.

**Triggers:** New issue opened

**Permissions required:** The `models: read` permission for AI inference

### 📚 Check Bibliography DOIs Workflow (`check-bibliography-dois.yml`)

Validates that all books and articles in bibliography files meet DOI
requirements:

- Every book and article must have a DOI field
- Every DOI must resolve to a valid URL
- Reference information is checked against DOI metadata for consistency

**Triggers:** Push to main, pull requests, manual dispatch

**Note:** This helps maintain high-quality bibliographic references and
ensures all citations are properly traceable.

## Project Structure

    .
    ├── _quarto.yml              # Main configuration file (profile-based)
    ├── _quarto-website.yml      # Website-specific configuration
    ├── _quarto-revealjs.yml     # RevealJS slides configuration
    ├── _quarto-handout.yml      # PDF handout configuration
    ├── index.qmd                # Website homepage
    ├── chapters/                # Chapter files
    │   ├── chapter1.qmd         # Sample chapter 1
    │   └── chapter2.qmd         # Sample chapter 2
    ├── references.qmd           # References page
    ├── references.bib           # BibTeX bibliography
    ├── styles.css               # Custom CSS styles
    ├── lychee.toml              # Link checker configuration
    ├── .gitignore              # Git ignore file
    ├── LICENSE                  # CC0 1.0 Universal License
    ├── README.md               # This file
    └── .github/
        ├── scripts/             # Scripts for workflows
        │   ├── add-home-banner.py
        │   ├── check-bibliography-dois.R
        │   ├── create-docx-tracked-changes.py
        │   ├── detect-changed-chapters.py
        │   ├── highlight-html-changes.py
        │   └── inject-preview-metadata.py
        └── workflows/           # GitHub Actions workflows
            ├── publish.yml      # Build and deploy to GitHub Pages
            ├── preview.yml      # PR preview with change highlighting
            ├── check-spelling.yaml  # Spell checking
            ├── lint-project.yaml    # R code linting
            ├── copilot-setup-steps.yml  # GitHub Copilot setup
            ├── summary.yml      # AI-powered issue summaries
            ├── check-links.yml  # URL reachability checker workflow
            └── check-bibliography-dois.yml  # Bibliography DOI validation

## Automated Workflows

This template includes two GitHub Actions workflows:

### Publishing Workflow (`publish.yml`)

Automatically builds and deploys your website to GitHub Pages when you
push to the main branch.

### Link Checker Workflow (`check-links.yml`)

Automatically checks that all URLs in your website are reachable:

- **Runs on**: Push to main, pull requests, weekly schedule (Mondays at
  9:00 UTC), and manual trigger
- **Checks**: All links in `.qmd`, `.md`, and `.html` files
- **Reports**: Workflow fails if broken links are detected. Check the
  workflow logs for details on which links are broken.
- **Configuration**: Customize behavior in `lychee.toml`
- **Manual override**: Add the `links checked by hand` label to a PR to
  skip the automated link check

To manually trigger the link checker:

1.  Go to the Actions tab in your repository
2.  Select "Check Links" workflow
3.  Click "Run workflow"

## Writing Content

Quarto uses markdown with extensions. Here are some quick tips:

### Headings

``` markdown
# Chapter Title
## Section
### Subsection
```

### Code blocks

```` markdown
```python
print("Hello, World!")
```
````

### Math equations

``` markdown
Inline: $E = mc^2$

Display:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Citations

Reference a citation: `@citationkey`

### Cross-references

Reference figures, tables, and sections using labels:

``` markdown
See @fig-example for details.
```

For more details, see the [Quarto
documentation](https://quarto.org/docs/guide/).

## Customization

### Changing themes

Edit the `format.html.theme` section in `_quarto-website.yml`:

``` yaml
format:
  html:
    theme:
      light: cosmo  # Try: cosmo, flatly, litera, minty, etc.
      dark: darkly  # Try: darkly, cyborg, slate, superhero, etc.
```

### Adding pages

1.  Create a new `.qmd` file (e.g., `chapters/chapter3.qmd`)
2.  Add it to the navigation menu in `_quarto-website.yml`:

``` yaml
website:
  navbar:
    left:
      - text: "Chapters"
        menu:
          - text: "Chapter 1: Introduction"
            href: chapters/chapter1.qmd
          - text: "Chapter 2: Advanced Topics"
            href: chapters/chapter2.qmd
          - text: "Chapter 3: Your New Chapter"
            href: chapters/chapter3.qmd
```

### Custom CSS

Add your custom styles to `styles.css`. These will override the default
theme styles.

## License

This template is released under the [CC0 1.0 Universal
License](LICENSE), which means you can freely use, modify, and
distribute it without any restrictions.

## Acknowledgments

This template is based on the structure of the [UCD-SERG Lab
Manual](https://github.com/UCD-SERG/lab-manual), which was adapted from
the [Benjamin-Chung Lab
Manual](https://jadebc.github.io/lab-manual/index.html).

## Support

- [Quarto Documentation](https://quarto.org/docs/guide/)
- [Quarto
  Community](https://github.com/quarto-dev/quarto-cli/discussions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## Contributing

Feel free to open issues or submit pull requests to improve this
template!
