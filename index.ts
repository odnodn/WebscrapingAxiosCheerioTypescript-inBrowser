import './style.scss'

import axios from 'axios';
import cheerio from 'cheerio';

/** */
export interface Bookmark {
  title: string;
  icon: string;
  description: string;
  url: string;
}

const url = 'https://bulma.io/';
// const url = 'https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Fallzahlen.html';
const $bookmark = document.getElementById('bookmark');

axios.get(url)
.then(response => {
  const html = response.data;
  const $ = cheerio.load(html);

  const title = getTitle($);
  const icon = getIcon($);
  const description = getDescription($);

  renderBookmark({ title, icon, description, url });

  console.log(html);
})
.catch(error => {
  console.error('ERROR', error);
})


/** */
function getTitle($): string {
  return (
    $('meta[property="og:title"]').attr('content') ||
    $('meta[name="twitter:title"]').attr('content') ||
    $('title') ||
    $('.post-title').text() ||
    $('.entry-title') ||
    $('h1[class*="title" i] a').text() ||
    $('h1[class*="title" i]').text() ||
    null
  );
}

/** */
function getIcon($): string {
  return (
    $('link[rel="icon"]').attr('href') ||
    $('link[rel="shortcut icon"]').attr('href') ||
    $('link[rel*="apple-touch-icon"]').attr('href') ||
    $('meta[name*="msapplication-tileimage" i]').attr('content') ||
    null
  );
}

/** */
function getDescription($): string {
  return (
    $('meta[property="og:description"]').attr('content') ||
    $('meta[name="twitter:description"]').attr('content') ||
    $('meta[name="description"]').attr('content') ||
    $('meta[itemprop="description"]').attr('content') ||
    null
  );
}

/** */
function renderBookmark(bookmark: Bookmark): void {
  $bookmark.innerHTML = `
    <a href="${bookmark.url}">
      <img class="icon" src="${bookmark.icon}">
      <h2 class="title">${bookmark.title}</h2>
      <p class="desc">${bookmark.description}</p>
      <p class="url">${bookmark.url}</p>
    </a>
  `;
}

// embed
// $('link[type="application/json+oembed"]').attr('href')

// image
// toImage($ => $('meta[property="og:image:secure_url"]').attr('content')),
//     toImage($ => $('meta[property="og:image:url"]').attr('content')),
//     toImage($ => $('meta[property="og:image"]').attr('content')),
//     toImage($ => $('meta[name="twitter:image:src"]').attr('content')),
//     toImage($ => $('meta[name="twitter:image"]').attr('content')),
//     toImage($ => $('meta[itemprop="image"]').attr('content')),
//     toImage($jsonld('image.0.url')),
//     toImage($jsonld('image.url')),
//     toImage($jsonld('image.url')),
//     toImage($jsonld('image')),
//     toImage($ => $filter($, $('article img[src]'), getSrc)),
//     toImage($ => $filter($, $('#content img[src]'), getSrc)),
//     toImage($ => $('img[alt*="author" i]').attr('src')),
//     toImage($ => $('img[src]:not([aria-hidden="true"])').attr('src'))


// logo
// toUrl($jsonld('publisher.logo.url')),
//   toUrl($jsonld('publisher.logo')),
//   toUrl($ => $('meta[property="og:logo"]').attr('content')),
//   toUrl($ => $('meta[itemprop="logo"]').attr('content')),
//   toUrl($ => $('img[itemprop="logo"]').attr('src'))
