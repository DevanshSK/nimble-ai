"use server"

import { client } from "@/lib/prisma"


export const onToggleRealtime = async (id: string, state: boolean) => {
    try {
        const chatRoom = await client.chatRoom.update({
            where: {
                id,
            },
            data: {
                live: state,
            },
            select: {
                id: true,
                live: true,
            },
        })

        if (chatRoom) {
            return {
                status: 200,
                message: chatRoom.live ? "Realtime mode enabled" : "Realtime mode disabled",
                chatRoom,
            }
        }
    } catch (error) {
        console.log(error);
        return {
            status: 400,
            message: "Some error happened during toggling realtime chatrooms."
        }
    }
}

export const onGetConversationMode = async (id: string) => {
    try {
        const mode = await client.chatRoom.findUnique({
            where: {
                id,
            },
            select: {
                live: true,
            },
        })
        console.log(mode);
        return mode;
    } catch (error) {
        console.log(error);
    }
}
