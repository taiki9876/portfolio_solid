import { formatDate, isThisYear, isToday } from '@admin/shared/util/dateUtil';
import { dayjs } from '@admin/shared/lib/dayjs';
import styles from '../RoomInfo.module.css';

type Props = {
    lastMessageUpdatedAt: Date | null;
};
export const LastMessageUpdatedAt = ({ lastMessageUpdatedAt }: Props) => {
    return (
        <div className={styles.subInfo}>{displayLastMessageUpdatedAt(lastMessageUpdatedAt)}</div>
    );
};

const displayLastMessageUpdatedAt = (lastMessageUpdatedAt: Date | null) => {
    if (lastMessageUpdatedAt === null) {
        return '';
    }

    if (isToday(lastMessageUpdatedAt)) {
        return '今日';
    }
    if (isToday(dayjs(lastMessageUpdatedAt).add(1, 'day'))) {
        return '昨日';
    }
    if (isToday(dayjs(lastMessageUpdatedAt).add(2, 'day'))) {
        return '一昨日';
    }

    return formatDate(lastMessageUpdatedAt, { withYear: !isThisYear(lastMessageUpdatedAt) });
};
