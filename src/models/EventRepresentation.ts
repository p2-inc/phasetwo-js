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
import type { AuthDetailsRepresentation } from './AuthDetailsRepresentation';
import {
    AuthDetailsRepresentationFromJSON,
    AuthDetailsRepresentationFromJSONTyped,
    AuthDetailsRepresentationToJSON,
} from './AuthDetailsRepresentation';

/**
 * 
 * @export
 * @interface EventRepresentation
 */
export interface EventRepresentation {
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    uid?: string;
    /**
     * 
     * @type {number}
     * @memberof EventRepresentation
     */
    time?: number;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    realmId?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    organizationId?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    representation?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    operationType?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    resourcePath?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    resourceType?: string;
    /**
     * 
     * @type {string}
     * @memberof EventRepresentation
     */
    error?: string;
    /**
     * 
     * @type {AuthDetailsRepresentation}
     * @memberof EventRepresentation
     */
    authDetails?: AuthDetailsRepresentation;
    /**
     * 
     * @type {{ [key: string]: any; }}
     * @memberof EventRepresentation
     */
    details?: { [key: string]: any; };
}

/**
 * Check if a given object implements the EventRepresentation interface.
 */
export function instanceOfEventRepresentation(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function EventRepresentationFromJSON(json: any): EventRepresentation {
    return EventRepresentationFromJSONTyped(json, false);
}

export function EventRepresentationFromJSONTyped(json: any, ignoreDiscriminator: boolean): EventRepresentation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uid': !exists(json, 'uid') ? undefined : json['uid'],
        'time': !exists(json, 'time') ? undefined : json['time'],
        'realmId': !exists(json, 'realmId') ? undefined : json['realmId'],
        'organizationId': !exists(json, 'organizationId') ? undefined : json['organizationId'],
        'type': !exists(json, 'type') ? undefined : json['type'],
        'representation': !exists(json, 'representation') ? undefined : json['representation'],
        'operationType': !exists(json, 'operationType') ? undefined : json['operationType'],
        'resourcePath': !exists(json, 'resourcePath') ? undefined : json['resourcePath'],
        'resourceType': !exists(json, 'resourceType') ? undefined : json['resourceType'],
        'error': !exists(json, 'error') ? undefined : json['error'],
        'authDetails': !exists(json, 'authDetails') ? undefined : AuthDetailsRepresentationFromJSON(json['authDetails']),
        'details': !exists(json, 'details') ? undefined : json['details'],
    };
}

export function EventRepresentationToJSON(value?: EventRepresentation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uid': value.uid,
        'time': value.time,
        'realmId': value.realmId,
        'organizationId': value.organizationId,
        'type': value.type,
        'representation': value.representation,
        'operationType': value.operationType,
        'resourcePath': value.resourcePath,
        'resourceType': value.resourceType,
        'error': value.error,
        'authDetails': AuthDetailsRepresentationToJSON(value.authDetails),
        'details': value.details,
    };
}

