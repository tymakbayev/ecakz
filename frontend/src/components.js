import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  MessageCircle 
} from 'lucide-react';

// Header Component
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const headerBg = useTransform(scrollY, [0, 100], ['rgba(219, 39, 119, 0.1)', 'rgba(219, 39, 119, 0.95)']);

  const menuItems = [
    { name: 'УСЛУГИ', href: '#services' },
    { name: 'НОВОСТИ', href: '#news' },
    { name: 'ПРОДУКТЫ', href: '#products' },
    { name: 'КАРЬЕРА', href: '#career' },
    { name: 'КОНТАКТЫ', href: '#contact' }
  ];

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
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AT</span>
            </div>
            <span className="text-white font-bold text-xl">ALICE-T</span>
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
                className="text-white hover:text-pink-400 transition-colors duration-300 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:block bg-gradient-to-r from-pink-500 to-blue-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            МЫ
          </motion.button>

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
                onClick={() => setIsMenuOpen(false)}
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
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-blue-900/50 to-slate-900/50" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(219, 39, 119, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(219, 39, 119, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute inset-0"
        />
      </div>

      {/* Hero Image */}
      <div className="absolute inset-0 opacity-30">
        <img 
          src="https://images.unsplash.com/photo-1713098965471-d324f294a71d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwxfHxnZW9sb2NhdGlvbiUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1MjQ5OTU3N3ww&ixlib=rb-4.1.0&q=85"
          alt="Geolocation Technology"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            GEOSTATUS
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Сервис предназначен для эффективного управления выездными задачами и процессами, 
            а также учета рабочего времени с применением технологии геолокации для сотрудников, 
            осуществляющих работу на удаленном доступе.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            ПОДРОБНЕЕ
            <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-pink-500 rounded-full flex justify-center"
        >
          <div className="w-1 h-3 bg-pink-500 rounded-full mt-2"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};

// Services Component
export const Services = () => {
  const services = [
    {
      icon: <MapPin size={32} />,
      title: 'Геолокационное отслеживание',
      description: 'Точное определение местоположения сотрудников в реальном времени'
    },
    {
      icon: <Clock size={32} />,
      title: 'Учет рабочего времени',
      description: 'Автоматический учет времени работы и контроль рабочих часов'
    },
    {
      icon: <Users size={32} />,
      title: 'Управление командой',
      description: 'Эффективное управление удаленными сотрудниками и задачами'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Аналитика и отчеты',
      description: 'Детальная аналитика работы сотрудников и бизнес-процессов'
    },
    {
      icon: <Shield size={32} />,
      title: 'Безопасность данных',
      description: 'Надежная защита персональных данных и конфиденциальной информации'
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Мобильное приложение',
      description: 'Удобное мобильное приложение для сотрудников и руководителей'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Наши <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">Услуги</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Комплексные решения для эффективного управления удаленными сотрудниками
          </p>
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

// Technology Component
export const Technology = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">
                EVOTECH
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Инновационная платформа для управления бизнес-процессами с использованием 
              передовых технологий геолокации и машинного обучения.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                'Искусственный интеллект для аналитики',
                'Облачные технологии для масштабируемости',
                'Машинное обучение для предсказаний',
                'Блокчейн для безопасности данных'
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle className="text-pink-500" size={20} />
                  <span className="text-white">{tech}</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              ПОДРОБНЕЕ
              <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542641728-6ca359b085f4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2MzR8MHwxfHNlYXJjaHwzfHxidXNpbmVzcyUyMHRlYW18ZW58MHx8fGJsdWV8MTc1MjQyNTI3MHww&ixlib=rb-4.1.0&q=85"
                alt="Technology Innovation"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 to-blue-500/20" />
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <Globe className="text-white" size={24} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Features Component
export const Features = () => {
  const features = [
    {
      title: 'Режим реального времени',
      description: 'Мгновенное отслеживание местоположения и активности сотрудников',
      percentage: '99.9%',
      label: 'Точность'
    },
    {
      title: 'Интеграция с CRM',
      description: 'Seamless интеграция с существующими бизнес-системами',
      percentage: '24/7',
      label: 'Поддержка'
    },
    {
      title: 'Мобильная оптимизация',
      description: 'Полная функциональность на всех мобильных устройствах',
      percentage: '100%',
      label: 'Совместимость'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-blue-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Почему выбирают <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">нас</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Передовые технологии и надежность для вашего бизнеса
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center"
            >
              <div className="bg-gradient-to-br from-slate-800/50 to-blue-800/50 backdrop-blur-sm rounded-xl p-8 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-300 group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-2"
                >
                  {feature.percentage}
                </motion.div>
                <div className="text-pink-400 font-semibold mb-4">{feature.label}</div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-blue-900 to-slate-900">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Свяжитесь с <span className="bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent">нами</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Готовы внедрить современные решения в ваш бизнес?
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Mail className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-300">info@alice-t.kz</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                  <Phone className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Телефон</h3>
                  <p className="text-gray-300">+7 (777) 123-45-67</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Поддержка</h3>
                  <p className="text-gray-300">24/7 онлайн поддержка</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <img 
                src="https://images.pexels.com/photos/7616608/pexels-photo-7616608.jpeg"
                alt="Professional Business"
                className="rounded-2xl shadow-2xl w-full h-[300px] object-cover"
              />
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-2">Имя</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300"
                  placeholder="Ваше имя"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Сообщение</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-pink-500/20 rounded-lg text-white placeholder-gray-400 focus:border-pink-500 focus:outline-none transition-colors duration-300 resize-none"
                  placeholder="Ваше сообщение..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-pink-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Отправить сообщение
                <ArrowRight size={20} />
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
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-pink-500/20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AT</span>
              </div>
              <span className="text-white font-bold text-xl">ALICE-T</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Инновационные решения для управления удаленными сотрудниками с использованием 
              передовых технологий геолокации и аналитики.
            </p>
            <div className="text-sm text-gray-500">
              © {currentYear} Alice-T. Все права защищены.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Быстрые ссылки</h4>
            <ul className="space-y-2">
              {['Услуги', 'Продукты', 'О нас', 'Контакты'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2">
              {['Помощь', 'Документация', 'Карьера', 'Новости'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};