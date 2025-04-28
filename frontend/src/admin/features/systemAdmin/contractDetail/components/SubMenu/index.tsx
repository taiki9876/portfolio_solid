import { Link } from 'react-router-dom';
import styles from './SubMenu.module.css';

type Props = {
    label: string;
    pagePath: string;
};
export const SubMenu = ({ label, pagePath }: Props) => {
    return (
        <Link to={pagePath} className={styles.box}>
            {label.replace(/\n/g, '<br>')}
        </Link>
    );
};
