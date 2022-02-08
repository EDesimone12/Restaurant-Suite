package control;

import model.Admin;
import model.AdminDb;
import model.Prenotazione;
import model.PrenotazioneDb;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;


@WebServlet("/AdminLogin")
public class ServletLogin extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("name");
        String psw = req.getParameter("password");

        HttpSession session = req.getSession(true);
        AdminDb service = new AdminDb();
        Admin user= service.checkAdmin(username,psw);

        if(user != null){
            session.setAttribute("admin",user);

            resp.setContentType("Login effettuato con successo");
            req.setAttribute("esito", "1");

            PrenotazioneDb servicePr = new PrenotazioneDb();
            ArrayList<Prenotazione> list = servicePr.doRetrieveAll();
            session.setAttribute("prList",list);

        }else{
            session.setAttribute("admin",null);

            resp.setContentType("Username e/o Password errati! Riprovare");
            req.setAttribute("esito", "'");
        }

        RequestDispatcher dispatcher =
                req.getServletContext().getRequestDispatcher("/view/admin-page.jsp");
        dispatcher.forward(req, resp);
    }
}
