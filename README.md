# CookieChimp documentation

Mintlify documentation for the hosted CookieChimp widget, Consent SDK and API.
Production is served at https://docs.cookiechimp.com/docs/overview.

## Preview and validate

Use Node 22 or newer from this repository root (`docs.json`):

```sh
npx --yes mint@4.2.1028 dev --port 3115 --no-open --telemetry=false
npx --yes mint@4.2.1028 validate --telemetry=false
npx --yes mint@4.2.1028 broken-links --files 'sdk/**/*.mdx' --check-anchors --telemetry=false
```

The local SDK overview is http://localhost:3115/sdk/overview. The public SDK
section is https://docs.cookiechimp.com/docs/sdk/overview after deployment.
Mintlify provides search, page Markdown views and llms indexes.

## Update SDK guides

The `sdk/*.mdx` pages are generated from the SDK's guide sources and package
READMEs. Edit those sources in `cookiechimp/cookiechimp-sdk`, commit the changes,
then build the export from that clean checkout:

```sh
pnpm install --frozen-lockfile
pnpm --filter @cookiechimp/docs build
```

CI saves the same output as the `mintlify-sdk-docs` artifact. From this docs
repository, import the export directory (containing `sdk/`, `navigation.json`
and `source.json`):

```sh
node scripts/import-sdk-docs.mjs /path/to/cookiechimp-sdk/packages/docs/dist
```

The importer updates only the SDK pages, their revision record and the Consent
SDK navigation group. Existing widget and API documentation stays intact. It
requires clean committed source and records the full source SHA in
`sdk/source.json`. If a source page is retired, remove its old generated MDX in
the same reviewed update. Validate and open a PR; do not edit generated pages
by hand or deploy from the SDK repository.

## Publishing

The existing Mintlify GitHub integration deploys documentation after a reviewed
PR is merged into this repository's default branch. Verify the resulting public
pages before merging SDK changes that direct users to newly added routes.
SDK npm publication and platform deployment are separate actions.
