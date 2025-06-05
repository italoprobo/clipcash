"use client"

import { Button } from "@/components/ui/button"
import { Shield, Crown, Play, Users, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SalesOnboardingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-white px-4 py-4 md:py-8">
      {/* Logo e Header */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-[#c6426b] rounded-[32px] p-4 mb-6 md:w-[500px] md:mx-auto">
          <div className="flex items-center justify-center gap-3">
            <img src="/image/clipcash.jpg" alt="ClipCash" className="h-8 w-8 md:h-10 md:w-10 rounded-lg" />
            <span className="text-white text-sm md:text-base">Plataforma Oficial de Avaliação</span>
          </div>
        </div>

        <button 
          onClick={() => router.push('/home')}
          className="bg-[#c6426b] hover:bg-[#b33d61] text-white py-2 px-6 md:py-3 md:px-8 rounded-full inline-block mb-6 transition-colors cursor-pointer text-sm md:text-base font-medium"
        >
          ✓ Acesso Exclusivo Validado
        </button>

        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-black max-w-2xl mx-auto">
          Você foi selecionado para nossa
          <span className="text-[#c6426b] block mt-2">Rede Elite de Avaliadores</span>
        </h1>

        <p className="text-gray-600 mb-8 text-sm md:text-lg px-2 max-w-2xl mx-auto">
          Junte-se a milhares de pessoas que já descobriram como transformar tempo de tela em renda extra consistente através de nossa metodologia exclusiva.
        </p>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
          <div className="bg-[#1a1f36] rounded-xl p-4 text-left">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">R$ 1.8M+</div>
            <div className="text-gray-500 text-xs md:text-sm">Pagos aos avaliadores</div>
          </div>
          <div className="bg-[#1a1f36] rounded-xl p-4 text-left">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">84.327</div>
            <div className="text-gray-500 text-xs md:text-sm">Avaliações hoje</div>
          </div>
          <div className="bg-[#1a1f36] rounded-xl p-4 text-left">
            <div className="text-[#c6426b] text-xl md:text-2xl font-bold">1.847</div>
            <div className="text-gray-500 text-xs md:text-sm">Avaliadores ativos</div>
          </div>
          <div className="bg-[#1a1f36] rounded-xl p-4 text-left">
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
          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm md:text-base">Certificação Oficial</h3>
                <p className="text-gray-400 text-xs md:text-sm">Licenciados pela ANCINE e certificados pelo Google para análise de conteúdo digital.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Play className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm md:text-base">Parceiros Premium</h3>
                <p className="text-gray-400 text-xs md:text-sm">Trabalhamos diretamente com YouTube, Netflix, Amazon Prime e outras gigantes do streaming.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#c6426b]/10 flex items-center justify-center flex-shrink-0">
                <Crown className="h-6 w-6 md:h-7 md:w-7 text-[#c6426b]" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm md:text-base">Exclusividade</h3>
                <p className="text-gray-400 text-xs md:text-sm">Apenas 5.000 avaliadores selecionados mundialmente. Você é um dos escolhidos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Depoimentos */}
        <div className="space-y-4 md:grid md:grid-cols-3 md:gap-6 md:space-y-0 mb-12 max-w-4xl mx-auto">
          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="bg-[#c6426b] h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm md:text-base">MC</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm md:text-base truncate">Maria Clara</span>
                  <span className="text-[#c6426b] text-sm md:text-base">+R$ 947</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm">Em 3 semanas consegui pagar a faculdade do meu filho. Nunca imaginei que assistir vídeos poderia ser tão lucrativo.</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="bg-[#c6426b] h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm md:text-base">RS</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm md:text-base truncate">Roberto Silva</span>
                  <span className="text-[#c6426b] text-sm md:text-base">+R$ 1.355</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm">Aposentado há 2 anos, encontrei aqui uma forma digna de complementar minha renda. Recomendo!</p>
              </div>
            </div>
          </div>

          <div className="bg-[#1a1f36] rounded-xl p-4 md:p-6 text-left">
            <div className="flex items-center space-x-3">
              <div className="bg-[#c6426b] h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm md:text-base">AL</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-white text-sm md:text-base truncate">Ana Luiza</span>
                  <span className="text-[#c6426b] text-sm md:text-base">+R$ 892</span>
                </div>
                <p className="text-gray-400 text-xs md:text-sm">Trabalho home office e faço isso nos intervalos. Já virou minha segunda fonte de renda!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Seção Final */}
        <div className="bg-red-500/20 text-red-400 py-2 px-4 rounded-full inline-block mb-6 text-sm md:text-base">
          ⚠️ Apenas 47 vagas restantes
        </div>

        <h2 className="text-2xl md:text-4xl font-bold mb-4 text-black max-w-2xl mx-auto">
          Pronto para começar sua jornada como
          <span className="text-[#c6426b] block mt-2">Avaliador Oficial?</span>
        </h2>

        <p className="text-gray-600 mb-8 text-sm md:text-lg px-2 max-w-2xl mx-auto">
          Sua licença foi validada e você tem acesso garantido. Clique abaixo para iniciar suas primeiras avaliações e começar a ganhar dinheiro imediatamente.
        </p>

        <Button 
          className="w-full md:w-auto md:px-12 bg-[#c6426b] hover:bg-[#b33d61] text-white py-6 text-lg rounded-xl mb-6"
          onClick={() => router.push('/home')}
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