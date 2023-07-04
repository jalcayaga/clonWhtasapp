
const Message = ({ message, date, email }) => {
  return (
    <div className="card">
      <p>{message}</p>
      <span>{date}</span>
      <span className="user-email">{email}</span>
    </div>
  );
};

export default Message;
