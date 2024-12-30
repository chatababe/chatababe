import DataTable from "./_components/data-table";
import columns from "./_components/columns";
import { getUsers } from "@/lib/admin-services";
import { format } from "date-fns";

const SettingsPage = async () => {
  const users = await getUsers();

  const formattedData = users.map((user) => ({
    ...user,
    userId: user.id,
    fullname: user.profile?.fullName,
    age: user.profile?.age,
    gender: user.profile?.gender,
    approved:user.stream?.approved,
    createdAt:format(new Date(user.createdAt),"dd/MM/yyyy")
  }));

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community Settings</h1>
      </div>
      <DataTable
        columns={columns}
        data={formattedData}
      />
    </div>
  );
};

export default SettingsPage;
