export function isHex(num: string) {
  const matchResult = num.match(/^0x[0-9a-f]+$/i);

  return Boolean(matchResult);
}
