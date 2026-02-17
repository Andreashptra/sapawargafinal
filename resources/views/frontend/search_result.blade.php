<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">
  <title data-translate="search_result.title">Hasil Pencarian - Online Public Complaint Service</title>
  <meta content="" name="description">
  <meta content="" name="keywords">
  <link rel="shortcut icon" href="{{asset('assets/images/favicon.ico')}}">

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
      <h1 data-translate="search_result.hero_title">Hasil Pencarian Pengaduan</h1>
      <h2 data-translate="search_result.hero_subtitle">Status pengaduan untuk NIK: {{ $search_nik }}</h2>
    </div>
  </section><!-- End Hero -->

  <!-- ======= Results Section ======= -->
  <section id="results" class="search-section">
    <div class="container" data-aos="fade-up">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card shadow-sm" style="border-radius: 16px; border: 1px solid rgba(0,0,0,0.04);">
            <div class="card-body p-5">
              
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 data-translate="search_result.list_title">Daftar Pengaduan</h3>
                <a href="{{url('track-complaint')}}" class="btn btn-outline-primary">
                  <i class="icofont-refresh"></i> <span data-translate="search_result.search_again">Cari Lagi</span>
                </a>
              </div>
              
              @if(count($complaints) > 0)
                <div class="alert alert-success" data-translate="search_result.found_complaints">
                  Ditemukan {{ count($complaints) }} pengaduan untuk NIK ini.
                </div>
                
                @foreach($complaints as $complaint)
                <div class="card complaint-card mb-4">
                  <div class="card-body">
                    <!-- Informasi Pengadu -->
                    <div class="user-info">
                      @if($complaint->society && $complaint->society->photo)
                        <img src="{{ url('avatar_society/'.$complaint->society->photo) }}" class="user-avatar" alt="Foto Profil">
                      @else
                        <div class="user-avatar bg-secondary text-white d-flex align-items-center justify-content-center">
                          <i class="icofont-user"></i>
                        </div>
                      @endif
                      <div class="user-details">
                        <div class="user-name">
                          @if($complaint->society)
                            {{ $complaint->society->name }}
                          @else
                            <span class="text-muted" data-translate="search_result.complainant_not_found">Data pengadu tidak ditemukan</span>
                          @endif
                        </div>
                        <div class="user-nik">
                          NIK: {{ $complaint->nik }}
                        </div>
                      </div>
                      <span class="status-badge 
                        @if($complaint->status == '0') status-unprocess
                        @elseif($complaint->status == 'process') status-process
                        @else status-finished @endif">
                        @if($complaint->status == '0') 
                          <span data-translate="search_result.status_waiting">Menunggu</span>
                        @elseif($complaint->status == 'process') 
                          <span data-translate="search_result.status_process">Diproses</span>
                        @else 
                          <span data-translate="search_result.status_finished">Selesai</span> 
                        @endif
                      </span>
                    </div>
                    
                    <div class="row mt-3">
                      <div class="col-md-3">
                        <img src="{{ url('avatar_complaint/'.$complaint->photo) }}" class="img-fluid rounded" alt="Bukti Pengaduan">
                      </div>
                      <div class="col-md-9">
                        <p class="text-muted">
                          <i class="icofont-calendar"></i> 
                          <span data-translate="search_result.submitted_on">Diajukan pada:</span> {{ date('d F Y', strtotime($complaint->created_at)) }}
                        </p>
                        
                        <p><strong data-translate="search_result.complaint_content">Isi Pengaduan:</strong> {{ $complaint->contents_of_the_report }}</p>
                        
                        <div class="mt-3">
                          <strong data-translate="search_result.response">Tanggapan:</strong>
                          <p class="mt-1 alert 
                            @if($complaint->response && $complaint->response->response) alert-info 
                            @else alert-warning @endif">
                            @if($complaint->response && $complaint->response->response)
                              {{ $complaint->response->response }}
                              <br>
                              <small class="text-muted">
                                <span data-translate="search_result.responded_on">Ditanggapi pada:</span> {{ date('d F Y H:i', strtotime($complaint->response->updated_at)) }}
                              </small>
                            @else
                              <span class="text-muted" data-translate="search_result.no_response">Belum ada tanggapan</span>
                            @endif
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                @endforeach
                
              @else
                <div class="alert alert-warning text-center">
                  <i class="icofont-info-circle" style="font-size: 48px;"></i>
                  <h4 class="mt-3" data-translate="search_result.no_complaints_found">Tidak Ditemukan Pengaduan</h4>
                  <p data-translate="search_result.no_complaints_text">
                    Tidak ada pengaduan yang ditemukan untuk NIK: <strong>{{ $search_nik }}</strong>
                  </p>
                  <p data-translate="search_result.ensure_nik_text">
                    Pastikan NIK yang Anda masukkan benar atau hubungi admin jika Anda yakin sudah membuat pengaduan.
                  </p>
                  <a href="{{url('track-complaint')}}" class="btn btn-primary mt-2" data-translate="search_result.try_again">Coba Lagi</a>
                </div>
              @endif
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section><!-- End Results Section -->

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
        
        // Halaman hasil pencarian
        "search_result.title": "Hasil Pencarian - Layanan Pengaduan Masyarakat Online",
        "search_result.hero_title": "Hasil Pencarian Pengaduan",
        "search_result.hero_subtitle": "Status pengaduan untuk NIK: {{ $search_nik }}",
        "search_result.list_title": "Daftar Pengaduan",
        "search_result.search_again": "Cari Lagi",
        "search_result.found_complaints": "Ditemukan {{ count($complaints) }} pengaduan untuk NIK ini.",
        "search_result.complainant_not_found": "Data pengadu tidak ditemukan",
        "search_result.status_waiting": "Menunggu",
        "search_result.status_process": "Diproses",
        "search_result.status_finished": "Selesai",
        "search_result.submitted_on": "Diajukan pada",
        "search_result.complaint_content": "Isi Pengaduan",
        "search_result.response": "Tanggapan",
        "search_result.responded_on": "Ditanggapi pada",
        "search_result.no_response": "Belum ada tanggapan",
        "search_result.no_complaints_found": "Tidak Ditemukan Pengaduan",
        "search_result.no_complaints_text": "Tidak ada pengaduan yang ditemukan untuk NIK: {{ $search_nik }}",
        "search_result.ensure_nik_text": "Pastikan NIK yang Anda masukkan benar atau hubungi admin jika Anda yakin sudah membuat pengaduan.",
        "search_result.try_again": "Coba Lagi",
        
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
        
        // Search result page
        "search_result.title": "Search Result - Online Public Complaint Service",
        "search_result.hero_title": "Complaint Search Results",
        "search_result.hero_subtitle": "Complaint status for NIK: {{ $search_nik }}",
        "search_result.list_title": "List of Complaints",
        "search_result.search_again": "Search Again",
        "search_result.found_complaints": "Found {{ count($complaints) }} complaints for this NIK.",
        "search_result.complainant_not_found": "Complainant data not found",
        "search_result.status_waiting": "Waiting",
        "search_result.status_process": "In Process",
        "search_result.status_finished": "Finished",
        "search_result.submitted_on": "Submitted on",
        "search_result.complaint_content": "Complaint Content",
        "search_result.response": "Response",
        "search_result.responded_on": "Responded on",
        "search_result.no_response": "No response yet",
        "search_result.no_complaints_found": "No Complaints Found",
        "search_result.no_complaints_text": "No complaints found for NIK: {{ $search_nik }}",
        "search_result.ensure_nik_text": "Make sure the NIK you entered is correct or contact the admin if you are sure you have made a complaint.",
        "search_result.try_again": "Try Again",
        
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