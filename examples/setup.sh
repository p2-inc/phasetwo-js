#!/usr/bin/env bash
# Prepare a Phase Two Keycloak for examples/quickstart.ts: a realm, a confidential
# client with a service account that may manage organizations, and a user to add
# as a member. Prints the environment the example reads, as KEY=value lines.
#
#   examples/setup.sh http://localhost:8080/auth >> "$GITHUB_ENV"
#
# Uses the bootstrap admin (admin/admin), so it's for test containers only.
set -euo pipefail

base=${1:?usage: setup.sh <keycloak-url-including-/auth>}
realm=example
client=phasetwo-example

token=$(curl -fsS "$base/realms/master/protocol/openid-connect/token" \
  -d grant_type=password -d client_id=admin-cli -d username=admin -d password=admin | jq -r .access_token)
api() { # <method> <path> [json]
  curl -fsS -X "$1" "$base/admin/realms$2" -H "Authorization: Bearer $token" \
    -H 'Content-Type: application/json' ${3:+-d "$3"}
}

api POST "" "{\"realm\":\"$realm\",\"enabled\":true}"
api POST "/$realm/clients" "{\"clientId\":\"$client\",\"publicClient\":false,\"serviceAccountsEnabled\":true,\"standardFlowEnabled\":false}"
cid=$(api GET "/$realm/clients?clientId=$client" | jq -r '.[0].id')
secret=$(api GET "/$realm/clients/$cid/client-secret" | jq -r .value)

# The service account gets realm-admin, which includes the organization roles.
sa=$(api GET "/$realm/clients/$cid/service-account-user" | jq -r .id)
rm_id=$(api GET "/$realm/clients?clientId=realm-management" | jq -r '.[0].id')
role=$(api GET "/$realm/clients/$rm_id/roles/realm-admin")
api POST "/$realm/users/$sa/role-mappings/clients/$rm_id" "[$role]"

api POST "/$realm/users" '{"username":"jane","email":"jane@example.com","enabled":true}'
user=$(api GET "/$realm/users?exact=true&username=jane" | jq -r '.[0].id')

echo "PHASETWO_URL=$base"
echo "PHASETWO_REALM=$realm"
echo "PHASETWO_CLIENT_ID=$client"
echo "PHASETWO_CLIENT_SECRET=$secret"
echo "PHASETWO_USER_ID=$user"
