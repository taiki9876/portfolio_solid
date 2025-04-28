import { Dropdown, DropDownOption } from '@admin/shared/components/Ui/Form/Dropdown';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { useInquiryStore } from '@admin/features/inquiryChat/state/useInquiryStore';
import { FilterStatusMenu } from './FilterStatusMenu';
import styles from './FilterMenu.module.css';
import { SearchNameInput } from './SearchNameInput';

// とりあえずのダミーデータ
const dummyOptions: DropDownOption[] = [{ label: 'ただいま準備中です', value: '1' }];
export const FilterMenu = () => {
    const { on, isOn, off } = useSwitch();
    const currentTab = useInquiryStore((state) => state.currentTab);

    return (
        <div className={styles.container}>
            {currentTab === 'staff' && (
                <div className={styles.row}>
                    <Dropdown
                        options={dummyOptions}
                        onChange={() => {}}
                        isDisplayIcon={true}
                        placeholder="スタッフ選択"
                    />
                </div>
            )}

            <div className={`${styles.filterRow} ${styles.row}`}>
                <FilterStatusMenu onClick={on} isOpen={isOn} closeMenu={off} />
                <SearchNameInput />
            </div>
        </div>
    );
};
