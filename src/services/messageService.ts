export interface ChatUser {
  name: string;
  avatar: string;
  isOnline: boolean;
}

export interface Chat {
  id: number;
  user: ChatUser;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

export interface Message {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  chatId?: number;
}

// In a real app, these would fetch from Strapi
export const getSampleChats = (): Chat[] => [];
export const getSampleMessages = (): Message[] => [];