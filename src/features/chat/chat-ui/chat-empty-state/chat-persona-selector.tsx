import { Bot, ChevronDown, Computer, DollarSign, Headphones, Phone, Rocket, ScaleIcon, User } from "lucide-react";
import { FC } from "react";
import { ConversationPersona } from "../../chat-services/models";
import { useChatContext } from "../chat-context";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Prop {
  disable: boolean;
}

export const ChatPersonaSelector: FC<Prop> = (props) => {
  const { onConversationPersonaChange, chatBody } = useChatContext();

  return (

    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col items-stretch">
            <Button variant={"outline"}>
                <span>{chatBody.conversationPersona}</span>
                <ChevronDown className="ml-4 h-5 w-5" /></Button>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Marketing" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><Rocket className="mr-2 h-4 w-4" />Marketing</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Sales" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><DollarSign className="mr-2 h-4 w-4" />Sales</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Global Services" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><Phone className="mr-2 h-4 w-4" />Global Services</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Customer Success" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><Headphones className="mr-2 h-4 w-4" />Customer Success</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Engineering" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><Bot className="mr-2 h-4 w-4" />Engineering</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("Finance" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><ScaleIcon className="mr-2 h-4 w-4" />Finance</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("HR" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><User className="mr-2 h-4 w-4" />HR</Button>
            </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onConversationPersonaChange("IT" as ConversationPersona)}>
            <div className="flex flex-col items-stretch">
                <Button variant={"ghost"}><Computer className="mr-2 h-4 w-4" />IT</Button>
            </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    // <Tabs

    //   orientation="vertical"
    //   defaultValue={chatBody.conversationPersona}
    //   onValueChange={(value) =>
    //     onConversationPersonaChange(value as ConversationPersona)
    //   }
    // >
    //   <TabsList className="grid w-full grid-cols-3 h-12 items-stretch">
    //     <TabsTrigger
    //       value="marketing"
    //       className="flex gap-2"
    //       disabled={props.disable}
    //     >
    //       <Rocket size={20} /> Marketing
    //     </TabsTrigger>
    //     <TabsTrigger
    //       value="sales"
    //       className="flex gap-2"
    //       disabled={props.disable}
    //     >
    //       <DollarSign size={20} /> Sales
    //     </TabsTrigger>
    //     {/* <TabsTrigger
    //       value="globalservices"
    //       className="flex gap-2"
    //       disabled={props.disable}
    //     >
    //       <DollarSign size={20} /> Global Services
    //     </TabsTrigger> */}
    //     <TabsTrigger
    //       value="engineering"
    //       className="flex gap-2"
    //       disabled={props.disable}
    //     >
    //       <Bot size={20} /> Engineering
    //     </TabsTrigger>
    //     {/* <TabsTrigger
    //       value="finance"
    //       className="flex gap-2"
    //       disabled={props.disable}
    //     >
    //       <DollarSign size={20} /> Finance
    //     </TabsTrigger>
    //     <TabsTrigger
    //       value="hr"
    //       className="flex gap-2"
    //       disabled={props.disable}>
    //         <Scale size={20} /> HR
    //       </TabsTrigger>
    //       <TabsTrigger
    //       value="it"
    //       className="flex gap-2"
    //       disabled={props.disable}>
    //         <Scale size={20} /> IT
    //       </TabsTrigger> */}

    //   </TabsList>
    // </Tabs>
  );
};
