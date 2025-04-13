export const WATER_TYPES = ["SULFUR", "ALCALINE"] as const;
export const ACCESSIBILITY_TYPES = ["PRIVATE", "PUBLIC"] as const;
export const FILTER_TYPES = [...WATER_TYPES, ...ACCESSIBILITY_TYPES] as const;