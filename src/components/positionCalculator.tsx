import { getPositionSize } from '@/utils/calculator'
import { Badge, Card, Fieldset, Grid, Group, List, NumberFormatter, NumberInput, Paper, Stack, Title } from '@mantine/core'
import { useMemo, useState } from 'react'

export function PositionCalculator() {
    const [form, setForm] = useState({
        accountBalance: 30,
        maxRiskPercent: 0.01,
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

    const positionSize = useMemo(() => {
        return getPositionSize(
            form.accountBalance,
            form.maxRiskPercent,
            form.leverage,
            form.stopLossPercent,
        )
    }, [form])

    return (
        <Grid gap="md" mt="md">
            <Grid.Col span={{ base: 12, md: 6 }}>
                <Paper withBorder p="md" radius="md">
                    <Fieldset legend="Position parameters">
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
                                label="Max Risk (%)"
                                defaultValue={form.maxRiskPercent * 100}
                                step={0.01}
                                min={0}
                                decimalScale={2}
                                fixedDecimalScale
                                suffix="%"
                                onChange={updateField('maxRiskPercent', 0.01)}
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
                            <Title size='h4'>Position Size:</Title>
                            <Badge size="xl" variant='light' color="teal">
                                <NumberFormatter value={positionSize} decimalScale={2} fixedDecimalScale prefix="$" thousandSeparator="," />
                            </Badge>
                        </Group>
                    </Card.Section>
                    <Card.Section p="md">
                        <List>
                            <List.Item>Max Loss: {<NumberFormatter value={positionSize * form.stopLossPercent * form.leverage} decimalScale={2} fixedDecimalScale prefix="$" thousandSeparator="," />}</List.Item>
                            <List.Item>Max Profit: {<NumberFormatter value={positionSize * form.takeProfitPercent * form.leverage} decimalScale={2} fixedDecimalScale prefix="$" thousandSeparator="," />}</List.Item>
                        </List>
                    </Card.Section>
                </Card>
            </Grid.Col>
        </Grid>
    )
}