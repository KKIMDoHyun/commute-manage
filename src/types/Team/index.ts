export type TTeamMember = {
    id: number;
    name: string;
    subTeams: SubTeams[];
};

type SubTeams = {
    id: number;
    name: string;
    user: User[];
};

type User = {
    id: number;
    name: string;
    email: string;
    isMaster: boolean;
};
