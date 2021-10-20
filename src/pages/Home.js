import { useContext, useEffect } from "react";
import ActivityCard from "../components/ActivityCard";
import AddButton from "../components/AddButton";
import EmptyStateAct from "../components/EmptyStateAct";
import { DataContext } from "../components/DataContext";
import useFetch from "../components/useFetch";

const Home = () => {
  const { state } = useContext(DataContext);
  const { fetchActivity, createActivity } = useFetch();
  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  return (
    <div>
      <div className="flex align-middle justify-between  flex-wrap">
        <h1
          className="font-bold text-gray-900 text-4xl"
          data-cy="activity-title"
        >
          Activity
        </h1>
        <AddButton
          datacy="activity-add-button"
          onClick={() => createActivity()}
        />
      </div>

      {state.loading ? (
        <p>Loading...</p>
      ) : state.activity?.length === 0 ? (
        <EmptyStateAct onClick={() => createActivity()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
          {state.activity?.map((t) => (
            <ActivityCard
              title={t.title}
              key={t.id}
              id={t.id}
              created={t.created_at}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
