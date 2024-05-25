import { type ClientSchema, a, defineData } from "@aws-amplify/backend";
import { postConfirmation } from "../auth/post-confirmation/resource";

const schema = a
  .schema({
    ConnectionRequest: a
      .model({
        senderId: a.id().required(),
        receiverId: a.id().required(),
        status: a.string(),
        sender: a.belongsTo("User", "senderId"),
      })
      .identifier(["senderId", "receiverId"])
      .authorization((allow) => [
        allow.authenticated().to(["read", "create", "delete", "update"]),
      ]),
    ConnectionReceived: a
      .model({
        senderId: a.id().required(),
        receiverId: a.id().required(),
        status: a.string(),
        receiver: a.belongsTo("User", "receiverId"),
      })
      .identifier(["senderId", "receiverId"])
      .authorization((allow) => [
        allow.authenticated().to(["read", "create", "delete"]),
      ]),
    Connection: a
      .model({
        userId: a.id().required(),
        connectionId: a.string().required(),
        user: a.belongsTo("User", "userId"),
      })
      .identifier(["userId", "connectionId"])
      .authorization((allow) => [
        allow.authenticated().to(["read", "delete", "create"]),
      ]),
    Message: a
      .model({
        roomId: a.id().required(),
        content: a.string().default(""),
        timestamp: a.string().required(),
        senderId: a.id().required(),
        translatedContent: a.string().default(""),
        room: a.belongsTo("Room", "roomId"),
      })
      .authorization((allow) => [
        allow.authenticated().to(["read", "delete", "create"]),
      ]),
    User: a
      .model({
        id: a.id().required(),
        fullName: a.string(),
        age: a.integer(),
        gender: a.string(),
        race: a.string(),
        spokenLanguage: a.string(),
        interests: a.string().array(),
        aboutMe: a.string(),
        profilePictureUrl: a.string(),
        email: a.string().required(),
        status: a.string().default("offline"),
        connections: a.hasMany("Connection", "userId"),
        connectionRequests: a.hasMany("ConnectionRequest", "senderId"),
        connectionReceived: a.hasMany("ConnectionReceived", "receiverId"),
        rooms: a.hasMany("RoomUser", "userId"),
      })
      .authorization((allow) => [
        allow.authenticated().to(["read", "update", "delete"]),
      ]),
    Room: a
      .model({
        id: a.id().required(),
        messages: a.hasMany("Message", "roomId"),
        roomUsers: a.hasMany("RoomUser", "roomId"),
      })
      .authorization((allow) => [allow.authenticated().to(["read","create","delete"])]),
    RoomUser: a
      .model({
        userId: a.id().required(),
        roomId: a.id().required(),
        user: a.belongsTo("User", "userId"),
        room: a.belongsTo("Room", "roomId"),
      })
      .authorization((allow) => [allow.authenticated().to(["read","create","delete"])]),
    RaceList: a
      .model({
        id: a.id().required(),
        name: a.string().required(),
      })
      .authorization((allow) => [allow.authenticated().to(["read"])]),
    DropdownList: a
      .model({
        id: a.id().required(),
        name: a.string().required(),
        options: a.string().array(),
      })
      .authorization((allow) => [allow.authenticated().to(["read"])]),
  })
  .authorization((allow) => [allow.resource(postConfirmation)]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});
