/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getActivities = /* GraphQL */ `
  query GetActivities($id: ID!) {
    getActivities(id: $id) {
      id
      activityId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const listActivities = /* GraphQL */ `
  query ListActivities(
    $filter: ModelActivitiesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivities(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        activityId
        amount
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getFoodTypes = /* GraphQL */ `
  query GetFoodTypes($id: ID!) {
    getFoodTypes(id: $id) {
      id
      type
      category
      minZaifuPoint
      image
      createdAt
      updatedAt
    }
  }
`;
export const listFoodTypes = /* GraphQL */ `
  query ListFoodTypes(
    $filter: ModelFoodTypesFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFoodTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        category
        minZaifuPoint
        image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      userId
      height
      weight
      age
      zaifuPoint
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        height
        weight
        age
        zaifuPoint
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTest = /* GraphQL */ `
  query GetTest($id: ID!) {
    getTest(id: $id) {
      id
      stringField
      IntField
      boolField
      awsDateTimeField
      createdAt
      updatedAt
    }
  }
`;
export const listTests = /* GraphQL */ `
  query ListTests(
    $filter: ModelTestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTests(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        stringField
        IntField
        boolField
        awsDateTimeField
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
