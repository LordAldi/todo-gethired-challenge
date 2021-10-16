import ActivityCard from "../components/ActivityCard";
import AddButton from "../components/AddButton";
const tasksResponse = {
  total: 4,
  limit: 1000,
  skip: 0,
  data: [
    {
      id: 194,
      title: "New Activity (EDIT)",
      created_at: "2021-10-13T03:50:38.000Z",
    },
    {
      id: 192,
      title: "New Activity 2",
      created_at: "2021-10-13T03:44:55.000Z",
    },
    { id: 159, title: "Makan", created_at: "2021-10-12T02:04:43.000Z" },
    { id: 157, title: "Belanja Dapur", created_at: "2021-10-12T02:02:07.000Z" },
  ],
};

const Home = () => {
  return (
    <div>
      <div className="flex align-middle justify-between">
        <h1 className="font-bold text-gray-900 text-4xl">Activity</h1>
        <AddButton />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-12">
        {tasksResponse?.data?.map((task) => (
          <ActivityCard
            title={task.title}
            key={task.id}
            id={task.id}
            created={task.created_at}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
