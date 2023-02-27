# Checkout UI

This is the Myntra checkout experience for all platforms, in other words, Myntra's [bling bling](https://www.youtube.com/watch?v=-0kcet4aPpQ)

## Requirements
* Install node [10.15.3](https://nodejs.org/en/download/) or above
* VPN access. Incase if  you don't, drop a mail to `servicedesk@myntra.com` (cc manager for approval) requesting access.

## Dependencies
The app has dependencies on the following myntra libs
* [@myntra/m-agent](https://bitbucket.mynt.myntra.com/projects/PROJ/repos/m-agent/browse)
* [@myntra/m-comp](https://bitbucket.mynt.myntra.com/projects/PROJ/repos/m-comp/browse)
* [@myntra/m-shell](https://bitbucket.mynt.myntra.com/projects/PROJ/repos/m-shell/browse)
* [@myntra/myx](https://bitbucket.mynt.myntra.com/projects/PROJ/repos/myx/browse)
* [@myntra/vision](https://bitbucket.mynt.myntra.com/projects/PROJ/repos/vision/browse)

#### Setup
* `npm i --registry https://registry.myntra.com`
* `npm run dev`

## Onboarding
https://confluence.myntracorp.com/confluence/display/STOR/UI+Onboarding

## Common Issues
* Module not found
   * Do `npm i --registry https://registry.myntra.com`
* npm install failure(npm ERR)
   * Check whether the registry is pointing to `https://registry.myntra.com`
   * Check Node and npm version.
   * If not in office check whether VPN is connected
* `npm ERR! ERESOLVE unable to resolve dependency tree` during `npm install`
   1. Remove package-lock `rm package-lock.json`
   2. Remove node_modules `rm -rf node_modules/`
   3. If does doesn't resolve the issue try clearing cache after steps 1 & 2, `npm cache clean --force`