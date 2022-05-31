module.exports = (sequelize, DataTypes) => {
  const BookedRecords = sequelize.define(
    "bookedrecords",
    {
      custId: {
        // type: Sequelize.INTEGER,
        type: DataTypes.INTEGER,
        // references: { model: "Users", key: "id" },
        // onUpdate: "cascade",
        // onDelete: "cascade",
      },

      custEmail: {
        type: DataTypes.STRING(50),
      },
      custPhoneNumber: {
        type: DataTypes.INTEGER(20),
      },
      transportType: {
        type: DataTypes.STRING(50),
      },
      transportId: {
        type: DataTypes.INTEGER(50),
      },
      totalTickCount: {
        type: DataTypes.INTEGER(10),
      },
      journeyData: {
        type: DataTypes.DATE,
      },
      TotalFare: {
        type: DataTypes.INTEGER,
      },
      bookingStatus: {
        type: DataTypes.ENUM("confirm", "cancel"),
        default: "confirm",
      },
    },
    {
      timestamps: true, paranoid: true,
    }
  );
  return BookedRecords;
};
