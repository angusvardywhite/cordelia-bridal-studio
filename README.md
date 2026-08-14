# Cordelia Bridal Studio

The production `main` branch currently publishes a temporary coming-soon page for Cordelia Bridal
Studio through Cloudflare Pages. There is no build step: Cloudflare publishes the `public` folder
directly.

## Temporary site

The coming-soon page keeps the established pale-blue paper background, typography and animated
Cordelia signature. After the signature finishes drawing, “Bridal Studio” types beneath it.
Scrolling reveals the Chester appointment details, telephone number and final “Coming Soon...” line
in sequence.

The CMS, previous copy and uploaded photography are intentionally absent from this temporary
version. A top-level `404.html` also ensures old paths, including `/admin/`, return a not-found page
instead of falling back to the homepage.

## Complete-site archive

The complete pre-coming-soon website is preserved in the Git tag:

`full-site-before-coming-soon-2026-08-14`

To restore it, restore the `public` folder and this README from that tag onto `main`, commit the
restoration normally, and push `main`. Do not force-push or rewrite history.

## Preview locally

Serve the `public` folder with any static web server, then open the local address it prints. For
example:

```bash
python3 -m http.server 8080 --directory public
```

## Cloudflare Pages settings

- Framework preset: none
- Build command: empty
- Build output directory: `public`
- Production branch: `main`

The custom domain is `cordeliabridalstudio.com`.
