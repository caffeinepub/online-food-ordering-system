// Centralized fallback image paths for restaurants and menu items
export const FALLBACK_IMAGES = {
  restaurant: '/assets/generated/restaurant-tamil-mess-cover.dim_1200x600.png',
  dish: '/assets/generated/dish-generic.dim_512x512.png',
  background: '/assets/generated/food-background-black-gold.dim_1920x1080.png',
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
  // Chennai Spice - newly generated dishes
  'sambar': '/assets/generated/dish-sambar.dim_512x512.png',
  'coconut chutney': '/assets/generated/dish-coconut-chutney.dim_512x512.png',
  'nattu kozhi kulambu': '/assets/generated/dish-nattu-kozhi-kulambu.dim_512x512.png',
  'nilgiri chicken korma': '/assets/generated/dish-nilgiri-chicken-korma.dim_512x512.png',
  'nanjil nattu chicken curry': '/assets/generated/dish-nanjil-nattu-chicken-curry.dim_512x512.png',
  'chicken ghee roast': '/assets/generated/dish-chicken-ghee-roast.dim_512x512.png',
  'mutton chukka (varuval)': '/assets/generated/dish-mutton-chukka.dim_512x512.png',
  'mutton chukka': '/assets/generated/dish-mutton-chukka.dim_512x512.png',
  'mutton uppu kari': '/assets/generated/dish-mutton-uppu-kari.dim_512x512.png',
  'mutton nalli fry': '/assets/generated/dish-mutton-nalli-fry.dim_512x512.png',
  // Chennai Spice - Seafood dishes (all available with new generated images)
  'karimeen pollichathu': '/assets/generated/dish-karimeen-pollichathu.dim_512x512.png',
  'malabar fish curry/meen curry': '/assets/generated/dish-malabar-fish-curry.dim_512x512.png',
  'malabar fish curry': '/assets/generated/dish-malabar-fish-curry.dim_512x512.png',
  'meen curry': '/assets/generated/dish-malabar-fish-curry.dim_512x512.png',
  'nethili 65': '/assets/generated/dish-nethili-65.dim_512x512.png',
  'fish varutharacha': '/assets/generated/dish-fish-varutharacha.dim_512x512.png',
  // New Chennai Spice seafood dishes with generated images
  'chepala pulusu': '/assets/generated/dish-chepala-pulusu.dim_512x512.png',
  'prawn ghee roast': '/assets/generated/dish-prawn-ghee-roast.dim_512x512.png',
  'crab masala/nandu kuzhambu': '/assets/generated/dish-crab-masala-nandu-kuzhambu.dim_512x512.png',
  'crab masala': '/assets/generated/dish-crab-masala-nandu-kuzhambu.dim_512x512.png',
  'nandu kuzhambu': '/assets/generated/dish-crab-masala-nandu-kuzhambu.dim_512x512.png',
  'kanava/koonthal masala': '/assets/generated/dish-kanava-koonthal-masala.dim_512x512.png',
  'kanava masala': '/assets/generated/dish-kanava-koonthal-masala.dim_512x512.png',
  'koonthal masala': '/assets/generated/dish-kanava-koonthal-masala.dim_512x512.png',
  'fish mappas': '/assets/generated/dish-fish-mappas.dim_512x512.png',
  'fish kola urundai': '/assets/generated/dish-fish-kola-urundai.dim_512x512.png',
  'chemmeen biryani': '/assets/generated/dish-chemmeen-biryani.dim_512x512.png',
  'andhra fish fry': '/assets/generated/dish-andhra-fish-fry.dim_512x512.png',
  // Chennai Spice - Street Snacks
  'pani puri': '/assets/generated/dish-pani-puri.dim_512x512.png',
  'bhel puri': '/assets/generated/dish-bhel-puri.dim_512x512.png',
  'kaalan': '/assets/generated/dish-kaalan.dim_512x512.png',
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
  // Sushi Central dishes - now with specific generated assets
  'california salmon roll': '/assets/generated/dish-california-salmon-roll.dim_512x512.png',
  'spicy tuna roll': '/assets/generated/dish-spicy-tuna-roll.dim_512x512.png',
  'shrimp tempura roll': '/assets/generated/dish-shrimp-tempura-roll.dim_512x512.png',
  'miso soup': '/assets/generated/dish-miso-soup.dim_512x512.png',
  'edamame': '/assets/generated/dish-edamame.dim_512x512.png',
  // Sakthi Snacks dishes - original items
  'samosa (2 pcs)': '/assets/generated/dish-samosas.dim_512x512.png',
  'samosas': '/assets/generated/dish-samosas.dim_512x512.png',
  'samosa': '/assets/generated/dish-samosas.dim_512x512.png',
  'vada pav': '/assets/generated/dish-vada-pav.dim_512x512.png',
  'chole bhature': '/assets/generated/dish-chole-bhature.dim_512x512.png',
  // Sakthi Snacks - New items with corrected v2 assets
  'pakora plate': '/assets/generated/dish-sakthi-onion-pakoda.v2.dim_512x512.png',
  'chennaa masala': '/assets/generated/dish-chole-bhature.dim_512x512.png',
  'vegetable cutlets': '/assets/generated/dish-sakthi-bajji.v2.dim_512x512.png',
  'samosa chaat': '/assets/generated/dish-sakthi-bhel-puri.v2.dim_512x512.png',
  'vegetable puff': '/assets/generated/dish-samosas.dim_512x512.png',
  'curd vada': '/assets/generated/dish-vada.dim_512x512.png',
  'dahi puri': '/assets/generated/dish-sakthi-pani-puri.v2.dim_512x512.png',
  'pav bhaji': '/assets/generated/dish-vada-pav.dim_512x512.png',
  'vegetable sandwich': '/assets/generated/dish-generic.dim_512x512.png',
  'onion pakora': '/assets/generated/dish-sakthi-onion-pakoda.v2.dim_512x512.png',
  'mysore bonda': '/assets/generated/dish-sakthi-bajji.v2.dim_512x512.png',
  'vegetable momos (6 pcs)': '/assets/generated/dish-generic.dim_512x512.png',
  'vegetable momos': '/assets/generated/dish-generic.dim_512x512.png',
  'vegetable frankie roll': '/assets/generated/dish-vada-pav.dim_512x512.png',
  'jalebi': '/assets/generated/dish-generic.dim_512x512.png',
};

// Map of known restaurant names to their generated image filenames
const RESTAURANT_NAME_TO_IMAGE: Record<string, string> = {
  'chennai spice': '/assets/generated/restaurant-chennai-spice-cover.dim_1200x600.png',
  'tandoori treats': '/assets/generated/restaurant-north-indian-cover.dim_1200x600.png',
  'pizza palace': '/assets/generated/restaurant-pizza-palace-cover.dim_1200x600.png',
  'sushi central': '/assets/generated/restaurant-sushi-central-cover.dim_1200x600.png',
  'pasta house': '/assets/generated/restaurant-pasta-house-cover.dim_1200x600.png',
  'burger joint': '/assets/generated/restaurant-burger-joint-cover.dim_1200x600.png',
  'sakthi snacks': '/assets/generated/restaurant-sakthi-snacks-cover.dim_1200x600.png',
};

/**
 * Normalizes a name for image mapping by:
 * - Converting to lowercase
 * - Trimming whitespace
 * - Collapsing multiple spaces to single space
 * - Normalizing slashes (removing spaces around them)
 * - Removing parenthetical suffixes like "(3 pcs)"
 * - Removing common punctuation
 */
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .replace(/\s*\/\s*/g, '/') // Normalize slashes (remove spaces around them)
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
  // - Known bad Sushi Central patterns (california-salmon-roll.png, etc.)
  // - Known bad Chennai Spice patterns (sambar.png, coconut-chutney.png, etc. without .dim_ suffix)
  // - Known bad Sakthi Snacks patterns (samosa.png, vada-pav.png, etc. without .dim_ suffix)
  // - Old Sakthi Snacks non-v2 patterns that need to be replaced with v2 versions
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
    // Chennai Spice legacy patterns (without .dim_ suffix or wrong prefix)
    /sambar\.png(?!\.dim_)/,
    /coconut-chutney\.png(?!\.dim_)/,
    /nattu-kozhi-kulambu\.png(?!\.dim_)/,
    /nilgiri-chicken-korma\.png(?!\.dim_)/,
    /nanjil-nattu-chicken-curry\.png(?!\.dim_)/,
    /chicken-ghee-roast\.png(?!\.dim_)/,
    /elumbu-rasam\.png(?!\.dim_)/,
    /mutton-chukka\.png(?!\.dim_)/,
    /mutton-uppu-kari\.png(?!\.dim_)/,
    /mutton-nalli-fry\.png(?!\.dim_)/,
    /karimeen-pollichathu\.png(?!\.dim_)/,
    /malabar-fish-curry\.png(?!\.dim_)/,
    /nethili-65\.png(?!\.dim_)/,
    /fish-varutharacha\.png(?!\.dim_)/,
    /chepala-pulusu\.png(?!\.dim_)/,
    /prawn-ghee-roast\.png(?!\.dim_)/,
    /crab-masala\.png(?!\.dim_)/,
    /kanava-masala\.png(?!\.dim_)/,
    /fish-mappas\.png(?!\.dim_)/,
    /fish-kola-urundai\.png(?!\.dim_)/,
    /chemmeen-biryani\.png(?!\.dim_)/,
    /andhra-fish-fry\.png(?!\.dim_)/,
    // Legacy patterns with wrong prefix (dish-indian-*)
    /dish-indian-chepala-pulusu\.dim_512x512\.png/,
    /dish-indian-prawn-ghee-roast\.dim_512x512\.png/,
    /dish-indian-crab-masala-nandu-kuzhambu\.dim_512x512\.png/,
    /dish-indian-kanavakoonthal-masala\.dim_512x512\.png/,
    /dish-indian-fish-mappas\.dim_512x512\.png/,
    /dish-indian-fish-kola-urundai\.dim_512x512\.png/,
    /dish-indian-chemmeen-biryani\.dim_512x512\.png/,
    /dish-indian-andhra-fish-fry\.dim_512x512\.png/,
    /dish-indian-pani-puri\.dim_512x512\.png/,
    /dish-indian-bhel-puri\.dim_512x512\.png/,
    /dish-indian-kaalan\.dim_512x512\.png/,
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
    // Sushi Central incorrect patterns (without .dim_ suffix or wrong prefix)
    /california-salmon-roll\.png(?!\.dim_)/,
    /spicy-tuna-roll\.png(?!\.dim_)/,
    /shrimp-tempura-roll\.png(?!\.dim_)/,
    /miso-soup\.png(?!\.dim_)/,
    /edamame\.png(?!\.dim_)/,
    /dish-japanese-california-salmon-roll\.dim_512x512\.png/,
    /dish-japanese-spicy-tuna-roll\.dim_512x512\.png/,
    /dish-japanese-shrimp-tempura-roll\.dim_512x512\.png/,
    /dish-japanese-miso-soup\.dim_512x512\.png/,
    /dish-japanese-edamame\.dim_512x512\.png/,
    // Burger Joint incorrect patterns
    /cheeseburger\.png(?!\.dim_)/,
    /veggie-burger\.png(?!\.dim_)/,
    /vanilla-milkshake\.png(?!\.dim_)/,
    // Sakthi Snacks incorrect patterns (without .dim_ suffix or wrong prefix)
    /samosa\.png(?!\.dim_)/,
    /samosas\.png(?!\.dim_)/,
    /pani-puri-snack\.png(?!\.dim_)/,
    /vada-pav\.png(?!\.dim_)/,
    /chole-bhature\.png(?!\.dim_)/,
    /bhel-puri-snacks-generated\.dim_512x512\.png/,
    /pakora-snacks_generated\.dim_512x512\.png/,
    /chennamasala-snacks-generated\.dim_512x512\.png/,
    /veggiecutlets-snacks-generated\.dim_512x512\.png/,
    /samosa-chaat-snacks-generated\.dim_512x512\.png/,
    /vegpuff-snacks-generated\.dim_512x512\.png/,
    /vadacurd-snacks-generated\.dim_512x512\.png/,
    /dahipuri-snacks-generated\.dim_512x512\.png/,
    /pavbhaji-snacks-generated\.dim_512x512\.png/,
    /vegsandwich-snacks-generated\.dim_512x512\.png/,
    /onionpakora-snacks-generated\.dim_512x512\.png/,
    /bonda-snacks-generated\.dim_512x512\.png/,
    /veggie-momos-snacks-generated\.dim_512x512\.png/,
    /frankieroll-snacks-generated\.dim_512x512\.png/,
    /jalebi-snacks-generated\.dim_512x512\.png/,
    // Old Sakthi Snacks non-v2 patterns (need to be replaced with v2 versions)
    /dish-sakthi-pani-puri\.dim_512x512\.png/,
    /dish-sakthi-bhel-puri\.dim_512x512\.png/,
    /dish-sakthi-onion-pakoda\.dim_512x512\.png/,
    /dish-sakthi-bajji\.dim_512x512\.png/,
    /dish-sakthi-sundal\.dim_512x512\.png/,
    /dish-sakthi-murukku\.dim_512x512\.png/,
    // Restaurant cover legacy patterns
    /tandoori-treats\.png(?!\.dim_)/,
    /pizza-palace\.png(?!\.dim_)/,
    /sushi-central\.png(?!\.dim_)/,
    /pasta-house\.png(?!\.dim_)/,
    /burger-joint\.png(?!\.dim_)/,
    /restaurant-indian-chennai-spice\.png(?!\.dim_)/,
    /restaurant-indian-chennai-spice\.hdr\.clean\.png/,
    /restaurant-indian-chennai-spice\.hdr\.png/,
    /restaurant-japanese-sushi-central\.dim_1200x600\.png/,
    /restaurant-japanese-sushi-central\.hdr\.clean\.png/,
    /restaurant-japanese-sushi-central\.hdr\.png/,
    /restaurant-japanese-sushi-central\.png/,
    /restaurant-pizza-cover\.dim_1200x600\.png/,
    /restaurant-indian-sakthi-snacks\.png(?!\.dim_)/,
    /restaurant-indian-sakthi-snacks\.hdr\.clean\.png/,
    /restaurant-indian-sakthi-snacks\.hdr\.png/,
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
