import { Container, Tabs } from '@chakra-ui/react'
import { PositionCalculator } from './components/positionCalculator'
import { Menu } from './components/menu'
import { Calculator, Gauge } from 'lucide-react'
import { RiskCalculator } from './components/riskCalculator'


function App() {

  return (
    <>
      <Container colorPalette="green">
        <Menu />
        <Tabs.Root defaultValue="position-calculator" mt={4}>
          <Tabs.List>
            <Tabs.Trigger value="position-calculator"><Calculator /> Position Calculator</Tabs.Trigger>
            <Tabs.Trigger value="risk-calculator"><Gauge />Risk Calculator</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="position-calculator"><PositionCalculator /></Tabs.Content>
          <Tabs.Content value="risk-calculator"><RiskCalculator /></Tabs.Content>
        </Tabs.Root>
      </Container>
    </>
  )
}

export default App
