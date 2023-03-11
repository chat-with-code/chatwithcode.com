import nextBundleAnalyzer from "@next/bundle-analyzer";
import withVideos from "next-videos";
import nextra from "nextra";
import remarkMdxDisableExplicitJsx from "remark-mdx-disable-explicit-jsx";
import { remarkCodeHike } from '@code-hike/mdx'; 
import theme from "shiki/themes/material-palenight.json" assert { type: "json" };

// src/remark-mermaid.ts
import visit from 'unist-util-visit';
var FILE_PATH = "@theguild/components";
var MERMAID_IMPORT_AST = {
  type: "mdxjsEsm",
  value: `import { Mermaid } from "${FILE_PATH}"`,
  data: {
    estree: {
      type: "Program",
      sourceType: "module",
      body: [
        {
          type: "ImportDeclaration",
          specifiers: [
            {
              type: "ImportSpecifier",
              imported: { type: "Identifier", name: "Mermaid" },
              local: { type: "Identifier", name: "Mermaid" }
            }
          ],
          source: {
            type: "Literal",
            value: FILE_PATH,
            raw: `"${FILE_PATH}"`
          }
        }
      ]
    }
  }
};
var getMermaidElementAST = (value) => ({
  type: "mdxJsxFlowElement",
  name: "Mermaid",
  children: [],
  attributes: [
    {
      type: "mdxJsxAttribute",
      name: "chart",
      value: {
        type: "mdxJsxAttributeValueExpression",
        value: `\`${value}\``,
        data: {
          estree: {
            type: "Program",
            sourceType: "module",
            body: [
              {
                type: "ExpressionStatement",
                expression: {
                  type: "TemplateLiteral",
                  expressions: [],
                  quasis: [
                    {
                      type: "TemplateElement",
                      value: {
                        raw: value,
                        cooked: value
                      },
                      tail: true
                    }
                  ]
                }
              }
            ]
          }
        }
      }
    }
  ]
});
var remarkMermaid = () => (ast, _file, done) => {
  const codeblocks = [];
  visit(ast, { type: "code", lang: "mermaid" }, (node, index, parent) => {
    codeblocks.push([node, index, parent]);
  });
  if (codeblocks.length !== 0) {
    for (const [node, index, parent] of codeblocks) {
      parent.children.splice(index, 1, getMermaidElementAST(node.value));
    }
    ast.children.unshift(MERMAID_IMPORT_AST);
  }
  done();
};

// src/underscore-redirects.ts
import { writeFile } from "fs/promises";
import { join } from "path";
var RunPromiseWebpackPlugin = class {
  constructor(asyncHook) {
    this.asyncHook = asyncHook;
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tapPromise("RunPromiseWebpackPlugin", this.asyncHook);
  }
};
var isWarningPrinted = false;
function applyUnderscoreRedirects(config, meta) {
  config.plugins.push(
    new RunPromiseWebpackPlugin(async () => {
      const outDir = meta.dir;
      const outFile = join(outDir, "./public/_redirects");
      try {
        const redirects = meta.config.redirects ? Array.isArray(meta.config.redirects) ? meta.config.redirects : await meta.config.redirects() : [];
        if (redirects.length === 0) {
          if (!isWarningPrinted) {
            console.warn('[guild-docs] No redirects defined, no "_redirect" file is created!');
            isWarningPrinted = true;
          }
          return;
        }
        const redirectsTxt = redirects.map((r) => `${r.source} ${r.destination} ${r.permanent ? 301 : 302}`).join("\n");
        await writeFile(outFile, redirectsTxt);
      } catch (error) {
        throw new Error(
          `Failed to generate "_redirects" file during build: ${error.message}`
        );
      }
    })
  );
}

// src/next.config.ts
var withGuildDocs = ({
  themeConfig = "./theme.config.tsx",
  whiteListDisableExplicitJsx = [],
  transformPageOpts,
  ...nextConfig
} = {}) => {
  if (nextConfig.webpack?.toString().includes("applyUnderscoreRedirects")) {
    throw new Error(
      "`applyUnderscoreRedirects` in `nextConfig.webpack` was already configured, remove it from your config"
    );
  }
  const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === "true"
  });
  const withNextra = nextra({
    themeConfig,
    theme: "nextra-theme-docs",
    defaultShowCopyCode: true,
    transformPageOpts,
    mdxOptions: {
      remarkPlugins: [
        [
          remarkMdxDisableExplicitJsx,
          { whiteList: ["iframe", "video", "source", ...whiteListDisableExplicitJsx] }
        ],
        remarkMermaid,
        [remarkCodeHike, { theme }],
      ]
    }
  });
  const siteUrl = process.env.SITE_URL || "";
  return withBundleAnalyzer(
    withVideos(
      withNextra({
        reactStrictMode: true,
        poweredByHeader: false,
        basePath: process.env.NEXT_BASE_PATH,
        ...nextConfig,
        env: {
          SITE_URL: siteUrl,
          ...nextConfig.env
        },
        webpack(config, meta) {
          applyUnderscoreRedirects(config, meta);
          return nextConfig.webpack?.(config, meta) || config;
        },
        experimental: {
          newNextLinkBehavior: true,
          ...nextConfig.experimental
        },
        images: {
          unoptimized: true,
          ...nextConfig.images
        }
      })
    )
  );
};
export {
  withGuildDocs
};
