'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Trophy } from 'lucide-react'
import {
  pickRandomQuestions,
  quizQuestions,
  type QuizQuestion,
} from '@/lib/microstructure-quiz'

const QUESTIONS_PER_QUIZ = 10

type AnswerState = {
  questionId: string
  picked: number
  correct: boolean
}

export default function MicrostructureQuizPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)
  const [answers, setAnswers] = useState<AnswerState[]>([])
  const [finished, setFinished] = useState(false)
  const [seed, setSeed] = useState<number>(() => Date.now())

  // Initialise on mount only (avoids SSR hydration mismatch on randomized order)
  useEffect(() => {
    setQuestions(pickRandomQuestions(QUESTIONS_PER_QUIZ, seed))
    setCurrentIndex(0)
    setPicked(null)
    setAnswers([])
    setFinished(false)
  }, [seed])

  const current = questions[currentIndex]
  const totalQuestions = questions.length
  const score = answers.filter((a) => a.correct).length

  const progressPct = useMemo(() => {
    if (totalQuestions === 0) return 0
    return Math.round((currentIndex / totalQuestions) * 100)
  }, [currentIndex, totalQuestions])

  if (questions.length === 0) {
    return (
      <div className="py-12 container-custom">
        <div className="max-w-3xl mx-auto text-center text-gray-500">Loading quiz…</div>
      </div>
    )
  }

  const submit = () => {
    if (picked == null || !current) return
    const isCorrect = picked === current.correct
    setAnswers([...answers, { questionId: current.id, picked, correct: isCorrect }])
  }

  const next = () => {
    setPicked(null)
    if (currentIndex + 1 >= totalQuestions) {
      setFinished(true)
    } else {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const restart = () => {
    setSeed(Date.now())
  }

  const lastAnswer = answers.find((a) => a.questionId === current?.id)
  const showFeedback = lastAnswer != null

  // ===== Results screen =====
  if (finished) {
    const pct = Math.round((score / totalQuestions) * 100)
    const tier =
      pct >= 90 ? { label: 'Expert', color: 'text-emerald-700' } :
      pct >= 70 ? { label: 'Solid', color: 'text-primary-700' } :
      pct >= 50 ? { label: 'Apprentice', color: 'text-amber-700' } :
      { label: 'Just starting out', color: 'text-gray-700' }

    return (
      <div className="py-12 container-custom">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:underline">Home</Link>
            {' / '}
            <Link href="/tools" className="hover:underline">Tools</Link>
            {' / Microstructure Quiz'}
          </nav>

          <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center">
            <Trophy className="w-12 h-12 mx-auto text-amber-500 mb-3" />
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Quiz complete</h1>
            <p className="text-gray-600 mb-6">
              You scored <span className="font-bold text-gray-900">{score}/{totalQuestions}</span>{' '}
              ({pct}%) — <span className={`font-semibold ${tier.color}`}>{tier.label}</span>
            </p>

            <div className="text-left mt-8 space-y-4">
              <h2 className="text-xl font-semibold mb-3">Review your answers</h2>
              {questions.map((q, i) => {
                const ans = answers[i]
                if (!ans) return null
                return (
                  <div
                    key={q.id}
                    className={`rounded-lg p-4 border-l-4 ${
                      ans.correct ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      {ans.correct ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      )}
                      <p className="font-semibold text-gray-900">{i + 1}. {q.question}</p>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      <span className="font-medium">Correct answer:</span> {q.options[q.correct]}
                    </p>
                    {!ans.correct && (
                      <p className="text-sm text-gray-700 mb-2">
                        <span className="font-medium">You picked:</span> {q.options[ans.picked]}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 italic">{q.explanation}</p>
                  </div>
                )
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <button onClick={restart} className="btn-primary inline-flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Try a fresh set
              </button>
              <Link href="/microstructures" className="btn-secondary inline-flex items-center justify-center">
                Browse the gallery
              </Link>
              <Link href="/glossary" className="btn-secondary inline-flex items-center justify-center">
                Open the glossary
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ===== Question screen =====
  return (
    <div className="py-12 container-custom">
      <div className="max-w-3xl mx-auto">
        <nav className="text-sm text-gray-600 mb-4">
          <Link href="/" className="hover:underline">Home</Link>
          {' / '}
          <Link href="/tools" className="hover:underline">Tools</Link>
          {' / Microstructure Quiz'}
        </nav>

        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Microstructure ID Quiz</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Test your eye for phases, materials, and etchants. {QUESTIONS_PER_QUIZ} questions per session,
            drawn at random from a curated set of <span className="font-semibold">{quizQuestions.length}</span>.
            Each answer is followed by a one-paragraph explanation citing the diagnostic features.
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>Score: <span className="font-semibold text-gray-900">{score}</span></span>
        </div>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Question card */}
        <div className="bg-white border-2 border-gray-200 rounded-lg p-4 md:p-6">
          <div className="relative aspect-[4/3] md:aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden mb-4">
            <Image
              src={`/images/microstructures/${encodeURIComponent(current.imageFilename)}`}
              alt="Microstructure to identify"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
            <span className="absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-2 py-0.5 rounded">
              {current.difficulty} • {current.topic.replace('-', ' ')}
            </span>
          </div>

          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            {current.question}
          </h2>

          <div className="space-y-2">
            {current.options.map((opt, i) => {
              const isPicked = picked === i
              const isAnswered = showFeedback
              const isCorrect = isAnswered && i === current.correct
              const isWrongPick = isAnswered && lastAnswer?.picked === i && i !== current.correct

              let cls = 'border-gray-300 bg-white hover:border-primary-300 hover:bg-primary-50'
              if (isAnswered) {
                if (isCorrect) cls = 'border-emerald-500 bg-emerald-50'
                else if (isWrongPick) cls = 'border-red-500 bg-red-50'
                else cls = 'border-gray-200 bg-gray-50 opacity-70'
              } else if (isPicked) {
                cls = 'border-primary-500 bg-primary-50 ring-2 ring-primary-300'
              }

              return (
                <button
                  key={i}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => !isAnswered && setPicked(i)}
                  className={`w-full text-left rounded-md border-2 px-4 py-3 transition-colors flex items-center gap-3 ${cls}`}
                >
                  <span className="w-6 h-6 rounded-full border border-gray-400 text-xs font-semibold flex items-center justify-center bg-white flex-shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1 text-sm md:text-base text-gray-900">{opt}</span>
                  {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />}
                  {isWrongPick && <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
                </button>
              )
            })}
          </div>

          {/* Feedback */}
          {showFeedback && (
            <div
              className={`mt-4 rounded-md p-4 border-l-4 ${
                lastAnswer!.correct ? 'border-emerald-500 bg-emerald-50' : 'border-red-500 bg-red-50'
              }`}
            >
              <p className="font-semibold text-gray-900 mb-1">
                {lastAnswer!.correct ? 'Correct.' : 'Not quite.'}
              </p>
              <p className="text-sm text-gray-800 leading-relaxed">{current.explanation}</p>
            </div>
          )}

          <div className="mt-5 flex justify-end">
            {showFeedback ? (
              <button onClick={next} className="btn-primary inline-flex items-center gap-2">
                {currentIndex + 1 === totalQuestions ? 'See results' : 'Next question'}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={picked == null}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit answer
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500 text-center">
          Image labels in the question bank have been hand-reviewed for accuracy.
          Spotted something off?{' '}
          <Link href="/contact" className="text-primary-600 hover:underline">Let us know</Link>.
        </div>
      </div>
    </div>
  )
}
