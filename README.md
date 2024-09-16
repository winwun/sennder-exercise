# je-new-service

[![Build status](https://badge.buildkite.com/replace-me?branch=master)](https://buildkite.com/seek/je-new-service)

This is a template repository that has the following features integrated by
default:

- TypeScript with source map support
- Jest and test helpers
- ESLint, Prettier and Husky
- GitHub files
- Buildkite basic deployment configuration
- Base libraries like logger and responseData
- Serverless base configuration with sample handler

## Setup

```shell
# Install dependencies
yarn ci

# Enable husky
yarn prepare
```

### Lint & Prettier

```shell
# Check for lint issues
yarn lint

# Fix lint issues
yarn lint:fix

# Check for prettier issues
yarn prettier:check

# Fix prettier issues
yarn prettier:fix
```

## Usage

1. Change the `new-service` with your service name on the following files:

   - README.md
   - package.json
   - serverless.yml

2. Do a `yarn ci` and you can now start development
3. To be able to use Buildkite, remember to create a PR to add in your new repo
   in <https://github.com/SEEK-Jobs/build-agency-strategies>
4. Additional configuration step for new services:
   <https://jobseeker.atlassian.net/wiki/spaces/EMPLOYERDEV/pages/1174372407/Setting+up+a+new+github+repo>
