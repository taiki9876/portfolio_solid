import { useContext } from 'react';
import { ChatroomContentContext } from './ChatContentContextProvider';

export const useChatContentContext = () => {
    return useContext(ChatroomContentContext);
};
