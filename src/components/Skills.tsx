import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Server, Cloud, Brain, Settings, Database } from 'lucide-react';
import SectionHeading from './SectionHeading';
import { Button } from '@/components/ui/button';
import skillsData from '@/data/skills.json';

const categoryIcons = {
  'Languages': Code,
  'Frontend': Code,
  'Backend & APIs': Server,
  'Cloud & Containerization': Cloud,
  'AI/ML & AI-Assisted Development': Brain,
  'DevOps & CI/CD': Settings,
  'Databases & Messaging': Database,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('Languages');
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const activeSkills = skillsData.categories.find(cat => cat.name === activeCategory)?.skills || [];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <SectionHeading
          id="skills"
          title="Technical Skills"
          subtitle="Technologies and tools I work with"
        />

        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {skillsData.categories.map((category) => {
              const Icon = categoryIcons[category.name as keyof typeof categoryIcons];
              return (
                <Button
                  key={category.name}
                  variant={activeCategory === category.name ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.name)}
                  className="hover-scale"
                >
                  {Icon && <Icon className="w-4 h-4 mr-2" />}
                  {category.name}
                </Button>
              );
            })}
          </motion.div>

          {/* Skills Grid */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-gradient p-6 rounded-lg hover-lift"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                    {skill.category}
                  </span>
                </div>
                
                {/* Skill Progress Bar */}
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1, delay: 0.2 + (0.1 * index) }}
                  />
                </div>
                
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-muted-foreground">Proficiency</span>
                  <span className="text-xs font-medium text-primary">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills Tags Cloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg font-semibold mb-6 text-foreground">All Technologies</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {skillsData.categories.flatMap(cat => cat.skills).map((skill) => (
                <span
                  key={skill.name}
                  className="tag hover-scale cursor-pointer"
                  onClick={() => {
                    const category = skillsData.categories.find(cat => 
                      cat.skills.some(s => s.name === skill.name)
                    );
                    if (category) setActiveCategory(category.name);
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}