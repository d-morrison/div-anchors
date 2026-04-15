# div-anchors

<!-- badges: start -->

<!-- badges: end -->

A [Quarto](https://quarto.org/) extension that adds visual URL anchor links to
theorem and proof divs for HTML output, similarly to the built-in
`anchor-sections` option for section headings.

## Demo

See [`example.qmd`](example.qmd) for a live demonstration.

## Installation

```bash
quarto add d-morrison/div-anchors
```

This will install the extension in the `_extensions/d-morrison/div-anchors/`
directory of your Quarto project.

## Usage

After installation, the extension is available as `d-morrison/div-anchors`
(the command `quarto add` creates `_extensions/d-morrison/div-anchors/`).

To apply the extension to a **single document**, add it to the document's
front matter:

```yaml
filters:
  - d-morrison/div-anchors
```

To apply it to **every document in a project**, add it to `_quarto.yml`:

```yaml
filters:
  - d-morrison/div-anchors
```

### Supported div types

The extension adds anchor links to all Quarto theorem div environments that
have a cross-reference identifier. Hover over any theorem block in the
rendered HTML to see the anchor link (§) appear. Click it to get a direct URL
to that block.

The supported theorem environments are:

| Identifier prefix | Environment |
|-------------------|-------------|
| `thm-`            | Theorem     |
| `lem-`            | Lemma       |
| `cor-`            | Corollary   |
| `prp-`            | Proposition |
| `cnj-`            | Conjecture  |
| `def-`            | Definition  |
| `exm-`            | Example     |
| `exr-`            | Exercise    |
| `alg-`            | Algorithm   |

### Example

````markdown
---
title: "My Document"
filters:
  - d-morrison/div-anchors
format:
  html: default
---

::: {#thm-pythagorean}
For a right triangle with legs $a$ and $b$ and hypotenuse $c$:
$$a^2 + b^2 = c^2.$$
:::

::: {#def-prime}
A natural number $p > 1$ is *prime* if it has no positive divisors other
than $1$ and itself.
:::
````

## How it works

Quarto renders theorem divs (`::: {#thm-label}`) as HTML `<div>` elements
with a `theorem` class and a `<span class="theorem-title">` containing the
auto-numbered label (e.g., "Theorem 1"). This extension injects a small
JavaScript file that:

1. Finds all `.theorem[id]`, `.proof[id]`, `.remark[id]`, and
   `.solution[id]` elements on the page.
2. Locates the `.theorem-title` or `.proof-title` span within each element.
3. Inserts a styled anchor link (§) immediately after the title span.

The anchor is invisible by default and fades in when the user hovers over
the theorem block, matching the behavior of Quarto's `anchor-sections` option
for headings.

## Acknowledgements

This extension was inspired by Quarto's built-in `anchor-sections` feature.
