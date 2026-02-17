
<!doctype html>
<html lang="en">
<head>
        <meta charset="utf-8" />
        <title>@yield('title')</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Sapa Warga - Kecamatan Kebonagung" name="description" />
        <meta content="Sapa Warga" name="author" />
        <link rel="shortcut icon" href="{{asset('assets/images/demak.png')}}">
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500&display=swap" rel="stylesheet">
        <link href="{{asset('assets/css/bootstrap.min.css')}}" id="bootstrap-style" rel="stylesheet" type="text/css" />
        <link href="{{asset('assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
        <link href="{{asset('assets/css/app.min.css')}}" id="app-style" rel="stylesheet" type="text/css" />
        <style>
            * { font-family: 'Poppins', sans-serif; }
            .card { border-radius: 16px !important; border: 1px solid rgba(0,0,0,0.04) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.06) !important; }
            .btn { border-radius: 12px; font-weight: 500; }
            .btn-success { background: #029058; border-color: #029058; border-radius: 50px; padding: 10px 28px; box-shadow: 0 4px 15px rgba(2, 144, 88, 0.3); }
            .btn-success:hover { background: #027a4a; border-color: #027a4a; }
            .form-control { border-radius: 12px !important; border: 1px solid #e0e0e0 !important; }
            .form-control:focus { border-color: #029058 !important; box-shadow: 0 0 0 3px rgba(2, 144, 88, 0.1) !important; }
            .page-title-box h4 { font-weight: 700; color: #1a1a2e; }
            .breadcrumb-item { font-size: 13px; }
            .navbar-header { background: #029058; }
            .topnav { border-radius: 0; }
            .dropdown-menu { border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); border: 1px solid rgba(0,0,0,0.04); }
            .dropdown-item { border-radius: 8px; margin: 2px 6px; padding: 8px 12px; font-size: 14px; }
            .dropdown-item:hover { background: rgba(2, 144, 88, 0.08); color: #029058; }
        </style>
        @yield('css')
    </head>
    <body data-topbar="dark" data-layout="horizontal">
        <div id="layout-wrapper">

            <header id="page-topbar">
                <div class="navbar-header">
                    <div class="d-flex">
                        <div class="navbar-brand-box">
                            <a href="index.html" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="{{asset('assets/images/logo.svg')}}" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="{{asset('assets/images/logo-dark.png')}}" alt="" height="17">
                                </span>
                            </a>

                            <a href="{{url('user/home')}}" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="{{asset('assets/images/logo-light.svg')}}" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="{{asset('assets/images/kecamatan.png')}}" alt="" height="19">
                                </span>
                            </a>
                        </div>

                        <button type="button" class="btn btn-sm px-3 font-size-16 d-lg-none header-item waves-effect waves-light" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                            <i class="fa fa-fw fa-bars"></i>
                        </button>

                    </div>

                    <div class="d-flex">

                        <div class="dropdown d-inline-block d-lg-none ml-2">
                            <button type="button" class="btn header-item noti-icon waves-effect" id="page-header-search-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="mdi mdi-magnify"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-search-dropdown">
                    
                                <form class="p-3">
                                    <div class="form-group m-0">
                                        <div class="input-group">
                                            <input type="text" class="form-control" placeholder="Search ..." aria-label="Search input">
                                
                                            <button class="btn btn-primary" type="submit"><i class="mdi mdi-magnify"></i></button>s
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>



                        <div class="dropdown d-none d-lg-inline-block ml-1">
                            <button type="button" class="btn header-item noti-icon waves-effect" data-toggle="fullscreen">
                                <i class="bx bx-fullscreen"></i>
                            </button>
                        </div>



                        <div class="dropdown d-inline-block">
                            <button type="button" class="btn header-item waves-effect" id="page-header-user-dropdown"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img class="rounded-circle header-profile-user" src="{{url('avatar_society/',Session::get('photo'))}}"
                                    alt="Header Avatar">
                                <span class="d-none d-xl-inline-block ms-1" key="t-henry">{{Session::get('name')}}</span>
                                <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-danger" href="{{route('user_logout')}}"><i class="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i> <span key="t-logout">Logout</span></a>
                            </div>
                        </div>

                       
            
                    </div>
                </div>
            </header>
    
            <div class="topnav">
                <div class="container-fluid">
                    <nav class="navbar navbar-light navbar-expand-lg topnav-menu">

                        <div class="collapse navbar-collapse" id="topnav-menu-content">
                            <ul class="navbar-nav">

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-dashboard" role="button"
                                    >
                                        <i class="bx bx-home-circle me-2"></i><span key="t-dashboards">Dashboards</span> <div class="arrow-down"></div>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="topnav-dashboard">

                                        <a href="{{url('user/home')}}" class="dropdown-item" key="t-default">Default</a>
                                        
                                    </div>
                                </li>

                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button"
                                    >
                                        <i class="bx bx-customize me-2"></i><span key="t-apps">Pengaduan</span> <div class="arrow-down"></div>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="topnav-pages">

                                        <a href="{{route('complaint')}}" class="dropdown-item" key="t-calendar">Daftar Pengaduan</a>

                                    </div>
                                </li>
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none" href="#" id="topnav-pages" role="button"
                                    >
                                        <i class="bx bx-customize me-2"></i><span key="t-apps">Buat Pengaduan</span> <div class="arrow-down"></div>
                                    </a>
                                    <div class="dropdown-menu" aria-labelledby="topnav-pages">

                                        <a href="{{route('add_complaint')}}" class="dropdown-item" key="t-calendar">Buat Pengaduan</a>

                                    </div>
                                </li>



                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div class="main-content">
               @yield('content')
                <footer class="footer">
                
                            
                </footer>
            </div>
        </div>
        <div class="rightbar-overlay"></div>
        <script src="{{asset('assets/libs/jquery/jquery.min.js')}}"></script>
        <script src="{{asset('assets/libs/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('assets/libs/metismenu/metisMenu.min.js')}}"></script>
        <script src="{{asset('assets/libs/simplebar/simplebar.min.js')}}"></script>
        <script src="{{asset('assets/libs/node-waves/waves.min.js')}}"></script>
        <script src="{{asset('assets/libs/apexcharts/apexcharts.min.js')}}"></script>
        <script src="{{asset('assets/js/pages/dashboard.init.js')}}"></script>
        <script src="{{asset('assets/js/app.js')}}"></script>
    </body>
    @stack('script')
</html>
