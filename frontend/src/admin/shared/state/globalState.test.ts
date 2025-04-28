import { create } from 'zustand';
import { GlobalStore, slices } from '@admin/shared/state/globalState';

test('test_RootStore_各Sliceのキーが重複しないこと', () => {
    // Given
    const keys = new Set<string>();
    const checkDuplicateKeys = (slice: Record<string, unknown>) => {
        for (const key of Object.keys(slice)) {
            if (keys.has(key)) {
                throw new Error(`キー "${key}" が重複しています！キーは一意である必要があります。`);
            }
            keys.add(key);
        }
    };

    // When
    create<GlobalStore>()((...args) => {
        const createdSlices = slices.map((createSlice) => createSlice(...args));
        createdSlices.forEach(checkDuplicateKeys);

        // Return merged store
        return {} as GlobalStore;
    });
});
