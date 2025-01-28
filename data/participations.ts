import { ParticipationStatus, TransactionReason } from './types';
import { mockUsers } from './users';
import { mockOpportunities } from './opportunities';
import { mockWallets } from './wallets';

export const mockStatusHistories = [
  {
    id: 'history1',
    status: 'APPLIED' as ParticipationStatus,
    participationId: 'participation1',
    createdBy: mockUsers[0].id,
    createdByUser: mockUsers[0],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
  {
    id: 'history2',
    status: 'APPROVED' as ParticipationStatus,
    participationId: 'participation1',
    createdBy: mockUsers[1].id,
    createdByUser: mockUsers[1],
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const mockTransactions = [
  {
    id: 'transaction1',
    reason: 'PARTICIPATION_APPROVED' as TransactionReason,
    from: mockWallets[0].id,
    fromWallet: mockWallets[0],
    fromPointChange: -100,
    to: mockWallets[3].id,
    toWallet: mockWallets[3],
    toPointChange: 100,
    participationId: 'participation1',
    utilityId: null,
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];

export const mockParticipations = [
  {
    id: 'participation1',
    status: 'APPROVED' as ParticipationStatus,
    userId: mockUsers[0].id,
    user: mockUsers[0],
    opportunityId: mockOpportunities[0].id,
    opportunity: mockOpportunities[0],
    statusHistories: mockStatusHistories,
    transactions: mockTransactions,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  },
];
