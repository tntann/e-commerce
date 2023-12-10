const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS__CATEGORY: ":category",
  PRODUCT_DETAIL__CATEGORY__PID__TITLE: ":category/:pid/:title",
  NEWS: "news",
  OUR_SERVICES: "services",
  FAQS: "faqs",
  FINAL_REGISTER: "finalregister/:status",
  RESET_PASSWORD: "reset-password/:token",
  DETAIL_CART: "my-cart",
  CHECKOUT: "checkout",
  PRODUCTS: "products",

  // Admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_PRODUCTS: "manage-products",
  MANAGE_ORDER: "manage-order",
  CREATE_PRODUCTS: "create-products",

  // User
  USER: "user",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  HISTORY: "buy-history",
  WISHLIST: "wishlist",
};

export default path;
