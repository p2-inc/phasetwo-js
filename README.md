# Phase Two TypeScript SDK

<!-- phasetwo:banner:start - managed by p2-inc/shared-github-actions, edit there -->
[![npm](https://img.shields.io/npm/v/@p2-inc/js-sdk)](https://www.npmjs.com/package/@p2-inc/js-sdk) [![license](https://img.shields.io/badge/license-Apache--2.0-blue)](COPYING) [![docs](https://img.shields.io/badge/docs-phasetwo.io-blue)](https://phasetwo.io/docs/api/sdks/)

📚 [Documentation](https://phasetwo.io/docs/api/sdks/) • 🚀 [Hosted Keycloak](https://dash.phasetwo.io/?utm_source=github&utm_medium=readme&utm_campaign=phasetwo-js) • 🤖 [Keycloak Skills](https://github.com/p2-inc/keycloak-skills) • 💬 [Support](mailto:support@phasetwo.io)

> [!TIP]
> **Run this in our cloud, no setup needed.** Phase Two hosts Keycloak with all of our extensions built in. [Try it free with your own cluster →](https://dash.phasetwo.io/?utm_source=github&utm_medium=readme&utm_campaign=phasetwo-js)
>
> **Using a coding agent?** Add the Phase Two Keycloak skills ([launch post](https://phasetwo.io/blog/keycloak-skills-mcp-launch)) to Claude Code, Cursor or Codex so your agent can set up passwordless login, SSO, organizations and clusters for you:
>
> ```sh
> # Install the skills (connects to our hosted MCP server)
> claude plugin marketplace add p2-inc/keycloak-skills
> claude plugin install phasetwo@keycloak-skills
> # Or connect to the MCP server directly
> claude mcp add --transport http keycloak https://mcp.phasetwo.io/mcp
> ```
<!-- phasetwo:banner:end -->

The Phase Two JavaScript SDK library provides access to the Phase Two API for Node.js and browser applications.

> [!NOTE]
> Pre-1.0: minor versions can contain breaking changes, which come from changes to the API spec. Pin a version.

## Documentation

See the [API Reference](https://phasetwo.io/api/) and [NPM page](https://www.npmjs.com/package/@p2-inc/js-sdk).

## Installation

```
npm i @p2-inc/js-sdk
```

## Use

The JavaScript SDK assumes the use of the offical keycloak-js library for browser use, or a OpenID Connect library for Node.js use. See the [Authentication](#Authentication) notes below for example configurations for each.

### Examples

```typescript
import { Configuration, EventsApi, OrganizationsApi } from "@p2-inc/js-sdk";

// Configure the API connection
const configuration = new Configuration({
  basePath: 'https://my-keycloak-host/auth/realms',
  accessToken: getAccessToken(), //see examples below
});

const realm = 'my-realm';
const orgs = new OrganizationsApi(configuration);

// Create an Organization
const createPromise = orgs.createOrganizationRaw({realm: realm, organizationRepresentation: {name: 'my-org'}});
const orgId = await createPromise.then((resp) => {
  const uri = resp.raw.headers.get("Location");
  return uri.substring(uri.lastIndexOf('/') + 1);
});

// Create an Admin Portal link for the Organization
const portalLinkPromise = orgs.createPortalLink({realm: realm, orgId: orgId});
const portalLink = await portalLinkPromise.then((resp) => {
  return resp.link;
});

// Create and publish an Audit Event
const events = new EventsApi(configuration);
events.createEvent({realm: realm,
  eventRepresentation: {
    type: 'foo.bar',
    representation: JSON.stringify({ orgId }),
    time: Date.now(),
  }
});
```

### Authentication

#### Browser

If you are using this in a browser with the official [keycloak-js](https://www.npmjs.com/package/keycloak-js) library, you can configure the Phase Two SDK using the access token from the `Keycloak` instance:

```
import { Keycloak } from "keycloak-js";

const keycloak = new Keycloak({ url: 'https://my-keycloak-host/auth/', realm: 'my-realm', clientId: 'my-app' });
// do your setup and login

const getAccessToken = () => keycloak.token;

// Configure the API connection
const configuration = new Configuration({
  basePath: 'https://my-keycloak-host/auth/realms',
  accessToken: getAccessToken,
});
```

#### Node.js

If you are using this in a server-side Node.js application, we recommend using an OpenID Connect library such as:
- [@keycloak/keycloak-admin-client](https://www.npmjs.com/package/@keycloak/keycloak-admin-client) The official Keycloak Node.js Admin library. Chances are, you will also be using this with the Phase Two SDK to manage Keycloak-native resources.
- [openid-client](https://github.com/panva/openid-client) An OpenID Certified™ Relying Party (OpenID Connect/OAuth 2.0 Client) implementation for Node.js.

This example uses the Keycloak Node.js Admin library with the client credentials grant, for a confidential client with a [service account](https://phasetwo.io/docs/api/service-accounts):
```
import KcAdminClient from '@keycloak/keycloak-admin-client';

const kcAdminClient = new KcAdminClient();
await kcAdminClient.auth({
  grantType: 'client_credentials',
  clientId: 'api-client',
  clientSecret: process.env.PHASETWO_CLIENT_SECRET,
});

const getAccessToken = () => kcAdminClient.getAccessToken();

// Configure the API connection
const configuration = new Configuration({
  basePath: 'https://my-keycloak-host/auth/realms',
  accessToken: getAccessToken,
});
```

## Generated code

The API classes and models in `src/openapi` are generated from the [Phase Two OpenAPI spec](https://github.com/p2-inc/phasetwo-docs/blob/main/openapi.yaml) by [phasetwo-sdk-generator](https://github.com/p2-inc/phasetwo-sdk-generator) (generator: [typescript-fetch](https://openapi-generator.tech/docs/generators/typescript-fetch)). Don't edit them by hand; `sdk-generator.json` records the spec commit they came from. `src/index.ts` is hand-written.

To build:

```
npm install
npm run build
```

## License

Apache License 2.0, see [COPYING](COPYING).
