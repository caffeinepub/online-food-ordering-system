import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";

module {
  type Actor = {
    restaurants : Map.Map<Nat, Restaurant>;
    menuItems : Map.Map<Nat, MenuItem>;
    orders : Map.Map<Nat, UserOrder>;
    userProfiles : Map.Map<Principal, UserProfile>;
    nextRestaurantId : Nat;
    nextMenuItemId : Nat;
    nextOrderId : Nat;
    nextOrderItemId : Nat;
  };
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
    userId : Principal.Principal;
    restaurantId : Nat;
    status : OrderStatus;
    createdAt : Int;
    updatedAt : Int;
    totalAmount : Nat;
  };
  type OrderStatus = {
    #pending;
    #confirmed;
    #preparing;
    #outForDelivery;
    #delivered;
    #cancelled;
  };
  type UserProfile = {
    name : Text;
  };

  // Migration logic: Only updates imageUrl for specific menuItemIds 46-53 if needed
  public func run(old : Actor) : Actor {
    let newMenuItems = old.menuItems.map<Nat, MenuItem, MenuItem>(
      func(_id, menuItem) {
        switch (menuItem.id) {
          case (46) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-chepala-pulusu"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-chepala-pulusu.dim_512x512.png" };
            };
          };
          case (47) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-prawn-ghee-roast"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-prawn-ghee-roast.dim_512x512.png" };
            };
          };
          case (48) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-crab-masala-nandu-kuzhambu"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-crab-masala-nandu-kuzhambu.dim_512x512.png" };
            };
          };
          case (49) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-kanavakoonthal-masala"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-kanavakoonthal-masala.dim_512x512.png" };
            };
          };
          case (50) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-fish-mappas"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-fish-mappas.dim_512x512.png" };
            };
          };
          case (51) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-fish-kola-urundai"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-fish-kola-urundai.dim_512x512.png" };
            };
          };
          case (52) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-chemmeen-biryani"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-chemmeen-biryani.dim_512x512.png" };
            };
          };
          case (53) {
            if (not menuItem.imageUrl.startsWith(#text("/assets/generated/dish-indian-andhra-fish-fry"))) {
              return { menuItem with imageUrl = "/assets/generated/dish-indian-andhra-fish-fry.dim_512x512.png" };
            };
          };
          case (_) {};
        };
        menuItem;
      }
    );

    // Return updated state.
    { old with menuItems = newMenuItems };
  };
};
