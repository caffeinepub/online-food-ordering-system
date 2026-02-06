import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MenuItem {
    id: bigint;
    name: string;
    description: string;
    restaurantId: bigint;
    imageUrl: string;
    price: bigint;
}
export interface OrderItem {
    id: bigint;
    orderId: bigint;
    quantity: bigint;
    price: bigint;
    menuItemId: bigint;
}
export interface CartItem {
    quantity: bigint;
    menuItemId: bigint;
}
export interface Restaurant {
    id: bigint;
    name: string;
    description: string;
    imageUrl: string;
}
export interface UserProfile {
    name: string;
}
export enum OrderStatus {
    preparing = "preparing",
    cancelled = "cancelled",
    pending = "pending",
    outForDelivery = "outForDelivery",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllOrderItems(_orderId: bigint): Promise<Array<OrderItem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOrderStatus(_orderId: bigint): Promise<OrderStatus | null>;
    getRestaurant(_id: bigint): Promise<Restaurant | null>;
    getRestaurantMenu(_restaurantId: bigint): Promise<Array<MenuItem>>;
    getUserProfile(_user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    listRestaurants(): Promise<Array<Restaurant>>;
    placeOrder(restaurantId: bigint, cartItems: Array<CartItem>): Promise<bigint>;
    saveCallerUserProfile(_profile: UserProfile): Promise<void>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
