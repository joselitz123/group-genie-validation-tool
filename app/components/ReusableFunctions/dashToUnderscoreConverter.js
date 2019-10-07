// @flow

const dashToUnderscoreConverter = (data: any) =>
  data.toString().replace(/-/g, "_");

export default dashToUnderscoreConverter;
