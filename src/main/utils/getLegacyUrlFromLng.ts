import config from 'config';

export default function getLegacyUrlFromLng(path: string, lng = 'en'): URL['href'] {
  const url: string = config.get('services.et1Legacy.url');
  const legacyUrl = new URL(`${url}`);
  legacyUrl.pathname = lng + path;
  return legacyUrl.href;
}
