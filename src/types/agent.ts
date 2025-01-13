type Tool =
  | "DUCK_DUCK_GO_SEARCH"
  | "SEMANTIC_SCHOLER"
  | "WIKIDATA"
  | "WIKIPEDIA"
  | "YAHOO_FINANCE"
  | "YOUTUBE_SEARCH"
  | "ARXIV"
  | "PUBMED"
  | "GOOGLE_SEARCH"
  | "BING_SEARCH"
  | "GOOGLE_SCHOLAR"
  | "STACK_OVERFLOW"
  | "GITHUB_REPO_SEARCH"
  | "TWITTER_API"
  | "REDDIT_API"
  | "NEWS_API"
  | "WEATHER_API"
  | "IMDB_API"
  | "SPOTIFY_API"
  | "OPENAI_API"
  | "LINKEDIN_API"
  | "INSTAGRAM_API"
  | "OPENSTREETMAP"
  | "TRELLO_API"
  | "JIRA_API"
  | "SLACK_API"
  | "DISCORD_API"
  | "AMAZON_PRODUCT_API"
  | "TMDB_API"
  | "KAGGLE_API";

export type Agent = {
  id?: number | string;
  role: string;
  goal: string;
  backstory?: string | null;
  tools: Array<Tool>;
  allowDelegation: boolean;
  verbose: boolean;
  memory?: boolean;
  image?: string | null;
};
