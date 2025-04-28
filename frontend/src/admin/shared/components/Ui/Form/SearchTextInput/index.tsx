import { TextInput } from '@admin/shared/components/Ui/Form';
import { SearchIcon } from '@admin/shared/components/Ui/Icon/SearchIcon';
import { Colors } from '@admin/assets/styles/colors';
import { useEnterHandler } from '@src/shared/hooks/useEnterHandler';
import styles from './SearchTextInput.module.css';

type Props = {
    text: string;
    setText: (text: string) => void;
    handleSearch: () => void;
    placeholder?: string;
};
export const SearchTextInput = ({ text, setText, handleSearch, placeholder }: Props) => {
    const { enterHandleAttribute } = useEnterHandler(handleSearch);

    return (
        <div className={styles.container}>
            <p className={styles.text}>検索</p>
            <TextInput
                value={text}
                onChange={setText}
                placeholder={placeholder}
                containerClassName={styles.searchInputContainer}
                inputClassName={styles.searchInput}
                attributes={enterHandleAttribute}
            />

            <div className={styles.circle} onClick={handleSearch}>
                <SearchIcon color={Colors.gray300} />
            </div>
        </div>
    );
};
