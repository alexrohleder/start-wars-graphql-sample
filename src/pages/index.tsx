import type { NextPage } from "next";
import { gql } from "@apollo/client";
import client from "../lib/apollo-client";

type Props = {
  allPeople: any;
};

const Home: NextPage<Props> = (props) => {
  return (
    <pre className="bg-red-100">{JSON.stringify(props.allPeople, null, 4)}</pre>
  );
};

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      {
        allPeople(first: 5) {
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
  });

  return {
    props: {
      allPeople: data.allPeople,
    },
  };
}

export default Home;
