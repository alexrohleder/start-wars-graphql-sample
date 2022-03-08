import type { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

type Props = {
  allPeople: any;
};

const Home: NextPage<Props> = (props) => {
  return <pre className="bg-red-100">{JSON.stringify(props, null, 4)}</pre>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let first = 5;

  if (context.query.first) {
    if (typeof context.query.first === "string") {
      first = parseInt(context.query.first, 10);
    } else {
      // Wrong parameters
    }
  }

  const { data } = await client.query({
    query: gql`
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
    `,
    variables: {
      first,
      after: context.query.after,
    },
  });

  return {
    props: {
      query: context.query,
      allPeople: data.allPeople,
    },
  };
};

export default Home;
