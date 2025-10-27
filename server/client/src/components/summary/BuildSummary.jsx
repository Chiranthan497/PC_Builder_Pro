import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Save, Share2, Package } from 'lucide-react';
import { useState } from 'react';
import useBuilderStore from '../../store/builderStore';

const BuildSummary = () => {
    const { selectedParts, totalPrice, removePart, clearBuild, getSelectedCount } = useBuilderStore();

    const [showSaveSuccess, setShowSaveSuccess] = useState(false);
    const [showLoadSuccess, setShowLoadSuccess] = useState(false);
    const [showShareSuccess, setShowShareSuccess] = useState(false);

    const handleSaveBuild = () => {
        const buildData = {
            parts: selectedParts,
            totalPrice: totalPrice,
            savedAt: new Date().toISOString(),
            timestamp: Date.now()
        };

        localStorage.setItem('savedPCBuild', JSON.stringify(buildData));

        setShowSaveSuccess(true);
        setTimeout(() => setShowSaveSuccess(false), 3000);

        console.log('✅ Build saved to local storage!');
    };

    const handleLoadBuild = () => {
        const savedBuild = localStorage.getItem('savedPCBuild');

        if (savedBuild) {
            try {
                const buildData = JSON.parse(savedBuild);
                const { loadBuild } = useBuilderStore.getState();
                loadBuild(buildData);

                setShowLoadSuccess(true);
                setTimeout(() => setShowLoadSuccess(false), 3000);

                console.log('✅ Build loaded from:', new Date(buildData.savedAt).toLocaleString());
            } catch (error) {
                console.error('❌ Error loading build:', error);
                alert('Error loading build!');
            }
        } else {
            alert('No saved build found! Save a build first.');
        }
    };

    const handleShareBuild = async () => {
        if (selectedCount === 0) {
            alert('No components selected to share!');
            return;
        }

        // Create formatted build text
        let buildText = '🖥️ MY PC BUILD\n';
        buildText += '━━━━━━━━━━━━━━━━━━━━\n\n';

        const partLabels = {
            cpu: '⚡ CPU',
            gpu: '🎮 GPU',
            motherboard: '🔌 Motherboard',
            ram: '💾 RAM',
            storage: '💿 Storage',
            psu: '🔋 PSU',
            case: '📦 Case'
        };

        // Add each selected part
        Object.entries(selectedParts).forEach(([key, part]) => {
            if (part) {
                buildText += `${partLabels[key]}: ${part.name} - $${part.price}\n`;
            }
        });

        buildText += '\n━━━━━━━━━━━━━━━━━━━━\n';
        buildText += `💰 TOTAL: $${totalPrice.toLocaleString()}\n`;
        buildText += '\nBuilt with PC Builder Pro ⚡';

        // Copy to clipboard
        try {
            await navigator.clipboard.writeText(buildText);
            setShowShareSuccess(true);
            setTimeout(() => setShowShareSuccess(false), 3000);
            console.log('✅ Build copied to clipboard!');
        } catch (error) {
            console.error('❌ Failed to copy:', error);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = buildText;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                setShowShareSuccess(true);
                setTimeout(() => setShowShareSuccess(false), 3000);
            } catch (err) {
                alert('Failed to copy to clipboard. Please try again.');
            }
            document.body.removeChild(textArea);
        }
    };

    const partTypes = [
        { key: 'cpu', label: 'Processor' },
        { key: 'gpu', label: 'Graphics Card' },
        { key: 'motherboard', label: 'Motherboard' },
        { key: 'ram', label: 'Memory' },
        { key: 'storage', label: 'Storage' },
        { key: 'psu', label: 'Power Supply' },
        { key: 'case', label: 'Case' }
    ];

    const selectedCount = getSelectedCount();
    const progress = (selectedCount / 7) * 100;
    const isDark = document.documentElement.classList.contains('dark');

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-6"
            style={{ minHeight: '680px' }}
        >
            <style>{`
                .glass-summary-better {
                  background: rgba(255,255,255,0.93);
                  border: 2.5px solid rgba(60,130,246,0.10);
                  box-shadow: 0 6px 28px 0 rgba(33,34,50,0.12),0 1.5px 8px rgba(0,0,0,0.08);
                  backdrop-filter: blur(20px);
                  -webkit-backdrop-filter: blur(20px);
                  transition: background 0.4s, border-color 0.3s;
                }
                html.dark .glass-summary-better {
                  background: rgba(15,16,19,0.93);
                  color: #fff;
                  border: 2.5px solid rgba(65,65,65,0.21);
                }
            `}</style>

            <div
                className="glass-summary-better rounded-3xl border overflow-hidden shadow-2xl flex flex-col justify-between"
                style={{
                    minHeight: "680px",
                    fontFamily: "'Bebas Neue', cursive",
                    letterSpacing: "2px"
                }}
            >
                {/* Header */}
                <div className="px-10 pt-8 pb-6 border-b flex flex-col gap-3"
                     style={{
                         borderColor: 'rgba(190,190,220,0.15)'
                     }}>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="flex items-center gap-2 text-2xl font-bold uppercase"
                            style={{
                                color: 'var(--color-accent,#3B82F6)',
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2px"
                            }}>
                            <Package size={26} strokeWidth={2.5} />
                            Your Build
                        </h2>
                        <span className="text-xs font-bold px-4 py-1 rounded-full"
                              style={{
                                  background: 'linear-gradient(90deg, #60a5fa28, #2563eb36 80%)',
                                  color: "#3B82F6",
                                  fontFamily: "'Bebas Neue', cursive",
                                  letterSpacing: "2.2px"
                              }}>
                            {selectedCount}/7
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full h-2.5 rounded-lg bg-gradient-to-r from-blue-100 to-blue-200"
                         style={{ background: "#f0f4fa", position: 'relative' }}>
                        <motion.div
                            className="h-full"
                            style={{
                                background: 'linear-gradient(90deg, #3B82F6 15%, #2563EB 85%)',
                                borderRadius: '12px'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                    </div>
                </div>

                {/* Parts List */}
                <div className="px-9 py-6 flex-1 overflow-y-auto"
                     style={{
                         fontFamily: "'Bebas Neue', cursive",
                         letterSpacing: "2px",
                         margin: '12px 0',
                         minHeight: 340
                     }}>
                    <div className="flex flex-col gap-5">
                        {partTypes.map(({ key, label }) => {
                            const part = selectedParts[key];
                            const isDarkMode = document.documentElement.classList.contains('dark');

                            return (
                                <motion.div
                                    key={key}
                                    layout
                                    className="flex items-center justify-between gap-4 p-5 rounded-2xl border transition-all duration-200"
                                    style={{
                                        borderColor: part
                                            ? (isDarkMode ? '#4b5563' : '#60A5FA')
                                            : (isDarkMode ? '#374151' : 'rgba(180,180,200,0.15)'),
                                        background: part
                                            ? (isDarkMode
                                                ? 'linear-gradient(90deg, rgba(55,65,81,0.6), rgba(75,85,99,0.4))'
                                                : 'linear-gradient(90deg,#e0eafe44,#a6d2fd38 80%)')
                                            : (isDarkMode
                                                ? 'rgba(31,41,55,0.5)'
                                                : 'rgba(250,251,255,0.59)'),
                                        boxShadow: part
                                            ? (isDarkMode
                                                ? '0 5px 15px 0 rgba(0,0,0,0.3)'
                                                : '0 5px 15px 0 rgba(80,140,255,0.08)')
                                            : 'none',
                                        minHeight: '90px',
                                        padding: '18px 20px'
                                    }}
                                >
                                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                                        <p className="text-sm font-bold uppercase"
                                           style={{
                                               color: part
                                                   ? (isDarkMode ? '#9ca3af' : '#2563eb')
                                                   : (isDarkMode ? '#6b7280' : '#666'),
                                               fontFamily: "'Bebas Neue', cursive",
                                               letterSpacing: "2px",
                                               marginBottom: '4px'
                                           }}>
                                            {label}
                                        </p>
                                        {part ? (
                                            <>
                                                <p className="text-base font-bold truncate uppercase"
                                                   style={{
                                                       fontFamily: "'Bebas Neue', cursive",
                                                       letterSpacing: "2px",
                                                       lineHeight: '1.3',
                                                       wordBreak: 'break-word',
                                                       overflow: 'visible',
                                                       whiteSpace: 'normal',
                                                       color: isDarkMode ? '#ffffff' : '#111827'
                                                   }}>
                                                    {part.name}
                                                </p>
                                                <p className="text-sm font-bold mt-1 uppercase"
                                                   style={{
                                                       letterSpacing: "1.5px",
                                                       color: isDarkMode ? '#d1d5db' : '#1d4ed8'
                                                   }}>
                                                    ${part.price}
                                                </p>
                                            </>
                                        ) : (
                                            <p className="text-xs italic"
                                               style={{
                                                   color: isDarkMode ? '#9ca3af' : '#9ca3af'
                                               }}>
                                                Not selected
                                            </p>
                                        )}
                                    </div>
                                    <AnimatePresence>
                                        {part && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                onClick={() => removePart(key)}
                                                className="p-2.5 text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/40 rounded-2xl transition-colors flex-shrink-0"
                                                whileHover={{ scale: 1.15 }}
                                                whileTap={{ scale: 0.93 }}
                                                tabIndex={0}
                                                aria-label={`Remove ${label}`}
                                            >
                                                <Trash2 size={20} />
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Total & Actions */}
                <div className="px-10 py-8 border-t flex flex-col space-y-4"
                     style={{
                         borderColor: 'rgba(170,180,210,0.16)'
                     }}>
                    {/* Total Price */}
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold uppercase"
                              style={{
                                  color: isDark ? '#9ca3af' : '#174bde',
                                  fontFamily: "'Bebas Neue', cursive",
                                  letterSpacing: "2.5px"
                              }}>
                            Estimated Total
                        </span>
                        <motion.div
                            key={totalPrice}
                            initial={{ scale: 1.07 }}
                            animate={{ scale: 1 }}
                            className="text-3xl font-extrabold text-black dark:text-white"
                            style={{
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2.5px"
                            }}>
                            ${totalPrice.toLocaleString()}
                        </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 mt-2">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.995 }}
                            disabled={selectedCount === 0}
                            onClick={handleSaveBuild}
                            className="w-full py-3 bg-gradient-to-r from-blue-700 to-blue-500 disabled:from-gray-400 disabled:to-gray-600 text-white rounded-2xl font-bold shadow-md transition-colors flex items-center justify-center gap-2 uppercase"
                            style={{
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2px"
                            }}
                        >
                            <Save size={19} />
                            Save Build
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.995 }}
                            onClick={handleLoadBuild}
                            className="w-full py-3 bg-white dark:bg-gray-800 border-2 border-green-500 dark:border-green-400 text-green-600 dark:text-green-300 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 uppercase shadow"
                            style={{
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2px"
                            }}
                        >
                            <Package size={19} />
                            Load Saved Build
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.995 }}
                            disabled={selectedCount === 0}
                            onClick={handleShareBuild}
                            className="w-full py-3 bg-white dark:bg-gray-800 border dark:border-gray-800 dark:text-white text-gray-700 rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 uppercase shadow"
                            style={{
                                fontFamily: "'Bebas Neue', cursive",
                                letterSpacing: "2px"
                            }}
                        >
                            <Share2 size={19} />
                            Share Build
                        </motion.button>

                        {selectedCount > 0 && (
                            <motion.button
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.99 }}
                                onClick={clearBuild}
                                className="w-full py-3 text-red-600 dark:text-red-300 bg-transparent rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 uppercase border border-red-200 dark:border-red-700 shadow"
                                style={{
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "2px"
                                }}
                            >
                                <Trash2 size={19} />
                                Clear All
                            </motion.button>
                        )}
                    </div>

                    {/* Success Messages */}
                    <AnimatePresence>
                        {showSaveSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-3 p-3 rounded-xl text-center font-bold text-sm uppercase"
                                style={{
                                    background: 'linear-gradient(90deg, #10b981, #059669)',
                                    color: 'white',
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "1.5px"
                                }}
                            >
                                ✓ Build Saved Successfully!
                            </motion.div>
                        )}

                        {showLoadSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-3 p-3 rounded-xl text-center font-bold text-sm uppercase"
                                style={{
                                    background: 'linear-gradient(90deg, #3b82f6, #2563eb)',
                                    color: 'white',
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "1.5px"
                                }}
                            >
                                ✓ Build Loaded Successfully!
                            </motion.div>
                        )}

                        {showShareSuccess && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="mt-3 p-3 rounded-xl text-center font-bold text-sm uppercase"
                                style={{
                                    background: 'linear-gradient(90deg, #8b5cf6, #7c3aed)',
                                    color: 'white',
                                    fontFamily: "'Bebas Neue', cursive",
                                    letterSpacing: "1.5px"
                                }}
                            >
                                ✓ Build Copied to Clipboard!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default BuildSummary;
