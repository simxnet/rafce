"use client";

import { AlertDialog, Button, Flex, Strong } from "@radix-ui/themes";
import { useLocalStorage } from "react-use"

export default function Alert() {
    const [alertSeen, setAlertSeen] = useLocalStorage<boolean>("alert-seen", false)
    return <AlertDialog.Root onOpenChange={(isOpen) => setAlertSeen(!isOpen)} open={!alertSeen}>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
            <AlertDialog.Title>Reminder</AlertDialog.Title>
            <AlertDialog.Description size="2">
                I made this with learn purposes, it may become unmaintained but useful, it also will <Strong>NOT</Strong> have share links.
            </AlertDialog.Description>

            <Flex gap="3" mt="4" justify="end">
                <AlertDialog.Action>
                    <Button variant="solid">
                        Ok
                    </Button>
                </AlertDialog.Action>
            </Flex>
        </AlertDialog.Content>
    </AlertDialog.Root>
}