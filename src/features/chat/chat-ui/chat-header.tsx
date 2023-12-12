import { FC } from "react";
import { useChatContext } from "./chat-context";
import { ChatStyleSelector } from "./chat-empty-state/chat-style-selector";
import { ChatTypeSelector } from "./chat-empty-state/chat-type-selector";
import { ChatPersonaSelector } from "./chat-empty-state/chat-persona-selector";
import { Button } from "@/components/ui/button";

interface Prop {}

export const ChatHeader: FC<Prop> = (props) => {
  const { chatBody } = useChatContext();
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <ChatTypeSelector disable={true} />
        <ChatStyleSelector disable={true} />
        <Button className="h-15" variant={"outline"} disabled={true}>{chatBody.conversationPersona}</Button>
      </div>
      <div className="flex gap-2 h-2">
        <p className="text-xs">{chatBody.chatOverFileName}</p>
      </div>
    </div>
  );
};
