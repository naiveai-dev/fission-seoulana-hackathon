export function formatNumber(number: number | bigint): string {
  const _number = Number(number);

  if (number >= 1e9) {
    return `${(_number / 1e9).toFixed(1)}B`;
  } else if (_number >= 1e6) {
    return `${_number / 1e6}M`;
  } else if (_number >= 1e3) {
    return `${_number / 1e3}K`;
  } else {
    return _number.toLocaleString('en-US');
  }
}
