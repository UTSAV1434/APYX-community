import { ImageIcon } from "lucide-react";
import { NotFoundState } from "@/components/errors/not-found-state";

export default function AlbumNotFound() {
  return (
    <NotFoundState
      title="Album not found"
      description="This album may have been removed or the link might be incorrect."
      icon={ImageIcon}
      backHref="/gallery"
      backLabel="Back to Gallery"
    />
  );
}
