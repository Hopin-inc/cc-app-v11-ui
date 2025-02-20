import { OpportunityCategory, PublishStatus } from "./types";
import { mockUsers } from "./users";
import { mockCommunities } from "./communities";
import { mockCities } from "./locations";

export const mockOpportunities = [
  {
    id: "opportunity1",
    title: "照季庵 古民家再生プロジェクト説明会（オンライン①）",
    description:
      "築100年以上の古民家を改修し、一棟貸し宿「照季庵」として再生するプロジェクトの説明会です。主に法律・税制について解説します。",
    category: "EVENT" as OpportunityCategory,
    publishStatus: "PUBLIC" as PublishStatus,
    requireApproval: false,
    capacity: 100,
    pointsPerParticipation: 50,
    image: "https://picsum.photos/400",
    files: [],
    startsAt: "2025-01-24T21:00:00+09:00",
    endsAt: "2025-01-24T22:00:00+09:00",
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    createdBy: mockUsers[0].id,
    createdByUser: mockUsers[0],
    cityCode: "JP-37-341",
    city: mockCities[2],
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "opportunity2",
    title: "照季庵 現地内覧会",
    description:
      "小豆島・土庄町の築100年古民家「照季庵」の現地内覧会を開催します。改修前の状態をご覧いただき、プロジェクトの構想についてご説明します。",
    category: "EVENT" as OpportunityCategory,
    publishStatus: "PUBLIC" as PublishStatus,
    requireApproval: true,
    capacity: 20,
    pointsPerParticipation: 200,
    image: "https://picsum.photos/401",
    files: [],
    startsAt: "2025-01-26T10:00:00+09:00",
    endsAt: "2025-01-26T13:00:00+09:00",
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    createdBy: mockUsers[0].id,
    createdByUser: mockUsers[0],
    cityCode: "JP-37-341",
    city: mockCities[2],
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "opportunity3",
    title: "照季庵 投資説明会（現地①）",
    description:
      "Re. Asset DAOによる古民家再生プロジェクトの投資説明会です。合同会社型DAOの仕組み、投資スキーム、リターンについて詳しく解説します。",
    category: "EVENT" as OpportunityCategory,
    publishStatus: "PUBLIC" as PublishStatus,
    requireApproval: true,
    capacity: 30,
    pointsPerParticipation: 150,
    image: "https://picsum.photos/402",
    files: [],
    startsAt: "2025-01-26T14:00:00+09:00",
    endsAt: "2025-01-26T15:30:00+09:00",
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    createdBy: mockUsers[0].id,
    createdByUser: mockUsers[0],
    cityCode: "JP-37-341",
    city: mockCities[2],
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "opportunity4",
    title: "照季庵 社員権トークン購入タスク",
    description:
      "Re. Asset DAOの社員権トークンを購入するタスクです。1口20万円から参加可能で、議決権とリワードトークンが付与されます。購入期間は2025年2月15日までです。",
    category: "TASK" as OpportunityCategory,
    publishStatus: "PUBLIC" as PublishStatus,
    requireApproval: true,
    capacity: null,
    pointsPerParticipation: 1000,
    image: "https://picsum.photos/403",
    files: [],
    startsAt: "2025-01-15T00:00:00+09:00",
    endsAt: "2025-02-15T23:59:59+09:00",
    communityId: mockCommunities[0].id,
    community: mockCommunities[0],
    createdBy: mockUsers[0].id,
    createdByUser: mockUsers[0],
    cityCode: "JP-37-341",
    city: mockCities[2],
    createdAt: "2025-01-15T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
];
