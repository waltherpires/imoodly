import MyPatientsCard from "../MyPatients";
import RequestCard from "../RequestCard";

export default function PsychologistCards() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-4 max-w-screen">
      <RequestCard />
      <MyPatientsCard />
    </section>
  );
}
