const { ApolloServer} = require('apollo-server');
const gql = require('graphql-tag');
const mongoose= require('mongoose');

const Post = require('./merng/models/Post.js');
const usersResolvers = require('../merng/user');
const { MONGODB } = require('../merng/config');

// input to tha resolver to return something to us (line 24)
const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        createdAt: String!
        username: String!
    }
    type User{
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
        register (registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
    }
    type Query{
        getPosts: [Post]
    }`;
    
const resolvers = {
    Query: {
        async getPosts() {
        try {
            const posts = await Post.find();
            return posts;
        } catch (err) {
            throw new Error(err);
        }}
    },
    Mutation: {
    ...usersResolvers.Mutation
    }};
const server = new ApolloServer({
    typeDefs,
    resolvers
    });

mongoose.connect (MONGODB, { useNewUrlParser: true })   
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen ({ port: 3003 });
    }) 
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });
    
