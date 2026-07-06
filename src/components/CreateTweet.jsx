import { useState } from "react";
import { Button, Group, Paper, Stack, Text, Textarea } from "@mantine/core";

import { DEFAULT_USERNAME, MAX_TWEET_LENGTH } from "../lib/constants";

export default function CreateTweet({ onCreate }) {
  const [content, setContent] = useState("");

  const trimmed = content.trim();
  const isOverLimit = content.length > MAX_TWEET_LENGTH;
  const canSubmit = trimmed.length > 0 && !isOverLimit;

  function handleSubmit() {
    if (!canSubmit) return;

    onCreate({
      id: crypto.randomUUID(),
      content: trimmed,
      userName: DEFAULT_USERNAME,
      date: new Date().toISOString(),
    });

    setContent("");
  }

  return (
    <Paper withBorder p="md" radius="md" shadow="xs">
      <Stack gap="sm">
        <Textarea
          value={content}
          onChange={(event) => setContent(event.currentTarget.value)}
          placeholder="What's happening?"
          autosize
          minRows={3}
          maxRows={8}
          aria-label="Tweet content"
        />

        <Group justify="space-between">
          <Text size="sm" ml="xs" c={isOverLimit ? "red" : "dimmed"}>
            {content.length} / {MAX_TWEET_LENGTH}
          </Text>

          <Button onClick={handleSubmit} disabled={!canSubmit}>
            Tweet
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
