"use client";

import { Input } from "@/features/ui/input";
import { Label } from "@/features/ui/label";
import React, { useState } from "react";
import { Button } from "@/features/ui/button";
import {
    fileStore,
    useFileStore,
} from "@/features/chat-page/chat-input/file/file-store";
import { LoadingIndicator } from "@/features/ui/loading";
import { useChat } from "@/features/chat-page/chat-store";

export type IngestProp = {};

export const Ingest = (props: IngestProp) => {
    const { uploadButtonLabel } = useFileStore();
    const [files, setFiles] = useState<FileList | null>(null);
    const [index, setIndex] = useState("");
    const [currentFilename, setCurrentFilename] = useState("");
    const { loading } = useChat();

    const chatThreadId = "CUSTOM";

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiles(event.target.files);
    };

    const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIndex(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!index.trim()) {
            alert("Please enter an index name before uploading files.");
            return;
        }
        if (files && files.length > 0) {
            const formData = new FormData();
            formData.append("index", index);
            formData.append("file", "");
            Array.from(files).forEach(async (file) => {
                formData.set("file", file);
                setCurrentFilename(file.name);
                const result = await fileStore.onFileChange({
                    formData,
                    chatThreadId,
                });
                setCurrentFilename("");
            });
        } else {
            alert("Please select files to upload.");
        }
    };

    return (
        <div className="w-full h-full mx-4 flex pt-8 overflow-y-auto">
            <div className="flex flex-col w-full mx-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        Upload Documents to Azure AI Search Index
                    </h2>
                </div>
                <div className="flex flex-col w-full my-10 justify-center items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-8 w-[700px]"
                    >
                        <div>
                            <Label htmlFor="index-name">Index name</Label>
                            <Input
                                type="text"
                                required
                                name="index-name"
                                placeholder="Index name"
                                pattern="^[a-z\d](?:(?:[a-z\d]|-(?!-))){0,126}$"
                                title="The name must be lower case, start with a letter or number, have no slashes or dots, and be fewer than 128 characters. After starting the name with a letter or number, the rest of the name can include any letter, number and dashes, as long as the dashes aren't consecutive."
                                onChange={handleTextChange}
                            />
                        </div>
                        <div>
                            <Label htmlFor="index-name">Choose files:</Label>
                            <br></br>

                            <input
                                type="file"
                                id="fileUpload"
                                multiple
                                onChange={handleFileChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Button type="submit">Upload and Index</Button>
                        </div>
                    </form>
                </div>
                {loading !== "idle" && (
                    <div className=" flex justify-center">
                        <div className="border bg-background p-2 px-5  rounded-full flex gap-2 items-center text-sm">
                            <LoadingIndicator isLoading={true} />{" "}
                            {uploadButtonLabel} - {currentFilename}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
