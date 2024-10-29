const history = {};

/**
 * Allows navigation by using browser < and > buttons by keeping track of the "/path": Component
 */
window.onpopstate = () => {
  const path = window.location.pathname;
  const { component, componentArgument } = history[path];

  document.body.innerHTML = new component(
    componentArgument
      ? typeof componentArgument === "object"
        ? componentArgument
        : [...componentArgument]
      : null
  );
}

/**
 * Used by Link - handles seamless page navigation by caching the path with the component,
 * and rendering it when the user clicks on the anchor tag instead of opening an entirely new html
 *
 * @param {Object} options - The options need by the function.
 * @param {String} options.path - The window.location.pathname to be used ex: "/page"
 * @param {Component} options.component - The component to be rendered extended from Component class
 * @param {Object} options.componentArgument - The arguments for the component component [array will be spread, object will be used as is].
 */
export function redirect({ path, component, componentArgument }) {
  const extendsComponent = value => Object.create(value.prototype) instanceof Component;

  /**
   * Checks if a value is a function.
   * @param {Function|Object} value - The value to check.
   * @returns {boolean}
   */
  function isFunction(value) {
    const propertyNames = Object.getOwnPropertyNames(value);
    return !propertyNames.includes('prototype') || propertyNames.includes('arguments');
  }

  if (!component) {
    throw new Error("component cannot be null");
  }

  if (typeof path !== 'string') {
    throw new Error("path must be of type string like '/sample'");
  }

  if (isFunction(component)) {
    throw new Error("component parameter only accepts class references. Instead of new Component() or Component, simply Component is enough");
  }

  if (!extendsComponent(component)) {
    throw new Error("component parameter only accepts class references extended from Component");
  }

  if (componentArgument) {
    if (!Array.isArray(componentArgument) && typeof componentArgument !== "object") {
      throw new Error("componentArgument must either be an array or an object");
    }
  }

  let finalComponent = component;
  let finalComponentArgument = componentArgument;

  window.history.pushState({}, '', path);

  // Uses the cached data
  if (path in history) {
    const { component, componentArgument } = history[path];
    finalComponent = component;
    finalComponentArgument = componentArgument;
  } else {
    history[path] = {
      component: finalComponent,
      componentArgument: finalComponentArgument
    };
  }

  document.body.innerHTML = new finalComponent(
    finalComponentArgument
      ? typeof finalComponentArgument === "object"
        ? finalComponentArgument
        : [...finalComponentArgument]
      : null
  );
};

export class Link {
  /**
   * Constructs an anchor tag element that redirects to the specified path and component.
   * @param {Object} options - The options for constructing the Link component.
   * @param {String} options.id - The ID for the component.
   * @param {Component} options.component - The component to render.
   * @param {Object|null} [options.componentArgument=null] - The arguments for the component. If its of type array it will be spread, if it is an object it will be used as is.
   * @param {string} options.path - The new path to set in the URL.
   * @param {object} options.attributes - Additional attributes for the anchor tag.
   * @param {string} [options.innerHTML=""] - The innerHTML to display for the anchor tag.
   */
  constructor({ id, component, componentArgument = null, path, attributes = {}, innerHTML = "" } = {}) {
    const containsNoneStringData = value => value.some(type => type !== 'string');

    const attributeValueTypes = Object.values(attributes).map(attribute => typeof attribute);
    const attributeKeyTypes = Object.keys(attributes).map(attribute => typeof attribute);

    if (!id) {
      throw new Error("Element ID cannot be null");
    }

    if ("id" in attributes) {
      throw new Error("Cannot add 'id' as an attribute, as a separate parameter already asked for it");
    }

    if ("href" in attributes) {
      throw new Error("Cannot add 'href' as an attribute, as the component parameter already asked for it");
    }

    if (typeof id !== 'string') {
      throw new Error("Element ID must be of type string");
    }

    if (containsNoneStringData(attributeValueTypes)) {
      throw new Error("Attributes can only have non-callable data as values");
    }

    if (containsNoneStringData(attributeKeyTypes)) {
      throw new Error("Attributes can only have non-callable data as keys");
    }

    const cleanAttributes = Object.entries(attributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    /**
     * Returns an anchor tag with a click handler to simulate navigation.
     * @returns {string} The anchor tag HTML.
     */
    const render = () => {
      const uniqueAnchorId = `${id}-${uniqueId()}`;

      // Add the anchor tag with a click event to prevent default behavior
      setTimeout(() => {
        const anchor = document.getElementById(uniqueAnchorId);

        if (anchor) {
          anchor.onclick = event => {
            event.preventDefault();
            redirect({ path, component, componentArgument });
          };
        }
      }, 0);

      // Return anchor tag with unique ID
      return /*html*/`<a href="${path}" id="${uniqueAnchorId}" ${cleanAttributes}>${innerHTML?? link}</a>`;
    };

    this.toString = () => render();
  }
}

export class Root {
  /**
   * Constructs a Root component for the specified component and path.
   * @param {Object} options - The options for constructing the Root component.
   * @param {Component} options.component - The component to render.
   * @param {Object|null} [options.componentArgument=null] - The arguments for the component. If its of type array it will be spread, if it is an object it will be used as is.
   * @param {string} [options.path='/'] - The path to set in the URL.
   */
  constructor({ component, componentArgument=null, path = '/' } = {}) {
    this.render = () => redirect({ path, component, componentArgument });
  }
}

/**
 * Returns the full path from the template file to where a function was called;
 * @param {'import.meta'} importMeta - the import.meta of a function. Simply pass `import.meta`
 * @throws {Error} if importMeta is null
 * @return {string} the full path
 */
export const getFullPath = (importMeta) => {
  if (!importMeta) {
    throw new Error(
      "Missing import.meta. Simply pass `import.meta` as the argument"
    );
  }

  let path = new URL(importMeta.url).pathname;
  path = path.startsWith("/") ? path.slice(1) : path;

  /**
   * Removing the window path name from the path
   *
   * Ex:
   *  path = sample/components/dashboard/Dashboard.js
   *  returns "sample/components/dashboard"
   */
  const script = path.split("/").pop();
  path = path.replace(script, "");

  /**
   * Removing the window path name from the path
   *
   * Ex:
   *  path = sample/components/dashboard
   *
   *  window.location.href = https://localhost/sample/
   *  window.location.pathname = sample/
   *
   *  returns "components/dashboard"
   */
  let windowPathName = window.location.pathname.substring(1, window.location.pathname.length);
  const pathName = path.substring(0, windowPathName.length);

  return windowPathName === pathName
    ? path.substring(windowPathName.length)
    : path;
};

export const uniqueId = () => Math.random().toString(36).substring(2, 10);

/**
 * Load CSS files based on the provided paths.
 * @param {Object} importMeta - Metadata object, typically `import.meta` from the calling module.
 * @param {string[]} cssPaths - List of CSS paths to be loaded relative to the calling script's path.
 *
 * The `cssPaths` array contains relative paths to CSS files that can start with:
 * - `.` (current directory) which is ignored,
 * - `..` (parent directory) which moves up one level,
 * - or a folder/file name to redirect down the directory structure.
 *
 * This function resolves each path manually by:
 * 1. Splitting the path by `/` to identify each segment.
 * 2. Using `..` to move up one level by removing the last directory in `path`.
 * 3. Adding other folder/file names to `path`.
 * 4. Creating a `<link>` tag for each resolved CSS path and appending it to `<head>`.
 **/
export const css = (importMeta, cssPaths) => {
  cssPaths.forEach(cssPath => {
    // Get the base directory path of the calling script
    let path = getFullPath(importMeta);

    cssPath.split("/").forEach(part => {
      const upOneFolder = part === "..";
      const addNextFolder = part !== ".";

      path = upOneFolder
        ? path.replace(/\/[^\/]+\/?$/, "/") // Moves up one directory
        : addNextFolder
          ? path += `${part}/` // Adds next directory or file part
          : path;              // Current directory `.` is ignored
    });

    // Remove trailing slash if the path points to a file (not a directory)
    path = path.slice(0, !cssPath.endsWith("/") ? -1 : path.length);

    // Create and append a link element for the CSS file
    const styleLink = document.createElement("link");
    styleLink.rel = "stylesheet";
    styleLink.href = path;

    document.head.appendChild(styleLink);
  });
};

// Using ES2022 features for private fields
export class Component {
  #states = {};
  #stateElements = {};

  constructor() {
    this.template = ""; // Public field (set only)
    this.scripts = null; // Public field (set only)

    /**
     * Helper function to validate the template and scripts.
     */
    const validate = () => {
      if (typeof this.template !== "string") {
        throw new Error("Template must be a string");
      }

      if (!this.template) {
        throw new Error("Template is required for a component");
      }

      if (this.scripts && typeof this.scripts !== "function") {
        throw new Error("Scripts must be a function");
      }
    };

    /**
     * Function to manage state and return a state value with a setter.
     * @param {any} initialValue - Initial state value.
     * @param {string} elementId - The unique element ID for the element tied to this state.
     * @returns {[any, function]} Current state and a setter function to update the state.
     */
    this.state = (initialValue, elementId) => {
      let uniqueElementId = `${elementId}-${uniqueId()}`;

      // Ensure unique element ID for states
      while (Object.hasOwn(this.#states, uniqueElementId)) {
        uniqueElementId = `${elementId}-${uniqueId()}`;
      }

      let value = initialValue;

      // Setter function to update the value and DOM
      const setValue = newValue => {
        value = newValue;

        /**
         * @type {HTMLElement}
         */
        const element = this.#stateElements[uniqueElementId];

        if (!element) {
          return;
        }

        element.textContent = value;
      };

      // Save the initial value and element uniqueElementId in the private states
      this.#states[uniqueElementId] = value;

      // To be used later to track elements associated with the state
      return [uniqueElementId, value, setValue];
    };

    /**
     * Called after rendering to bind elements to states.
     */
    const bindStateElements = () => {
      Object.keys(this.#states).forEach(uniqueElementId => {
        this.#stateElements[uniqueElementId] = document.getElementById(uniqueElementId);
      });
    };

    /**
     * Render the template and bind event listeners.
     */
    const render = () => {
      validate();

      // Append the root element to the DOM
      setTimeout(() => {
        bindStateElements(); // Bind state elements after rendering
        if (this.scripts) this.scripts(); // Execute scripts (event listeners etc.)
      }, 0);

      return this.template; // Return the rendered template
    };

    this.toString = () => render();
  }
}