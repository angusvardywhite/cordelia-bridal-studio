# Cordelia Bridal Studio

A single-page, editorial bridal-studio website for Cloudflare Pages, with a Decap CMS editor at
`/admin/` and direct GitHub-account login.

The public site is dependency-free. Text and uploaded images are read directly from
`public/content/site.json`, so there is no application build step to maintain.

## Preview locally

Serve the `public` folder with any static web server, then open the local address it prints. For
example:

```bash
python3 -m http.server 8080 --directory public
```

The public page will be at `http://localhost:8080/`. The CMS can be tested locally with the
[Decap local proxy](https://decapcms.org/docs/decap-proxy/) running separately.

## Publish on Cloudflare Pages

1. Create the GitHub repository `angusvardywhite/cordelia-bridal-studio` and push this folder to
   its `main` branch.
2. In Cloudflare, create a Pages project and connect that GitHub repository.
3. Use no framework preset, leave the build command empty, and set the build output directory to
   `public`. The included `wrangler.jsonc` records the same output directory.
4. Add `cordeliabridalstudio.com` as the Pages custom domain.

Each CMS save creates a commit on `main`; Cloudflare Pages will automatically publish the updated
text and images from that commit.

## Enable `/admin/` GitHub login

Cloudflare Pages does not supply the GitHub OAuth exchange itself. The CMS is therefore configured
to use a small Cloudflare Worker at `https://auth.cordeliabridalstudio.com`, following the
[Cloudflare Worker proxy linked by Decap](https://github.com/sterlingwes/decap-proxy).

1. In GitHub Developer Settings, create an OAuth App.
2. Set its homepage URL to `https://auth.cordeliabridalstudio.com` and its callback URL to
   `https://auth.cordeliabridalstudio.com/callback`.
3. Deploy the Decap proxy Worker and attach the custom domain `auth.cordeliabridalstudio.com`.
4. Store the OAuth credentials on that Worker as encrypted secrets named `GITHUB_OAUTH_ID` and
   `GITHUB_OAUTH_SECRET`.
5. If the website repository is private, set the Worker's `GITHUB_REPO_PRIVATE` variable to `1`.
6. Visit `https://cordeliabridalstudio.com/admin/` and choose **Login with GitHub**.

Anyone using the CMS must have push access to the GitHub repository. Never place the OAuth secret
in this repository or in `wrangler.jsonc`.

## Editing model

The CMS exposes one “Home page” entry containing the page copy and a reorderable list of dress
spaces. Each dress space has an optional image, accessible image description, name, and small
caption. Images are saved under `public/assets/uploads/` and content changes are committed to
GitHub.

## Brand files

The black and white logo artwork and favicon assets are in `public/assets/brand/`. The page uses
the guide's pale-blue paper colour (`#D8E2ED`) and the embedded Devanagari Sangam MN typeface when
it is available, with closely matched system fallbacks elsewhere.
