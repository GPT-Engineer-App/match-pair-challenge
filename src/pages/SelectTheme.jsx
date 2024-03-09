import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";

const themes = ["Animals", "Shapes", "Colors"];
const difficulties = ["Easy", "Medium", "Hard"];

const SelectTheme = () => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0]);
  const navigate = useNavigate();

  const handleThemeSelection = (theme) => {
    setSelectedTheme(theme);
  };

  const handleDifficultySelection = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleStartGame = () => {
    if (selectedTheme && selectedDifficulty) {
      navigate("/", { state: { theme: selectedTheme, difficulty: selectedDifficulty } });
    }
  };
  return (
    <Box p={4}>
      <Heading mb={6}>Select Theme and Difficulty</Heading>
      <SimpleGrid columns={3} spacing={10}>
        {themes.map((theme) => (
          <Button key={theme} onClick={() => handleThemeSelection(theme)}>
            {theme}
          </Button>
        ))}
      </SimpleGrid>
      <Heading mt={10} mb={6}>
        Select Difficulty
      </Heading>
      <SimpleGrid columns={3} spacing={10}>
        {difficulties.map((difficulty) => (
          <Button key={difficulty} onClick={() => handleDifficultySelection(difficulty)}>
            {difficulty}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SelectTheme;
