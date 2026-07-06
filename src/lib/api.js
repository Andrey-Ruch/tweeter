// Server boundary - the only place that talks to the Tweets backend.
// Backed by the project's own Supabase table via the official JS client.

import { supabase } from "./supabase";

export async function getTweets() {
  // Server-side descending sort so newest is first without client sorting.
  const { data, error } = await supabase
    .from("Tweets")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw new Error(error.message);

  return data;
}

export async function createTweet({ content, userName, date }) {
  const { data, error } = await supabase
    .from("Tweets")
    .insert({ content, userName, date })
    .select()
    .single(); // return the inserted row

  if (error) throw new Error(error.message);

  return data;
}
