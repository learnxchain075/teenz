import { WebSocket } from 'ws';
import { prisma } from '../db/prisma';

export const onlineUsers = new Map<string, WebSocket>();

export async function handleMessage(data: any, senderId: string) {
  const message = await prisma.message.create({
    data: {
      content: data.content,
      type: data.messageType,
      senderId,
      recipientUserId: data.recipient,
      groupId: data.groupId,
      forwardedFromId: data.forwardedFrom,
    }
  });

  const recipientWs = onlineUsers.get(data.recipient);
  if (recipientWs) {
    recipientWs.send(JSON.stringify(message));
    await prisma.message.update({
      where: { id: message.id },
      data: { isRead: true, readAt: new Date() }
    });
  } else {
    await prisma.offlineMessage.create({
      data: {
        userId: data.recipient,
        content: data.content,
        type: data.messageType,
        senderId
      }
    });
  }
}
