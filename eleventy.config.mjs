export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/CNAME": "CNAME" });
  eleventyConfig.addPassthroughCopy({ "src/robots.txt": "robots.txt" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });
  eleventyConfig.addPassthroughCopy({ "src/photos": "photos" });

  eleventyConfig.addFilter("date", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toISOString().slice(0, 10);
  });

  // Capitalize the first letter only, leaving the rest untouched. Section
  // titles are lowercase by design; post titles are already proper-cased,
  // so this is a no-op for them.
  eleventyConfig.addFilter("titleCap", (s) =>
    typeof s === "string" && s.length ? s[0].toUpperCase() + s.slice(1) : s
  );

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
