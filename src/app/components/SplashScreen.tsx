"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./DecryptedText";

const bootLines = [
  { text: "[  OK  ] Initializing Xscriptor DevX kernel...", delay: 80 },
  { text: "[  OK  ] Loading system modules...", delay: 400 },
  { text: "[  OK  ] Starting charging home...", delay: 720 },
  { text: "[  OK  ] Charging portfolio...", delay: 1040 },
  { text: "[  OK  ] Initializing resources...", delay: 1360 },
  { text: "[  OK  ] Loading contact forms...", delay: 1680 },
  { text: "[  OK  ] Syncing i18n locales (en, es, de, it, fr)...", delay: 2000 },
  { text: "[  OK  ] Connecting agent pool...", delay: 2320 },
];

const panels = [
  {
    num: "01", label: "Home",
    items: [
      { word: "discover",  bar: 5 },
      { word: "depth",     bar: 5 },
      { word: "finesse",   bar: 5 },
      { word: "design",    bar: 5 },
      { word: "code",      bar: 5 },
    ],
  },
  {
    num: "02", label: "Portfolio",
    items: [
      { word: "literary",  bar: 4 },
      { word: "artistic",  bar: 4 },
      { word: "projects",  bar: 4 },
      { word: "timeline",  bar: 4 },
      { word: "works",     bar: 4 },
    ],
  },
  {
    num: "03", label: "Resources",
    items: [
      { word: "themes",    bar: 5 },
      { word: "tools",     bar: 5 },
      { word: "vscode",    bar: 5 },
      { word: "terminal",  bar: 5 },
      { word: "obsidian",  bar: 5 },
    ],
  },
  {
    num: "04", label: "Contact",
    items: [
      { word: "telegram",  bar: 4 },
      { word: "github",    bar: 4 },
      { word: "email",     bar: 4 },
      { word: "collaborate", bar: 4 },
      { word: "talk",      bar: 4 },
    ],
  },
];

export default function SplashScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const totalSteps = bootLines.length + 3;

  useEffect(() => {
    if (step >= totalSteps) {
      const t = setTimeout(() => setDone(true), 500);
      return () => clearTimeout(t);
    }
    const delays = bootLines.map((l) => l.delay);
    const last = delays[delays.length - 1];
    const stepDelays = [...delays, last + 400, last + 700, last + 2500];
    const d = stepDelays[step] - (step > 0 ? stepDelays[step - 1] : 0);
    const t = setTimeout(() => setStep((p) => p + 1), d);
    return () => clearTimeout(t);
  }, [step, totalSteps]);

  const showPanels = step >= bootLines.length + 1;
  const showDone = step >= totalSteps - 1;

  return (
    <AnimatePresence onExitComplete={onDone}>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: '#0a0a0a' }}
        >
          <div className="w-full max-w-4xl">
            <div className="text-xs sm:text-sm leading-6">
              {/* Boot lines */}
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={step > i ? { opacity: 1 } : {}}
                  transition={{ duration: 0.08 }}
                >
                  {step > i && (
                    step > i + 1 ? (
                      <span style={{ color: '#7bd88f', textShadow: '0 0 4px rgba(123,216,143,0.2)' }}>
                        {line.text}
                      </span>
                    ) : (
                      <span style={{ color: '#7bd88f' }}>
                        <DecryptedText
                          text={line.text}
                          animateOn="view"
                          sequential
                          revealDirection="start"
                          speed={30}
                          maxIterations={18}
                          className="text-[#7bd88f]"
                          encryptedClassName="text-[#fc618d]"
                        />
                      </span>
                    )
                  )}
                </motion.div>
              ))}

              {/* Panels */}
              {showPanels && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* ASCII header */}
                  <div className="mt-5 mb-3 leading-tight" style={{ color: '#fbbf24' }}>
                    <div>
                      <DecryptedText
                        text={"  ╔══════════════════════════════════════════╗"}
                        animateOn="view"
                        revealDirection="start"
                        speed={15}
                        maxIterations={10}
                        className="text-[#fbbf24]"
                        encryptedClassName="text-[#fc618d]"
                      />
                    </div>
                    <div>
                      <DecryptedText
                        text={"  ║     XSCRIPTOR DEVX — ALL SYSTEMS     ║"}
                        animateOn="view"
                        sequential
                        revealDirection="center"
                        speed={35}
                        maxIterations={18}
                        className="text-[#fbbf24]"
                        encryptedClassName="text-[#fc618d]"
                      />
                    </div>
                    <div>
                      <DecryptedText
                        text={"  ╚══════════════════════════════════════════╝"}
                        animateOn="view"
                        revealDirection="start"
                        speed={15}
                        maxIterations={10}
                        className="text-[#fbbf24]"
                        encryptedClassName="text-[#fc618d]"
                      />
                    </div>
                  </div>

                  {/* 4 panels grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-4 mb-4">
                    {panels.map((p, i) => (
                      <motion.div
                        key={p.num}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.08, duration: 0.3 }}
                      >
                        <div className="text-[9px] tracking-widest mb-0.5" style={{ color: '#fbbf24' }}>
                          <DecryptedText
                            text={p.num}
                            animateOn="view"
                            revealDirection="start"
                            speed={30}
                            maxIterations={10}
                            className="text-[#fbbf24]"
                            encryptedClassName="text-[#fc618d]"
                          />
                        </div>
                        <div className="text-sm sm:text-base font-bold" style={{ color: '#fff' }}>
                          <DecryptedText
                            text={p.label}
                            animateOn="view"
                            sequential
                            revealDirection="start"
                            speed={40}
                            maxIterations={14}
                            className="text-white"
                            encryptedClassName="text-[#fc618d]"
                          />
                        </div>
                        <div className="mt-1.5 space-y-0.5">
                          {p.items.map((item, ti) => (
                            <motion.div
                              key={item.word}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 + i * 0.08 + ti * 0.15, duration: 0.2 }}
                              className="flex items-center gap-1.5"
                            >
                              <span className="text-[9px]" style={{ color: 'rgba(123,216,143,0.4)' }}>
                                [
                                <DecryptedText
                                  text={Array(item.bar).fill('#').join('')}
                                  animateOn="view"
                                  sequential
                                  revealDirection="start"
                                  speed={60}
                                  maxIterations={10}
                                  className="text-[rgba(123,216,143,0.6)]"
                                  encryptedClassName="text-[#fc618d]"
                                />
                                ]
                              </span>
                              <span className="text-[9px]" style={{ color: 'rgba(123,216,143,0.6)' }}>
                                <DecryptedText
                                  text={item.word}
                                  animateOn="view"
                                  sequential
                                  revealDirection="start"
                                  speed={70}
                                  maxIterations={14}
                                  className="text-[rgba(123,216,143,0.6)]"
                                  encryptedClassName="text-[#fc618d]"
                                />
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Bottom line */}
                  {showDone && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-3 text-[10px]" style={{ color: 'rgba(123,216,143,0.4)' }}
                    >
                      <span style={{ color: '#fbbf24' }}>root@devxlab</span>:<span style={{ color: '#fbbf24' }}>~</span>$ _
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Cursor */}
              {!showDone && (
                <motion.span
                  className="inline-block w-2 h-4 ml-0.5 align-middle"
                  style={{ background: '#7bd88f' }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
