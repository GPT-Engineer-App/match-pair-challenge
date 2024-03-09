import React from "react";
import { Box, Heading, SimpleGrid, Button } from "@chakra-ui/react";

const themes = ["Animals", "Shapes", "Colors"];
const difficulties = ["Easy", "Medium", "Hard"];

const SelectTheme = () => {
  return (
    <Box p={4}>
      <Heading mb={6}>Select Theme and Difficulty</Heading>
      <SimpleGrid columns={3} spacing={10}>
        {themes.map((theme) => (
          <Button key={theme}>{theme}</Button>
        ))}
      </SimpleGrid>
      <Heading mt={10} mb={6}>
        Select Difficulty
      </Heading>
      <SimpleGrid columns={3} spacing={10}>
        {difficulties.map((difficulty) => (
          <Button key={difficulty}>{difficulty}</Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default SelectTheme;
