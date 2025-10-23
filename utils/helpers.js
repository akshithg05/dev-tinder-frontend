export function isValidURL(url) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-zA-Z0-9\\-])+\\.)+[a-zA-Z]{2,})" + // domain name
      "(\\:[0-9]{1,5})?" + // port (optional)
      "(\\/.*)?$", // path (optional)
    "i"
  );
  return pattern.test(url);
}
