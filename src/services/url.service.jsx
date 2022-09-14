export const redirectTo = (url) => {
  window.location.href = url;
};

export const openInNewTab = (url) => {
  window.open(url, "_blank").focus();
};

export const reloadPage = () => {
  window.location.reload();
};

export const addQueryParam = (path, obj) => {
  let url = "";
  Object.keys(obj).forEach((key) => {
    const param = `${key}=${obj[key]}`;
    url = url ? `${url}&${param}` : param;
  });
  return `${path}?${url}`;
};

export const getCurrentUrl = (url) => {
  return window.location.href;
};

export const isValidURL = (url) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};
