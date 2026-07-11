import { ImageIcon } from "lucide-react";
import { NotFoundState } from "@/components/errors/not-found-state";

export default function AdminAlbumNotFound() {
  return (
    <NotFoundState
      title="Album not found"
      description="This album may have been removed or the link might be incorrect."
      icon={ImageIcon}
      backHref="/admin/gallery"
      backLabel="Back to Gallery"
      variant="admin"
    />
  );
}
