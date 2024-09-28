export function valiQuery(query: any): string {
  return Object.entries(query)
    ?.map(([key, value]) => `${key}=${value}`)
    .join('&');
}
