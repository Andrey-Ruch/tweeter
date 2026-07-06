import { useState } from "react";
import { Button, Group, Paper, Stack, Text, Textarea } from "@mantine/core";

import { DEFAULT_USERNAME, MAX_TWEET_LENGTH } from "../lib/constants";

export default function CreateTweet({ onCreate, submitting }) {
  const [content, setContent] = useState("");

  const trimmed = content.trim();
  const isOverLimit = content.length > MAX_TWEET_LENGTH;
  const canSubmit = trimmed.length > 0 && !isOverLimit;

  async function handleSubmit() {
    if (!canSubmit || submitting) return;

    try {
      await onCreate({
        content: trimmed,
        userName: DEFAULT_USERNAME,
        date: new Date().toISOString(),
      });
      setContent(""); // clear only on success so a failed post keeps the draft
    } catch {
      // Error is surfaced by the parent; keep the draft for retry.
      console.error("Failed to create tweet");
    }
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

          <Button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            loading={submitting}
          >
            Tweet
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
}
