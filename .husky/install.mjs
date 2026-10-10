// Git hooks are a local convenience: skip them on CI, where there is nothing
// to commit and husky may not even be installed.
if (process.env.CI || process.env.NODE_ENV === "production") process.exit(0);

const husky = (await import("husky")).default;
console.log(husky());
