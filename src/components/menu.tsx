import { Group, Title } from "@mantine/core";
import { ChartLine } from "lucide-react";

export function Menu() {
    return (
        <Group gap="sm" h="100%">
            <ChartLine size={30} />
            <Title order={2}>Trading Position Calculator</Title>
        </Group>
    );
}