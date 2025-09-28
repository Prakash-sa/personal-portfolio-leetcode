import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, GitPullRequest, Trophy, Award } from 'lucide-react';
import SectionHeading from './SectionHeading';
import statsData from '@/data/stats.json';

export default function ActivityStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const statItems = [
    {
      icon: Code,
      label: 'Projects',
      value: statsData.overview.totalProjects,
      color: 'text-blue-500',
    },
    {
      icon: GitPullRequest,
      label: 'OSS Contributions',
      value: statsData.overview.ossContributions,
      color: 'text-green-500',
    },
    {
      icon: Trophy,
      label: 'Certifications',
      value: statsData.overview.certifications,
      color: 'text-yellow-500',
    },
    {
      icon: Award,
      label: 'Years Experience',
      value: statsData.overview.yearsExperience,
      color: 'text-purple-500',
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          id="stats"
          title="Activity & Stats"
          subtitle="My development journey in numbers"
        />

        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statItems.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="card-gradient p-6 text-center rounded-lg hover-lift"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}+
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}