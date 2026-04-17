# Charlotte Portfolio (GitHub Pages Test)

Simple 2-page static website to test publishing to GitHub Pages.

## Files

- `index.html` - Charlotte portfolio homepage
- `achievements.html` - second page for multi-page navigation and JS filter testing
- `styles.css` - shared styles
- `script.js` - shared JavaScript (pet counter + achievements filter)
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow

## Publish Steps

1. Create a new GitHub repository and push this project to the `main` branch.
2. In GitHub, open **Settings > Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Push to `main` (or run the workflow manually in the **Actions** tab).
5. Wait for the workflow named **Deploy static site to GitHub Pages** to complete.
6. Open the Pages URL shown in the workflow output.

## What to Verify

- Both pages load:
  - `/` (home)
  - `/achievements.html`
- Navigation works in both directions.
- Home page "Give Charlotte a Pet" button increments and persists count.
- Achievements page filter buttons show/hide cards correctly.
- Layout is responsive on mobile and desktop.
