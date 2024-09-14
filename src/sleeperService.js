import Constants from './Constants';

export const getLeague = async (leagueId) => {
    const response = await fetch(`${Constants.apiBase}/${leagueId}`);

    if (!response.ok) {
        throw new Error('Failed to fetch league: ', leagueId);
    }

    return await response.json();

};

export const getLeagueData = async (leagueId) => {
    const [users, rosters] = await Promise.all([getLeagueUsers(leagueId), getLeagueRosters(leagueId)]);

    const transformedData = rosters.map(roster => {
        const matchingUser = users.find(user => user.user_id === roster.owner_id);
        return {
            ...roster,
            ...matchingUser,
            record: roster.settings,
            streak: roster.metadata,
            pfp: getAvatarThumbnail(matchingUser.avatar)
        };
    });

        return sortDataByRecord(transformedData);
};

const getLeagueRosters = async (leagueId) => {
    try {
        const response = await fetch(`${Constants.apiBase}/${leagueId}/rosters`);

        if (!response.ok) {
            throw new Error('Failed to fetch league rosters: ', leagueId);
        }

        return await response.json();
    } catch (error) {
        console.log('Error  fetching league: ');
        throw error;
    }
};
export const getAllLeaguesData = async () => {
    try {
        // Use Promise.all to fetch data for all leagues concurrently
        const allLeaguesData = await Promise.all(
            Constants.tierIds.map(async (leagueId) => {
                // Fetch league data using the existing getLeagueData function
                const leagueData = await getLeagueData(leagueId);
                return {
                    leagueId, // Include the leagueId for reference
                    data: sortDataByRecord(leagueData) // Sort data for each league
                };
            })
        );

        return allLeaguesData; // Return data sorted by league
    } catch (error) {
        console.error('Error fetching data for all leagues:', error);
        throw error;
    }
};


const getLeagueUsers = async (leagueId) => {
    const response = await fetch(`${Constants.apiBase}/${leagueId}/users`);

    if (!response.ok) {
        throw new Error('Failed to fetch league rosters: ', leagueId);
    }

    return await response.json();
 
};

export const getAvatarThumbnail = (avatarId) => {
    return `${Constants.thumbnailBase}${avatarId}`;
};

const sortDataByRecord = (leagueData) => {
    const sortedData = leagueData.sort((a, b) => {
        const recordA = a.record;
        const recordB = b.record;

        if (recordA.wins !== recordB.wins) {
            return recordB.wins - recordA.wins;
        }

        if (recordA.ties !== recordB.ties) {
            return recordB.ties - recordA.ties;
        }

        if (recordA.fpts !== recordB.fpts) {
            return (recordB.fpts + recordB.fpts_decimal/100)  - (recordA.fpts + recordA.fpts_decimal/100); // Descending by fpts
          }

        // If all criteria are the same, return 0 (equal)
        return 0;
    });
    return sortedData;
}