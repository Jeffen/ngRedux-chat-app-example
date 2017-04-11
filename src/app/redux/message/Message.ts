import { User } from '../user/User';
import { Thread } from '../thread/Thread';
/**
 * Message represents one message being sent in a thread
 */
export class Message {
    id?: string;
    sentAt?: Date;
    isRead?: boolean;
    author: User;
    text: string;
    thread?: Thread;
}
