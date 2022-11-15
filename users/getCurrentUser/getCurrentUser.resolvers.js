export default {
    Query: {
        getCurrentUser: (_, __, { loggedInUser }) => true,
    },
};
