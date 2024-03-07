export function getSpecialKey(key: string, json: object) {
  return key + JSON.stringify(json);
}
export function getSimpleKey(key: string, data: string | number) {
  return key + data;
}
