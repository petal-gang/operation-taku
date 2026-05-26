# Fix 404 on GitHub Pages

If **https://petal-gang.github.io/operation-taku/** shows 404, GitHub Pages is not turned on yet (the build can succeed while the site stays offline).

## Fix (about 30 seconds)

1. Open **https://github.com/petal-gang/operation-taku/settings/pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch”).
3. Click **Save**.
4. Open **Actions** → **GitHub Pages** → **Run workflow**.
5. Wait for the green checkmark (1–2 minutes).
6. Reload **https://petal-gang.github.io/operation-taku/**

## Org admin (if Source is greyed out)

Organization owners may need:

**https://github.com/organizations/petal-gang/settings/member_privileges**

→ **Pages** → allow members to publish sites.

## Alternative source (branch deploy)

If you prefer **Deploy from a branch** instead:

- Branch: `gh-pages`
- Folder: `/ (root)`

The `gh-pages` branch is already populated by older workflow runs.
