
export const serializeTimestamp = (timestamp) => {
  if (!timestamp) return null;
  if (timestamp.toMillis) {
    return timestamp.toMillis();
  }
  return timestamp;
};

export const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString();
};