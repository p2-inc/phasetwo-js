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

A TypeScript/JavaScript client for the [Phase Two](https://phasetwo.io) Admin API, for Node.js and browsers. It covers what Phase Two adds to Keycloak: organizations, members, roles, domains, identity providers, invitations, SCIM, webhooks and events, realm attributes and magic links. For core Keycloak administration (realms, clients, users), use the official [Keycloak admin client](https://github.com/keycloak/keycloak/tree/main/js/libs/keycloak-admin-client) alongside it. See the [API reference](https://phasetwo.io/api/) for every operation.

> [!NOTE]
> Pre-1.0: minor versions can include breaking changes. All Phase Two SDKs share a version: release X.Y.* implements Phase Two API X.Y.

## Installation

```sh
npm install @p2-inc/js-sdk
```

The package ships CommonJS (`dist/`) and ES module (`dist/esm/`) builds with type definitions. It uses the global `fetch`, so it needs Node.js 20 or later (CI tests 20, 22 and 24) or any modern browser.

## Quick start

Create an organization, add a member, get an IdP Wizard link for the organization's admins, and send an audit event. CI runs this code ([`examples/quickstart.ts`](examples/quickstart.ts)) against Phase Two Keycloak.

<!-- phasetwo:snippet quickstart examples/quickstart.ts -->
```ts
import {
  Configuration,
  EventsApi,
  OrganizationMembershipsApi,
  OrganizationsApi,
} from "@p2-inc/js-sdk";

const baseUrl = process.env.PHASETWO_URL!; // e.g. https://euc1.auth.ac/auth
const realm = process.env.PHASETWO_REALM!;

// A token for a service account, using the client credentials grant.
async function getAccessToken(): Promise<string> {
  const response = await fetch(`${baseUrl}/realms/${realm}/protocol/openid-connect/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: process.env.PHASETWO_CLIENT_ID!,
      client_secret: process.env.PHASETWO_CLIENT_SECRET!,
    }),
  });
  if (!response.ok) throw new Error(`token request failed: ${response.status}`);
  return (await response.json()).access_token;
}

const config = new Configuration({
  basePath: `${baseUrl}/realms`,
  accessToken: getAccessToken, // called before each request
});
const orgs = new OrganizationsApi(config);

// Create an organization. The response has no body; the new id is in Location.
const created = await orgs.createOrganizationRaw({
  realm,
  organizationRepresentation: { name: "acme", domains: ["acme.example"] },
});
const orgId = created.raw.headers.get("Location")!.split("/").pop()!;

// Add an existing user as a member.
await new OrganizationMembershipsApi(config).addOrganizationMember({
  realm,
  orgId,
  userId: process.env.PHASETWO_USER_ID!, // an existing user,
});

// A link to the IdP Wizard / Admin Portal for the organization's admins.
const { link } = await orgs.createPortalLink({ realm, orgId });
console.log(`portal link: ${link}`);

// Send an audit event.
await new EventsApi(config).createEvent({
  realm,
  eventRepresentation: {
    type: "acme.order.created",
    representation: JSON.stringify({ orgId, order: 42 }),
    time: Date.now(),
  },
});
```
<!-- /phasetwo:snippet -->

## Authentication

Every call needs an access token from the realm you manage. `accessToken` in `Configuration` takes a string or a function that returns one (or a promise of one), and is called before each request.

- **Server side (recommended):** create a confidential client with a [service account](https://phasetwo.io/docs/api/service-accounts) and give the service account the roles it needs (e.g. `realm-management` → `manage-organizations`). Get tokens with the client credentials grant, as in the quick start. To cache and refresh tokens, use an OpenID Connect library such as [openid-client](https://github.com/panva/openid-client), or the official [Keycloak admin client](https://github.com/keycloak/keycloak/tree/main/js/libs/keycloak-admin-client) if you use it anyway:

  ```ts
  import KcAdminClient from "@keycloak/keycloak-admin-client";

  const kc = new KcAdminClient({ baseUrl, realmName: realm });
  await kc.auth({ grantType: "client_credentials", clientId, clientSecret });
  const config = new Configuration({ basePath: `${baseUrl}/realms`, accessToken: () => kc.getAccessToken() });
  ```

- **Browser:** with [keycloak-js](https://www.npmjs.com/package/keycloak-js), pass the signed-in user's token. The user needs the organization roles for the calls you make.

  ```ts
  const config = new Configuration({
    basePath: `${baseUrl}/realms`,
    accessToken: async () => {
      await keycloak.updateToken(30);
      return keycloak.token!;
    },
  });
  ```

## Usage

- There's one class per API area (`OrganizationsApi`, `OrganizationMembershipsApi`, `IdentityProvidersApi`, `EventsApi`, ...). Each takes a `Configuration`.
- Method names are the spec's `operationId`s (`createOrganization`, `getOrganizations`, ...). Each takes one object with the path, query and body parameters, starting with `realm`. Its type is `<Class><Method>Request`, e.g. `OrganizationsApiCreateOrganizationRequest`.
- Optional query parameters, like `first`, `max` and `search`, are optional properties.
- Every method has a `...Raw` variant that returns the `Response` as well. Creates return `201` with an empty body and the new resource's URL in `Location`: use `createOrganizationRaw` and read `raw.headers.get("Location")`.
- `basePath` is your server URL plus `/realms`, e.g. `https://euc1.auth.ac/auth/realms`.

### Errors

A non-2xx response throws a `ResponseError` whose `response` is the `fetch` `Response`. A network failure throws a `FetchError`.

```ts
import { ResponseError } from "@p2-inc/js-sdk";

try {
  await orgs.getOrganizationById({ realm, orgId });
} catch (e) {
  if (e instanceof ResponseError && e.response.status === 404) {
    // no such organization
  } else {
    throw e;
  }
}
```

## Compatibility

| SDK | Phase Two API | Tested against |
|---|---|---|
| 0.2.x | 0.2 (`apiVersion` in [`sdk-generator.json`](sdk-generator.json)) | `quay.io/phasetwo/phasetwo-keycloak:26.5.6` |

`sdk-generator.json` also records the commit of the [OpenAPI spec](https://github.com/p2-inc/phasetwo-docs/blob/main/openapi.yaml) the code was generated from.

**Upgrading from 0.0.x:** the Account API (`AccountApi`) was removed, request types are named after their class (`CreateOrganizationRequest` → `OrganizationsApiCreateOrganizationRequest`), and SCIM operations moved to `OrganizationSCIMApi`.

## API reference

- [Phase Two API reference](https://phasetwo.io/api/): every operation, with request and response schemas.
- The type definitions in the package document each method and model.

## Generated code

The API classes and models in `src/openapi/` are generated from the Phase Two OpenAPI spec by [phasetwo-sdk-generator](https://github.com/p2-inc/phasetwo-sdk-generator), which opens a PR here when the spec changes. Don't edit them by hand: the `drift` check fails if they differ from the generator's output. Everything else (`src/index.ts`, `examples/`, the README) is hand-written. README code blocks are copied from `examples/` by the generator.

To build: `npm ci && npm run build`.

## License

Apache License 2.0, see [COPYING](COPYING).
