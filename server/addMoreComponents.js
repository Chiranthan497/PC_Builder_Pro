import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Component from './models/Component.js';

dotenv.config();

const additionalComponents = [
    // MORE CPUs
    {
        name: 'AMD Ryzen 9 9950X',
        type: 'cpu',
        brand: 'AMD',
        model: '9950X',
        price: 649,
        specs: new Map([
            ['cores', '16'],
            ['threads', '32'],
            ['baseClock', '4.3 GHz'],
            ['boostClock', '5.7 GHz'],
            ['socket', 'AM5']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'AMD Ryzen 7 9800X3D',
        type: 'cpu',
        brand: 'AMD',
        model: '9800X3D',
        price: 479,
        specs: new Map([
            ['cores', '8'],
            ['threads', '16'],
            ['baseClock', '4.7 GHz'],
            ['boostClock', '5.2 GHz'],
            ['socket', 'AM5']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'Intel Core i5-14600K',
        type: 'cpu',
        brand: 'Intel',
        model: 'i5-14600K',
        price: 319,
        specs: new Map([
            ['cores', '14'],
            ['threads', '20'],
            ['baseClock', '3.5 GHz'],
            ['boostClock', '5.3 GHz'],
            ['socket', 'LGA 1700']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'AMD Ryzen 5 7600X',
        type: 'cpu',
        brand: 'AMD',
        model: '7600X',
        price: 229,
        specs: new Map([
            ['cores', '6'],
            ['threads', '12'],
            ['baseClock', '4.7 GHz'],
            ['boostClock', '5.3 GHz'],
            ['socket', 'AM5']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },
    {
        name: 'Intel Core i9-14900KS',
        type: 'cpu',
        brand: 'Intel',
        model: 'i9-14900KS',
        price: 689,
        specs: new Map([
            ['cores', '24'],
            ['threads', '32'],
            ['baseClock', '3.2 GHz'],
            ['boostClock', '6.2 GHz'],
            ['socket', 'LGA 1700']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=300'
    },

    // MORE GPUs
    {
        name: 'NVIDIA RTX 4080 SUPER',
        type: 'gpu',
        brand: 'NVIDIA',
        model: 'RTX 4080 SUPER',
        price: 999,
        specs: new Map([
            ['memory', '16GB GDDR6X'],
            ['coreClock', '2550 MHz'],
            ['tdp', '320W'],
            ['cuda', '10240']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'NVIDIA RTX 4070 Ti SUPER',
        type: 'gpu',
        brand: 'NVIDIA',
        model: 'RTX 4070 Ti SUPER',
        price: 799,
        specs: new Map([
            ['memory', '16GB GDDR6X'],
            ['coreClock', '2610 MHz'],
            ['tdp', '285W'],
            ['cuda', '8448']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'AMD Radeon RX 7800 XT',
        type: 'gpu',
        brand: 'AMD',
        model: 'RX 7800 XT',
        price: 499,
        specs: new Map([
            ['memory', '16GB GDDR6'],
            ['coreClock', '2430 MHz'],
            ['tdp', '263W'],
            ['stream', '3840']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'NVIDIA RTX 4060 Ti',
        type: 'gpu',
        brand: 'NVIDIA',
        model: 'RTX 4060 Ti',
        price: 399,
        specs: new Map([
            ['memory', '8GB GDDR6'],
            ['coreClock', '2540 MHz'],
            ['tdp', '160W'],
            ['cuda', '4352']
        ]),
        inStock: true,
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },
    {
        name: 'AMD Radeon RX 7600',
        type: 'gpu',
        brand: 'AMD',
        model: 'RX 7600',
        price: 269,
        specs: new Map([
            ['memory', '8GB GDDR6'],
            ['coreClock', '2250 MHz'],
            ['tdp', '165W'],
            ['stream', '2048']
        ]),
        inStock: true,
        rating: 4.4,
        imageUrl: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=300'
    },

    // MORE Motherboards
    {
        name: 'MSI MAG X870E TOMAHAWK WIFI',
        type: 'motherboard',
        brand: 'MSI',
        model: 'X870E TOMAHAWK',
        price: 330,
        specs: new Map([
            ['socket', 'AM5'],
            ['chipset', 'X870E'],
            ['formFactor', 'ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'Gigabyte B650 AORUS ELITE AX',
        type: 'motherboard',
        brand: 'Gigabyte',
        model: 'B650 AORUS ELITE',
        price: 199,
        specs: new Map([
            ['socket', 'AM5'],
            ['chipset', 'B650'],
            ['formFactor', 'ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'ASRock B650M Pro RS',
        type: 'motherboard',
        brand: 'ASRock',
        model: 'B650M Pro RS',
        price: 129,
        specs: new Map([
            ['socket', 'AM5'],
            ['chipset', 'B650'],
            ['formFactor', 'Micro-ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'ASUS ROG STRIX Z890-E GAMING WIFI',
        type: 'motherboard',
        brand: 'ASUS',
        model: 'Z890-E GAMING',
        price: 499,
        specs: new Map([
            ['socket', 'LGA 1851'],
            ['chipset', 'Z890'],
            ['formFactor', 'ATX'],
            ['memory', 'DDR5']
        ]),
        inStock: true,
        rating: 4.9,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },

    // MORE RAM
    {
        name: 'Kingston FURY Beast 16GB DDR5',
        type: 'ram',
        brand: 'Kingston',
        model: 'FURY Beast',
        price: 69,
        specs: new Map([
            ['capacity', '16GB (2x8GB)'],
            ['speed', '5200MHz'],
            ['type', 'DDR5'],
            ['latency', 'CL36']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300'
    },
    {
        name: 'Corsair Vengeance RGB 32GB DDR4',
        type: 'ram',
        brand: 'Corsair',
        model: 'Vengeance RGB DDR4',
        price: 89,
        specs: new Map([
            ['capacity', '32GB (2x16GB)'],
            ['speed', '3600MHz'],
            ['type', 'DDR4'],
            ['latency', 'CL18']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300'
    },
    {
        name: 'G.Skill Ripjaws V 16GB DDR4',
        type: 'ram',
        brand: 'G.Skill',
        model: 'Ripjaws V',
        price: 49,
        specs: new Map([
            ['capacity', '16GB (2x8GB)'],
            ['speed', '3200MHz'],
            ['type', 'DDR4'],
            ['latency', 'CL16']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300'
    },

    // MORE Storage
    {
        name: 'Crucial P5 Plus 4TB',
        type: 'storage',
        brand: 'Crucial',
        model: 'P5 Plus',
        price: 299,
        specs: new Map([
            ['capacity', '4TB'],
            ['type', 'NVMe SSD'],
            ['interface', 'PCIe 4.0'],
            ['read', '6600 MB/s'],
            ['write', '5000 MB/s']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300'
    },
    {
        name: 'Seagate Barracuda 2TB HDD',
        type: 'storage',
        brand: 'Seagate',
        model: 'Barracuda',
        price: 54,
        specs: new Map([
            ['capacity', '2TB'],
            ['type', 'HDD'],
            ['interface', 'SATA III'],
            ['rpm', '7200 RPM']
        ]),
        inStock: true,
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300'
    },
    {
        name: 'Kingston KC3000 1TB',
        type: 'storage',
        brand: 'Kingston',
        model: 'KC3000',
        price: 99,
        specs: new Map([
            ['capacity', '1TB'],
            ['type', 'NVMe SSD'],
            ['interface', 'PCIe 4.0'],
            ['read', '7000 MB/s'],
            ['write', '6000 MB/s']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=300'
    },

    // MORE PSUs
    {
        name: 'Thermaltake Toughpower GF3 750W',
        type: 'psu',
        brand: 'Thermaltake',
        model: 'Toughpower GF3',
        price: 99,
        specs: new Map([
            ['wattage', '750W'],
            ['efficiency', '80+ Gold'],
            ['modular', 'Fully Modular'],
            ['formFactor', 'ATX']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'be quiet! Pure Power 12 M 650W',
        type: 'psu',
        brand: 'be quiet!',
        model: 'Pure Power 12 M',
        price: 89,
        specs: new Map([
            ['wattage', '650W'],
            ['efficiency', '80+ Gold'],
            ['modular', 'Semi-Modular'],
            ['formFactor', 'ATX']
        ]),
        inStock: true,
        rating: 4.6,
        imageUrl: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=300'
    },
    {
        name: 'Corsair RM850e 850W',
        type: 'psu',
        brand: 'Corsair',
        model: 'RM850e',
        price: 129,
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

    // MORE Cases
    {
        name: 'Fractal Design Torrent Compact',
        type: 'case',
        brand: 'Fractal Design',
        model: 'Torrent Compact',
        price: 179,
        specs: new Map([
            ['formFactor', 'Mid Tower'],
            ['color', 'White'],
            ['sidepanel', 'Tempered Glass'],
            ['fans', '2x 180mm included']
        ]),
        inStock: true,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300'
    },
    {
        name: 'Corsair 4000D Airflow',
        type: 'case',
        brand: 'Corsair',
        model: '4000D Airflow',
        price: 94,
        specs: new Map([
            ['formFactor', 'Mid Tower'],
            ['color', 'Black'],
            ['sidepanel', 'Tempered Glass'],
            ['fans', '2x 120mm included']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300'
    },
    {
        name: 'Phanteks Eclipse P500A',
        type: 'case',
        brand: 'Phanteks',
        model: 'Eclipse P500A',
        price: 159,
        specs: new Map([
            ['formFactor', 'Mid Tower'],
            ['color', 'Black'],
            ['sidepanel', 'Tempered Glass'],
            ['fans', '3x 140mm included']
        ]),
        inStock: true,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?w=300'
    }
];

const addMoreComponents = async () => {
    try {
        await connectDB();

        console.log('📦 Adding more components to existing database...');

        // Insert new components WITHOUT deleting existing ones
        const result = await Component.insertMany(additionalComponents);

        console.log('✅ Successfully added more components!');
        console.log(`📊 Added ${result.length} new components`);

        // Show total count
        const totalCount = await Component.countDocuments();
        console.log(`📈 Total components in database: ${totalCount}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error adding components:', error);
        process.exit(1);
    }
};

addMoreComponents();
