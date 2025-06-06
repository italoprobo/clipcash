"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ONBOARDING_STEPS_CONFIG } from "@/lib/constants"
import { capitalizeFirstLetter } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { ChevronRight, Loader2 } from "lucide-react"

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const [userName, setUserName] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const router = useRouter()

  const totalSteps = ONBOARDING_STEPS_CONFIG.length
  const stepData = ONBOARDING_STEPS_CONFIG[currentStep]
  const IconComponent = stepData.icon as LucideIcon
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUserName(capitalizeFirstLetter(value))
  }

  const startAnalysis = () => {
    if (!userName.trim()) return
    setIsAnalyzing(true)
    setAnalysisProgress(0)

    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          const encodedName = encodeURIComponent(userName.trim())
          router.push(`/sales-onboarding?name=${encodedName}`)
          return 100
        }
        return prev + (100 / 70) // 70 incrementos em 7 segundos
      })
    }, 100)
  }

  const handleNext = () => {
    if (currentStep === totalSteps - 1) {
      if (stepData.requiresInput && !userName.trim()) return
      if (stepData.requiresInput) {
        startAnalysis()
        return
      }
      router.push("/sales-onboarding")
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f5f5f5]">
      {/* Barra de progresso minimalista */}
      <Progress value={progressPercentage} className="h-1 [&>div]:bg-[#c6426b] bg-gray-100 fixed top-0 left-0 right-0 z-50" />

      {/* Conteúdo principal */}
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl bg-white">
          <CardContent className="p-6 sm:p-8">
            {/* Ícone e textos */}
            <div className="flex flex-col items-center text-center space-y-6 mb-8">
              <div className="w-24 h-24 rounded-full bg-[#c6426b]/10 flex items-center justify-center">
                <IconComponent className="w-14 h-14 text-[#c6426b]" />
              </div>
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">{stepData.title}</h1>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg max-w-xl mx-auto">{stepData.description}</p>
              </div>
            </div>

            {/* Campo de nome no último passo */}
            {stepData.requiresInput && (
              <div className="max-w-md mx-auto mb-8">
                <Input
                  type="text"
                  placeholder="Digite seu nome"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white px-4 py-3 text-lg rounded-xl border border-gray-200 focus:border-[#c6426b] focus:ring-[#c6426b] placeholder:text-gray-400 text-gray-900 transition-colors duration-200"
                  disabled={isAnalyzing}
                />
              </div>
            )}

            {/* Análise em progresso */}
            {isAnalyzing && (
              <div className="max-w-md mx-auto space-y-4 mb-8">
                <div className="flex items-center justify-center gap-2 text-[#c6426b]">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analisando seu perfil...</span>
                </div>
                <Progress value={analysisProgress} className="h-2 [&>div]:bg-[#c6426b]" />
                <div className="text-sm text-gray-500 text-center">
                  Verificando compatibilidade com nossa rede de avaliadores...
                </div>
              </div>
            )}

            {/* Botão e indicadores */}
            <div className="space-y-8 max-w-md mx-auto">
              <Button 
                onClick={handleNext}
                disabled={stepData.requiresInput && !userName.trim() || isAnalyzing}
                className="w-full bg-[#c6426b] hover:bg-[#b33d61] text-white h-14 text-lg relative overflow-hidden group"
              >
                <span className="relative z-10">{stepData.buttonText}</span>
                {!isAnalyzing && <ChevronRight className="ml-2 h-6 w-6" />}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-45 transition-transform duration-500 group-hover:translate-x-[200%]" />
              </Button>

              {/* Indicadores de passo */}
              <div className="flex justify-center space-x-2">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-2.5 h-2.5 rounded-full transition-all duration-300
                      ${index === currentStep ? 'w-8 bg-[#c6426b]' : 
                        index < currentStep ? 'bg-[#c6426b]' : 'bg-gray-200'}
                    `}
                  />
                ))}
              </div>

              {/* Contador de passos */}
              <div className="text-center text-sm sm:text-base text-gray-600">
                Passo {currentStep + 1} de {totalSteps}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
