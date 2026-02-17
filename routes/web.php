<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ComplaintController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\SocietyController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



// Auth::routes();
Route::get('/', [DashboardController::class, 'welcome']);
Route::post('/chatbot/send', [ChatbotController::class, 'send'])->name('chatbot.send');
Route::get('user/register', [FrontendController::class, 'register'])->name('user_register');
Route::post('user/register/save', [FrontendController::class, 'save']);
Route::get('user/login', [FrontendController::class, 'login'])->name('user_login');
Route::post('user/login/cek', [FrontendController::class, 'postlogin'])->name('postlogin');
Route::get('user/logout', [FrontendController::class, 'logout'])->name('user_logout');

Route::get('user/home', [FrontendController::class, 'home'])->name('user_home');
Route::get('user/complaint/add', [FrontendController::class, 'add_complaint'])->name('add_complaint');
Route::post('user/complaint/save', [FrontendController::class, 'save_complaint'])->name('save_complaint');
Route::get('user/complaint', [FrontendController::class, 'complaint'])->name('complaint');
Route::get('user/complaint/detail/{id}', [FrontendController::class, 'detail_complaint'])->name('detail_complaint');
Route::get('track-complaint', [FrontendController::class, 'track_complaint'])->name('track_complaint');
Route::post('search-complaint', [FrontendController::class, 'search_complaint'])->name('search_complaint');
Route::get('admin/login', [LoginController::class, 'showFormLogin'])->name('login');
Route::post('admin/login', [LoginController::class, 'login']);
Route::get('logout', [LoginController::class, 'logout'])->name('logoutt');
Route::group(['middleware' => ['auth', 'checkRole:1'], 'prefix' => 'admin'], function () {
    Route::resource('dashboard', DashboardController::class);
    Route::resource('users', UsersController::class);
    Route::get('users/delete/{id}', [UsersController::class, 'destroy']);
    Route::get('users/edit/{id}', [UsersController::class, 'edit']);
    Route::post('users/update/{id}', [UsersController::class, 'update']);
    Route::delete('users/selected-users', [UsersController::class, 'deleteCheckedStudents'])->name('users.deleteSelected');
    Route::resource('society', SocietyController::class);
    Route::get('society/delete/{id}', [SocietyController::class, 'destroy']);
    Route::get('society/edit/{id}', [SocietyController::class, 'edit']);
    Route::post('society/update/{id}', [SocietyController::class, 'update']);
    Route::resource('complaints', ComplaintController::class);
    Route::get('complaints/{id}', [ComplaintController::class, 'detail']);
    Route::get('complaints/show/{id}', [ResponseController::class, 'show']);
    Route::post('complaints/save/{id}', [ResponseController::class, 'save']);

    Route::get('report/day', [ReportController::class, 'day']);
    Route::get('report/day/search', [ReportController::class, 'day_search']);
    Route::get('report/day/cetakpdf', [ReportController::class, 'day_pdf']);
});

Route::group(['middleware' => ['auth', 'checkRole:1,2'], 'prefix' => 'admin'], function () {
    Route::resource('dashboard', DashboardController::class);
    Route::resource('complaints', ComplaintController::class);
    Route::get('complaints/{id}', [ComplaintController::class, 'detail']);
    Route::get('complaints/show/{id}', [ResponseController::class, 'show']);
    Route::post('complaints/save/{id}', [ResponseController::class, 'save']);
});
// Route::get('/home', 'HomeController@index')->name('home');
