import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import { Badge, Box, Button, Card, Flex, Grid, Group, Image, Modal, rem, Select, Text, TextInput } from "@mantine/core";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import Form from "../Form/Form";

const products = [
  {
    name: "Susu Kaleng",
    price: 10000,
    desc: "description",
    stock: 130,
  },
  {
    name: "Kopi Kaleng",
    price: 6000,
    desc: "description",
    stock: 102,
  },
  {
    name: "Roti",
    price: 67000,
    desc: "description",
    stock: 120,
  },
  {
    name: "Donat",
    price: 8900,
    desc: "description",
    stock: 150,
  },
  {
    name: "Snack",
    price: 12000,
    desc: "description",
    stock: 1770,
  },
];

const Header = () => {
  const [listProductData, setListProductData] = useState(products);
  const [openModal, setOpenModal] = useState(false);
  const [detailData, setDetailData] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(null);
  console.log(filter);

  const onCloseModal = () => {
    setOpenModal(false);
    setDetailData(null);
  };

  const handleGetData = () => {
    const data = products;
    setListProductData(data);
  };

  const handleSearch = () => {
    let resultData = listProductData.filter((data) => {
      return data.name.toLowerCase().includes(search.toLowerCase());
    });
    setListProductData(resultData);
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line
  }, [search]);

  useEffect(() => {
    if (filter === "A-Z") {
      const sortAz = listProductData.sort((a, b) => a.name.localeCompare(b.name));
      setListProductData(sortAz);
      console.log(sortAz);
    }
    if (filter === "Harga Terendah") {
      const sortPrice = listProductData.sort((a, b) => a.price - b.price);
      setListProductData(sortPrice);
      console.log(sortPrice);
    }
    if (filter === "Stock") {
      const sortStock = listProductData.sort((a, b) => a.stock - b.stock);
      setListProductData(sortStock);
      console.log(sortStock);
    }
    // eslint-disable-next-line
  }, [filter]);

  return (
    <Box className={classes.body} fullWidth>
      <Box className={classes.header} p="lg" mb="md">
        List Products
      </Box>
      <Box px="lg" mb="md">
        <Flex>
          <Text className={classes.titlePage} mb="sm">
            Producs Management
          </Text>
        </Flex>
        <Flex justify="space-between">
          <Flex>
            <TextInput onChange={(e) => setSearch(e.target.value)} radius="md" mr="sm" fullWidth placeholder="Search products...." name="search" leftSection=<IconSearch style={{ width: rem(16), height: rem(16) }} /> />
            <Select placeholder="Pick value" data={["A-Z", "Harga Terendah", "Stock"]} allowDeselect onChange={(value) => setFilter(value)} />
          </Flex>
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={() => {
              setOpenModal(true);
              setDetailData(null);
            }}
          >
            Add New Products
          </Button>
        </Flex>
      </Box>
      <Box px="lg" mb="md">
        {listProductData !== null ? (
          <Grid>
            {listProductData.map((el) => (
              <Grid.Col key={el.name} span={{ base: 12, md: 4, lg: 3, sm: 6 }}>
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image src="https://st.depositphotos.com/9129706/54785/v/1600/depositphotos_547853786-stock-illustration-realistic-detailed-3d-canned-coffee.jpg" height={160} alt="Norway" />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>{el.name}</Text>
                    <Badge
                      color="pink"
                      onClick={() => {
                        setListProductData(listProductData.filter((a) => a.name !== el.name));
                      }}
                    >
                      Hapus
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed">
                    {el.desc}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Price: {el.price}
                  </Text>
                  <Text size="sm" c="dimmed">
                    Stock: {el.stock}
                  </Text>

                  <Button
                    color="blue"
                    fullWidth
                    mt="md"
                    radius="md"
                    onClick={() => {
                      setOpenModal(true);
                      setDetailData(el);
                    }}
                  >
                    Edit
                  </Button>
                </Card>
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Text>No Data</Text>
        )}
      </Box>

      <Modal opened={openModal} onClose={onCloseModal} title={!detailData ? "Edit Product" : "Add New Product"}>
        <Form reload={handleGetData} productData={listProductData} detail={detailData} onCloseModal={onCloseModal} />
      </Modal>
    </Box>
  );
};

export default Header;
