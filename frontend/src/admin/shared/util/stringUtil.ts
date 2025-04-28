export const truncateString = (str: string, length: number, withEllipsis: boolean = false) => {
    if (str.length <= length) {
        return str;
    }

    if (withEllipsis) {
        return `${str.slice(0, length)}...`;
    }

    return `${str.slice(0, length)}`;
};

// 何もない状態を表す文字列。Formなどで初期値を設定する際に使用する。
export const None = 'none';
