import { Container, Heading } from '@chakra-ui/react'
import { PositionCalculator } from './components/positionCalculator'
import { Menu } from './components/menu'


function App() {

  return (
    <>
      <Container>
        <Menu />
        
        <PositionCalculator />
      </Container>
    </>
  )
}

export default App
