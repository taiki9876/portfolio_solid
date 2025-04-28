import { Hours, Minutes, splitDate } from '@admin/shared/util/dateUtil';
import { zeroPadding } from '@admin/shared/util/numberUtil';
import { Dropdown } from '@admin/shared/components/Ui/Form';
import { DropDownOption } from '@admin/shared/components/Ui/Form/Dropdown';
import styles from './Time.module.css';

type Props = {
    onTimeChange: (hour: string | undefined, minute: string | undefined) => void;
    selectedDate?: string;
};
export const TimePicker = ({ onTimeChange, selectedDate }: Props) => {
    const splitDates =
        selectedDate !== undefined ? splitDate(selectedDate) : { hour: '-', minute: '-' };

    return (
        <div className={styles.container} data-testid="time-picker">
            <div className={styles.box}>
                <Dropdown
                    onChange={(value: string) => onTimeChange(value, undefined)}
                    options={optionHours()}
                    selectedValue={
                        splitDates.hour === '-' ? '' : zeroPadding(Number(splitDates.hour), 2)
                    }
                    isDisplayIcon={false}
                    alignCenter={true}
                    placeholder="-"
                />
            </div>

            <div className={styles.separator}>：</div>

            <div className={styles.box}>
                <Dropdown
                    onChange={(value: string) => onTimeChange(undefined, value)}
                    options={optionTimes()}
                    selectedValue={
                        splitDates.minute === '-' ? '' : zeroPadding(Number(splitDates.minute), 2)
                    }
                    isDisplayIcon={false}
                    alignCenter={true}
                    placeholder="-"
                />
            </div>
        </div>
    );
};

// 時間選択ドロップダウン
const optionHours = (): DropDownOption[] => {
    return Hours.map((hour: number): DropDownOption => {
        const h = zeroPadding(hour, 2);
        return {
            label: h,
            value: h,
        };
    });
};

// 分選択ドロップダウン
const optionTimes = (): DropDownOption[] => {
    return Minutes.map((minute: number): DropDownOption => {
        const m = zeroPadding(minute, 2);
        return {
            label: m,
            value: m,
        };
    });
};
