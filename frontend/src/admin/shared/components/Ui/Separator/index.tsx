import styles from './Separator.module.css';

type Props = {
    isBorder?: boolean;
    marginLevel?: 'verySmall' | 'small' | 'medium' | 'large';
};
export const Separator = ({ isBorder = true, marginLevel = 'medium' }: Props) => {
    return <hr className={`${styles[marginLevel]} ${isBorder ? styles.hrBorder : ''}`} />;
};
