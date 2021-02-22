# OpenflowWebAngular11Template

Example project showing how to create a custom frontend for OpenFlow.

Assume you have [visual code](https://code.visualstudio.com/Download) and latest version of [nodejs](https://nodejs.org/en/download/) installed

Fork this project, and clone it to your local machine ( change open-rpa to your name )

```powershell
git clone https://github.com/open-rpa/openflow-web-angular11-template.git
cd openflow-web-angular11-template
```

make sure you have angular cli installed

```powershell
npm i -g @angular/cli 
```

Then to run the project type

```powershell
ng serv
```

You set the openflow you want to talk with inside [/src/app/authCodeFlowConfig.ts](src/app/authCodeFlowConfig.ts)

here you also need to configure the oidc client you configured inside that openflow

In openflow go to #/OAuthClients and click Add OAuth client, give it a name and a clientid, secret should NOT be needed, then make sure "token_endpoint_auth_method" is set to "client_secret_post"
**Please make sure to set redirecturis and post_logout_redirect_uris before you go into production!**

Once your ready to publish you project, make sure you have [docker](https://docs.docker.com/get-docker/) installed, then try and build your project and create a docker image with your project

```powershell
ng build --prod
docker-compose up --build -d
```

and check it out at [localhost](http://localhost) assuming you don't have IIS or other software installed using the port, if so, turn that off first, and try again.