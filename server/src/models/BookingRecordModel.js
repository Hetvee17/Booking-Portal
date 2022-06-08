module.exports = (sequelize, DataTypes) => {
  const BookingRecords = sequelize.define(
    "booking_records",
    {
      cust_id: {
        // type: Sequelize.INTEGER,
        type: DataTypes.INTEGER,
        // references: { model: "Users", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },

      cust_email: {
        type: DataTypes.STRING(50),
      },
      cust_phoneNumber: {
        type: DataTypes.INTEGER(20),
      },
      transport_type: {
        type: DataTypes.STRING(50),
      },
      transport_id: {
        // type: DataTypes.INTEGER(50),
        type: DataTypes.STRING(15),
      },
      total_ticket_count: {
        type: DataTypes.INTEGER(10),
      },
      journey_date: {
        type: DataTypes.DATE,
      },
      total_fare: {
        type: DataTypes.INTEGER,
      },
      booking_status: {
        type: DataTypes.ENUM("confirm", "cancel"),
        default: "confirm",
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
  return BookingRecords;
};
