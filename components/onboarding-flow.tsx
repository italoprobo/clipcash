"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ONBOARDING_STEPS_CONFIG } from "@/lib/constants"
import type { LucideIcon } from "lucide-react"
import { ChevronRight } from "lucide-react"

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0)
  const router = useRouter()

  const totalSteps = ONBOARDING_STEPS_CONFIG.length
  const stepData = ONBOARDING_STEPS_CONFIG[currentStep]
  const IconComponent = stepData.icon as LucideIcon
  const progressPercentage = ((currentStep + 1) / totalSteps) * 100

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Navigate to sales page
      router.push("/sales-onboarding")
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

            {/* Botão e indicadores */}
            <div className="space-y-8 max-w-md mx-auto">
              <Button 
                onClick={handleNext} 
                className="w-full bg-[#c6426b] hover:bg-[#b33d61] text-white h-14 text-lg"
              >
                {currentStep === totalSteps - 1 ? "Começar agora" : "Continuar"}
                <ChevronRight className="ml-2 h-6 w-6" />
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
