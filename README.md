# Checkbox Enhancement

This extension is designed to enhance the functionality of the checkbox in
markdown files. It is designed to work with the markdown preview and the
markdown editor.

![vscode](https://img.shields.io/badge/vscode-1.86.1+-blue.svg)
![MIT](https://img.shields.io/badge/license-MIT-green.svg)
![v1.0.0](https://img.shields.io/badge/version-0.0.2-blue.svg)

![stars](https://img.shields.io/github/stars/jamerrq/checkbox-md-enhancement?style=social)
![forks](https://img.shields.io/github/forks/jamerrq/checkbox-md-enhancement?style=social)
![issues](https://img.shields.io/github/issues/jamerrq/checkbox-md-enhancement?style=social)
![pull requests](https://img.shields.io/github/issues-pr/jamerrq/checkbox-md-enhancement?style=social)

## Features

So far the main and only feature is a counter for the number of checked
checkboxes in the markdown file. This counter is displayed in the status bar.
You can change the format of the counter by clicking on it or executing the
`Checkbox Enhancement: Change Counter Format` command.

https://github.com/jamerrq/checkbox-md-enhancement/assets/35697365/50e085ad-989c-4ca0-a538-8789f476ea95

To show/hide the counter, you can use the `Checkbox Enhancement: Toggle Counter` command.

More features will be added in the future.

## Release Notes

### 0.0.2

Initial release of Checkbox Enhancement

- Added checkbox counter to the status bar
- Percentage format added to the counter

## Contributing

Contributions / asking for features are welcome. Feel free to open an issue or a
pull request on the [GitHub
repository](https://github.com/jamerrq/checkbox-md-enhancement) of the project.

These are some of the features that I would like to add in the future:

- [ ] Color change according to the percentage of checked checkboxes
- [ ] Mode for show both percentage and number of checked checkboxes
- [ ] Option to show the counter in the markdown preview
- [ ] Option to show the counter for separate lists in the document

To contribute, clone the repository first:

```bash
git clone git@github.com:jamerrq/checkbox-md-enhancement.git
```

Then, install the dependencies:

```bash
cd checkbox-md-enhancement
pnpm install
```

After that, you can open the project in Visual Studio Code and start developing.
Use the `F5` key to start the extension in a new window.
I strongly recommend creating a new branch for your changes.

```bash
git checkout -b feature/my-new-feature
```

When you are done, you can open a pull request on the GitHub repository.

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)
