import { HomeIcon, FileTextIcon, ReceiptIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import ReceiptTab from "./components/ReceiptTab.jsx";

export const navItems = [
  {
    title: "หน้าหลัก",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "ใบเสร็จรับเงิน",
    to: "/receipt",
    icon: <ReceiptIcon className="h-4 w-4" />,
    page: <ReceiptTab />,
  },
];