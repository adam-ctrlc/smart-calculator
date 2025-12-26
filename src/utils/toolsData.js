export const popularTools = [
  {
    href: "/health/bmi",
    icon: "monitor_weight",
    title: "BMI Calculator",
    category: "Health & Fitness",
    color: "blue",
  },
  {
    href: "/finance/currency",
    icon: "currency_exchange",
    title: "Currency Converter",
    category: "Finance",
    color: "green",
  },
  {
    href: "/math/standard",
    icon: "calculate",
    title: "Scientific Calc",
    category: "Math & Academic",
    color: "purple",
  },
  {
    href: "/datetime/difference",
    icon: "calendar_month",
    title: "Date Difference",
    category: "Date & Time",
    color: "orange",
  },
];

export const categories = [
  {
    title: "Health & Fitness",
    icon: "fitness_center",
    iconColor: "text-primary",
    tools: [
      { href: "/health/bmi", icon: "monitor_weight", label: "BMI Calculator" },
      {
        href: "/health/calorie",
        icon: "local_fire_department",
        label: "Calorie Counter",
      },
      { href: "/health/water", icon: "water_drop", label: "Water Intake" },
      { href: "/health/heart", icon: "favorite", label: "Heart Rate" },
    ],
  },
  {
    title: "Finance",
    icon: "payments",
    iconColor: "text-green-600",
    tools: [
      {
        href: "/finance/mortgage",
        icon: "real_estate_agent",
        label: "Mortgage Calc",
      },
      {
        href: "/finance/compound",
        icon: "trending_up",
        label: "Compound Interest",
      },
      {
        href: "/finance/loan",
        icon: "account_balance",
        label: "Loan Amortization",
      },
      {
        href: "/finance/currency",
        icon: "currency_exchange",
        label: "Currency Converter",
      },
    ],
  },
  {
    title: "Developer / Tech",
    icon: "terminal",
    iconColor: "text-purple-600",
    tools: [
      { href: "/dev/json", icon: "data_object", label: "JSON Formatter" },
      {
        href: "/dev/base64",
        icon: "enhanced_encryption",
        label: "Base64 Converter",
      },
      { href: "/dev/color", icon: "palette", label: "Hex to RGB" },
      { href: "/dev/qr", icon: "qr_code", label: "QR Generator" },
    ],
  },
  {
    title: "Math & Academic",
    icon: "school",
    iconColor: "text-blue-500",
    tools: [
      { href: "/math/standard", icon: "functions", label: "Advanced Calc" },
      { href: "/math/percentage", icon: "percent", label: "Percentage Calc" },
      { href: "/math/gpa", icon: "grade", label: "GPA Calculator" },
      { href: "/math/fraction", icon: "pie_chart", label: "Fraction Solver" },
    ],
  },
  {
    title: "Date & Time",
    icon: "schedule",
    iconColor: "text-orange-500",
    tools: [
      { href: "/datetime/age", icon: "cake", label: "Age Calculator" },
      { href: "/datetime/timezone", icon: "public", label: "Time Zone Map" },
      { href: "/datetime/stopwatch", icon: "timer", label: "Stopwatch" },
      {
        href: "/datetime/difference",
        icon: "calendar_month",
        label: "Date Difference",
      },
    ],
  },
  {
    title: "Height & Unit",
    icon: "straighten",
    iconColor: "text-teal-500",
    tools: [
      { href: "/unit/height", icon: "square_foot", label: "Height Converter" },
      { href: "/unit/temp", icon: "thermostat", label: "Temperature" },
      { href: "/unit/volume", icon: "science", label: "Volume Converter" },
    ],
  },
  {
    title: "Everyday Utilities",
    icon: "home_repair_service",
    iconColor: "text-indigo-500",
    tools: [
      { href: "/util/fuel", icon: "local_gas_station", label: "Fuel Cost" },
      { href: "/util/discount", icon: "sell", label: "Discount Calc" },
    ],
  },
  {
    title: "Fun / Extras",
    icon: "celebration",
    iconColor: "text-pink-500",
    tools: [
      { href: "/fun/random", icon: "casino", label: "Random Number" },
      { href: "/fun/love", icon: "favorite_border", label: "Love Calculator" },
      { href: "/fun/coin", icon: "shuffle", label: "Coin Flipper" },
    ],
  },
];
