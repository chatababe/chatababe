import DataTable from "./_components/data-table";
import columns from "./_components/columns";
import { getUserApprovals } from "@/lib/admin-services";
import { format } from "date-fns";

const ApprovalPage = async () => {
  const users = await getUserApprovals();

  const formattedData = users.map((user) => ({
    ...user,
    imageUrl:user.user.imageUrl,
    username:user.user.username,
    date_sent:format(new Date(user.createdAt), "dd/MM/yyyy")
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

export default ApprovalPage;
