// src/api/sportsdb.ts
const SPORTS_DB_API_KEY = "532738"; // Your The Sports DB API key

export const fetchLiveScores = async (): Promise<string> => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v2/json/${SPORTS_DB_API_KEY}/livescore/soccer`
    );
    const data = await response.json();

    if (!data.events) {
      return "No live matches at the moment.";
    }

    const liveMatches = data.events.map(
      (event: any) =>
        `${event.strHomeTeam} ${event.intHomeScore} - ${event.intAwayScore} ${event.strAwayTeam}`
    );

    return liveMatches.join("\n");
  } catch (error) {
    console.error("Error fetching live scores:", error);
    return "Failed to fetch live scores.";
  }
};

export const fetchUpcomingFixtures = async (teamName: string): Promise<string> => {
  try {
    // First, get the team ID
    const teamResponse = await fetch(
      `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_API_KEY}/searchteams.php?t=${teamName}`
    );
    const teamData = await teamResponse.json();

    if (!teamData.teams || teamData.teams.length === 0) {
      return `No team found with the name ${teamName}.`;
    }

    const teamId = teamData.teams[0].idTeam;

    // Now, fetch upcoming fixtures for the team
    const fixturesResponse = await fetch(
      `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_API_KEY}/eventsnext.php?id=${teamId}`
    );
    const fixturesData = await fixturesResponse.json();

    if (!fixturesData.events || fixturesData.events.length === 0) {
      return `No upcoming fixtures found for ${teamName}.`;
    }

    const fixtures = fixturesData.events.map(
      (event: any) =>
        `${event.strHomeTeam} vs ${event.strAwayTeam} on ${event.dateEvent} at ${event.strTime}`
    );

    return fixtures.join("\n");
  } catch (error) {
    console.error("Error fetching upcoming fixtures:", error);
    return "Failed to fetch upcoming fixtures.";
  }
};

export const fetchLeagueMatches = async (leagueName: string): Promise<string> => {
  try {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v2/json/${SPORTS_DB_API_KEY}/search/league/${encodeURIComponent(leagueName)}`
    );
    const data = await response.json();

    if (!data.leagues || data.leagues.length === 0) {
      return `No league found with the name ${leagueName}.`;
    }

    const leagueId = data.leagues[0].idLeague;

    // Fetch events (matches) for the league
    const eventsResponse = await fetch(
      `https://www.thesportsdb.com/api/v1/json/${SPORTS_DB_API_KEY}/eventsseason.php?id=${leagueId}&s=2023-2024`
    );
    const eventsData = await eventsResponse.json();

    if (!eventsData.events || eventsData.events.length === 0) {
      return `No matches found for ${leagueName}.`;
    }

    const matches = eventsData.events.map(
      (event: any) =>
        `${event.strHomeTeam} vs ${event.strAwayTeam} on ${event.dateEvent} at ${event.strTime}`
    );

    return matches.join("\n");
  } catch (error) {
    console.error("Error fetching league matches:", error);
    return "Failed to fetch league matches.";
  }
};