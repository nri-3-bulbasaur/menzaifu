import React, { useState, useEffect } from 'react';
import {
  View,
  Flex,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from '@aws-amplify/ui-react';
import {
  listFoodTypesUtil,
  createFoodTypesUtil,
  updateFoodTypesUtil,
  deleteFoodTypesUtil,
} from '../utils/requestFoodTypes';

const FoodTypesDemo = () => {
  const [foodTypes, setFoodTypes] = useState([]);

  useEffect(() => {
    (async () => {
      const foodTypesList = await listFoodTypesUtil();
      setFoodTypes(foodTypesList);
    })();
  }, []);

  const createFoodTypes = async (event) => {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      type: form.get('type'),
      category: form.get('category'),
      minZaifuPoint: form.get('minZaifuPoint'),
      image: form.get('image'),
    };
    const newFoodTypes = await createFoodTypesUtil(data);
    setFoodTypes(newFoodTypes);
  };

  const updateFoodTypes = async (foodType) => {
    const newFoodTypes = await updateFoodTypesUtil(foodType);
    setFoodTypes(newFoodTypes);
  };

  const deleteFoodTypes = async (foodType) => {
    const newFoodTypes = await deleteFoodTypesUtil(foodType.id);
    setFoodTypes(newFoodTypes);
  };

  return (
    <>
      <h1>FoodTypes Demo</h1>
      <div>
        <h2>Create FoodType</h2>
        <View
          as="form"
          onSubmit={(e) => {
            createFoodTypes(e);
          }}
        >
          <Flex direction="column" alignItems="left">
            <TextField
              name="type"
              placeholder="がっつり"
              label="type"
              variation="default"
              required
            />
            <TextField
              name="category"
              placeholder="焼肉"
              label="category"
              variation="default"
              required
            />
            <TextField
              name="minZaifuPoint"
              placeholder="60"
              label="minZaifuPoint"
              variation="default"
              required
            />
            <TextField
              name="image"
              placeholder="foodtypes/yakiniku_300_300.png"
              label="image"
              variation="default"
              required
            />
          </Flex>
          <br />
          <Button type="submit" variation="primary">
            Create FoodType
          </Button>
        </View>
      </div>
      <div>
        <h2>Delete FoodType</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">type</TableCell>
              <TableCell as="th">category</TableCell>
              <TableCell as="th">minZaifuPoint</TableCell>
              <TableCell as="th">image</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th">Image</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodTypes.map((foodType) => (
              <TableRow key={foodType.id}>
                <TableCell key={foodType.type + 'type'}>
                  {foodType.type}
                </TableCell>
                <TableCell key={foodType.category + 'category'}>
                  {foodType.category}
                </TableCell>
                <TableCell key={foodType.minZaifuPoint + 'minZaifuPoint'}>
                  {foodType.minZaifuPoint}
                </TableCell>
                <TableCell key={foodType.image + 'image'}>
                  {foodType.image}
                </TableCell>
                <TableCell key={foodType.createdAt + 'createdAt'}>
                  {foodType.createdAt}
                </TableCell>
                <TableCell key={foodType.updatedAt + 'updatedAt'}>
                  {foodType.updatedAt}
                </TableCell>
                <TableCell key={foodType.url + 'updateImage'}>
                  <img src={foodType.url} alt="hoge" height="100px" />
                </TableCell>
                <TableCell key={foodType.id + 'delete'}>
                  <Button
                    key={foodType.id + 'deleteButton'}
                    onClick={() => deleteFoodTypes(foodType)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h2>Update FoodType</h2>
        <Table caption="" highlightOnHover={false}>
          <TableHead>
            <TableRow>
              <TableCell as="th">type</TableCell>
              <TableCell as="th">category</TableCell>
              <TableCell as="th">minZaifuPoint</TableCell>
              <TableCell as="th">image</TableCell>
              <TableCell as="th">createdAt</TableCell>
              <TableCell as="th">updatedAt</TableCell>
              <TableCell as="th">Image</TableCell>
              <TableCell as="th"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {foodTypes.map((foodType) => (
              <TableRow key={foodType.id + 'update'}>
                <TableCell key={foodType.type + 'userIdUpdate'}>
                  {foodType.type}
                </TableCell>
                <TableCell key={foodType.category + 'heightUpdate'}>
                  {foodType.category}
                </TableCell>
                <TableCell key={foodType.minZaifuPoint + 'weightUpdate'}>
                  {foodType.minZaifuPoint}
                </TableCell>
                <TableCell key={foodType.image + 'ageUpdate'}>
                  {foodType.image}
                </TableCell>
                <TableCell key={foodType.createdAt + 'createdAtUpdate'}>
                  {foodType.createdAt}
                </TableCell>
                <TableCell key={foodType.updatedAt + 'updatedAtUpdate'}>
                  {foodType.updatedAt}
                </TableCell>
                <TableCell key={foodType.url + 'updateImage'}>
                  <img src={foodType.url} alt="hoge" height="100px" />
                </TableCell>
                <TableCell key={foodType.id + 'update'}>
                  <Button
                    key={foodType.id + 'updateButton'}
                    onClick={() => updateFoodTypes(foodType)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default FoodTypesDemo;
