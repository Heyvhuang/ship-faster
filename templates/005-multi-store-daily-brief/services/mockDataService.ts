import { StoreStats } from '../types';

const STORE_NAMES = [
  { name: "North Shore Surf", color: "bg-blue-500" },
  { name: "Urban Threads", color: "bg-emerald-500" },
  { name: "Cozy Home Decor", color: "bg-amber-500" },
  { name: "Neon Tech", color: "bg-purple-500" },
  { name: "Paws & Claws", color: "bg-orange-500" }
];

const PRODUCTS = [
  "Vintage Tee", "Surf Wax 3-Pack", "Ceramic Mug", "Noise-Cancelling Headphones", 
  "Organic Cat Treats", "Denim Jacket", "Bamboo Toothbrush", "Wireless Charger",
  "Yoga Mat", "Leather Wallet"
];

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const generateStoreData = (count: number = 3): StoreStats[] => {
  // Ensure we don't ask for more unique names than we have
  const safeCount = Math.min(count, STORE_NAMES.length);
  
  return Array.from({ length: safeCount }).map((_, index) => {
    const todaySales = getRandomInt(800, 5000);
    const growthFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const yesterdaySales = Math.floor(todaySales / growthFactor);
    const topProdIndex = getRandomInt(0, PRODUCTS.length - 1);

    return {
      id: `store-${index + 1}`,
      name: STORE_NAMES[index].name,
      currency: "USD",
      color: STORE_NAMES[index].color,
      todaySales,
      yesterdaySales,
      todayOrders: Math.floor(todaySales / getRandomInt(40, 120)),
      topProduct: PRODUCTS[topProdIndex],
      topProductSales: Math.floor(todaySales * (0.15 + Math.random() * 0.2)), // 15-35% of revenue
      conversionRate: 1.5 + Math.random() * 3.5, // 1.5% - 5%
    };
  });
};

export const aggregateStats = (stores: StoreStats[]) => {
  const totalSales = stores.reduce((acc, s) => acc + s.todaySales, 0);
  const totalOrders = stores.reduce((acc, s) => acc + s.todayOrders, 0);
  const totalYesterday = stores.reduce((acc, s) => acc + s.yesterdaySales, 0);
  
  const salesGrowth = totalYesterday > 0 
    ? ((totalSales - totalYesterday) / totalYesterday) * 100 
    : 0;

  return {
    totalSales,
    totalOrders,
    salesGrowth,
    stores
  };
};