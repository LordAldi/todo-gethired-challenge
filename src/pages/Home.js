import { useEffect, useState } from "react";
import API from "../API";
import ActivityCard from "../components/ActivityCard";
import AddButton from "../components/AddButton";
import EmptyState from "../components/EmptyState";
import HashLoader from "react-spinners/HashLoader";
import DeleteModal from "../components/Modal/DeleteModal";
import InfoModal from "../components/Modal/InfoModal";

const Home = () => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showD, setShowD] = useState(false);
  const [showI, setShowI] = useState(false);
  const [refetch, setRefetch] = useState(0);
  const [idDelete, setIdDelete] = useState({});
  useEffect(() => {
    setLoading(true);
    API.get("/activity-groups")
      .then((res) => {
        setTask([...res?.data?.data]);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [refetch]);

  const createActivity = () => {
    setLoading(true);
    API.post("/activity-groups", { title: "New Activity" })
      .then(() => {
        API.get("/activity-groups")
          .then((res) => {
            setTask([...res?.data?.data]);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  return (
    <div>
      <div className="flex align-middle justify-between  flex-wrap">
        <h1 className="font-bold text-gray-900 text-4xl">Activity</h1>
        <AddButton onClick={() => createActivity()} />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-96">
          <HashLoader color="#60A5FA" loading={true} size={150} />
        </div>
      ) : task?.length === 0 ? (
        <EmptyState onClick={() => createActivity()} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-12">
          {task?.map((t) => (
            <ActivityCard
              title={t.title}
              key={t.id}
              id={t.id}
              created={t.created_at}
              onDelete={(data) => {
                setIdDelete({ ...data });
                setShowD(true);
              }}
            />
          ))}
        </div>
      )}
      <DeleteModal
        show={showD}
        data={idDelete}
        setShow={setShowD}
        item="List Item"
        activity
        reload={() => {
          setRefetch(refetch + 1);
          setShowI(true);
        }}
      />
      <InfoModal
        show={showI}
        setShow={setShowI}
        text="Activity berhasil dihapus"
      />
    </div>
  );
};

export default Home;
