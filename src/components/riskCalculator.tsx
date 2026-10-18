import { getPositionRisk } from '@/utils/calculator'
import { Badge, Card, Fieldset, Grid, List, NumberInput, Paper, Stack, Title, Group, NumberFormatter } from '@mantine/core'
import { useMemo, useState } from 'react'

export function RiskCalculator() {
    const [form, setForm] = useState({
        accountBalance: 30,
        positionSize: 10,
        leverage: 9,
        stopLossPercent: 0.01,
        takeProfitPercent: 0.02,
    })

    const updateField =
        (field: keyof typeof form, scale = 1) =>
            (value: number | string) => {
                const numericValue = typeof value === 'number' ? value : Number(value)
                setForm((previous) => ({
                    ...previous,
                    [field]: Number.isFinite(numericValue) ? numericValue * scale : 0,
                }))
            }

    const riskPercentage = useMemo(() => {
        return getPositionRisk(
            form.accountBalance,
            form.leverage,
            form.stopLossPercent,
            form.positionSize,
        )
    }, [form])

    return (
        <Grid gap="md" mt="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="md" radius="md">
                    <Fieldset legend="Risk parameters">
                        <Stack gap="sm">
                            <NumberInput
                                label="Account Balance (USDT)"
                                defaultValue={form.accountBalance}
                                min={0}
                                step={0.01}
                                decimalScale={2}
                                fixedDecimalScale
                                prefix="$"
                                thousandSeparator=","
                                onChange={updateField('accountBalance')}
                            />
                            <NumberInput
                                label="Position Size (USDT)"
                                defaultValue={form.positionSize}
                                step={0.01}
                                min={0}
                                decimalScale={2}
                                fixedDecimalScale
                                prefix="$"
                                thousandSeparator=","
                                onChange={updateField('positionSize')}
                            />
                            <NumberInput
                                label="Leverage"
                                defaultValue={form.leverage}
                                step={1}
                                min={1}
                                onChange={updateField('leverage')}
                            />
                            <NumberInput
                                label="Stop Loss (%)"
                                defaultValue={form.stopLossPercent * 100}
                                step={0.01}
                                min={0}
                                decimalScale={2}
                                fixedDecimalScale
                                suffix="%"
                                onChange={updateField('stopLossPercent', 0.01)}
                            />
                            <NumberInput
                                label="Take Profit (%)"
                                defaultValue={form.takeProfitPercent * 100}
                                step={0.01}
                                min={0}
                                decimalScale={2}
                                fixedDecimalScale
                                suffix="%"
                                onChange={updateField('takeProfitPercent', 0.01)}
                            />
                        </Stack>
                    </Fieldset>
                </Paper>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Card withBorder>
                    <Card.Section p="md" withBorder>
                        <Group justify='space-between'>
                            <Title size="h4">Risk Size: </Title>
                            <Badge size="xl" variant='light' color="pink">
                                <NumberFormatter value={riskPercentage * 100} decimalScale={2} fixedDecimalScale suffix="%" />
                            </Badge>
                        </Group>
                    </Card.Section>
                    <Card.Section p="md">
                        <List>
                            <List.Item>Max Loss: {<NumberFormatter value={form.positionSize * form.stopLossPercent * form.leverage} decimalScale={2} fixedDecimalScale prefix="$" thousandSeparator="," />}</List.Item>
                            <List.Item>Max Profit: {<NumberFormatter value={form.positionSize * form.takeProfitPercent * form.leverage} decimalScale={2} fixedDecimalScale prefix="$" thousandSeparator="," />}</List.Item>
                        </List>
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    )
}