import { useState } from 'react';
import {
    DatePicker,
    RadioButtonGroup,
    TextArea,
    TextInput,
    Dropdown,
} from '@admin/shared/components/Ui/Form';
import { PageContainer } from '@admin/shared/components/Layout/PageContainer';
import { RouteNames } from '@admin/routes/routes';
import { SectionContainer } from '@admin/shared/components/Layout/SectionContainer';
import { formatDate, now, updateDate, updateTime } from '@admin/shared/util/dateUtil';

export const FormExample = () => {
    const [formData, setFormData] = useState({
        name: '',
        gender: 'none',
        comments: '',
        birthdate: '',
        category: '',
    });

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <PageContainer routeNames={[RouteNames.home, RouteNames.formExample]}>
            <SectionContainer>
                <p>※TODO 開発用：いずれ削除する</p>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <TextInput
                        label="お名前"
                        placeholder="お名前を入力してください"
                        value={formData.name}
                        onChange={(value) => handleChange('name', value)}
                    />
                    <RadioButtonGroup
                        label="性別"
                        groupName="gender"
                        options={[
                            { value: 'male', label: '男性' },
                            { value: 'female', label: '女性' },
                            { value: 'none', label: '不明' },
                        ]}
                        value={formData.gender}
                        changeValue={(value) => handleChange('gender', value)}
                    />
                    <TextArea
                        label="コメント"
                        placeholder="コメントを入力してください"
                        value={formData.comments}
                        onChange={(value) => handleChange('comments', value)}
                    />
                    <Dropdown
                        label="カテゴリ"
                        selectedValue={formData.category}
                        onChange={(value) => handleChange('category', value)}
                        options={[
                            { value: 'A', label: 'カテゴリA' },
                            { value: 'B', label: 'カテゴリB' },
                        ]}
                    />
                    <DatePicker
                        label="生年月日"
                        required={true}
                        onReset={() => handleChange('birthdate', '')}
                        value={formData.birthdate === '' ? undefined : formData.birthdate}
                        onDateChange={(newDate: string) => {
                            const currentDate =
                                formData.birthdate === '' ? now() : formData.birthdate;
                            handleChange(
                                'birthdate',
                                formatDate(updateDate(currentDate, newDate), { withTime: true })
                            );
                        }}
                        withTime={true}
                        onTimeChange={(hour: string | undefined, minute: string | undefined) => {
                            const currentDate =
                                formData.birthdate === '' ? now() : formData.birthdate;
                            console.log('hour:', hour, 'minute:', minute);

                            handleChange(
                                'birthdate',
                                formatDate(updateTime(currentDate, hour, minute), {
                                    withTime: true,
                                })
                            );
                        }}
                        placeholder="生年月日を選択してください"
                    />
                </form>
            </SectionContainer>
        </PageContainer>
    );
};
