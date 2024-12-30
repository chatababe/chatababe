import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Video, CheckCircle, Clock } from "lucide-react";
import Chart from "./_components/chart";
import Graph from "./_components/graph";
import {
  getApprovalStats,
  getStats,
  getStreamGrowth,
} from "@/lib/analytics-services";

const AdminDashboard = async () => {
  const stats = await getStats();
  const returnedStats = {
    totalUsers: stats[0],
    totalStreams: stats[1],
    pendingApprovals: stats[2],
    activeStreams: stats[3],
  };
  const approvalStats = await getApprovalStats();
  const returnedApprovalStats = approvalStats.map((stat) => ({
    name: stat.status.charAt(0).toUpperCase() + stat.status.slice(1),
    value: stat._count.status,
  }));

  const streamGrowth = await getStreamGrowth();
  console.log(streamGrowth);
  const formattedStreamGrowth = [
    { date: 'Jan', streams: 200, users: 1000 },
    { date: 'Feb', streams: 300, users: 1500 },
    { date: 'Mar', streams: 400, users: 2000 },
    { date: 'Apr', streams: 450, users: 2300 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <h2 className="text-2xl font-bold">
                  {returnedStats.totalUsers}
                </h2>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Total Streams</p>
                <h2 className="text-2xl font-bold">
                  {returnedStats.totalStreams}
                </h2>
              </div>
              <Video className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Pending Approvals
                </p>
                <h2 className="text-2xl font-bold">
                  {returnedStats.pendingApprovals}
                </h2>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Active Streams</p>
                <h2 className="text-2xl font-bold">
                  {returnedStats.activeStreams}
                </h2>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart streamGrowth={formattedStreamGrowth} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Approval Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Graph approvalStats={returnedApprovalStats} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
