import EventCalender from "@/components/EventCalender";
import Profile from "@/components/Profile";

export default function Dashboard() {
  return (
    <div className="container pt-10 mx-auto">
      <div className="flex justify-center mb-10">
        <EventCalender />
      </div>
      <Profile name="Adya" />
    </div>
  );
}
