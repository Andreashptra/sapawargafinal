<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Login | Sapa Warga Layanan Aduan</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" />
    <meta name="author" />
    <link rel="shortcut icon" href="{{asset('assets/images/demak.png')}}">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap" rel="stylesheet">
    <link href="{{asset('assets/css/bootstrap.min.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
    <link href="{{asset('assets/css/app.min.css')}}" id="app-style" rel="stylesheet" type="text/css" />
    <style>
        * { font-family: 'Poppins', sans-serif; }
        .language-switcher {
            position: relative;
            display: inline-block;
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
        .language-container {
            position: absolute;
            top: 20px;
            right: 20px;
        }
        .card {
            border-radius: 20px !important;
            border: none !important;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1) !important;
            overflow: hidden;
        }
        .form-control {
            border-radius: 12px !important;
            padding: 10px 16px !important;
            border: 1px solid #e0e0e0 !important;
            font-size: 14px !important;
        }
        .form-control:focus {
            border-color: #029058 !important;
            box-shadow: 0 0 0 3px rgba(2, 144, 88, 0.1) !important;
        }
        .btn-primary {
            border-radius: 50px !important;
            padding: 12px 30px !important;
            font-weight: 500 !important;
            font-size: 15px !important;
            background: #029058 !important;
            border-color: #029058 !important;
            box-shadow: 0 4px 15px rgba(2, 144, 88, 0.3) !important;
            transition: all 0.3s !important;
        }
        .btn-primary:hover {
            background: #027a4a !important;
            transform: translateY(-1px);
            box-shadow: 0 6px 20px rgba(2, 144, 88, 0.4) !important;
        }
        .auth-pass-inputgroup .btn {
            border-radius: 0 12px 12px 0 !important;
        }
        .auth-pass-inputgroup .form-control {
            border-radius: 12px 0 0 12px !important;
        }
    </style>
</head>
<body style="background: linear-gradient(135deg, #029058 0%, #016e43 100%); min-height: 100vh;">
    <!-- Language Switcher -->
    <div class="language-container">
        <div class="language-switcher">
            <button class="language-btn" id="currentLanguage">
                <i class="mdi mdi-earth"></i> ID
            </button>
            <div class="language-options">
                <div class="language-option" data-lang="id">Indonesia (ID)</div>
                <div class="language-option" data-lang="en">English (EN)</div>
            </div>
        </div>
    </div>

    <div class="account-pages my-5 pt-sm-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-8 col-lg-6 col-xl-5">
                    <div class="card overflow-hidden">
                        <div class="bg-primary bg-soft">
                            <div class="row">
                                <div class="col-7">
                                    <div class="text-primary p-4">
                                        <h5 class="text-primary" data-translate="login.title">Login !</h5>
                                        <p data-translate="login.subtitle">Login to proceed to the Public Complaints application.</p>
                                    </div>
                                </div>
                                <div class="col-5 align-self-end">
                                    <img src="{{asset('assets/images/profile-img.png')}}" alt="" class="img-fluid">
                                </div>
                            </div>
                        </div>
                        <div class="card-body pt-0"> 
                            <div class="auth-logo">
                                <a href="#" class="auth-logo-light">
                                    <div class="avatar-md profile-user-wid mb-4">
                                        <span class="avatar-title rounded-circle bg-light">
                                            <img src="{{asset('assets/images/demak.png')}}" alt="" class="rounded-circle" height="34">
                                        </span>
                                    </div>
                                </a>

                                <a href="#" class="auth-logo-dark">
                                    <div class="avatar-md profile-user-wid mb-4">
                                    
                                            <img src="{{asset('assets/images/demak.png')}}" alt="" height="75">
                                    </div>
                                </a>
                            </div>
                            @if ($errors->any())
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            @endif
                            @if ($message = Session::get('error'))
                            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                {{$message}}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            @endif
                            @if ($message = Session::get('success'))
                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                {{$message}}
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                            @endif
                            <div class="p-2">
                                <form class="form-horizontal" action="{{url('user/login/cek')}}" method="POST">
                                    @csrf
                                    
                                    <div class="mb-3">
                                        <label for="username" class="form-label" data-translate="login.username">Username</label>
                                        <input type="text" class="form-control" name="username" id="username" data-translate-placeholder="login.username_placeholder" placeholder="Enter Username">
                                    </div>
                                    <div class="mb-3">
                                        <label class="form-label" for="password" data-translate="login.password">Password</label>
                                        <div class="input-group auth-pass-inputgroup">
                                            <input type="password" class="form-control" name="password" id="password" data-translate-placeholder="login.password_placeholder" placeholder="Enter password" aria-label="Password" aria-describedby="password-addon" autocomplete="current-password">
                                            <button class="btn btn-light " type="button" id="password-addon"><i class="mdi mdi-eye-outline"></i></button>
                                        </div>
                                    </div>
                                    
                                    <div class="mt-3 d-grid">
                                        <button class="btn btn-primary waves-effect waves-light" type="submit" data-translate="login.button">Login</button>
                                    </div>
                                    <div class="mt-4 text-center">
                                        <p data-translate="login.no_account">Don't have an account ?</p> <p><a href="{{url('user/register')}}" class="fw-medium text-primary" data-translate="login.signup_link"> Signup now </a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="mt-5 text-center">
                        <div>
                          
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="{{asset('assets/libs/jquery/jquery.min.js')}}"></script>
    <script src="{{asset('assets/libs/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('assets/libs/metismenu/metisMenu.min.js')}}"></script>
    <script src="{{asset('assets/libs/simplebar/simplebar.min.js')}}"></script>
    <script src="{{asset('assets/libs/node-waves/waves.min.js')}}"></script>
    <script src="{{asset('assets/js/app.js')}}"></script>
    <script src='https://www.google.com/recaptcha/api.js'></script>
    
    <!-- Translation Script -->
    <script>
        // Data terjemahan
        const translations = {
            id: {
                // Login page
                "login.title": "Masuk !",
                "login.subtitle": "Masuk untuk melanjutkan ke aplikasi Pengaduan Masyarakat.",
                "login.username": "Username",
                "login.username_placeholder": "Masukkan Username",
                "login.password": "Password",
                "login.password_placeholder": "Masukkan password",
                "login.button": "Masuk",
                "login.no_account": "Tidak punya akun ?",
                "login.signup_link": "Daftar sekarang",
                
                
            },
            en: {
                // Login page (default)
                "login.title": "Login !",
                "login.subtitle": "Login to proceed to the Public Complaints application.",
                "login.username": "Username",
                "login.username_placeholder": "Enter Username",
                "login.password": "Password",
                "login.password_placeholder": "Enter password",
                "login.button": "Login",
                "login.no_account": "Don't have an account ?",
                "login.signup_link": "Signup now",
                
                
            }
        };

        // Fungsi untuk mengubah bahasa
        function changeLanguage(lang) {
            // Simpan preferensi bahasa di localStorage
            localStorage.setItem('preferredLanguage', lang);
            
            // Perbarui tombol bahasa
            document.getElementById('currentLanguage').innerHTML = `<i class="mdi mdi-earth"></i> ${lang.toUpperCase()}`;
            
            // Terapkan terjemahan ke semua elemen dengan atribut data-translate
            document.querySelectorAll('[data-translate]').forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.innerHTML = translations[lang][key];
                }
            });
            
            // Terapkan terjemahan untuk placeholder
            document.querySelectorAll('[data-translate-placeholder]').forEach(element => {
                const key = element.getAttribute('data-translate-placeholder');
                if (translations[lang][key]) {
                    element.placeholder = translations[lang][key];
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
            
            // Auto-hide alerts
            window.setTimeout(function() {
                $(".alert").fadeTo(500, 0).slideUp(500, function(){
                    $(this).remove();
                });
            }, 2000);
        });    
    </script>
</body>
</html>