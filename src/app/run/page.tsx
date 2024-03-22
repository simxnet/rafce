"use client";

import { Badge, Box, Button, Code, Flex, Heading, ScrollArea, Select } from "@radix-ui/themes";
import Editor from '@monaco-editor/react';
import { useMutation, useQuery } from "@tanstack/react-query";
import { execute, getRuntimes } from "@/util/api";
import { css } from "@stitches/react";
import { PlayIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { PistonRuntime } from "@/util/types";
import Alert from "@/components/alert";
import { useMountedState } from "react-use"

const floatingButtonVariants = css({
    bottom: 10,
    right: 10,
    position: "fixed",
})

export default function Page() {
    const isMounted = useMountedState();
    const [code, setCode] = useState<string>("// start coding")
    const [alert, setAlert] = useState(false)
    const [language, setLanguage] = useState<PistonRuntime>({
        "language": "javascript",
        "version": "18.15.0",
        "aliases": [
            "node-javascript",
            "node-js",
            "javascript",
            "js"
        ],
        "runtime": "node"
    })
    const { data: runtimes } = useQuery({ queryKey: ['runtimes'], queryFn: getRuntimes })
    const run = useMutation({ mutationKey: ["run"], mutationFn: execute })

    useEffect(() => {
        setTimeout(() => {
            if (isMounted()) {
                setAlert(true)
            } else {
                void 0;
            }
        }, 1000);
    });
    return (
        <>
            {alert && <Alert />}
            <Box p={"3"}>
                <Flex mb={"3"} justify={"between"}>
                    <Flex gap={"2"} align={"center"}>
                        <Heading>Execute in {runtimes?.length ?? 0} languages, running {language.language}</Heading>
                        <Badge>Beta</Badge>
                    </Flex>
                    <Select.Root onValueChange={(v) => setLanguage(JSON.parse(v))} value={JSON.stringify(language)}>
                        <Select.Trigger />
                        <Select.Content align="end" position="popper">
                            {runtimes?.map(l => <Select.Item value={JSON.stringify(l)}>{l.language} {l.version}</Select.Item>)}
                        </Select.Content>
                    </Select.Root>
                </Flex>
                <Flex direction={"row"} gap={"3"} height={"100%"}>
                    <Editor
                        theme="vs-dark"
                        height="100vh"
                        width="100%"
                        loading=""
                        language={language.language}
                        defaultValue={code}
                        onChange={(v: string) => setCode(v)}
                    />
                    <Box className={css({ width: "70%", height: "100%" })()}>
                        <ScrollArea type="scroll" scrollbars="vertical" style={{ height: "100vh" }}>
                            <Code color="gray" highContrast>
                                {
                                    run.isError ? run.error.message : run.data
                                        ? run.data.run.output === ""
                                            ? "No output" : run.data.run.output : run.isPending
                                            ? "Running..." : "Run some code and you will see the results here"
                                }
                            </Code>
                        </ScrollArea>
                    </Box>
                </Flex>
            </Box>
            <Button onClick={() => run.mutate({
                version: language.version,
                language: language.language,
                files: [
                    {
                        content: code
                    }
                ]
            })} size={"3"} disabled={run.isPending} className={floatingButtonVariants()}><PlayIcon /> Run</Button>
        </>
    )
}