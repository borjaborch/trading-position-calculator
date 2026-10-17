import { Group, Heading } from "@chakra-ui/react";
import { ChartLine } from "lucide-react";

export function Menu() {
    return (
        <Group direction="row">
            <ChartLine size={30} />
            <Heading size="2xl">Trading Position Calculator</Heading>
        </Group>
    );
}