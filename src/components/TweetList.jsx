import { Stack, Text } from "@mantine/core";

import TweetCard from "./TweetCard";

export default function TweetList({ tweets }) {
  if (tweets.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        No tweets yet. Be the first to post!
      </Text>
    );
  }

  return (
    <Stack gap="md">
      {tweets.map((tweet) => (
        <TweetCard key={tweet.id} tweet={tweet} />
      ))}
    </Stack>
  );
}
