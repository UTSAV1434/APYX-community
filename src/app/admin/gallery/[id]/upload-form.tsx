"use client";

import { useState } from "react";
import { bulkCreateGalleryItems } from "@/app/actions/gallery";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Upload } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function UploadPhotoForm({ albumId }: { albumId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    const files = formData.getAll("photos") as File[];
    const caption = formData.get("caption") as string;

    const validFiles = files.filter(f => f.size > 0);

    if (validFiles.length === 0) {
      setError("Please select at least one photo to upload.");
      setLoading(false);
      return;
    }

    const uploadedImages: { album_id: string, url: string, caption?: string, type: 'photo' | 'video' }[] = [];

    for (const file of validFiles) {
      const fileExt = file.name.split('.').pop();
      const fileName = `album-${albumId}-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) {
        setError(`Failed to upload one or more photos: ${uploadError.message}`);
        setLoading(false);
        return; // This returns early if one fails, might want to continue in a robust app, but fine for now
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);
        
      uploadedImages.push({
        album_id: albumId,
        url: publicUrl,
        caption: caption || undefined,
        type: 'photo'
      });
    }

    const result = await bulkCreateGalleryItems(uploadedImages, albumId);
    
    if (result?.error) {
      setError(result.error);
    } else {
      // Success, reset the form for the next upload
      form.reset();
      router.refresh(); // Refresh the page to show new image
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-apyx-surface border border-apyx-border rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-end gap-4">
      <div className="w-full">
        <label className="text-sm font-medium text-white mb-2 block">Upload to Album</label>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <Input 
            name="photos" 
            type="file" 
            accept="image/*" 
            multiple
            required 
            className="flex-1 bg-apyx-bg border-apyx-border pt-2.5 h-12 text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20" 
          />
          <Input 
            name="caption" 
            placeholder="Photo Caption (Optional)" 
            className="flex-1 bg-apyx-bg border-apyx-border h-12" 
          />
        </div>
      </div>
      
      {error && <p className="text-sm text-red-400 absolute mt-16">{error}</p>}

      <Button type="submit" disabled={loading} className="bg-apyx-purple hover:bg-apyx-purple/90 text-white h-12 px-6 shrink-0 mt-4 md:mt-0">
        {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Upload className="w-4 h-4 mr-2" />}
        Upload
      </Button>
    </form>
  );
}
