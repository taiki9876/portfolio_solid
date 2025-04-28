import styles from './ChildCustomerItem.module.css';

export type ChildrenItemType = {
    id: string;
    name: string;
};
type Props = {
    item: ChildrenItemType;
};
export const ChildCustomerItem = ({ item }: Props) => {
    const { name, id } = item;

    return (
        <div className={styles.childCustomerItem}>
            <div>{name}</div>
            <div>id: {id}</div>
        </div>
    );
};
