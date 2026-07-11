import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AlbumForm } from "@/components/admin/album-form";

export default function NewGalleryAlbumPage() {
  return (
    <div>
      <div className="px-6 lg:px-10 pt-6 lg:pt-10">
        <Link
          href="/admin/gallery"
          className="inline-flex items-center text-sm font-medium text-apyx-text-muted hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Gallery
        </Link>
      </div>
      <AlbumForm
        title="Create Album"
        description="Create a new photo album for an event."
        submitLabel="Create Album"
      />
    </div>
  );
}
