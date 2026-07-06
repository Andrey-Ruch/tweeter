import "@mantine/core/styles.css";

import { useEffect, useMemo, useState } from "react";
import { Container, MantineProvider, Stack, Title } from "@mantine/core";

import CreateTweet from "./components/CreateTweet";
import TweetList from "./components/TweetList";
import { loadTweets, saveTweets } from "./lib/storage";

export default function App() {
  const [tweets, setTweets] = useState(loadTweets);

  useEffect(() => {
    saveTweets(tweets);
  }, [tweets]);

  function addTweet(tweet) {
    setTweets((prev) => [tweet, ...prev]);
  }

  // Sort descending (newest first) so the order holds even for stored tweets.
  const sortedTweets = useMemo(
    () => [...tweets].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [tweets],
  );

  return (
    <MantineProvider>
      <Container size="sm" py="xl">
        <Stack gap="lg">
          <Title order={1}>Tweeter</Title>
          <CreateTweet onCreate={addTweet} />
          <TweetList tweets={sortedTweets} />
        </Stack>
      </Container>
    </MantineProvider>
  );
}
