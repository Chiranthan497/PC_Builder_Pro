import { motion } from 'framer-motion';
import { Cpu, MonitorPlay, CircuitBoard, HardDrive, Database, Zap, Box } from 'lucide-react';
import ComponentCard from '../components/builder/ComponentCard';
import BuildSummary from '../components/summary/BuildSummary';
import ThemeToggle from '../components/common/ThemeToggle';
import CompatibilityChecker from '../components/compatibility/CompatibilityChecker';

const BuilderPage = () => {
    const componentTypes = [
        { type: 'cpu', title: 'Processor', icon: Cpu },
        { type: 'gpu', title: 'Graphics Card', icon: MonitorPlay },
        { type: 'motherboard', title: 'Motherboard', icon: CircuitBoard },
        { type: 'ram', title: 'Memory', icon: Database },
        { type: 'storage', title: 'Storage', icon: HardDrive },
        { type: 'psu', title: 'Power Supply', icon: Zap },
        { type: 'case', title: 'Case', icon: Box }
    ];

    return (
        <div className="min-h-screen w-full flex flex-col" style={{ backgroundColor: 'transparent' }}>
            {/* Header */}
            <header className="sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 w-full"
                    style={{
                        backgroundColor: 'transparent',
                        borderColor: 'transparent',
                        backdropFilter: 'blur(8px)'
                    }}>
                <div className="w-full" style={{
                    backgroundColor: 'transparent'
                }}>
                    <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-6">
                        {/* Centered Header with Theme Toggle */}
                        <div className="flex items-center justify-center relative">
                            {/* Theme Toggle - Absolute Right */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="absolute right-0 flex-shrink-0"
                            >
                                <ThemeToggle />
                            </motion.div>
                            {/* Centered Logo & Title */}
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="flex items-center gap-6 justify-center"
                            >
                                <div className="text-center">
                                    <h1
                                        style={{
                                            fontFamily: '"Trade Winds", sans-serif',
                                            color: 'var(--color-text-primary)',
                                            letterSpacing: '0.02em',
                                            fontSize: 'clamp(3rem, 10vw, 5.5rem)',
                                        }}
                                        className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight"
                                    >
                                        PC Builder
                                    </h1>
                                    <h2
                                        style={{
                                            fontFamily: '"Trade Winds", sans-serif',
                                            color: 'var(--color-text-primary)',
                                            fontWeight: 400,
                                            letterSpacing: '0.01em',
                                            fontSize: 'clamp(2rem, 8vw, 4rem)',
                                        }}
                                        className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
                                    >
                                        Pro
                                    </h2>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="w-full flex-1" style={{ backgroundColor: 'transparent' }}>
                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-10 xl:px-16 py-12 sm:py-16 lg:py-20">
                    {/* Section Header - Centered */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16 sm:mb-20 lg:mb-24 text-center"
                    >
                        <h2
                            style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                color: 'var(--color-text-primary)',
                                fontWeight: 400,
                                letterSpacing: '0.01em',
                                fontSize: 'clamp(2rem, 4vw, 3rem)'
                            }}
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 uppercase"
                        >
                            Build Your Dream PC
                        </h2>
                        <p
                            style={{
                                color: 'var(--color-text-secondary)',
                                fontFamily: '"Bebas Neue", cursive',
                                letterSpacing: '2px'
                            }}
                            className="text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed uppercase"
                        >
                            Select components and customize your perfect build
                        </p>
                    </motion.div>

                    {/* Main Layout - Components Grid + Summary Sidebar */}
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 xl:gap-12">
                        {/* Left Section - Components Grid (Takes 3 columns on XL) */}
                        <div className="xl:col-span-3 w-full">
                            {/* Components Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                                {componentTypes.map((component, index) => (
                                    <motion.div
                                        key={component.type}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.4,
                                            delay: index * 0.08,
                                            ease: "easeOut"
                                        }}
                                        className="w-full"
                                    >
                                        <ComponentCard
                                            type={component.type}
                                            title={component.title}
                                            icon={component.icon}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                            {/* ✅ Compatibility Checker - Spaced below component cards */}
                            <div style={{ marginTop: '48px' }}>
                                <CompatibilityChecker />
                            </div>

                        </div>

                        {/* Right Section - Build Summary Sidebar (Takes 2 columns on XL) */}
                        <div className="xl:col-span-2 w-full">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="w-full xl:sticky xl:top-24"
                            >
                                <BuildSummary />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Pro Tip at Bottom Center */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full flex items-center justify-center mb-2"
                style={{ minHeight: "3rem" }}
            >
                <span
                    style={{
                        fontFamily: '"Bebas Neue", cursive',
                        fontSize: 'clamp(1.1rem, 2vw, 1.65rem)',
                        color: 'white',
                        background: 'transparent',
                        boxShadow: '0 2px 14px 0 rgba(0,0,0,0.06)',
                        padding: "0.2em 1.2em",
                        borderRadius: "9999px",
                        letterSpacing: "1px",
                        marginBottom: "0.35em"
                    }}
                    className="shadow-md font-semibold"
                >
                    💡 Pro Tip: Select one component from each category for a compatible build – it's that simple.
                </span>
            </motion.div>

            {/* Footer */}
            <footer className="mt-8 sm:mt-12 lg:mt-16 border-t transition-colors duration-300 w-full"
                    style={{ borderColor: 'transparent' }}>
                <div className="max-w-full mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-10">
                    <div className="text-center">
                        <p className="text-xs sm:text-sm"
                           style={{
                               color: 'var(--color-text-secondary)',
                               fontFamily: '"Bebas Neue", cursive',
                               letterSpacing: '0.5px'
                           }}>
                            © 2025 PC BUILDER PRO. ALL RIGHTS RESERVED. | ASTERIX
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BuilderPage;
