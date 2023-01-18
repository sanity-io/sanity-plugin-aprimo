This is a Sanity Studio v2 plugin. For the v3 version, please refer to the main branch.

# Aprimo asset selector for Sanity

![aprimo gif](https://user-images.githubusercontent.com/3969996/136493868-9908e13d-e97e-4275-87e6-7a3ca3019d5b.gif)

This plugin allows you to open the Aprimo DAM asset selector from your studio and save those chosen assets and renditions in your Sanity documents.

NOTE: To take advantage of assets that aren't public renditions, you will need to authenticate requests from the studio. Because CORS isn't possible with Aprimo, you will need to set up a proxy to route authentication requests (this proxy endpoint can be configured from the studio). Your proxy endpoint should be able to route requests from the studio to https://your-tenant-name.aprimo.com/api/oauth/create-native-token. If you are using serverless functions or Next.js and would rather route all requests according to an `X-URL` header, we've set up a quickstart example for that [here](https://github.com/sanity-io/example-sanity-proxy). 

## Installation

1. In your studio directory, run `sanity install aprimo`.
2. Declare a field to be `aprimo.asset` or an `aprimo.cdnasset` (for public renditions) in your schema. For example:

```javascript
    {
      type: "aprimo.asset",
      name: "image",
      description: "This asset is served from Aprimo",
    }
```
3. Navigate to that directory in your studio. There will be a plugin icon to the top left of that field, that will allow you to add the credentials for your Aprimo tenant. Enter in these details (they will be safely stored in your Sanity dataset as a private document. Remember to include these credentials across all your datasets!) If any of these fields are confusing, contact your Aprimo administrator.

<img width="324" alt="aprimo credentials" src="https://user-images.githubusercontent.com/3969996/136494120-0951c831-96da-4317-8b5f-d8d1f689c775.png">

## Usage

After the above, you should be able to use the selector on any field declared as `aprimo.asset` or `aprimo.cdnasset`. By including the `aprimo.asset` type in an array, you can use the multiple selector in Sanity as well.

<img width="724" alt="aprimo array" src="https://user-images.githubusercontent.com/3969996/136494363-a14973ea-9132-40f8-b365-679e203beb50.png">
