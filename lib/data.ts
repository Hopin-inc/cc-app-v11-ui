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
  {
    id: "business",
    name: "ビジネス",
    description: "ビジネスに関するスキル",
  },
  {
    id: "research",
    name: "研究",
    description: "研究に関するスキル",
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
      skills.find((s) => s.id === "business") ?? skills[0],
      skills.find((s) => s.id === "marketing") ?? skills[0],
    ],
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15"),
    host: {
      name: "山田太郎",
      image: "https://api.dicebear.com/7.x/personas/svg?seed=host1",
      title: "地域活性化コンサルタント",
      bio: "10年以上にわたり、全国各地の地域活性化プロジェクトに携わってきました。",
    },
    capacity: 5,
    participants: [
      {
        id: "user1",
        name: "佐藤一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user1",
      },
      {
        id: "user2",
        name: "鈴木花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user2",
      },
      {
        id: "user3",
        name: "田中健一",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user3",
      },
      {
        id: "user4",
        name: "渡辺美咲",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user4",
      },
      {
        id: "user5",
        name: "小林誠",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user5",
      },
    ],
    recommendedFor: [
      "知多、西三河エリアで観光に関する業務を実践、興味がある方",
      "発酵文化にまつわる事業を行われている方",
      "食文化を基軸にしたインバウンド観光に関係する方",
    ],
    relatedArticles: [
      {
        title: "折山尚美：地域活性化の新しい形を求めて",
        url: "/interviews/oriyama",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "結婚を契機に南信州へ移住され、今や地域に欠くことのできない存在。飲食店や古民家・文化財の活用などを通じて地域活性にまつわる幅広い活動に携わる原動力について伺いました。",
        publishedAt: "2024/01/16",
      },
      {
        title: "小豆島オリーブが繋ぐ、地域の未来",
        url: "/articles/shodoshima-olive-future",
        type: "article",
        image: "/placeholder.svg",
        description:
          "小豆島のオリーブ産業を通じた地域活性化の取り組みと、その未来像について考察します。",
        publishedAt: "2024/01/20",
      },
    ],
    image: "/placeholder.svg",
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
      icon: "/placeholder.svg",
    },
  },
  {
    id: "2",
    title: "観光業と地域課題解決の両立",
    description:
      "観光業を通じた地域課題解決の可能性について、実例を交えながら紹介します。持続可能な観光モデルの構築方法や、地域コミュニティとの協働についてお話しします。",
    type: "EVENT",
    status: "open",
    projectId: "shikoku-food",
    hostId: "host2",
    startsAt: "2025-02-15T15:00:00+09:00",
    endsAt: "2025-02-15T16:30:00+09:00",
    categories: [
      categories.find((c) => c.id === "tourism-culture") ?? categories[0],
      categories.find((c) => c.id === "community") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "tourism") ?? skills[0],
      skills.find((s) => s.id === "community-building") ?? skills[0],
    ],
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
    host: {
      name: "中村恵子",
      image: "https://api.dicebear.com/7.x/personas/svg?seed=host2",
      title: "観光まちづくりコンサルタント",
      bio: "10年以上にわたり、全国各地の観光まちづくりに携わる。特に四国地方での実績が豊富で、地域の伝統と現代のニーズを組み合わせた持続可能な観光モデルの構築を得意とする。",
    },
    capacity: 3,
    participants: [
      {
        id: "user6",
        name: "山本和也",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user6",
      },
      {
        id: "user7",
        name: "伊藤さくら",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user7",
      },
      {
        id: "user8",
        name: "加藤健太",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user8",
      },
    ],
    recommendedFor: [
      "観光業に関心がある方",
      "地域課題解決に関心がある方",
      "持続可能な観光モデルに関心がある方",
    ],
    relatedArticles: [
      {
        title: "観光と地域の共生を目指して",
        url: "/interviews/yamada",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "持続可能な観光モデルの構築について、山田氏の豊富な経験と知見を伺います。",
        publishedAt: "2024/01/15",
      },
      {
        title: "四国遍路の新しい可能性",
        url: "/articles/shikoku-pilgrimage-future",
        type: "article",
        image: "/placeholder.svg",
        description:
          "伝統的な四国遍路とデジタル技術の融合がもたらす新しい巡礼の形を探ります。",
        publishedAt: "2024/01/18",
      },
    ],
    image: "/placeholder.svg",
    location: {
      name: "善通寺",
      address: "香川県善通寺市善通寺町",
      isOnline: false,
      meetingUrl: undefined,
    },
    project: {
      title: "四国遍路×デジタル：新しい巡礼の形を創る",
      description:
        "1200年以上の歴史を持つ四国遍路。この伝統的な巡礼路をテクノロジーの力で現代に適応させ、新しい形の巡礼と地域交流を生み出すプロジェクトです。デジタルスタンプラリー、AR寺社案内、巡礼者同士のコミュニティプラットフォームなどを通じて、伝統と革新の共存を目指します。",
      icon: "/placeholder.svg",
    },
  },
  {
    id: "3",
    title: "古民家再生プロジェクトの清掃サポート",
    description:
      "古民家を活用したコミュニティスペースの清掃作業のお手伝いを募集しています。地域の方々と交流しながら、古民家の魅力を体感できます。",
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
      image: "/placeholder.svg",
      title: "古民家再生アドバイザー",
      bio: "古民家の再生と活用を通じて、地域コミュニティの活性化に取り組む。特に、若者と地域の高齢者をつなぐプロジェクトの企画・運営を得意とする。",
    },
    pointsForComplete: 500,
    capacity: 20,
    participants: [
      {
        id: "user1",
        name: "佐藤一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user1",
      },
      {
        id: "user5",
        name: "中村一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user5",
      },
      {
        id: "user6",
        name: "伊藤花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user6",
      },
    ],
    recommendedFor: [
      "古民家再生に関心がある方",
      "地域コミュニティに関心がある方",
      "清掃作業に関心がある方",
    ],
    relatedArticles: [
      {
        title: "古民家が紡ぐ、世代を超えた絆",
        url: "/interviews/sato",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "古民家再生を通じた地域コミュニティづくりについて、佐藤氏の思いと取り組みを紹介します。",
        publishedAt: "2024/01/14",
      },
      {
        title: "地域の記憶を未来へ",
        url: "/articles/local-heritage",
        type: "article",
        image: "/placeholder.svg",
        description:
          "古民家に残る地域の記憶を、どのように未来へ継承していくのか。その方法と意義を考えます。",
        publishedAt: "2024/01/17",
      },
    ],
    image: "/placeholder.svg",
    location: {
      name: "かがわ古民家再生・活用センター",
      address: "香川県高松市",
      isOnline: false,
      meetingUrl: undefined,
    },
    project: {
      title: "四国の食文化デジタルアーカイブ",
      description:
        "四国各地に伝わる郷土料理や食文化をデジタルで記録・保存し、次世代に継承するプロジェクト。レシピのデジタル化、料理人へのインタビュー、食材の生産者情報など、包括的なデータベースを構築します。",
      icon: "/placeholder.svg",
    },
  },
  {
    id: "shikoku-pilgrimage-quest-1",
    title: "四国遍路案内アプリのベータテスター募集",
    description:
      "開発中の四国遍路案内アプリのベータ版テストにご協力いただける方を募集します。実際に札所を巡りながら、アプリの使い勝手や改善点をフィードバックしていただきます。",
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
      title: "デジタルヘリテージ研究者",
      bio: "文化遺産のデジタル保存・活用を専門とする研究者。四国遍路のデジタルアーカイブプロジェクトを主導し、伝統文化とテクノロジーの融合に取り組んでいる。",
    },
    capacity: 40,
    pointsForComplete: 500,
    participants: [
      {
        id: "user7",
        name: "山田一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user7",
      },
      {
        id: "user8",
        name: "鈴木花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user8",
      },
    ],
    recommendedFor: [
      "四国遍路に関心がある方",
      "スマートフォンアプリの操作に関心がある方",
      "フィールドテストに関心がある方",
    ],
    relatedArticles: [
      {
        title: "デジタルで守る日本の文化遺産",
        url: "/interviews/tanaka",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "文化遺産のデジタル保存について、田中氏の研究と展望を伺います。",
        publishedAt: "2024/01/13",
      },
      {
        title: "テクノロジーが拓く文化財の未来",
        url: "/articles/digital-heritage",
        type: "article",
        image: "/placeholder.svg",
        description:
          "最新技術を活用した文化財の保存と活用の可能性について考察します。",
        publishedAt: "2024/01/19",
      },
    ],
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
      "小豆島で新しくオリーブ栽培を始めた若手農家たちが、その魅力と課題、そして未来への展望を語ります。",
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
      title: "小豆島オリーブ農園 若手農家代表",
      bio: "3年前に就農し、伝統的なオリーブ栽培に新しい視点を取り入れながら、若手農家のネットワーク作りにも力を入れている。6次産業化による地域活性化を目指す。",
    },
    capacity: 60,
    participants: [
      {
        id: "user7",
        name: "山田一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user7",
      },
      {
        id: "user8",
        name: "鈴木花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user8",
      },
    ],
    recommendedFor: [
      "小豆島オリーブに関心がある方",
      "農業に関心がある方",
      "地域活性化に関心がある方",
    ],
    relatedArticles: [
      {
        title: "次世代が描く小豆島オリーブの未来",
        url: "/interviews/yamamoto",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "若手農家として小豆島のオリーブ農業に新風を吹き込む山本氏に、その思いと展望を伺います。",
        publishedAt: "2024/01/12",
      },
      {
        title: "オリーブ栽培の技術革新",
        url: "/articles/olive-innovation",
        type: "article",
        image: "/placeholder.svg",
        description:
          "伝統的なオリーブ栽培に、どのような技術革新が求められているのか。現場からの報告。",
        publishedAt: "2024/01/21",
      },
    ],
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
      "小豆島のオリーブ農園で収穫体験をしながら、新商品のアイデアを考えるワークショップを開催します。収穫したオリーブを使って実際に商品化も目指します。",
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
      title: "食品開発コンサルタント",
      bio: "20年以上の食品開発経験を持ち、特に地域特産品を活用した商品開発を得意とする。小豆島のオリーブを使った新商品開発プロジェクトでは、若手農家とのコラボレーションを推進している。",
    },
    capacity: 80,
    pointsForComplete: 500,
    participants: [
      {
        id: "user1",
        name: "佐藤一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user1",
      },
      {
        id: "user11",
        name: "山田一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user11",
      },
      {
        id: "user12",
        name: "鈴木花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user12",
      },
    ],
    recommendedFor: [
      "オリーブに関心がある方",
      "新商品開発に関心がある方",
      "ワークショップに関心がある方",
    ],
    relatedArticles: [
      {
        title: "地域資源を活かした商品開発",
        url: "/interviews/suzuki",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "食品開発の専門家として、地域特産品を活かした商品開発の極意を語る。",
        publishedAt: "2024/01/11",
      },
      {
        title: "オリーブの新たな可能性",
        url: "/articles/olive-new-value",
        type: "article",
        image: "/placeholder.svg",
        description:
          "小豆島のオリーブを使った新商品開発の最前線。若手農家との協働による新しい取り組み。",
        publishedAt: "2024/01/22",
      },
    ],
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
      "四国の伝統的な食文化をデジタルで記録・保存する意義と手法について、食文化研究者とデジタルアーカイブの専門家が解説します。\n\n形式：パネルディスカッション（40分議論 + 20分Q&A）",
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
      title: "食文化研究者",
      bio: "四国の食文化研究の第一人者。特に、地域に伝わる伝統的な調理法や食材の歴史的背景について、フィールドワークを通じた研究を行っている。デジタルアーカイブによる記録保存にも取り組む。",
    },
    capacity: 100,
    participants: [
      {
        id: "user13",
        name: "伊藤一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user13",
      },
      {
        id: "user14",
        name: "山田花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user14",
      },
    ],
    recommendedFor: [
      "四国の食文化に関心がある方",
      "デジタルアーカイブに関心がある方",
      "食文化研究に関心がある方",
    ],
    relatedArticles: [
      {
        title: "デジタルで継承する食文化",
        url: "/interviews/nakamura",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "四国の食文化研究の第一人者が語る、デジタル時代の文化継承の在り方。",
        publishedAt: "2024/01/10",
      },
      {
        title: "失われゆく郷土の味を守る",
        url: "/articles/preserve-local-taste",
        type: "article",
        image: "/placeholder.svg",
        description:
          "急速に失われつつある地域の食文化。その記録と継承の取り組みについて。",
        publishedAt: "2024/01/23",
      },
    ],
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
      "地域のお年寄りから伝統的な郷土料理のレシピを聞き取り、デジタル化するボランティアを募集します。料理の写真撮影や動画記録もお願いします。\n\n形式：2-3時間の取材活動",
    type: "QUEST",
    pointsForComplete: 500,
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
      title: "フードアーキビスト",
      bio: "料理研究家としての経験を活かし、現在は各地の郷土料理のデジタルアーカイブ化に取り組む。特に、高齢者から若い世代への技術継承を重視した記録手法を開発している。",
    },
    capacity: 120,
    participants: [
      {
        id: "user15",
        name: "鈴木一郎",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user15",
      },
      {
        id: "user16",
        name: "伊藤花子",
        image: "https://api.dicebear.com/7.x/personas/svg?seed=user16",
      },
    ],
    recommendedFor: [
      "郷土料理に関心がある方",
      "デジタルアーカイブに関心がある方",
      "取材活動に関心がある方",
    ],
    relatedArticles: [
      {
        title: "記録が紡ぐ食の物語",
        url: "/interviews/takahashi",
        type: "interview",
        image: "/placeholder.svg",
        description:
          "郷土料理のデジタルアーカイブに取り組む高橋氏が語る、食文化記録の意義と手法。",
        publishedAt: "2024/01/09",
      },
      {
        title: "次世代に伝える郷土の味",
        url: "/articles/next-generation-taste",
        type: "article",
        image: "/placeholder.svg",
        description:
          "若い世代に向けた郷土料理の継承。デジタル技術を活用した新しいアプローチ。",
        publishedAt: "2024/01/24",
      },
    ],
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
    icon: "/placeholder.svg",
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
    senderImage: "/placeholder.svg",
    content:
      "関わり方の機会をいただき、ありがとうございました。スケジュールの調整をさせていただきたいのですが、来週の火曜日か木曜日でご都合はいかがでしょうか？",
    createdAt: new Date(2023, 6, 1, 14, 30),
    unreadCount: 1,
  },
  {
    id: "2",
    senderId: "user3",
    senderName: "佐藤さん",
    senderImage: "/placeholder.svg",
    content:
      "先日の関わり方セッション、大変参考になりました。いただいたアドバイスを元にプロジェクトを進めています。また、懇親会の際にお話しした地域のイベントに参加させていただきたいのですが、詳細を教えていただけますか？",
    createdAt: new Date(2023, 6, 2, 9, 15),
    unreadCount: 3,
  },
  {
    id: "3",
    senderId: "user4",
    senderName: "鈴木さん",
    senderImage: "/placeholder.svg",
    content:
      "関わり方セッションでのフィードバック、ありがとうございました。早速、提案いただいたアイデアを取り入れて進めています。来月、プロジェクトの経過報告会を予定していますので、ぜひ遊びに来ていただけると嬉しいです。日程が決まり次第、ご連絡させていただきます。",
    createdAt: new Date(2023, 6, 3, 16, 45),
    unreadCount: 0,
  },
];
