<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title data-translate="track.title">Lacak Pengaduan - Sapa Warga</title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <link rel="shortcut icon" href="{{asset('public/assets/images/demak.png')}}">

  <link href="{{asset('public/assets/images/demak.png')}}" rel="apple-touch-icon">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/bootstrap/css/bootstrap.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/icofont/icofont.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/boxicons/css/boxicons.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/owl.carousel/assets/owl.carousel.min.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/venobox/venobox.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/vendor/aos/aos.css')}}" rel="stylesheet">
  <link href="{{asset('frontend/assets/css/style.css')}}" rel="stylesheet">
  <style>
    * { font-family: 'Poppins', sans-serif; }
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
          <li><a href="{{url('/')}}" data-translate="nav.home">Home</a></li>
          <li><a href="{{url('/')}}#procedures" data-translate="nav.procedures">Procedures</a></li>
          <li class="active"><a href="{{url('track-complaint')}}" data-translate="nav.track">Track Complaint</a></li>
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
      <h1 data-translate="track.hero_title">Lacak Status Pengaduan</h1>
      <h2 data-translate="track.hero_subtitle">Masukkan NIK Anda untuk melihat progres pengaduan</h2>
    </div>
  </section><!-- End Hero -->

  <!-- ======= Search Section ======= -->
  <section id="search" class="search-section">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card shadow-sm" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
            <div class="card-body p-5">
              <h3 class="text-center mb-4" style="font-weight: 700; color: #1a1a2e;" data-translate="track.search_title">Cari Pengaduan</h3>
              
              <form action="{{url('search-complaint')}}" method="POST">
                @csrf
                <div class="form-group">
                  <label for="nik" data-translate="track.nik_label">Nomor Induk Kependudukan (NIK)</label>
                  <input type="text" class="form-control" id="nik" name="nik" placeholder="Masukkan NIK Anda" data-translate="track.nik_placeholder" required>
                  @if($errors->has('nik'))
                    <small class="text-danger">{{ $errors->first('nik') }}</small>
                  @endif
                </div>
                
                <div class="text-center mt-4">
                  <button type="submit" class="btn btn-primary btn-lg" style="border-radius: 50px; padding: 12px 40px; font-weight: 500; font-size: 15px; background: #029058; border-color: #029058; box-shadow: 0 4px 15px rgba(2,144,88,0.3);" data-translate="track.search_button">Cari Pengaduan</button>
                </div>
              </form>
              
              <div class="mt-4">
                <div class="alert" style="background: rgba(2, 144, 88, 0.08); border: 1px solid rgba(2, 144, 88, 0.2); border-radius: 12px; color: #333;">
                  <i class="icofont-info-circle" style="color: #029058;"></i> 
                  <strong data-translate="track.info_title">Informasi:</strong> 
                  <span data-translate="track.info_text">Masukkan NIK yang Anda gunakan saat membuat pengaduan untuk melihat statusnya.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section><!-- End Search Section -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    
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
        
        // Halaman lacak pengaduan
        "track.title": "Lacak Pengaduan - Layanan Pengaduan Masyarakat Online",
        "track.hero_title": "Lacak Status Pengaduan",
        "track.hero_subtitle": "Masukkan NIK Anda untuk melihat progres pengaduan",
        "track.search_title": "Cari Pengaduan",
        "track.nik_label": "Nomor Induk Kependudukan (NIK)",
        "track.nik_placeholder": "Masukkan NIK Anda",
        "track.search_button": "Cari Pengaduan",
        "track.info_title": "Informasi:",
        "track.info_text": "Masukkan NIK yang Anda gunakan saat membuat pengaduan untuk melihat statusnya.",
        
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
        
        // Track complaint page
        "track.title": "Track Complaint - Online Public Complaint Service",
        "track.hero_title": "Track Complaint Status",
        "track.hero_subtitle": "Enter your NIK to view complaint progress",
        "track.search_title": "Search Complaint",
        "track.nik_label": "Population Identification Number (NIK)",
        "track.nik_placeholder": "Enter your NIK",
        "track.search_button": "Search Complaint",
        "track.info_title": "Information:",
        "track.info_text": "Enter the NIK you used when making a complaint to view its status.",
        
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
      
      // Perbarui atribut lang pada tag html
      document.documentElement.lang = lang;
      
      // Terapkan terjemahan ke semua elemen dengan atribut data-translate
      document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang][key]) {
          if (element.hasAttribute('placeholder') || element.hasAttribute('title') || element.hasAttribute('alt')) {
            // Untuk atribut selain teks
            element.setAttribute('data-translate', key);
            element[element.hasAttribute('placeholder') ? 'placeholder' : 
                   element.hasAttribute('title') ? 'title' : 'alt'] = translations[lang][key];
          } else {
            // Untuk teks biasa
            element.textContent = translations[lang][key];
          }
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