/**
 * Validates and parses a restaurant ID string into a positive bigint.
 * Returns a result object with either a valid ID or an error message.
 */
export type RestaurantIdResult =
  | { valid: true; id: bigint }
  | { valid: false; error: string };

export function parseRestaurantId(idString: string | undefined): RestaurantIdResult {
  if (!idString || idString.trim() === '') {
    return { valid: false, error: 'Restaurant ID is required' };
  }

  try {
    const id = BigInt(idString);
    if (id <= 0n) {
      return { valid: false, error: 'Invalid restaurant ID' };
    }
    return { valid: true, id };
  } catch {
    return { valid: false, error: 'Invalid restaurant ID format' };
  }
}
