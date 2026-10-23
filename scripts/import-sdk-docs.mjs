import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
if (!process.argv[2]) throw new Error("Usage: node scripts/import-sdk-docs.mjs /path/to/SDK/packages/docs/dist");
const input = resolve(process.argv[2]);
const source = JSON.parse(await readFile(join(input, "source.json"), "utf8"));
const navigation = JSON.parse(await readFile(join(input, "navigation.json"), "utf8"));
if (source.repository !== "https://github.com/cookiechimp/cookiechimp-sdk" ||
    !/^[a-f0-9]{40}$/.test(source.sourceCommit) || source.dirty !== false ||
    !Array.isArray(source.pages) || !source.pages.length || source.pages.length > 100) {
  throw new Error("Import requires an export from a clean, committed CookieChimp SDK checkout");
}
const slugs = source.pages.map((page) => page.slug);
if (slugs.some((slug) => typeof slug !== "string" || !/^[a-z][a-z0-9-]*$/.test(slug)) ||
    new Set(slugs).size !== slugs.length || navigation.dropdown !== "Consent SDK" ||
    !Array.isArray(navigation.groups)) throw new Error("Invalid SDK page manifest");
const routes = navigation.groups.flatMap((group) => group.pages ?? []);
if (routes.length !== slugs.length ||
    new Set(routes).size !== routes.length ||
    routes.some((route) => !slugs.some((slug) => route === `sdk/${slug}`))) {
  throw new Error("SDK navigation must list exactly the exported pages");
}
// Read and validate the entire import before changing any documentation.
const pages = await Promise.all(slugs.map(async (slug) => {
  const mdx = await readFile(join(input, "sdk", `${slug}.mdx`), "utf8");
  if (!mdx.startsWith("---\ntitle:") || !mdx.includes("\ndescription:")) {
    throw new Error(`Missing MDX metadata: ${slug}`);
  }
  return { slug, mdx };
}));
const config = JSON.parse(await readFile(join(root, "docs.json"), "utf8"));
const dropdowns = config.navigation.dropdowns;
if (!Array.isArray(dropdowns)) throw new Error("Expected Mintlify dropdown navigation");
const previous = dropdowns.findIndex((item) => item.dropdown === "Consent SDK");
if (previous >= 0) dropdowns[previous] = navigation;
else dropdowns.splice(1, 0, navigation);
await mkdir(join(root, "sdk"), { recursive: true });
for (const { slug, mdx } of pages) await writeFile(join(root, "sdk", `${slug}.mdx`), mdx);
await writeFile(join(root, "sdk", "source.json"), `${JSON.stringify(source, null, 2)}\n`);
await writeFile(join(root, "docs.json"), `${JSON.stringify(config, null, 2)}\n`);
console.log(`Imported ${pages.length} SDK pages from ${source.sourceCommit}`);
