import { Colors } from '@admin/assets/styles/colors';
import styles from './Tab.module.css';

type Props = {
    label: string;
    onClick: () => void;
    isActive: boolean;
};
export const Tab = ({ label, onClick, isActive = false }: Props) => {
    return (
        <div className={`${styles.container} ${isActive === false ? styles.hidden : ''}`}>
            <div className={styles.label}>{label}</div>
            {isActive ? (
                <ActiveTabBackground onClick={onClick} />
            ) : (
                <InActiveTabBackground onClick={onClick} />
            )}
        </div>
    );
};

type TabProps = {
    onClick: () => void;
};
const ActiveTabBackground = ({ onClick }: TabProps) => {
    return (
        <svg
            width="168"
            height="48"
            viewBox="0 0 168 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H125.781C130.993 0.5 135.857 3.11987 138.724 7.47256L167.072 50.5H0.5V8Z"
                fill="white"
                stroke="#D4D5DC"
            />
        </svg>
    );
};

const InActiveTabBackground = ({ onClick }: TabProps) => {
    return (
        <svg
            width="168"
            height="48"
            viewBox="0 0 168 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path
                d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H125.781C130.993 0.5 135.857 3.11987 138.724 7.47256L167.072 50.5H0.5V8Z"
                fill={Colors.gray100}
                stroke={Colors.gray300}
            />
        </svg>
    );
};
