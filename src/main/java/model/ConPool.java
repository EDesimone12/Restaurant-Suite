package model;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.apache.tomcat.jdbc.pool.PoolProperties;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.TimeZone;

public final class ConPool {
    /** DataSource declaration. */
    private static DataSource datasource = null;
    /** ConPool initialization. */
    private static ConPool instance = new ConPool();

    /**
     * Private constructor.
     */
    private ConPool() {
    }

    /**
     * Return the instance of ConPool.
     * @return ConPool
     */
    public static ConPool getInstance() {
        return instance;
    }

    /**
     *  Return an instance of the DB connection.
     *  @return Connection
     */
    public static Connection getConnection() throws SQLException {
        final int maxActive = 100;
        final int initialSize = 10;
        final int minIdle = 10;
        final int timeout = 60;

        if (datasource == null) {
            PoolProperties p = new PoolProperties();
            p.setUrl("jdbc:mysql://pippodb.mysql.database.azure.com:3306/restaurantSuite?serverTimezone=UTC");
            p.setDriverClassName("com.mysql.cj.jdbc.Driver");
            p.setUsername(System.getenv("My_SQL_USER"));
            p.setPassword(System.getenv("My_SQL_PSW"));
            datasource = new DataSource();
            datasource.setPoolProperties(p);
        }
        return datasource.getConnection();
    }
}
