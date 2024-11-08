/**
 * A shortened version of document.querySelector;
 *
 * @param {string} selectors
 * @returns {HTMLElement}
 */
export const element = selectors => document.querySelector(selectors);

/**
 * A shortened version of document.querySelectorAll;
 *
 * @param {string} selectors
 * @returns {HTMLElement}
 */
export const elements = selectors => document.querySelector(selectors);

/**
 * Uses query selector on all elements;
 *
 * @param {Array<string>} selectors
 * @returns {Array<HTMLElement>}
 */
export const bulkQuery = selectors => selectors.map(selector =>
  document.querySelector(selector)
);
