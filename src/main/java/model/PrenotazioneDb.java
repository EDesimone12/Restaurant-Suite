package model;

import org.apache.commons.codec.digest.DigestUtils;

import java.sql.*;
import java.util.ArrayList;

public class PrenotazioneDb {

    public PrenotazioneDb(){
    }

    public ArrayList<Prenotazione> doRetrieveAll(){
        try (Connection con = ConPool.getInstance().getConnection()) {

            String query = "SELECT codPrenotazione, cognome, username, nPersone," +
                    "ordinazioni, orario, data FROM prenotazione ";
            PreparedStatement ps =
                    con.prepareStatement(query);

            ResultSet rs = ps.executeQuery();
            ArrayList<Prenotazione> prList = new ArrayList<>();
            Prenotazione nuovo = new Prenotazione();

            while(rs.next()){
                Time temp = rs.getTime(6);
                temp.setHours(rs.getTime(6).getHours()-1);

                System.out.println("orario:"+rs.getTime(6));
                nuovo = new Prenotazione(rs.getInt(1),rs.getString(2),
                        rs.getString(3),rs.getInt(4),rs.getString(5),
                        temp, rs.getDate(7));
                prList.add(nuovo);
            }
            return prList;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteByCod(int codPrenotazione){
        try (Connection con = ConPool.getInstance().getConnection()) {

            String query = "DELETE from prenotazione where codPrenotazione = ?  ";
            PreparedStatement ps =
                    con.prepareStatement(query);

            ps.setInt(1,codPrenotazione);
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
