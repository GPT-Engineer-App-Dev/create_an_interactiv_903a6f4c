import React, { useState } from "react";
import { Box, Grid, Button, VStack, Heading, useToast, Center } from "@chakra-ui/react";
import { FaTimes, FaRegCircle } from "react-icons/fa";

const Index = () => {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const toast = useToast();

  const checkForWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    const newBoard = [...board];
    if (newBoard[index] || checkForWinner(newBoard)) {
      return;
    }
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);

    // Check for winner
    const winner = checkForWinner(newBoard);
    if (winner) {
      toast({
        title: `Player ${winner} has won!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // AI move
      const aiMove = calculateAiMove(newBoard);
      if (aiMove !== -1) {
        newBoard[aiMove] = isXNext ? "O" : "X";
        setBoard(newBoard);
        setIsXNext(!isXNext);
      }
    }
  };

  const calculateAiMove = (squares) => {
    // Simple AI: find the first available spot
    const emptyIndices = squares.map((val, idx) => (val === null ? idx : null)).filter((val) => val !== null);
    if (emptyIndices.length === 0) return -1;
    const randomIndex = Math.floor(Math.random() * emptyIndices.length);
    return emptyIndices[randomIndex];
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
  };

  const renderSquare = (index) => {
    return (
      <Button h="100%" w="100%" onClick={() => handleClick(index)} variant="outline" borderWidth="1px" borderColor="gray.200" fontSize="3xl" p={0}>
        {board[index] === "X" && <FaTimes />}
        {board[index] === "O" && <FaRegCircle />}
      </Button>
    );
  };

  return (
    <VStack spacing={8}>
      <Heading>Tic Tac Toe</Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={1} w="300px" h="300px">
        {Array.from({ length: 9 }, (_, i) => (
          <Center key={i} h="100px" w="100px">
            {renderSquare(i)}
          </Center>
        ))}
      </Grid>
      <Button colorScheme="blue" onClick={resetGame}>
        New Game
      </Button>
    </VStack>
  );
};

export default Index;
