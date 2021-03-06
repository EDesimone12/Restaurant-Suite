package control;

import model.*;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/Admin")
public class ServletAdmin extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(true);
        session.setAttribute("esito", "1");

        if(session.getAttribute("admin")!=null){
            PrenotazioneDb servicePr = new PrenotazioneDb();
            ArrayList<Prenotazione> list = servicePr.doRetrieveAll();
            session.setAttribute("prList",list);
        }

        RequestDispatcher dispatcher =
                req.getRequestDispatcher("/view/admin-page.jsp");
        dispatcher.forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req,resp);
    }
}
