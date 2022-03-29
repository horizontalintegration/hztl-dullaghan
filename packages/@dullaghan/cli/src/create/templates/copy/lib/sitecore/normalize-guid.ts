// Sitecore stores guids in a number of different formats
// so we need to normalize them before we can perform string comparisons
export const normalizeGuid = (guid?: string): string | undefined =>
  guid?.toLowerCase().replace(/[\{\-\}]/g, '');
