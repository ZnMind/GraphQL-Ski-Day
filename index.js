const { ApolloServer, gql, MockList } = require("apollo-server");

//Abstract syntax tree
const typeDefs = gql`
    scalar Date

    """
    An object that describes the characteristics of a ski day
    """
    type SkiDay {
        "A ski day's unique identifier"
        id: ID!
        "The date a ski day occured"
        date: Date!
        "The location a ski day occured"
        mountain: String!
        "The state of the snow on this day"
        conditions: Conditions
    }

    enum Conditions {
        POWDER
        HEAVY
        ICE
        THIN
    }
    
    type Query {
        totalDays: Int!
        allDays: [SkiDay!]!
    }

    input AddDayInput {
        date: Date!
        mountain: String!
        conditions: Conditions
    }

    type RemoveDayPayload {
        day: SkiDay!
        removed: Boolean
        totalBefore: Int
        totalAfter: Int
    }

    type Mutation {
        addDay(input: AddDayInput!): SkiDay!
        removeDay(id: ID!): RemoveDayPayload!
    }

    type Subscription {
        newDay: SkiDay!
    }
`;

const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Stuff",
    /* Query: () => ({
        allDays: () => new MockList(8)
    }) */
};

const server = new ApolloServer({
    typeDefs,
    mocks
});

server
    .listen()
    .then(({url}) => 
        console.log(`GQL Server running at ${url}`)
    );