import { GridItem, GridLayout } from '@admin/shared/components/Layout/GridLayout';
import { CustomerAggregate } from '../CustomerAggregate';
import { ChatSummary } from '../ChatSummary';
import { PublishedContents } from '../PublishedContents';
import { ManagementNoticeList } from '../ManagementNoticeList';
import { CustomerGraph } from '../CustomerGraph';
import styles from './Home.module.css';

const items: GridItem[] = [
    { id: 'customerAggregate', content: <CustomerAggregate />, colSpan: 2 },
    { id: 'chatSummary', content: <ChatSummary />, colSpan: 1 },
    { id: 'customerGraph', content: <CustomerGraph />, colSpan: 1 },
    { id: 'publishedContents', content: <PublishedContents />, colSpan: 3 },
    { id: 'managementNoticeList', content: <ManagementNoticeList />, colSpan: 1 },
];
export const HomeContainer = () => {
    return (
        <div className={styles.container}>
            <GridLayout columns={4} columnGap="1rem" rowGap="1rem" items={items} />
        </div>
    );
};
