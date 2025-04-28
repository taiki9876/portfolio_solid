type Props = {
    unreadCount: number;
};
export const UnreadCount = ({ unreadCount }: Props) => {
    const count = displayUnreadCount(unreadCount);

    if (count === 0) {
        return null;
    }
    return <span>{count}</span>;
};

const displayUnreadCount = (unreadCount: number) => {
    if (unreadCount >= 100) {
        return '99+';
    }
    if (unreadCount > 0) {
        return unreadCount;
    }

    return unreadCount;
};
