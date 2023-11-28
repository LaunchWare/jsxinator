# JSXinsator

Detects JSX syntax in `.js` files, and moves the contents to `.jsx`.

If you have extensions in your `import` statements, you will have to update those manually.

## Installation

For yarn:

```bash
yarn global add jsxinator
```

For npm:

```bash
npm install -g jsxinator
```

## Usage

Be sure to start with a clean git state. That way, you can revert any changes.

```bash
jsxinator <directory>
```
