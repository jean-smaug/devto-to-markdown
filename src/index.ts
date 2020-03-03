#!/usr/bin/env node

import fs from "fs";
import slugify from "slugify";

import { insertInHead } from "./utils";

type Article = {
  title: string;
  published: boolean;
  body_markdown: string;
  published_at: string;
};

const includesPreview = process.argv.includes("--all");
const filePath = process.argv[2];

const articles = JSON.parse(fs.readFileSync(filePath, "utf8"));

if (!fs.readdirSync(process.cwd()).includes("markdown")) {
  fs.mkdirSync(`${process.cwd()}/markdown`);
}

articles.forEach((article: Article) => {
  if (!article.published && !includesPreview) {
    return;
  }

  const slugifiedTitle = slugify(article.title.replace(":", "").toLowerCase());

  const articlepath = `${process.cwd()}/markdown/${slugifiedTitle}`;

  fs.mkdir(articlepath, () => {
    const markdownData = insertInHead(article.body_markdown, {
      date: article.published_at
    });

    fs.writeFile(`${articlepath}/index.md`, markdownData, err => {
      if (err) {
        console.error(`Couldn't create the markdown for ${article.title}`);
      } else {
        // console.log(`Wrote ${article.title}`)
      }
    });
  });
});
