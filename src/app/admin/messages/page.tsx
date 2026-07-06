import { Metadata } from "next";
import { Mail, Trash2, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { deleteMessage, toggleMessageStatus } from "@/app/actions/contact";

export const metadata: Metadata = {
  title: "Messages | Admin",
};

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  
  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-heading text-white mb-2">Inbox</h1>
        <p className="text-apyx-text-secondary">Read and manage messages submitted via the contact form.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          <p className="text-sm text-red-400">Failed to load messages: {error.message}</p>
        </div>
      )}

      {!messages || messages.length === 0 ? (
        <div className="bg-apyx-surface border border-apyx-border rounded-2xl p-12 text-center">
          <Mail className="w-12 h-12 text-apyx-text-muted mx-auto mb-4 opacity-30" />
          <p className="text-apyx-text-secondary text-lg">Your inbox is empty.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`bg-apyx-surface border rounded-2xl p-6 transition-colors ${
                msg.status === 'unread' 
                  ? 'border-apyx-purple/50 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                  : 'border-apyx-border opacity-70'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-4 md:items-start justify-between mb-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 shrink-0">
                    {msg.status === 'unread' ? (
                      <div className="w-3 h-3 bg-apyx-purple rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                    ) : (
                      <div className="w-3 h-3 bg-apyx-text-muted rounded-full" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-apyx-cyan hover:underline">{msg.email}</a>
                  </div>
                </div>
                <div className="text-sm text-apyx-text-muted whitespace-nowrap">
                  {new Date(msg.created_at).toLocaleString()}
                </div>
              </div>
              
              <div className="pl-6 mb-6">
                <p className="text-apyx-text-secondary whitespace-pre-wrap leading-relaxed">
                  {msg.message}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-apyx-border">
                <form action={async () => {
                  "use server";
                  await toggleMessageStatus(msg.id, msg.status);
                }}>
                  <button 
                    type="submit" 
                    className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                      msg.status === 'unread' 
                        ? 'border-apyx-border text-apyx-text-secondary hover:text-white hover:border-white/20' 
                        : 'border-apyx-purple/30 text-apyx-purple hover:bg-apyx-purple/10'
                    }`}
                  >
                    {msg.status === 'unread' ? (
                      <><CheckCircle className="w-4 h-4" /> Mark as Read</>
                    ) : (
                      <><Circle className="w-4 h-4" /> Mark as Unread</>
                    )}
                  </button>
                </form>

                <form action={async () => {
                  "use server";
                  await deleteMessage(msg.id);
                }}>
                  <button 
                    type="submit" 
                    className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
