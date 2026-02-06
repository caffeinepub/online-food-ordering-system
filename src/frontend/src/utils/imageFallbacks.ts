// Centralized fallback image paths for restaurants and menu items
export const FALLBACK_IMAGES = {
  restaurant: '/assets/generated/restaurant-tamil-mess-cover.dim_1200x600.png',
  dish: '/assets/generated/dish-generic.dim_512x512.png',
  background: '/assets/generated/food-background.dim_1920x1080.png',
} as const;

// Map of known dish names to their generated image filenames
const DISH_NAME_TO_IMAGE: Record<string, string> = {
  'dosa': '/assets/generated/dish-dosa.dim_512x512.png',
  'idly': '/assets/generated/dish-idly.dim_512x512.png',
  'vada': '/assets/generated/dish-vada.dim_512x512.png',
  'vegetarian meals': '/assets/generated/dish-veg-meals.dim_512x512.png',
  'veg meals': '/assets/generated/dish-veg-meals.dim_512x512.png',
  'non-veg meals': '/assets/generated/dish-nonveg-meals.dim_512x512.png',
  'chicken chettinad': '/assets/generated/dish-chicken-chettinad.dim_512x512.png',
  'chicken 65': '/assets/generated/dish-chicken-65.dim_512x512.png',
  'pepper chicken': '/assets/generated/dish-pepper-chicken.dim_512x512.png',
  'pepper chicken (milagu varuval)': '/assets/generated/dish-pepper-chicken.dim_512x512.png',
  'chettinad mutton kuzhambu': '/assets/generated/dish-mutton-kuzhambu.dim_512x512.png',
  'mutton kuzhambu': '/assets/generated/dish-mutton-kuzhambu.dim_512x512.png',
  // Tandoori Treats (North Indian) dishes - now with specific generated assets
  'chicken tikka masala': '/assets/generated/dish-chicken-tikka-masala.dim_512x512.png',
  'paneer makhani': '/assets/generated/dish-paneer-makhani.dim_512x512.png',
  'jeera rice': '/assets/generated/dish-jeera-rice.dim_512x512.png',
  'butter naan (2 pcs)': '/assets/generated/dish-butter-naan.dim_512x512.png',
  'butter naan': '/assets/generated/dish-butter-naan.dim_512x512.png',
  'gajar halwa (dessert)': '/assets/generated/dish-gajar-halwa.dim_512x512.png',
  'gajar halwa': '/assets/generated/dish-gajar-halwa.dim_512x512.png',
  // Burger Joint dishes
  'cheeseburger': '/assets/generated/dish-cheeseburger.dim_512x512.png',
  'veggie burger': '/assets/generated/dish-veggie-burger.dim_512x512.png',
  'vanilla milkshake': '/assets/generated/dish-vanilla-milkshake.dim_512x512.png',
  // Pasta House dishes
  'fettucine alfredo': '/assets/generated/dish-fettuccine-alfredo.dim_512x512.png',
  'fettuccine alfredo': '/assets/generated/dish-fettuccine-alfredo.dim_512x512.png',
  'penne arrabiata': '/assets/generated/dish-penne-arrabbiata.dim_512x512.png',
  'penne arrabbiata': '/assets/generated/dish-penne-arrabbiata.dim_512x512.png',
  'chicken parmigiana': '/assets/generated/dish-chicken-parmigiana.dim_512x512.png',
  'garlic bread (3 pcs)': '/assets/generated/dish-garlic-bread.dim_512x512.png',
  'garlic bread': '/assets/generated/dish-garlic-bread.dim_512x512.png',
  // Pizza Palace dishes - now with specific generated assets
  'margherita pizza': '/assets/generated/dish-margherita-pizza.dim_512x512.png',
  'pepperoni pizza': '/assets/generated/dish-pepperoni-pizza.dim_512x512.png',
  'hawaiian pizza': '/assets/generated/dish-hawaiian-pizza.dim_512x512.png',
  'garlic breadsticks': '/assets/generated/dish-garlic-breadsticks.dim_512x512.png',
  'caesar salad': '/assets/generated/dish-caesar-salad.dim_512x512.png',
};

// Map of known restaurant names to their generated image filenames
const RESTAURANT_NAME_TO_IMAGE: Record<string, string> = {
  'chennai spice': '/assets/generated/restaurant-tamil-mess-cover.dim_1200x600.png',
  'tandoori treats': '/assets/generated/restaurant-north-indian-cover.dim_1200x600.png',
  'pizza palace': '/assets/generated/restaurant-pizza-palace-cover.dim_1200x600.png',
  'sushi central': '/assets/generated/restaurant-sushi-cover.dim_1200x600.png',
  'pasta house': '/assets/generated/restaurant-pasta-house-cover.dim_1200x600.png',
  'burger joint': '/assets/generated/restaurant-burger-joint-cover.dim_1200x600.png',
};

/**
 * Normalizes a name for image mapping by:
 * - Converting to lowercase
 * - Trimming whitespace
 * - Collapsing multiple spaces to single space
 * - Removing parenthetical suffixes like "(3 pcs)"
 * - Removing common punctuation
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/\([^)]*\)/g, '') // Remove parenthetical suffixes
    .replace(/[,;:.!?]/g, '') // Remove common punctuation
    .trim();
}

/**
 * Checks if a URL points to a legacy/incorrect asset that should be re-resolved
 * Treats known-bad patterns and legacy dim_* patterns as invalid
 */
function isLegacyAssetUrl(url: string): boolean {
  if (!url.includes('assets/generated/')) return false;
  
  // Legacy patterns that need re-resolution:
  // - Known bad Pizza Palace patterns (garlic-bread-pizza.png, salad-pizza.png, margherita-pizza.png, etc.)
  // - Known bad South Indian patterns (dim_dosa.png, dim_idly.png, etc. - missing proper prefix)
  // - Known bad North Indian patterns (chicken-tikka-masala.png, paneer-makhani.png, etc.)
  // - Any dim_* pattern without the proper dish- prefix
  const legacyPatterns = [
    // Pizza Palace incorrect mappings
    /pizza-palace\.dim_512x512\.png/,
    /garlic-bread-pizza\.png/,
    /salad-pizza\.png/,
    /margherita-pizza\.png(?!\.dim_)/,
    /pepperoni-pizza\.png(?!\.dim_)/,
    /hawaiian-pizza\.png(?!\.dim_)/,
    /caesar-salad\.png(?!\.dim_)/,
    /garlic-breadsticks\.png(?!\.dim_)/,
    // South Indian legacy patterns
    /dim_dosa\.png/,
    /dim_vada\.png/,
    /dim_idly\.png/,
    /dim_vegetarian_meals\.png/,
    /dim_non_veg_meals\.png/,
    /dim_chicken_chettinad\.png/,
    /dim_chicken_65\.png/,
    /dim_pepper_chicken_varuval\.png/,
    /dim_chettinad_mutton_kuzhambu\.png/,
    // North Indian incorrect patterns (without .dim_ suffix)
    /chicken-tikka-masala\.png(?!\.dim_)/,
    /paneer-makhani\.png(?!\.dim_)/,
    /jeera-rice\.png(?!\.dim_)/,
    /butter-naan\.png(?!\.dim_)/,
    /gajar-halwa\.png(?!\.dim_)/,
    // Pasta House incorrect patterns
    /garlic-bread-pasta\.png/,
    /fettucine-alfredo\.png(?!\.dim_)/,
    /penne-arrabiata\.png(?!\.dim_)/,
    /chicken-parmigiana\.png(?!\.dim_)/,
    // Sushi incorrect patterns
    /california-salmon-roll\.png/,
    /spicy-tuna-roll\.png/,
    /shrimp-tempura-roll\.png/,
    /miso-soup\.png/,
    /edamame\.png/,
    // Burger Joint incorrect patterns
    /cheeseburger\.png(?!\.dim_)/,
    /veggie-burger\.png(?!\.dim_)/,
    /vanilla-milkshake\.png(?!\.dim_)/,
    // Restaurant cover legacy patterns
    /tandoori-treats\.png(?!\.dim_)/,
    /pizza-palace\.png(?!\.dim_)/,
    /sushi-central\.png(?!\.dim_)/,
    /pasta-house\.png(?!\.dim_)/,
    /burger-joint\.png(?!\.dim_)/,
    /restaurant-indian-chennai-spice\.png(?!\.dim_)/,
    /restaurant-pizza-cover\.dim_1200x600\.png/,
  ];
  
  return legacyPatterns.some(pattern => pattern.test(url));
}

/**
 * Normalizes a URL to resolve to existing static assets
 * Handles leading slashes, maps known dish/restaurant names, and provides fallbacks
 */
function normalizeImageUrl(url: string | undefined, type: 'dish' | 'restaurant', name?: string): string {
  // If empty, missing, or legacy URL, try name-based mapping first
  if (!url || url.trim() === '' || isLegacyAssetUrl(url)) {
    if (name) {
      const normalized = normalizeName(name);
      if (type === 'dish' && DISH_NAME_TO_IMAGE[normalized]) {
        return DISH_NAME_TO_IMAGE[normalized];
      }
      if (type === 'restaurant' && RESTAURANT_NAME_TO_IMAGE[normalized]) {
        return RESTAURANT_NAME_TO_IMAGE[normalized];
      }
    }
    return type === 'dish' ? FALLBACK_IMAGES.dish : FALLBACK_IMAGES.restaurant;
  }

  // Remove leading slash if present to normalize
  const cleanUrl = url.startsWith('/') ? url.substring(1) : url;

  // Check if it's trying to reference a generated asset with wrong extension or name
  if (cleanUrl.includes('assets/generated/')) {
    // Extract the base name (e.g., "dosa" from "assets/generated/dosa.png")
    const match = cleanUrl.match(/assets\/generated\/([^.]+)/);
    if (match) {
      const baseName = match[1].toLowerCase();
      
      // Try to map to known dish images
      if (type === 'dish') {
        for (const [key, value] of Object.entries(DISH_NAME_TO_IMAGE)) {
          if (baseName.includes(key.replace(/\s+/g, '-')) || key.includes(baseName)) {
            return value;
          }
        }
      }
      
      // Try to map to known restaurant images
      if (type === 'restaurant') {
        for (const [key, value] of Object.entries(RESTAURANT_NAME_TO_IMAGE)) {
          if (baseName.includes(key.replace(/\s+/g, '-')) || key.includes(baseName)) {
            return value;
          }
        }
      }
    }
  }

  // If name is provided, try name-based mapping as fallback
  if (name) {
    const normalized = normalizeName(name);
    if (type === 'dish' && DISH_NAME_TO_IMAGE[normalized]) {
      return DISH_NAME_TO_IMAGE[normalized];
    }
    if (type === 'restaurant' && RESTAURANT_NAME_TO_IMAGE[normalized]) {
      return RESTAURANT_NAME_TO_IMAGE[normalized];
    }
  }

  // Return the URL as-is (with leading slash restored if needed)
  return url.startsWith('/') ? url : `/${cleanUrl}`;
}

export function getRestaurantImageUrl(imageUrl: string | undefined, restaurantName?: string): string {
  return normalizeImageUrl(imageUrl, 'restaurant', restaurantName);
}

export function getDishImageUrl(imageUrl: string | undefined, dishName?: string): string {
  return normalizeImageUrl(imageUrl, 'dish', dishName);
}
