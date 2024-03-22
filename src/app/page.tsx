import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Box, Button, Container, Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Page() {
  return (
    <Box py="9">
      <Container size={"4"}>
        <Flex direction={"column"} gap={"2"}>
          <Heading size={"9"}>Execute code in the web.</Heading>
          <Text>RAFCE stands for Reliable And Fast Code Executor, forget about running your own instance of a language to try something, RAFCE interfaces Piston api to make it more accessible</Text>
          <Flex gap={"1"}>
            <Button asChild>
              <Link href={"/run"}>
                Start coding <ArrowRightIcon />
              </Link>
            </Button>
            <Button variant="soft">Support</Button>
          </Flex>
        </Flex>
      </Container>
    </Box>
  )
}
