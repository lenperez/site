import { motion } from "motion/react";
import { Layers, Users, BarChart2, Lightbulb } from "lucide-react";

const skills = [
  { icon: Users, label: "User Research", desc: "Persona development, heat mapping, user flows" },
  { icon: Layers, label: "UX Strategy", desc: "Heuristic analysis, storymapping, competitive research" },
  { icon: Lightbulb, label: "Design", desc: "Lo-fi wireframes, hi-fi comps, style guides" },
  { icon: BarChart2, label: "Analytics", desc: "Data-driven decisions, bounce rate analysis, screen sizing" },
];

export function About() {
  return (
    <section id="about" className="py-28 px-6 relative" style={{ zIndex: 1 }}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          <div>
            <p className="text-blue-400 tracking-[0.3em] uppercase text-xs mb-4">About</p>
            <h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, letterSpacing: "-0.03em" }}
            >
              Designing experiences that are purposeful &amp; human.
            </h2>
            <p className="text-white/50 leading-relaxed mb-4">
              I'm a UX designer with a process-first approach — every decision is grounded in research, validated through data, and refined through collaboration.
            </p>
            <p className="text-white/50 leading-relaxed">
              From redesigning enterprise eProcurement platforms to building style guides for medical community dashboards, I thrive where complexity meets clarity.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-black/50 backdrop-blur-[30px] border border-white/[0.06] rounded-xl p-5 hover:border-blue-700/30 hover:bg-black/60 transition-all duration-300"
              >
                <skill.icon size={20} className="text-blue-400 mb-3" />
                <h4 className="text-white text-sm mb-1" style={{ fontWeight: 600 }}>
                  {skill.label}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
