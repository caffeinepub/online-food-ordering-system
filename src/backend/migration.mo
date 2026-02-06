import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

module {
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

  type Actor = {
    restaurants : Map.Map<Nat, Restaurant>;
    menuItems : Map.Map<Nat, MenuItem>;
  };

  let pizzaRestaurantMapping : [(Text, Text)] = [
    ("/assets/generated/pizza-palace.png", "/assets/generated/pizza-palace.dim_512x512.png"),
  ];

  let pizzaMenuMapping : [(Text, Text)] = [
    ("/assets/generated/margherita-pizza.png", "/assets/generated/margherita-pizza.dim_512x512.png"),
    ("/assets/generated/pepperoni-pizza.png", "/assets/generated/pepperoni-pizza.dim_512x512.png"),
    ("/assets/generated/hawaiian-pizza.png", "/assets/generated/hawaiian-pizza.dim_512x512.png"),
    ("/assets/generated/garlic-bread-pizza.png", "/assets/generated/garlic-bread.dim_512x512.png"),
    ("/assets/generated/salad-pizza.png", "/assets/generated/caesar-salad.dim_512x512.png"),
  ];

  public func updateImageUrl(imageUrl : Text, mapping : [(Text, Text)]) : Text {
    for ((oldPath, newPath) in mapping.values()) {
      if (imageUrl == oldPath) { return newPath };
    };
    imageUrl;
  };

  public func run(old : Actor) : Actor {
    let newRestaurants = old.restaurants.map<Nat, Restaurant, Restaurant>(
      func(_, restaurant) {
        if (restaurant.id == 2) {
          { restaurant with imageUrl = updateImageUrl(restaurant.imageUrl, pizzaRestaurantMapping) };
        } else {
          restaurant;
        };
      }
    );

    let newMenuItems = old.menuItems.map<Nat, MenuItem, MenuItem>(
      func(_, menuItem) {
        if (menuItem.restaurantId == 2) {
          { menuItem with imageUrl = updateImageUrl(menuItem.imageUrl, pizzaMenuMapping) };
        } else {
          menuItem;
        };
      }
    );

    {
      old with
      restaurants = newRestaurants;
      menuItems = newMenuItems;
    };
  };
};
