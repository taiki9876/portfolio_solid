import styles from './SectionTitle.module.css';

type Props = {
    title: string;
};
export const SectionTitle = ({ title }: Props) => {
    return <div className={styles.title}>{title}</div>;
};
