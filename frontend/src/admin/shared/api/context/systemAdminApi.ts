import { ADMIN_API_ENDPOINT } from '@admin/env';
import { apiClient } from '@admin/shared/lib/axios';
import {
    isValidationErrorCode,
    makeServerValidationError,
    responseOk,
    ValidationErrors,
} from '@admin/shared/util/networkUtil';
import {
    ContractApiResource,
    ContractSummaryApiResource,
    convertToContract,
    convertToContractSummary,
    convertToOwnerAdmin,
    OwnerAdminApiResource,
} from '@admin/domain/contract/transform';
import {
    ContractCreateFormValues,
    ContractEditFormValues,
} from '@admin/domain/contract/form/formValue';
import { ShopFormValues } from '@admin/domain/shop/form/formValue';
import { convertToShop, ShopApiResource } from '@admin/domain/shop/transform';
import {
    AdminManagementNoticeApiResource,
    convertToAdminManagementNotice,
} from '@admin/domain/managementNotices/transform';
import { ManagementNoticeFormValues } from '@admin/domain/managementNotices/form/formValue';

export const systemAdminApiPath = {
    fetchContractName: (contractId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/name`,
    fetchContracts: `${ADMIN_API_ENDPOINT}/system-admin/contracts`,
    fetchContract: (contractId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}`,
    postContract: `${ADMIN_API_ENDPOINT}/system-admin/contracts`,
    editContract: (contractId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}`,
    fetchShops: (contractId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/shops`,
    fetchShop: (contractId: number, shopId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/shops/${shopId}`,
    postShop: (contractId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/shops`,
    editShop: (contractId: number, shopId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/shops/${shopId}`,
    deleteShop: (contractId: number, shopId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/contracts/${contractId}/shops/${shopId}`,
    changeSupportAccount: `${ADMIN_API_ENDPOINT}/system-admin/change-support-account`,
    changeSystemAccount: `${ADMIN_API_ENDPOINT}/system-admin/change-system-account`,

    fetchManagementNotices: `${ADMIN_API_ENDPOINT}/system-admin/management-notices`,
    fetchManagementNotice: (noticeId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/management-notices/${noticeId}`,
    postManagementNotice: `${ADMIN_API_ENDPOINT}/system-admin/management-notices`,
    editManagementNotice: (noticeId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/management-notices/${noticeId}`,
    deleteManagementNotice: (noticeId: number) =>
        `${ADMIN_API_ENDPOINT}/system-admin/management-notices/${noticeId}`,
};

export const systemAdminApi = {
    fetchContractName: async (contractId: number) => {
        const res = await apiClient.get<{ contractName: string }>(
            systemAdminApiPath.fetchContractName(contractId)
        );
        if (responseOk(res.status)) {
            return res.data.contractName;
        }

        throw new Error('契約名の取得に失敗しました。');
    },
    fetchContracts: async (searchWord: string) => {
        const res = await apiClient.get<{ contracts: ContractApiResource[] }>(
            systemAdminApiPath.fetchContracts,
            { params: { searchWord } }
        );
        if (responseOk(res.status)) {
            return res.data.contracts.map(convertToContract);
        }

        throw new Error('契約一覧の取得に失敗しました。');
    },
    fetchContract: async (contractId: number) => {
        const res = await apiClient.get<{
            contract: ContractSummaryApiResource;
            admin: OwnerAdminApiResource;
        }>(systemAdminApiPath.fetchContract(contractId));
        if (responseOk(res.status)) {
            const { contract, admin } = res.data;
            return {
                contractSummary: convertToContractSummary(contract),
                ownerAdmin: convertToOwnerAdmin(admin),
            };
        }

        throw new Error('サポートアカウントへの切り替えに失敗しました。');
    },
    postContract: async (params: ContractCreateFormValues): Promise<number | ValidationErrors> => {
        try {
            const res = await apiClient.post<{ contractId: number }>(
                systemAdminApiPath.postContract,
                params
            );

            if (responseOk(res.status)) {
                return res.data.contractId;
            }

            throw new Error('契約の保存に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('契約の保存に失敗しました。');
        }
    },
    editContract: async (
        contractId: number,
        params: ContractEditFormValues
    ): Promise<number | ValidationErrors> => {
        try {
            const res = await apiClient.patch<{ contractId: number }>(
                systemAdminApiPath.editContract(contractId),
                params
            );

            if (responseOk(res.status)) {
                return res.data.contractId;
            }

            throw new Error('契約の保存に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('契約の保存に失敗しました。');
        }
    },
    fetchShops: async (contractId: number, searchWord: string) => {
        const res = await apiClient.get<{ shops: ShopApiResource[] }>(
            systemAdminApiPath.fetchShops(contractId),
            { params: { searchWord } }
        );
        if (responseOk(res.status)) {
            return res.data.shops.map(convertToShop);
        }

        throw new Error('契約一覧の取得に失敗しました。');
    },
    fetchShop: async (contractId: number, shopId: number) => {
        const res = await apiClient.get<{ shop: ShopApiResource }>(
            systemAdminApiPath.fetchShop(contractId, shopId)
        );
        if (responseOk(res.status)) {
            return convertToShop(res.data.shop);
        }

        throw new Error('契約一覧の取得に失敗しました。');
    },
    postShop: async (
        contractId: number,
        params: ShopFormValues
    ): Promise<number | ValidationErrors> => {
        try {
            const res = await apiClient.post<{ shopId: number }>(
                systemAdminApiPath.postShop(contractId),
                params,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (responseOk(res.status)) {
                return res.data.shopId;
            }

            throw new Error('Shopの保存に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('Shopの保存に失敗しました。');
        }
    },
    editShop: async (
        contractId: number,
        shopId: number,
        params: ShopFormValues
    ): Promise<number | ValidationErrors> => {
        try {
            const res = await apiClient.post<{ shopId: number }>(
                systemAdminApiPath.editShop(contractId, shopId),
                params,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (responseOk(res.status)) {
                return res.data.shopId;
            }

            throw new Error('Shopの更新に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('Shopの保存に失敗しました。');
        }
    },
    deleteShop: async (contractId: number, shopId: number) => {
        const res = await apiClient.delete<{ isSuccess: boolean }>(
            systemAdminApiPath.deleteShop(contractId, shopId)
        );

        if (responseOk(res.status)) {
            return res.data.isSuccess;
        }
    },
    changeSupportAccount: async (contractKey: string) => {
        const res = await apiClient.post<{ isSuccess: boolean }>(
            systemAdminApiPath.changeSupportAccount,
            { contractKey }
        );
        if (responseOk(res.status)) {
            return res.data.isSuccess;
        }

        throw new Error('サポートアカウントへの切り替えに失敗しました。');
    },
    changeSystemAccount: async () => {
        const res = await apiClient.post<{ isSuccess: boolean }>(
            systemAdminApiPath.changeSystemAccount
        );
        if (responseOk(res.status)) {
            return res.data.isSuccess;
        }

        throw new Error('システム管理者への切り替えに失敗しました。');
    },
    fetchManagementNotices: async (searchWord: string) => {
        const res = await apiClient.get<{ notices: AdminManagementNoticeApiResource[] }>(
            systemAdminApiPath.fetchManagementNotices,
            { params: { searchWord } }
        );

        if (responseOk(res.status)) {
            return res.data.notices.map(convertToAdminManagementNotice);
        }

        throw new Error('運営からのお知らせ一覧の取得に失敗しました。');
    },
    fetchManagementNotice: async (noticeId: number) => {
        const res = await apiClient.get<{ notice: AdminManagementNoticeApiResource }>(
            systemAdminApiPath.fetchManagementNotice(noticeId)
        );
        if (responseOk(res.status)) {
            return convertToAdminManagementNotice(res.data.notice);
        }

        throw new Error('運営からのお知らせの取得に失敗しました。');
    },
    postManagementNotice: async (params: ManagementNoticeFormValues) => {
        try {
            const res = await apiClient.post<{ noticeId: number }>(
                systemAdminApiPath.postManagementNotice,
                params
            );
            if (responseOk(res.status)) {
                return res.data.noticeId;
            }

            throw new Error('運営からのお知らせの保存に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('運営からのお知らせの保存に失敗しました。');
        }
    },
    editManagementNotice: async (noticeId: number, params: ManagementNoticeFormValues) => {
        try {
            const res = await apiClient.patch<{ noticeId: number }>(
                systemAdminApiPath.editManagementNotice(noticeId),
                params
            );

            if (responseOk(res.status)) {
                return res.data.noticeId;
            }

            throw new Error('運営からのお知らせの更新に失敗しました。');
        } catch (error: unknown) {
            if (isValidationErrorCode(error)) {
                return makeServerValidationError(error);
            }

            throw new Error('運営からのお知らせの保存に失敗しました。');
        }
    },
    deleteManagementNotice: async (noticeId: number) => {
        const res = await apiClient.delete<{ isSuccess: boolean }>(
            systemAdminApiPath.deleteManagementNotice(noticeId)
        );

        if (responseOk(res.status)) {
            return res.data.isSuccess;
        }
    },
};
