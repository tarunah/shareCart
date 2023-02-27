const STATICMETA = {
  root: 'http://myntra.myntassets.com/',
  defaultRoot: 'http://myntra.myntassets.com/',
  secureRoot: 'https://cdn.myntassets.com/',
  cloudinaryRoot: 'http://assets.myntassets.com/',
  cloudinarySecureRoot: 'https://assets.myntassets.com/'
};

const defaults = {
  root: 'http://myntra.myntassets.com/',
  defaultRoot: 'http://myntra.myntassets.com/',
  secureRoot: 'https://cdn.myntassets.com/',
  cloudinaryRoot: 'http://assets.myntassets.com/',
  cloudinarySecureRoot: 'https://assets.myntassets.com/'
};

const replacer = (url, root, secureRoot) => {
  return url && root && url.substr(0, root.length) === root
    ? secureRoot + url.substr(root.length)
    : null;
};

const asset = options => {
  return url => {
    if (url && (url.substr(0, 4) === 'http' || url.substr(0, 2) === '//')) {
      url =
        replacer(url, options.cloudinaryRoot, options.cloudinarySecureRoot) ||
        replacer(url, options.defaultRoot, options.secureRoot) ||
        url;
    }
    return url;
  };
};

export default function(options) {
  const a = asset({ ...defaults, ...STATICMETA, ...(options || {}) });
  return function(url) {
    return a(url);
  };
}
