import { SummaryHeader } from './SummaryHeader';
import styles from './DetailContainer.module.css';
import { CustomerInfo } from './CustomerInfo';
import { TradeHistory } from './TradeHistory';
import { CustomerMemo } from './CustomerMemo';
import { CustomerImage } from './CustomerImage';
import { ChildCustomers } from './ChildCustomers';

export const DetailContainer = () => {
    return (
        <div className={styles.customerDetailContainer}>
            <SummaryHeader />
            <div className={styles.customerDetailContent}>
                <div className={styles.customerDetailContentLeft}>
                    <CustomerInfo />
                    <TradeHistory />
                </div>
                <div className={styles.customerDetailContentRight}>
                    <CustomerImage />
                    <CustomerMemo />
                    <ChildCustomers />
                </div>
            </div>
        </div>
    );
};
