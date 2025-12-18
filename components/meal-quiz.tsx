"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, Target, Utensils, Clock, CheckCircle2 } from "lucide-react"

const questions = [
  {
    question: "What is your primary health goal?",
    icon: Target,
    options: ["Weight Loss", "Muscle Gain", "Healthy Living", "Athletic Performance"],
  },
  {
    question: "How many meals per day?",
    icon: Utensils,
    options: ["1 Meal", "2 Meals", "3 Meals", "3+ Snacks"],
  },
  {
    question: "What is your activity level?",
    icon: Clock,
    options: ["Sedentary", "Lightly Active", "Moderately Active", "Very Active"],
  },
]

export function MealQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const Icon = questions[currentQuestion]?.icon

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-100 text-green-700 hover:bg-green-200">Personalized for You</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Find Your Perfect <span className="text-green-600">Meal Plan</span>
            </h2>
            <p className="text-gray-600">Answer 3 quick questions to get personalized meal recommendations</p>
          </div>

          {!showResults ? (
            <Card className="p-8 md:p-12 shadow-2xl border-2 border-green-100">
              {/* Progress bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                {Icon && (
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900">{questions[currentQuestion].question}</h3>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="group p-6 text-left border-2 border-gray-200 rounded-xl hover:border-green-500 hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-gray-900">{option}</span>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          ) : (
            <Card className="p-8 md:p-12 shadow-2xl border-2 border-green-100 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Your Personalized Plan is Ready!</h3>
              <p className="text-gray-600 mb-6">
                Based on your answers, we recommend our <strong>Premium Performance Plan</strong> with high-protein
                meals tailored for {answers[0]?.toLowerCase()}.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8">
                <h4 className="font-semibold text-gray-900 mb-4">Your Recommendations:</h4>
                <ul className="space-y-2 text-left">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">45-50g protein per meal for {answers[0]}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{answers[1]} delivery schedule</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optimized for {answers[2]?.toLowerCase()} lifestyle</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                  View Recommended Meals
                </Button>
                <Button size="lg" variant="outline" onClick={resetQuiz}>
                  Retake Quiz
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
