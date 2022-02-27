package control;

import model.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/ServletDeleteAj")
public class ServletDeleteAj extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(true);

        PrenotazioneDb service = new PrenotazioneDb();
        String codice = req.getParameter("codPrenotazione");
        System.out.println("dd"+codice);
        int codPr = Integer.parseInt(codice);
        System.out.println(codPr);
        service.deleteByCod(codPr);

        PrenotazioneDb servicePr = new PrenotazioneDb();
        ArrayList<Prenotazione> list = servicePr.doRetrieveAll();
        for (Prenotazione elem:list) {
            System.out.println(elem);
        }
        session.setAttribute("prList",list);

        resp.setContentType("text/plain;charset=UTF-8");
        resp.getWriter().append(codice);
    }
}
