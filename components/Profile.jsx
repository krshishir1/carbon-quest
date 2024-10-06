export default function Profile({name}) {
  return (
    <div className="px-4 py-3 rounded-lg">
      <div className="flex">
        <div>
          <img src="/Casual-profile.png" className="w-16" />
        </div>
        <div>
            <h5>{name}</h5>
            <p>Lo</p>
        </div>
      </div>
    </div>
  );
}
