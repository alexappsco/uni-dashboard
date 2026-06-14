export const endpoints = {
  auth: {
    login: '/auth/otp-login',
    register: '/auth/register',
    verifyOtp: '/auth/verify-otp',
    refreshToken: '/auth/refresh-customer-token',
  },
  cart: {
    list: '/carts',
    addGuestCart: '/carts/add-guest-cart',
    addQuantity: '/carts/add-quantity',
    decreaseQuantity: '/carts/decrease-quantity',
    removeItem: (productVersionId: string) => `/carts/${productVersionId}`,
    editQuantity: '/carts/edit-quantity',
  },
  companies: {
    list: '/companies',
  },
  products: {
    list: '/products',
    single: (id: string) => `/products/${id}`,
    myProducts: '/products/my-products',
  },
  sections: {
    fetch: '/sections?SkipCount=0&MaxResultCount=100',
  },
  favourites: {
    list: '/favourites',
    add: (productId: string) => `/favourites/${productId}/add`,
    remove: (productId: string) => `/favourites/${productId}/remove`,
  },
  addresses: {
    list: '/addresses',
    update: (id: string) => `/addresses/${id}`,
    create: '/addresses',
    delete: (id: string) => `/addresses/${id}`,
    setDefault: (id: string) => `/addresses/${id}/set-default`,
  },
  cities: {
    list: '/cities',
  },
  newCart: {
    fetch: '/carts',
    removeItem: (productVersionId: string) => `/carts/${productVersionId}`,
  },
  orders: {
    submit: '/orders',
    list: '/orders',
    single: (id: string) => `/orders/${id}`,
    cancelOrder: (id: string) => `/orders/${id}/cancel`,
    removeItem: (orderId: string, productVersionId: string) =>
      `/orders/${orderId}/remove-item/${productVersionId}`,
    addQuantity: (id: string) => `/orders/${id}/add-quantity`,
    removeQuantity: (id: string) => `/orders/${id}/remove-quantity`,
    editQuantity: (id: string) => `/orders/${id}/edit-quantity`,
  },
  profile: {
    get: '/profile/me',
    update: '/profile/update',
    verifyOtp: '/profile/confirm-phone-change',
  },
  order: {
    products: (orderId: string) => `/products/orders/${orderId}`,
  },
  orderLink: {
    fetch: (linkCode: string) => `/order-links/${linkCode}`,
    confirm: (linkCode: string) => `/order-links/${linkCode}`,
    editQuantity: (orderId: string) => `/order-links/${orderId}/edit-quantity`,
    exportPdf:(id:string)=>`/orders/${id}/export-pdf`,
  },
  banners: {
    web: '/banners/web',
    mobile: '/banners/mobile',
  },
  settings: {
    get: '/settings',
  },
  pages: {
    get: (slug: string) => `/pages/${slug}`,
  },
  notifications: {
    list: '/notifications/my-notifications',
    markAsRead: (id: string) => `/notifications/${id}/mark-as-read`,
    markAllAsRead: '/notifications/mark-all-as-read',
  },
  packages: {
    list: '/store/packages',
    subscribe: (packageId: string) => `/store/subscribe/${packageId}`,
  },
};

