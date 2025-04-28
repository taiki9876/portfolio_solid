import baseStyles from '../Placeholder.module.css';
import styles from './TableRowPlaceholder.module.css';

export const TableRowPlaceholder = () => {
    return <div className={`${baseStyles.placeholder} ${styles.row}`} />;
};
