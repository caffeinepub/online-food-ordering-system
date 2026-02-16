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

  var nextRestaurantId = 8;
  var nextMenuItemId = 76;
  var nextOrderId = 1;
  var nextOrderItemId = 1;

  // Restaurants and menu items seed data (only Sakthi Snacks menu items shown here for brevity)
  restaurants.add(
    7,
    {
      id = 7;
      name = "Sakthi Snacks";
      description = "Authentic South Indian snack bar specializing in vegetarian street food favorites. Reasonable prices, crispy delights, tangy chutneys!";
      imageUrl = "/assets/generated/restaurant-indian-sakthi-snacks.dim_1200x600.png";
    },
  );

  menuItems.add(
    70,
    {
      id = 70;
      restaurantId = 7;
      name = "Vegetable Sandwich";
      description = "Classic snack loaded with fresh tomatoes, cucumber, carrots, lettuce, and a vegetarian spread.";
      price = 60;
      imageUrl = "/assets/generated/vegsandwich-snacks-generated.dim_512x512.png";
    },
  );

  menuItems.add(
    73,
    {
      id = 73;
      restaurantId = 7;
      name = "Vegetable Momos (6 pcs)";
      description = "Dumplings filled with seasoned vegetable stuffing. A tasty vegetarian treat.";
      price = 120;
      imageUrl = "/assets/generated/veggie-momos-snacks-generated.dim_512x512.png";
    },
  );

  menuItems.add(
    74,
    {
      id = 74;
      restaurantId = 7;
      name = "Vegetable Frankie Roll";
      description = "Roti wrap filled with spiced mixed vegetables and tamarind chutney. 100% vegetarian & spicy.";
      price = 160;
      imageUrl = "/assets/generated/frankieroll-snacks-generated.dim_512x512.png";
    },
  );

  menuItems.add(
    75,
    {
      id = 75;
      restaurantId = 7;
      name = "Jalebi";
      description = "Crispy deep-fried Indian sweet dish, soaked in saffron sugar syrup. 100% vegetarian and gluten free.";
      price = 80;
      imageUrl = "/assets/generated/jalebi-snacks-generated.dim_512x512.png";
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
