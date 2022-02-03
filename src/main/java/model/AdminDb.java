package model;

import org.checkerframework.checker.units.qual.A;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class AdminDb {
    public AdminDb() {
    }

    public Admin doRetrieveAdminByCod(String codAdmin) {
        try (Connection con = ConPool.getInstance().getConnection()) {

            String query = "SELECT codAdmin, nome FROM admin WHERE codAdmin = ?";
            PreparedStatement ps =
                    con.prepareStatement(query);
            ps.setString(1, codAdmin);
            ResultSet rs = ps.executeQuery();
            Admin nuovo = new Admin();
            if(rs.next()){
                nuovo = new Admin(rs.getString(1), rs.getString(2));
            }

            return nuovo;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean doSaveAdmin(int codAdmin, String nome) {
        try (Connection con = ConPool.getInstance().getConnection()) {
            PreparedStatement ps =
                    con.prepareStatement("INSERT into admin(codAdmin,nome,"
                            + " values(?, ?)");
            ps.setInt(1, codAdmin);
            ps.setString(2, nome);
            ps.executeUpdate();
            return true;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}