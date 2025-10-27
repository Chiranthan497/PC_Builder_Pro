import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import useBuilderStore from '../../store/builderStore';

const CompatibilityChecker = () => {
    const { selectedParts } = useBuilderStore();

    const checkCompatibility = () => {
        try {
            const issues = [];
            const warnings = [];

            const hasAnyParts = Object.values(selectedParts).some(part => part !== null);

            if (!hasAnyParts) {
                return { issues: [], warnings: [], allGood: false };
            }

            const getSpec = (specs, key) => {
                if (!specs) return null;
                if (specs instanceof Map) return specs.get(key);
                return specs[key];
            };

            // 1. CPU-Motherboard Compatibility
            if (selectedParts.cpu && selectedParts.motherboard) {
                const cpuBrand = (selectedParts.cpu.brand || '').toUpperCase();
                const cpuName = (selectedParts.cpu.name || '').toUpperCase();

                let cpuSocket = getSpec(selectedParts.cpu.specs, 'socket');
                let moboSocket = getSpec(selectedParts.motherboard.specs, 'socket');

                let cpuManufacturer = null;
                if (cpuBrand.includes('INTEL') || cpuName.includes('INTEL') || cpuName.includes('CORE I')) {
                    cpuManufacturer = 'INTEL';
                } else if (cpuBrand.includes('AMD') || cpuName.includes('AMD') || cpuName.includes('RYZEN')) {
                    cpuManufacturer = 'AMD';
                }

                let moboManufacturer = null;
                if (moboSocket) {
                    const socketStr = String(moboSocket).toUpperCase();
                    if (socketStr.includes('LGA') || socketStr.includes('1700') || socketStr.includes('1200') || socketStr.includes('1851')) {
                        moboManufacturer = 'INTEL';
                    } else if (socketStr.includes('AM5') || socketStr.includes('AM4') || socketStr.includes('TR')) {
                        moboManufacturer = 'AMD';
                    }
                }

                if (cpuManufacturer && moboManufacturer && cpuManufacturer !== moboManufacturer) {
                    issues.push({
                        message: `⚠️ Brand Mismatch: ${cpuManufacturer} CPU ≠ ${moboManufacturer} Motherboard`
                    });
                } else if (cpuSocket && moboSocket) {
                    cpuSocket = String(cpuSocket).trim().toUpperCase();
                    moboSocket = String(moboSocket).trim().toUpperCase();

                    if (cpuSocket !== moboSocket) {
                        issues.push({
                            message: `⚠️ Socket: CPU (${cpuSocket}) ≠ Motherboard (${moboSocket})`
                        });
                    }
                }
            }

            // 2. RAM
            if (selectedParts.ram && selectedParts.motherboard) {
                let ramType = getSpec(selectedParts.ram.specs, 'type');
                let moboMemory = getSpec(selectedParts.motherboard.specs, 'memory');

                if (ramType) ramType = String(ramType).trim().toUpperCase();
                if (moboMemory) moboMemory = String(moboMemory).trim().toUpperCase();

                if (ramType && moboMemory && !moboMemory.includes(ramType)) {
                    issues.push({
                        message: `⚠️ RAM: ${ramType} incompatible with ${moboMemory}`
                    });
                }
            }

            // 3. PSU
            if (selectedParts.psu) {
                let totalTDP = 0;
                const psuWattageStr = getSpec(selectedParts.psu.specs, 'wattage') || '0';
                const psuWattage = parseInt(String(psuWattageStr).replace(/\D/g, '')) || 0;

                if (selectedParts.cpu) {
                    const cpuTDPStr = getSpec(selectedParts.cpu.specs, 'tdp') || getSpec(selectedParts.cpu.specs, 'TDP') || '0';
                    totalTDP += parseInt(String(cpuTDPStr).replace(/\D/g, '')) || 0;
                }

                if (selectedParts.gpu) {
                    const gpuTDPStr = getSpec(selectedParts.gpu.specs, 'tdp') || getSpec(selectedParts.gpu.specs, 'TDP') || '0';
                    totalTDP += parseInt(String(gpuTDPStr).replace(/\D/g, '')) || 0;
                }

                const estimatedPower = totalTDP + 150;
                const recommendedPSU = estimatedPower * 1.2;

                if (psuWattage > 0 && totalTDP > 0) {
                    if (psuWattage < estimatedPower) {
                        issues.push({
                            message: `⚠️ PSU: ${psuWattage}W insufficient (need ${Math.ceil(estimatedPower)}W)`
                        });
                    } else if (psuWattage < recommendedPSU) {
                        warnings.push({
                            message: `⚡ PSU: ${psuWattage}W tight (recommend ${Math.ceil(recommendedPSU)}W)`
                        });
                    }
                }
            }

            // 4. Missing parts
            const criticalParts = ['cpu', 'motherboard', 'ram', 'storage', 'psu'];
            const missingParts = criticalParts.filter(part => !selectedParts[part]);

            if (missingParts.length > 0) {
                warnings.push({
                    message: `📦 Missing: ${missingParts.join(', ').toUpperCase()}`
                });
            }

            const allGood = issues.length === 0 && warnings.length === 0;
            return { issues, warnings, allGood };
        } catch (error) {
            console.error('❌ Error:', error);
            return { issues: [], warnings: [], allGood: true };
        }
    };

    const { issues, warnings, allGood } = checkCompatibility();
    const hasAnyParts = Object.values(selectedParts).some(part => part !== null);

    if (!hasAnyParts) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full"
            style={{ marginTop: '48px' }}
        >
            <div
                className="rounded-xl border-2 overflow-hidden shadow-lg transition-all duration-300"
                style={{
                    borderColor: allGood ? '#10b981' : (issues.length > 0 ? '#ef4444' : '#f59e0b'),
                    background: 'rgba(255,255,255,0.97)',
                }}
            >
                <style>{`
                    html.dark .compat-bg {
                        background: rgba(30,30,32,0.97) !important;
                    }
                `}</style>

                {/* Header */}
                <div
                    className="compat-bg px-6 py-4 flex items-center justify-between border-b-2"
                    style={{
                        borderColor: allGood ? '#10b981' : (issues.length > 0 ? '#ef4444' : '#f59e0b'),
                    }}
                >
                    <div className="flex items-center gap-3">
                        {allGood ? (
                            <CheckCircle size={24} className="text-green-500" strokeWidth={2.5} />
                        ) : issues.length > 0 ? (
                            <XCircle size={24} className="text-red-500" strokeWidth={2.5} />
                        ) : (
                            <AlertTriangle size={24} className="text-yellow-500" strokeWidth={2.5} />
                        )}
                        <h3
                            className="text-xl font-bold uppercase"
                            style={{
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2px",
                                color: document.documentElement.classList.contains('dark') ? '#5f9dee' : '#000000'
                            }}
                        >
                            Compatibility
                        </h3>

                    </div>

                    <span
                        className="px-3 py-1 rounded-full font-bold text-xs uppercase"
                        style={{
                            background: allGood ? '#10b981' : (issues.length > 0 ? '#ef4444' : '#f59e0b'),
                            color: 'white',
                            fontFamily: "'Bebas Neue', cursive",
                            letterSpacing: "1.5px"
                        }}
                    >
                        {allGood ? '✓ OK' : issues.length > 0 ? '✗ Error' : '⚠ Warning'}
                    </span>
                </div>

                {/* Content */}
                <div className="compat-bg px-6 py-5">
                    <AnimatePresence mode="popLayout">
                        {allGood && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center gap-3"
                            >
                                <CheckCircle size={20} className="text-green-500 dark:text-green-400" />
                                <p
                                    className="text-base font-bold uppercase text-green-700 dark:text-green-300"
                                    style={{
                                        fontFamily: "'Bebas Neue', cursive",
                                        letterSpacing: "1.5px"
                                    }}
                                >
                                    All Compatible!
                                </p>
                            </motion.div>
                        )}

                        {issues.map((issue, index) => (
                            <motion.div
                                key={`issue-${index}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="mb-2 text-sm font-bold text-red-700 dark:text-red-300"
                                style={{
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "1.5px"
                                }}
                            >
                                {issue.message}
                            </motion.div>
                        ))}

                        {warnings.map((warning, index) => (
                            <motion.div
                                key={`warning-${index}`}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: (issues.length + index) * 0.05 }}
                                className="mb-2 text-sm font-bold text-orange-700 dark:text-orange-300"
                                style={{
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "1.5px"
                                }}
                            >
                                {warning.message}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default CompatibilityChecker;
