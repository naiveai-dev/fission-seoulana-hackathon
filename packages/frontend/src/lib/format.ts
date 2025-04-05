import { LabelingHistory } from './use-labeling';

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

export const formatLabelingHistory = (history: LabelingHistory[]) => {
  if (!Array.isArray(history) || history.length === 0) {
    return 'No labeling history available.';
  }

  return history
    .map((item, index) => {
      if (!item) return `Sample ${index + 1}: Invalid data`;

      return `
    Sample ${index + 1}:
    User Query: "${item.userQuery || 'N/A'}"
    Response Fragment: "${item.responseFragment || 'N/A'}"
    User's Label: ${item.userLabel || 'N/A'}
  `;
    })
    .join('\n');
};
