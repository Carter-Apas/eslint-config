## Install and Setup

Install the library using:

```sh
npm i -D eslint @cartercree/eslint-config
```

## Usage

Create a `.eslintrc.yaml` file in the root of the repo you are working on and extend the preset/config you wish to use

e.g. using the `typescript` linting rules (additional rules can be added to this `extends` list)

```yaml
extends:
  - "@cartercree/eslint-config/configs/typescript"
```
