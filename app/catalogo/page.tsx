"use client"

import { Button } from "@/components/ui/button"
import { Target, Eye, Wallet, Star, DollarSign } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

function AnimatedNumber({ value }: { value: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  )
}

function useRandomCounter(initialValue: number, min: number, max: number) {
  const [count, setCount] = useState(initialValue)

  useEffect(() => {
    const interval = setInterval(() => {
      // 50% de chance de aumentar ou diminuir
      const shouldIncrease = Math.random() > 0.5
      // Variação aleatória entre 1 e 3
      const variation = Math.floor(Math.random() * 3) + 1
      
      setCount(currentCount => {
        const newCount = shouldIncrease 
          ? currentCount + variation 
          : currentCount - variation

        // Mantém o número dentro dos limites
        if (newCount < min) return min
        if (newCount > max) return max
        return newCount
      })
    }, 2000) // Atualiza a cada 2 segundos

    return () => clearInterval(interval)
  }, [min, max])

  return count
}

const testimonials = [
  {
    name: "Maria S.",
    location: "São Paulo, SP",
    text: "Nunca pensei que assistir vídeos poderia ser tão lucrativo. Em 3 semanas já consegui uma renda extra considerável.",
    amount: "R$ 847",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    rating: 5
  },
  {
    name: "João P.",
    location: "Rio de Janeiro, RJ",
    text: "O que mais me impressiona é a simplicidade. Faço isso nos intervalos do trabalho e já virou minha segunda renda.",
    amount: "R$ 1.234",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    rating: 5
  },
  {
    name: "Ana L.",
    location: "Belo Horizonte, MG",
    text: "Os vídeos são realmente interessantes. Faço todos os dias antes de dormir.",
    amount: "R$ 692",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    rating: 5
  },
  {
    name: "Pedro M.",
    location: "Curitiba, PR",
    text: "Comecei com o plano básico e em 2 semanas já fiz upgrade para o premium. Vale muito a pena!",
    amount: "R$ 943",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro",
    rating: 5
  },
  {
    name: "Carla R.",
    location: "Salvador, BA",
    text: "Indiquei para toda minha família. Agora fazemos maratona de avaliação juntos nos fins de semana.",
    amount: "R$ 1.127",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carla",
    rating: 5
  },
  {
    name: "Lucas F.",
    location: "Florianópolis, SC",
    text: "Sou estudante universitário e isso tem me ajudado muito com as despesas. Melhor decisão que tomei este ano!",
    amount: "R$ 876",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas",
    rating: 5
  }
]

function TestimonialCard({ testimonial, index }: { testimonial: typeof testimonials[0], index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex items-start space-x-4">
        <img 
          src={testimonial.avatar} 
          alt={testimonial.name}
          className="w-12 h-12 rounded-full bg-gray-100"
        />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
          <p className="text-sm text-gray-600">{testimonial.location}</p>
          <div className="flex space-x-1 mt-1">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-700 mt-4 italic">"{testimonial.text}"</p>
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Wallet className="w-4 h-4 text-[#c6426b]" />
          <span className="text-[#c6426b] font-semibold">{testimonial.amount}</span>
        </div>
        <span className="text-sm text-gray-500">último mês</span>
      </div>
    </motion.div>
  )
}

function TestimonialsCarousel() {
  const [page, setPage] = useState(0)
  const itemsPerPage = 3
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((current) => (current + 1) % totalPages)
    }, 5000)
    return () => clearInterval(timer)
  }, [totalPages])

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials
          .slice(page * itemsPerPage, (page + 1) * itemsPerPage)
          .map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.name} 
              testimonial={testimonial}
              index={index}
            />
          ))}
      </div>
      
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              page === index ? 'bg-[#c6426b] w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function SessionCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Sessão Ativa</h3>
        <span className="text-green-600 font-medium">+R$ 12,50 hoje</span>
      </div>

      <div className="space-y-4">
        {/* Vídeo de Culinária */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Vídeo de Culinária</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">8:42</span>
              <span className="text-sm text-green-600">+R$ 2,50</span>
            </div>
          </div>
          <div className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Podcast de Fitness */}
        <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg p-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Podcast de Fitness</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">25:43</span>
              <span className="text-sm text-green-600">+R$ 5,00</span>
            </div>
          </div>
          <div className="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Tutorial de Programação */}
        <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex-1">
            <h4 className="font-medium text-gray-900">Tutorial de Programação</h4>
            <div className="flex items-center gap-2">
              <span className="text-sm text-blue-600">Em andamento</span>
              <span className="text-sm text-green-600">+R$ 5,00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PlanModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Oferta Especial</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="mb-6 space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold text-[#c6426b]">R$ 29,90</span>
            <span className="text-gray-400 line-through">R$ 47,00</span>
            <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded-full">-36% OFF</span>
          </div>

          <div className="bg-[#c6426b]/10 p-3 rounded-lg mb-6 border border-[#c6426b]/20">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-[#c6426b]" />
              <span className="text-[#c6426b] font-medium">Potencial de Ganhos:</span>
            </div>
            <div className="mt-1">
              <span className="text-2xl font-bold text-[#c6426b]">R$ 600-800</span>
              <span className="text-[#c6426b] font-medium">/mês</span>
            </div>
          </div>

          <div>
            <h4 className="text-gray-900 font-medium mb-3">Você receberá:</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                100 vídeos para avaliar
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Potencial de R$ 600-800/mês
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Suporte prioritário
              </li>
              <li className="flex items-center text-gray-700">
                <span className="text-green-500 mr-2">✓</span>
                Acesso por 4 meses
              </li>
            </ul>
          </div>

          {/* Seção de Bônus */}
          <div className="bg-[#c6426b]/5 rounded-lg p-4 border-2 border-[#c6426b] border-dashed">
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-[#c6426b] text-white text-xs font-bold px-2 py-1 rounded-full">2 BÔNUS GRÁTIS</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <span className="text-[#c6426b] font-bold text-lg">✨</span>
                <div>
                  <h4 className="font-medium text-gray-900">Vídeos: Como Usar o APP</h4>
                  <p className="text-xs text-gray-600">Treinamento com estratégias para maximizar seus ganhos.</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-[#c6426b] font-bold text-lg">💰</span>
                <div>
                  <h4 className="font-medium text-gray-900">Faça Dinheiro com Shorts/Reels</h4>
                  <p className="text-xs text-gray-600">Aumente seus lucros com conteúdos curtos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button 
            className="w-full bg-[#c6426b] hover:bg-[#b33d61] text-white h-12 text-base"
            onClick={() => window.open('https://pay.cakto.com.br/by3jta9', '_blank')}
          >
            Quero aproveitar esta oferta →
          </Button>
          <button 
            className="w-full text-gray-500 hover:text-gray-700 text-sm"
            onClick={() => window.open('https://pay.cakto.com.br/38qwk92_420216', '_blank')}
          >
            Continuar com plano básico
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CatalogoPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const activeUsers = useRandomCounter(2847, 2800, 2900)

  const scrollToPlanos = () => {
    const planosSection = document.getElementById('planos')
    if (planosSection) {
      planosSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToResultados = () => {
    const resultadosSection = document.getElementById('resultados-reais')
    if (resultadosSection) {
      resultadosSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Contador de pessoas */}
      <div className="bg-green-50 py-2 text-center">
        <p className="text-green-600 text-sm">• <AnimatedNumber value={activeUsers} /> pessoas avaliando agora</p>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-[#c6426b] text-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl font-bold">
                A única plataforma que paga você para avaliar vídeos <span className="text-blue-200">de forma profissional</span>
              </h1>
              <p className="text-lg text-white/90">
                Não é sobre "ganhar dinheiro fácil". É sobre participar de um ecossistema real onde sua opinião tem valor comercial para criadores de conteúdo e marcas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg"
                  className="bg-black hover:bg-black/90 text-white"
                  onClick={scrollToPlanos}
                >
                  Descobrir como funciona →
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-transparent border-white text-white hover:bg-white/10"
                  onClick={scrollToResultados}
                >
                  Ver resultados reais
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <SessionCard />
            </div>
          </div>
        </div>
      </div>

      {/* Nova seção de Compromissos */}
      <div className="bg-white py-12">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">Modelo de negócio transparente e sustentável</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">Pagamentos processados semanalmente via PIX</p>
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                <span className="text-green-600">✓</span>
                <p className="text-gray-700">Sem promessas irreais - ganhos baseados em atividade</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="py-16 bg-white">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-[#c6426b]">
                <Target className="h-8 w-8 mx-auto mb-2" />
              </div>
              <div className="text-3xl font-bold text-gray-900">127.439</div>
              <div className="text-gray-600">Avaliações realizadas hoje</div>
            </div>
            <div className="text-center">
              <div className="text-[#c6426b]">
                <Wallet className="h-8 w-8 mx-auto mb-2" />
              </div>
              <div className="text-3xl font-bold text-gray-900">R$ 89.247</div>
              <div className="text-gray-600">Pagos nas últimas 24h</div>
            </div>
            <div className="text-center">
              <div className="text-[#c6426b]">
                <Eye className="h-8 w-8 mx-auto mb-2" />
              </div>
              <div className="text-3xl font-bold text-gray-900">
                <AnimatedNumber value={activeUsers} />
              </div>
              <div className="text-gray-600">Pessoas ativas agora</div>
            </div>
            <div className="text-center">
              <div className="text-[#c6426b]">
                <Star className="h-8 w-8 mx-auto mb-2" />
              </div>
              <div className="text-3xl font-bold text-gray-900">94%</div>
              <div className="text-gray-600">Taxa de satisfação</div>
            </div>
          </div>
        </div>
      </div>

      {/* Como funciona */}
      <div className="py-16 bg-[#f5f5f5]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Como pessoas comuns estão ganhando dinheiro</h2>
            <p className="text-gray-600 mt-2">Não é mágica. É um sistema simples que qualquer pessoa pode usar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">1. Escolha seu conteúdo</h3>
              <p className="text-gray-600">
                Culinária, fitness, tecnologia, viagem... Você decide o que assistir. Cada categoria tem valores diferentes.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">2. Assista e avalie</h3>
              <p className="text-gray-600">
                Dê sua opinião honesta. Sua avaliação ajuda criadores e plataformas a melhorar.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">3. Receba instantaneamente</h3>
              <p className="text-gray-600">
                Cada avaliação adiciona dinheiro ao seu saldo. Sem espera, sem complicação.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vídeos de Validação */}
      <div id="resultados-reais" className="py-16 bg-[#f5f5f5]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Veja quem já está ganhando</h2>
            <p className="text-gray-600 mt-2">Usuários reais mostrando seus ganhos na plataforma</p>
          </div>

          <div className="space-y-8">
            {/* VRTub Video */}
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="aspect-video">
                <div id="ifr_68479b77ddec08ed47550ea8_wrapper" style={{ margin: "0 auto", width: "100%" }}>
                  <div id="headline_68479b77ddec08ed47550ea8_1" className="smartplayer-headline" style={{ textAlign: "center", margin: "0px auto", display: "flex", flexDirection: "column", alignItems: "center", width: "fit-content" }}>
                    <div style={{ width: "100%", margin: "0px 0px 24px", fontFamily: "Inter", fontSize: "0.888889em", letterSpacing: "1px", lineHeight: "150%", textAlign: "left", color: "black" }}>
                      <p><strong>Veja o depoimento do Felipe Alves 👇</strong></p>
                    </div>
                  </div>
                  <div style={{ padding: "177.77777777777777% 0 0 0", position: "relative" }} id="ifr_68479b77ddec08ed47550ea8_aspect">
                    <iframe 
                      frameBorder="0" 
                      allowFullScreen 
                      src="https://scripts.converteai.net/0527b3fd-2e78-41bb-b91e-82ab89752620/players/68479b77ddec08ed47550ea8/embed.html" 
                      id="ifr_68479b77ddec08ed47550ea8" 
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                      referrerPolicy="origin"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Outros Vídeos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/image/mulher.png"
                  >
                    <source src="/videos/A_hyperrealistic_video_202506031816_kdopa.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Maria - São Paulo/SP</h3>
                  <p className="text-gray-600">
                    "Comecei há 2 semanas e já saquei R$ 247,50. É incrível como é simples!"
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                <div className="aspect-video">
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    poster="/image/homem.png"
                  >
                    <source src="/videos/A_hyperrealistic_video_202506031811_pm7ry.mp4" type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">João - Rio de Janeiro/RJ</h3>
                  <p className="text-gray-600">
                    "Já fiz mais de R$ 1.200 em um mês. Recomendo para todo mundo!"
                  </p>
                </div>
              </div>
            </div>

            {/* Depoimentos */}
            <div className="mt-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">Resultados que falam por si</h2>
                <p className="text-gray-600 mt-2">Pessoas reais, ganhos reais, histórias reais.</p>
              </div>

              <TestimonialsCarousel />
            </div>
          </div>
        </div>
      </div>

      {/* Planos */}
      <div id="planos" className="py-16 bg-[#f5f5f5]">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Escolha seu plano de acesso</h2>
            <p className="text-gray-600 mt-2">Comece hoje mesmo a ganhar dinheiro assistindo vídeos</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8">
              <h3 className="text-xl font-bold mb-2 text-gray-900">Acesso Básico</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-gray-900">R$ 19,90</span>
                <span className="text-gray-600 mb-1">pagamento único</span>
              </div>
              <div className="bg-green-50 p-3 rounded-lg mb-6 border border-green-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="text-green-600 font-medium">Potencial de Ganhos:</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-green-600">R$ 300-500</span>
                  <span className="text-green-600 font-medium">/mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  50 vídeos para avaliar
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Potencial de R$ 300-500/mês
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Suporte por e-mail
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Acesso por 3 meses
                </li>

                {/* Seção de Bônus */}
                <div className="mt-6 bg-[#c6426b]/5 rounded-lg p-4 border-2 border-[#c6426b] border-dashed">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#c6426b] text-white text-xs font-bold px-2 py-1 rounded-full">BÔNUS GRÁTIS</span>
                    <span className="text-[#c6426b] font-medium">Acesso Imediato</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <span className="text-[#c6426b] font-bold text-lg">✨</span>
                      <div>
                        <h4 className="font-medium text-gray-900">Vídeos Completos: Como Usar o APP</h4>
                        <p className="text-sm text-gray-600">Receba gratuitamente nosso treinamento exclusivo com todas as estratégias para maximizar seus ganhos.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
              <Button 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Começar agora
              </Button>
            </div>

            <div className="bg-white rounded-xl p-8 border-2 border-blue-500 relative">
              <div className="absolute -top-3 right-8 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                Mais popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Acesso Super Premium</h3>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold text-blue-500">R$ 47,00</span>
                <span className="text-gray-600 mb-1">pagamento único</span>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg mb-6 border border-blue-100">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-600 font-medium">Potencial de Ganhos:</span>
                </div>
                <div className="mt-1">
                  <span className="text-2xl font-bold text-blue-600">R$ 1.200-1.500</span>
                  <span className="text-blue-600 font-medium">/mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Catálogo ilimitado de vídeos
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Potencial de R$ 1.200-1.500/mês
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Suporte prioritário via WhatsApp
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Acesso antecipado a novos vídeos
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Vídeos premium melhor remunerados
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-green-500 mr-2">✓</span>
                  Prioridade na fila de pagamentos
                </li>

                {/* Seção de Bônus */}
                <div className="mt-4">
                  <div className="bg-[#c6426b]/5 rounded-lg p-4 border-2 border-[#c6426b] border-dashed">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#c6426b] text-white text-xs font-bold px-2 py-1 rounded-full">3 BÔNUS EXCLUSIVOS</span>
                      <span className="text-[#c6426b] text-xs font-medium">Valor: R$ 147,00</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-[#c6426b] font-bold text-lg">✨</span>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">Vídeos: Como Usar o APP</p>
                          <p className="text-xs text-gray-500">Domine todas as funcionalidades</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-[#c6426b] font-bold text-lg">💰</span>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">Faça Dinheiro com Shorts/Reels</p>
                          <p className="text-xs text-gray-500">Estratégias para conteúdo viral</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 bg-blue-50 p-2 rounded-lg">
                        <span className="text-blue-500 font-bold text-lg">🚀</span>
                        <div>
                          <p className="text-sm text-gray-700 font-medium">NOVO: Potencialize com Notícias</p>
                          <p className="text-xs text-gray-500">Exclusivo para membros Super Premium</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
              <Button 
                className="w-full bg-[#c6426b] hover:bg-[#b33d61] text-white"
                size="lg"
                onClick={() => window.open('https://pay.cakto.com.br/ytwiokn', '_blank')}
              >
                Escolher Super Premium
              </Button>
            </div>
          </div>
        </div>
      </div>

      <PlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Footer */}
      <div className="bg-white py-8 text-center text-gray-600 text-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          © 2024 ClipCash. Transformando tempo de tela em oportunidade.
        </div>
      </div>
    </div>
  )
} 