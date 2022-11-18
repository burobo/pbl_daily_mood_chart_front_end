/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateActivityInput = {
  id?: string | null,
  activity_type: string,
  start_unix_time: number,
  end_unix_time: number,
};

export type ModelActivityConditionInput = {
  activity_type?: ModelStringInput | null,
  start_unix_time?: ModelIntInput | null,
  end_unix_time?: ModelIntInput | null,
  and?: Array< ModelActivityConditionInput | null > | null,
  or?: Array< ModelActivityConditionInput | null > | null,
  not?: ModelActivityConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type Activity = {
  __typename: "Activity",
  id: string,
  activity_type: string,
  start_unix_time: number,
  end_unix_time: number,
  createdAt: string,
  updatedAt: string,
};

export type UpdateActivityInput = {
  id: string,
  activity_type?: string | null,
  start_unix_time?: number | null,
  end_unix_time?: number | null,
};

export type DeleteActivityInput = {
  id: string,
};

export type ModelActivityFilterInput = {
  id?: ModelIDInput | null,
  activity_type?: ModelStringInput | null,
  start_unix_time?: ModelIntInput | null,
  end_unix_time?: ModelIntInput | null,
  and?: Array< ModelActivityFilterInput | null > | null,
  or?: Array< ModelActivityFilterInput | null > | null,
  not?: ModelActivityFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelActivityConnection = {
  __typename: "ModelActivityConnection",
  items:  Array<Activity | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionActivityFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  activity_type?: ModelSubscriptionStringInput | null,
  start_unix_time?: ModelSubscriptionIntInput | null,
  end_unix_time?: ModelSubscriptionIntInput | null,
  and?: Array< ModelSubscriptionActivityFilterInput | null > | null,
  or?: Array< ModelSubscriptionActivityFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  in?: Array< number | null > | null,
  notIn?: Array< number | null > | null,
};

export type CreateActivityMutationVariables = {
  input: CreateActivityInput,
  condition?: ModelActivityConditionInput | null,
};

export type CreateActivityMutation = {
  createActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateActivityMutationVariables = {
  input: UpdateActivityInput,
  condition?: ModelActivityConditionInput | null,
};

export type UpdateActivityMutation = {
  updateActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteActivityMutationVariables = {
  input: DeleteActivityInput,
  condition?: ModelActivityConditionInput | null,
};

export type DeleteActivityMutation = {
  deleteActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetActivityQueryVariables = {
  id: string,
};

export type GetActivityQuery = {
  getActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListActivitiesQueryVariables = {
  filter?: ModelActivityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListActivitiesQuery = {
  listActivities?:  {
    __typename: "ModelActivityConnection",
    items:  Array< {
      __typename: "Activity",
      id: string,
      activity_type: string,
      start_unix_time: number,
      end_unix_time: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateActivitySubscriptionVariables = {
  filter?: ModelSubscriptionActivityFilterInput | null,
};

export type OnCreateActivitySubscription = {
  onCreateActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateActivitySubscriptionVariables = {
  filter?: ModelSubscriptionActivityFilterInput | null,
};

export type OnUpdateActivitySubscription = {
  onUpdateActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteActivitySubscriptionVariables = {
  filter?: ModelSubscriptionActivityFilterInput | null,
};

export type OnDeleteActivitySubscription = {
  onDeleteActivity?:  {
    __typename: "Activity",
    id: string,
    activity_type: string,
    start_unix_time: number,
    end_unix_time: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
