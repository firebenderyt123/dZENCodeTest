export function getSpecialKey(key: string, json: object) {
  return key + JSON.stringify(json);
}
