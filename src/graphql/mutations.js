/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createActivities = /* GraphQL */ `
  mutation CreateActivities(
    $input: CreateActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    createActivities(input: $input, condition: $condition) {
      id
      activityId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const updateActivities = /* GraphQL */ `
  mutation UpdateActivities(
    $input: UpdateActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    updateActivities(input: $input, condition: $condition) {
      id
      activityId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const deleteActivities = /* GraphQL */ `
  mutation DeleteActivities(
    $input: DeleteActivitiesInput!
    $condition: ModelActivitiesConditionInput
  ) {
    deleteActivities(input: $input, condition: $condition) {
      id
      activityId
      amount
      createdAt
      updatedAt
    }
  }
`;
export const createFoodTypes = /* GraphQL */ `
  mutation CreateFoodTypes(
    $input: CreateFoodTypesInput!
    $condition: ModelFoodTypesConditionInput
  ) {
    createFoodTypes(input: $input, condition: $condition) {
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
export const updateFoodTypes = /* GraphQL */ `
  mutation UpdateFoodTypes(
    $input: UpdateFoodTypesInput!
    $condition: ModelFoodTypesConditionInput
  ) {
    updateFoodTypes(input: $input, condition: $condition) {
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
export const deleteFoodTypes = /* GraphQL */ `
  mutation DeleteFoodTypes(
    $input: DeleteFoodTypesInput!
    $condition: ModelFoodTypesConditionInput
  ) {
    deleteFoodTypes(input: $input, condition: $condition) {
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
export const createUsers = /* GraphQL */ `
  mutation CreateUsers(
    $input: CreateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    createUsers(input: $input, condition: $condition) {
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
export const updateUsers = /* GraphQL */ `
  mutation UpdateUsers(
    $input: UpdateUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    updateUsers(input: $input, condition: $condition) {
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
export const deleteUsers = /* GraphQL */ `
  mutation DeleteUsers(
    $input: DeleteUsersInput!
    $condition: ModelUsersConditionInput
  ) {
    deleteUsers(input: $input, condition: $condition) {
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
export const createTest = /* GraphQL */ `
  mutation CreateTest(
    $input: CreateTestInput!
    $condition: ModelTestConditionInput
  ) {
    createTest(input: $input, condition: $condition) {
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
export const updateTest = /* GraphQL */ `
  mutation UpdateTest(
    $input: UpdateTestInput!
    $condition: ModelTestConditionInput
  ) {
    updateTest(input: $input, condition: $condition) {
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
export const deleteTest = /* GraphQL */ `
  mutation DeleteTest(
    $input: DeleteTestInput!
    $condition: ModelTestConditionInput
  ) {
    deleteTest(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
