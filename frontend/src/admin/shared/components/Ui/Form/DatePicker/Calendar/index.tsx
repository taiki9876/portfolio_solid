import { useState } from 'react';
import { isSameDate, isToday, now } from '@admin/shared/util/dateUtil';
import { ArrowLeftIcon } from '@admin/shared/components/Ui/Icon/ArrowLeftIcon';
import { ArrowRightIcon } from '@admin/shared/components/Ui/Icon/ArrowRightIcon';
import styles from './Calendar.module.css';

type Props = {
    onDateChange: (date: string) => void;
    onReset?: () => void;
    selectedDate?: string;
};
export const Calendar = ({ selectedDate, onDateChange, onReset }: Props) => {
    const [currentDate, setCurrentDate] = useState(now());

    // 現在の月の開始日と終了日を取得
    const startOfMonth = currentDate.startOf('month');
    const nonBlocks = Array(startOfMonth.day()).fill(null); // 月の初日の曜日までの空白を埋める

    // 月の日数を取得
    const daysInMonth = currentDate.daysInMonth();

    // 現在の月の日付をリストとして生成
    const days = Array.from({ length: daysInMonth }, (_, i) => startOfMonth.add(i, 'day'));

    // 月を切り替える
    const toPreviousMonth = () => setCurrentDate(currentDate.subtract(1, 'month'));
    const toNextMonth = () => setCurrentDate(currentDate.add(1, 'month'));

    return (
        <div className={styles.calendar} data-testid="calendar-form">
            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerInfo}>
                    <ArrowLeftIcon onClick={toPreviousMonth} />
                    <h2>{currentDate.format('YYYY年 M月')}</h2>
                    <ArrowRightIcon onClick={toNextMonth} />
                </div>
                {onReset !== undefined && (
                    <div
                        className={styles.resetButton}
                        onClick={() => {
                            setCurrentDate(now());
                            onReset();
                        }}
                        data-testid="calendar-form-reset"
                    >
                        リセット
                    </div>
                )}
            </div>

            {/* 曜日 */}
            <div className={styles.weekdays}>
                {['日', '月', '火', '水', '木', '金', '土'].map((day, index) => (
                    <div key={index} className={styles.weekday}>
                        {day}
                    </div>
                ))}
            </div>

            {/* 日付 */}
            <div className={styles.days}>
                {nonBlocks.map((_, index) => (
                    <div key={`nonblock-${index}`} />
                ))}
                {days.map((day) => {
                    return (
                        <div
                            key={day.format('YYYY-MM-DD')}
                            className={`
                              ${styles.day}
                              ${isToday(day) ? styles.today : ''}
                              ${selectedDate !== undefined && isSameDate(selectedDate, day) ? styles.selected : ''}
                            `}
                            onClick={() => onDateChange(day.format('YYYY-MM-DD'))}
                        >
                            {day.date()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
