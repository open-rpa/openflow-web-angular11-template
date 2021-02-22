import { AuthConfig } from 'angular-oauth2-oidc';
const domain:string = "app.openiap.io";
export const api_wsurl: string = "wss://" + domain;
export const authCodeFlowConfig: AuthConfig = {
    issuer: "https://" + domain + "/oidc",
    redirectUri: window.location.origin,
    responseType: 'code',
    clientId: 'mywebapp',
    scope: 'openid'
};