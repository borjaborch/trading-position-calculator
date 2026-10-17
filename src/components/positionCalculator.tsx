import { getPositionSize } from '@/utils/calculator';
import { GridItem, Field, Fieldset, Heading, NumberInput, Separator, Text, Grid } from '@chakra-ui/react'
import { useMemo, useState } from 'react';

export function PositionCalculator() {

    const [form, setForm] = useState({
        accountBalance: 30,
        maxRiskPercent: 0.01,
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

    const positionSize = useMemo(() => {
        return getPositionSize(
            form.accountBalance,
            form.maxRiskPercent,
            form.leverage,
            form.stopLossPercent
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
                                <Field.Label>Max Risk (%)</Field.Label>
                                <NumberInput.Root
                                    defaultValue={(form.maxRiskPercent * 100).toString()}
                                    step={0.0001}
                                    min={0}
                                    formatOptions={{ style: "percent", minimumFractionDigits: 2 }}
                                    onValueChange={updateField('maxRiskPercent')}
                                >
                                    <NumberInput.Input />
                                    <NumberInput.Control />
                                </NumberInput.Root>
                                <Field.HelperText>{(form.accountBalance * form.maxRiskPercent).toFixed(2)} USDT</Field.HelperText>
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
                    <Heading size="lg">Position Size: {positionSize.toFixed(2)} USDT</Heading>
                    <Text>Max Loss: {(positionSize * form.stopLossPercent * form.leverage).toFixed(2)} USDT</Text>
                    <Text>Max Profit: {(positionSize * form.takeProfitPercent * form.leverage).toFixed(2)} USDT</Text>
                </GridItem>
            </Grid>
        </>
    );
}