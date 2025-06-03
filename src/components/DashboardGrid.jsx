import StatCard from "../components/ui/card";
import {
  GraduationCap,
  UserCheck,
  UserX,
  Users,
  Receipt,
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  ArrowRight,
  FileText,
  Calendar,
} from "lucide-react";

export default function DashboardGrid() {
  const dashboardCards = [
    {
      title: "Total Student",
      value: "5",
      color: "bg-teal-500",
      icon: GraduationCap,
    },
    {
      title: "Active Student",
      value: "5",
      color: "bg-green-500",
      icon: UserCheck,
    },
    {
      title: "Alumni Student",
      value: "0",
      color: "bg-yellow-500",
      icon: UserX,
    },
    { title: "Total Staff", value: "1", color: "bg-cyan-500", icon: Users },
    {
      title: "Active Staff",
      value: "1",
      color: "bg-green-600",
      icon: UserCheck,
    },
    { title: "Alumni Staff", value: "0", color: "bg-yellow-600", icon: UserX },
    {
      title: "Unpaid Invoices",
      value: "5",
      color: "bg-teal-500",
      icon: Receipt,
    },
    {
      title: "Unpaid Amount",
      value: "20500",
      color: "bg-yellow-500",
      icon: DollarSign,
    },
    {
      title: "Income Today",
      value: "0",
      color: "bg-green-500",
      icon: TrendingUp,
    },
    {
      title: "Expense Today",
      value: "0",
      color: "bg-red-500",
      icon: TrendingDown,
    },
    {
      title: "Profit Today",
      value: "0",
      color: "bg-cyan-500",
      icon: PiggyBank,
    },
    {
      title: "Income this Month",
      value: "0",
      color: "bg-green-600",
      icon: TrendingUp,
    },
    {
      title: "Expense of month",
      value: "0",
      color: "bg-red-500",
      icon: FileText,
    },
    {
      title: "Profit of Month",
      value: "0",
      color: "bg-teal-500",
      icon: TrendingUp,
    },
    {
      title: "Income Of Year",
      value: "0",
      color: "bg-green-500",
      icon: DollarSign,
    },
    {
      title: "Expense Of Year",
      value: "0",
      color: "bg-red-500",
      icon: FileText,
    },
    {
      title: "Profit Of Year",
      value: "0",
      color: "bg-teal-500",
      icon: PiggyBank,
    },
    {
      title: "Current Session",
      value: "2025",
      color: "bg-yellow-500",
      icon: Calendar,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2 mt-3 xl:grid-cols-6 gap-4">
        {dashboardCards.map((card, index) => (
          <StatCard
            key={index}
            title={card.title}
            value={card.value}
            color={card.color}
            icon={card.icon}
          />
        ))}
      </div>
    </>
  );
}
