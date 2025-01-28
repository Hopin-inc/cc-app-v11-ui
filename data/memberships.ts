import { MembershipStatus, Role } from "./types";
import { mockUsers } from "./users";
import { mockCommunities } from "./communities";

export const mockMemberships = [
  {
    userId: mockUsers[0].id,
    user: mockUsers[0],
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    status: "JOINED" as MembershipStatus,
    role: "OWNER" as Role,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    userId: mockUsers[1].id,
    user: mockUsers[1],
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    status: "JOINED" as MembershipStatus,
    role: "OWNER" as Role,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    userId: mockUsers[2].id,
    user: mockUsers[2],
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    status: "JOINED" as MembershipStatus,
    role: "MANAGER" as Role,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
];
