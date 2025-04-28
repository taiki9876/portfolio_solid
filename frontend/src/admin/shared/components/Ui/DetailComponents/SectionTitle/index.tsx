import { ActionButton } from '@admin/shared/components/Ui/Button/ActionButton';
import styles from './SectionTitle.module.css';

type Props = {
    title: string;
    titleVariant?: 'normal' | 'primary';
    onEdit?: {
        label: string;
        onClick: () => void;
    };
};
export const SectionTitle = ({ title, titleVariant = 'normal', onEdit }: Props) => {
    return (
        <div
            className={`${styles.sectionTitleBox} ${titleVariant === 'primary' ? styles.titlePrimary : ''}`}
        >
            <span>{title}</span>
            {onEdit !== undefined && (
                <ActionButton label={onEdit.label} onClick={onEdit.onClick} variant="normal" />
            )}
        </div>
    );
};
