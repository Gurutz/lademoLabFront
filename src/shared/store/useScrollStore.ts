import { create } from 'zustand'

interface ScrollState {
    horizontalScroll: number;
    activeSectionId: string | null;
    setScrollData: (progress : number, id: string | null) => void;
}

// const initialState : ScrollState = {
//     horizontalScroll: 0,
//     activeSectionId: null,
//     setScrollData(progress, id) {
//         this.horizontalScroll = progress;
//         this.activeSectionId = id;
//     },
// }


export const useScrollStore = create<ScrollState>()((set) => ({
    horizontalScroll: 0,
    activeSectionId: null,
    setScrollData(progress, id) {
        set({ horizontalScroll: progress, activeSectionId: id });
    },
}));