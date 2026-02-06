import Map "mo:core/Map";
import Text "mo:core/Text";

module {
  type OldMenuItem = {
    id : Nat;
    restaurantId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type OldActor = {
    menuItems : Map.Map<Nat, OldMenuItem>;
  };

  type NewMenuItem = {
    id : Nat;
    restaurantId : Nat;
    name : Text;
    description : Text;
    price : Nat;
    imageUrl : Text;
  };

  type NewActor = {
    menuItems : Map.Map<Nat, NewMenuItem>;
  };

  public func run(old : OldActor) : NewActor {
    let newMenuItems = old.menuItems.map<Nat, OldMenuItem, NewMenuItem>(
      func(_id, menuItem) {
        switch (menuItem.restaurantId, menuItem.name) {
          // Fix South Indian item urls
          case (6, "Dosa") { { menuItem with imageUrl = "/assets/generated/dim_dosa.png" } };
          case (6, "Idly") { { menuItem with imageUrl = "/assets/generated/dim_idly.png" } };
          case (6, "Vegetarian Meals") {
            { menuItem with imageUrl = "/assets/generated/dim_vegetarian_meals.png" };
          };
          case (6, "Vada") { { menuItem with imageUrl = "/assets/generated/dim_vada.png" } };
          case (6, "Non-Veg Meals") {
            { menuItem with imageUrl = "/assets/generated/dim_non_veg_meals.png" };
          };
          case (6, "Chicken Chettinad") {
            { menuItem with imageUrl = "/assets/generated/dim_chicken_chettinad.png" };
          };
          case (6, "Chicken 65") {
            { menuItem with imageUrl = "/assets/generated/dim_chicken_65.png" };
          };
          case (6, "Pepper Chicken (Milagu Varuval)") {
            { menuItem with imageUrl = "/assets/generated/dim_pepper_chicken_varuval.png" };
          };
          case (6, "Chettinad Mutton Kuzhambu") {
            { menuItem with imageUrl = "/assets/generated/dim_chettinad_mutton_kuzhambu.png" };
          };
          case (_, _) { menuItem };
        };
      }
    );
    { menuItems = newMenuItems };
  };
};
