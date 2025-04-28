import { createContext, MutableRefObject, ReactNode, useEffect, useRef } from 'react';

type ContextType = {
    chatRoomRef: MutableRefObject<HTMLDivElement | null>;
    scrollToBottom: (isSmoothScroll?: boolean) => void;
};
export const ChatroomContentContext = createContext<ContextType>({
    chatRoomRef: { current: null },
    scrollToBottom: (_?: boolean) => {},
});

type Props = {
    children: ReactNode;
};
export const ChatContentContextProvider = ({ children }: Props) => {
    const chatRoomRef = useRef<HTMLDivElement | null>(null);
    const scrollToBottom = (isSmoothScroll: boolean = false) => {
        if (chatRoomRef.current !== null) {
            if (isSmoothScroll) {
                chatRoomRef.current.scrollTo({
                    top: chatRoomRef.current.scrollHeight,
                    behavior: 'smooth',
                });
            } else {
                chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (
        <ChatroomContentContext.Provider
            value={{
                chatRoomRef,
                scrollToBottom,
            }}
        >
            {children}
        </ChatroomContentContext.Provider>
    );
};
