> :bug: **This is alpha software**

# JavaScript SDK for Phase Two API

The Phase Two JavaScript SDK library provides access to the Phase Two API for Node.js and browser applications.

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
import { Configuration } from ".";
import { EventsApi, OrganizationsApi } from "./apis";

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
    organizationId: orgId,
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
- [keycloak-nodejs-admin-client](https://github.com/keycloak/keycloak-nodejs-admin-client) The official Keycloak Node.js Admin library. Chances are, you will also be using this with the Phase Two SDK to manage Keycloak-native resources.
- [node-openid-client](https://github.com/panva/node-openid-client) A OpenID Certified™ Relying Party (OpenID Connect/OAuth 2.0 Client) implementation for Node.js. See their [quickstart](https://github.com/panva/node-openid-client#quick-start) for examples of which flow you are using.

This example uses the Keycloak Node.js Admin library. See their [usage documentation](https://github.com/keycloak/keycloak-nodejs-admin-client#usage) for more information on what type of flow you are using (the example is a password grant type):
```
import KcAdminClient from '@keycloak/keycloak-admin-client';

const kcAdminClient = new KcAdminClient();
await kcAdminClient.auth({
  clientId: 'admin',
  password: 'admin',
  grantType: 'password',
  clientId: 'admin-cli',
});

const getAccessToken = () => kcAdminClient.getAccessToken();

// Configure the API connection
const configuration = new Configuration({
  basePath: 'https://my-keycloak-host/auth/realms',
  accessToken: getAccessToken,
});
```

## Developers

The sources are generated using the [OpenAPI typescript-fetch](https://openapi-generator.tech/docs/generators/typescript-fetch) generator. 

The generator creates TypeScript/JavaScript client that utilizes [Fetch API](https://fetch.spec.whatwg.org/). The generated Node module can be used in the following environments:

### Environment
* Node.js
* Webpack
* Browserify

### Language level
* ES5 - you must have a Promises/A+ library installed
* ES6

### Module system
* CommonJS
* ES6 module system

It can be used in both TypeScript and JavaScript. In TypeScript, the definition should be automatically resolved via `package.json`. ([Reference](http://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html))

### Building

To build and compile the typescript sources to javascript use:
```
npm install
npm run build
```

### Publishing

First build the package then run ```npm publish```

### Consuming

navigate to the folder of your consuming project and run one of the following commands.

_published:_

```
npm install p2-inc/js-sdk@6.9.0 --save
```

_unPublished (not recommended):_

```
npm install PATH_TO_GENERATED_PACKAGE --save
```

---

All documentation, source code and other files in this repository are Copyright 2022 Phase Two, Inc.
