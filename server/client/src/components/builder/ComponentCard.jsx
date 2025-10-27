


import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check, AlertCircle } from 'lucide-react';
import { componentAPI } from '../../api/api';
import useBuilderStore from '../../store/builderStore';

const ComponentCard = ({ type, title, icon: Icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { selectedParts, selectPart } = useBuilderStore();
    const selectedComponent = selectedParts[type];

    useEffect(() => {
        const fetchComponents = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log(`Fetching components for type: ${type}`);

                const response = await componentAPI.getByType(type);

                console.log(`Response for ${type}:`, response);

                if (response.data && response.data.data) {
                    setComponents(response.data.data);
                    console.log(`Loaded ${response.data.data.length} components for ${type}`);
                } else {
                    throw new Error('Invalid response structure');
                }
            } catch (error) {
                console.error(`Error fetching ${type} components:`, error);
                console.error('Error details:', {
                    message: error.message,
                    response: error.response?.data,
                    status: error.response?.status,
                    url: error.config?.url
                });
                setError(`Failed to load ${title.toLowerCase()}`);
                setComponents([]);
            } finally {
                setLoading(false);
            }
        };

        if (isOpen && components.length === 0) {
            fetchComponents();
        }
    }, [isOpen, type, title]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative"
        >
            <div className="rounded-2xl border overflow-hidden transition-all duration-300"
                 style={{
                     backgroundColor: 'var(--color-bg-secondary)',
                     borderColor: 'var(--color-border)'
                 }}>

                {/* Header */}
                <div className="p-5 border-b"
                     style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {Icon && (
                                <Icon
                                    size={24}
                                    strokeWidth={1.5}
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                            )}
                            <div>
                                <h3 className="text-base font-semibold"
                                    style={{ color: 'var(--color-text-primary)' }}>
                                    {title}
                                </h3>
                                {selectedComponent && (
                                    <p className="text-xs flex items-center gap-1 mt-0.5"
                                       style={{ color: 'var(--color-success)' }}>
                                        <Check size={12} />
                                        Selected
                                    </p>
                                )}
                            </div>
                        </div>

                        {selectedComponent && (
                            <span className="text-sm font-medium"
                                  style={{ color: 'var(--color-accent)' }}>
                ${selectedComponent.price}
              </span>
                        )}
                    </div>
                </div>

                {/* Dropdown Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full px-5 py-4 flex items-center justify-between transition-colors group/btn"
                    style={{
                        backgroundColor: 'var(--color-bg-tertiary)',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                    }}
                >
          <span className="text-sm font-medium truncate"
                style={{ color: 'var(--color-text-primary)' }}>
            {selectedComponent ? selectedComponent.name : `Choose ${title}`}
          </span>

                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: 'var(--color-text-secondary)' }}
                    >
                        <ChevronDown size={18} strokeWidth={2} />
                    </motion.div>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden border-t"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <div className="max-h-80 overflow-y-auto">
                                {loading ? (
                                    <div className="p-8 text-center">
                                        <div className="inline-block">
                                            <div className="animate-spin">
                                                <div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full"></div>
                                            </div>
                                        </div>
                                        <p className="text-sm mt-3" style={{ color: 'var(--color-text-secondary)' }}>
                                            Loading components...
                                        </p>
                                    </div>
                                ) : error ? (
                                    <div className="p-6 text-center">
                                        <div className="flex justify-center mb-3">
                                            <AlertCircle size={24} style={{ color: 'var(--color-error)' }} />
                                        </div>
                                        <p className="text-sm font-medium" style={{ color: 'var(--color-error)' }}>
                                            {error}
                                        </p>
                                        <p className="text-xs mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            Check console for details
                                        </p>
                                    </div>
                                ) : components.length > 0 ? (
                                    <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                                        {components.map((component) => (
                                            <motion.button
                                                key={component._id}
                                                onClick={() => {
                                                    selectPart(type, component);
                                                    setIsOpen(false);
                                                }}
                                                className="w-full px-5 py-4 flex items-center justify-between text-left group/item transition-colors"
                                                style={{
                                                    backgroundColor: 'var(--color-bg-secondary)',
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--color-bg-tertiary)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)';
                                                }}
                                                whileHover={{ x: 4 }}
                                                transition={{ duration: 0.15 }}
                                            >
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium truncate"
                                                       style={{ color: 'var(--color-text-primary)' }}>
                                                        {component.name}
                                                    </p>
                                                    <p className="text-xs mt-0.5"
                                                       style={{ color: 'var(--color-text-secondary)' }}>
                                                        {component.brand}
                                                    </p>
                                                </div>

                                                <span className="ml-4 text-sm font-semibold flex-shrink-0"
                                                      style={{ color: 'var(--color-accent)' }}>
                          ${component.price}
                        </span>
                                            </motion.button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 text-center">
                                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            No components available
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default ComponentCard;
