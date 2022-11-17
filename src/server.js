require("dotenv").config();
import { makeExecutableSchema } from "@graphql-tools/schema";
import { resolvers, typeDefs } from "./schema";
import { createServer } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = async () => {
    const app = express();
    const httpServer = createServer(app);

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });

    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),

            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                },
            },
        ],
    });

    await server.start();

    app.use("/graphql", cors(), bodyParser.json(), expressMiddleware(server));

    const PORT = process.env.PORT;

    await new Promise((r) => httpServer.listen(PORT, r));

    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
};

startServer();
