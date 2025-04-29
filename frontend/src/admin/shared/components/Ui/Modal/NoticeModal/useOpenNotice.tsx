import { useModalStore } from '@admin/shared/state/globalState';
import { NoticeModal } from './index';

export const useOpenNotice = () => {
    const { openModal } = useModalStore();

    const handleOpenNotice = (
        title: string,
        content: string,
        date?: string,
        action?: { label: string; onClick: () => void }
    ) => {
        openModal({
            title: title,
            widthSize: 'medium',
            verticalCenter: false,
            renderBody: () => <NoticeModal content={content} date={date} action={action} />,
        });
    };

    return { handleOpenNotice };
};
