import styles from './HeaderItem.module.css';

type Props = {
    text: string;
};

export const HeaderItem = ({ text }: Props) => {
    return <th className={styles.text}>{text}</th>;
};
