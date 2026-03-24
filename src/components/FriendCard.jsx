import "./FriendCard.css";

function FriendCard({ image, name, handle }) {
  return (
    <div className="friend-item">
      <img src={image} alt={name} />
      <div>
        <div className="friend-name">{name}</div>
        <div className="friend-handle">{handle}</div>
      </div>
    </div>
  );
}

export default FriendCard;
