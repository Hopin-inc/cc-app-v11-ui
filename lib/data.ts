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
    projectId: "1",
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
    project: {
      title: "森と人をつなぐウェルネスプロジェクト",
      description:
        "地域の森林資源を活用し、心身の健康を促進する新しい体験プログラムの開発と実施を行っています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
    relatedArticles: [
      {
        id: "1",
        title: "森林セラピーが心と体にもたらす驚きの効果",
        description:
          "最新の研究結果から、森林浴やウッドクラフトが心身の健康に与える影響を探る",
        image: "/placeholder.svg?height=120&width=120",
        url: "https://example.com/article1",
        source: {
          name: "Wellness Today",
          icon: "/placeholder.svg?height=16&width=16",
        },
      },
    ],
  },
  {
    id: "2",
    title: "観光業と地域課題解決の両立",
    description:
      "観光業を通じた地域課題解決の可能性について、実例を交えながら紹介します。持続可能な観光モデルの構築方法や、地域コミュニティとの協働についてお話しします。\n\n形式：ライトニングトーク（15分）\n対象：プロジェクト初心者・興味がある人",
    type: "EVENT",
    status: "open",
    projectId: "2",
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
    project: {
      title: "歴史的木造建築観光プラン",
      description:
        "地域の歴史的な木造建築を活用し、魅力的な観光プランの開発を通じて地域経済の活性化を目指すプロジェクトを推進しています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
    relatedArticles: [
      {
        id: "2",
        title: "古き良き木造建築が観光の目玉に",
        description:
          "歴史的な木造建築を活用した観光プランが、地域経済と文化保護にもたらす効果",
        image: "/placeholder.svg?height=120&width=120",
        url: "https://example.com/article2",
        source: {
          name: "Tourism Trends",
          icon: "/placeholder.svg?height=16&width=16",
        },
      },
    ],
  },
  {
    id: "3",
    title: "古民家再生プロジェクトの清掃サポート",
    description:
      "古民家を活用したコミュニティスペースの清掃作業のお手伝いを募集しています。地域の方々と交流しながら、古民家の魅力を体感できます。\n\n形式：2時間の作業\n対象：運営に興味がある人",
    type: "QUEST",
    status: "open",
    projectId: "3",
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
    project: {
      title: "スマート行政推進プロジェクト",
      description:
        "AIやIoTなどの最新技術を活用し、行政サービスの効率化と市民満足度の向上を目指すプロジェクトを推進しています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
    relatedArticles: [
      {
        id: "3",
        title: "AI活用で変わる行政サービスの未来",
        description:
          "先進自治体におけるAI導入事例と、それがもたらす行政サービスの変革について",
        image: "/placeholder.svg?height=120&width=120",
        url: "https://example.com/article3",
        source: {
          name: "Smart Government Journal",
          icon: "/placeholder.svg?height=16&width=16",
        },
      },
    ],
  },
  {
    id: "4",
    title: "地域のマーケティング施策の提案",
    description:
      "地域の魅力を効果的に発信するためのマーケティング戦略の立案をお手伝いいただける方を募集しています。SNSの活用やコンテンツ制作など、得意分野で貢献いただけます。\n\n形式：1〜3時間の作業（長期関与も可）\n対象：運営に興味がある人",
    type: "QUEST",
    status: "open",
    projectId: "4",
    hostId: "host4",
    startsAt: "2025-02-04T14:00:00+09:00",
    endsAt: "2025-02-04T14:30:00+09:00",
    categories: [
      categories.find((c) => c.id === "education-children") ?? categories[0],
      categories.find((c) => c.id === "agriculture") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "cooking")!,
      skills.find((s) => s.id === "nutrition")!,
    ],
    createdAt: new Date("2023-07-04"),
    updatedAt: new Date("2023-07-04"),
    host: {
      name: "田中 美咲",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=48&width=48",
    project: {
      title: "未来を育む給食プロジェクト",
      description:
        "地域の食文化を次世代に伝えながら、子どもたちの健康的な食生活を支援する新しい給食プログラムの開発を行っています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
    relatedArticles: [
      {
        id: "4",
        title: "給食が変える、子どもたちの食の未来",
        description:
          "地域の特産品を活用した給食メニューが、子どもたちの食育と地域農業に与える影響",
        image: "/placeholder.svg?height=120&width=120",
        url: "https://example.com/article4",
        source: {
          name: "Education & Nutrition Weekly",
          icon: "/placeholder.svg?height=16&width=16",
        },
      },
    ],
  },
  {
    id: "5",
    title: "小さな経済圏を作る方法",
    description:
      "地域内での経済循環を生み出すための具体的な方法について、実践者が解説します。地域通貨、コミュニティビジネス、シェアリングエコノミーなど、様々なアプローチを紹介します。\n\n形式：パネルディスカッション（40分議論 + 20分Q&A）\n対象：プロジェクトや地域活性に興味がある人",
    type: "EVENT",
    status: "open",
    projectId: "5",
    hostId: "host5",
    startsAt: "2025-02-05T16:00:00+09:00",
    endsAt: "2025-02-05T16:30:00+09:00",
    categories: [
      categories.find((c) => c.id === "agriculture") ?? categories[0],
      categories.find((c) => c.id === "environment") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "it")!,
      skills.find((s) => s.id === "agriculture-tech")!,
    ],
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    host: {
      name: "高橋 誠",
      image: "/placeholder.svg?height=40&width=40",
    },
    image: "/placeholder.svg?height=48&width=48",
    project: {
      title: "テクノロジーで守る農地プロジェクト",
      description:
        "最新技術を活用し、持続可能な農業と自然との共生を目指す革新的な獣害対策プロジェクトを推進しています。",
      icon: "/placeholder.svg?height=64&width=64",
    },
    relatedArticles: [
      {
        id: "5",
        title: "ドローンが切り拓く、新時代の農業保護策",
        description:
          "ドローン技術の進化が、いかに獣害問題に新たな解決策をもたらすのか",
        image: "/placeholder.svg?height=120&width=120",
        url: "https://example.com/article5",
        source: {
          name: "Agri-Tech Innovation",
          icon: "/placeholder.svg?height=16&width=16",
        },
      },
    ],
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    title: "森と人をつなぐウェルネスプロジェクト",
    description:
      "地域の森林資源を活用し、心身の健康を促進する新しい体験プログラムの開発と実施を行っています。",
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
    opportunities: mockOpportunities.filter((w) => w.projectId === "1"),
    icon: "/placeholder.svg?height=64&width=64&text=🌿",
  },
  {
    id: "2",
    title: "歴史的木造建築観光プラン",
    description:
      "地域の歴史的な木造建築を活用し、魅力的な観光プランの開発を通じて地域経済の活性化を目指すプロジェクトを推進しています。",
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
    opportunities: mockOpportunities.filter((w) => w.projectId === "2"),
    icon: "/placeholder.svg?height=64&width=64&text=🏯",
  },
  {
    id: "3",
    title: "スマート行政推進プロジェクト",
    description:
      "AIやIoTなどの最新技術を活用し、行政サービスの効率化と市民満足度の向上を目指すプロジェクトを推進しています。",
    categories: [
      categories.find((c) => c.id === "administration") ?? categories[0],
    ],
    skills: [skills.find((s) => s.id === "it")!],
    createdAt: new Date("2023-07-03"),
    updatedAt: new Date("2023-07-03"),
    opportunities: mockOpportunities.filter((w) => w.projectId === "3"),
    icon: "/placeholder.svg?height=64&width=64&text=🤖",
  },
  {
    id: "4",
    title: "未来を育む給食プロジェクト",
    description:
      "地域の食文化を次世代に伝えながら、子どもたちの健康的な食生活を支援する新しい給食プログラムの開発を行っています。",
    categories: [
      categories.find((c) => c.id === "education-children") ?? categories[0],
      categories.find((c) => c.id === "agriculture") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "cooking")!,
      skills.find((s) => s.id === "nutrition")!,
    ],
    createdAt: new Date("2023-07-04"),
    updatedAt: new Date("2023-07-04"),
    opportunities: mockOpportunities.filter((w) => w.projectId === "4"),
    icon: "/placeholder.svg?height=64&width=64&text=🍱",
  },
  {
    id: "5",
    title: "テクノロジーで守る農地プロジェクト",
    description:
      "最新技術を活用し、持続可能な農業と自然との共生を目指す革新的な獣害対策プロジェクトを推進しています。",
    categories: [
      categories.find((c) => c.id === "agriculture") ?? categories[0],
      categories.find((c) => c.id === "environment") ?? categories[0],
    ],
    skills: [
      skills.find((s) => s.id === "it")!,
      skills.find((s) => s.id === "agriculture-tech")!,
    ],
    createdAt: new Date("2023-07-05"),
    updatedAt: new Date("2023-07-05"),
    opportunities: mockOpportunities.filter((w) => w.projectId === "5"),
    icon: "/placeholder.svg?height=64&width=64&text=🚜",
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
