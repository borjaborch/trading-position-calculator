import { AppShell, Container, Tabs } from '@mantine/core'
import { PositionCalculator } from './components/positionCalculator'
import { Menu } from './components/menu'
import { Calculator, Gauge } from 'lucide-react'
import { RiskCalculator } from './components/riskCalculator'


function App() {

  return (
    <AppShell header={{ height: 64 }} padding="md">
      <AppShell.Header px="md">
        <Menu />
      </AppShell.Header>
      <AppShell.Main>
        <Container size="lg">
        <Tabs defaultValue="position-calculator" color="green" mt="md">
          <Tabs.List>
            <Tabs.Tab value="position-calculator" leftSection={<Calculator size={16} />}>
              Position Calculator
            </Tabs.Tab>
            <Tabs.Tab value="risk-calculator" leftSection={<Gauge size={16} />}>
              Risk Calculator
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="position-calculator"><PositionCalculator /></Tabs.Panel>
          <Tabs.Panel value="risk-calculator"><RiskCalculator /></Tabs.Panel>
        </Tabs>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
