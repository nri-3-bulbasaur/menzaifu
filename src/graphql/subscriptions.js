/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateActivities = /* GraphQL */ `
  subscription OnCreateActivities(
    $filter: ModelSubscriptionActivitiesFilterInput
  ) {
    onCreateActivities(filter: $filter) {
      id
      activityId
      amount
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateActivities = /* GraphQL */ `
  subscription OnUpdateActivities(
    $filter: ModelSubscriptionActivitiesFilterInput
  ) {
    onUpdateActivities(filter: $filter) {
      id
      activityId
      amount
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteActivities = /* GraphQL */ `
  subscription OnDeleteActivities(
    $filter: ModelSubscriptionActivitiesFilterInput
  ) {
    onDeleteActivities(filter: $filter) {
      id
      activityId
      amount
      userId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateFoodTypes = /* GraphQL */ `
  subscription OnCreateFoodTypes(
    $filter: ModelSubscriptionFoodTypesFilterInput
  ) {
    onCreateFoodTypes(filter: $filter) {
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
export const onUpdateFoodTypes = /* GraphQL */ `
  subscription OnUpdateFoodTypes(
    $filter: ModelSubscriptionFoodTypesFilterInput
  ) {
    onUpdateFoodTypes(filter: $filter) {
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
export const onDeleteFoodTypes = /* GraphQL */ `
  subscription OnDeleteFoodTypes(
    $filter: ModelSubscriptionFoodTypesFilterInput
  ) {
    onDeleteFoodTypes(filter: $filter) {
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
export const onCreateUsers = /* GraphQL */ `
  subscription OnCreateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onCreateUsers(filter: $filter) {
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
export const onUpdateUsers = /* GraphQL */ `
  subscription OnUpdateUsers($filter: ModelSubscriptionUsersFilterInput) {
    onUpdateUsers(filter: $filter) {
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
export const onDeleteUsers = /* GraphQL */ `
  subscription OnDeleteUsers($filter: ModelSubscriptionUsersFilterInput) {
    onDeleteUsers(filter: $filter) {
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
export const onCreateTest = /* GraphQL */ `
  subscription OnCreateTest($filter: ModelSubscriptionTestFilterInput) {
    onCreateTest(filter: $filter) {
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
export const onUpdateTest = /* GraphQL */ `
  subscription OnUpdateTest($filter: ModelSubscriptionTestFilterInput) {
    onUpdateTest(filter: $filter) {
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
export const onDeleteTest = /* GraphQL */ `
  subscription OnDeleteTest($filter: ModelSubscriptionTestFilterInput) {
    onDeleteTest(filter: $filter) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onCreateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($filter: ModelSubscriptionTodoFilterInput) {
    onUpdateTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($filter: ModelSubscriptionTodoFilterInput) {
    onDeleteTodo(filter: $filter) {
      id
      name
      description
      createdAt
      updatedAt
    }
  }
`;
