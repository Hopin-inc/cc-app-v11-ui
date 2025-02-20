import { SysRole } from "./types";

export const mockUsers = [
  {
    id: "user1",
    name: "山田健太郎",
    slug: "yamada-kentaro",
    image: "https://picsum.photos/200",
    bio: "Re. Asset DAO代表。不動産×Web3の未来を切り開くイノベーター。",
    sysRole: "USER" as SysRole,
    urlWebsite: "https://example.com/yamada",
    urlX: "https://x.com/yamada",
    urlFacebook: "https://facebook.com/yamada",
    urlInstagram: "https://instagram.com/yamada",
    urlYoutube: null,
    urlTiktok: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "user2",
    name: "本嶋孔太郎",
    slug: "motojima-kotaro",
    image: "https://picsum.photos/201",
    bio: "Re. Asset DAO代表。日本DAO協会の弁護士として、Web3の法的課題に取り組む。",
    sysRole: "USER" as SysRole,
    urlWebsite: "https://example.com/motojima",
    urlX: "https://x.com/motojima",
    urlFacebook: null,
    urlInstagram: null,
    urlYoutube: null,
    urlTiktok: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
  {
    id: "user3",
    name: "佐藤美咲",
    slug: "sato-misaki",
    image: "https://picsum.photos/202",
    bio: "Re. Asset DAOコミュニティマネージャー。古民家再生プロジェクトのコーディネーターとして活動。",
    sysRole: "USER" as SysRole,
    urlWebsite: "https://example.com/sato",
    urlX: "https://x.com/sato",
    urlFacebook: "https://facebook.com/sato",
    urlInstagram: "https://instagram.com/sato",
    urlYoutube: null,
    urlTiktok: null,
    createdAt: "2024-08-01T00:00:00Z",
    updatedAt: "2024-08-01T00:00:00Z",
  },
];
