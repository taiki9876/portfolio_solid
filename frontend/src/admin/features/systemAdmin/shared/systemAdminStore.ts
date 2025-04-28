import { create } from 'zustand';

type ContractSearchConditions = {
    word: string;
};
type SystemAdminStore = {
    contractSearchConditions: ContractSearchConditions;
    setContractSearchConditions: (conditions: ContractSearchConditions) => void;

    shopSearchWord: string;
    setShopSearchWord: (word: string) => void;

    managementNoticeSearchWord: string;
    setManagementNoticeSearchWord: (word: string) => void;
};

export const useSystemAdminStore = create<SystemAdminStore>()((set) => ({
    contractSearchConditions: { word: '' },
    setContractSearchConditions: (conditions: ContractSearchConditions) =>
        set(() => ({ contractSearchConditions: conditions })),

    shopSearchWord: '',
    setShopSearchWord: (word: string) => set(() => ({ shopSearchWord: word })),

    managementNoticeSearchWord: '',
    setManagementNoticeSearchWord: (word: string) =>
        set(() => ({ managementNoticeSearchWord: word })),
}));
