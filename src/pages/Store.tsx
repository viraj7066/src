import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Package, Home, Briefcase, User, Twitch as Kitchen, Tent, Laptop, Heart, Gamepad, Flame, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface Product {
id: number;
name: string;
price: number;
description: string;
image: string;
category: string;
}

const categories = [
{ id: 'home', name: 'Home Organization', icon: Home },
{ id: 'office', name: 'Office Supplies', icon: Briefcase },
{ id: 'personal', name: 'Personal Accessories', icon: User },
{ id: 'kitchen', name: 'Kitchen Gadgets', icon: Kitchen },
{ id: 'outdoor', name: 'Outdoor and Travel', icon: Tent },
{ id: 'tech', name: 'Tech Accessories', icon: Laptop },
{ id: 'health', name: 'Health and Wellness', icon: Heart },
{ id: 'toys', name: 'Toys', icon: Gamepad }
];

const products: Product[] = [
// Home Organization
{
id: 1,
name: "Wall-mounted Key Holder",
price: 599,
description: "Elegant wall-mounted key organizer with modern design",
image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800",
category: "home"
},
{
id: 2,
name: "Stackable Storage Bins",
price: 899,
description: "Modular storage bins for efficient organization",
image: "https://images.unsplash.com/photo-1594940018077-6bf6929c7e1b?q=80&w=800",
category: "home"
},
{
id: 3,
name: "Remote Control Organizer",
price: 399,
description: "Keep all your remotes in one convenient place",
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800",
category: "home"
},
{
id: 4,
name: "Shelf Brackets",
price: 299,
description: "Sturdy and stylish shelf support brackets",
image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800",
category: "home"
},
{
id: 5,
name: "Cable Management Clips",
price: 199,
description: "Keep your cables organized and tangle-free",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "home"
},
{
id: 6,
name: "Drawer Dividers",
price: 449,
description: "Customizable drawer organization system",
image: "https://images.unsplash.com/photo-1594940018077-6bf6929c7e1b?q=80&w=800",
category: "home"
},
{
id: 7,
name: "Coat Hooks",
price: 349,
description: "Modern wall-mounted coat and bag hooks",
image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800",
category: "home"
},
{
id: 8,
name: "Door Stoppers",
price: 249,
description: "Sleek and functional door stop solution",
image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800",
category: "home"
},
{
id: 9,
name: "Light Switch Covers",
price: 199,
description: "Decorative light switch plate covers",
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800",
category: "home"
},
{
id: 10,
name: "Wall-mounted Planters",
price: 699,
description: "Modern geometric wall planters",
image: "https://images.unsplash.com/photo-1594940018077-6bf6929c7e1b?q=80&w=800",
category: "home"
},
{
id: 11,
name: "Umbrella Holder",
price: 549,
description: "Compact umbrella storage solution",
image: "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=800",
category: "home"
},
{
id: 12,
name: "Shoe Rack",
price: 899,
description: "Space-saving modular shoe organizer",
image: "https://images.unsplash.com/photo-1594940018077-6bf6929c7e1b?q=80&w=800",
category: "home"
},
{
id: 13,
name: "Magazine Holder",
price: 449,
description: "Wall-mounted magazine and document organizer",
image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=800",
category: "home"
},
{
id: 14,
name: "Jewelry Organizer",
price: 649,
description: "Multi-compartment jewelry storage system",
image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=800",
category: "home"
},
{
id: 15,
name: "Laundry Cup Holder",
price: 299,
description: "Convenient detergent cup storage solution",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "home"
},

// Office Supplies
{
id: 16,
name: "Pen Holder",
price: 399,
description: "Modern desk organizer for writing tools",
image: "https://fbi.cults3d.com/uploaders/1794236/illustration-file/5819/05_copie.jpg",
category: "office"
},
{
id: 17,
name: "Business Card Holder",
price: 349,
description: "Professional card display stand",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "office"
},
{
id: 18,
name: "Headphone Stand",
price: 799,
description: "Elegant headphone display and storage",
image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=800",
category: "office"
},
{
id: 19,
name: "Monitor Riser",
price: 999,
description: "Ergonomic monitor stand with storage",
image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800",
category: "office"
},
{
id: 20,
name: "Paperclip Dispenser",
price: 299,
description: "Magnetic paperclip organizer",
image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800",
category: "office"
},
{
id: 21,
name: "USB Holder",
price: 399,
description: "Organized storage for USB drives",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "office"
},
{
id: 22,
name: "Sticky Note Dispenser",
price: 349,
description: "Convenient sticky note organization",
image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=800",
category: "office"
},
{
id: 23,
name: "Cable Organizer",
price: 499,
description: "Desktop cable management solution",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "office"
},
{
id: 24,
name: "Laptop Stand",
price: 899,
description: "Adjustable ergonomic laptop riser",
image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800",
category: "office"
},
{
id: 25,
name: "Desk Nameplate",
price: 599,
description: "Customizable office desk nameplate",
image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800",
category: "office"
},
{
id: 26,
name: "Tablet Stand",
price: 699,
description: "Multi-angle tablet display stand",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "office"
},
{
id: 27,
name: "Mouse Cable Holder",
price: 299,
description: "Mouse cord management clip",
image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?q=80&w=800",
category: "office"
},
{
id: 28,
name: "Pen Grip",
price: 199,
description: "Ergonomic pen grip attachment",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "office"
},
{
id: 29,
name: "Document Tray",
price: 649,
description: "Stackable document organization system",
image: "https://images.unsplash.com/photo-1586776977607-310e9c725c37?q=80&w=800",
category: "office"
},
{
id: 30,
name: "Bookmark Clips",
price: 249,
description: "Decorative page marker clips",
image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=800",
category: "office"
},

// Personal Accessories
{
id: 31,
name: "Phone Case",
price: 699,
description: "Custom designed protective phone case",
image: "https://image.made-in-china.com/202f0j00CjwlpzFglDbB/Fashion-Design-3D-Printing-Cell-Phone-Case-for-Gifts.webp",
category: "personal"
},
{
id: 32,
name: "Keychain",
price: 299,
description: "Personalized decorative keychain",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "personal"
},
{
id: 33,
name: "Wallet",
price: 899,
description: "Slim minimalist card wallet",
image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
category: "personal"
},
{
id: 34,
name: "Sunglasses Holder",
price: 449,
description: "Protective sunglasses case",
image: "https://images.unsplash.com/photo-1586766020546-8572a597c06f?q=80&w=800",
category: "personal"
},
{
id: 35,
name: "Watch Stand",
price: 599,
description: "Elegant watch display stand",
image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800",
category: "personal"
},
{
id: 36,
name: "Earbud Case",
price: 399,
description: "Protective wireless earbud case",
image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
category: "personal"
},
{
id: 37,
name: "Bracelet",
price: 499,
description: "Custom designed fashion bracelet",
image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
category: "personal"
},
{
id: 38,
name: "Ring",
price: 599,
description: "Unique geometric ring design",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "personal"
},
{
id: 39,
name: "Necklace",
price: 799,
description: "Modern pendant necklace",
image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800",
category: "personal"
},
{
id: 40,
name: "Belt Buckle",
price: 699,
description: "Custom designed belt buckle",
image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
category: "personal"
},
{
id: 41,
name: "Hair Accessories",
price: 349,
description: "Decorative hair clips and pins",
image: "https://images.unsplash.com/photo-1586766020546-8572a597c06f?q=80&w=800",
category: "personal"
},
{
id: 42,
name: "Bag Tag",
price: 249,
description: "Personalized luggage identifier",
image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800",
category: "personal"
},
{
id: 43,
name: "Portable Mirror",
price: 399,
description: "Compact travel mirror case",
image: "https://images.unsplash.com/photo-1589578527966-fdac0f44566c?q=80&w=800",
category: "personal"
},
{
id: 44,
name: "Pill Case",
price: 299,
description: "Portable medication container",
image: "https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=800",
category: "personal"
},
{
id: 45,
name: "Compact Comb",
price: 199,
description: "Foldable travel hair comb",
image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800",
category: "personal"
},

// Kitchen Gadgets
{
id: 46,
name: "Bottle Opener",
price: 299,
description: "Ergonomic bottle opener design",
image: "https://images.unsplash.com/photo-1589180048903-1857c5962dd6?q=80&w=800",
category: "kitchen"
},
{
id: 47,
name: "Measuring Spoons",
price: 399,
description: "Precise measuring spoon set",
image: "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=800",
category: "kitchen"
},
{
id: 48,
name: "Coaster Set",
price: 499,
description: "Modern pattern drink coasters",
image: "https://images.unsplash.com/photo-1614159102354-a6c379c6f49b?q=80&w=800",
category: "kitchen"
},
{
id: 49,
name: "Napkin Rings",
price: 349,
description: "Decorative napkin holders",
image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800",
category: "kitchen"
},
{
id: 50,
name: "Egg Separator",
price: 249,
description: "Efficient egg yolk separator",
image: "https://images.unsplash.com/photo-1589180048903-1857c5962dd6?q=80&w=800",
category: "kitchen"
},
{
id: 51,
name: "Garlic Peeler",
price: 199,
description: "Quick garlic skin remover",
image: "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=800",
category: "kitchen"
},
{
id: 52,
name: "Pot Lid Holder",
price: 599,
description: "Wall-mounted pot lid organizer",
image: "https://stlbase.com/thumbnails/109/1125713_1.jpg",
category: "kitchen"
},
{
id: 53,
name: "Wine Glass Markers",
price: 299,
description: "Unique wine glass identifiers",
image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800",
category: "kitchen"
},
{
id: 54,
name: "Bag Clips",
price: 249,
description: "Airtight bag sealing clips",
image: "https://images.unsplash.com/photo-1589180048903-1857c5962dd6?q=80&w=800",
category: "kitchen"
},
{
id: 55,
name: "Spatula Rest",
price: 349,
description: "Counter-top utensil rest",
image: "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=800",
category: "kitchen"
},
{
id: 56,
name: "Chopstick Holders",
price: 299,
description: "Decorative chopstick rests",
image: "https://images.unsplash.com/photo-1614159102354-a6c379c6f49b?q=80&w=800",
category: "kitchen"
},
{
id: 57,
name: "Tea Infuser",
price: 399,
description: "Designer loose leaf tea infuser",
image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=800",
category: "kitchen"
},
{
id: 58,
name: "Coffee Stencils",
price: 299,
description: "Decorative coffee art stencils",
image: "https://images.unsplash.com/photo-1589180048903-1857c5962dd6?q=80&w=800",
category: "kitchen"
},
{
id: 59,
name: "Utensil Hooks",
price: 449,
description: "Wall-mounted kitchen tool hooks",
image: "https://images.unsplash.com/photo-1591261730799-ee4e6c2d16d7?q=80&w=800",
category: "kitchen"
},
{
id: 60,
name: "Fridge Magnets",
price: 199,
description: "Decorative refrigerator magnets",
image: "https://images.unsplash.com/photo-1614159102354-a6c379c6f49b?q=80&w=800",
category: "kitchen"
},

// Outdoor and Travel
{
id: 61,
name: "Luggage Tag",
price: 299,
description: "Durable travel identifier tag",
image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800",
category: "outdoor"
},
{
id: 62,
name: "Travel Cutlery Set",
price: 699,
description: "Portable eating utensil kit",
image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=800",
category: "outdoor"
},
{
id: 63,
name: "Travel Soap Case",
price: 249,
description: "Waterproof soap container",
image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=800",
category: "outdoor"
},
{
id: 64,
name: "Foldable Phone Stand",
price: 399,
description: "Compact travel phone holder",
image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800",
category: "outdoor"
},
{
id: 65,
name: "Mini First Aid Box",
price: 499,
description: "Compact emergency supply case",
image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800",
category: "outdoor"
},
{
id: 66,
name: "Camping Utensil Holder",
price: 599,
description: "Outdoor cooking tool organizer",
image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=800",
category: "outdoor"
},
{
id: 67,
name: "Bike Phone Mount",
price: 799,
description: "Secure bicycle phone holder",
image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=800",
category: "outdoor"
},
{
id: 68,
name: "Car Vent Organizer",
price: 349,
description: "Vehicle air vent storage",
image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800",
category: "outdoor"
},
{
id: 69,
name: "Toothbrush Holder",
price: 299,
description: "Travel toothbrush case",
image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800",
category: "outdoor"
},
{
id: 70,
name: "Toiletry Bottle Set",
price: 599,
description: "Travel-sized container set",
image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=800",
category: "outdoor"
},
{
id: 71,
name: "Compact Sewing Kit",
price: 399,
description: "Travel emergency repair kit",
image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=800",
category: "outdoor"
},
{
id: 72,
name: "Notepad Cover",
price: 349,
description: "Protective notepad holder",
image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=800",
category: "outdoor"
},
{
id: 73,
name: "Sanitizer Holder",
price: 249,
description: "Portable sanitizer bottle case",
image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800",
category: "outdoor"
},
{
id: 74,
name: "Collapsible Cup",
price: 399,
description: "Space-saving travel cup",
image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?q=80&w=800",
category: "outdoor"
},
{
id: 75,
name: "Mini Flashlight",
price: 499,
description: "Compact emergency light",
image: "https://images.unsplash.com/photo-1584305574647-0cc949a2bb9f?q=80&w=800",
category: "outdoor"
},

// Tech Accessories
{
id: 76,
name: "Cable Winder",
price: 299,
description: "Cable management solution",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "tech"
},
{
id: 77,
name: "SD Card Holder",
price: 399,
description: "Memory card storage case",
image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800",
category: "tech"
},
{
id: 78,
name: "Controller Stand",
price: 699,
description: "Gaming controller display",
image: "https://m.media-amazon.com/images/I/61cRCpApMpL._AC_UF894,1000_QL80_.jpg",
category: "tech"
},
{
id: 79,
name: "VR Headset Mount",
price: 899,
description: "Wall mount for VR equipment",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "tech"
},
{
id: 80,
name: "USB Cable Protector",
price: 199,
description: "Cable strain relief guard",
image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800",
category: "tech"
},
{
id: 81,
name: "Webcam Cover",
price: 149,
description: "Privacy protection slide",
image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
category: "tech"
},
{
id: 82,
name: "Router Organizer",
price: 599,
description: "Cable management for routers",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "tech"
},
{
id: 83,
name: "Smartwatch Dock",
price: 799,
description: "Charging stand for smartwatch",
image: "https://i.materialise.com/blog/wp-content/uploads/2015/07/3d-printed-apple-watch-dock-4.jpg",
category: "tech"
},
{
id: 84,
name: "Battery Case",
price: 499,
description: "Protective battery storage",
image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
category: "tech"
},
{
id: 85,
name: "Cable Saver",
price: 249,
description: "Laptop cable protector",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "tech"
},
{
id: 86,
name: "Earphone Winder",
price: 299,
description: "Earphone cord organizer",
image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800",
category: "tech"
},
{
id: 87,
name: "Stylus Holder",
price: 399,
description: "Tablet pen storage solution",
image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
category: "tech"
},


{
id: 88,
name: "Cable Labels",
price: 199,
description: "Color-coded cable identifiers",
image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=800",
category: "tech"
},
{
id: 89,
name: "Keycap Puller",
price: 249,
description: "Keyboard maintenance tool",
image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?q=80&w=800",
category: "tech"
},
{
id: 90,
name: "Mouse Bungee",
price: 599,
description: "Mouse cable management stand",
image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?q=80&w=800",
category: "tech"
},

// Health and Wellness
{
id: 91,
name: "Pill Organizer",
price: 499,
description: "Weekly medication planner",
image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
category: "health"
},
{
id: 92,
name: "Face Mask Holder",
price: 299,
description: "Hygienic mask storage",
image: "https://images.unsplash.com/photo-1586942593568-29361efcd571?q=80&w=800",
category: "health"
},
{
id: 93,
name: "Hand Grip Exerciser",
price: 399,
description: "Adjustable strength trainer",
image: "https://images.unsplash.com/photo-1590239926044-4131f5d0654d?q=80&w=800",
category: "health"
},
{
id: 94,
name: "Yoga Block Connector",
price: 349,
description: "Custom yoga block attachment",
image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
category: "health"
},
{
id: 95,
name: "Toothpaste Squeezer",
price: 199,
description: "Efficient tube emptying tool",
image: "https://images.unsplash.com/photo-1559591937-abc3a5eaca6d?q=80&w=800",
category: "health"
},
{
id: 96,
name: "Medicine Bottle Opener",
price: 299,
description: "Easy-grip bottle opener",
image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800",
category: "health"
},

// Toys
{
id: 97,
name: "Puzzle Cube",
price: 499,
description: "Complex 3D puzzle challenge",
image: "https://media.printables.com/media/prints/27882/images/278228_d410bf6f-72d0-46f2-babd-9afe800fdeab/thumbs/cover/1200x630/png/skjermbilde-12.png",
category: "toys"
},
{
id: 98,
name: "Building Block Set",
price: 799,
description: "Compatible construction blocks",
image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
category: "toys"
},
{
id: 99,
name: "Fidget Spinner",
price: 299,
description: "Custom designed stress reliever",
image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=800",
category: "toys"
},
{
id: 100,
name: "Miniature Figurines",
price: 399,
description: "Detailed character collection",
image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=800",
category: "toys"
},
{
id: 101,
name: "Spinning Top",
price: 299,
description: "Balance and momentum toy",
image: "https://images.unsplash.com/photo-1577374994190-3f0a0f2a692e?q=80&w=800",
category: "toys"
},
{
id: 102,
name: "Keychain Puzzle",
price: 249,
description: "Portable mini puzzle game",
image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
category: "toys"
},
{
id: 103,
name: "Pull-back Car",
price: 399,
description: "Mechanical toy vehicle",
image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=800",
category: "toys"
},
{
id: 104,
name: "Toy Sword",
price: 499,
description: "Safe play weapon replica",
image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=800",
category: "toys"
},
{
id: 105,
name: "Stacking Rings",
price: 349,
description: "Educational stacking toy",
image: "https://images.unsplash.com/photo-1577374994190-3f0a0f2a692e?q=80&w=800",
category: "toys"
},
{
id: 106,
name: "Animal Desk Toy",
price: 299,
description: "Decorative animal figure",
image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
category: "toys"
},
{
id: 107,
name: "Marble Maze",
price: 599,
description: "Custom maze challenge",
image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=800",
category: "toys"
},
{
id: 108,
name: "Tic-tac-toe Set",
price: 349,
description: "Modern design classic game",
image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=800",
category: "toys"
},
{
id: 109,
name: "Dollhouse Furniture",
price: 699,
description: "Miniature furniture set",
image: "https://images.unsplash.com/photo-1577374994190-3f0a0f2a692e?q=80&w=800",
category: "toys"
},
{
id: 110,
name: "Action Figure",
price: 499,
description: "Poseable character figure",
image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
category: "toys"
},
{
id: 111,
name: "Toy Boat",
price: 599,
description: "Floating bath toy",
image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=800",
category: "toys"
},
{
id: 112,
name: "Dinosaur Model",
price: 699,
description: "Detailed dinosaur replica",
image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=800",
category: "toys"
},
{
id: 113,
name: "Educational Blocks",
price: 799,
description: "Alphabet and number blocks",
image: "https://images.unsplash.com/photo-1577374994190-3f0a0f2a692e?q=80&w=800",
category: "toys"
},
{
id: 114,
name: "Slingshot Toy",
price: 349,
description: "Safe projectile launcher",
image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=800",
category: "toys"
},
{
id: 115,
name: "Kaleidoscope",
price: 449,
description: "Pattern viewing toy",
image: "https://images.unsplash.com/photo-1495195129352-aeb325a55b65?q=80&w=800",
category: "toys"
},
{
id: 116,
name: "Handheld Maze",
price: 399,
description: "Pocket-sized maze game",
image: "https://images.unsplash.com/photo-1558507334-57300f59f0bd?q=80&w=800",
category: "toys"
}
];

const hotPicks = [
  products.find(p => p.id === 78), // Controller Stand
  products.find(p => p.id === 16), // Pen Holder
  products.find(p => p.id === 52), // Pot Lid Holder
  products.find(p => p.id === 97), // Puzzle Cube
  products.find(p => p.id === 31), // Phone Case
  products.find(p => p.id === 83), // Smartwatch Dock
].filter(Boolean) as Product[];

const Store = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : [];

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const HotPickCard = ({ product }: { product: Product }) => (
    <motion.div
      whileHover={{ y: -10 }}
      className="relative group"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-white rounded-xl overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
          />
          <div className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full">
            <Flame size={20} />
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <Star className="text-yellow-400" size={18} />
            <span className="text-sm font-medium text-gray-600">Hot Pick</span>
          </div>
          <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-4">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold">₹{product.price}</span>
            <button
              onClick={(e) => handleAddToCart(e, product)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              <ShoppingCart size={18} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-6">3D Printed Products</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our collection of premium 3D printed products across various categories
          </p>
        </motion.div>

        {!selectedCategory ? (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-20"
            >
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className="bg-white rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col items-center space-y-4">
                      <div className="p-4 bg-blue-100 rounded-full">
                        <Icon size={32} className="text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-center">{category.name}</h3>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Flame className="text-blue-600" />
                  Hot Picks
                </h2>
                <div className="h-1 flex-1 mx-6 bg-gradient-to-r from-blue-600 to-transparent rounded-full" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hotPicks.map((product) => (
                  <HotPickCard key={product.id} product={product} />
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button
                onClick={() => setSelectedCategory(null)}
                className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
              >
                ← Back to Categories
              </button>
            </div>
            
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-48 overflow-hidden group">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">₹{product.price}</span>
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
                        >
                          <ShoppingCart size={20} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;