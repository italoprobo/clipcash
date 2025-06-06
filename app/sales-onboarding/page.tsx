"use client"

import { Button } from "@/components/ui/button"
import { Shield, Crown, Play, Users, CheckCircle, Lock, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect, Suspense } from "react"
import { capitalizeFirstLetter } from "@/lib/utils"

function MainContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const userName = capitalizeFirstLetter(searchParams.get('name') || 'Avaliador')
  
  // Estados para os valores dinâmicos
  const [totalPaid, setTotalPaid] = useState(1800000)
  const [todayEvaluations, setTodayEvaluations] = useState(84327)
  const [activeEvaluators, setActiveEvaluators] = useState(1847)
  const [remainingSpots, setRemainingSpots] = useState(47)
  const [testimonials, setTestimonials] = useState([
    {
      initials: "MC",
      name: "Maria Clara",
      amount: 947,
      text: "Em 3 semanas consegui pagar a faculdade do meu filho. Nunca imaginei que assistir vídeos poderia ser tão lucrativo."
    },
    {
      initials: "RS",
      name: "Roberto Silva",
      amount: 1355,
      text: "Aposentado há 2 anos, encontrei aqui uma forma digna de complementar minha renda. Recomendo!"
    },
    {
      initials: "AL",
      name: "Ana Luiza",
      amount: 892,
      text: "Trabalho home office e faço isso nos intervalos. Já virou minha segunda fonte de renda!"
    }
  ])

  // Adiciona estado para animação do botão
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  // Função para formatar números
  const formatNumber = (num: number) => {
    return num.toLocaleString('pt-BR')
  }

  // Efeito para atualizar avaliações do dia
  useEffect(() => {
    const updateEvaluations = () => {
      setTodayEvaluations(prev => {
        const increment = Math.floor(Math.random() * 5) + 1 // Incremento de 1 a 5
        return prev + increment
      })
    }
    const intervalEvaluations = setInterval(updateEvaluations, 3000) // Atualiza a cada 3 segundos
    return () => clearInterval(intervalEvaluations)
  }, [])

  // Efeito para atualizar avaliadores ativos
  useEffect(() => {
    const updateEvaluators = () => {
      setActiveEvaluators(prev => {
        const shouldIncrease = Math.random() > 0.3 // 70% de chance de aumentar
        const change = Math.floor(Math.random() * 3) + 1 // Mudança de 1 a 3
        return shouldIncrease ? prev + change : Math.max(1800, prev - change)
      })
    }
    const intervalEvaluators = setInterval(updateEvaluators, 5000) // Atualiza a cada 5 segundos
    return () => clearInterval(intervalEvaluators)
  }, [])

  // Efeito para atualizar total pago
  useEffect(() => {
    const updateTotalPaid = () => {
      setTotalPaid(prev => {
        const increment = Math.floor(Math.random() * 1000) + 500 // Incremento entre 500 e 1500
        return prev + increment
      })
    }
    const intervalTotalPaid = setInterval(updateTotalPaid, 7000) // Atualiza a cada 7 segundos
    return () => clearInterval(intervalTotalPaid)
  }, [])

  // Efeito para atualizar vagas restantes
  useEffect(() => {
    const updateRemainingSpots = () => {
      setRemainingSpots(prev => {
        if (prev <= 1) return 47 // Reset quando chegar a 1
        const decrement = Math.random() > 0.7 ? 1 : 0 // 30% de chance de diminuir
        return prev - decrement
      })
    }
    const intervalSpots = setInterval(updateRemainingSpots, 10000) // Atualiza a cada 10 segundos
    return () => clearInterval(intervalSpots)
  }, [])

  // Efeito para atualizar depoimentos
  useEffect(() => {
    const updateTestimonials = () => {
      setTestimonials(prev => {
        const newTestimonials = [...prev]
        const randomIndex = Math.floor(Math.random() * newTestimonials.length)
        const testimonial = newTestimonials[randomIndex]
        
        // Pequena variação no valor do depoimento
        const variation = Math.floor(Math.random() * 50) - 25 // Variação de -25 a +25
        testimonial.amount = Math.max(500, testimonial.amount + variation)
        
        return newTestimonials
      })
    }
    const intervalTestimonials = setInterval(updateTestimonials, 15000) // Atualiza a cada 15 segundos
    return () => clearInterval(intervalTestimonials)
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-black px-4 py-4 md:py-8">
      {/* Logo e Header */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white rounded-[32px] p-4 mb-6 md:w-[500px] md:mx-auto border">
          <div className="flex items-center justify-center gap-3">
            <img src="/image/clipcash.jpg" alt="ClipCash" className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <span className="text-black text-sm md:text-base">Plataforma Oficial de Avaliação</span>
          </div>
        </div>

        <button 
          onClick={() => router.push(`/home?name=${userName}`)}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className={`
            group
            relative
            bg-gradient-to-r from-[#c6426b] to-[#b33d61]
            hover:from-[#b33d61] hover:to-[#c6426b]
            text-white 
            py-3 px-8 
            md:py-4 md:px-10 
            rounded-full 
            inline-flex items-center gap-2
            mb-6 
            transition-all duration-300 ease-in-out
            transform hover:scale-105
            shadow-lg hover:shadow-xl
            font-medium
            border border-white/20
            overflow-hidden
          `}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-45 transition-transform duration-500 group-hover:translate-x-[200%]" />
          <Lock className="w-5 h-5 text-white" />
          <span className="relative z-10">Perfil VIP de {userName}</span>
          <ChevronRight className={`w-5 h-5 text-white transition-transform duration-300 ${isButtonHovered ? 'translate-x-1' : ''}`} />
          <div className="absolute top-0 right-0 bg-white/20 px-2 py-1 text-[10px] rounded-bl-lg rounded-tr-full">
            VIP
          </div>
        </button>

        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black max-w-2xl mx-auto">
          Parabéns {userName}! Você foi selecionado para nossa
          <span className="text-[#c6426b] block mt-2">Rede Elite de Avaliadores</span>
        </h1>

        <p className="text-gray-600 mb-8 text-sm md:text-lg px-2 max-w-2xl mx-auto">
          {userName}, junte-se a milhares de pessoas que já descobriram como transformar tempo de tela em renda extra consistente através de nossa metodologia exclusiva.
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-4 text-left border">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">
              R$ {(totalPaid / 1000000).toFixed(1)}M+
            </div>
            <div className="text-gray-500 text-xs md:text-sm">Pagos aos avaliadores</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-left border">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">{formatNumber(todayEvaluations)}</div>
            <div className="text-gray-500 text-xs md:text-sm">Avaliações hoje</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-left border">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">{formatNumber(activeEvaluators)}</div>
            <div className="text-gray-500 text-xs md:text-sm">Avaliadores ativos</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-left border">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">97.3%</div>
            <div className="text-gray-500 text-xs md:text-sm">Taxa de satisfação</div>
          </div>
        </div>

        {/* Por que somos diferentes */}
        <h2 className="text-xl md:text-3xl font-bold mb-4 text-black max-w-2xl mx-auto">Por que somos diferentes?</h2>
        <p className="text-gray-600 mb-8 text-sm md:text-lg px-2 max-w-2xl mx-auto">
          Não somos apenas mais uma plataforma. Somos a ponte oficial entre criadores de conteúdo e grandes marcas.
        </p>

        {/* Cards de Diferenciais */}
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 mb-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl p-4 md:p-6 text-left border">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-black font-semibold text-sm md:text-base">Certificação Oficial</h3>
                <p className="text-gray-500 text-xs md:text-sm">Licenciados pela ANCINE e certificados pelo Google para análise de conteúdo digital.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 text-left border">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Play className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-black font-semibold text-sm md:text-base">Parceiros Premium</h3>
                <p className="text-gray-500 text-xs md:text-sm">Trabalhamos diretamente com YouTube, Netflix, Amazon Prime e outras gigantes do streaming.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 md:p-6 text-left border">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Crown className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-black font-semibold text-sm md:text-base">Exclusividade</h3>
                <p className="text-gray-500 text-xs md:text-sm">Apenas 5.000 avaliadores selecionados mundialmente. Você é um dos escolhidos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 mb-12 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-4 md:p-6 text-left border">
              <div className="flex items-center space-x-3">
                <div className="bg-[#c6426b] h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold text-sm md:text-base">{testimonial.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-black text-sm md:text-base truncate">{testimonial.name}</span>
                    <span className="text-[#c6426b] text-sm md:text-base">+R$ {testimonial.amount}</span>
                  </div>
                  <p className="text-gray-500 text-xs md:text-sm">{testimonial.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seção Final */}
        <div className="bg-red-500/20 text-red-400 py-2 px-4 rounded-full inline-block mb-6 text-sm md:text-base">
          ⚠️ Apenas {remainingSpots} vagas restantes
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black max-w-2xl mx-auto">
          {userName}, pronto para começar sua jornada como
          <span className="text-[#c6426b] block mt-2">Avaliador Oficial?</span>
        </h2>

        <p className="text-gray-600 mb-8 text-sm md:text-lg px-2 max-w-2xl mx-auto">
          Sua licença foi validada e você tem acesso garantido. {userName}, clique abaixo para iniciar suas primeiras avaliações e começar a ganhar dinheiro imediatamente.
        </p>

        <Button 
          className="w-full md:w-auto md:px-12 bg-[#c6426b] hover:bg-[#b33d61] text-white py-6 text-lg rounded-xl mb-6"
          onClick={() => router.push(`/home?name=${userName}`)}
        >
          Iniciar Avaliações Agora →
        </Button>

        {/* Footer Badges */}
        <div className="grid grid-cols-3 gap-2 text-[10px] md:text-xs text-gray-400 mb-4 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Acesso imediato</span>
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Sem taxas ocultas</span>
          </div>
          <div className="flex items-center justify-center">
            <CheckCircle className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Suporte 24/7</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 text-[10px] md:text-xs text-gray-400 max-w-2xl mx-auto">
          <div className="flex items-center justify-center">
            <Shield className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Seguro e confiável</span>
          </div>
          <div className="flex items-center justify-center">
            <Users className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Reconhecido</span>
          </div>
          <div className="flex items-center justify-center">
            <Crown className="h-3 w-3 md:h-4 md:w-4 mr-1 text-[#c6426b]" />
            <span className="truncate">Certificado oficial</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SalesOnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#c6426b] border-r-2 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    }>
      <MainContent />
    </Suspense>
  )
} 