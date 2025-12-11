import React, { useState, useEffect } from 'react';
import { RoomType, Amenity, BlogPost, BookingFormState } from './types';
import { 
  Wifi, 
  Coffee, 
  Wind, 
  BookOpen, 
  Projector, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Menu, 
  X,
  Star,
  CheckCircle2
} from 'lucide-react';

// --- DATA ---

const ROOMS: RoomType[] = [
  {
    id: 'peace-full',
    name: 'Peace-full',
    capacity: '4-5 khách',
    description: 'Không gian rộng 50m², nơi gắn kết cả gia đình trong sự bình yên.',
    features: ['2 Giường đôi', 'Sofa & Bàn trà bệt', 'Toilet riêng', 'Cửa sổ lớn'],
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=800&auto=format&fit=crop',
    tag: 'Best Seller'
  },
  {
    id: 'soulmate',
    name: 'Soulmate',
    capacity: '1-2 khách',
    description: 'Căn phòng lãng mạn ngập tràn ánh sáng tự nhiên cho các cặp đôi.',
    features: ['1 Giường Queen', 'Góc đọc sách', 'Toilet chung', 'Decor vintage'],
    image: 'https://images.unsplash.com/photo-1512918760513-95f6929c3d38?q=80&w=800&auto=format&fit=crop',
    tag: 'Romantic'
  },
  {
    id: 'inner-home',
    name: 'Inner Home',
    capacity: '1-2 khách',
    description: 'Túp lều trú ẩn nhỏ xinh, nơi bạn tìm về sự tĩnh lặng bên trong.',
    features: ['Giường pallet', 'Yên tĩnh tuyệt đối', 'Toilet chung', 'Giá rẻ'],
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=800&auto=format&fit=crop',
    tag: 'Cozy'
  },
  {
    id: 'combo',
    name: 'Combo Gia Đình',
    capacity: '6-7 khách',
    description: 'Sự kết hợp hoàn hảo giữa Peace-full và Soulmate cho đại gia đình.',
    features: ['3 Giường ngủ', 'Không gian riêng tư', 'Ưu đãi giá', 'Đầy đủ tiện nghi'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=800&auto=format&fit=crop',
    tag: 'Family'
  },
  {
    id: 'attic',
    name: 'Nguyên căn Áp Mái',
    capacity: '6-10 khách',
    description: 'Tầng thượng cực chill với không gian mở, bếp và máy chiếu phim.',
    features: ['Bếp nấu ăn', 'Máy chiếu phim', 'Ban công rộng', 'Tiệc BBQ'],
    image: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800&auto=format&fit=crop',
    tag: 'Full House'
  }
];

const AMENITIES: Amenity[] = [
  { iconClass: 'fa-kitchen-set', name: 'Bếp tiện nghi' },
  { iconClass: 'fa-shirt', name: 'Giặt sấy 24/7' },
  { iconClass: 'fa-wifi', name: 'Wifi tốc độ cao' },
  { iconClass: 'fa-motorcycle', name: 'Thuê xe máy' },
  { iconClass: 'fa-car', name: 'Bãi đỗ ô tô' },
  { iconClass: 'fa-film', name: 'Máy chiếu phim' },
  { iconClass: 'fa-cloud-sun', name: 'Ban công Chill' },
  { iconClass: 'fa-book', name: 'Sách & Boardgame' },
];

const BLOGS: BlogPost[] = [
  {
    id: 1,
    title: "Top 5 lý do chọn Eden Home",
    summary: "Tại sao Eden Home lại là điểm dừng chân chữa lành được yêu thích nhất Vũng Tàu?",
    date: "12 Tháng 10, 2023",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Kinh nghiệm du lịch chữa lành",
    summary: "Gợi ý lịch trình 2 ngày 1 đêm nhẹ nhàng, không xô bồ tại phố biển.",
    date: "05 Tháng 11, 2023",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Check-in những quán cafe vintage",
    summary: "Những góc quán nhỏ quanh Eden Home mang đậm hơi thở hoài niệm.",
    date: "20 Tháng 11, 2023",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop"
  }
];

// --- COMPONENTS ---

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-12" data-aos="fade-up">
    <h2 className="text-3xl md:text-4xl font-serif text-sage font-bold mb-4 decoration-terra/30 underline decoration-wavy underline-offset-8">
      {title}
    </h2>
    {subtitle && <p className="text-earth/80 max-w-2xl mx-auto italic text-lg">{subtitle}</p>}
  </div>
);

const Button = ({ children, onClick, className = "", type = "button" }: { children?: React.ReactNode, onClick?: () => void, className?: string, type?: "button" | "submit" }) => (
  <button
    type={type}
    onClick={onClick}
    className={`bg-terra hover:bg-terra-dark text-white font-sans font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 ${className}`}
  >
    {children}
  </button>
);

// --- MAIN APP ---

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState<BookingFormState>({
    fullName: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    infants: 0,
    arrivalTime: '',
    notes: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cảm ơn ${formData.fullName}! Eden Home đã nhận được yêu cầu của bạn. Chúng tôi sẽ liên hệ lại qua SĐT ${formData.phone} sớm nhất.`);
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans antialiased text-earth selection:bg-sage/30">
      
      {/* --- HEADER --- */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-cream/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            {/* Logo Text */}
            <h1 className={`font-serif font-bold text-2xl md:text-3xl tracking-tight ${isScrolled ? 'text-sage' : 'text-sage md:text-white'}`}>
              Eden Home<span className="text-terra">.</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Về Eden', 'Phòng & Dịch vụ', 'Blog', 'Liên hệ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Về Eden' ? 'about' : item === 'Phòng & Dịch vụ' ? 'rooms' : item === 'Blog' ? 'blog' : 'booking')}
                className={`text-sm font-semibold uppercase tracking-wider hover:text-terra transition-colors ${
                  isScrolled ? 'text-earth' : 'text-white drop-shadow-md'
                }`}
              >
                {item}
              </button>
            ))}
            <Button 
              className={!isScrolled ? "bg-white text-terra hover:bg-gray-100" : ""}
              onClick={() => scrollToSection('booking')}
            >
              Đặt phòng ngay
            </Button>
          </nav>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-terra p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} color={isScrolled ? '#CD853F' : '#FFF'} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-cream z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
           <div className="flex flex-col items-center justify-center h-full space-y-8">
             <button onClick={() => setIsMobileMenuOpen(false)} className="absolute top-6 right-6 text-earth">
               <X size={32} />
             </button>
             {['Về Eden', 'Phòng & Dịch vụ', 'Blog', 'Liên hệ'].map((item) => (
              <button 
                key={item}
                onClick={() => scrollToSection(item === 'Về Eden' ? 'about' : item === 'Phòng & Dịch vụ' ? 'rooms' : item === 'Blog' ? 'blog' : 'booking')}
                className="text-2xl font-serif text-sage font-bold"
              >
                {item}
              </button>
            ))}
            <Button onClick={() => scrollToSection('booking')}>Đặt phòng ngay</Button>
           </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="./hero-bg.jpg" 
            onError={(e) => {
               // Fallback to original Unsplash image if local file is not found
               e.currentTarget.src = "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1920&auto=format&fit=crop";
            }}
            alt="Eden Home Vũng Tàu - Không gian chữa lành" 
            className="w-full h-full object-cover"
          />
          {/* Overlay increased to 40% for better contrast with brighter user images */}
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in-up">
          <span className="block text-white/90 text-lg md:text-xl font-sans tracking-[0.2em] mb-4 uppercase drop-shadow-md">
            Homestay Vũng Tàu
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white font-bold mb-6 leading-tight drop-shadow-lg uppercase">
            Chốn an lành, <br/> trọn vẹn kết nối
          </h2>
          <p className="text-white/95 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light drop-shadow-md">
            Eden Home không chỉ là nơi nghỉ ngơi, mà còn là điểm đến giúp bạn tìm lại bình yên trong tâm hồn và gắn kết yêu thương.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Button onClick={() => scrollToSection('booking')}>Đặt phòng ngay</Button>
             <button 
                onClick={() => scrollToSection('about')}
                className="bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-sage transition-all duration-300 drop-shadow-md"
             >
               Khám phá Eden
             </button>
          </div>
        </div>
        
        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/80">
          <i className="fa-solid fa-chevron-down text-2xl drop-shadow-md"></i>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="py-20 md:py-28 px-4 md:px-8 bg-cream bg-paper-texture">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-sage/20 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500"></div>
              <img 
                src="https://images.unsplash.com/photo-1522771753035-4a5042305a63?q=80&w=800&auto=format&fit=crop" 
                alt="Cozy Corner" 
                className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/5]" 
              />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg border-l-4 border-terra">
                <p className="font-serif italic text-earth">"Hạnh phúc đôi khi chỉ là được cuộn mình trong chăn ấm, nghe một bản nhạc êm."</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <span className="text-terra font-bold tracking-widest uppercase text-sm">Câu chuyện của chúng mình</span>
              <h2 className="text-4xl font-serif text-sage font-bold leading-tight">
                Ngôi nhà an trú giữa <br/> nhịp sống hiện đại
              </h2>
              <div className="h-1 w-20 bg-terra rounded-full"></div>
              <p className="text-lg leading-relaxed text-earth/80">
                Lấy cảm hứng từ khu vườn địa đàng, <strong>Eden Home</strong> được xây dựng dựa trên triết lý <span className="text-sage font-bold">"Healing - Cân bằng - Tự nhiên"</span>. Chúng mình tin rằng, một chuyến đi không cần quá xa hoa, chỉ cần đủ ấm áp để vỗ về tâm hồn.
              </p>
              <p className="text-lg leading-relaxed text-earth/80">
                Mỗi căn phòng tại Eden là một câu chuyện riêng: từ <em>Peace-full</em> rộng mở cho gia đình, đến <em>Soulmate</em> lãng mạn cho lứa đôi, hay <em>Inner Home</em> tĩnh lặng để đối thoại với chính mình.
              </p>
              
              <div className="grid grid-cols-3 gap-4 pt-6">
                {[
                  { label: "Yên tĩnh", icon: "fa-leaf" },
                  { label: "Gần gũi", icon: "fa-heart" },
                  { label: "Vintage", icon: "fa-camera-retro" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl shadow-sm border border-sage/10">
                    <i className={`fa-solid ${item.icon} text-2xl text-terra`}></i>
                    <span className="font-bold text-sage text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ROOMS SECTION --- */}
      <section id="rooms" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle 
            title="Các Hạng Phòng" 
            subtitle="Mỗi căn phòng là một không gian được chăm chút tỉ mỉ, mang đến sự thoải mái tuyệt đối cho kỳ nghỉ của bạn."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROOMS.map((room) => (
              <div key={room.id} className="group bg-cream rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={room.image} 
                    alt={room.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-earth shadow-sm">
                    {room.tag}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-2xl font-serif text-white font-bold">{room.name}</h3>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-center mb-4">
                    <span className="flex items-center text-sage font-bold bg-sage/10 px-3 py-1 rounded-full text-sm">
                      <i className="fa-solid fa-user-group mr-2"></i> {room.capacity}
                    </span>
                  </div>
                  
                  <p className="text-earth/70 mb-6 line-clamp-2">{room.description}</p>
                  
                  <ul className="space-y-2 mb-6 flex-1">
                    {room.features.slice(0, 3).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-earth/80">
                        <CheckCircle2 size={16} className="text-sage mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    onClick={() => scrollToSection('booking')}
                    className="w-full py-3 border-2 border-sage text-sage font-bold rounded-xl hover:bg-sage hover:text-white transition-colors duration-300"
                  >
                    Đặt phòng ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- AMENITIES SECTION --- */}
      <section className="py-20 bg-sage/5">
        <div className="container mx-auto px-4">
          <SectionTitle title="Tiện Ích & Dịch Vụ" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {AMENITIES.map((amenity, idx) => (
              <div key={idx} className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="w-12 h-12 bg-terra/10 rounded-full flex items-center justify-center mb-4 text-terra">
                  <i className={`fa-solid ${amenity.iconClass} text-xl`}></i>
                </div>
                <span className="font-semibold text-earth">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BLOG & REVIEWS SECTION --- */}
      <section id="blog" className="py-20 bg-cream">
        <div className="container mx-auto px-4 md:px-8">
          <SectionTitle 
            title="Góc Chia Sẻ" 
            subtitle="Những câu chuyện nhỏ và cảm nhận từ những vị khách đáng yêu." 
          />

          {/* Testimonial Slider (Simplified) */}
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-sage/10 max-w-4xl mx-auto mb-20 text-center relative overflow-hidden">
            <div className="absolute top-4 left-4 text-6xl text-terra/20 font-serif">"</div>
            <p className="text-xl md:text-2xl font-serif text-earth italic mb-6 relative z-10">
              Mình đã có một kỳ nghỉ thật sự chữa lành tại Eden. Không gian yên tĩnh, mùi tinh dầu sả chanh thoang thoảng khắp phòng, và chiếc ban công đầy nắng sớm mai... Cảm giác như được trở về nhà.
            </p>
            <div className="flex items-center justify-center gap-2 mb-2">
              {[1,2,3,4,5].map(i => <Star key={i} size={18} className="fill-terra text-terra" />)}
            </div>
            <p className="font-bold text-sage">Phương Anh - Sài Gòn</p>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOGS.map((blog) => (
              <div key={blog.id} className="bg-white rounded-xl overflow-hidden shadow-md group cursor-pointer">
                <div className="h-48 overflow-hidden">
                   <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="text-xs text-terra font-bold uppercase tracking-wider mb-2">{blog.date}</div>
                  <h3 className="text-xl font-serif font-bold text-sage mb-3 group-hover:text-terra transition-colors">{blog.title}</h3>
                  <p className="text-earth/70 text-sm">{blog.summary}</p>
                  <a href="#" className="inline-block mt-4 text-terra font-bold text-sm hover:underline">Đọc thêm &rarr;</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BOOKING SECTION --- */}
      <section id="booking" className="py-20 bg-sage text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            
            {/* Left: Policy & Info */}
            <div className="lg:w-1/3 bg-earth p-10 md:p-12 text-cream flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-terra/20 rounded-full -ml-12 -mb-12"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-serif font-bold mb-8 text-terra">Chính Sách Lưu Trú</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <i className="fa-regular fa-clock mt-1 mr-4 text-terra text-xl"></i>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Check-in / Check-out</h4>
                      <p className="text-white/70 text-sm">Check-in: 14:00</p>
                      <p className="text-white/70 text-sm">Check-out: 12:00</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa-solid fa-coins mt-1 mr-4 text-terra text-xl"></i>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Phụ Thu</h4>
                      <p className="text-white/70 text-sm">Người lớn: 150.000đ/người</p>
                      <p className="text-white/70 text-sm">Trẻ em (6-11t): 100.000đ/bé</p>
                      <p className="text-white/70 text-sm">Thú cưng: 300.000đ/bé</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <i className="fa-solid fa-shield-cat mt-1 mr-4 text-terra text-xl"></i>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Chính Sách Hủy</h4>
                      <p className="text-white/70 text-sm">Đặt phòng không hoàn cọc. Vui lòng cân nhắc kỹ trước khi booking.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10 text-center relative z-10">
                <p className="text-sm text-white/50 mb-2">Cần hỗ trợ gấp?</p>
                <p className="text-2xl font-bold text-terra font-serif tracking-widest">0868 461 939</p>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:w-2/3 p-8 md:p-12 bg-white text-earth">
              <h3 className="text-3xl font-serif font-bold text-sage mb-2">Đặt Phòng Ngay</h3>
              <p className="text-earth/60 mb-8">Điền thông tin bên dưới để giữ chỗ cho kỳ nghỉ chữa lành của bạn.</p>
              
              <form onSubmit={handleBookingSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-earth mb-2">Họ và Tên</label>
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-earth mb-2">Số điện thoại</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-all"
                      placeholder="09xx xxx xxx"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-earth mb-2">Ngày Check-in</label>
                    <input 
                      type="date" 
                      name="checkIn"
                      value={formData.checkIn}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-earth mb-2">Ngày Check-out</label>
                    <input 
                      type="date" 
                      name="checkOut"
                      value={formData.checkOut}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                   <div>
                    <label className="block text-xs font-bold text-earth mb-2 uppercase">Người lớn</label>
                    <input type="number" name="adults" min="1" value={formData.adults} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage outline-none"/>
                   </div>
                   <div>
                    <label className="block text-xs font-bold text-earth mb-2 uppercase">Trẻ em (6-12)</label>
                    <input type="number" name="children" min="0" value={formData.children} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage outline-none"/>
                   </div>
                   <div>
                    <label className="block text-xs font-bold text-earth mb-2 uppercase">Em bé (&lt;6)</label>
                    <input type="number" name="infants" min="0" value={formData.infants} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage outline-none"/>
                   </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-earth mb-2">Lời nhắn cho Eden (Optional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-sage focus:ring-1 focus:ring-sage outline-none transition-all"
                    placeholder="Bạn cần chuẩn bị gì thêm không? (Sinh nhật, kỷ niệm...)"
                  ></textarea>
                </div>

                <Button type="submit" className="w-full py-4 text-lg shadow-xl hover:shadow-2xl">
                  Gửi Yêu Cầu Đặt Phòng
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-earth text-cream pt-20 pb-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-white mb-6">Eden Home<span className="text-terra">.</span></h2>
              <p className="text-white/60 mb-6 leading-relaxed">
                Nơi trú ẩn bình yên giữa lòng Vũng Tàu, dành cho những tâm hồn mệt mỏi tìm về với thiên nhiên và chính mình.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terra transition-colors"><Facebook size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terra transition-colors"><Instagram size={20} /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-terra transition-colors"><span className="font-bold text-xs">Tik</span></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-6 text-white">Khám Phá</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#about" className="hover:text-terra transition-colors">Câu chuyện Eden</a></li>
                <li><a href="#rooms" className="hover:text-terra transition-colors">Hạng phòng</a></li>
                <li><a href="#blog" className="hover:text-terra transition-colors">Blog du lịch</a></li>
                <li><a href="#booking" className="hover:text-terra transition-colors">Chính sách</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xl font-serif font-bold mb-6 text-white">Liên Hệ</h4>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start">
                  <MapPin size={20} className="mr-3 text-terra flex-shrink-0" />
                  <span>24 Trương Công Định, Phường 3, TP. Vũng Tàu</span>
                </li>
                <li className="flex items-center">
                  <Phone size={20} className="mr-3 text-terra flex-shrink-0" />
                  <span>+84 868 461 939</span>
                </li>
                <li className="flex items-center">
                  <Mail size={20} className="mr-3 text-terra flex-shrink-0" />
                  <span>edenhomevt@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div className="h-64 rounded-xl overflow-hidden bg-gray-200">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.634629948408!2d107.0782672!3d10.3524671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31756fd43292451f%3A0x6731110022375939!2zMjQgVHLGsMahbmcgQ8O0bmcgxJDhu4tuaCwgUGjGsOG7nW5nIDMsIFRow6BuaCBwaOG7kSBWxaluZyBUw6B1!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 text-center text-white/40 text-sm">
            <p>&copy; {new Date().getFullYear()} Eden Home Vũng Tàu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;