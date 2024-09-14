import Constants from './Constants';

export const getLeague = async (leagueId) => {
    try {
        const response = await fetch(`${Constants.apiBase}/${leagueId}`);

        if (!response.ok) {
            throw new Error('Failed to fetch league: ', leagueId);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getLeagueData = async (leagueId) => {
    try {
        const [users, rosters] = await Promise.all([getLeagueUsers(leagueId), getLeagueRosters(leagueId)]);

        const transformedData = rosters.map(roster => {
            const matchingUser = users.find(user => user.user_id === roster.owner_id);
            return { ...roster, ...matchingUser };
        });

        return await transformedData;
    } catch (error) {
        throw error;
    }
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

const getLeagueUsers = async (leagueId) => {
    try {
        const response = await fetch(`${Constants.apiBase}/${leagueId}/users`);

        if (!response.ok) {
            throw new Error('Failed to fetch league rosters: ', leagueId);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const getAvatarThumbnail = (avatarId) => {
    return `${Constants.thumbnailBase}${avatarId}`;
};