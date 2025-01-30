import {
  type Category,
  type Skill,
  type Project,
  type Opportunity,
} from "@/types";

const categories: Category[] = [
  {
    id: "welfare-health",
    name: "福祉・健康",
    description: "福祉と健康に関連するカテゴリー",
  },
  {
    id: "environment",
    name: "環境保全",
    description: "環境保全に関連するカテゴリー",
  },
  {
    id: "administration",
    name: "総務・行政支援",
    description: "行政支援に関連するカテゴリー",
  },
  {
    id: "disaster-management",
    name: "防災・危機管理",
    description: "防災と危機管理に関連するカテゴリー",
  },
  {
    id: "tourism-culture",
    name: "観光・文化振興",
    description: "観光と文化振興に関連するカテゴリー",
  },
  {
    id: "agriculture",
    name: "農林水産",
    description: "農林水産業に関連するカテゴリー",
  },
  {
    id: "industry-economy",
    name: "産業・経済振興",
    description: "産業と経済振興に関連するカテゴリー",
  },
  {
    id: "education-children",
    name: "教育・子ども支援",
    description: "教育と子ども支援に関連するカテゴリー",
  },
  {
    id: "civil-engineering",
    name: "土木・建設",
    description: "土木と建設に関連するカテゴリー",
  },
  {
    id: "crime-prevention",
    name: "防犯・治安維持",
    description: "防犯と治安維持に関連するカテゴリー",
  },
];

const skills: Skill[] = [
  {
    id: "event-planning",
    name: "イベント企画",
    description: "イベントの企画や運営に関するスキル",
  },
  {
    id: "it",
    name: "IT",
    description: "プログラミングやシステム開発に関するスキル",
  },
  { id: "diy", name: "DIY", description: "日曜大工やものづくりに関するスキル" },
  {
    id: "marketing",
    name: "マーケティング",
    description: "市場分析や販促戦略に関するスキル",
  },
  {
    id: "design",
    name: "デザイン",
    description: "グラフィックデザインやUX/UIデザインに関するスキル",
  },
  {
    id: "writing",
    name: "ライティング",
    description: "文章作成やコピーライティングに関するスキル",
  },
  {
    id: "photography",
    name: "写真撮影",
    description: "写真撮影や編集に関するスキル",
  },
  { id: "cooking", name: "料理", description: "調理や食品開発に関するスキル" },
  {
    id: "gardening",
    name: "ガーデニング",
    description: "園芸や植物の育成に関するスキル",
  },
  {
    id: "teaching",
    name: "教育",
    description: "指導やカリキュラム開発に関するスキル",
  },
  {
    id: "agriculture-tech",
    name: "農業技術",
    description: "農業におけるテクノロジーに関するスキル",
  },
  {
    id: "nutrition",
    name: "栄養学",
    description: "栄養バランスや食事に関する専門知識",
  },
];

export const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "地域で持続可能なビジネスをつくるには？",
    description:
      "地域で持続可能なビジネスを作るためのポイントについて、地域事業者と専門家が議論します。地域資源の活用、マーケティング戦略、資金調達など、実践的な内容を多角的に解説します。\n\n形式：パネルディスカッション（40分議論 + 20分Q&A）\n対象：プロジェクトや地域活性に興味がある人",
    type: "EVENT",
    status: "open",
    projectId: "shodoshima-olive",
    hostId: "host1",
    startsAt: "2025-02-01T13:00:00+09:00",
    endsAt: "2025-02-01T14:00:00+09:00",
    categories: [
      categories.find((c) => c.id === "welfare-health") ?? categories[0],
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "event-planning")!,
      skills.find((s) => s.id === "diy")!,
    ],
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01"),
    host: {
      name: "森田 葉子",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=48&width=48",
    location: {
      name: "小豆島照季庵",
      address: "香川県小豆郡土庄町",
      isOnline: false,
      meetingUrl: undefined,
    },
    project: {
      title: "小豆島オリーブ6次産業化プロジェクト",
      description:
        "小豆島の主要産業であるオリーブ農業を活用し、心身の健康を促進する新しい体験プログラムの開発と実施を行っています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
  },
  {
    id: "2",
    title: "観光業と地域課題解決の両立",
    description:
      "観光業を通じた地域課題解決の可能性について、実例を交えながら紹介します。持続可能な観光モデルの構築方法や、地域コミュニティとの協働についてお話しします。\n\n形式：ライトニングトーク（15分）\n対象：プロジェクト初心者・興味がある人",
    type: "EVENT",
    status: "open",
    projectId: "shikoku-tourism",
    hostId: "host2",
    startsAt: "2025-02-02T15:00:00+09:00",
    endsAt: "2025-02-02T16:00:00+09:00",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
      categories.find((c) => c.id === "industry-economy") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "event-planning")!,
      skills.find((s) => s.id === "marketing")!,
    ],
    createdAt: new Date("2023-07-02"),
    updatedAt: new Date("2023-07-02"),
    host: {
      name: "山田 太郎",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=48&width=48",
    location: {
      name: "善通寺",
      address: "香川県善通寺市善通寺町",
      isOnline: false,
      meetingUrl: undefined,
    },
    project: {
      title: "四国遍路×デジタル：新しい巡礼の形を創る",
      description:
        "地域の歴史的な遍路道を活用し、魅力的な観光プランの開発を通じて地域経済の活性化を目指すプロジェクトを推進しています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
  },
  {
    id: "3",
    title: "古民家再生プロジェクトの清掃サポート",
    description:
      "古民家を活用したコミュニティスペースの清掃作業のお手伝いを募集しています。地域の方々と交流しながら、古民家の魅力を体感できます。\n\n形式：2時間の作業\n対象：運営に興味がある人",
    type: "QUEST",
    status: "open",
    projectId: "shikoku-local-food",
    hostId: "host3",
    startsAt: "2025-02-03T10:00:00+09:00",
    endsAt: "2025-02-03T10:30:00+09:00",
    categories: [
      categories.find((c) => c.id === "administration") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "it")!],
    createdAt: new Date("2023-07-03"),
    updatedAt: new Date("2023-07-03"),
    host: {
      name: "佐藤 智子",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=48&width=48",
    location: {
      name: "かがわ古民家再生・活用センター",
      address: "香川県高松市",
      isOnline: false,
      meetingUrl: undefined,
    },
    project: {
      title: "四国の食文化デジタルアーカイブ",
      description:
        "古民家を活用した伝統的な食文化の保存と発信を行い、地域の魅力を次世代に継承するプロジェクトを推進しています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
  },
  // ... 他のopportunityも同様に更新
  {
    id: "shikoku-pilgrimage-quest-1",
    title: "四国遍路案内アプリのベータテスター募集",
    description:
      "開発中の四国遍路案内アプリのベータ版テストにご協力いただける方を募集します。実際に札所を巡りながら、アプリの使い勝手や改善点をフィードバックしていただきます。\n\n形式：2時間のフィールドテスト\n対象：スマートフォンアプリの操作に慣れている方",
    type: "QUEST",
    status: "open",
    projectId: "shikoku-tourism",
    hostId: "host1",
    startsAt: "2025-02-20T10:00:00+09:00",
    endsAt: "2025-02-20T12:00:00+09:00",
    categories: [categories.find((c) => c.id === "it") ?? categories[0]],
    skills: [skills.find((s) => s.id === "it") ?? skills[0]],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    host: {
      name: "田中 一郎",
      image: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    location: {
      name: "金刀比羅宮",
      address: "香川県仲多度郡琴平町",
      isOnline: false,
      meetingUrl: undefined,
    },
  },
  {
    id: "shodoshima-olive-event-1",
    title: "若手農家が語る：小豆島オリーブの未来",
    description:
      "小豆島で新しくオリーブ栽培を始めた若手農家たちが、その魅力と課題、そして未来への展望を語ります。\n\n形式：ライトニングトーク（15分）+ 交流会\n対象：農業や地域活性化に興味のある方",
    type: "EVENT",
    status: "open",
    projectId: "shodoshima-olive",
    hostId: "host1",
    startsAt: "2025-02-10T15:00:00+09:00",
    endsAt: "2025-02-10T17:00:00+09:00",
    categories: [
      categories.find((c) => c.id === "agriculture") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "agriculture") ?? skills[0]],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    host: {
      name: "山本 美咲",
      image: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    location: {
      name: "小豆島オリーブ公園",
      address: "香川県小豆郡小豆島町西村甲1941-1",
      isOnline: false,
      meetingUrl: undefined,
    },
  },
  {
    id: "shodoshima-olive-quest-1",
    title: "オリーブを使った新商品開発ワークショップ",
    description:
      "小豆島のオリーブ農園で収穫体験をしながら、新商品のアイデアを考えるワークショップを開催します。収穫したオリーブを使って実際に商品化も目指します。\n\n形式：3時間の体験型ワークショップ\n対象：商品企画に興味のある方",
    type: "QUEST",
    status: "open",
    projectId: "shodoshima-olive",
    hostId: "host2",
    startsAt: "2025-02-15T13:00:00+09:00",
    endsAt: "2025-02-15T16:00:00+09:00",
    categories: [
      categories.find((c) => c.id === "agriculture") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "agriculture") ?? skills[0]],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    host: {
      name: "鈴木 健一",
      image: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    location: {
      name: "小豆島オリーブ研究所",
      address: "香川県小豆郡小豆島町",
      isOnline: false,
      meetingUrl: undefined,
    },
  },
  {
    id: "shikoku-food-event-1",
    title: "デジタルで守る：四国の食文化と技",
    description:
      "四国の伝統的な食文化をデジタルで記録・保存する意義と手法について、食文化研究者とデジタルアーカイブの専門家が解説します。\n\n形式：パネルディスカッション（40分議論 + 20分Q&A）\n対象：食文化や地域の伝統に興味のある方",
    type: "EVENT",
    status: "open",
    projectId: "shikoku-local-food",
    hostId: "host3",
    startsAt: "2025-02-25T14:00:00+09:00",
    endsAt: "2025-02-25T15:30:00+09:00",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "research") ?? skills[0]],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    host: {
      name: "中村 恵子",
      image: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    location: {
      name: "香川県立ミュージアム",
      address: "香川県高松市玉藻町5-5",
      isOnline: false,
      meetingUrl: undefined,
    },
  },
  {
    id: "shikoku-food-quest-1",
    title: "郷土料理のデジタルアーカイブ作成",
    description:
      "地域のお年寄りから伝統的な郷土料理のレシピを聞き取り、デジタル化するボランティアを募集します。料理の写真撮影や動画記録もお願いします。\n\n形式：2-3時間の取材活動\n対象：料理や記録作業に興味のある方",
    type: "QUEST",
    status: "open",
    projectId: "shikoku-local-food",
    hostId: "host4",
    startsAt: "2025-03-01T10:00:00+09:00",
    endsAt: "2025-03-01T13:00:00+09:00",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "research") ?? skills[0]],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    host: {
      name: "高橋 幸子",
      image: "/placeholder.svg",
    },
    image: "/placeholder.svg",
    location: {
      name: "さぬき市民活動センター",
      address: "香川県さぬき市",
      isOnline: false,
      meetingUrl: undefined,
    },
  },
];

export const mockProjects: Project[] = [
  {
    id: "shodoshima-olive",
    title: "小豆島オリーブ6次産業化プロジェクト",
    description:
      "小豆島の主要産業であるオリーブ農業を活用し、心身の健康を促進する新しい体験プログラムの開発と実施を行っています。",
    categories: [
      categories.find((c) => c.id === "welfare-health") ?? categories[0],
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "event-planning")!,
      skills.find((s) => s.id === "diy")!,
    ],
    createdAt: new Date("2023-07-01"),
    updatedAt: new Date("2023-07-01"),
    opportunities: mockOpportunities.filter(
      (w) => w.projectId === "shodoshima-olive"
    ),
    icon: "/placeholder.svg?height=64&width=64&text=🌿",
  },
  {
    id: "shikoku-tourism",
    title: "四国遍路×デジタル：新しい巡礼の形を創る",
    description:
      "1200年以上の歴史を持つ四国遍路。この伝統的な巡礼路をテクノロジーの力で現代に適応させ、新しい形の巡礼と地域交流を生み出すプロジェクトです。デジタルスタンプラリー、AR寺社案内、巡礼者同士のコミュニティプラットフォームなどを通じて、伝統と革新の共存を目指します。",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
      categories.find((c) => c.id === "it") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "it") ?? skills[0],
      skills.find((s) => s.id === "marketing") ?? skills[0],
    ],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    opportunities: mockOpportunities.filter(
      (w) => w.projectId === "shikoku-tourism"
    ),
    icon: "/placeholder.svg",
  },
  {
    id: "shikoku-local-food",
    title: "四国の食文化デジタルアーカイブ",
    description:
      "四国各地に伝わる郷土料理や食文化をデジタルで記録・保存し、次世代に継承するプロジェクト。レシピのデジタル化、料理人へのインタビュー、食材の生産者情報など、包括的なデータベースを構築します。",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
      categories.find((c) => c.id === "it") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "it") ?? skills[0],
      skills.find((s) => s.id === "research") ?? skills[0],
    ],
    createdAt: new Date(2024, 0, 1),
    updatedAt: new Date(2024, 0, 1),
    opportunities: mockOpportunities.filter(
      (w) => w.projectId === "shikoku-local-food"
    ),
    icon: "/placeholder.svg",
  },
];

export { categories, skills };

export const messages = [
  {
    id: "1",
    senderId: "user2",
    senderName: "田中さん",
    senderImage: "/placeholder.svg?height=40&width=40",
    content:
      "関わり方の機会をいただき、ありがとうございました。スケジュールの調整をさせていただきたいのですが、来週の火曜日か木曜日でご都合はいかがでしょうか？",
    createdAt: new Date(2023, 6, 1, 14, 30),
    unreadCount: 1,
  },
  {
    id: "2",
    senderId: "user3",
    senderName: "佐藤さん",
    senderImage: "/placeholder.svg?height=40&width=40",
    content:
      "先日の関わり方セッション、大変参考になりました。いただいたアドバイスを元にプロジェクトを進めています。また、懇親会の際にお話しした地域のイベントに参加させていただきたいのですが、詳細を教えていただけますか？",
    createdAt: new Date(2023, 6, 2, 9, 15),
    unreadCount: 3,
  },
  {
    id: "3",
    senderId: "user4",
    senderName: "鈴木さん",
    senderImage: "/placeholder.svg?height=40&width=40",
    content:
      "関わり方セッションでのフィードバック、ありがとうございました。早速、提案いただいたアイデアを取り入れて進めています。来月、プロジェクトの経過報告会を予定していますので、ぜひ遊びに来ていただけると嬉しいです。日程が決まり次第、ご連絡させていただきます。",
    createdAt: new Date(2023, 6, 3, 16, 45),
    unreadCount: 0,
  },
];
