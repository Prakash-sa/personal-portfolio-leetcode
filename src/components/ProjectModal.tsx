import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

interface ProjectModalProps {
  project: any;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold">{project.title}</h2>
              <p className="text-muted-foreground">{project.longDescription}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {project.caseStudy && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Problem</h3>
                <p className="text-muted-foreground">{project.caseStudy.problem}</p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">Approach</h3>
                <p className="text-muted-foreground">{project.caseStudy.approach}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Results</h3>
                <ul className="space-y-1">
                  {project.caseStudy.results.map((result: string, index: number) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span key={tech} className="tag">{tech}</span>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            {project.links?.github && (
              <Button asChild>
                <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </a>
              </Button>
            )}
            {project.links?.demo && (
              <Button variant="outline" asChild>
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}