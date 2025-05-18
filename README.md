# Transaction Manager

## Author

Adam Parks

## Description

An easy-to-use transaction manager to keep track of and analyze your spending habits and income.

## Features

- Register a local account with the following information:
  - Username
  - Password
  - First name
- Log into an existing account with username and password
- Add a transaction with the following information:
  - Income or expense
  - Amount (in dollars)
  - Who it's to or from
  - Date of the transaction
  - Custom category (e.g. "Allowance", "Transportation")
- View added transactions in list format (sorted by transaction date, not date added)
- View the following transaction statistics (either for all time or within a specified date window):
  - Overall balance (regardless of date window)
  - Total income
  - Total expenses
  - Net (like overall balance, but only considering transactions within the specified date window)
  - Income totals by category (with pie chart)
  - Expense totals by category (with pie chart)
- Add custom, color-coded categories (either when adding transactions or via account settings)
- Log out of your account
- Reset your account's data
- Delete your account

## Future Implementation Ideas

- Adjust layout for larger screen sizes
- Persist data over multiple sessions with local storage
- Edit existing transactions
- Delete transactions
- Store user data in a database for scalability

## Tech Stack

- HTML
- JSX
- Sass modules
- TypeScript
- React
- Vite
- React Router
- Redux
- Chart.js
- React Icons

## License

MIT (for more information, see [LICENSE.txt](./LICENSE.txt))

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x';
import reactDom from 'eslint-plugin-react-dom';

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
