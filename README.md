## Install and Setup

Install the library using:

```sh
npm i -D eslint @cartercree/eslint-config
```

## Usage

Create a `eslint.config.js` file in the root of the repo you are working on and extend the preset/config you wish to use

e.g. using the `typescript` linting rules (additional rules can be added to this `extends` list)


```javascript
import lint from "@cartercree/eslint-config/configs/typescript.js";
//change typescript to whatever you are working on
export default [
  ...lint
  { ignores: ["dist"] },
  {
    files: ["**/*.{ts,tsx}"],
  }
  // ...rest of config
]
```
