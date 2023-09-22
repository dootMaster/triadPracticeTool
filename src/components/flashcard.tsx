import { useState } from "react"
import { Box, Button, Card, Center, Text } from "@chakra-ui/react"

const chordFunctions = {
  I: "I",
  ii: "ii",
  iii: "iii",
  IV: "IV",
  V: "V",
  vi: "vi",
  vii: "vii°"
}

const direction = {
  up: 'up',
  down: 'down'
}



export default function Flashcard() {
  let [cardChordFunction, setCardChordFunction] = useState<string>(getRandomChordFunction())
  let [cardDirection, setDirection] = useState<string>(getRandomDirection())

  let [start, setStart] = useState<boolean>(false)
  let [practiceSpeed, setPracticeSpeed] = useState<number>(120)

  let barLength = 4

  let [intervalId, setIntervalId] = useState<NodeJS.Timeout>()

  function getRandomChordFunction() {
    return Object.values(chordFunctions)[(Math.floor(Math.random() * 6)) + 1]
  }

  function getRandomDirection() {
    return Object.values(direction)[(Math.floor(Math.random() * 2))]
  }

  function getNextTarget() {
    setCardChordFunction(getRandomChordFunction())
    setDirection(getRandomDirection())
  }

  function setStartStop() {
    clearInterval(intervalId)

    if(start) {
      setStart(!start)
    } else {
      startInterval()
      setStart(!start)
    }
  }

  function startInterval() {
    intervalId = setInterval(() => getNextTarget(), (60000 / practiceSpeed) * barLength)
    setIntervalId(intervalId)
  }

  return (
    <Center>
      <Box width={"50%"}>
        <Card>
          <Center>
            <Text fontSize={'300'}>{cardChordFunction}</Text>
          </Center>
        </Card>
        <Text fontSize={'6xl'}>{cardDirection}</Text>
        <Text>{practiceSpeed}</Text>
        <Button onClick={setStartStop}>{start ? "Stop" : "Start"}</Button>
      </Box>
    </Center>
  )
}