import "@mantine/core/styles.css";

import { useEffect, useState } from "react";
import {
  Alert,
  Center,
  Container,
  Loader,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";

import CreateTweet from "./components/CreateTweet";
import TweetList from "./components/TweetList";
import { createTweet, getTweets } from "./lib/api";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState(null);

  async function loadTweets() {
    const data = await getTweets();
    setTweets(data);
  }

  useEffect(() => {
    getTweets()
      .then((data) => setTweets(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(tweet) {
    setPosting(true);
    setError(null);

    try {
      await createTweet(tweet);
      await loadTweets();
    } catch (err) {
      setError(err.message);
      throw err; // let CreateTweet keep the draft on failure
    } finally {
      setPosting(false);
    }
  }

  return (
    <MantineProvider>
      <Container size="sm" py="xl">
        <Stack gap="lg">
          <Title order={1}>Tweeter</Title>

          {error && (
            <Alert
              color="red"
              title="Something went wrong"
              withCloseButton
              onClose={() => setError(null)}
            >
              {error}
            </Alert>
          )}

          <CreateTweet onCreate={handleCreate} submitting={posting} />

          {loading ? (
            <Center py="xl">
              <Loader />
            </Center>
          ) : (
            <TweetList tweets={tweets} />
          )}
        </Stack>
      </Container>
    </MantineProvider>
  );
}
