"use client";
import { ChatInput } from "@/features/chat-page/chat-input/chat-input";
import { chatStore, useChat } from "@/features/chat-page/chat-store";
import { ChatLoading } from "@/features/ui/chat/chat-message-area/chat-loading";
import { ChatMessageArea } from "@/features/ui/chat/chat-message-area/chat-message-area";
import ChatMessageContainer from "@/features/ui/chat/chat-message-area/chat-message-container";
import ChatMessageContentArea from "@/features/ui/chat/chat-message-area/chat-message-content";
import { useChatScrollAnchor } from "@/features/ui/chat/chat-message-area/use-chat-scroll-anchor";
import { useSession } from "next-auth/react";
import { FC, useEffect, useRef, useState } from "react";
import { ExtensionModel } from "../extensions-page/extension-services/models";
import { ChatHeader } from "./chat-header/chat-header";
import {
    ChatDocumentModel,
    ChatMessageModel,
    ChatThreadModel,
} from "./chat-services/models";
import MessageContent from "./message-content";
import { getCurrentUser } from "../auth-page/helpers";

interface ChatPageProps {
    messages: Array<ChatMessageModel>;
    chatThread: ChatThreadModel;
    chatDocuments: Array<ChatDocumentModel>;
    extensions: Array<ExtensionModel>;
}

export const ChatPage: FC<ChatPageProps> = (props) => {
    const { data: session } = useSession();
    const [loggedMessages, setLoggedMessages] = useState<string[]>([]);

    useEffect(() => {
        chatStore.initChatSession({
            chatThread: props.chatThread,
            messages: props.messages,
            userName: session?.user?.name!,
        });
    }, [props.messages, session?.user?.name, props.chatThread]);

    const { messages, loading } = useChat();

    const current = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length > 0) {
            const msg = messages[messages.length - 1];
            if (msg.role === "tool" || msg.role === "function") {
                if (!loggedMessages.includes(msg.id)) {
                    console.log(msg.content);
                    setLoggedMessages([...loggedMessages, msg.id]);
                }
            }
        }
    }, [messages, loggedMessages]);

    useChatScrollAnchor({ ref: current });

    return (
        <main className="flex flex-1 relative flex-col">
            <ChatHeader
                chatThread={props.chatThread}
                chatDocuments={props.chatDocuments}
                extensions={props.extensions}
            />
            <ChatMessageContainer ref={current}>
                <ChatMessageContentArea>
                    {messages.map((message) => {
                        if (
                            message.role !== "tool" &&
                            message.role !== "function"
                        ) {
                            return (
                                <ChatMessageArea
                                    key={message.id}
                                    profileName={message.name}
                                    role={message.role}
                                    onCopy={() => {
                                        navigator.clipboard.writeText(
                                            message.content
                                        );
                                    }}
                                    profilePicture={
                                        message.role === "assistant"
                                            ? "/ai-icon.png"
                                            : session?.user?.image
                                    }
                                >
                                    <MessageContent message={message} />
                                </ChatMessageArea>
                            );
                        }
                    })}
                    {loading === "loading" && <ChatLoading />}
                </ChatMessageContentArea>
            </ChatMessageContainer>
            <ChatInput />
        </main>
    );
};
