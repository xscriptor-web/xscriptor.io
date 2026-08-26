"use client";
import { useEffect, useState, useRef } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

export type XTextDecryptProps = HTMLMotionProps<'span'> & {
  text: string
  speed?: number
  maxIterations?: number
  sequential?: boolean
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
  characters?: string
  className?: string
  encryptedClassName?: string
  parentClassName?: string
  animateOn?: 'view' | 'hover'
  delay?: number
}

function getNextIndex(revealedSize: number, textLength: number, revealDirection: string): number {
  switch (revealDirection) {
    case 'start':
      return revealedSize
    case 'end':
      return textLength - 1 - revealedSize
    case 'center': {
      const middle = Math.floor(textLength / 2)
      const offset = Math.floor(revealedSize / 2)
      return revealedSize % 2 === 0 ? middle + offset : middle - offset - 1
    }
    default:
      return revealedSize
  }
}

export default function XTextDecrypt({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  delay = 0,
  ...props
}: XTextDecryptProps) {
  const [displayText, setDisplayText] = useState<string>(text)
  const [isHovering, setIsHovering] = useState<boolean>(false)
  const [isScrambling, setIsScrambling] = useState<boolean>(false)
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set())
  const [hasAnimated, setHasAnimated] = useState<boolean>(false)
  const containerRef = useRef<HTMLSpanElement>(null)
  const revealedRef = useRef<Set<number>>(new Set())
  const iterationRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isHoveringRef = useRef(false)

  isHoveringRef.current = isHovering

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }

    if (!isHovering) {
      setDisplayText(text)
      setRevealedIndices(new Set())
      revealedRef.current = new Set()
      iterationRef.current = 0
      setIsScrambling(false)
      return
    }

    const availableChars = useOriginalCharsOnly
      ? Array.from(new Set(text.split(''))).filter((char) => char !== ' ')
      : characters.split('')

    const shuffleText = (originalText: string, revealed: Set<number>): string => {
      return originalText.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (revealed.has(i)) return originalText[i]
        if (useOriginalCharsOnly) {
          const nonSpace = originalText.split('').filter((c) => c !== ' ')
          const shuffled = [...nonSpace]
          for (let j = shuffled.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [shuffled[j], shuffled[k]] = [shuffled[k], shuffled[j]]
          }
          let idx = 0
          const result: string[] = []
          for (let p = 0; p < originalText.length; p++) {
            if (originalText[p] === ' ') result.push(' ')
            else if (revealed.has(p)) result.push(originalText[p])
            else result.push(shuffled[idx++])
          }
          return result.join('')
        }
        return availableChars[Math.floor(Math.random() * availableChars.length)]
      }).join('')
    }

    const startScramble = () => {
      setIsScrambling(true)
      revealedRef.current = new Set()
      iterationRef.current = 0

      intervalRef.current = setInterval(() => {
        if (sequential) {
          if (revealedRef.current.size < text.length) {
            const nextIdx = getNextIndex(revealedRef.current.size, text.length, revealDirection)
            revealedRef.current = new Set([...revealedRef.current, nextIdx])
            setDisplayText(shuffleText(text, revealedRef.current))
            setRevealedIndices(new Set(revealedRef.current))
          } else {
            setDisplayText(text)
            if (intervalRef.current) clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsScrambling(false)
          }
        } else {
          iterationRef.current++
          if (iterationRef.current >= maxIterations) {
            setDisplayText(text)
            setRevealedIndices(new Set(Array.from({ length: text.length }, (_, i) => i)))
            if (intervalRef.current) clearInterval(intervalRef.current)
            intervalRef.current = null
            setIsScrambling(false)
          } else {
            setDisplayText(shuffleText(text, revealedRef.current))
          }
        }
      }, speed)
    }

    if (delay > 0) {
      timeoutRef.current = setTimeout(startScramble, delay)
    } else {
      startScramble()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isHovering, text, speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters, delay])

  useEffect(() => {
    if (animateOn !== 'view') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsHovering(true)
            setHasAnimated(true)
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    )
    const el = containerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [animateOn, hasAnimated])

  const hoverProps =
    animateOn === 'hover'
      ? {
        onMouseEnter: () => setIsHovering(true),
        onMouseLeave: () => setIsHovering(false),
      }
      : {}

  return (
    <motion.span
      ref={containerRef}
      className={`inline-block whitespace-pre-wrap ${parentClassName}`}
      {...hoverProps}
      {...props}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split('').map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || !isScrambling || !isHoveringRef.current
          return (
            <span
              key={index}
              className={isRevealedOrDone ? className : encryptedClassName}
            >
              {char}
            </span>
          )
        })}
      </span>
    </motion.span>
  )
}
