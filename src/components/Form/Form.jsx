import { Box, Button, Flex, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { validation } from "./Validation";

const initialDefault = {
  name: "",
  price: "",
  stock: "",
  desc: "",
};

const errorMessage = {
  name: {
    isError: false,
    message: "",
  },
  price: {
    isError: false,
    message: "",
  },
  stock: {
    isError: false,
    message: "",
  },
  desc: {
    isError: false,
    message: "",
  },
};

const Form = ({ detail, productData, onCloseModal, reload }) => {
  const [formData, setFormData] = useState(initialDefault);
  const [formErrorMessage, setFormErrorMessage] = useState(errorMessage);
  const [loading, setLoading] = useState(false);

  console.log(productData);
  //   console.log(formErrorMessage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSetForm = () => {
    const detailData = {
      name: detail.name,
      price: detail.price,
      stock: detail.stock,
    };
    setFormData(detailData);
  };

  useEffect(() => {
    if (detail !== null) {
      handleSetForm();
    }
    // eslint-disable-next-line
  }, []);

  const handelSubmit = () => {
    setLoading(true);
    setFormErrorMessage(errorMessage);
    const productList = productData;
    console.log(productList);
    const newData = {
      name: formData.name,
      price: formData.price,
      stock: formData.stock,
    };
    let error = validation(formData, setFormErrorMessage);
    if (error) {
      setLoading(false);
      return;
    }
    if (detail == null) {
      productList.push(newData);
    } else {
      productList.filter((el) => el.name !== detail.name);
      productList.push(newData);
    }
    onCloseModal();
    reload();
  };

  return (
    <Box style={{ position: "relative", paddingBottom: "40px" }}>
      <Box mb={70}>
        <TextInput label="Product Name" name="name" placeholder="input product name" onChange={handleChange} value={formData.name} error={formErrorMessage.name.message} />
        <TextInput label="Price" name="price" placeholder="input product name" onChange={handleChange} value={formData.price} error={formErrorMessage.price.message} />
        <TextInput label="Stock" name="stock" placeholder="input product name" onChange={handleChange} value={formData.stock} error={formErrorMessage.stock.message} />
        <TextInput label="Descroption" name="desc" placeholder="input product name" onChange={handleChange} value={formData.desc} error={formErrorMessage.desc.message} />
      </Box>
      <Box>
        <Flex justify="flex-end">
          <Button loading={loading} onClick={handelSubmit}>
            Save
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default Form;
