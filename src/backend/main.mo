import Map "mo:core/Map";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Order "mo:core/Order";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";
import Principal "mo:core/Principal";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Apply migration via with-clause

actor {
  // Authorization Mixin
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Data Types
  type Restaurant = {
    id : Nat;
    name : Text;
    description : Text;
    imageUrl : Text;
  };

  type MenuItem = {
    id : Nat;
    restaurantId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type UserOrder = {
    id : Nat;
    userId : Principal;
    restaurantId : Nat;
    status : OrderStatus;
    createdAt : Time.Time;
    updatedAt : Time.Time;
    totalAmount : Nat;
  };

  type OrderItem = {
    id : Nat;
    orderId : Nat;
    menuItemId : Nat;
    quantity : Nat;
    price : Nat;
  };

  module OrderItem {
    public func compare(orderItem1 : OrderItem, orderItem2 : OrderItem) : Order.Order {
      Int.compare(orderItem1.id, orderItem2.id);
    };
  };

  type OrderStatus = {
    #pending;
    #confirmed;
    #preparing;
    #outForDelivery;
    #delivered;
    #cancelled;
  };

  type CartItem = {
    menuItemId : Nat;
    quantity : Nat;
  };

  type UserProfile = {
    name : Text;
  };

  // Persistent State
  let restaurants = Map.empty<Nat, Restaurant>();
  let menuItems = Map.empty<Nat, MenuItem>();
  let orders = Map.empty<Nat, UserOrder>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  var nextRestaurantId = 8; // Next ID after seeded restaurants
  var nextMenuItemId = 61; // Next ID after seeded menu items
  var nextOrderId = 1;
  var nextOrderItemId = 1;

  // Seed Data
  // Indian
  restaurants.add(
    1,
    {
      id = 1;
      name = "Tandoori Treats";
      description = "Authentic North Indian cuisine for delivery.";
      imageUrl = "/assets/generated/tandoori-treats.png";
    },
  );
  // American - Pizza
  restaurants.add(
    2,
    {
      id = 2;
      name = "Pizza Palace";
      description = "Delicious pizzas and more!";
      imageUrl = "/assets/generated/pizza-palace.dim_512x512.png";
    },
  );
  // Japanese - Sushi
  restaurants.add(
    3,
    {
      id = 3;
      name = "Sushi Central";
      description = "Fresh sushi delivered to your door.";
      imageUrl = "/assets/generated/restaurant-japanese-sushi-central.dim_1200x600.png";
    },
  );
  // Italian - Pasta
  restaurants.add(
    4,
    {
      id = 4;
      name = "Pasta House";
      description = "Traditional handmade pasta and sauces.";
      imageUrl = "/assets/generated/pasta-house.png";
    },
  );
  // Burger Joint
  restaurants.add(
    5,
    {
      id = 5;
      name = "Burger Joint";
      description = "Classic American burgers and fries.";
      imageUrl = "/assets/generated/burger-joint.png";
    },
  );
  // South Indian / Tamil Nadu Restaurant
  restaurants.add(
    6,
    {
      id = 6;
      name = "Chennai Spice";
      description = "Authentic South Indian cuisine, specializing in Tamil Nadu flavors.";
      imageUrl = "/assets/generated/restaurant-indian-chennai-spice.dim_1200x600.png";
    },
  );
  // Sakthi Snacks - New South Indian Restaurant
  restaurants.add(
    7,
    {
      id = 7;
      name = "Sakthi Snacks";
      description = "Authentic South Indian snack bar specializing in vegetarian street food favorites. Reasonable prices, crispy delights, tangy chutneys!";
      imageUrl = "/assets/generated/restaurant-indian-sakthi-snacks.dim_1200x600.png";
    },
  );

  // Menu Items for each restaurant
  menuItems.add(
    1,
    {
      id = 1;
      restaurantId = 1;
      name = "Chicken Tikka Masala";
      description = "Creamy tomato gravy with tender chicken pieces.";
      price = 1500;
      imageUrl = "/assets/generated/chicken-tikka-masala.dim_512x512.png";
    },
  );
  menuItems.add(
    2,
    {
      id = 2;
      restaurantId = 1;
      name = "Paneer Makhani";
      description = "Soft cottage cheese cubes in butter-rich sauce.";
      price = 1200;
      imageUrl = "/assets/generated/paneer-makhani.dim_512x512.png";
    },
  );
  menuItems.add(
    3,
    {
      id = 3;
      restaurantId = 1;
      name = "Jeera Rice";
      description = "Basmati rice with roasted cumin flavor.";
      price = 800;
      imageUrl = "/assets/generated/jeera-rice.dim_512x512.png";
    },
  );
  menuItems.add(
    4,
    {
      id = 4;
      restaurantId = 1;
      name = "Butter Naan (2 pcs)";
      description = "Leavened bread cooked in tandoor with butter.";
      price = 350;
      imageUrl = "/assets/generated/butter-naan.dim_512x512.png";
    },
  );
  menuItems.add(
    5,
    {
      id = 5;
      restaurantId = 1;
      name = "Gajar Halwa (Dessert)";
      description = "Carrot pudding with nuts and cardamom.";
      price = 600;
      imageUrl = "/assets/generated/gajar-halwa.dim_512x512.png";
    },
  );
  menuItems.add(
    6,
    {
      id = 6;
      restaurantId = 2;
      name = "Margherita Pizza";
      description = "Classic pizza with tomato, mozzarella, basil.";
      price = 1100;
      imageUrl = "/assets/generated/margherita-pizza.dim_512x512.png";
    },
  );
  menuItems.add(
    7,
    {
      id = 7;
      restaurantId = 2;
      name = "Pepperoni Pizza";
      description = "Pepperoni, cheese, garlic-butter crust.";
      price = 1400;
      imageUrl = "/assets/generated/pepperoni-pizza.dim_512x512.png";
    },
  );
  menuItems.add(
    8,
    {
      id = 8;
      restaurantId = 2;
      name = "Hawaiian Pizza";
      description = "Ham, pineapple, cheese.";
      price = 1300;
      imageUrl = "/assets/generated/hawaiian-pizza.dim_512x512.png";
    },
  );
  menuItems.add(
    9,
    {
      id = 9;
      restaurantId = 2;
      name = "Garlic Breadsticks";
      description = "Crispy breadsticks with garlic parmesan butter.";
      price = 400;
      imageUrl = "/assets/generated/garlic-bread.dim_512x512.png";
    },
  );
  menuItems.add(
    10,
    {
      id = 10;
      restaurantId = 2;
      name = "Caesar Salad";
      description = "Romaine lettuce, caesar dressing, croutons.";
      price = 650;
      imageUrl = "/assets/generated/caesar-salad.dim_512x512.png";
    },
  );
  menuItems.add(
    11,
    {
      id = 11;
      restaurantId = 3;
      name = "California Salmon Roll";
      description = "Salmon, avocado, cucumber, sushi rice.";
      price = 1100;
      imageUrl = "/assets/generated/dish-japanese-california-salmon-roll.dim_512x512.png";
    },
  );
  menuItems.add(
    12,
    {
      id = 12;
      restaurantId = 3;
      name = "Spicy Tuna Roll";
      description = "Tuna, sriracha, cucumber, sushi rice.";
      price = 1200;
      imageUrl = "/assets/generated/dish-japanese-spicy-tuna-roll.dim_512x512.png";
    },
  );
  menuItems.add(
    13,
    {
      id = 13;
      restaurantId = 3;
      name = "Shrimp Tempura Roll";
      description = "Tempura fried shrimp, avocado, sushi rice.";
      price = 950;
      imageUrl = "/assets/generated/dish-japanese-shrimp-tempura-roll.dim_512x512.png";
    },
  );
  menuItems.add(
    14,
    {
      id = 14;
      restaurantId = 3;
      name = "Miso Soup";
      description = "Soup with tofu, nori, and spring onions.";
      price = 400;
      imageUrl = "/assets/generated/dish-japanese-miso-soup.dim_512x512.png";
    },
  );
  menuItems.add(
    15,
    {
      id = 15;
      restaurantId = 3;
      name = "Edamame";
      description = "Steamed soybeans with sea salt.";
      price = 350;
      imageUrl = "/assets/generated/dish-japanese-edamame.dim_512x512.png";
    },
  );
  menuItems.add(
    16,
    {
      id = 16;
      restaurantId = 4;
      name = "Fettucine Alfredo";
      description = "Creamy garlic cheese sauce with fettucine.";
      price = 1000;
      imageUrl = "/assets/generated/fettucine-alfredo.png";
    },
  );
  menuItems.add(
    17,
    {
      id = 17;
      restaurantId = 4;
      name = "Penne Arrabiata";
      description = "Spicy tomato sauce, penne pasta.";
      price = 900;
      imageUrl = "/assets/generated/penne-arrabiata.png";
    },
  );
  menuItems.add(
    18,
    {
      id = 18;
      restaurantId = 4;
      name = "Chicken Parmigiana";
      description = "Breaded chicken, pasta, tomato cheese sauce.";
      price = 1350;
      imageUrl = "/assets/generated/chicken-parmigiana.png";
    },
  );
  menuItems.add(
    19,
    {
      id = 19;
      restaurantId = 4;
      name = "Garlic Bread (3 pcs)";
      description = "Oven roasted garlic bread.";
      price = 450;
      imageUrl = "/assets/generated/garlic-bread-pasta.png";
    },
  );
  menuItems.add(
    20,
    {
      id = 20;
      restaurantId = 5;
      name = "Cheeseburger";
      description = "Grilled beef patty, cheese, fries.";
      price = 1000;
      imageUrl = "/assets/generated/cheeseburger.png";
    },
  );
  menuItems.add(
    21,
    {
      id = 21;
      restaurantId = 5;
      name = "Veggie Burger";
      description = "Plant-based patty, lettuce, fries.";
      price = 900;
      imageUrl = "/assets/generated/veggie-burger.png";
    },
  );
  menuItems.add(
    22,
    {
      id = 22;
      restaurantId = 5;
      name = "Vanilla Milkshake";
      description = "Classic vanilla ice cream shake.";
      price = 400;
      imageUrl = "/assets/generated/vanilla-milkshake.png";
    },
  );
  menuItems.add(
    23,
    {
      id = 23;
      restaurantId = 6;
      name = "Dosa";
      description = "Crispy fermented rice and lentil crepe.";
      price = 200;
      imageUrl = "/assets/generated/dish-indian-dosa.dim_512x512.png";
    },
  );
  menuItems.add(
    24,
    {
      id = 24;
      restaurantId = 6;
      name = "Vada";
      description = "Savoury fried lentil donuts.";
      price = 250;
      imageUrl = "/assets/generated/dish-indian-vada.dim_512x512.png";
    },
  );
  menuItems.add(
    25,
    {
      id = 25;
      restaurantId = 6;
      name = "Idly";
      description = "Steamed rice cakes served with sambar.";
      price = 200;
      imageUrl = "/assets/generated/dish-indian-idly.dim_512x512.png";
    },
  );
  menuItems.add(
    26,
    {
      id = 26;
      restaurantId = 6;
      name = "Sambar";
      description = "Lentil-based vegetable stew.";
      price = 250;
      imageUrl = "/assets/generated/sambar.png";
    },
  );
  menuItems.add(
    27,
    {
      id = 27;
      restaurantId = 6;
      name = "Coconut Chutney";
      description = "Condiment made with coconut and spices.";
      price = 100;
      imageUrl = "/assets/generated/coconut-chutney.png";
    },
  );
  menuItems.add(
    28,
    {
      id = 28;
      restaurantId = 6;
      name = "Vegetarian Meals";
      description = "South Indian style rice with assorted vegetables and accompaniments.";
      price = 600;
      imageUrl = "/assets/generated/dish-indian-vegetarian-meals.dim_512x512.png";
    },
  );
  menuItems.add(
    29,
    {
      id = 29;
      restaurantId = 6;
      name = "Non-Veg Meals";
      description = "Rice, vegetables, and non-veg curry, side dishes.";
      price = 800;
      imageUrl = "/assets/generated/dish-indian-non-veg-meals.dim_512x512.png";
    },
  );
  menuItems.add(
    30,
    {
      id = 30;
      restaurantId = 6;
      name = "Chicken Chettinad";
      description = "Spicy Tamil chicken curry with coconut and spices.";
      price = 700;
      imageUrl = "/assets/generated/dish-indian-chicken-chettinad.dim_512x512.png";
    },
  );
  menuItems.add(
    31,
    {
      id = 31;
      restaurantId = 6;
      name = "Nattu Kozhi Kulambu";
      description = "Country chicken curry.";
      price = 900;
      imageUrl = "/assets/generated/nattu-kozhi-kulambu.png";
    },
  );
  menuItems.add(
    32,
    {
      id = 32;
      restaurantId = 6;
      name = "Nilgiri Chicken Korma";
      description = "Green masala chicken curry.";
      price = 800;
      imageUrl = "/assets/generated/nilgiri-chicken-korma.png";
    },
  );
  menuItems.add(
    33,
    {
      id = 33;
      restaurantId = 6;
      name = "Nanjil Nattu Chicken Curry";
      description = "Traditional Tamil chicken curry.";
      price = 1000;
      imageUrl = "/assets/generated/nanjil-nattu-chicken-curry.png";
    },
  );
  menuItems.add(
    34,
    {
      id = 34;
      restaurantId = 6;
      name = "Chicken 65";
      description = "Deep-fried spicy chicken appetizer.";
      price = 500;
      imageUrl = "/assets/generated/dish-indian-chicken-65.dim_512x512.png";
    },
  );
  menuItems.add(
    35,
    {
      id = 35;
      restaurantId = 6;
      name = "Pepper Chicken (Milagu Varuval)";
      description = "Pepper-spiced chicken dish.";
      price = 750;
      imageUrl = "/assets/generated/dish-indian-pepper-chicken-milagu-varuval.dim_512x512.png";
    },
  );
  menuItems.add(
    36,
    {
      id = 36;
      restaurantId = 6;
      name = "Chicken Ghee Roast";
      description = "Flavorful chicken roasted in clarified butter.";
      price = 1100;
      imageUrl = "/assets/generated/chicken-ghee-roast.png";
    },
  );
  menuItems.add(
    37,
    {
      id = 37;
      restaurantId = 6;
      name = "Chettinad Mutton Kuzhambu";
      description = "Tamil-style spicy mutton curry.";
      price = 950;
      imageUrl = "/assets/generated/dish-indian-chettinad-mutton-kuzhambu.dim_512x512.png";
    },
  );
  menuItems.add(
    39,
    {
      id = 39;
      restaurantId = 6;
      name = "Mutton Chukka (Varuval)";
      description = "Dry-fried mutton dish.";
      price = 1150;
      imageUrl = "/assets/generated/mutton-chukka.png";
    },
  );
  menuItems.add(
    40,
    {
      id = 40;
      restaurantId = 6;
      name = "Mutton Uppu Kari";
      description = "Salt-spiced mutton dish from the Chettinad region.";
      price = 850;
      imageUrl = "/assets/generated/mutton-uppu-kari.png";
    },
  );
  menuItems.add(
    41,
    {
      id = 41;
      restaurantId = 6;
      name = "Mutton Nalli Fry";
      description = "Roasted goat bone with marrow dish.";
      price = 1200;
      imageUrl = "/assets/generated/mutton-nalli-fry.png";
    },
  );
  menuItems.add(
    42,
    {
      id = 42;
      restaurantId = 6;
      name = "Karimeen Pollichathu";
      description = "Pearl spot fish, marinated and cooked in banana leaf.";
      price = 1500;
      imageUrl = "/assets/generated/karimeen-pollichathu.png";
    },
  );
  menuItems.add(
    43,
    {
      id = 43;
      restaurantId = 6;
      name = "Malabar Fish Curry/Meen Curry";
      description = "Kerala style coconut-based fish curry.";
      price = 1000;
      imageUrl = "/assets/generated/malabar-fish-curry.png";
    },
  );
  menuItems.add(
    44,
    {
      id = 44;
      restaurantId = 6;
      name = "Nethili 65";
      description = "Fried anchovies, hot and spicy.";
      price = 500;
      imageUrl = "/assets/generated/nethili-65.png";
    },
  );
  menuItems.add(
    45,
    {
      id = 45;
      restaurantId = 6;
      name = "Fish Varutharacha";
      description = "Fish curry with roasted coconut paste.";
      price = 900;
      imageUrl = "/assets/generated/fish-varutharacha.png";
    },
  );
  menuItems.add(
    46,
    {
      id = 46;
      restaurantId = 6;
      name = "Chepala Pulusu";
      description = "Andhra style tangy fish curry.";
      price = 1100;
      imageUrl = "/assets/generated/dish-indian-chepala-pulusu.dim_512x512.png";
    },
  );
  menuItems.add(
    47,
    {
      id = 47;
      restaurantId = 6;
      name = "Prawn Ghee Roast";
      description = "Prawns roasted in ghee and spices.";
      price = 1300;
      imageUrl = "/assets/generated/dish-indian-prawn-ghee-roast.dim_512x512.png";
    },
  );
  menuItems.add(
    48,
    {
      id = 48;
      restaurantId = 6;
      name = "Crab Masala/Nandu Kuzhambu";
      description = "Spicy crab curry with aromatic spices.";
      price = 1350;
      imageUrl = "/assets/generated/dish-indian-crab-masala-nandu-kuzhambu.dim_512x512.png";
    },
  );
  menuItems.add(
    49,
    {
      id = 49;
      restaurantId = 6;
      name = "Kanava/Koonthal Masala";
      description = "Squid masala dish with rich flavors.";
      price = 900;
      imageUrl = "/assets/generated/dish-indian-kanavakoonthal-masala.dim_512x512.png";
    },
  );
  menuItems.add(
    50,
    {
      id = 50;
      restaurantId = 6;
      name = "Fish Mappas";
      description = "Kerala style fish coconut curry with coconut milk.";
      price = 1000;
      imageUrl = "/assets/generated/dish-indian-fish-mappas.dim_512x512.png";
    },
  );
  menuItems.add(
    51,
    {
      id = 51;
      restaurantId = 6;
      name = "Fish Kola Urundai";
      description = "Fish meatballs, deep-fried.";
      price = 400;
      imageUrl = "/assets/generated/dish-indian-fish-kola-urundai.dim_512x512.png";
    },
  );
  menuItems.add(
    52,
    {
      id = 52;
      restaurantId = 6;
      name = "Chemmeen Biryani";
      description = "Prawn biryani with South Indian spices.";
      price = 1400;
      imageUrl = "/assets/generated/dish-indian-chemmeen-biryani.dim_512x512.png";
    },
  );
  menuItems.add(
    53,
    {
      id = 53;
      restaurantId = 6;
      name = "Andhra Fish Fry";
      description = "Fish marinated in Andhra spices and fried.";
      price = 950;
      imageUrl = "/assets/generated/dish-indian-andhra-fish-fry.dim_512x512.png";
    },
  );
  menuItems.add(
    54,
    {
      id = 54;
      restaurantId = 6;
      name = "Pani Puri";
      description = "Crispy puris filled with spicy and tangy flavored water, chickpeas, and potatoes. A popular Indian street snack.";
      price = 200;
      imageUrl = "/assets/generated/dish-indian-pani-puri.dim_512x512.png";
    },
  );
  menuItems.add(
    55,
    {
      id = 55;
      restaurantId = 6;
      name = "Bhel Puri";
      description = "A savory snack made with puffed rice, vegetables, and tangy tamarind sauce. A classic Indian chaat.";
      price = 250;
      imageUrl = "/assets/generated/dish-indian-bhel-puri.dim_512x512.png";
    },
  );
  menuItems.add(
    56,
    {
      id = 56;
      restaurantId = 6;
      name = "Kaalan";
      description = "A Tamil Nadu street food made with deep-fried mushrooms in a spicy, tangy gravy. Relished as an evening snack.";
      price = 180;
      imageUrl = "/assets/generated/dish-indian-kaalan.dim_512x512.png";
    },
  );
  // Sakthi Snacks - Pure Veg Menu Items
  menuItems.add(
    57,
    {
      id = 57;
      restaurantId = 7;
      name = "Samosa (2 pcs)";
      description = "Crispy deep-fried pastry with savory potato and spice filling. Served with tangy chutney.";
      price = 120;
      imageUrl = "/assets/generated/samosa.dim_512x512.png";
    },
  );
  menuItems.add(
    58,
    {
      id = 58;
      restaurantId = 7;
      name = "Pani Puri";
      description = "Crispy hollow puris filled with spiced potato, served with tangy flavored water and chutneys.";
      price = 80;
      imageUrl = "/assets/generated/pani-puri-snack.dim_512x512.png";
    },
  );
  menuItems.add(
    59,
    {
      id = 59;
      restaurantId = 7;
      name = "Vada Pav";
      description = "Spicy potato vada stuffed into a pav (bread roll), served with chutneys and fried green chilies.";
      price = 80;
      imageUrl = "/assets/generated/vada-pav.dim_512x512.png";
    },
  );
  menuItems.add(
    60,
    {
      id = 60;
      restaurantId = 7;
      name = "Chole Bhature";
      description = "Deep-fried bread (bhature) served with spicy chickpea curry (chole).";
      price = 200;
      imageUrl = "/assets/generated/chole-bhature.dim_512x512.png";
    },
  );

  // Public Queries
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(_user : Principal) : async ?UserProfile {
    if (_user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(_user);
  };

  public query func listRestaurants() : async [Restaurant] {
    restaurants.values().toArray();
  };

  public query func getRestaurant(_id : Nat) : async ?Restaurant {
    restaurants.get(_id);
  };

  public query func getRestaurantMenu(_restaurantId : Nat) : async [MenuItem] {
    menuItems.values().toArray().filter(func(item) { item.restaurantId == _restaurantId });
  };

  // Order Status Functions
  public query ({ caller }) func getOrderStatus(_orderId : Nat) : async ?OrderStatus {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access orders");
    };
    let order = switch (orders.get(_orderId)) {
      case (null) { return null };
      case (?o) { o };
    };
    if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own orders");
    };
    ?order.status;
  };

  public query ({ caller }) func getAllOrderItems(_orderId : Nat) : async [OrderItem] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access orders");
    };
    let order = switch (orders.get(_orderId)) {
      case (null) { return ([] : [OrderItem]) };
      case (?o) { o };
    };
    if (order.userId != caller and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only access your own orders");
    };
    let orderItems = Map.empty<Nat, OrderItem>();
    orderItems.values().toArray().sort();
  };

  // Shared Functions
  public shared ({ caller }) func saveCallerUserProfile(_profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, _profile);
  };

  public shared ({ caller }) func placeOrder(restaurantId : Nat, cartItems : [CartItem]) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can place orders");
    };

    if (restaurantId == 0 or cartItems.size() == 0) {
      Runtime.trap("Restaurant is required and cart cannot be empty.");
    };

    let restaurant = switch (restaurants.get(restaurantId)) {
      case (null) { Runtime.trap("Restaurant not found") };
      case (?r) { r };
    };

    var totalAmount = 0;
    for (cartItem in cartItems.values()) {
      let menuItem = switch (menuItems.get(cartItem.menuItemId)) {
        case (null) { Runtime.trap("Menu item not found") };
        case (?item) { item };
      };
      totalAmount += menuItem.price * cartItem.quantity;
    };

    let newOrderId = nextOrderId;
    let order = {
      id = newOrderId;
      userId = caller;
      restaurantId;
      status = #pending;
      createdAt = Time.now();
      updatedAt = Time.now();
      totalAmount;
    };
    orders.add(newOrderId, order);

    for (cartItem in cartItems.values()) {
      let menuItem = switch (menuItems.get(cartItem.menuItemId)) {
        case (null) { Runtime.trap("Menu item not found") };
        case (?item) { item };
      };
      let orderItem = {
        id = nextOrderItemId;
        orderId = newOrderId;
        menuItemId = cartItem.menuItemId;
        quantity = cartItem.quantity;
        price = menuItem.price;
      };
      nextOrderItemId += 1;
    };

    nextOrderId += 1;
    newOrderId;
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Nat, status : OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let order = switch (orders.get(orderId)) {
      case (null) { Runtime.trap("Order not found") };
      case (?o) { o };
    };
    let updatedOrder = {
      id = order.id;
      userId = order.userId;
      restaurantId = order.restaurantId;
      status;
      createdAt = order.createdAt;
      updatedAt = Time.now();
      totalAmount = order.totalAmount;
    };
    orders.add(orderId, updatedOrder);
  };
};
