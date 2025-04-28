import { SectionCardBox } from '@admin/features/home/components/SectionCardBox';
import CustomerImage from '@admin/assets/images/customer_aggregate.svg';
import { SpaceBetween } from '@admin/shared/components/Layout/FlexBox/SpaceBetween';
import { Colors } from '@admin/assets/styles/colors';
import styles from './CustomerAggregate.module.css';
import { Item } from '../SectionCardBox/Item';

export const CustomerAggregate = () => {
    return (
        <SectionCardBox shouldPadding={false}>
            <img src={CustomerImage} alt="会員数" className={styles.image} />

            <SpaceBetween className={styles.resultBox}>
                <Item label="総会員数" value={1000} dif={10} />
                <Item label="本会員数" value={650} dif={8} color={Colors.green} />
                <Item label="仮会員数" value={350} dif={2} color={Colors.primary} />
                <Item label="アンインストール数" value={40} dif={2} color={Colors.yellow} />
            </SpaceBetween>
        </SectionCardBox>
    );
};
