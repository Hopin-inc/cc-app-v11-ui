import { WalletType, TransactionReason } from './types';
import { mockUsers } from './users';
import { mockCommunities } from './communities';

export const mockCurrentPoints = [
  {
    walletId: 'wallet1',
    currentPoint: 1000,
  },
  {
    walletId: 'wallet2',
    currentPoint: 2000,
  },
  {
    walletId: 'wallet3',
    currentPoint: 3000,
  },
  {
    walletId: 'wallet4',
    currentPoint: 500,
  },
  {
    walletId: 'wallet5',
    currentPoint: 1500,
  },
  {
    walletId: 'wallet6',
    currentPoint: 2500,
  },
  {
    walletId: "wallet_rad_community",
    currentPoint: 10000000, // 1000万ポイント（初期調達額を想定）
  },
  {
    walletId: "wallet_rad_yamada",
    currentPoint: 2000000, // 200万ポイント（代表者保有分）
  },
  {
    walletId: "wallet_rad_motojima",
    currentPoint: 2000000, // 200万ポイント（代表者保有分）
  },
];

export const mockWallets = [
  {
    id: 'wallet1',
    type: 'COMMUNITY' as WalletType,
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    userId: null,
    user: null,
    currentPointView: mockCurrentPoints[0],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'wallet2',
    type: 'COMMUNITY' as WalletType,
    communityId: mockCommunities[1].id,
    community: mockCommunities[1],
    userId: null,
    user: null,
    currentPointView: mockCurrentPoints[1],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 'wallet3',
    type: 'COMMUNITY' as WalletType,
    communityId: mockCommunities[2].id,
    community: mockCommunities[2],
    userId: null,
    user: null,
    currentPointView: mockCurrentPoints[2],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: 'wallet4',
    type: 'MEMBER' as WalletType,
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    userId: mockUsers[0].id,
    user: mockUsers[0],
    currentPointView: mockCurrentPoints[3],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'wallet5',
    type: 'MEMBER' as WalletType,
    communityId: mockCommunities[1].id,
    community: mockCommunities[1],
    userId: mockUsers[1].id,
    user: mockUsers[1],
    currentPointView: mockCurrentPoints[4],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
  {
    id: 'wallet6',
    type: 'MEMBER' as WalletType,
    communityId: mockCommunities[2].id,
    community: mockCommunities[2],
    userId: mockUsers[2].id,
    user: mockUsers[2],
    currentPointView: mockCurrentPoints[5],
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
  },
  {
    id: "wallet_rad_community",
    type: "COMMUNITY" as WalletType,
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    userId: null,
    user: null,
    currentPointView: mockCurrentPoints[6],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "wallet_rad_yamada",
    type: "MEMBER" as WalletType,
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    userId: mockUsers[0].id, // 山田代表
    user: mockUsers[0],
    currentPointView: mockCurrentPoints[7],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "wallet_rad_motojima",
    type: "MEMBER" as WalletType,
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    userId: mockUsers[1].id, // 本嶋代表
    user: mockUsers[1],
    currentPointView: mockCurrentPoints[8],
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
];

export const mockTransactions = [
  {
    id: "transaction1",
    reason: "POINISSUED" as TransactionReason,
    from: null,
    fromWallet: null,
    fromPointChange: 0,
    to: mockWallets[6].id,
    toWallet: mockWallets[6],
    toPointChange: 10000000,
    participationId: null,
    utilityId: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "transaction2",
    reason: "OTHER" as TransactionReason,
    from: mockWallets[6].id,
    fromWallet: mockWallets[6],
    fromPointChange: -2000000,
    to: mockWallets[7].id,
    toWallet: mockWallets[7],
    toPointChange: 2000000,
    participationId: null,
    utilityId: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "transaction3",
    reason: "OTHER" as TransactionReason,
    from: mockWallets[6].id,
    fromWallet: mockWallets[6],
    fromPointChange: -2000000,
    to: mockWallets[8].id,
    toWallet: mockWallets[8],
    toPointChange: 2000000,
    participationId: null,
    utilityId: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
];
