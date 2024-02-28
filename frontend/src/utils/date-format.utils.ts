export function formatDateForComments(dateString: string) {
  // 2024-02-19T16:48:38.532Z
  const date = new Date(dateString);

  const year = date.getFullYear().toString().slice(2);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}.${year} at ${hours}:${minutes}`;
}
