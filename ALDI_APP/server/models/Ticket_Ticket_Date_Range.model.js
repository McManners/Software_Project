const Movie = sequelize.define('Ticket', { ticket_id: DataTypes.INTEGER });
const Actor = sequelize.define('Ticket_Date_Range', { ticket_id: DataTypes.INTEGER });
const ActorMovies = sequelize.define('Ticket_Ticket_Date_Range', {
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket,
      key: 'ticket_id'
    }
  },
  ticket_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Ticket_Date_Range,
      key: 'id'
    }
  }
});
Ticket.belongsToMany(Ticket_Date_Range, { through: Ticket_Ticket_Date_Range });
Ticket_Date_Range.belongsToMany(Ticket_Date_Range, { through: Ticket_Ticket_Date_Range });