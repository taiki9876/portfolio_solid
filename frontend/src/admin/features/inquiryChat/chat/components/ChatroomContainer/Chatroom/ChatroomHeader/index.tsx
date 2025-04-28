import { Avatar } from '@admin/shared/components/Ui/Avatar';
import { SmallLoading } from '@admin/shared/components/Ui/Loading/SmallLoading';
import { ErrorMessage } from '@admin/shared/components/Ui/Typography/ErrorMessage';
import { formatDate } from '@admin/shared/util/dateUtil';
import { useNavigate } from 'react-router-dom';
import { RouteNames } from '@admin/routes/routes';
import { resolvePath } from '@admin/routes/type';
import styles from './ChatroomHeader.module.css';
import { useFetchCustomerQuery } from './useFetchCustomerQuery';
import { StatusChange } from './StatusChange';
import { Memo } from './Memo';

export const ChatroomHeader = () => {
    const { customer, isLoading } = useFetchCustomerQuery();
    const navigate = useNavigate();

    return (
        <div className={styles.headerContainer}>
            <div className={styles.leftContainer}>
                <Avatar imgPath={customer?.avatarImageUrl ?? undefined} />
                {isLoading ? (
                    <div className={styles.loading}>
                        <SmallLoading />
                    </div>
                ) : customer !== undefined ? (
                    <div className={styles.info}>
                        <div
                            onClick={() =>
                                navigate(
                                    resolvePath(RouteNames.customerDetail, {
                                        customerCode: customer.customerCode,
                                    })
                                )
                            }
                        >
                            <span className={styles.name}>{customer.customerName}</span>
                        </div>
                        <div>
                            顧客ID：{customer.customerId} ランク：{customer.rank}
                        </div>
                        <div>
                            {customer.birthday !== null && (
                                <span>
                                    {formatDate(customer.birthday)} ({customer.age}歳){' '}
                                </span>
                            )}
                            {customer.gender}
                        </div>
                        <div>
                            {customer.entryAt !== null && (
                                <span>新規登録日：{formatDate(customer.entryAt)}</span>
                            )}{' '}
                            {customer.lastVisitAt !== null && (
                                <span>最終来店日：{formatDate(customer.lastVisitAt)}</span>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={styles.errorContainer}>
                        <ErrorMessage message="会員情報が取得できませんでした" withIcon={true} />
                    </div>
                )}
            </div>

            <div className={styles.rightContainer}>
                <StatusChange />
                {customer !== undefined && <Memo customer={customer} />}
            </div>
        </div>
    );
};
