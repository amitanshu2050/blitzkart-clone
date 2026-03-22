export interface ProductData {
  name: string;
  price: number;
  originalPrice?: number;
  unit: string;
  image: string;
  discount?: number;
  category: string;
}

// Using placeholder URLs since binary assets can't be copied from the repo
const img = (name: string) => `https://images.unsplash.com/photo-${name}?w=200&h=200&fit=crop`;

export const allProducts: ProductData[] = [
  // Grocery & Kitchen
  { name: "Organic Bananas", price: 45, originalPrice: 60, unit: "1 dozen", image: img("1571771894821-ce9b6c11b08e"), discount: 25, category: "Grocery & Kitchen" },
  { name: "Farm Fresh Eggs", price: 89, unit: "12 pcs", image: img("1582722872445-44dc5f7e3c8f"), category: "Grocery & Kitchen" },
  { name: "Whole Wheat Bread", price: 42, originalPrice: 55, unit: "400g", image: img("1509440159596-0249088772ff"), discount: 24, category: "Grocery & Kitchen" },
  { name: "Amul Toned Milk", price: 30, unit: "500ml", image: img("1563636619-e9143da7973b"), category: "Grocery & Kitchen" },
  { name: "Red Apples", price: 120, originalPrice: 160, unit: "1 kg", image: img("1560806887-1e4cd0b6cbd6"), discount: 25, category: "Grocery & Kitchen" },
  { name: "Fresh Tomatoes", price: 35, unit: "500g", image: img("1546470427-0d4db2e30a5b"), category: "Grocery & Kitchen" },
  { name: "Basmati Rice 5kg", price: 399, originalPrice: 475, unit: "5 kg", image: img("1586201375761-83865001e31c"), discount: 16, category: "Grocery & Kitchen" },
  { name: "Onions", price: 42, unit: "1 kg", image: img("1518977956812-cd3dbadaaf31"), category: "Grocery & Kitchen" },
  { name: "Aashirvaad Atta", price: 289, unit: "5 kg", image: img("1574323347407-f5e1ad6d020b"), category: "Grocery & Kitchen" },
  { name: "Olive Oil", price: 550, originalPrice: 650, unit: "1 L", image: img("1474979266404-7eaacbcd87c5"), discount: 15, category: "Grocery & Kitchen" },
  { name: "Green Chillies", price: 18, unit: "200g", image: img("1583119022894-919a68a3d0e3"), category: "Grocery & Kitchen" },
  { name: "Potatoes", price: 30, unit: "1 kg", image: img("1518977676601-b32088c7245e"), category: "Grocery & Kitchen" },

  // Snacks & Drinks
  { name: "Lays Classic Chips", price: 20, unit: "52g", image: img("1566478989037-eec170784d0b"), category: "Snacks & Drinks" },
  { name: "Greek Yogurt", price: 75, originalPrice: 99, unit: "200g", image: img("1488477181946-6428a0291777"), discount: 24, category: "Snacks & Drinks" },
  { name: "Coca Cola 750ml", price: 40, unit: "750ml", image: img("1554866585-cd94860890b7"), category: "Snacks & Drinks" },
  { name: "Red Bull Energy", price: 125, unit: "250ml", image: img("1527960471264-932f39eb5846"), category: "Snacks & Drinks" },
  { name: "Maggi Noodles", price: 14, unit: "70g", image: img("1612929633738-8fe44f7ec841"), category: "Snacks & Drinks" },
  { name: "Dark Chocolate", price: 99, originalPrice: 130, unit: "100g", image: img("1549007994-cb92caefd54d"), discount: 24, category: "Snacks & Drinks" },
  { name: "Mixed Nuts", price: 299, originalPrice: 399, unit: "250g", image: img("1599599810769-bcde2a3cee0b"), discount: 25, category: "Snacks & Drinks" },
  { name: "Mango Juice", price: 45, unit: "1 L", image: img("1546173159-315724a31696"), category: "Snacks & Drinks" },
  { name: "Biscuit Pack", price: 30, unit: "200g", image: img("1558961363-fa8fdf82db35"), category: "Snacks & Drinks" },
  { name: "Popcorn", price: 60, unit: "150g", image: img("1585238342024-0a0ba8db58ff"), category: "Snacks & Drinks" },
  { name: "Green Tea Bags", price: 180, originalPrice: 220, unit: "25 bags", image: img("1556881286-fc6dfb10bca3"), discount: 18, category: "Snacks & Drinks" },
  { name: "Mineral Water", price: 20, unit: "1 L", image: img("1548839140-29a749e6e3b3"), category: "Snacks & Drinks" },

  // Household Items
  { name: "Surf Excel Detergent", price: 235, originalPrice: 280, unit: "1 kg", image: img("1585421514284-652b8c8bd85b"), discount: 16, category: "Household Items" },
  { name: "Vim Dishwash Gel", price: 99, unit: "500ml", image: img("1583947581924-860bda6a26df"), category: "Household Items" },
  { name: "Harpic Toilet Cleaner", price: 85, unit: "500ml", image: img("1585421514284-652b8c8bd85b"), category: "Household Items" },
  { name: "Floor Cleaner", price: 145, originalPrice: 175, unit: "1 L", image: img("1563453392212-326f5e854473"), discount: 17, category: "Household Items" },
  { name: "Kitchen Tissues", price: 120, unit: "2 rolls", image: img("1583947582886-f40ec95cdc28"), category: "Household Items" },
  { name: "Garbage Bags", price: 65, unit: "30 pcs", image: img("1610141086165-d3f3b13e3e6e"), category: "Household Items" },
  { name: "Scrub Sponge Pack", price: 45, unit: "3 pcs", image: img("1583947582886-f40ec95cdc28"), category: "Household Items" },
  { name: "Air Freshener", price: 199, originalPrice: 249, unit: "250ml", image: img("1608571423902-eed4a5ad8108"), discount: 20, category: "Household Items" },
  { name: "Aluminium Foil", price: 95, unit: "9m roll", image: img("1583947582886-f40ec95cdc28"), category: "Household Items" },
  { name: "Mosquito Repellent", price: 72, unit: "45ml", image: img("1583947582886-f40ec95cdc28"), category: "Household Items" },

  // Electronics
  { name: "USB-C Cable", price: 299, originalPrice: 499, unit: "1.5m", image: img("1558618666-fcd25c85f82e"), discount: 40, category: "Electronics" },
  { name: "Wireless Earbuds", price: 1299, originalPrice: 1999, unit: "1 pc", image: img("1590658268037-6bf12165a8df"), discount: 35, category: "Electronics" },
  { name: "Phone Charger 20W", price: 599, unit: "1 pc", image: img("1583863788434-e58a36330cf0"), category: "Electronics" },
  { name: "LED Desk Lamp", price: 849, originalPrice: 1099, unit: "1 pc", image: img("1507003211169-0a1dd7228f2d"), discount: 23, category: "Electronics" },
  { name: "Power Bank 10000mAh", price: 999, originalPrice: 1499, unit: "1 pc", image: img("1609091839311-d5365f9ff1c5"), discount: 33, category: "Electronics" },
  { name: "Bluetooth Speaker", price: 1599, unit: "1 pc", image: img("1608043152269-423dbba4e7e1"), category: "Electronics" },
  { name: "Smartwatch Band", price: 399, unit: "1 pc", image: img("1579586337278-3befd40fd17a"), category: "Electronics" },
  { name: "Screen Protector", price: 149, unit: "2 pcs", image: img("1601784551446-20c9e07cdbdb"), category: "Electronics" },
  { name: "Mouse Pad", price: 199, originalPrice: 299, unit: "1 pc", image: img("1527864550417-7fd91fc51a46"), discount: 33, category: "Electronics" },
  { name: "HDMI Cable", price: 349, unit: "1.8m", image: img("1558618666-fcd25c85f82e"), category: "Electronics" },

  // Beauty Products
  { name: "Face Wash", price: 175, originalPrice: 220, unit: "100ml", image: img("1556228578-0d85b1a4d571"), discount: 20, category: "Beauty Products" },
  { name: "Moisturizer Cream", price: 299, unit: "100g", image: img("1571781926291-c477ebfd024b"), category: "Beauty Products" },
  { name: "Sunscreen SPF 50", price: 450, originalPrice: 550, unit: "50ml", image: img("1556228578-0d85b1a4d571"), discount: 18, category: "Beauty Products" },
  { name: "Hair Shampoo", price: 225, unit: "340ml", image: img("1585232004423-244e0e6904e3"), category: "Beauty Products" },
  { name: "Lipstick", price: 399, originalPrice: 499, unit: "1 pc", image: img("1586495777744-4413f21062fa"), discount: 20, category: "Beauty Products" },
  { name: "Perfume Deodorant", price: 189, unit: "150ml", image: img("1541643600914-78b084683601"), category: "Beauty Products" },
  { name: "Hair Oil", price: 120, unit: "200ml", image: img("1585232004423-244e0e6904e3"), category: "Beauty Products" },
  { name: "Nail Polish Set", price: 249, originalPrice: 350, unit: "5 pcs", image: img("1604654894610-df63bc536371"), discount: 29, category: "Beauty Products" },
  { name: "Face Mask Pack", price: 199, unit: "5 sheets", image: img("1556228578-0d85b1a4d571"), category: "Beauty Products" },
  { name: "Body Lotion", price: 275, originalPrice: 350, unit: "200ml", image: img("1571781926291-c477ebfd024b"), discount: 21, category: "Beauty Products" },
];

export const categories = ["Grocery & Kitchen", "Snacks & Drinks", "Household Items", "Electronics", "Beauty Products"];
