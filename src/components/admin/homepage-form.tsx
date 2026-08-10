"use client";

import { useState } from "react";
import { Loader2, Globe } from "lucide-react";
import { AdminFormLayout } from "@/components/layout/admin-form-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateSetting } from "@/app/actions/settings";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

async function uploadImage(
  file: File
): Promise<{ url?: string; error?: string }> {
  const supabase = createClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `home-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("gallery")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError.message };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("gallery").getPublicUrl(fileName);

  return { url: publicUrl };
}

interface HomepageFormProps {
  initialHero: {
    badge_text: string;
    title: string;
    subtitle: string;
    cta_text: string;
  };
  initialFoundation: {
    title: string;
    title_highlight: string;
    description: string;
    pillars: Array<{ icon: string; title: string; description: string }>;
  };
  initialBuilders: {
    badge_text: string;
    title: string;
    description: string;
    items?: Array<{
      id: string | number;
      name: string;
      role: string;
      image: string;
      description: string;
      featured: boolean;
    }>;
  };
  initialArtifacts: {
    badge_text: string;
    title: string;
    description: string;
    items?: Array<{
      id: string;
      title: string;
      category: string;
      description: string;
      image: string;
      tags: string[];
      link: string;
      featured: boolean;
    }>;
  };
}

export function HomepageForm({ initialHero, initialFoundation, initialBuilders, initialArtifacts }: HomepageFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hero state
  const [hero, setHero] = useState(initialHero);
  
  // Foundation state
  const [foundation, setFoundation] = useState(initialFoundation);

  // Builders state
  const [builders, setBuilders] = useState(initialBuilders);

  // Artifacts state
  const [artifacts, setArtifacts] = useState(initialArtifacts);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Update Hero
      const heroRes = await updateSetting("home_hero", hero as any);
      if (!heroRes.success) throw new Error(heroRes.error);

      // Update Foundation
      const foundationRes = await updateSetting("home_foundation", foundation as any);
      if (!foundationRes.success) throw new Error(foundationRes.error);

      // Update Builders
      const buildersRes = await updateSetting("home_builders", builders as any);
      if (!buildersRes.success) throw new Error(buildersRes.error);

      // Update Artifacts
      const artifactsRes = await updateSetting("home_artifacts", artifacts as any);
      if (!artifactsRes.success) throw new Error(artifactsRes.error);

      router.refresh();
      // Optional: show a success toast here if you have one
    } catch (err: any) {
      setError(err.message || "Failed to update homepage settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePillarChange = (index: number, field: string, value: string) => {
    const newPillars = [...foundation.pillars];
    newPillars[index] = { ...newPillars[index], [field]: value };
    setFoundation({ ...foundation, pillars: newPillars });
  };

  const handleBuilderChange = (index: number, field: string, value: any) => {
    if (!builders.items) return;
    const newItems = [...builders.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setBuilders({ ...builders, items: newItems });
  };

  const handleAddBuilder = () => {
    const newItems = [...(builders.items || [])];
    newItems.push({
      id: Date.now(),
      name: "New Builder",
      role: "Role",
      image: "",
      description: "Description",
      featured: false
    });
    setBuilders({ ...builders, items: newItems });
  };

  const handleRemoveBuilder = (index: number) => {
    if (!builders.items) return;
    const newItems = [...builders.items];
    newItems.splice(index, 1);
    setBuilders({ ...builders, items: newItems });
  };

  const handleArtifactChange = (index: number, field: string, value: any) => {
    if (!artifacts.items) return;
    const newItems = [...artifacts.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setArtifacts({ ...artifacts, items: newItems });
  };

  const handleAddArtifact = () => {
    const newItems = [...(artifacts.items || [])];
    newItems.push({
      id: `a${Date.now()}`,
      title: "New Project",
      category: "Category",
      description: "Description",
      image: "",
      tags: [],
      link: "#",
      featured: false
    });
    setArtifacts({ ...artifacts, items: newItems });
  };

  const handleRemoveArtifact = (index: number) => {
    if (!artifacts.items) return;
    const newItems = [...artifacts.items];
    newItems.splice(index, 1);
    setArtifacts({ ...artifacts, items: newItems });
  };

  return (
    <AdminFormLayout
      title="Homepage Settings"
      description="Update the content displayed on the public homepage."
      backLink="/admin"
      backText="Back to Dashboard"
      error={error}
      onSubmit={handleSubmit}
    >
      <div className="space-y-10">
        
        {/* HERO SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white border-b border-apyx-border pb-2">Hero Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Badge Text" 
              value={hero.badge_text}
              onChange={e => setHero({...hero, badge_text: e.target.value})}
              required
            />
            <Input 
              label="Main Title" 
              value={hero.title}
              onChange={e => setHero({...hero, title: e.target.value})}
              required
            />
          </div>

          <Textarea 
            label="Subtitle"
            value={hero.subtitle}
            onChange={e => setHero({...hero, subtitle: e.target.value})}
            required
            rows={3}
          />

          <Input 
            label="CTA Button Text" 
            value={hero.cta_text}
            onChange={e => setHero({...hero, cta_text: e.target.value})}
            required
          />
        </div>

        {/* FOUNDATION SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white border-b border-apyx-border pb-2 mt-8">Foundation Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Section Title" 
              value={foundation.title}
              onChange={e => setFoundation({...foundation, title: e.target.value})}
              required
            />
            <Input 
              label="Title Highlight" 
              value={foundation.title_highlight}
              onChange={e => setFoundation({...foundation, title_highlight: e.target.value})}
              required
            />
          </div>

          <Textarea 
            label="Section Description"
            value={foundation.description}
            onChange={e => setFoundation({...foundation, description: e.target.value})}
            required
            rows={2}
          />

          <div className="space-y-6 mt-4">
            <h3 className="text-sm font-semibold text-apyx-text-secondary uppercase tracking-wider">The Three Pillars</h3>
            {foundation.pillars.map((pillar, index) => (
              <div key={index} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full bg-apyx-purple/20 text-apyx-purple flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-white">Pillar {index + 1}</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Pillar Title" 
                    value={pillar.title}
                    onChange={e => handlePillarChange(index, 'title', e.target.value)}
                    required
                  />
                  <Input 
                    label="Icon Name (Lucide)" 
                    value={pillar.icon}
                    onChange={e => handlePillarChange(index, 'icon', e.target.value)}
                    required
                  />
                </div>
                <Textarea 
                  label="Pillar Description"
                  value={pillar.description}
                  onChange={e => handlePillarChange(index, 'description', e.target.value)}
                  required
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* BUILDERS SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white border-b border-apyx-border pb-2 mt-8">Builders Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Badge Text" 
              value={builders.badge_text}
              onChange={e => setBuilders({...builders, badge_text: e.target.value})}
              required
            />
            <Input 
              label="Main Title" 
              value={builders.title}
              onChange={e => setBuilders({...builders, title: e.target.value})}
              required
            />
          </div>

          <Textarea 
            label="Section Description"
            value={builders.description}
            onChange={e => setBuilders({...builders, description: e.target.value})}
            required
            rows={2}
          />

          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-apyx-text-secondary uppercase tracking-wider">Builders List</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddBuilder}>
                + Add Builder
              </Button>
            </div>
            
            {builders.items?.map((builder, index) => (
              <div key={builder.id} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-apyx-cyan/20 text-apyx-cyan flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-white">{builder.name || "New Builder"}</span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveBuilder(index)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Name" 
                    value={builder.name}
                    onChange={e => handleBuilderChange(index, 'name', e.target.value)}
                    required
                  />
                  <Input 
                    label="Role" 
                    value={builder.role}
                    onChange={e => handleBuilderChange(index, 'role', e.target.value)}
                    required
                  />
                  <div>
                    <Input 
                      label="Image URL (or upload below)" 
                      value={builder.image}
                      onChange={e => handleBuilderChange(index, 'image', e.target.value)}
                      required
                    />
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        className="text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const res = await uploadImage(file);
                            if (res.url) {
                              handleBuilderChange(index, 'image', res.url);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-white cursor-pointer mt-8">
                    <input 
                      type="checkbox" 
                      checked={builder.featured}
                      onChange={e => handleBuilderChange(index, 'featured', e.target.checked)}
                      className="rounded border-white/20 bg-black/50 text-apyx-purple focus:ring-apyx-purple focus:ring-offset-black"
                    />
                    Featured Builder (Large Card)
                  </label>
                </div>
                <Textarea 
                  label="Description"
                  value={builder.description}
                  onChange={e => handleBuilderChange(index, 'description', e.target.value)}
                  required
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ARTIFACTS SECTION */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-heading text-white border-b border-apyx-border pb-2 mt-8">Artifacts Section</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Badge Text" 
              value={artifacts.badge_text}
              onChange={e => setArtifacts({...artifacts, badge_text: e.target.value})}
              required
            />
            <Input 
              label="Main Title" 
              value={artifacts.title}
              onChange={e => setArtifacts({...artifacts, title: e.target.value})}
              required
            />
          </div>

          <Textarea 
            label="Section Description"
            value={artifacts.description}
            onChange={e => setArtifacts({...artifacts, description: e.target.value})}
            required
            rows={2}
          />

          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-apyx-text-secondary uppercase tracking-wider">Artifacts List</h3>
              <Button type="button" variant="outline" size="sm" onClick={handleAddArtifact}>
                + Add Artifact
              </Button>
            </div>
            
            {artifacts.items?.map((artifact, index) => (
              <div key={artifact.id} className="bg-white/5 border border-white/10 p-4 rounded-xl space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-apyx-purple/20 text-apyx-purple flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <span className="font-medium text-white">{artifact.title || "New Project"}</span>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleRemoveArtifact(index)} className="text-red-400 hover:text-red-300 hover:bg-red-400/10">
                    Remove
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Title" 
                    value={artifact.title}
                    onChange={e => handleArtifactChange(index, 'title', e.target.value)}
                    required
                  />
                  <Input 
                    label="Category (Badge)" 
                    value={artifact.category}
                    onChange={e => handleArtifactChange(index, 'category', e.target.value)}
                    required
                  />
                  <div>
                    <Input 
                      label="Image URL (or upload below)" 
                      value={artifact.image}
                      onChange={e => handleArtifactChange(index, 'image', e.target.value)}
                      required
                    />
                    <div className="mt-2">
                      <Input
                        type="file"
                        accept="image/*"
                        className="text-apyx-text-secondary cursor-pointer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-apyx-purple/10 file:text-apyx-purple hover:file:bg-apyx-purple/20"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const res = await uploadImage(file);
                            if (res.url) {
                              handleArtifactChange(index, 'image', res.url);
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <Input 
                    label="Project Link" 
                    value={artifact.link}
                    onChange={e => handleArtifactChange(index, 'link', e.target.value)}
                    required
                  />
                  <Input 
                    label="Tags (Comma separated)" 
                    value={artifact.tags.join(", ")}
                    onChange={e => {
                      const tags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                      handleArtifactChange(index, 'tags', tags);
                    }}
                    required
                  />
                  <label className="flex items-center gap-2 text-sm text-white cursor-pointer mt-8">
                    <input 
                      type="checkbox" 
                      checked={artifact.featured}
                      onChange={e => handleArtifactChange(index, 'featured', e.target.checked)}
                      className="rounded border-white/20 bg-black/50 text-apyx-purple focus:ring-apyx-purple focus:ring-offset-black"
                    />
                    Featured Artifact (Large Card)
                  </label>
                </div>
                <Textarea 
                  label="Description"
                  value={artifact.description}
                  onChange={e => handleArtifactChange(index, 'description', e.target.value)}
                  required
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-6 border-t border-apyx-border mt-8">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button 
          type="submit" 
          className="bg-apyx-purple hover:bg-apyx-purple/90 text-white min-w-[120px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <>
              <Globe className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </AdminFormLayout>
  );
}
