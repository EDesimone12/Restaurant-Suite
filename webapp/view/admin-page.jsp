<%@ page import="model.Admin" %>
<%@ page import="java.util.ArrayList" %>
<%@ page import="model.Prenotazione" %>
<%@ page  contentType="text/html" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="it">

<head>
  <meta charset="UTF-8">
  <meta content="width=device-width, initial-scale=1.0" name="viewport">

  <title>Inner Page - Delicious Bootstrap Template</title>
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
          <h2>Admin Console</h2>
          <ol>
            <li><a href="Home">Home</a></li>
            <li>Admin Console</li>
          </ol>
        </div>

      </div>
    </section><!-- End Breadcrumbs Section -->

    <!-- ======= Book A Table Section ======= -->
    <section id="book-a-table" class="book-a-table">
      <div class="container">
        <% Admin admin = (Admin) session.getAttribute("admin");%>
        <% String esito = (String) session.getAttribute("esito"); %>
        <% if(admin==null){ %>
        <div class="section-title">
          <h2><span>Login</span></h2>
          <% if(esito == null || esito.equalsIgnoreCase("0")){ %>
            <p>Prova ad effettuare nuovamente il login username e/o password non corretti!</p>
          <%} else{ %>
            <p>Effettua l'accesso inserendo i tuoi dati personali.</p>
          <% } %>
        </div>

        <form action="AdminLogin" method="post" class="php-email-form">
          <div class="row">
            <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
            </div>
            <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
              <input type="text" class="form-control" name="name" id="name" placeholder="Your Username">
            </div>
          </div>
          <div class="row">
            <div class="col-lg-4 col-md-6 form-group mt-3 mt-md-0">
            </div>
            <div class="col-lg-4 col-md-6 form-group">
              <input type="password" name="password" class="form-control"  id="password" placeholder="Your Password">
            </div>
          </div>
          <div class="text-center"> <button class="loginbtn" type="submit">Login</button></div>
        </form>

        <%}else{ %>
        <% ArrayList<Prenotazione> list = (ArrayList<Prenotazione>) session.getAttribute("prList");%>
        <div class="section-title">
          <h2>Benvenuto <span> <%= admin.getNome() %> </span></h2>
          <p>Ecco a te il pannello di amministrazione della WebApp!</p>
        </div>
        <h2>Prenotazioni</h2>
        <table class="table" id="tablePrenotazioni">
          <thead class="thead-dark">
          <tr>
            <th scope="col">Codice</th>
            <th scope="col">Cognome</th>
            <th scope="col">Username</th>
            <th scope="col">#Persone</th>
            <th scope="col">Ordinazioni</th>
            <th scope="col">Orario</th>
            <th scope="col">Data</th>
            <th scope="col"> </th>
          </tr>
          </thead>
          <tbody>
          <% for (Prenotazione elem : list) { %>
          <tr id="<%= elem.getCodPrenotazione() %>">
            <th scope="row"> <%= elem.getCodPrenotazione() %> </th>
            <td> <%= elem.getCognome() %> </td>
            <td> <%= elem.getUsername() %> </td>
            <td> <%= elem.getnPersone() %> </td>
            <td> <%= elem.getOrdinazioni() %> </td>
            <td> <%= elem.getOrario() %> </td>
            <td> <%= elem.getData() %> </td>
            <td> <button class="deletebtn" onclick="deleteElem(event)" value="<%= elem.getCodPrenotazione() %>"><i class="bi bi-trash-fill" value="<%= elem.getCodPrenotazione() %>"></i> </button> </td>
          </tr>
          <% } %>
          </tbody>
        </table>
        <%} %>
      </div>
    </section><!-- End Book A Table Section -->

  </main><!-- End #main -->

  <!-- ======= Footer ======= -->
  <footer id="footer">
    <div class="container">
      <h3>Delicious</h3>
      <p>Et aut eum quis fuga eos sunt ipsa nihil. Labore corporis magni eligendi fuga maxime saepe commodi placeat.</p>
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