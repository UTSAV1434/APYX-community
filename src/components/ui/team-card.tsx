"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { TeamMember } from "@/types/database";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { cardMotion } from "@/lib/motion";

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface TeamCardProps {
  member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.div {...cardMotion} className="h-full flex flex-col">
      <Card variant="glass" className="h-full group p-0 overflow-hidden">
        <div className="aspect-square relative bg-apyx-bg overflow-hidden">
          {member.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={member.photo} 
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-apyx-text-muted">
              <User className="w-16 h-16 opacity-20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-apyx-surface via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-black/40 hover:bg-apyx-purple text-white backdrop-blur-md transition-colors">
                <LinkedinIcon className="w-4 h-4" />
              </a>
            )}
            {member.github && (
              <a href={member.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-black/40 hover:bg-white hover:text-black text-white backdrop-blur-md transition-colors">
                <GithubIcon className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
        
        <CardContent className="pt-5 pb-6 text-center flex flex-col h-full">
          <h3 className="text-lg font-bold font-heading text-white mb-1">{member.name}</h3>
          <p className="text-apyx-cyan text-sm font-semibold mb-1">{member.position}</p>
          <p className="text-apyx-text-muted text-xs mb-3 font-medium uppercase tracking-wider">{member.generation}</p>
          
          {member.bio && (
            <p className="text-apyx-text-secondary text-sm line-clamp-3 mb-4 flex-grow">{member.bio}</p>
          )}
          
          {member.skills && member.skills.length > 0 && (
            <div className="flex flex-wrap justify-center gap-1.5 mt-auto">
              {member.skills.slice(0, 3).map(skill => (
                <Badge key={skill} variant="outline" className="text-[10px] py-0 px-2 h-5">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 3 && (
                <Badge variant="outline" className="text-[10px] py-0 px-2 h-5 text-apyx-text-muted">
                  +{member.skills.length - 3}
                </Badge>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
