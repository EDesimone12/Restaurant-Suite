<%@ page import="model.Admin" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="model.Prenotazione" %>
<%@ page  contentType="text/html" pageEncoding="UTF-8" isErrorPage="true" %>
<!DOCTYPE html>
<html lang="it">

<head>
    <meta charset="UTF-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>404 - Restaurant Suite</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <!-- Favicons -->
    <link href="assets/img/chefIcon.ico" rel="icon">

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Poppins:300,300i,400,400i,600,600i,700,700i|Satisfy|Comic+Neue:300,300i,400,400i,700,700i" rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="assets/vendor/animate.css/animate.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
    <link href="assets/vendor/boxicons/css/boxicons.min.css" rel="stylesheet">
    <link href="assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet">
    <link href="assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="assets/css/style.css" rel="stylesheet">

</head>

<body>

<!-- ======= Top Bar ======= -->
<section id="topbar" class="d-flex align-items-center fixed-top ">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-center justify-content-lg-start">
        <i class="bi bi-phone d-flex align-items-center"><span>089 961 111</span></i>
        <i class="bi bi-clock ms-4 d-none d-lg-flex align-items-center"><span>Lun-Dom: 11:00 - 24:00 </span></i>
    </div>
</section>

<!-- ======= Header ======= -->
<header id="header" class="fixed-top d-flex align-items-center ">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

        <div class="logo me-auto">
            <h1><a href="Home">Restaurant Suite</a></h1>
            <!-- Uncomment below if you prefer to use an image logo -->
            <!-- <a href="index.jsp"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
        </div>

        <a href="Home" class="book-a-table-btn scrollto">Home</a>

    </div>
</header><!-- End Header -->

<main id="main">

    <!-- ======= Breadcrumbs Section ======= -->
    <section class="breadcrumbs">
        <div class="container">

            <div class="d-flex justify-content-between align-items-center">
                <h2>Error Page</h2>
                <ol>
                    <li><a href="Home">Home</a></li>
                    <li>Error Page</li>
                </ol>
            </div>

        </div>
    </section><!-- End Breadcrumbs Section -->

    <!-- ======= Book A Table Section ======= -->
    <section id="book-a-table" class="book-a-table">
        <div class="container">
            <div class="col-lg-4 col-md-4 form-group mt-4 mt-md-4">
            </div>
            <div class="col-lg-4 col-md-4 form-group mt-4 mt-md-4">
                <img src="https://github.com/EDesimone12/Restaurant-Suite/blob/main/readmeIMG/errorImg.png?raw=true" align="center">
            </div>
            <div class="col-lg-4 col-md-4 form-group mt-4 mt-md-4">
            </div>
        </div>
    </section><!-- End Book A Table Section -->

</main><!-- End #main -->

<!-- ======= Footer ======= -->
<footer id="footer">
    <div class="container">
        <h3>Restaurant Suite</h3>
        <!-- <p>.. -->
        <div class="social-links">
            <a href="https://github.com/EDesimone12/Restaurant-Suite" class="Github"><i class="bx bxl-github"></i></a>
            <a href="https://t.me/RestaurantSuite_bot" class="Telegram"><i class="bx bxl-telegram"></i></a>
        </div>
        <div class="copyright">
            &copy; Copyright <strong><span>Restaurant Suite</span></strong>. All Rights Reserved
        </div>
    </div>
</footer><!-- End Footer -->

<a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i class="bi bi-arrow-up-short"></i></a>

<!-- Vendor JS Files -->
<script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
<script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
<script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></script>
<script src="assets/vendor/swiper/swiper-bundle.min.js"></script>

<!-- Template Main JS File -->
<script src="funJS/admin.js"></script>
<script src="assets/js/main.js"></script>

</body>

</html>