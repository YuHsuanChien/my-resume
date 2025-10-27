import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  experienceAlertIsOpen?: boolean;
  setExperienceAlertIsOpen?: (isOpen: boolean) => void;
}

interface ExperienceAlertState {
  experienceAlertIsOpen: boolean;
  type: string;
  setExperienceAlertIsOpen: (isOpen: boolean) => void;
  setType: (type: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export const useExperienceAlertStore = create<ExperienceAlertState>((set) => ({
  experienceAlertIsOpen: false,
  type: 'all',
  setExperienceAlertIsOpen: (isOpen) => set({ experienceAlertIsOpen: isOpen }),
  setType: (type: string) => set({ type: type }),
}));
