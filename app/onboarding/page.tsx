"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Crown, Play, Users, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    {
      content: (
        <div className="space-y-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-indigo-600 rounded-full p-4">
              <img src="/image/clipcash.jpg" alt="ClipCash Logo" className="h-12 w-12" />
            </div>
          </div>
          <div className="bg-yellow-500/20 text-yellow-500 py-2 px-4 rounded-full inline-block mb-4">
            ✓ Acesso Exclusivo Validado
          </div>
          <h1 className="text-3xl font-bold text-white">
            Você foi selecionado para nossa
            <span className="text-blue-400 block mt-2">Rede Elite de Avaliadores</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Junte-se a milhares de pessoas que já descobriram como transformar tempo de tela em renda extra consistente através de nossa metodologia exclusiva.
          </p>
          
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="text-blue-400 text-2xl font-bold">R$ 2.4M+</div>
              <div className="text-gray-500">Pagos aos avaliadores</div>
            </div>
            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="text-green-400 text-2xl font-bold">127.439</div>
              <div className="text-gray-500">Avaliações hoje</div>
            </div>
            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="text-purple-400 text-2xl font-bold">2.847</div>
              <div className="text-gray-500">Avaliadores ativos</div>
            </div>
            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="text-yellow-400 text-2xl font-bold">98.7%</div>
              <div className="text-gray-500">Taxa de satisfação</div>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div className="space-y-8 text-center">
          <h2 className="text-2xl font-bold text-white">Por que somos diferentes?</h2>
          <p className="text-gray-400">
            Não somos apenas mais uma plataforma. Somos a ponte oficial entre criadores de conteúdo e grandes marcas.
          </p>
          
          <div className="space-y-6">
            <div className="bg-[#1a1f36] rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <Shield className="h-8 w-8 text-blue-400" />
                <div className="text-left">
                  <h3 className="text-white font-semibold">Certificação Oficial</h3>
                  <p className="text-gray-400 text-sm">Licenciados pela ANCINE e certificados pelo Google para análise de conteúdo digital.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1f36] rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <Play className="h-8 w-8 text-green-400" />
                <div className="text-left">
                  <h3 className="text-white font-semibold">Parceiros Premium</h3>
                  <p className="text-gray-400 text-sm">Trabalhamos diretamente com YouTube, Netflix, Amazon Prime e outras gigantes do streaming.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-[#1a1f36] rounded-xl p-6">
              <div className="flex items-center space-x-4">
                <Crown className="h-8 w-8 text-purple-400" />
                <div className="text-left">
                  <h3 className="text-white font-semibold">Exclusividade</h3>
                  <p className="text-gray-400 text-sm">Apenas 5.000 avaliadores selecionados mundialmente. Você é um dos escolhidos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div className="space-y-6 text-center">
          <h2 className="text-2xl font-bold text-white">Nossa Comunidade</h2>
          
          <div className="space-y-4">
            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-400 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MC</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-white">Maria Clara</span>
                    <span className="text-green-400">+R$ 1.247</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Em 3 semanas consegui pagar a faculdade do meu filho. Nunca imaginei que assistir vídeos poderia ser tão lucrativo."</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-green-400 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">RS</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-white">Roberto Silva</span>
                    <span className="text-green-400">+R$ 2.355</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Aposentado há 2 anos, encontrei aqui uma forma digna de complementar minha renda. Recomendo!"</p>
                </div>
              </div>
            </div>

            <div className="bg-[#1a1f36] rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="bg-pink-400 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">AL</span>
                </div>
                <div className="flex-1 text-left">
                  <div className="flex justify-between">
                    <span className="text-white">Ana Luiza</span>
                    <span className="text-green-400">+R$ 892</span>
                  </div>
                  <p className="text-gray-400 text-sm">"Trabalho home office e faço isso nos intervalos. Já virou minha segunda fonte de renda!"</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      content: (
        <div className="space-y-6 text-center">
          <div className="bg-red-500/20 text-red-400 py-2 px-4 rounded-full inline-block mb-4">
            ⚠️ Apenas 47 vagas restantes
          </div>
          
          <h2 className="text-2xl font-bold text-white">
            Pronto para começar sua jornada como
            <span className="text-blue-400 block mt-2">Avaliador Oficial?</span>
          </h2>
          
          <p className="text-gray-400">
            Sua licença foi validada e você tem acesso garantido. Clique abaixo para iniciar suas primeiras avaliações e começar a ganhar dinheiro imediatamente.
          </p>

          <div className="mt-8">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg rounded-xl"
              onClick={() => window.location.href = '/sales-onboarding'}
            >
              Iniciar Avaliações Agora →
            </Button>

            <div className="flex justify-center space-x-8 mt-6">
              <div className="flex items-center text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Acesso imediato
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Sem taxas ocultas
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <CheckCircle className="h-4 w-4 mr-2 text-green-400" />
                Suporte 24/7
              </div>
            </div>

            <div className="flex justify-center space-x-8 mt-4">
              <div className="flex items-center text-gray-400 text-sm">
                <Shield className="h-4 w-4 mr-2" />
                Seguro e confiável
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Users className="h-4 w-4 mr-2" />
                Reconhecido mundialmente
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <Crown className="h-4 w-4 mr-2" />
                Certificado oficial
              </div>
            </div>
          </div>
        </div>
      )
    }
  ]

  return (
    <div className="min-h-screen bg-[#0f1225] text-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {steps[currentStep].content}
        </motion.div>

        {currentStep < steps.length - 1 && (
          <div className="mt-12 flex justify-center">
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-xl"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Continuar →
            </Button>
          </div>
        )}

        <div className="flex justify-center mt-8 space-x-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentStep ? "bg-blue-500" : "bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
} 