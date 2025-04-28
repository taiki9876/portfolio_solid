import styles from '@admin/shared/components/Ui/Form/RadioButtonGroup/RadioButtonGroup.module.css';
import { RequiredMark } from '@admin/shared/components/Ui/Form/FormLabel/RequiredMark';

type Props = {
    label?: string;
    required?: boolean;
};
export const FormLabel = ({ label, required }: Props) => {
    if (label == undefined) {
        return null;
    }

    if (required === true) {
        return (
            <div className={styles.label}>
                {label} <RequiredMark />
            </div>
        );
    }

    return <div className={styles.label}>{label}</div>;
};
