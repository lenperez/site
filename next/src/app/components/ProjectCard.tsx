import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import { ImageWithFallback } from "./ImageWithFallback";

interface ProcessStep {
  label: string;
  description: string;
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  synopsis: string;
  image: string;
  tag: string;
  year: string;
  steps: ProcessStep[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProcessModal({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  return createPortal(
    <AnimatePresence>
      <motion.div
        key="overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end md:items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{
            duration: 0.35,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="
            relative bg-[#111318] border border-white/[0.08]
            w-full h-full overflow-y-auto
            md:h-auto md:max-h-[85vh] md:max-w-[480px] md:rounded-2xl md:mx-4
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="sticky top-4 left-full ml-auto mr-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/60 hover:text-white"
            style={{ float: "right" }}
          >
            <X size={16} />
          </button>

          {/* Image */}
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-48 object-cover"
          />

          <div className="px-6 py-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                {project.tag}
              </span>
            </div>
            <h3
              className="text-white mb-1"
              style={{
                fontSize: "1.3rem",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              {project.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              {project.synopsis}
            </p>

            {/* Process steps */}
            <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
              Process &amp; Approach
            </p>
            <div className="flex flex-col gap-3">
              {project.steps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.05,
                    duration: 0.35,
                  }}
                  className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-blue-700/25 transition-colors"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="w-5 h-5 rounded-full bg-blue-700/20 text-blue-400 text-[10px] flex items-center justify-center font-semibold shrink-0">
                      {i + 1}
                    </span>
                    <h4
                      className="text-white/80 text-xs tracking-wider uppercase"
                      style={{ fontWeight: 600 }}
                    >
                      {step.label}
                    </h4>
                  </div>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

export function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.7,
          delay: index * 0.15,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="group"
      >
        <div
          className={`rounded-2xl overflow-hidden border transition-all duration-300 backdrop-blur-[30px] ${
            expanded
              ? "border-blue-700/30 bg-black/60"
              : "border-white/[0.06] bg-black/50 hover:border-white/[0.12] hover:bg-black/60"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row gap-0">
            {/* Image — clicking opens modal */}
            <div
              className="md:w-2/5 overflow-hidden cursor-pointer"
              onClick={() => setModalOpen(true)}
            >
              <ImageWithFallback
                src={project.image}
                alt={project.title}
                className="w-full h-56 md:h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="md:w-3/5 p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs tracking-widest uppercase text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                    {project.tag}
                  </span>
                  <span className="text-xs text-white/30">
                    {project.year}
                  </span>
                </div>

                <h3
                  className="text-white mb-3"
                  style={{
                    fontSize: "1.6rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {project.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed mb-2">
                  {project.subtitle}
                </p>
                <p className="text-white/60 text-sm leading-relaxed line-clamp-3">
                  {project.synopsis}
                </p>
              </div>

              <div className="flex items-center justify-between mt-6">
                {/* Process Overview — inline expand on all screen sizes */}
                <span
                  onClick={() => setExpanded(!expanded)}
                  className="text-blue-400 text-sm flex items-center gap-1.5 px-4 py-1.5 rounded-full hover:bg-blue-500/10 transition-all cursor-pointer"
                >
                  {expanded ? "Collapse" : "Process Overview"}
                  <motion.div
                    animate={{ rotate: expanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </span>

                {/* Arrow — opens modal */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="p-2 rounded-full hover:bg-white/8 transition-all cursor-pointer"
                >
                  <ArrowUpRight
                    size={18}
                    className="text-white/20 group-hover:text-white/50 transition-colors"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Inline expanded process steps */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
              >
                <div className="border-t border-white/[0.06] px-8 py-8">
                  <p className="text-white/30 text-xs tracking-widest uppercase mb-6">
                    Process &amp; Approach
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.steps.map((step, i) => (
                      <motion.div
                        key={step.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: i * 0.07,
                          duration: 0.4,
                        }}
                        className="bg-black/50 backdrop-blur-[30px] border border-white/[0.06] rounded-xl p-4 hover:border-blue-700/25 transition-colors"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="w-5 h-5 rounded-full bg-blue-700/20 text-blue-400 text-[10px] flex items-center justify-center font-semibold">
                            {i + 1}
                          </span>
                          <h4
                            className="text-white/80 text-xs tracking-wider uppercase"
                            style={{ fontWeight: 600 }}
                          >
                            {step.label}
                          </h4>
                        </div>
                        <p className="text-white/40 text-xs leading-relaxed">
                          {step.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>

      {modalOpen && (
        <ProcessModal
          project={project}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

export type { Project };