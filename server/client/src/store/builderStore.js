import { create } from 'zustand';

const useBuilderStore = create((set, get) => ({
    selectedParts: {
        cpu: null,
        gpu: null,
        motherboard: null,
        ram: null,
        storage: null,
        psu: null,
        case: null
    },
    totalPrice: 0,

    selectPart: (type, part) => {
        set((state) => {
            const oldPart = state.selectedParts[type];
            const oldPrice = oldPart ? oldPart.price : 0;

            return {
                selectedParts: {
                    ...state.selectedParts,
                    [type]: part
                },
                totalPrice: state.totalPrice - oldPrice + part.price
            };
        });
    },

    removePart: (type) => {
        set((state) => {
            const part = state.selectedParts[type];
            if (!part) return state;

            return {
                selectedParts: {
                    ...state.selectedParts,
                    [type]: null
                },
                totalPrice: state.totalPrice - part.price
            };
        });
    },

    clearBuild: () => {
        set({
            selectedParts: {
                cpu: null,
                gpu: null,
                motherboard: null,
                ram: null,
                storage: null,
                psu: null,
                case: null
            },
            totalPrice: 0
        });
    },

    getSelectedCount: () => {
        const parts = get().selectedParts;
        return Object.values(parts).filter(part => part !== null).length;
    },

    // NEW METHOD FOR LOADING BUILDS
    loadBuild: (buildData) => {
        set({
            selectedParts: buildData.parts,
            totalPrice: buildData.totalPrice
        });
    },
}));

export default useBuilderStore;
