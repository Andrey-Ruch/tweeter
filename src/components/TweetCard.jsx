import { Group, Paper, Stack, Text } from "@mantine/core";

export default function TweetCard({ tweet }) {
  return (
    <Paper withBorder p="md" radius="md" shadow="xs">
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap">
          <Text fw={600}>{tweet.userName}</Text>

          <Text size="sm" c="dimmed">
            {new Date(tweet.date).toLocaleString()}
          </Text>
        </Group>

        <Text style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {tweet.content}
        </Text>
      </Stack>
    </Paper>
  );
}
