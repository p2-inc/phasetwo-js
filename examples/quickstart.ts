// The README quick start. CI runs it against Phase Two Keycloak (see setup.sh).
// snippet:start quickstart
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
// snippet:end quickstart

await orgs.deleteOrganization({ realm, orgId });
