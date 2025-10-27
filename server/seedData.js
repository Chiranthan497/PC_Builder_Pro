import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Component from './models/Component.js';

dotenv.config();

const sampleComponents = [
    // CPUs
    {
        name: 'Intel Core i9-14900K',
        type: 'cpu',
        brand: 'Intel',
        model: 'i9-14900K',
        price: 589,
        specs: new Map([
            ['cores', '24'],
            ['threads', '32'],
            ['baseClock', '3.2 GHz'],
            ['boostClock', '6.0 GHz'],
            ['socket', 'LGA 1700']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'AMD Ryzen 9 7950X',
        type: 'cpu',
        brand: 'AMD',
        model: '7950X',
        price: 699,
        specs: new Map([
            ['cores', '16'],
            ['threads', '32'],
            ['baseClock', '4.5 GHz'],
            ['boostClock', '5.7 GHz'],
            ['socket', 'AM5']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'Intel Core i7-14700K',
        type: 'cpu',
        brand: 'Intel',
        model: 'i7-14700K',
        price: 419,
        specs: new Map([
            ['cores', '20'],
            ['threads', '28'],
            ['baseClock', '3.4 GHz'],
            ['boostClock', '5.6 GHz'],
            ['socket', 'LGA 1700']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },

    // GPUs
    {
        name: 'NVIDIA RTX 4090',
        type: 'gpu',
        brand: 'NVIDIA',
        model: 'RTX 4090',
        price: 1599,
        specs: new Map([
            ['memory', '24GB GDDR6X'],
            ['coreClock', '2520 MHz'],
            ['tdp', '450W'],
            ['cuda', '16384']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'AMD Radeon RX 7900 XTX',
        type: 'gpu',
        brand: 'AMD',
        model: 'RX 7900 XTX',
        price: 999,
        specs: new Map([
            ['memory', '24GB GDDR6'],
            ['coreClock', '2500 MHz'],
            ['tdp', '355W'],
            ['stream', '6144']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'NVIDIA RTX 4080',
        type: 'gpu',
        brand: 'NVIDIA',
        model: 'RTX 4080',
        price: 1199,
        specs: new Map([
            ['memory', '16GB GDDR6X'],
            ['coreClock', '2505 MHz'],
            ['tdp', '320W'],
            ['cuda', '9728']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },

    // Motherboards
    {
        name: 'ASUS ROG Maximus Z790 Hero',
        type: 'motherboard',
        brand: 'ASUS',
        model: 'Z790 Hero',
        price: 629,
        specs: new Map([
            ['socket', 'LGA 1700'],
            ['chipset', 'Z790'],
            ['formFactor', 'ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'MSI MPG B650 Carbon',
        type: 'motherboard',
        brand: 'MSI',
        model: 'B650 Carbon',
        price: 349,
        specs: new Map([
            ['socket', 'AM5'],
            ['chipset', 'B650'],
            ['formFactor', 'ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },

    // RAM
    {
        name: 'Corsair Vengeance RGB DDR5 32GB',
        type: 'ram',
        brand: 'Corsair',
        model: 'Vengeance RGB',
        price: 169,
        specs: new Map([
            ['capacity', '32GB (2x16GB)'],
            ['speed', '6000MHz'],
            ['type', 'DDR5'],
            ['latency', 'CL36']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300'
    },
    {
        name: 'G.Skill Trident Z5 RGB 64GB',
        type: 'ram',
        brand: 'G.Skill',
        model: 'Trident Z5',
        price: 299,
        specs: new Map([
            ['capacity', '64GB (2x32GB)'],
            ['speed', '6400MHz'],
            ['type', 'DDR5'],
            ['latency', 'CL32']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300'
    },

    // Storage
    {
        name: 'Samsung 990 Pro 2TB',
        type: 'storage',
        brand: 'Samsung',
        model: '990 Pro',
        price: 189,
        specs: new Map([
            ['capacity', '2TB'],
            ['type', 'NVMe SSD'],
            ['interface', 'PCIe 4.0'],
            ['read', '7450 MB/s'],
            ['write', '6900 MB/s']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300'
    },
    {
        name: 'WD Black SN850X 1TB',
        type: 'storage',
        brand: 'Western Digital',
        model: 'SN850X',
        price: 129,
        specs: new Map([
            ['capacity', '1TB'],
            ['type', 'NVMe SSD'],
            ['interface', 'PCIe 4.0'],
            ['read', '7300 MB/s'],
            ['write', '6300 MB/s']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300'
    },

    // PSU
    {
        name: 'Corsair RM1000x',
        type: 'psu',
        brand: 'Corsair',
        model: 'RM1000x',
        price: 199,
        specs: new Map([
            ['wattage', '1000W'],
            ['efficiency', '80+ Gold'],
            ['modular', 'Fully Modular'],
            ['formFactor', 'ATX']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'EVGA SuperNOVA 850 G6',
        type: 'psu',
        brand: 'EVGA',
        model: 'SuperNOVA 850',
        price: 149,
        specs: new Map([
            ['wattage', '850W'],
            ['efficiency', '80+ Gold'],
            ['modular', 'Fully Modular'],
            ['formFactor', 'ATX']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },

    // Cases
    {
        name: 'Lian Li O11 Dynamic EVO',
        type: 'case',
        brand: 'Lian Li',
        model: 'O11 Dynamic EVO',
        price: 179,
        specs: new Map([
            ['formFactor', 'Mid Tower'],
            ['color', 'Black'],
            ['sidepanel', 'Tempered Glass'],
            ['fans', '3x 140mm included']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300'
    },
    {
        name: 'NZXT H7 Flow',
        type: 'case',
        brand: 'NZXT',
        model: 'H7 Flow',
        price: 149,
        specs: new Map([
            ['formFactor', 'Mid Tower'],
            ['color', 'White'],
            ['sidepanel', 'Tempered Glass'],
            ['fans', '3x 120mm included']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300'
    }
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log('🗑️  Clearing existing components...');
        await Component.deleteMany({});

        console.log('📦 Inserting sample components...');
        await Component.insertMany(sampleComponents);

        console.log('✅ Database seeded successfully!');
        console.log(`📊 Added ${sampleComponents.length} components`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
