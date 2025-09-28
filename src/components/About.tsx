import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Clock, Briefcase, User } from 'lucide-react';
import SectionHeading from './SectionHeading';
import profileData from '@/data/profile.json';

export default function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const highlights = [
    {
      icon: Briefcase,
      label: 'Experience',
      value: profileData.yearsOfExperience + ' years',
    },
    {
      icon: User,
      label: 'Specialization',
      value: profileData.domains.join(', '),
    },
    {
      icon: MapPin,
      label: 'Location',
      value: profileData.location,
    },
    {
      icon: Clock,
      label: 'Availability',
      value: profileData.availability,
    },
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <SectionHeading
          id="about"
          title="About Me"
          subtitle="Get to know more about my background and expertise"
        />

        <div ref={ref} className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-foreground leading-relaxed">
                  {profileData.bio}
                </p>
                <p className="text-muted-foreground">
                  I'm passionate about building scalable software solutions and leveraging 
                  cutting-edge technologies to solve complex problems. My experience spans 
                  across full-stack development, cloud architecture, and AI/ML applications.
                </p>
                <p className="text-muted-foreground">
                  When I'm not coding, you can find me exploring new technologies, 
                  contributing to open-source projects, or mentoring fellow developers 
                  in the community.
                </p>
              </div>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="card-gradient p-6 rounded-lg hover-lift"
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {item.label}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}