const allowedTagsList = ['b', 'strong', 'div', 'p', 'br', 'span', 'em'];

const allowedAttrList = ['style', 'class'];

const regexTag = /<[ +]?[a-z]+/g;

const regexAttr = / [a-z]+=["|']/g;

const getHtmlTags = html => {
  const tags = (html.match(regexTag) || []).map(tag =>
    tag.replace('<', '').trim()
  );
  return tags;
};

const getAttr = html => {
  const attrs = (html.match(regexAttr) || []).map(tag =>
    tag.split('=')[0].trim()
  );
  return attrs;
};

const checkFromAllowList = (arr, allowList) => {
  for (let i = 0; i < arr.length; i++) {
    let allowed = false;
    for (let j = 0; j < allowList.length; j++) {
      if (arr[i] === allowList[j]) {
        allowed = true;
        break;
      }
    }
    if (!allowed) {
      return false;
    }
  }
  return true;
};

const getCircularReplacer = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};

/**
 * Only allows tags from the the allowed tags and attributes list to be included in the input otherwise returns empty response
 * @param {*} data - A html string or stringified json
 * @returns provided input data if validation is successful otherwise empty string or object
 */
const sanitizeHelper = data => {
  // Check Tags
  const tags = getHtmlTags(data);

  const tagsAllowed = checkFromAllowList(tags, allowedTagsList);

  if (!tagsAllowed) {
    return '';
  }

  // Check Attributes
  const attrs = getAttr(data);

  const attrsAllowed = checkFromAllowList(attrs, allowedAttrList);

  if (!attrsAllowed) {
    return '';
  }

  return data;
};

const sanitize = data => {
  if (!data) {
    return;
  }
  const isString = typeof data === 'string';
  const response = isString
    ? data
    : JSON.stringify(data, getCircularReplacer());
  const output = sanitizeHelper(response);

  if (!output) {
    return isString ? '' : {};
  }
  return data;
};

module.exports = sanitize;
