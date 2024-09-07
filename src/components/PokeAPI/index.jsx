import React, { useEffect, useState } from "react";
import classes from "./poke.module.css";
import { Box, Card, Table, Text } from "@mantine/core";
import axios from "axios";

const PokeAPI = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(pokeData);

  const getPokeData = async () => {
    setLoading(true);
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
    console.log(res.data.results);
    getPokemon(res.data.results);
    setLoading(false);
  };

  const getPokemon = async (res) => {
    res.map(async (item) => {
      console.log(item.url);
      const result = await axios.get(item.url);
      setPokeData((state) => {
        state = [...state, result.data];
        return state;
      });
    });
  };

  useEffect(() => {
    getPokeData();
    // eslint-disable-next-line
  }, []);

  const rows = pokeData.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element?.url}</Table.Td>
      <Table.Td>{element.species.name}</Table.Td>
      <Table.Td>{element.weight} kg</Table.Td>
      <Table.Td>{element.height} cm</Table.Td>
      <Table.Td>{element.abilities.map((el) => el.ability.name).join(", ")}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className={classes.body}>
      <Box className={classes.header} p="lg" mb="md">
        Pokemon
      </Box>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Box mt={70} px={50}>
          <Card>
            <Table withColumnBorders highlightOnHover striped>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Url</Table.Th>
                  <Table.Th>Species</Table.Th>
                  <Table.Th>Wheigt</Table.Th>
                  <Table.Th>Heigt</Table.Th>
                  <Table.Th>Abbilities</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default PokeAPI;
