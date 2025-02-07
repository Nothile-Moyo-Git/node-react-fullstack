/**
 * Date created : 30/10/2024
 *
 * Author : Nothile Moyo
 *
 * Description : GraphQL chat schema description file
 *
 */

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import errorResolvers from "../resolvers/ErrorResolvers";

const ErrorQuery = new GraphQLObjectType({
  name: "ErrorQuery",
  fields: {
    errorPageResponse: {
      type: new GraphQLObjectType({
        name: "getErrorPage",
        fields: {
          message: { type: GraphQLString },
        },
      }),
      resolve: errorResolvers.GetErrorPageResolver,
    },
  },
});

const ErrorSchema = new GraphQLSchema({
  query: ErrorQuery,
});

export default ErrorSchema;
