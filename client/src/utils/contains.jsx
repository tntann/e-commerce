import path from "./path";
import icons from "./icons";

export const navbar = [
  {
    id: 1,
    value: "HOME",
    path: `/${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `/${path.PRODUCTS}`,
  },
  {
    id: 3,
    value: "OUR SERVICES",
    path: `/${path.OUR_SERVICES}`,
  },
  {
    id: 4,
    value: "NEWS",
    path: `/${path.NEWS}`,
  },
  {
    id: 5,
    value: "FAQs",
    path: `/${path.FAQS}`,
  },
];

const { BsShieldShaded, ImTruck, AiFillGift, FaReply, FaTty } = icons;
export const productExtrainfo = [
  {
    id: 1,
    title: "Guarantee",
    sub: "Quality Checked",
    icons: <BsShieldShaded />,
  },
  {
    id: 2,
    title: "Free Shipping",
    sub: "Free On All Products",
    icons: <ImTruck />,
  },
  {
    id: 3,
    title: "Special Gift Cards",
    sub: "Special Gift Cards",
    icons: <AiFillGift />,
  },
  {
    id: 4,
    title: "Free Return",
    sub: "Within 7 Days",
    icons: <FaReply />,
  },
  {
    id: 5,
    title: "Consultancy",
    sub: "Lifetime 24/7/356",
    icons: <FaTty />,
  },
];

export const productInfoTabs = [
  {
    id: 1,
    name: "DESCRIPTION",
    content: `Technology: GSM / HSPA / LTE
    Dimensions: 144.6 x 69.2 x 7.3 mm
    Weight: 129 g
    Display: IPS LCD 5.15 inches
    Resolution: 1080 x 1920
    OS: Android OS, v6.0 (Marshmallow)
    Chipset: Snapdragon 820
    CPU: Quad-core
    Internal: 32GB/64GB/128GB
    Camera: 16 MP, f/2.0 - 4 MP, f/2.0`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `WARRANTY INFORMATION
    LIMITED WARRANTIES
    Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
    
    Frames Used In Upholstered and Leather Products
    Limited Lifetime Warranty
    A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`,
  },
  {
    id: 3,
    name: "ELIVERY",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `PURCHASING & DELIVERY
    Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
    Picking up at the store
    Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
    Delivery`,
  },
];

export const colors = [
  "black",
  "white",
  "gray",
  "blue",
  "purple",
  "brown",
  "pink",
  "yellow",
  "green",
  "red",
];

export const sorts = [
  {
    id: "1",
    value: "-sold",
    text: "Best selling",
  },
  {
    id: "2",
    value: "title",
    text: "Alphabetically, A-Z",
  },
  {
    id: "3",
    value: "-title",
    text: "Alphabetically, Z-A",
  },
  {
    id: "4",
    value: "price",
    text: "Price, low to high",
  },
  {
    id: "5",
    value: "-price",
    text: "Price, high to low",
  },
  {
    id: "6",
    value: "createdAt",
    text: "Date, old to new",
  },
  {
    id: "7",
    value: "-createdAt",
    text: "Date, new to old",
  },
];

export const voteOptions = [
  {
    id: "1",
    text: "Terible",
  },
  {
    id: "2",
    text: "Bad",
  },
  {
    id: "3",
    text: "Normal",
  },
  {
    id: "4",
    text: "Good",
  },
  {
    id: "5",
    text: "Great",
  },
];

const { MdOutlineDashboard, LuUsers, FiShoppingBag, RiBillLine } = icons;
export const adminSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <LuUsers size={20} />,
  },
  {
    id: 3,
    type: "PARENT",
    text: "Manage products",
    icon: <FiShoppingBag size={20} />,
    submenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
      },
      {
        text: "Manage products",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Manage orders",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillLine size={20} />,
  },
];

export const roles = [
  {
    code: 1,
    value: "Admin",
  },
  {
    code: 2,
    value: "User",
  },
];

export const blockStatus = [
  {
    code: true,
    value: "Blocked",
  },
  {
    code: false,
    value: "Active",
  },
];
