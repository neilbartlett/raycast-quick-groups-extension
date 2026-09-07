# Quick Groups

Quick Groups is a Raycast extension for fast, keyboard-oriented access to small structured datasets in local YAML files.

Use **Search Groups** to search records, or **Browse Fields** to explore values grouped by their derived field labels. Type `qg` in Raycast to find the primary command quickly. The collection dropdown can narrow record search without changing the YAML structure.

## Configure

On first launch, Quick Groups creates its standard `groups` directory in Raycast's extension support folder, adds `quick-groups-example.yaml`, and displays those example records immediately. Choose **Edit Source** on a record to open its YAML and start replacing the examples with your own groups.

No configuration is required. To keep the YAML somewhere else—for example in Dropbox or a Git repository—set the optional **Custom Groups Directory** preference. Quick Groups scans either directory recursively for `.yaml` and `.yml` files.

```yaml
machines:
  dev:
    ip: 192.168.1.20
    proxmox:
      value: 192.168.1.46
      ssh: root@192.168.1.46
      open: https://192.168.1.46:8006
    machine:
      value: Dell Optiplex 7020 Micro Plus
      obsidian: NEB/Machines/Dell Optiplex 7020 Micro Plus
```

Top-level keys are collections, their children are records, and each record contains ordered fields. Collections with the same name across files are combined. Duplicate collection/record pairs are reported as conflicts and excluded.

## Actions

- Every field supports **Copy Value** with `⌘ C`.
- Every field supports **Paste Value** into the frontmost application.
- `open` opens a URL or local target.
- `ssh` opens an `ssh://` URL through the macOS default handler.
- `obsidian` opens a note through Obsidian's documented URI scheme.
- `pwd` copies a password without displaying or indexing it.
- `application/<name>` opens a value with a named macOS application.
- `raycast/script/<command>` launches an installed Raycast Script Command and passes the value as argument 1.
- `value` is not an action; it explicitly chooses the field's display and copy value.

All of these are standard supported actions and work directly from YAML. For example:

```yaml
projects:
  home:
    location:
      value: ~
      open: ${value}
      application/Terminal: ${value}
  reference:
    location:
      value: ~/Projects/reference
      application/Ghostty: ${value}
      application/Visual Studio Code: ${value}
      raycast/script/open-project: ${value}
writing:
  play:
    manuscript:
      value: ~/Writing/My Play.scriv
      open: ${value}
      application/Scrivener: ${value}
```

Action names under a supported namespace are validated rather than silently treated as data. No code registration is required for `application/<name>` or `raycast/script/<command>`.

Collections can be as broad as `projects` or split into focused groups such as `writing`. The Scrivener example also illustrates that an application action can open an application-specific project bundle, not just an ordinary directory or file.

The compile-time registry is a separate extension point for advanced users who need behavior beyond the standard actions. See [Actions and extension points](docs/custom-actions.md).

For `open` and `application/<name>`, a target of `~` or one beginning with `~/` expands to the current user's home directory. Quick Groups keeps the portable form for display, search, copying, and substitution. Bare `~`, quoted `"~"`, `~/`, and `~/.` are all supported.

Fields named like passwords, tokens, secrets, or private keys are masked and their values are excluded from search.

Quick Groups refreshes while its YAML directory changes. An empty directory offers a **Create Example YAML** action to help first-time setup. The generated file is named `quick-groups-example.yaml`.

For `obsidian`, write `Vault Name/path/to/note`. The first segment selects the vault and the remaining path selects the file.

## Value substitution

Annotated fields can reuse sibling values with `${name}`. References may point forward or to another substituted sibling:

```yaml
machines:
  dev:
    proxmox:
      value: 192.168.1.46
      user: root
      ssh: ${user}@${value}
      open: https://${value}:8006
```

Use `$${name}` to produce the literal text `${name}`. References are limited to the same field mapping in V1; unknown references and cycles are reported as diagnostics.

## Development

```sh
npm install
npm test
npm run lint
npm run build
```
