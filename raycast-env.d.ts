/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** Custom Groups Directory - Optional directory override for your Quick Groups YAML files */
  "referenceDirectory"?: string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-groups` command */
  export type SearchGroups = ExtensionPreferences & {}
  /** Preferences accessible in the `browse-fields` command */
  export type BrowseFields = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-groups` command */
  export type SearchGroups = {}
  /** Arguments passed to the `browse-fields` command */
  export type BrowseFields = {}
}

