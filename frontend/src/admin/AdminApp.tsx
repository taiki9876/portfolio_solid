import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppInitialContainer } from '@admin/shared/components/Container/AppInitialContainer';
import { Header } from '@admin/shared/components/Layout/Header';
import { ErrorBoundary } from '@admin/shared/components/Ui/ErrorBoundary';
import { SideNav } from '@admin/shared/components/Layout/SideNav';
import { ModalWithStore } from '@admin/shared/components/Ui/Modal';
import { LoadingWithStore } from '@admin/shared/components/Ui/Loading';
import { ToastWithStore } from '@admin/shared/components/Ui/Toast';
import { QueryClientProvider } from '@admin/shared/components/Container/QueryClientProvider';
import { MainContent } from './routes/Router';
import '@admin/assets/styles/colors.css';
import '@admin/assets/styles/reset.css';

export const AdminApp = () => {
    return (
        <ApplicationContainer>
            <Header />
            <SideNav />
            <MainContent />
        </ApplicationContainer>
    );
};

const ApplicationContainer = ({ children }: { children: ReactNode }) => {
    return (
        <ErrorBoundary>
            <AppInitialContainer>
                <QueryClientProvider>
                    <ModalWithStore />
                    <ToastWithStore />
                    <LoadingWithStore />
                    <BrowserRouter>{children}</BrowserRouter>
                </QueryClientProvider>
            </AppInitialContainer>
        </ErrorBoundary>
    );
};
