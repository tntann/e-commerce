import path from "./path";
import icons from "./icons";
import { FiHeart } from "react-icons/fi";

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
  // {
  //   id: 4,
  //   value: "BLOGS",
  //   path: `/${path.BLOGS}`,
  // },
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
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    id: 2,
    name: "WARRANTY",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    id: 3,
    name: "ELIVERY",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
  },
  {
    id: 4,
    name: "PAYMENT",
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
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

const { MdOutlineDashboard, LuUsers, FiShoppingBag, RiBillLine, BiNews } =
  icons;
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
  {
    id: 5,
    type: "PARENT",
    text: "Manage news",
    icon: <BiNews size={20} />,
    submenu: [
      {
        text: "Create news",
        path: `/${path.ADMIN}/${path.CREATE_BLOG}`,
      },
      {
        text: "Manage news",
        path: `/${path.ADMIN}/${path.MANAGE_BLOGS}`,
      },
    ],
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

export const userSidebar = [
  {
    id: 1,
    type: "SINGLE",
    text: "Information",
    path: `/${path.USER}/${path.PERSONAL}`,
    icon: <MdOutlineDashboard size={20} />,
  },
  {
    id: 2,
    type: "SINGLE",
    text: "My cart",
    path: `/${path.USER}/${path.MY_CART}`,
    icon: <FiShoppingBag size={20} />,
  },
  {
    id: 3,
    type: "SINGLE",
    text: "Purchase history",
    path: `/${path.USER}/${path.HISTORY}`,
    icon: <RiBillLine size={20} />,
  },
  {
    id: 4,
    type: "SINGLE",
    text: "Favorite products",
    path: `/${path.USER}/${path.WISHLIST}`,
    icon: <FiHeart size={20} />,
  },
];

export const statusOrders = [
  {
    label: "Canceled",
    value: "Canceled",
  },
  {
    label: "Pending",
    value: "Pending",
  },
  {
    label: "Succeed",
    value: "Succeed",
  },
];
