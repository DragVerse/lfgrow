import { gql } from "@apollo/client/core";
import { apolloClient } from "helpers/apollo-client";
import { getAddress } from "helpers/ethers-service";

const DOES_FOLLOW = `
  query($request: DoesFollowRequest!) {
    doesFollow(request: $request) { 
			followerAddress
    	profileId
    	follows
		}
  }
`;

const doesFollowRequest = (followInfos) => {
  return apolloClient.query({
    query: gql(DOES_FOLLOW),
    variables: {
      request: {
        followInfos,
      },
    },
    fetchPolicy: "network-only",
  });
};

const doesFollow = async (profileId) => {
  if (!profileId) {
    throw new Error("profileId is undefined");
  }

  const address = await getAddress();
  const followInfos = [
    {
      followerAddress: address,
      profileId,
    },
  ];
  const result = await doesFollowRequest(followInfos);

  return result.data.doesFollow[0].follows;
};

export default doesFollow;
