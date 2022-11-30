const { ApolloServer } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const Post = require("../merng/models/Post");
const usersResolvers = require("../merng/graphql/user");
const postsResolvers = require("../merng/graphql/post");
const { MONGODB } = require("./config");

// input to tha resolver to return something to us (line 24)
const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
`;

const resolvers = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        // sort for sorting post sot hat new post is on top, -1 to sort by createdat in decending order
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation
  },
};

//context with take the request body and will return the request: use header to check the user is authenticated
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context : ({ req }) => ({ req })
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 3003 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
