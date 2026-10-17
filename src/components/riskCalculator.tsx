import { getPositionRisk } from '@/utils/calculator';
import { GridItem, Field, Fieldset, Heading, NumberInput, Text, Grid } from '@chakra-ui/react'
import { useMemo, useState } from 'react';

export function RiskCalculator() {

    const [form, setForm] = useState({
        accountBalance: 30,
        positionSize: 10,
        leverage: 9,
        stopLossPercent: 0.01,
        takeProfitPercent: 0.02,
    });

    const updateField =
        (field: keyof typeof form) =>
            ({ valueAsNumber }: { valueAsNumber: number }) => {
                setForm(prev => ({
                    ...prev,
                    [field]: Number.isNaN(valueAsNumber) ? 0 : valueAsNumber,
                }));
            };

    const riskPercentage = useMemo(() => {
        return getPositionRisk(
            form.accountBalance,
            form.leverage,
            form.stopLossPercent,
            form.positionSize
        );
    }, [form]);

    console.log(form);

    return (
        <>
            <Grid
                templateColumns="repeat(2, auto)"
                templateRows="repeat(2, auto)"
                gap="2">
                <GridItem mt={4} p={4} borderWidth="1px" borderRadius="md" >
                    <Fieldset.Root size="md">
                        <Fieldset.Content>
                            <Field.Root>
                                <Field.Label >Account Balance (USDT)</Field.Label>
                                <NumberInput.Root
                                    defaultValue={form.accountBalance.toString()}
                                    min={0}
                                    formatOptions={{
                                        style: "currency",
                                        currency: "USD",
                                        currencyDisplay: "symbol",
                                        currencySign: "standard",
                                    }}
                                    onValueChange={updateField('accountBalance')}
                                >
                                    <NumberInput.Control />
                                    <NumberInput.Input />
                                </NumberInput.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Position Size</Field.Label>
                                <NumberInput.Root
                                    defaultValue={form.positionSize.toString()}
                                    step={0.01}
                                    min={0}
                                    formatOptions={{
                                        style: "currency",
                                        currency: "USD",
                                        currencyDisplay: "symbol",
                                        currencySign: "standard",
                                    }}
                                    onValueChange={updateField('positionSize')}
                                >
                                    <NumberInput.Input />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Leverage</Field.Label>
                                <NumberInput.Root
                                    defaultValue={form.leverage.toString()}
                                    step={1}
                                    min={1}
                                    onValueChange={updateField('leverage')}
                                >
                                    <NumberInput.Input />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Stop Loss (%)</Field.Label>
                                <NumberInput.Root
                                    defaultValue={(form.stopLossPercent * 100).toString()}
                                    step={0.0001}
                                    min={0}
                                    formatOptions={{ style: "percent", minimumFractionDigits: 2 }}
                                    onValueChange={updateField('stopLossPercent')}
                                >
                                    <NumberInput.Input />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                            </Field.Root>
                            <Field.Root>
                                <Field.Label>Take Profit (%)</Field.Label>
                                <NumberInput.Root
                                    defaultValue={(form.takeProfitPercent * 100).toString()}
                                    step={0.0001}
                                    min={0}
                                    formatOptions={{ style: "percent", minimumFractionDigits: 2 }}
                                    onValueChange={updateField('takeProfitPercent')}
                                >
                                    <NumberInput.Input />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                            </Field.Root>
                        </Fieldset.Content>
                    </Fieldset.Root>
                </GridItem>
                <GridItem mt={4} p={4} borderWidth="1px" borderRadius="md" >
                    <Heading size="lg">Risk Size: {(riskPercentage * 100).toFixed(2)}%</Heading>
                    <Text>Max Loss: {(form.positionSize * form.stopLossPercent * form.leverage).toFixed(2)} USDT</Text>
                    <Text>Max Profit: {(form.positionSize * form.takeProfitPercent * form.leverage).toFixed(2)} USDT</Text>
                </GridItem>
            </Grid>
        </>
    );
}