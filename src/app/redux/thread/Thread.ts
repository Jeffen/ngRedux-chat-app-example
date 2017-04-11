import { Message } from '../message/Message';

/**
 * Thread represents a group of Users exchanging Messages
 */
export interface Thread {
    id: string;
    name: string;
    avatarSrc: string;
    messages: Message[];
}
