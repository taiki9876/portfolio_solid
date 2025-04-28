import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { ChatroomType } from '@admin/domain/chat/models/ChatroomType';

/**
 * 入力値のステートとキャッシュを管理するフック
 */
export const useTextCache = (currentChatroom: ChatroomType | undefined) => {
    const [text, setText] = useState('');
    const inputCacheRef = useRef<Record<string, string>>({});

    const clearInput = () => {
        if (currentChatroom === undefined) {
            return;
        }
        setText('');
        inputCacheRef.current[currentChatroom.id] = '';
    };

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);

        if (currentChatroom === undefined) {
            return;
        }
        inputCacheRef.current[currentChatroom.id] = event.target.value;
    };

    useEffect(() => {
        if (currentChatroom === undefined) {
            return;
        }
        setText(
            inputCacheRef.current[currentChatroom.id] === undefined
                ? ''
                : inputCacheRef.current[currentChatroom.id]
        );
    }, [currentChatroom]);

    return {
        text,
        handleChange,
        clearInput,
    };
};
