/**
 * div-anchors.js
 *
 * Adds visual URL anchor links to Quarto theorem and proof divs,
 * similarly to the `anchor-sections` option for HTML headings.
 *
 * After the DOM is ready, finds all theorem/proof divs that have an `id`
 * attribute and inserts an anchor link (§) right after the theorem-title
 * or proof-title span. The anchor is hidden by default and appears on hover,
 * controlled by div-anchors.css.
 */

(function () {
  "use strict";

  /**
   * CSS selector matching all Quarto theorem and proof div environments.
   *
   * Quarto adds the `.theorem` class to all theorem-type divs
   * (theorem, lemma, corollary, proposition, conjecture, definition,
   * example, exercise, algorithm), so `.theorem[id]` covers all of them.
   * Proof-type environments (.proof, .remark, .solution) are listed
   * separately because they do not carry the `.theorem` class.
   */
  var THEOREM_SELECTOR = [
    ".theorem[id]", /* covers: theorem, lemma, corollary, proposition,
                                conjecture, definition, example,
                                exercise, algorithm */
    ".proof[id]",
    ".remark[id]",
    ".solution[id]",
    /* Quarto cross-reference id prefixes, for theorem-type and
       proof-type divs that carry neither class above. */
    "div[id^='thm-']",
    "div[id^='lem-']",
    "div[id^='cor-']",
    "div[id^='prp-']",
    "div[id^='cnj-']",
    "div[id^='def-']",
    "div[id^='exm-']",
    "div[id^='exr-']",
    "div[id^='rem-']",
    "div[id^='sol-']",
    "div[id^='alg-']",
  ].join(", ");

  /**
   * Create a styled anchor element pointing to the given id.
   * @param {string} id - The target element's id attribute value.
   * @returns {HTMLAnchorElement}
   */
  function createAnchor(id) {
    var a = document.createElement("a");
    a.href = "#" + id;
    a.className = "div-anchor";
    a.setAttribute("aria-label", "Permalink to this block");
    var icon = document.createElement("span");
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "\u00A7";
    a.appendChild(icon);
    return a;
  }

  /**
   * Add anchor links to all theorem/proof divs with ids on the page.
   */
  function addDivAnchors() {
    var divs = document.querySelectorAll(THEOREM_SELECTOR);
    divs.forEach(function (div) {
      var id = div.id;
      if (!id) {
        return;
      }

      // A div can match more than one selector, and the script can run
      // twice; never add a second anchor.
      // A figure's anchor inside the div does not count.
      if (div.querySelector("a.div-anchor:not(.div-anchor-figure)")) {
        return;
      }

      // Find the theorem-title or proof-title span
      var titleSpan = div.querySelector(".theorem-title, .proof-title");
      var anchor = createAnchor(id);

      if (titleSpan) {
        // Proof-type titles end in ". "; move that trailing whitespace
        // after the anchor, so the anchor sits right after the title
        // and a space still separates it from the body text.
        var lastText = titleSpan.lastChild;
        while (lastText && lastText.nodeType !== Node.TEXT_NODE &&
               lastText.lastChild) {
          lastText = lastText.lastChild;
        }
        var hadTrailingSpace = false;
        if (lastText && lastText.nodeType === Node.TEXT_NODE &&
            /\s+$/.test(lastText.textContent)) {
          lastText.textContent = lastText.textContent.replace(/\s+$/, "");
          hadTrailingSpace = true;
        }

        // Insert anchor immediately after the title span
        titleSpan.insertAdjacentElement("afterend", anchor);

        var next = anchor.nextSibling;
        if (hadTrailingSpace &&
            !(next && next.nodeType === Node.TEXT_NODE &&
              /^\s/.test(next.textContent))) {
          anchor.after(" ");
        }
      } else {
        // Fallback: prepend to the first paragraph
        var firstPara = div.querySelector("p");
        if (firstPara) {
          firstPara.insertAdjacentElement("afterbegin", anchor);
        }
      }
    });
  }

  /**
   * Add an anchor link to the end of each figure's own caption.
   *
   * Quarto's `anchor-sections` skips the parent of a subfigure group
   * (a `.quarto-layout-panel` without the `anchored` class), and puts the
   * link it does add in the figure box's top-right corner, far from a
   * centred image and under a plotly toolbar. A link after the caption,
   * like the one after a theorem title, avoids both. div-anchors.css hides
   * Quarto's corner link on a figure that gets one here, except while it
   * has keyboard focus.
   *
   * The image's `aria-describedby` points at the caption, so a link inside
   * the caption is read as part of the figure's description. Where Quarto
   * gives the figure a corner link (an element with the `anchored` class),
   * the caption anchor is hidden from assistive technology and from the
   * tab order, and the corner link, which stays focusable, is the
   * accessible permalink. A subfigure group and a revealjs figure get no
   * corner link, so there the caption anchor stays reachable.
   */
  function figureAnchor(id, hasCornerLink) {
    var anchor = createAnchor(id);
    anchor.classList.add("div-anchor-figure");
    if (hasCornerLink) {
      anchor.setAttribute("aria-hidden", "true");
      anchor.setAttribute("tabindex", "-1");
    }
    return anchor;
  }

  function addFigureAnchors() {
    var figs = document.querySelectorAll("div[id^='fig-']");
    figs.forEach(function (fig) {
      // The figure's own caption, not a subfigure's.
      var caption = fig.querySelector(":scope > figure > figcaption");
      if (!caption || caption.querySelector(":scope > a.div-anchor")) {
        return;
      }
      caption.appendChild(figureAnchor(fig.id, fig.classList.contains("anchored")));
      fig.classList.add("has-div-anchor");
    });

    // In revealjs, a figure alone on a slide is an <img id="fig-..."> with
    // its caption in the next <p class="caption">, with no wrapping div.
    var imgs = document.querySelectorAll("img[id^='fig-']");
    imgs.forEach(function (img) {
      var caption = img.nextElementSibling;
      if (!caption || !caption.matches("p.caption") ||
          caption.querySelector(":scope > a.div-anchor")) {
        return;
      }
      caption.appendChild(figureAnchor(img.id, img.classList.contains("anchored")));
    });
  }

  function addAllAnchors() {
    addDivAnchors();
    addFigureAnchors();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addAllAnchors);
  } else {
    addAllAnchors();
  }
})();
