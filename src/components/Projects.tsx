import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Search, 
  Filter, 
  Github, 
  ExternalLink, 
  Calendar,
  Star,
  Code,
  Briefcase,
  Users
} from 'lucide-react';
import Fuse from 'fuse.js';
import SectionHeading from './SectionHeading';
import ProjectModal from './ProjectModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import projectsData from '@/data/projects.json';

const categoryFilters = ['All', 'AI/ML', 'Backend', 'AI/Automation'];
const typeFilters = ['All', 'Personal', 'Work', 'OSS'];

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Fuzzy search setup
  const fuse = new Fuse(projectsData, {
    keys: ['title', 'description', 'technologies'],
    threshold: 0.3,
  });

  // Filter and search projects
  const filteredProjects = (() => {
    let filtered = projectsData;

    // Apply category filter
    if (categoryFilter !== 'All') {
      filtered = filtered.filter(project => project.category === categoryFilter);
    }

    // Apply type filter
    if (typeFilter !== 'All') {
      filtered = filtered.filter(project => project.type === typeFilter);
    }

    // Apply search
    if (searchTerm) {
      const searchResults = fuse.search(searchTerm);
      const searchedIds = searchResults.map(result => result.item.id);
      filtered = filtered.filter(project => searchedIds.includes(project.id));
    }

    return filtered;
  })();

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Personal': return Code;
      case 'Work': return Briefcase;
      case 'OSS': return Users;
      default: return Code;
    }
  };

  return (
    <>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <SectionHeading
            id="projects"
            title="Featured Projects"
            subtitle="Showcasing my technical expertise through real-world applications"
          />

          <div ref={ref} className="max-w-7xl mx-auto">
            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="mb-8 space-y-4"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Category:</span>
                  {categoryFilters.map((category) => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoryFilter(category)}
                      className="hover-scale"
                    >
                      {category}
                    </Button>
                  ))}
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  {typeFilters.map((type) => (
                    <Button
                      key={type}
                      variant={typeFilter === type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTypeFilter(type)}
                      className="hover-scale"
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${categoryFilter}-${typeFilter}-${searchTerm}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project, index) => {
                  const TypeIcon = getTypeIcon(project.type);
                  
                  return (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 * index }}
                      className="card-gradient rounded-lg overflow-hidden hover-lift cursor-pointer group"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Project Image Placeholder */}
                      <div className="h-48 bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center relative overflow-hidden">
                        <div className="text-6xl opacity-20">
                          <TypeIcon className="w-16 h-16" />
                        </div>
                        {project.featured && (
                          <div className="absolute top-3 right-3">
                            <Star className="w-5 h-5 text-yellow-500 fill-current" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3">
                          <span className="text-xs bg-background/80 text-foreground px-2 py-1 rounded">
                            {project.type}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        {/* Project Header */}
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                            {project.category}
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1 mb-4">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span key={tech} className="tag text-xs">
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="tag text-xs">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>{project.startDate}</span>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            {project.links?.github && (
                              <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="View on GitHub"
                              >
                                <Github className="w-4 h-4" />
                              </a>
                            )}
                            {project.links?.demo && (
                              <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="View live demo"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* No Results */}
            {filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-muted-foreground">
                  No projects found matching your criteria.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}