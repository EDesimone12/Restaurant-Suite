package control;

import model.Prenotazione;
import model.PrenotazioneDb;

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
        HttpSession session = req.getSession(true);

        PrenotazioneDb service = new PrenotazioneDb();
        String codice = req.getParameter("codPrenotazione");
        System.out.println(codice);

        int codPr = Integer.parseInt(codice);

        System.out.println(codPr);
        service.deleteByCod(codPr);

        PrenotazioneDb servicePr = new PrenotazioneDb();
        ArrayList<Prenotazione> list = servicePr.doRetrieveAll();
        session.setAttribute("prList",list);
        for (Prenotazione elem:list) {
            System.out.println(elem);
        }
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        this.doPost(req,resp);
    }
}
