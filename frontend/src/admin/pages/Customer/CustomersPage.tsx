import { RouteNames } from '@admin/routes/routes';
import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { CustomerHeader } from '@admin/features/customers/customerList/components/CustomerHeader';
import { CustomersTable } from '@admin/features/customers/customerList/components/CustomesTable';

export const CustomersPage = () => {
    return (
        <PageContainer
            routeNames={[RouteNames.home, RouteNames.customers]}
            pageTitle="会員"
            headerComponent={<CustomerHeader />}
        >
            <CustomersTable />
        </PageContainer>
    );
};
