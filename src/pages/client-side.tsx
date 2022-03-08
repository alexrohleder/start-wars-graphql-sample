import type { NextPage } from "next";
import { useQuery, gql, ApolloProvider } from "@apollo/client";
import client from "../lib/apollo-client";
import ClientOnly from "../components/ClientOnly";

type Props = {
  allPeople: any;
};

function HomeComponent() {
  const { data, loading, error } = useQuery(
    gql`
      query AllPeople($first: Int, $after: String) {
        allPeople(first: $first, after: $after) {
          edges {
            node {
              name
              hairColor
              skinColor
              eyeColor
              gender
              homeworld {
                name
              }
            }
            cursor
          }
          pageInfo {
            startCursor
            endCursor
            hasPreviousPage
            hasNextPage
          }
        }
      }
    `
  );

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <pre className="bg-red-100">{JSON.stringify(error, null, 4)}</pre>;
  }

  return <pre className="bg-green-100">{JSON.stringify(data, null, 4)}</pre>;
}

const Home: NextPage<Props> = (props) => {
  return (
    <ApolloProvider client={client}>
      <ClientOnly>
        <HomeComponent />
      </ClientOnly>
    </ApolloProvider>
  );
};

export default Home;
