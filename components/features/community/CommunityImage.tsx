import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  imageUrl: string;
  title: string;
};

export const CommunityImage = ({ imageUrl, title }: Props) => {
  return (
    <div className="space-y-3">
      <Dialog>
        <DialogTrigger asChild>
          <button className="w-full relative group hover:cursor-zoom-in border rounded-md">
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
              <ZoomIn className="w-8 h-8 text-white" />
            </div>
            <Image
              src={imageUrl}
              alt={title}
              width={1000}
              height={1000}
              className="rounded-lg w-full transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl w-[90vw] p-0">
          <Image
            src={imageUrl}
            alt={title}
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg"
          />
        </DialogContent>
      </Dialog>
      <span className="text-muted-foreground text-xs ml-4">
        ※ 例です（プロジェクトに応じた説明画像が入る予定）
      </span>
    </div>
  );
};
