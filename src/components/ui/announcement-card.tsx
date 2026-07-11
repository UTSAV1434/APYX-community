"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { Announcement } from "@/types/database";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { cardMotion } from "@/lib/motion";
import { RadialGlow } from "./experience/backgrounds";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  return (
    <motion.div
      {...cardMotion}
      className="h-full flex flex-col"
    >
      <Link href={`/announcements/${announcement.slug}`} className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-apyx-purple rounded-[20px]">
        <Card variant="glass" className="h-full group">
          <RadialGlow />
          
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge variant="brand" className="bg-apyx-purple/20 text-apyx-purple border-apyx-purple/30">
                {announcement.category || "News"}
              </Badge>
              <span className="flex items-center gap-1.5 text-xs font-medium text-apyx-text-muted">
                <Clock className="w-3.5 h-3.5" />
                {new Date(announcement.published_at || announcement.created_at).toLocaleDateString()}
              </span>
            </div>
            <CardTitle className="group-hover:text-apyx-purple transition-colors line-clamp-2">
              {announcement.title}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-grow">
            <p className="text-sm text-apyx-text-secondary line-clamp-3">
              {announcement.content.substring(0, 150) + '...'}
            </p>
          </CardContent>

          <CardFooter className="pt-2">
            <div className="inline-flex items-center text-sm font-bold text-apyx-text-muted group-hover:text-apyx-purple transition-colors">
              Read more <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}
