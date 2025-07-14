import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Menu, 
  X, 
  MapPin, 
  Shield, 
  Clock, 
  Users, 
  BarChart3, 
  Smartphone, 
  Globe, 
  CheckCircle, 
  ArrowRight, 
  Mail, 
  Phone, 
  MessageCircle,
  Bot,
  FileText,
  Eye,
  Building,
  Award,
  Target,
  Zap,
  Cloud,
  Settings,
  ChevronLeft,
  ChevronRight,
  Languages,
  Send,
  Minimize2,
  Maximize2
} from 'lucide-react';

// Header Component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('RUS');
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(219, 39, 119, 0.1)', 'rgba(219, 39, 119, 0.95)']);

  const menuItems = [
    { name: 'УСЛУГИ', href: '#services' },
    { name: 'КЛИЕНТЫ', href: '#clients' },
    { name: 'ПРОДУКТЫ', href: '#products' },
    { name: 'КАРЬЕРА', href: '#career' },
    { name: 'КОНТАКТЫ', href: '#contact' }
  ];

  const languages = ['RUS', 'ENG', 'ҚАЗ'];

  return (
    <motion.header 
      className="fixed w-full top-0 z-50 backdrop-blur-md border-b border-pink-500/20"
      style={{ backgroundColor: headerBg }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2"
          >
            <div className="w-10 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">EVO</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setCurrentLang(lang)}
                  className={`text-xs px-2 py-1 rounded transition-colors ${
                    currentLang === lang 
                      ? 'bg-pink-500 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-white hover:text-pink-400 py-2 transition-colors duration-300"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

// Hero Component
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background with dots pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/90 to-slate-900/90" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      {/* EVOTECH branding similar to original */}
      <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.h1 
          className="text-8xl md:text-9xl font-bold text-pink-500 opacity-20"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2 }}
        >
          EVOTECH
        </motion.h1>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Мы делаем то,
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              во что верим
            </span>
          </motion.h2>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
            onClick={() => document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' })}
          >
            ПОДРОБНЕЕ
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Products Component
export const Products = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      title: 'OMILIA',
      description: 'Интеллектуальный голосовой и текстовый ассистент, предназначенный для оптимизации процессов обслуживания клиентов путем предоставления сервисов самообслуживания',
      icon: <Bot size={40} />
    },
    {
      title: 'EVOCHAT',
      description: 'Омниканальная чат-бот платформа для автоматизации коммуникации с клиентами посредством любых текстовых каналов, как с привлечением агентов, так и с помощью чат-ботов',
      icon: <MessageCircle size={40} />
    },
    {
      title: 'GEOSTATUS',
      description: 'Сервис предназначен для эффективного управления выездными задачами и процессами, а также учета рабочего времени с применением технологии геозонирования для сотрудников, осуществляющих работу на удаленном доступе.',
      icon: <MapPin size={40} />
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section id="products" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="relative">
          {/* Navigation buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors"
          >
            <ChevronLeft className="text-white" size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-colors"
          >
            <ChevronRight className="text-white" size={24} />
          </button>

          {/* Product cards */}
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-8 border border-pink-500/20 text-center"
              >
                <div className="text-pink-500 mb-6 flex justify-center">
                  {products[currentSlide].icon}
                </div>
                <h3 className="text-4xl font-bold text-white mb-6">
                  {products[currentSlide].title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                  {products[currentSlide].description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
                >
                  ПОДРОБНЕЕ
                  <ArrowRight size={20} />
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-pink-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Services Component
export const Services = () => {
  const services = [
    {
      title: 'АНАЛИЗ И ОЦЕНКА',
      description: 'Комплексный анализ бизнес-процессов, выявление проблем и оценка потребностей для разработки IT-решений',
      icon: <BarChart3 size={32} />
    },
    {
      title: 'ПРЕДПРОЕКТНЫЕ ИССЛЕДОВАНИЯ',
      description: 'Технические исследования и анализ требований для определения оптимальной архитектуры проекта',
      icon: <FileText size={32} />
    },
    {
      title: 'РАЗРАБОТКА РЕШЕНИЙ',
      description: 'Создание индивидуальных технических решений, адаптированных под специфические задачи бизнеса',
      icon: <Settings size={32} />
    },
    {
      title: 'ВНЕДРЕНИЕ И ИНТЕГРАЦИЯ',
      description: 'Профессиональное внедрение, интеграция и развитие разработанных решений с существующей ИТ-инфраструктурой',
      icon: <Zap size={32} />
    },
    {
      title: 'ГАРАНТИЙНАЯ ПОДДЕРЖКА',
      description: 'Полное гарантийное и пост-гарантийное сопровождение, техническая поддержка внедренных решений',
      icon: <Shield size={32} />
    },
    {
      title: 'ОБЛАЧНЫЕ УСЛУГИ',
      description: 'Предоставление современных облачных услуг и SaaS-решений на базе собственных продуктов',
      icon: <Cloud size={32} />
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">УСЛУГИ</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
            >
              <div className="text-pink-500 mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Clients Component
export const Clients = () => {
  const stats = [
    { number: '50+', label: 'ДОВОЛЬНЫХ КЛИЕНТОВ' },
    { number: '100+', label: 'РЕАЛИЗОВАННЫХ ПРОЕКТОВ' },
    { number: '15+', label: 'ЛЕТ ОПЫТА' },
    { number: '100%', label: 'КАЧЕСТВО РЕШЕНИЙ' }
  ];

  return (
    <section id="clients" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            НАШИ <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">КЛИЕНТЫ</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Компании, которые доверяют нам свои IT-решения
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-white font-semibold text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
export const Testimonials = () => {
  const testimonials = [
    { company: 'BANK CENTER CREDIT', title: 'Благодарность за качественную реализацию проекта' },
    { company: 'ЕВРАЗИЙСКИЙ БАНК', title: 'Признательность за профессиональную работу' },
    { company: 'КАЗАХТЕЛЕКОМ', title: 'Благодарность за успешное внедрение решения' },
    { company: 'КАЗАХТЕЛЕКОМ', title: 'Отзыв о качестве предоставленных услуг' },
    { company: 'ORGANIZATION OF HORIZONTAL MONITORING LIMITED', title: 'Признательность за техническую поддержку' },
    { company: 'ТЕХНО ТС КОМП', title: 'Благодарность за партнерство' },
    { company: 'МЕДИЦИНСКАЯ ОРГАНИЗАЦИЯ', title: 'Отзыв о внедрении медицинского ПО' }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            БЛАГОДАРСТВЕННЫЕ <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">ПИСЬМА</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Отзывы наших клиентов о качестве нашей работы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300"
            >
              <div className="text-pink-500 mb-4">
                <Award size={32} />
              </div>
              <h4 className="text-pink-400 font-semibold mb-2">Благодарственное письмо</h4>
              <h3 className="text-xl font-semibold text-white mb-3">
                {testimonial.company}
              </h3>
              <p className="text-gray-300 mb-4">
                {testimonial.title}
              </p>
              <button className="flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors">
                <Eye size={16} />
                ПРОСМОТРЕТЬ ДОКУМЕНТ
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// About Component
export const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
              EVOTECH CENTRAL ASIA
            </span>
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-300 mb-6 leading-relaxed">
              Команда профессионалов с 15+ летним опытом разработки, внедрения и развития инновационных IT-решений.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Клиентоориентированность, подкрепленная экспертными знаниями и передовыми технологиями - наша характерная черта.
            </p>
            <div className="bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-lg p-4 inline-block">
              <p className="text-white font-semibold">
                Участник Международного технопарка IT-стартапов "Astana Hub"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Contact Component
export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">КОНТАКТЫ</span>
            </h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="text-pink-400 font-semibold mb-2">ТОО «ЭВОТЕК ЦЕНТРАЛЬНАЯ АЗИЯ»</h3>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-2">АДРЕС:</h4>
                <p className="text-gray-300">г.Алматы, ул.Жарокова 280В, литер А, 3 этаж</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">EMAIL:</h4>
                <p className="text-gray-300">info@eca.kz</p>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">ТЕЛЕФОН:</h4>
                <p className="text-gray-300">+7 (727) 339 60 90</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-pink-400 font-semibold mb-4">КАРЬЕРА</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="font-semibold">РЕЗЮМЕ НАПРАВЛЯТЬ НА:</span> hr@eca.kz
                </p>
                <p className="text-gray-300">
                  <span className="font-semibold">АКТИВНЫЕ ВАКАНСИИ (1):</span>
                </p>
                <p className="text-pink-400">IT-Project Manager (Алматы)</p>
              </div>
            </div>
          </motion.div>

          {/* Consultation Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
            </h3>
            <p className="text-gray-300 mb-8">
              Свяжитесь с нами для обсуждения вашего проекта
            </p>

            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Ваш email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300"
                />
              </div>

              <div>
                <textarea
                  placeholder="Ваше сообщение"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                НАПИСАТЬ НАМ
                <Send size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-pink-500/20">
      <div className="container mx-auto px-4 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-400">
            © Evotech Central Asia. Все права защищены. 2025
          </p>
        </div>
      </div>
    </footer>
  );
};

// ChatBot Component
export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle className="text-white" size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className={`fixed bottom-24 right-6 w-80 bg-slate-800 rounded-lg border border-pink-500/20 shadow-xl z-50 ${
              isMinimized ? 'h-12' : 'h-96'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-pink-500/20">
              <span className="text-white font-semibold">Помощник</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Content */}
            {!isMinimized && (
              <div className="p-4 h-full">
                <div className="bg-pink-500/20 rounded-lg p-3 mb-4">
                  <p className="text-white text-sm">
                    Здравствуйте! Как я могу вам помочь?
                  </p>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Введите сообщение..."
                      className="flex-1 px-3 py-2 bg-slate-700 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none text-sm"
                    />
                    <button className="bg-gradient-to-r from-pink-500 to-blue-500 p-2 rounded-lg hover:shadow-lg transition-all">
                      <Send className="text-white" size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Consultation Modal Component
export const ConsultationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // This can be triggered by buttons
  window.openConsultation = () => setIsOpen(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-slate-800 rounded-lg p-8 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Консультация</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-3 bg-slate-700 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
              />
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full px-4 py-3 bg-slate-700 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none"
              />
              <textarea
                placeholder="Ваше сообщение"
                rows={4}
                className="w-full px-4 py-3 bg-slate-700 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none resize-none"
              />
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Отправить
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-500 transition-colors"
                >
                  Отмена
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};