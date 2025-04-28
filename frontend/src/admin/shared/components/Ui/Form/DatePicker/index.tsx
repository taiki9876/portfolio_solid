import { formatDate } from '@admin/shared/util/dateUtil';
import { FormLabel } from '@admin/shared/components/Ui/Form/FormLabel';
import { ModalBackground } from '@admin/shared/components/Ui/Modal/BaseModal';
import { useSwitch } from '@src/shared/hooks/useSwitch';
import { Colors } from '@admin/assets/styles/colors';
import { CalendarIcon } from '@admin/shared/components/Ui/Icon/CalendarIcon';
import { Z_INDEX_MODAL } from '@admin/constants';
import { TimePicker } from './TimePicker';
import { Calendar } from './Calendar';
import styles from './Datepicker.module.css';
import formStyles from '../Form.module.css';

//日付と時刻を選択するためのコンポーネント
type Props = {
    label?: string;
    required?: boolean;
    onReset?: () => void;
    onDateChange: (date: string) => void;
    value?: string;
    withTime?: boolean;
    onTimeChange?: (hour: string | undefined, minute: string | undefined) => void;
    placeholder?: string;
    error?: {
        message?: string;
    };
};
export const DatePicker = ({
    label,
    required,
    onReset,
    onDateChange,
    onTimeChange,
    value,
    withTime,
    placeholder,
    error,
}: Props) => {
    const { isOn, on, off } = useSwitch();

    return (
        <div className={formStyles.container}>
            <FormLabel label={label} required={required} />
            <div
                className={`${styles.input} ${error !== undefined ? formStyles.error : ''}`}
                onClick={on}
                data-testid="calendar-input"
            >
                <span className={styles.placeholder} data-testid="calendar-input-placeholder">
                    {placeholderFormat(value, withTime, placeholder)}
                </span>

                <div className={styles.icon}>
                    <CalendarIcon color={Colors.text} />
                </div>
            </div>
            {error !== undefined && <p className={formStyles.errorMessage}>{error?.message}</p>}

            {isOn && (
                <ModalBackground onClose={off}>
                    <div className={styles.pickerContainer} style={{ zIndex: Z_INDEX_MODAL }}>
                        <Calendar
                            selectedDate={value}
                            onDateChange={onDateChange}
                            onReset={onReset}
                        />
                        {withTime === true && onTimeChange !== undefined && (
                            <TimePicker selectedDate={value} onTimeChange={onTimeChange} />
                        )}
                    </div>
                </ModalBackground>
            )}
        </div>
    );
};

const placeholderFormat = (
    selectedDate: string | undefined,
    withTime: boolean = false,
    defaultString: string = ''
): string => {
    if (selectedDate === undefined) {
        return defaultString;
    }

    return formatDate(selectedDate, { withTime });
};
