import { KebabMenuIcon } from '@admin/shared/components/Ui/Icon/KebabMenuIcon';
import { IconSize } from '@admin/shared/components/Ui/Icon/constants';
import { Colors } from '@admin/assets/styles/colors';
import { Z_INDEX_MODAL } from '@admin/constants';
import { CheckboxGroup } from '@admin/shared/components/Ui/Form/CheckboxGroup';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { ModalBackground } from '@admin/shared/components/Ui/Modal/BaseModal';
import { HeaderType } from '@admin/shared/components/Ui/Table/TableHeader';
import style from './ColumnSelector.module.css';

type Props = {
    groupName: string;
    headers: HeaderType[];
    displayColumns: string[];
    onDisplayColumnsChange: (selectedValues: string[]) => void;
};
export const ColumnSelector = ({
    groupName,
    headers,
    displayColumns,
    onDisplayColumnsChange,
}: Props) => {
    const { on: openColumnSelector, off: closeColumnSelector, isOn: isOpen } = useSwitch();

    return (
        <div className={style.container}>
            <div className={style.actionButton} onClick={openColumnSelector}>
                <KebabMenuIcon color={Colors.gray400} size={IconSize.md} />
            </div>
            {isOpen && (
                <>
                    <ModalBackground onClose={closeColumnSelector} opacity={0} />
                    <div className={style.columnModal} style={{ zIndex: Z_INDEX_MODAL }}>
                        <CheckboxGroup
                            groupName={groupName}
                            selectedValues={displayColumns}
                            options={headers.map((header) => ({
                                label: header.label,
                                value: header.key,
                            }))}
                            onChange={onDisplayColumnsChange}
                            flexDirection="column"
                        />
                    </div>
                </>
            )}
        </div>
    );
};
