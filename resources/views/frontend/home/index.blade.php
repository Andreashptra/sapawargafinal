<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title>Sapa Warga</title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <link rel="shortcut icon" href="{{asset('assets/images/demak.png')}}">

  <link href="{{asset('frontend/assets/img/apple-touch-icon.png')}}" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/icofont/icofont.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/owl.carousel/assets/owl.carousel.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/venobox/venobox.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/aos/aos.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/css/style.css')}}" rel="stylesheet">
    <style>
    * {
      font-family: 'Poppins', sans-serif;
    }
    .search-section {
      padding: 70px 0;
      background: #f5f7fa;
    }
    .status-badge {
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 600;
    }
    .status-unprocess {
      background-color: rgba(255, 193, 7, 0.15);
      color: #d4a017;
    }
    .status-process {
      background-color: rgba(23, 162, 184, 0.15);
      color: #17a2b8;
    }
    .status-finished {
      background-color: rgba(40, 167, 69, 0.15);
      color: #28a745;
    }
    .complaint-card {
      transition: all 0.4s ease;
      border-radius: 16px;
      border: 1px solid rgba(0,0,0,0.04);
    }
    .complaint-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.08);
    }
    .user-info {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
    }
    .user-avatar {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      margin-right: 12px;
      object-fit: cover;
      border: 2px solid rgba(2, 144, 88, 0.2);
    }
    .user-details {
      flex: 1;
    }
    .user-name {
      font-weight: 600;
      margin-bottom: 2px;
      color: #1a1a2e;
    }
    .user-nik {
      font-size: 12px;
      color: #999;
    }
    /* Language Switcher Styles */
    .language-switcher {
      position: relative;
      display: inline-block;
      margin-left: 15px;
    }
    .language-btn {
      background: rgba(255,255,255,0.2);
      color: white;
      border: 1px solid rgba(255,255,255,0.3);
      padding: 6px 16px;
      border-radius: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      font-weight: 500;
      transition: all 0.3s;
    }
    .language-btn:hover {
      background: rgba(255,255,255,0.3);
    }
    .language-btn i {
      font-size: 14px;
    }
    .language-options {
      display: none;
      position: absolute;
      background-color: white;
      min-width: 140px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.12);
      z-index: 1;
      border-radius: 12px;
      overflow: hidden;
      right: 0;
      margin-top: 8px;
    }
    .language-option {
      color: #333;
      padding: 10px 18px;
      text-decoration: none;
      display: block;
      cursor: pointer;
      transition: background-color 0.3s;
      font-size: 14px;
    }
    .language-option:hover {
      background-color: rgba(2, 144, 88, 0.08);
      color: #029058;
    }
    .language-switcher:hover .language-options {
      display: block;
    }

    /* Footer Modern Style */
    .footer {
      background: #1a1a2e;
      padding: 50px 0 30px;
      color: #ccc;
    }
    .footer h4 {
      color: #fff;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 25px;
    }
    .footer .social-links {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
    .footer .social-links a {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 24px;
      border-radius: 50px;
      color: #fff;
      background: rgba(255,255,255,0.08);
      border: 1px solid rgba(255,255,255,0.1);
      transition: all 0.3s;
      text-decoration: none;
      font-size: 14px;
    }
    .footer .social-links a:hover {
      background: #029058;
      border-color: #029058;
      transform: translateY(-2px);
    }
  </style>
</head>

<body>

  <!-- ======= Top Bar ======= -->
   <div id="topbar" class="d-none d-lg-flex align-items-center fixed-top">
    <div class="container d-flex align-items-center">
      <div class="contact-info mr-auto d-flex align-items-center">
        <img src="{{asset('assets/images/demak.png')}}" alt="Logo" style="height: 32px; margin-right: 12px;">
        <span style="font-weight: 600; color: white; font-size: 14px; letter-spacing: 0.3px;">Kecamatan Kebonagung</span>
      </div>
    
      <!-- Language Switcher -->
      <div class="language-switcher ms-3">
        <button class="language-btn" id="currentLanguage">
          <i class="icofont-globe"></i> ID
        </button>
        <div class="language-options">
          <div class="language-option" data-lang="id">Indonesia (ID)</div>
          <div class="language-option" data-lang="en">English (EN)</div>
        </div>
      </div>
    </div>
  </div>


  <!-- ======= Header ======= -->
  <header id="header" class="fixed-top">
    <div class="container d-flex align-items-center">

      <h1 class="logo mr-auto"><a href="{{url('/')}}">Sapa Warga</a></h1>

      <nav class="nav-menu d-none d-lg-block">
        <ul>
          <li class="active"><a href="{{url('/')}}" data-translate="nav.home">Home</a></li>
          <li><a href="#procedures" data-translate="nav.procedures">Procedures</a></li>
          <li><a href="{{url('track-complaint')}}" data-translate="nav.track">Track Complaint</a></li>
          @if(Session::get('nik') == NULL)
          <li><a href="{{url('user/login')}}" data-translate="nav.login">Login</a></li>
          <li><a href="{{url('user/register')}}" data-translate="nav.register" style="background: #029058; color: #fff !important; padding: 8px 24px; border-radius: 50px;">Register</a></li>
          @endif
        </ul>
      </nav><!-- .nav-menu -->

    </div>
  </header><!-- End Header -->

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex align-items-center">
    <div class="container" data-aos="zoom-out" data-aos-delay="100">
      <h1><span data-translate="hero.title" style="font-style: italic; font-weight: 400; color: #029058;">Layanan Pengaduan</span> <br>Masyarakat Online</h1>
      <h2 data-translate="hero.subtitle">Drop your problem report here, we'll process it quickly.</h2>
      @if(Session::get('nik') != NULL)
      <div class="d-flex justify-content-center">
        <a href="{{url('user/complaint/add')}}" class="btn-get-started scrollto" data-translate="hero.report_button"><i class="bx bx-edit"></i> Report</a>
      </div>
      @endif
    </div>
  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= Featured Services Section ======= -->
    <section id="procedures" class="featured-services" style="background: #f5f7fa;">
      <div class="container" data-aos="fade-up">
        <div class="text-center mb-5">
          <span style="display: inline-block; padding: 6px 20px; background: rgba(2,144,88,0.1); color: #029058; border-radius: 50px; font-size: 13px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase;" data-translate="nav.procedures">Procedures</span>
          <h3 style="margin-top: 20px; font-size: 32px; font-weight: 700; color: #1a1a2e;">Prosedur Pengaduan</h3>
        </div>
        <div class="row">
          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box" data-aos="fade-up" data-aos-delay="100">
              <div class="icon"><i class="bx bx-edit"></i></div>
              <h4 class="title"><a href="" data-translate="procedure.step1.title">1. Write a Report</a></h4>
              <p class="description" data-translate="procedure.step1.desc">Write your complaint report clearly.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box" data-aos="fade-up" data-aos-delay="200">
              <div class="icon"><i class="bx bx-search-alt"></i></div>
              <h4 class="title"><a href="" data-translate="procedure.step2.title">2. Verification Process</a></h4>
              <p class="description" data-translate="procedure.step2.desc">Wait until your report is verified.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box" data-aos="fade-up" data-aos-delay="300">
              <div class="icon"><i class="bx bx-loader-circle"></i></div>
              <h4 class="title"><a href="" data-translate="procedure.step3.title">3. Follow up</a></h4>
              <p class="description" data-translate="procedure.step3.desc">Your report is being followed up.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box" data-aos="fade-up" data-aos-delay="400">
              <div class="icon"><i class="bx bx-check-shield"></i></div>
              <h4 class="title"><a href="" data-translate="procedure.step4.title">4. Done</a></h4>
              <p class="description" data-translate="procedure.step4.desc">The complaint report has been prosecuted.</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Featured Services Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer class="footer">
    <div class="container text-center">
      <div class="mb-4">
        <img src="{{asset('assets/images/demak.png')}}" alt="Logo" style="height: 50px; margin-bottom: 15px;">
        <h4>Sapa Warga - Kecamatan Kebonagung</h4>
        <p style="color: #999; font-size: 14px; max-width: 500px; margin: 0 auto;">Layanan pengaduan masyarakat online untuk Kecamatan Kebonagung, Kabupaten Demak.</p>
      </div>
      <h5 style="color: #fff; font-size: 15px; font-weight: 600; margin-bottom: 20px;">Follow Us</h5>
      <div class="social-links">
        <a href="https://www.instagram.com" target="_blank"><i class="icofont-instagram"></i> Instagram</a>
        <a href="https://www.youtube.com" target="_blank"><i class="icofont-youtube"></i> YouTube</a>
        <a href="https://www.tiktok.com" target="_blank"><i class="icofont-tiktok"></i> TikTok</a>
      </div>
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); color: #777; font-size: 13px;">
        &copy; {{ date('Y') }} Sapa Warga. All Rights Reserved.
      </div>
    </div>
  </footer><!-- End Footer -->

  <div id="preloader"></div>
  <a href="#" class="back-to-top"><i class="icofont-simple-up"></i></a>

  <!-- Vendor JS Files -->
  <script src="{{asset('frontend/assets/vendor/jquery/jquery.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/jquery.easing/jquery.easing.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/php-email-form/validate.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/waypoints/jquery.waypoints.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/counterup/counterup.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/owl.carousel/owl.carousel.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/isotope-layout/isotope.pkgd.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/venobox/venobox.min.js')}}"></script>
  <script src="{{asset('frontend/assets/vendor/aos/aos.js')}}"></script>
  <script src="{{asset('frontend/assets/js/main.js')}}"></script>
  
  <!-- Translation Script -->
  <script>
    // Data terjemahan
    const translations = {
      id: {
        // Navigasi
        "nav.home": "Beranda",
        "nav.procedures": "Prosedur",
        "nav.track": "Lacak Pengaduan",
        "nav.login": "Masuk",
        "nav.register": "Daftar",
        
        // Hero section
        "hero.title": "Layanan Pengaduan Masyarakat Online",
        "hero.subtitle": "Laporkan masalah Anda di sini, kami akan memprosesnya dengan cepat.",
        "hero.report_button": "Lapor",
        
        // Procedures
        "procedure.step1.title": "1. Tulis Laporan",
        "procedure.step1.desc": "Tulis laporan pengaduan Anda dengan jelas.",
        "procedure.step2.title": "2. Proses Verifikasi",
        "procedure.step2.desc": "Tunggu hingga laporan Anda diverifikasi.",
        "procedure.step3.title": "3. Tindak Lanjut",
        "procedure.step3.desc": "Laporan Anda sedang ditindaklanjuti.",
        "procedure.step4.title": "4. Selesai",
        "procedure.step4.desc": "Laporan pengaduan telah ditindaklanjuti.",
        
        // Footer
        "footer.copyright": "Hak Cipta",
        "footer.rights": "Semua Hak Dilindungi",
        "footer.designed": "Dirancang oleh",
      },
      en: {
        // Navigasi (default)
        "nav.home": "Home",
        "nav.procedures": "Procedures",
        "nav.track": "Track Complaint",
        "nav.login": "Login",
        "nav.register": "Register",
        
        // Hero section
        "hero.title": "Online Public Complaint Service",
        "hero.subtitle": "Drop your problem report here, we'll process it quickly.",
        "hero.report_button": "Report",
        
        // Procedures
        "procedure.step1.title": "1. Write a Report",
        "procedure.step1.desc": "Write your complaint report clearly.",
        "procedure.step2.title": "2. Verification Process",
        "procedure.step2.desc": "Wait until your report is verified.",
        "procedure.step3.title": "3. Follow up",
        "procedure.step3.desc": "Your report is being followed up.",
        "procedure.step4.title": "4. Done",
        "procedure.step4.desc": "The complaint report has been prosecuted.",
        
        // Footer
        "footer.copyright": "Copyright",
        "footer.rights": "All Rights Reserved",
        "footer.designed": "Designed by",
      }
    };

    // Fungsi untuk mengubah bahasa
    function changeLanguage(lang) {
      // Simpan preferensi bahasa di localStorage
      localStorage.setItem('preferredLanguage', lang);
      
      // Perbarui tombol bahasa
      document.getElementById('currentLanguage').innerHTML = `<i class="icofont-globe"></i> ${lang.toUpperCase()}`;
      
      // Terapkan terjemahan ke semua elemen dengan atribut data-translate
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      });
    }

    // Event listener untuk tombol bahasa
    document.addEventListener('DOMContentLoaded', function() {
      // Cek preferensi bahasa yang disimpan
      const savedLanguage = localStorage.getItem('preferredLanguage') || 'id';
      
      // Terapkan bahasa yang dipilih
      changeLanguage(savedLanguage);
      
      // Tambahkan event listener untuk opsi bahasa
      document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function() {
          const lang = this.getAttribute('data-lang');
          changeLanguage(lang);
        });
      });
    });
  </script>

  @include('components.chatbot')
</body>
</html>