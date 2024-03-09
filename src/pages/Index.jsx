import React, { useState, useEffect } from "react";
import { SimpleGrid, Box, Container, useToast, Text, Button, VStack } from "@chakra-ui/react";
import { FaRedo } from "react-icons/fa";

const animalEmojis = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼"];
const gridSize = 4; // 4x4 grid for 16 cards

// Utility function to shuffle an array
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

// Create an array with pairs of animals and shuffle it
function initializeCards() {
  return shuffleArray([...animalEmojis, ...animalEmojis]);
}

const Index = ({ theme = "Animals", difficulty = "Easy" }) => {
  const gridSize = difficulty === "Easy" ? 2 : difficulty === "Medium" ? 4 : 6;
  const [cards, setCards] = useState(initializeCards());
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedIndices, setMatchedIndices] = useState([]);
  const [canFlip, setCanFlip] = useState(true);
  const toast = useToast();

  const handleCardClick = (index) => {
    if (!canFlip || flippedIndices.includes(index) || matchedIndices.includes(index)) {
      return;
    }

    setFlippedIndices((prev) => [...prev, index]);

    if (flippedIndices.length === 1) {
      const firstIndex = flippedIndices[0];
      const secondIndex = index;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndices((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedIndices([]);
      } else {
        setCanFlip(false);
        setTimeout(() => {
          setFlippedIndices([]);
          setCanFlip(true);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(initializeCards());
    setFlippedIndices([]);
    setMatchedIndices([]);
    setCanFlip(true);
  };

  useEffect(() => {
    if (matchedIndices.length === gridSize * gridSize) {
      toast({
        title: "Congratulations!",
        description: "You've matched all the animals!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [matchedIndices]);

  return (
    <Container py={8}>
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Memory Match Game
        </Text>
        <SimpleGrid columns={gridSize} spacing={4}>
          {cards.map((emoji, index) => (
            <Box key={index} height="80px" width="80px" display="flex" alignItems="center" justifyContent="center" bg="gray.200" borderRadius="md" fontSize="2xl" cursor="pointer" onClick={() => handleCardClick(index)}>
              {flippedIndices.includes(index) || matchedIndices.includes(index) ? emoji : "❓"}
            </Box>
          ))}
        </SimpleGrid>
        <Button leftIcon={<FaRedo />} colorScheme="teal" onClick={resetGame}>
          Reset Game
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
