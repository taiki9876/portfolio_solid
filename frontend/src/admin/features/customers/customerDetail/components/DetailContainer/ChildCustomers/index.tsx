import { SectionTitle } from '@admin/shared/components/Ui/DetailComponents/SectionTitle';
import commonStyles from '../DetailContainer.module.css';
import styles from './ChildCustomer.module.css';
import { ChildCustomerItem, ChildrenItemType } from './ChildCustomerItem';

const dummyChildren: ChildrenItemType[] = [
    { name: '高橋 剣', id: '3216549' },
    { name: '橋本 健一郎', id: '69841659' },
    { name: '浜崎 まい', id: '6922486' },
];
export const ChildCustomers = () => {
    return (
        <div className={commonStyles.infoSection} style={{ marginTop: '-20px' }}>
            <SectionTitle title="子会員" />
            <div className={styles.children}>
                {dummyChildren.map((item) => (
                    <ChildCustomerItem item={item} key={item.id} />
                ))}
            </div>
        </div>
    );
};
