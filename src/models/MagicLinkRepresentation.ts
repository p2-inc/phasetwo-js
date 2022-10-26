/* tslint:disable */
/* eslint-disable */
/**
 * Phase Two Admin REST API
 * This is a REST API reference for the Phase Two Keycloak custom resources. These are extensions to the standard [Keycloak Admin REST API](https://www.keycloak.org/docs-api/17.0/rest-api/index.html).  ### Base URI format Paths specified in the documentation are relative to the the base URI. - Format: `https://<host>:<port>/auth/realms` - Example: `https://app.phasetwo.io/auth/realms`  ### Authentication Authentication is achieved by using the `Authentication: Bearer <token>` header in all requests. This is either the access token received from a normal authentication, or by a request directly to the OpenID Connect token endpoint.  It is recommended that you use a Keycloak Admin Client, such as [this one for Javascript](https://github.com/keycloak/keycloak-nodejs-admin-client), as they take care of authetication, getting an access token, and refreshing it when it expires.  #### Client credentials grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=client_credentials&client_id=admin-cli&client_secret=fd649804-3a74-4d69-acaa-8f065c6b7da1 ```  #### Password grant example ``` POST /auth/realms/test-realm/protocol/openid-connect/token Host: app.phasetwo.io Accept: application/json Content-type: application/x-www-form-urlencoded  grant_type=password&username=uname@foo.com&password=pwd123AZY&client_id=admin-cli ``` 
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface MagicLinkRepresentation
 */
export interface MagicLinkRepresentation {
    /**
     * 
     * @type {string}
     * @memberof MagicLinkRepresentation
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLinkRepresentation
     */
    clientId: string;
    /**
     * 
     * @type {string}
     * @memberof MagicLinkRepresentation
     */
    redirectUri: string;
    /**
     * 
     * @type {number}
     * @memberof MagicLinkRepresentation
     */
    expirationSeconds?: number;
    /**
     * 
     * @type {boolean}
     * @memberof MagicLinkRepresentation
     */
    forceCreate?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof MagicLinkRepresentation
     */
    sendEmail?: boolean;
}

/**
 * Check if a given object implements the MagicLinkRepresentation interface.
 */
export function instanceOfMagicLinkRepresentation(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "clientId" in value;
    isInstance = isInstance && "redirectUri" in value;

    return isInstance;
}

export function MagicLinkRepresentationFromJSON(json: any): MagicLinkRepresentation {
    return MagicLinkRepresentationFromJSONTyped(json, false);
}

export function MagicLinkRepresentationFromJSONTyped(json: any, ignoreDiscriminator: boolean): MagicLinkRepresentation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'clientId': json['client_id'],
        'redirectUri': json['redirect_uri'],
        'expirationSeconds': !exists(json, 'expiration_seconds') ? undefined : json['expiration_seconds'],
        'forceCreate': !exists(json, 'force_create') ? undefined : json['force_create'],
        'sendEmail': !exists(json, 'send_email') ? undefined : json['send_email'],
    };
}

export function MagicLinkRepresentationToJSON(value?: MagicLinkRepresentation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'client_id': value.clientId,
        'redirect_uri': value.redirectUri,
        'expiration_seconds': value.expirationSeconds,
        'force_create': value.forceCreate,
        'send_email': value.sendEmail,
    };
}

